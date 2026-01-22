import { A_Context, A_Fragment, A_Scope, A_TYPES__Fragment_Serialized, ASEID } from "@adaas/a-concept";
import { AreIndex } from "../AreIndex/AreIndex.context";
import { AreNode } from "@adaas/are/entities/AreNode/AreNode.entity";
import { AreEvent } from "../AreEvent/AreEvent.context";
import { AreSCene_Serialized } from "./AreScene.types";
import { AreProps } from "../AreProps/AreProps.context";
import { AreStore } from "../AreStore/AreStore.context";
import { A_Logger, A_LoggerColorName } from "@adaas/a-utils";
import { AreSceneInstruction } from "@adaas/are/entities/AreSceneInstruction/AreSceneInstruction.entity";
import { MountNodeInstruction } from "@adaas/are/entities/AreSceneInstruction/types/MountNode.instruction";
import { AddStyleInstruction } from "@adaas/are/entities/AreSceneInstruction/types/AddStyle.instruction";

export class AreScene extends A_Fragment {

    protected _state: Set<AreSceneInstruction> = new Set();

    constructor(
        /**
         * Scene identity will be used to identify mounting point in the parent scene
         */
        id: string | ASEID,
    ) {
        super({ name: id.toString() });
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

    get scope(): A_Scope {
        return A_Context.scope(this);
    }

    get index(): AreIndex<string> {
        return A_Context.scope(this).resolveFlat<AreIndex<string>>(AreIndex)!;
    }

    get parent(): AreScene | undefined {
        return A_Context.scope(this).parent?.resolveFlat<AreScene>(AreScene);
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


    get instructions(): Array<AreSceneInstruction> {
        return this.scope.resolveFlatAll<AreSceneInstruction>(AreSceneInstruction) || [];
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

        this.renderPlanFor(new AreNode(), {
            order: [
                MountNodeInstruction,
                AddStyleInstruction,
            ]
        })

    }


    *renderPlanFor(
        node: AreNode,
        filter: {
            filter?: (instruction: AreSceneInstruction) => boolean,
            changes?: Array<new (...args: any[]) => AreSceneInstruction>,
            order?: Array<new (...args: any[]) => AreSceneInstruction>,
        }
    ) {

        const order = filter.order || [];
        const filterFn = filter.filter;

        let plan = this.instructions;

        plan = plan.sort((a, b) => {
            const aIndex = order.findIndex(instructionType => a instanceof instructionType);
            const bIndex = order.findIndex(instructionType => b instanceof instructionType);

            return (aIndex === -1 ? order.length : aIndex) - (bIndex === -1 ? order.length : bIndex);
        });

        if (filterFn) {
            plan = plan.filter(filterFn);
        }

        for (const action of plan) {
            if (action.node === node) {
                yield action;
            }
        }
    }

    get debugPrefix() {
        return `${' - '.repeat(this.depth)}`
    }

    get path(): string {
        if (!this.parent)
            return '';
        else {
            const ownerNode = this.parent.scope.resolveFlat<AreNode>(AreNode, {
                query: {
                    aseid: this.id
                }
            }) as any as AreNode;

            const NodePath = this.parent.index.pathOf(ownerNode);

            return this.parent.path ? (this.parent.path + '.' + NodePath) : NodePath!;
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

    plan(instruction: AreSceneInstruction) {
        try {
            this.scope.register(instruction);
        } catch (error) {

        }
    }

    unPlan(
        instruction: AreSceneInstruction
    ) {
        const planned = this.getPlanned(instruction);

        try {
            if (planned)
                this.scope.deregister(planned);
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
    isPlanned(action: AreSceneInstruction): boolean {
        return this.getPlanned(action) !== undefined;
    }

    /**
     * It returns planned instruction instance from the scene
     * 
     * [!] Only Planned instructions can be used for state checking
     * 
     * @param instruction 
     * @returns 
     */
    getPlanned<T extends AreSceneInstruction>(
        /**
         * Should be instruction instance to get
         */
        instruction: T
    ): T | undefined {

        const planned = this.scope.resolveFlat<AreSceneInstruction>(AreSceneInstruction, {
            query: {
                aseid: instruction.aseid.toString()
            }
        }) as any as T | undefined;

        return planned;
    }

    /**
     * Operation Only applicable from Plan -> State
     * 
     * So only instructions presented in the plan can be moved to state
     * State is a set of instructions that are currently applied to the scene
     * 
     * @param instruction 
     */
    setState(
        /**
         * Should be instruction instance to apply
         */
        instruction: AreSceneInstruction
    ) {
        const planned = this.getPlanned(instruction);

        if (planned) {
            this._state.delete(planned);
            this._state.add(instruction);
        }
    }


    dropState<T extends AreSceneInstruction>(
        /**
         * Should be instruction instance to drop
         */
        instruction: T
    ) {
        const planned = this.getPlanned(instruction);
        console.log('dropping state for', planned);

        if (planned) {
            this._state.delete(planned);
        }
    }


    resetState(
        node: AreNode
    ) {
        for (const instruction of Array.from(this._state)) {
            if (instruction.node === node) {
                this._state.delete(instruction);
            }
        }
    }


    getState<T extends AreSceneInstruction>(
        /**
         * Should be instruction instance to get state for
         */
        instruction: T
    ): T | undefined {


        const planned = this.scope.resolveFlat<AreSceneInstruction>(AreSceneInstruction, {
            query: {
                aseid: instruction.aseid.toString()
            }
        }) as any as T | undefined;

        if (!planned) {
            return undefined;
        }

        if (this._state.has(planned))
            return planned as T;
        else
            return undefined;
    }

    revert(
        /**
         * Should be instruction instance to revert
         */
        instruction?: AreSceneInstruction
    ) {
        this._state.delete(instruction!);
    }


    reset() {
        this.index.clear();
        this._state.clear();
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