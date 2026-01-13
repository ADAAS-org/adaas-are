import { A_Context, A_Fragment, A_Scope, A_TYPES__Fragment_Serialized, ASEID } from "@adaas/a-concept";
import { AreIndex } from "../AreIndex/AreIndex.context";
import { AreNode } from "@adaas/are/entities/AreNode/AreNode.entity";
import { AreEvent } from "../AreEvent/AreEvent.context";
import { AreSCene_Serialized } from "./AreScene.types";
import { AreProps } from "../AreProps/AreProps.context";
import { AreStore } from "../AreStore/AreStore.context";

export class AreScene extends A_Fragment {

    protected _template: string = '';
    protected _listeners: Map<AreNode, Map<string, Set<Function>>> = new Map();
    protected _styles: Map<AreNode, string> = new Map();
    protected _bindings: Map<AreNode, Map<string, any>> = new Map();


    protected _stateHashes: Map<AreNode, string> = new Map();

    protected _status: 'initialized' | 'compiled' | 'rendered' = 'initialized';

    constructor(
        /**
         * Scene identity will be used to identify mounting point in the parent scene
         */
        id?: string | ASEID,
        /**
         * Initial template for the scene. 
         */
        template?: string
    ) {
        super({ name: id?.toString() || 'are-app' });
        this._template = (template || '')
        .replace(/\s+/g, ' ').trim();
    }

    get id(): string {
        return this.name;
    }

    /**
     * Get the root scene of the current scene
     */
    get root(): AreScene {
        let currentScope: A_Scope | undefined = this.scope;
        let rootScene: AreScene = this;

        while (currentScope) {
            const parentScene = currentScope.parent?.resolve<AreScene>(this.constructor as typeof AreScene);
            if (parentScene) {
                rootScene = parentScene;
            }
            currentScope = currentScope.parent;
        }

        return rootScene;
    }

    get status(): 'initialized' | 'compiled' | 'rendered' {
        return this._status;
    }

    get scope(): A_Scope {
        return A_Context.scope(this);
    }

    get index(): AreIndex<string> {
        return A_Context.scope(this).resolveFlat<AreIndex<string>>(AreIndex)!;
    }

    get parent() {
        return A_Context.scope(this).parent?.resolveFlat<AreScene>(AreScene);
    }

    get template(): string {
        return this._template;
    }

    get initialized(): boolean {
        return this._status === 'initialized';
    }


    get compiled(): boolean {
        return this._status === 'compiled';
    }

    get rendered(): boolean {
        return this._status === 'rendered';
    }


    get children(): Array<AreScene> {
        return this.scope.resolveFlatAll<AreNode>(AreNode)
            .map(n => n.scope.resolveFlat<AreScene>(AreScene))
            .filter(s => !!s);
    }


    get depth(): number {
        let depth = 0;
        let currentScope: A_Scope | undefined = this.scope;

        while (currentScope) {
            if (currentScope.parent && currentScope.parent.resolve<AreScene>(this.constructor as typeof AreScene)) {
                depth++;
            }
            currentScope = currentScope.parent;
        }

        return depth;
    }

    get styles(): Iterable<[AreNode, string]> {
        return this._styles.entries();
    }


    *nodes(
        filter?: (node: AreNode) => boolean
    ): Iterable<AreNode> {


        for (const path of this.paths()) {

            const node = this.index.nodeOf(path);

            if (!node) {
                continue;
            }

            if (filter && !filter(node)) {
                continue;
            }

            yield node;
        }
    }

    *paths(): Iterable<string> {
        let paths = this.index.paths;

        //  create proper tree sequence
        paths.sort((a, b) => {
            const aParsed = a.split('.').map(part => parseInt(part, 10));
            const bParsed = b.split('.').map(part => parseInt(part, 10));

            const len = Math.min(aParsed.length, bParsed.length);
            for (let i = 0; i < len; i++) {
                if (aParsed[i] !== bParsed[i]) {
                    return aParsed[i] - bParsed[i];
                }
            }
            return aParsed.length - bParsed.length;
        });

        // yield paths
        for (const path of paths) {
            yield path;
        }
    }

