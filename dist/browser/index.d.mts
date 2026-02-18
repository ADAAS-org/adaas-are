import * as _adaas_a_concept from '@adaas/a-concept';
import { A_Component, A_Fragment, ASEID, A_Scope, A_TYPES__Fragment_Serialized, A_Entity, A_Error, A_Feature, A_Container } from '@adaas/a-concept';
import { A_ExecutionContext } from '@adaas/a-utils/a-execution';
import { A_Service, A_ServiceFeatures } from '@adaas/a-utils/a-service';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { A_SignalBus, A_SignalVector, A_SignalState, A_Signal } from '@adaas/a-utils/a-signal';
import { A_Route } from '@adaas/a-utils/a-route';

declare class Are extends A_Component {
    static get EventHandler(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    static get onBeforeLoad(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    static get onAfterLoad(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    static get onBeforeCompile(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    static get onAfterCompile(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    static get onBeforeMount(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    static get onAfterMount(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    static get onBeforeUnmount(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    static get onAfterUnmount(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    static get onBeforeUpdate(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    static get onAfterUpdate(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    static get Template(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    static get Styles(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    static get Data(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    static get Signal(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    /**
     * Returns the template string for the component
     *
     * Could be overridden to provide dynamic templates based on component state
     *
     * @returns
     */
    template(...args: any[]): Promise<void>;
    /**
     * Returns the styles string for the component
     *
     * Could be overridden to provide dynamic styles based on component state
     *
     * @returns
     */
    styles(...args: any[]): Promise<void>;
    /**
     * Returns the data object for the component
     *
     * Uses as the initial state of the component
     *
     * @returns
     */
    data(...args: any[]): Promise<void>;
}

type AreNodeProps = {
    component: string;
    scope: string;
    markup: string;
};
type AreNodeOptionalProps = {
    id?: string;
    styles?: string;
    template?: string;
};
type AreNodeNewProps = AreNodeProps & AreNodeOptionalProps;

/**
 * Properties for the AreEvent context
 *
 */
type AreEventProps<T = any> = {
    /**
     * The data associated with the event
     */
    data: T;
    /**
     * The name of the event
     */
    event: string;
};

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

type AreSCene_Serialized = {
    children: {
        [id: string]: AreSCene_Serialized;
    };
} & A_TYPES__Fragment_Serialized;

declare class AreProps<T extends Record<string, any> = Record<string, any>> extends A_ExecutionContext<T> {
    constructor(aseid: ASEID);
    setMultiple(values: Partial<T>): void;
}

declare class AreStore<T extends Record<string, any> = Record<string, any>> extends A_ExecutionContext<T> {
    constructor(aseid: ASEID);
    set<K extends keyof T>(values: Partial<T>): this;
    set<K extends keyof T>(key: K, value: T[K]): this;
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

declare class AddAttributeInstruction extends AreSceneInstruction<{
    name: string;
    value: string;
}> {
    get name(): string;
    get value(): string;
    constructor(node: AreNode, name: string, value: string);
}

type AreSyntaxInitOptions = {
    /**
     * Enable or disable debug mode for AreSyntax.
     * When enabled, additional logging and debugging information will be available.
     * Default is false.
     */
    debugMode?: boolean;
    /**
     * Custom interpolation delimiters for template parsing.
     * Default is ['{{', '}}'].
     */
    interpolationDelimiters?: [string, string];
    /**
     * Custom binding delimiters for data binding parsing.
     * Default is ':'.
     */
    bindingDelimiter?: string;
    /**
     * Custom listener delimiters for event binding parsing.
     * Default is '@'.
     */
    listenerDelimiter?: string;
    /**
     * Enable or disable strict mode for syntax parsing.
     * When enabled, the parser will throw errors for any syntax violations.
     * Default is true.
     */
    strictMode?: boolean;
    /**
     * A list of custom directives to be recognized by the syntax parser.
     * Each directive should be a string representing the directive name.
     * Default is an empty array.
     */
    customDirectives?: string[];
    /**
     * Enable or disable whitespace trimming in templates.
     * When enabled, leading and trailing whitespace in template expressions will be trimmed.
     * Default is true.
     */
    trimWhitespace?: boolean;
    /**
     * identifier of the root tag to use when compiling in browser context.
     */
    rootTag?: string;
    /**
     * Custom directive delimiter for directive parsing.
     * Default is '$'.
     */
    directiveDelimiter?: string;
    /**
     * List of standard HTML tags to recognize.
     */
    standardTags?: string[];
};
type AreAttribute = {
    /**
     * Tag name where the attribute was found
     */
    tag: string;
    /**
     * Property name (e.g. "label")
     */
    name: string;
    /**
     * Full raw attribute (e.g. ' :label="buttonLabel" ')
     */
    raw: string;
    /**
     * Attribute value (e.g. "buttonLabel")
     */
    value: string;
    /**
     * True if the attribute is a binding (e.g. :prop), false otherwise (e.g. prop="value")
     */
    binding: boolean;
};
type AreInterpolation = {
    /**
     * Tag name where the interpolation was found
     */
    raw: string;
    /**
     * Name of the interpolation (e.g. "userName")
     */
    name: string;
    /**
     * Position in the template where this interpolation was found
     */
    position: number;
};
type AreListener = {
    /**
     * tag name where listener was found
     */
    tag: string;
    /**
     * event name (e.g. "input")
     */
    name: string;
    /**
     * full raw attribute (e.g. ' @input="onChange"')
     */
    raw: string;
    /**
     * handler expression (e.g. "onChange")
     */
    handler: string;
};
type AreDirective = {
    /**
     * The tag name where the directive was found
     */
    tag: string;
    /**
     * The name of the directive (e.g. "$if")
     */
    name: string;
    /**
     * The full raw attribute text (e.g. '$if="condition"')
     */
    raw: string;
    /**
     * The value expression associated with the directive (e.g. "condition")
     */
    value?: string;
    /**
     * The full tag template where the directive was found
     */
    template: string;
};

declare class AreSyntaxContext extends A_Fragment {
    /**
     * Initialization options for configuring the AreSyntax context.
     */
    protected readonly config: Partial<AreSyntaxInitOptions>;
    constructor(
    /**
     * Initialization options for configuring the AreSyntax context.
     */
    config?: Partial<AreSyntaxInitOptions>);
    /**
     * identifier of the root tag to use when compiling in browser context.
     *
     * @return {string} The root tag identifier.
     */
    get rootTag(): string;
    /**
     * List of standard HTML tags to recognize.
     * [!] This is a set of tags that can be ignored when determining if a node is a custom component.
     *
     * @return {Set<string>} A set of standard HTML tag names.
     */
    get standardTags(): Set<string>;
    /**
     * Enable or disable debug mode for syntax parsing.
     * When enabled, additional debug information will be logged during parsing.
     *
     * @return {boolean} True if debug mode is enabled, false otherwise.
     */
    get debugMode(): boolean;
    /**
     * Custom interpolation delimiters for template parsing.
     * Default is ['{{', '}}'].
     *
     * @return {[string, string]} The opening and closing interpolation delimiters.
     */
    get interpolationDelimiters(): [string, string];
    /**
     * Custom binding delimiter for data binding parsing.
     * Default is ':'.
     * @return {string} The binding delimiter.
     */
    get bindingDelimiter(): string;
    /**
     * Custom listener delimiter for event binding parsing.
     * Default is '@'.
     *
     * @return {string} The listener delimiter.
     */
    get listenerDelimiter(): string;
    /**
     * Enable or disable strict mode for syntax parsing.
     * When enabled, the parser will throw errors for any syntax violations.
     * Default is true.
     *
     * @return {boolean} True if strict mode is enabled, false otherwise.
     */
    get strictMode(): boolean;
    /**
     * Enable or disable whitespace trimming in templates.
     * When enabled, leading and trailing whitespace in template expressions will be trimmed.
     * Default is true.
     *
     * @return {boolean} True if whitespace trimming is enabled, false otherwise.
     */
    get trimWhitespace(): boolean;
    /**
     * Custom directive delimiter for directive parsing.
     * Default is '$'.
     *
     * @return {string} The directive delimiter.
     */
    get directiveDelimiter(): string;
    get customDirectives(): string[];
}

declare class AreSyntax extends A_Component {
    get config(): AreSyntaxContext;
    /**
     * Determines if a tag is a root node
     *
     * @param node
     * @returns
     */
    isRootNode(node: AreNode): boolean;
    /**
     * Determines if a tag is a custom component or standard HTML
     *
     * @param node
     * @returns
     */
    isCustomNode(node: AreNode): boolean;
    /**
     * Extracts root AreNode elements from the document based on the configured root tag.
     *
     * @returns An iterable of AreNode instances representing the root elements.
     */
    extractRoots(template: string): AreNode[];
    /**
     * Extracts interpolations from template (syntax-agnostic).
     *
     * Simply finds all interpolation patterns and returns their position, raw text, and name.
     * Works with any template format - HTML, plain text, or any other syntax.
     *
     * Example: `Hello {{name}}, welcome to {{place}}!`
     * Returns: [
     *   { raw: "{{name}}", name: "name", position: 6 },
     *   { raw: "{{place}}", name: "place", position: 26 }
     * ]
     *
     * @param template - Template string in any format
     */
    extractInterpolations(template: string): AreInterpolation[];
    /**
     * Extracts custom directives from the FIRST/TOP-LEVEL opening tag ONLY.
     * Directives start with `$`
     *
     * Examples:
     *   $if="condition"
     *   $show
     *   $no-update=""
     *
     * Note: This method intentionally ignores nested elements and only processes
     * the very first opening tag in the provided template string.
     */
    extractDirectives(template: string): AreDirective[];
    /**
     * Extracts component props from the FIRST opening tag.
     *
     * Examples:
     *   label="Click"
     *   :label="'Click Me'"
     *
     * Excludes:
     *   @click
     *   $if
     */
    extractAttributes(template: string): AreAttribute[];
    /**
     * Extracts event listeners from the FIRST/TOP-LEVEL opening tag ONLY in the template.
     * Supports:
     *  - @event="handler"
     *  - @event='handler'
     *
     * Note: This method intentionally ignores nested elements and only processes
     * the very first opening tag in the provided template string.
     */
    extractListeners(template: string): AreListener[];
    isBindingProp(prop: AreAttribute): boolean;
    extractPropValue(prop: AreAttribute, parentStore: AreStore): any;
    replaceInterpolation(template: string, interpolation: AreInterpolation | string, value: any): string;
}

declare class AreSyntaxError extends A_Error {
    static readonly SyntaxParseError = "Are Syntax Parse Error";
    static readonly SyntaxNotSupportedError = "Are Syntax Not Supported Error";
    static readonly MethodNotImplementedError = "Are Syntax Method Not Implemented Error";
}

declare class AddDirectiveInstruction extends AreSceneInstruction<{
    directive: AreDirective;
    value: any;
}> {
    get directive(): AreDirective;
    get value(): any;
    constructor(node: AreNode, directive: AreDirective, value: any);
}

declare class AddStyleInstruction extends AreSceneInstruction<{
    styles: string;
}> {
    get styles(): string;
    constructor(node: AreNode, styles: string);
}

declare class AddStylePropertyInstruction extends AreSceneInstruction<{
    property: string;
    value: string;
}> {
    get styles(): string;
    get value(): string;
    constructor(node: AreNode, property: string, value: string);
}

declare class AttachListenerInstruction extends AreSceneInstruction<{
    target: AreNode;
    listener: AreListener;
}> {
    private _callback;
    get listener(): AreListener;
    get event(): string;
    get target(): AreNode;
    get callback(): (e: any) => Promise<void>;
    constructor(node: AreNode, target: AreNode, listener: AreListener);
}

declare class AttachRootNodeInstruction extends AreSceneInstruction<{}> {
    get id(): string;
    constructor(node: AreNode);
}

declare class MountNodeInstruction extends AreSceneInstruction<{
    path: string;
}> {
    get path(): string;
    constructor(node: AreNode, path: string);
}

declare class ReplaceInterpolationInstruction extends AreSceneInstruction<{
    interpolation: AreInterpolation;
    value: string;
    prevValue?: string;
}> {
    get placement(): string;
    get position(): number;
    get interpolation(): AreInterpolation;
    get value(): string;
    constructor(node: AreNode, interpolation: AreInterpolation, value: string, prevValue?: string);
}

declare class UnmountNodeInstruction extends AreSceneInstruction<{
    path: string;
}> {
    constructor(node: AreNode, path: string);
}

declare enum AreSceneInstructionFeatures {
    Init = "_AreSceneInstructionInit",
    Apply = "_AreSceneInstructionApply",
    Revert = "_AreSceneInstructionRevert"
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

declare class AreSceneError extends A_Error {
    static readonly SceneError = "AreSceneError.SceneError";
    static readonly RootNotFound = "AreSceneError.RootNotFound";
    static readonly UpdateFailed = "AreSceneError.UpdateFailed";
    static readonly MountFailed = "AreSceneError.MountFailed";
    static readonly UnmountFailed = "AreSceneError.UnmountFailed";
    static readonly MountPointNotFound = "AreSceneError.MountPointNotFound";
    static readonly InvalidTemplate = "AreSceneError.InvalidTemplate";
    static readonly RenderFailed = "AreSceneError.RenderFailed";
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

declare enum AreNodeFeatures {
    /**
     * Event fired when the element node is about to be rendered
     */
    onBeforeRender = "_AreNode_onBeforeRender",
    /**
     * Event fired when the element node is rendered
     */
    onRender = "_AreNode_onRender",
    /**
     * Event fired when the element node is after rendered
     */
    onAfterRender = "_AreNode_onAfterRender",
    /**
     * Feature that is called to compile the element node
     */
    onCompile = "_AreNode_onCompile",
    /**
     * Feature that is called to handle events
     */
    onEvent = "_AreNode_onEvent",
    /**
     * Feature that is called to update the element node
     */
    onUpdate = "_AreNode_onUpdate",
    /**
     * Feature that is called to mount the element node
     */
    onMount = "_AreNode_onMount",
    /**
     * Feature that is called to unmount the element node
     */
    onUnmount = "_AreNode_onUnmount"
}

declare class AreContext extends A_Fragment {
    protected _source: string;
    protected _roots: Array<AreNode>;
    constructor(source?: string);
    get scope(): _adaas_a_concept.A_Scope<any, _adaas_a_concept.A_TYPES__Component_Constructor<_adaas_a_concept.A_Component>[], _adaas_a_concept.A_TYPES__Error_Constructor<_adaas_a_concept.A_Error<_adaas_a_concept.A_TYPES__Error_Init, _adaas_a_concept.A_TYPES__Error_Serialized>>[], _adaas_a_concept.A_TYPES__Entity_Constructor<_adaas_a_concept.A_Entity<any, _adaas_a_concept.A_TYPES__Entity_Serialized>>[], A_Fragment<_adaas_a_concept.A_TYPES__Fragment_Serialized>[]>;
    get roots(): Array<AreNode>;
    get source(): string;
    addRoot(node: AreNode): void;
    removeRoot(node: AreNode): void;
}

declare enum AreFeatures {
    /**
     * Runs before the component is loaded into memory
     *
     * Before template, styles and data are fetched
     */
    onBeforeLoad = "_Are_onBeforeLoad",
    /**
     * Runs after the component is loaded into memory
     *
     * After template, styles and data are fetched
     */
    onAfterLoad = "_Are_onAfterLoad",
    onBeforeMount = "_Are_onBeforeMount",
    onAfterMount = "_Are_onAfterMount",
    onBeforeUnmount = "_Are_onBeforeUnmount",
    onAfterUnmount = "_Are_onAfterUnmount",
    onBeforeUpdate = "_Are_onBeforeUpdate",
    onAfterUpdate = "_Are_onAfterUpdate",
    onBeforeDestroy = "_Are_onBeforeDestroy",
    onAfterDestroy = "_Are_onAfterDestroy",
    onBeforeCompile = "_Are_onBeforeCompile",
    onAfterCompile = "_Are_onAfterCompile",
    onBeforeRender = "_Are_onBeforeRender",
    onAfterRender = "_Are_onAfterRender",
    onTemplate = "_Are_onTemplate",
    onStyles = "_Are_onStyles",
    onData = "_Are_onData",
    onSignal = "_Are_onSignal"
}

declare class AreApp extends A_Service {
    protected [A_ServiceFeatures.onAfterLoad](context: AreContext, logger?: A_Logger): Promise<void>;
    protected [A_ServiceFeatures.onStart](context: AreContext, syntax: AreSyntax, bus: A_SignalBus, logger?: A_Logger): Promise<void>;
}

declare class AreAppError extends A_Error {
}

declare class AreCompiler extends A_Component {
    index(node: AreNode): void;
    component(node: AreNode): Are | undefined;
    /**
     * Handles before load lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param feature
     * @param args
     */
    beforeLoad(node: AreNode, scope: A_Scope, feature: A_Feature, ...args: any[]): Promise<void>;
    /**
     * Loads the AreNode into the AreScene
     *
     * @param node
     * @param scope
     * @param syntax
     * @param feature
     * @param logger
     * @param args
     */
    load(node: AreNode, scope: A_Scope, syntax: AreSyntax, feature: A_Feature, logger?: A_Logger, ...args: any[]): Promise<void>;
    /**
     * Handles after load lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    afterLoad(node: AreNode, scope: A_Scope, scene: AreScene, feature: A_Feature, ...args: any[]): Promise<void>;
    /**
     * Handles before compile lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    beforeCompile(node: AreNode, scope: A_Scope, scene: AreScene, feature: A_Feature, ...args: any[]): void;
    /**
     * Compiles the AreNode using AreCompiler
     *
     *
     * @param logger
     */
    compile(
    /**
     * Actual Node no be compiled
     */
    node: AreNode, 
    /**
     * Nodes owned Scene, Node content
     */
    scene: AreScene, 
    /**
     * Parent Scene where the node is registered
     */
    parentScene: AreScene, 
    /**
     * Global Syntax Definition for parsing markup
     */
    syntax: AreSyntax, props: AreProps, store: AreStore, parentStore: AreStore, logger?: A_Logger, scope?: A_Scope): void;
    /**
     * Handles after compile lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    afterCompile(node: AreNode, scope: A_Scope, scene: AreScene, feature: A_Feature, ...args: any[]): void;
    /**
     * Handles events triggered on the AreNode
     *
     * @param node
     * @param scope
     * @param event
     * @param scene
     * @param feature
     * @param args
     */
    event(node: AreNode, scope: A_Scope, event: AreEvent, scene: AreScene, feature: A_Feature, ...args: any[]): Promise<void>;
    /**
     *  Handles before render lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    beforeRender(node: AreNode, scope: A_Scope, scene: AreScene, feature: A_Feature, ...args: any[]): void;
    /**
     * Renders the AreNode into the AreScene
     *
     * @param scope
     * @param node
     * @param scene
     * @param logger
     */
    render(
    /**
     * Node to be mounted
     */
    node: AreNode, 
    /**
     * Template Parsing Syntax to be used
     */
    syntax: AreSyntax, 
    /**
     * Node Content
     */
    scene: AreScene, 
    /**
     * Scene where target node is registered
     *
     * [!] For Root Node it doesn't exists
     */
    parentScene?: AreScene, logger?: A_Logger, ...args: any[]): void;
    /**
     * Handles after render lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    afterRender(
    /**
     * Node to be rendered
     */
    node: AreNode, scope: A_Scope, scene: AreScene, feature: A_Feature, ...args: any[]): void;
    /**
     * Handles before update lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    beforeUpdate(node: AreNode, scope: A_Scope, scene: AreScene, feature: A_Feature, ...args: any[]): void;
    /**
     * Updates the AreNode in the AreScene
     *
     * @param node
     * @param scene
     * @param args
     */
    update(
    /**
     * Node to be updated
     */
    node: AreNode, scene: AreScene, ...args: any[]): void;
    /**
     * Handles after update lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    afterUpdate(node: AreNode, scope: A_Scope, scene: AreScene, feature: A_Feature, ...args: any[]): void;
    /**
     * Handles before unmount lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    beforeUnmount(node: AreNode, scope: A_Scope, scene: AreScene, feature: A_Feature, ...args: any[]): void;
    /**
     * Unmounts the AreNode from the AreScene
     *
     * @param node
     * @param syntax
     * @param scene
     * @param parentScene
     * @param logger
     */
    unmount(
    /**
     * Node to be unmounted
     */
    node: AreNode, 
    /**
     * Template Parsing Syntax to be used
     */
    syntax: AreSyntax, 
    /**
     * Node Content
     */
    scene: AreScene, 
    /**
     * Scene where target node is registered
     *
     * [!] For Root Node it doesn't exists
     */
    parentScene?: AreScene, logger?: A_Logger): void;
    /**
     * Handles after unmount lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    afterUnmount(node: AreNode, scope: A_Scope, scene: AreScene, feature: A_Feature, ...args: any[]): void;
    handleSignalVector(vector: A_SignalVector, context: AreContext, state: A_SignalState, scope: A_Scope, logger?: A_Logger): void;
}

declare class AreCompilerError extends A_Error {
    static readonly RenderError = "Are Compiler Render Error";
    static readonly CompilationError = "Are Compiler Compilation Error";
}

declare class AreRoot extends Are {
    attachListeners(): Promise<void>;
    template(node: AreNode, store: AreStore): Promise<void>;
    onSignal(node: AreNode, store: AreStore, scene: AreScene, vector: A_SignalVector, event: AreEvent): Promise<void>;
}

declare class AreHTMLCompiler extends AreCompiler {
    /**
     * Get DOM element by string path from root element
     * Works with paths generated by the string-based parser
     */
    getElementByPath(root: Element, path?: string): Element | undefined;
    /**
     * Get DOM element by AreNode based on its scene path
     *
     * @param node
     * @returns
     */
    getElementByNode(node: AreNode): Element | undefined;
    /**
     * Insert DOM element at specified path within root element
     *
     * @param root
     * @param path
     * @param element
     */
    insertElementAtPath(root: Element, path: string, element: Element): void;
    /**
     * Insert DOM element corresponding to AreNode at its scene path
     *
     * @param node
     * @param element
     */
    insertElementByNode(node: AreNode, element: Element): void;
    /**
     * Index the elements of the given AreNode within its scene
     *
     * @param node
     */
    index(node: AreNode): void;
    /**
     * Create a position-based mapping by parsing the original template with DOM
     * This ensures 1:1 correspondence between DOM structure and original markup
     */
    private createPositionBasedMarkupMap;
    /**
     * Recursively map DOM positions to their exact original markup
     */
    private mapDOMPositions;
    /**
     * Index elements using actual DOM structure with position-based markup mapping
     */
    private indexElementsFromDOM;
    applyAttachRootNodeInstruction(instruction: AttachRootNodeInstruction, logger?: A_Logger): void;
    applyMountNodeInstruction(instruction: MountNodeInstruction, context: A_ExecutionContext<{
        element: Element;
        mountPoint: Element;
        content: AreScene;
    }>, syntax: AreSyntax, logger?: A_Logger): void;
    applyUnmountNodeInstruction(instruction: UnmountNodeInstruction, context: A_ExecutionContext<{
        element: Element;
        mountPoint: Element;
        content: AreScene;
    }>, logger?: A_Logger): void;
    applyAddStyleInstruction(instruction: AddStyleInstruction, context: A_ExecutionContext<{
        element: Element;
        mountPoint: Element;
        content: AreScene;
    }>, logger?: A_Logger): void;
    applyAttachListenerInstruction(instruction: AttachListenerInstruction, context: A_ExecutionContext<{
        element: Element;
        mountPoint: Element;
        content: AreScene;
    }>, logger?: A_Logger): void;
    applyAddAttributeInstruction(instruction: AddAttributeInstruction, context: A_ExecutionContext<{
        element: Element;
        mountPoint: Element;
        content: AreScene;
    }>, scope: A_Scope, logger?: A_Logger): void;
    revertInstruction(instruction: ReplaceInterpolationInstruction): void;
    interpolationTextNodes: Map<string, Text>;
    applyReplaceInterpolationInstruction(instruction: ReplaceInterpolationInstruction, context: A_ExecutionContext<{
        element: Element;
        mountPoint: Element;
        content: AreScene;
    }>, scope: A_Scope, syntax: AreSyntax, logger?: A_Logger): void;
    initAddDirectiveInstruction(instruction: AddDirectiveInstruction, scope: A_Scope, logger?: A_Logger): void;
    applyAddDirectiveInstruction(instruction: AddDirectiveInstruction, context: A_ExecutionContext<{
        element: Element;
        mountPoint: Element;
        content: AreScene;
    }>, scope: A_Scope, logger?: A_Logger): void;
}

declare class AreHTMLEngine extends A_Component {
    /**
     * Inject AreHTMLSyntax into the container scope before loading
     *
     * @param container
     */
    injectSyntax(container: A_Container, syntax?: AreSyntaxContext, compiler?: AreHTMLCompiler, logger?: A_Logger): Promise<void>;
}

declare class AreInitSignal extends A_Signal {
    static default(): Promise<A_Signal | undefined>;
}

declare class AreRouteSignal extends A_Signal<{
    route: A_Route;
}> {
    constructor(path: string | RegExp);
    get route(): A_Route;
    static default(): Promise<A_Signal | undefined>;
}

export { AddAttributeInstruction, AddDirectiveInstruction, AddStyleInstruction, AddStylePropertyInstruction, Are, AreApp, AreAppError, type AreAttribute, AreCompiler, AreCompilerError, AreContext, type AreDirective, AreEvent, type AreEventProps, AreFeatures, AreHTMLCompiler, AreHTMLEngine, AreIndex, AreInitSignal, type AreInterpolation, type AreListener, AreNode, AreNodeFeatures, type AreNodeNewProps, type AreNodeOptionalProps, type AreNodeProps, AreProps, AreRoot, AreRouteSignal, type AreSCene_Serialized, AreScene, AreSceneError, AreSceneInstruction, AreSceneInstructionFeatures, type AreSceneInstructionNewProps, AreStore, AreSyntax, AreSyntaxContext, AreSyntaxError, type AreSyntaxInitOptions, AttachListenerInstruction, AttachRootNodeInstruction, MountNodeInstruction, ReplaceInterpolationInstruction, UnmountNodeInstruction };
