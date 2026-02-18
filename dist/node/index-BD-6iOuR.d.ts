import { AreEventProps } from './lib/AreEvent/AreEvent.types.js';
import { A_Fragment, ASEID, A_Scope, A_Entity } from '@adaas/a-concept';
import { AreNodeNewProps } from './lib/AreNode/AreNode.types.js';
import { AreSCene_Serialized } from './lib/AreScene/AreScene.types.js';
import { AreProps } from './lib/AreProps/AreProps.context.js';
import { AreStore } from './lib/AreStore/AreStore.context.js';

declare class AreEvent<T extends any = any> extends A_Fragment {
    protected _node?: AreNode;
    protected _props: AreEventProps<T>;
    constructor(eventName: string, props: AreEventProps<T>);
    get data(): T;
    get event(): string;
}

declare class AreIndex<_PathType = any> extends A_Fragment {
    constructor(aseid: string | ASEID);
    /**
     * Platform-agnostic element index
     * Element can be DOM Element, PDF element, DOCX element, etc.
     * The actual type depends on the compiler being used
     */
    protected _index: {
        ASEID_to_Path: Map<string, _PathType>;
        Path_to_ASEID: Map<_PathType, string>;
        Node_to_Path: Map<AreNode, _PathType>;
        Path_to_Node: Map<_PathType, AreNode>;
    };
    /**
     * Unique hash representing the current state of the index
     * Can be used to identify changes in the index
     */
    get state(): string;
    get scope(): A_Scope;
    get parent(): AreIndex<any> | undefined;
    get size(): number;
    get nodes(): Array<AreNode>;
    get paths(): Array<_PathType>;
    protected get depth(): number;
    /**
     * Adds a platform-agnostic element to the index
     * @param node - AreNode to index
     * @param path - Platform-specific element (DOM, PDF, DOCX, etc.)
     */
    add(node: AreNode, path: _PathType): void;
    /**
     * Retrieves platform-specific element by AreNode
     * @param node - AreNode to look up
     * @returns Platform-specific element or undefined
     */
    pathOf(node: AreNode): _PathType | undefined;
    /**
     * Retrieves AreNode by platform-specific element
     * @param element - Platform-specific element to look up
     * @returns AreNode or undefined
     */
    nodeOf(path: _PathType): AreNode | undefined;
    /**
     * Removes index entry by AreNode
     * @param node - AreNode to remove from index
     */
    removeByNode(node: AreNode): void;
    replaceByNode(oldNode: AreNode, newNode: AreNode): void;
    replacePath(oldPath: _PathType, newPath: _PathType): void;
    /**
     * Removes index entry by platform-specific element
     * @param path - Platform-specific element to remove from index
     */
    removeByElement(path: _PathType): void;
    clear(): void;
}

type AreSceneInstructionNewProps<T extends any = Record<string, any>> = {
    id?: Array<any>;
    action: string;
    node: AreNode;
    params?: T;
};

declare class AreSceneInstruction<T extends Record<string, any> = Record<string, any>> extends A_Entity<AreSceneInstructionNewProps<T>> {
    action: string;
    node: AreNode;
    params?: T;
    hashSource: string;
    get scene(): AreScene;
    /**
     * Generates even hash uses for deduplication
     *
     * @param str
     */
    protected createHash(str?: string): string;
    protected createHash(str?: undefined): string;
    protected createHash(str?: Record<string, any>): string;
    protected createHash(str?: Array<any>): string;
    protected createHash(str?: number): string;
    protected createHash(str?: boolean): string;
    protected createHash(str?: null): string;
    protected createHash(map?: Map<any, any>): string;
    protected createHash(set?: Set<any>): string;
    fromNew(newEntity: AreSceneInstructionNewProps<T>): void;
    update(params: Partial<T>): void;
    init(scope?: A_Scope): void;
    apply(scope?: A_Scope): void;
    revert(scope?: A_Scope): void;
}

declare class AreScene extends A_Fragment {
    protected _state: Set<string>;
    constructor(
    /**
     * Scene identity will be used to identify mounting point in the parent scene
     */
    id: string | ASEID);
    get id(): string;
    /**
     * Get the root scene of the current scene
     */
    get root(): AreScene;
    get scope(): A_Scope;
    get index(): AreIndex<string>;
    get parent(): AreScene | undefined;
    get children(): Array<AreScene>;
    get depth(): number;
    get instructions(): Array<AreSceneInstruction>;
    nodes(filter?: (node: AreNode) => boolean): AreNode[];
    renderPlanFor(node: AreNode, filter?: {
        filter?: (instruction: AreSceneInstruction) => boolean;
        changes?: Array<new (...args: any[]) => AreSceneInstruction>;
        order?: Array<new (...args: any[]) => AreSceneInstruction>;
    }): AreSceneInstruction<Record<string, any>>[];
    get debugPrefix(): string;
    get path(): string;
    paths(): Iterable<string>;
    plan(instruction: AreSceneInstruction): void;
    unPlan(instruction: AreSceneInstruction): void;
    isAttached(node: AreNode): boolean;
    attach(node: AreNode): void;
    sceneOf(node: AreNode): AreScene | undefined;
    propsOf(node: AreNode): AreProps;
    storeOf(node: AreNode): AreStore;
    isPlanned(action: AreSceneInstruction): boolean;
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
    instruction: T): T | undefined;
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
    instruction: AreSceneInstruction): void;
    dropState<T extends AreSceneInstruction>(
    /**
     * Should be instruction instance to drop
     */
    instruction: T): void;
    resetPlan(node: AreNode): void;
    resetState(node: AreNode): void;
    getState<T extends AreSceneInstruction>(
    /**
     * Should be instruction instance to get state for
     */
    instruction: T): T | undefined;
    revert(
    /**
     * Should be instruction instance to revert
     */
    instruction: AreSceneInstruction): void;
    reset(): void;
    toJSON(): AreSCene_Serialized;
}

declare class AreNode extends A_Entity<AreNodeNewProps> {
    /**
     * Template string defined for the node
     * Example: `<div>{{name}}</div>`
     */
    _template: string;
    /**
     * Markup string defined for the node
     * Example: `<custom-component :prop="value"> <div>Inner Content</div> </custom-component>`
     */
    _markup: string;
    /**
     * Styles string defined for the node
     */
    _styles: string;
    /**
     * The scope associated with this node
     * uses to store all nested fragments and entities like other AreNodes and Scene
     */
    protected _scope: A_Scope;
    get id(): string;
    get scope(): A_Scope;
    get content(): AreScene;
    get type(): string;
    get template(): string;
    get markup(): string;
    get styles(): string;
    fromNew(newEntity: AreNodeNewProps): void;
    fromASEID(aseid: string | ASEID): void;
    setTemplate(template: string): void;
    setMarkup(markup: string): void;
    setStyles(styles: string): void;
    emit(scope: A_Scope): any;
    emit(event: AreEvent): any;
    compile(): void;
    render(): void;
    update(): Promise<void>;
    reset(): Promise<void>;
    unmount(): void;
    load(): Promise<any>;
    destroy(): Promise<any>;
    /**
     * Method to ensure that the current scope is inherited from the context scope
     *
     * @throws A_Error if the scope is not inherited from the context scope
     */
    protected checkScopeInheritance(): void;
}

export { AreEvent as A, AreIndex as a, AreNode as b, AreScene as c, AreSceneInstruction as d, type AreSceneInstructionNewProps as e };