    attach(node: AreNode): void {

        console.log('ATTACH NODE TO SCENE', node.aseid.entity, 'TO SCENE', this.id);

        this.scope.register(node);
        node.scope.inherit(this.scope)
    }

    async mount(
        node: AreNode,
    ) {
        const newHash = this.computeHash(node);
        this._stateHashes.set(node, newHash);

    }

    async unmount(
        node: AreNode,
    ) {
        this._stateHashes.delete(node);
    }



    hasChangesFor(node: AreNode): boolean {
        const previousHash = this.getHash(node);
        const currentHash = this.computeHash(node);


        let result: boolean = false;

        if (!previousHash || previousHash !== currentHash) {
            result = true;
        }
        return result;
    }

    sceneFor(node: AreNode): AreScene | undefined {
        return node.scope.resolveFlat<AreScene>(AreScene);
    }

    propsOf(node: AreNode): AreProps {
        return node.scope.resolveFlat<AreProps>(AreProps)!;
    }

    storeOf(node: AreNode): AreStore {
        return node.scope.resolveFlat<AreStore>(AreStore)!;
    } 

    getHash(node: AreNode): string | undefined {
        return this._stateHashes.get(node);
    }

    computeHash(node: AreNode): string {
        const nodeBindings = this._bindings.get(node);
        const nodeListeners = this._listeners.get(node);
        const nodeStyles = this._styles.get(node);
        const nestedScene = this.sceneFor(node);
        const props =  this.propsOf(node);
        const store = this.storeOf(node);


        const hashSource = JSON.stringify({
            bindings: nodeBindings ?  Array.from(nodeBindings.entries() || []): null,
            listeners: nodeListeners ? Array.from(nodeListeners.entries() ).map(([key, value]) => [key, Array.from(value)]) : null,
            styles: nodeStyles || null,
            nestedScene: nestedScene ? nestedScene.toJSON() : null,
            props: props ? props.toJSON() : null,
            store: store ? store.toJSON() : null,
        });

        let hash = 0, i, chr;
        for (i = 0; i < hashSource.length; i++) {
            chr = hashSource.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash.toString();
    }

    async addStyles(node: AreNode, styles: string) {
        this._styles.set(node, styles);
    }


    async getStyles(node: AreNode): Promise<string | undefined> {
        return this._styles.get(node);
    }


    async addListener(event: string, handler: string, parentNode: AreNode, node: AreNode) {
        const callback = async (e) => {
            const newEvent = new AreEvent(handler, {
                event,
                data: e
            })

            await parentNode.emit(newEvent);
        }

        //  And then Just register it
        const existingListeners = this._listeners.get(node) || new Map<string, Set<Function>>();

        const handlers = existingListeners.get(event) || new Set<Function>();

        handlers.add(callback);

        existingListeners.set(event, handlers);

        this._listeners.set(node, existingListeners);
    }


    async getListeners(node: AreNode): Promise<Map<string, Set<Function>> | null> {
        return this._listeners.get(node) || null;
    }


    async getBindings(node: AreNode): Promise<Map<string, any> | null> {
        return this._bindings.get(node) || null;
    }



    async bind(node: AreNode, name: string, value: any) {
        //  And then Just register it
        const existingBindings = this._bindings.get(node) || new Map<string, any>();

        // const values = existingBindings.get(name);

        // values.add(value);

        existingBindings.set(name, value);

        this._bindings.set(node, existingBindings);
    }



    /**
     * This function will combine all binding scenes into one build scene 
     * and return the final compiled markup with all paths properly set.
     * 
     * All paths in the index should be updated and the full tree should be built.
     * 
     */
    async compile() {
        this._status = 'compiled';
    }


    async render() {
        this._status = 'rendered';
    }


    async clear() {
        this.index.clear();
        this._listeners.clear();
        this._styles.clear();
        this._bindings.clear();
    }


    async reset(template: string) {
        this._template = template;
        await this.clear();
    }



    toJSON(): AreSCene_Serialized {
        return {
            ...super.toJSON(),
            children: Object.fromEntries(
                Array.from(this.children).map(child => [
                    child.id.toString(),
                    child.toJSON()
                ])
            )
        }
    }
}





//  Just to cover the proper lifecycle

/*
 1) Create Scene with template from mounting point content
 2) Do indexing of the scene 

*/