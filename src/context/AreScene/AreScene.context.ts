import { A_Context, A_Fragment, A_Scope, A_TYPES__Fragment_Serialized, ASEID } from "@adaas/a-concept";
import { AreIndex } from "../AreIndex/AreIndex.context";
import { AreNode } from "@adaas/are/entities/AreNode/AreNode.entity";
import { AreEvent } from "../AreEvent/AreEvent.context";
import { AreSCene_Serialized } from "./AreScene.types";
import { AreProps } from "../AreProps/AreProps.context";
import { AreStore } from "../AreStore/AreStore.context";
import { A_Logger, A_LoggerColorName } from "@adaas/a-utils";
import { AreSceneAction } from "@adaas/are/entities/AreSceneAction/AreSceneAction.entity";

export class AreScene extends A_Fragment {

    protected _template: string = '';
    protected _state: Set<AreSceneAction> = new Set();

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


    get actions(): Array<AreSceneAction> {
        return this.scope.resolveFlatAll<AreSceneAction>(AreSceneAction) || [];
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


    *renderPlanFor(
        node: AreNode,
        filter: {
            changes?: Array<string>
            order?: Array<string>

        }
    ) {

        const order = filter.order || [];
        const changes = filter.changes || [];

        let plan = this.actions;

        plan = plan.sort((a, b) => {
            const aIndex = order.indexOf(a.name);
            const bIndex = order.indexOf(b.name);

            return aIndex - bIndex;
        });

        for (const action of plan) {
            if (action.node === node) {
                yield action;
            }
        }
    }


    debug(color: A_LoggerColorName, message: string, ...optionalParams: any[]) {
        const logger = this.scope.resolve(A_Logger);

        if (!logger) return;

        logger.debug(
            color,
            `${' - '.repeat(this.depth)}` +
            `AreScene: [${this.id}] : ${message}`, ...optionalParams
        );
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

    plan(action: AreSceneAction) {

        try {
            this.scope.register(action);
            console.log('\n\n\n\n\nPLANNED:', action);
        } catch (error) {

        }

    }

    unPlan(
        action: AreSceneAction
    ) {
        try {
            this.scope.deregister(action);
        } catch (error) {

        }
    }

    attach(node: AreNode): void {
        this.scope.register(node);
        node.scope.inherit(this.scope)
    }

    sceneOf(node: AreNode): AreScene | undefined {
        return node.scope.resolveFlat<AreScene>(AreScene);
    }

    propsOf(node: AreNode): AreProps {
        return node.scope.resolveFlat<AreProps>(AreProps)!;
    }

    storeOf(node: AreNode): AreStore {
        return node.scope.resolveFlat<AreStore>(AreStore)!;
    }
    isPlanned(action: AreSceneAction): boolean {
        return this.scope.resolveFlat<AreSceneAction>(AreSceneAction, {
            query: {
                aseid: action.aseid.toString()
            }
        }) !== undefined;
    }

    isMounted(action: AreSceneAction): boolean {
        return this._state.has(action);
    }

    mount(action?: AreSceneAction) {
        this._state.add(action!);
    }

    unmount(action?: AreSceneAction) {
        this._state.delete(action!);
    }

    async clear() {
        this.index.clear();
        this._state.clear();
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