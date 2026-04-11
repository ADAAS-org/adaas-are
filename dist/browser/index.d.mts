import * as _adaas_a_concept from '@adaas/a-concept';
import { A_Component, A_Fragment, A_Entity, A_Scope, ASEID, A_TYPES__Entity_Serialized, A_TYPES__Entity_Constructor, A_Error, A_Feature, A_TYPES__Paths, A_TYPES__Fragment_Serialized, A_TYPES__Ctor, A_ComponentMeta, A_TYPES__ComponentMeta, A_TYPES__Component_Constructor, A_TYPES__A_DependencyInjectable } from '@adaas/a-concept';
import { A_SignalVector, A_Signal, A_SignalState, A_SignalBus } from '@adaas/a-utils/a-signal';
import { AreNode as AreNode$1 } from '@adaas/are/node/AreNode.entity';
import { A_ExecutionContext } from '@adaas/a-utils/a-execution';
import { AreEvent as AreEvent$1 } from '@adaas/are/event/AreEvent.context';
import { AreScene as AreScene$1 } from '@adaas/are/scene/AreScene.context';
import { AreAttribute as AreAttribute$1 } from '@adaas/are/attribute/AreAttribute.entity';
import { Are as Are$1 } from '@adaas/are/component/Are.component';
import { AreSyntaxTokenMatch as AreSyntaxTokenMatch$1, AreSyntaxTokenPayload as AreSyntaxTokenPayload$1, AreSyntaxTokenRules as AreSyntaxTokenRules$1 } from '@adaas/are/syntax/AreSyntax.types';
import { AreStore as AreStore$1 } from '@adaas/are/store/AreStore.context';
import { AreSyntax as AreSyntax$1 } from '@adaas/are/syntax/AreSyntax.context';
import { AreContext as AreContext$1 } from '@adaas/are/component/Are.context';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { AreInstruction as AreInstruction$1 } from '@adaas/are/instruction/AreInstruction.entity';
import { AreDeclaration as AreDeclaration$1 } from '@adaas/are/instruction/types/AreDeclaration.instruction';
import { AreInstructionSerialized as AreInstructionSerialized$1, AreInstructionNewProps as AreInstructionNewProps$1 } from '@adaas/are/instruction/AreInstruction.types';
import { AreMutation as AreMutation$1 } from '@adaas/are/instruction/types/AreMutation.instruction';
import { AreStoreWatchingEntity as AreStoreWatchingEntity$1 } from '@adaas/are/store/AreStore.types';
import { AreSignal as AreSignal$1 } from '@adaas/are/signals/AreSignal.entity';
import { A_Route } from '@adaas/a-utils/a-route';
import { AreCompiler as AreCompiler$1 } from '@adaas/are/compiler/AreCompiler.component';
import { AreTransformer as AreTransformer$1 } from '@adaas/are/transformer/AreTransformer.component';
import { AreLoader as AreLoader$1 } from '@adaas/are/loader/AreLoader.component';
import { AreInterpreter as AreInterpreter$1 } from '@adaas/are/interpreter/AreInterpreter.component';
import { AreLifecycle as AreLifecycle$1 } from '@adaas/are/lifecycle/AreLifecycle.component';
import { AreTokenizer as AreTokenizer$1 } from '@adaas/are/tokenizer/AreTokenizer.component';
import { AreSignals as AreSignals$1 } from '@adaas/are/signals/AreSignals.component';

declare const AreFeatures: {
    /**
     * Allows to define a custom method for the component's initialization logic. This method is called before the component is initialized and can be used to perform any necessary setup or configuration before the component is rendered. It can also be used to implement custom logic for handling specific features or behaviors of the component during the initialization process.
     */
    readonly onBeforeInit: "_Are_onBeforeInit";
    /**
     * Allows to define a custom method for the component's logic that should be executed after the component has been initialized. This method is called after the component has been initialized and can be used to perform any necessary setup or configuration based on the initial state of the component. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-initialization process.
     */
    readonly onAfterInit: "_Are_onAfterInit";
    /**
     * Allows to define a custom method for the component's mounting logic. This method is called before the component is mounted to the DOM and can be used to perform any necessary setup or configuration before the component is rendered. It can also be used to implement custom logic for handling specific features or behaviors of the component during the mounting process.
     */
    readonly onBeforeMount: "_Are_onBeforeMount";
    /**
     * Allows to define a custom method for the component's logic that should be executed after the component has been mounted to the DOM. This method is called after the component has been mounted and can be used to perform any necessary setup or configuration based on the initial state of the component and its presence in the DOM. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-mounting process.
     */
    readonly onAfterMount: "_Are_onAfterMount";
    /**
     * Allows to define a custom method for the component's unmounting logic. This method is called before the component is unmounted from the DOM and can be used to perform any necessary cleanup or teardown before the component is removed. It can also be used to implement custom logic for handling specific features or behaviors of the component during the unmounting process.
     */
    readonly onBeforeUnmount: "_Are_onBeforeUnmount";
    /**
     * Allows to define a custom method for the component's logic that should be executed after the component has been unmounted from the DOM. This method is called after the component has been unmounted and can be used to perform any necessary cleanup or teardown based on the final state of the component and its removal from the DOM. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-unmounting process.
     */
    readonly onAfterUnmount: "_Are_onAfterUnmount";
    /**
     * Allows to define a custom method for the component's update logic. This method is called whenever the component's state changes and can be used to perform any necessary updates or side effects based on the new state. It can also be used to optimize performance by implementing custom logic for determining when the component should re-render based on specific state changes.
     */
    readonly onBeforeUpdate: "_Are_onBeforeUpdate";
    /**
     * Allows to define a custom method for the component's logic that should be executed after the component's state has been updated. This method is called after the component has re-rendered in response to state changes, and can be used to perform any necessary side effects or additional updates based on the new state. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-update process.
     */
    readonly onAfterUpdate: "_Are_onAfterUpdate";
    /**
     * Allows to define a custom method for the component's logic that should be executed before the component is destroyed. This method is called before the component is destroyed and can be used to perform any necessary cleanup or teardown based on the final state of the component. It can also be used to implement custom logic for handling specific features or behaviors of the component during the pre-destruction process.
     */
    readonly onBeforeDestroy: "_Are_onBeforeDestroy";
    /**
     * Allows to define a custom method for the component's logic that should be executed after the component is destroyed. This method is called after the component has been destroyed and can be used to perform any necessary cleanup or teardown based on the final state of the component. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-destruction process.
     */
    readonly onAfterDestroy: "_Are_onAfterDestroy";
    readonly onTemplate: "_Are_onTemplate";
    readonly onStyles: "_Are_onStyles";
    readonly onData: "_Are_onData";
    readonly onSignal: "_Are_onSignal";
};

type AreContextInit = {
    /**
     * The base template to be used for rendering and compilation.
     */
    source?: string;
    /**
     * Conditions Mapping between roots and signals associated with components rendered inside the roots. This can be used to manage complex rendering logic and to optimize performance by ensuring that components are only rendered when necessary based on the defined conditions.
     */
    map: {
        [rootName: string]: A_SignalVector;
    };
};
type ArePropDefinition = {
    /**
     * The type of the property, which can be used for validation and parsing purposes. This can include basic types like 'string', 'number', 'boolean', as well as more complex types like 'object' or 'array'.
     */
    type: string;
    /**
     * The default value of the property, which will be used if the property is not provided during the component's usage. This can help ensure that the component has a consistent behavior even when certain props are omitted.
     */
    default: any;
};
/**
 * The names of the features that can be implemented by the AreComponent entity. These features correspond to specific methods that can be defined on the AreComponent class to provide custom behavior for handling signals, defining the component's template, styles, data, and other aspects of its functionality within the ARE framework. Each feature name is associated with a specific method that should be implemented to handle the corresponding aspect of the component's behavior and lifecycle within the ARE framework.
 */
type AreFeatureNames = typeof AreFeatures[keyof typeof AreFeatures];

declare class Are extends A_Component {
    /**
     * Allows to apply Signal Vector as a condition for rendering the component. The component will be rendered only if at least one of the signals in the vector is active. This can be used to manage complex rendering logic and to optimize performance by ensuring that components are only rendered when necessary based on the defined conditions.
     *
     * @param signals
     * @returns
     */
    static Condition(vector: A_SignalVector): any;
    static Condition(vector: Array<A_Signal>): any;
    /**
     * Allows to define a custom method for the component's template. This method should return a string representing the HTML template of the component. The template can include dynamic content and bindings that will be processed during rendering to create the final DOM structure for the component.
     */
    static get EventHandler(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    /**
     * Allows to define a custom method for the component's template. This method should return a string representing the HTML template of the component. The template can include dynamic content and bindings that will be processed during rendering to create the final DOM structure for the component.
     */
    static get onBeforeInit(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    /**
     * Allows to define a custom method for the component's initialization logic. This method is called after the component is instantiated but before it is rendered, and can be used to set up any necessary state, perform data fetching, or execute any other logic that needs to happen before the component is rendered for the first time.
     */
    static get onAfterInit(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    /**
     * Allows to define a custom method for the component's mounting logic. This method is called after the component has been rendered and added to the DOM, and can be used to perform any necessary setup or initialization that requires access to the DOM elements of the component. It can also be used to implement custom logic for handling specific features or behaviors of the component during the mounting process.
     */
    static get onBeforeMount(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    /**
     * Allows to define a custom method for the component's logic that should be executed after the component is mounted. This method is called after the component has been rendered and added to the DOM, and can be used to perform any necessary setup or initialization that requires access to the DOM elements of the component. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-mounting process.
     */
    static get onAfterMount(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    /**
     * Allows to define a custom method for the component's unmounting logic. This method is called before the component is removed from the DOM, and can be used to perform any necessary cleanup or teardown, such as removing event listeners, canceling timers, or releasing any resources that were allocated during the component's lifecycle. It can also be used to implement custom logic for handling specific features or behaviors of the component during the unmounting process.
     */
    static get onBeforeUnmount(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    /**
     * Allows to define a custom method for the component's logic that should be executed after the component is unmounted. This method is called after the component has been removed from the DOM, and can be used to perform any necessary cleanup or teardown that needs to happen after the component is no longer in the DOM. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-unmounting process.
     */
    static get onAfterUnmount(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    /**
     * Allows to define a custom method for the component's update logic. This method is called whenever the component's state changes and can be used to perform any necessary updates or side effects based on the new state. It can also be used to optimize performance by implementing custom logic for determining when the component should re-render based on specific state changes.
     */
    static get onBeforeUpdate(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    /**
     * Allows to define a custom method for the component's logic that should be executed after the component's state has been updated. This method is called after the component has re-rendered in response to state changes, and can be used to perform any necessary side effects or additional updates based on the new state. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-update process.
     */
    static get onAfterUpdate(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    /**
     * Allows to define a custom method for the component's template. This method should return a string representing the HTML template of the component. The template can include dynamic content and bindings that will be processed during rendering to create the final DOM structure for the component.
     */
    static get Template(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    /**
     * Allows to define a custom method for the component's styles. This method should return a string representing the CSS styles of the component. The styles can include dynamic content and can be processed during rendering to apply the appropriate styles to the component's DOM elements.
     */
    static get Styles(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    /**
     * Allows to define a custom method for the component's data. This method should return an object representing the initial state of the component. The data can include any properties that are needed to manage the component's state and can be reactive, allowing the component to re-render when the data changes.
     */
    static get Data(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    /**
     * Allows to define a custom method for handling signals emitted by the component or other parts of the application. This method can be used to implement custom logic for responding to specific signals, such as user interactions, state changes, or other events that may affect the component's behavior or appearance. By defining this method, developers can create more dynamic and interactive components that can react to changes in the application state or user input in a flexible and efficient way.
     */
    static get Signal(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    /**
     * Props can be used to store any additional data or configuration for the component. They are not reactive by default but can be used in the component's methods and lifecycle hooks to manage state or pass information. Props can be defined as a simple object with key-value pairs, where keys are the prop names and values are the prop values. They can be accessed and modified within the component's methods to influence rendering or behavior based on the component's state or external inputs.
     */
    props: Record<string, ArePropDefinition>;
    /**
     * Returns the template string for the component
     *
     * Could be overridden to provide dynamic templates based on component state
     *
     * @returns
     */
    template(...args: any[]): Promise<void> | void;
    /**
     * Returns the styles string for the component
     *
     * Could be overridden to provide dynamic styles based on component state
     *
     * @returns
     */
    styles(...args: any[]): Promise<void> | void;
    /**
     * Returns the data object for the component
     *
     * Uses as the initial state of the component
     *
     * @returns
     */
    data(...args: any[]): Promise<void> | void;
}

declare class AreContext extends A_ExecutionContext {
    /**
     * The source string represents the original template or input from which the ARE scene is generated. This can be used for debugging, error reporting, or any features that require access to the raw template data. The roots array holds references to the root nodes of the ARE scene, allowing for easy access and management of the top-level components in the rendering hierarchy. The signalsMap is a mapping between root nodes and their associated signal vectors, enabling efficient management of reactive updates and interactions within the ARE framework based on changes in the application state or user input.
     */
    protected _source: string;
    /**
     * The roots array holds references to the root nodes of the ARE scene, allowing for easy access and management of the top-level components in the rendering hierarchy. The signalsMap is a mapping between root nodes and their associated signal vectors, enabling efficient management of reactive updates and interactions within the ARE framework based on changes in the application state or user input.
     */
    protected _roots: Array<AreNode$1>;
    /**
     * This property stores a map between root node and conditions that should be met to render particular component inside the root node. This can be used to manage complex rendering logic and to optimize performance by ensuring that components are only rendered when necessary based on the defined conditions.
     */
    protected _signalsMap: Map<string, A_SignalVector>;
    protected _performance: Map<string, number>;
    protected _performanceStart: Map<string, number>;
    protected _performanceDepth: Map<string, number>;
    /**
     * The global object can be used to store any global data or configurations that need to be accessed across different components and entities within the ARE framework. This can include things like theme settings, user preferences, or any other shared data that is relevant to the entire scene or application. By centralizing this information in the context, it allows for easier management and access to global state without needing to pass it through multiple layers of components or entities.
     */
    get globals(): any;
    constructor(
    /**
     * The source string represents the original template or input from which the ARE scene is generated. This can be used for debugging, error reporting, or any features that require access to the raw template data. The roots array holds references to the root nodes of the ARE scene, allowing for easy access and management of the top-level components in the rendering hierarchy. The signalsMap is a mapping between root nodes and their associated signal vectors, enabling efficient management of reactive updates and interactions within the ARE framework based on changes in the application state or user input.
     */
    source?: string);
    /**
     * The scope of the context, which can be used to access other entities and features within the same scope. This is particularly useful for components that need to interact with other parts of the scene or component, as it allows them to access shared data and functionality without needing to pass it explicitly through parameters.
     */
    get scope(): _adaas_a_concept.A_Scope<any, _adaas_a_concept.A_TYPES__Component_Constructor<_adaas_a_concept.A_Component>[], _adaas_a_concept.A_TYPES__Error_Constructor<_adaas_a_concept.A_Error<_adaas_a_concept.A_TYPES__Error_Init, _adaas_a_concept.A_TYPES__Error_Serialized>>[], _adaas_a_concept.A_TYPES__Entity_Constructor<_adaas_a_concept.A_Entity<any, _adaas_a_concept.A_TYPES__Entity_Serialized>>[], A_Fragment<_adaas_a_concept.A_TYPES__Fragment_Serialized>[]>;
    /**
     * The roots array holds references to the root nodes of the ARE scene, allowing for easy access and management of the top-level components in the rendering hierarchy. The signalsMap is a mapping between root nodes and their associated signal vectors, enabling efficient management of reactive updates and interactions within the ARE framework based on changes in the application state or user input.
     */
    get roots(): Array<AreNode$1>;
    /**
     * This property stores a map between root node and conditions that should be met to render particular component inside the root node. This can be used to manage complex rendering logic and to optimize performance by ensuring that components are only rendered when necessary based on the defined conditions.
     */
    get source(): string;
    get performance(): Array<string>;
    get stats(): string[];
    protected countInstructions(node: AreNode$1): number;
    protected countNodes(node: AreNode$1): number;
    /**
     * This property stores a map between root node and conditions that should be met to render particular component inside the root node. This can be used to manage complex rendering logic and to optimize performance by ensuring that components are only rendered when necessary based on the defined conditions.
     *
     * @param node
     */
    addRoot(node: AreNode$1): void;
    /**
     * This property stores a map between root node and conditions that should be met to render particular component inside the root node. This can be used to manage complex rendering logic and to optimize performance by ensuring that components are only rendered when necessary based on the defined conditions.
     *
     * @param node
     */
    removeRoot(node: AreNode$1): void;
    startPerformance(label?: string): void;
    endPerformance(label: string): void;
}

declare const AreNodeFeatures: {
    /**
     * Feature that is called to handle before init lifecycle of the element node
     */
    readonly onBeforeInit: "_AreNode_onBeforeInit";
    /**
     * Feature that is called to init the element node
     */
    readonly onInit: "_AreNode_onInit";
    /**
     *
     */
    readonly onAfterInit: "_AreNode_onAfterInit";
    /**
     * Feature that is called to handle before mount lifecycle of the element node
     */
    readonly onBeforeMount: "_AreNode_onBeforeMount";
    /**
     * Feature that is called to mount the element node
     */
    readonly onMount: "_AreNode_onMount";
    /**
     * Feature that is called to handle after mount lifecycle of the element node
     */
    readonly onAfterMount: "_AreNode_onAfterMount";
    /**
     * Feature that is called to handle before update lifecycle of the element node
     */
    readonly onBeforeUpdate: "_AreNode_onBeforeUpdate";
    /**
     * Feature that is called to handle update lifecycle of the element node
     */
    readonly onUpdate: "_AreNode_onUpdate";
    /**
     * Feature that is called to handle after update lifecycle of the element node
     */
    readonly onAfterUpdate: "_AreNode_onAfterUpdate";
    /**
     * Feature that is called to handle before unmount lifecycle of the element node
     */
    readonly onBeforeUnmount: "_AreNode_onBeforeUnmount";
    /**
     * Feature that is called to unmount the element node
     */
    readonly onUnmount: "_AreNode_onUnmount";
    /**
     * Feature that is called to handle after unmount lifecycle of the element node
     */
    readonly onAfterUnmount: "_AreNode_onAfterUnmount";
    /**
     * Feature that is called to handle before destroy lifecycle of the element node
     */
    readonly onBeforeDestroy: "_AreNode_onBeforeDestroy";
    /**
     * Feature that is called to handle before destroy lifecycle of the element node
     */
    readonly onDestroy: "_AreNode_onDestroy";
    /**
     * Feature that is called to handle after destroy lifecycle of the element node
     */
    readonly onAfterDestroy: "_AreNode_onAfterDestroy";
    /**
     * Feature that is called to tokenize the element node template and extract its content, attributes, and child nodes.
     */
    readonly onTokenize: "_AreNode_onTokenize";
    /**
     * Feature that is called to transform the element node template, markup, styles, and data into a format that can be used for compilation. This feature is responsible for processing the raw template and extracting the necessary information to create the render plan and instructions for the node.
     */
    readonly onTransform: "_AreNode_onTransform";
    /**
     * Event fired when the element node is interpreted
     */
    readonly onInterpret: "_AreNode_onInterpret";
    /**
     * Feature that is called to compile the element node
     */
    readonly onCompile: "_AreNode_onCompile";
    /**
     * Feature that is called to handle events
     */
    readonly onEmit: "_AreNode_onEmit";
};
declare const AreNodeStatuses: {
    /**
     * Status indicating that the node is pending compilation. When a node is in the pending status, it means that it has been created but has not yet been compiled. During this phase, the node is typically being prepared for compilation, which may involve setting up its template, markup, styles, and any associated data or context. Once the node is ready for compilation, its status will change to "compiling".
     */
    readonly Pending: "pending";
    /**
     * Status indicating that the node is in the process of being compiled. During this status, the node is being analyzed and transformed based on its template, markup, and styles to generate the necessary instructions for rendering and updating the node in the scene.
     */
    readonly Compiling: "compiling";
    /**
     * Status indicating that the node has been compiled and is ready to be rendered. In this status, the node has generated all the necessary instructions and is prepared to be mounted in the scene.
     */
    readonly Compiled: "compiled";
    /**
     * Status indicating that the node is currently mounted in the scene. When a node is mounted, it means that it has been rendered and is actively part of the scene's structure and content.
     */
    readonly Mounted: "mounted";
    /**
     * Status indicating that the node has been unmounted from the scene. When a node is unmounted, it means that it has been removed from the scene's structure and content, and is no longer actively rendered in the scene.
     */
    readonly Unmounted: "unmounted";
};

type AreNodeNewProps = AreSyntaxTokenMatch$1;
type AreNodeFeatureNames = typeof AreNodeFeatures[keyof typeof AreNodeFeatures];
type AreNodeStatusNames = typeof AreNodeStatuses[keyof typeof AreNodeStatuses];

declare class AreNode extends A_Entity<AreNodeNewProps> {
    /**
     * The current status of the node, which can be used to track the lifecycle and rendering state of the node within the scene.
     */
    status: AreNodeStatusNames;
    /**
     * The opening string that defines the start of a node in the source. This is typically used for parsing and tokenizing the source to identify the structure and content of the node. The opening string can include the tag name, attributes, and other syntax that indicates the beginning of a node.
     */
    protected _opening: string;
    /**
     * The closing string that defines the end of a node in the source. This is typically used for parsing and tokenizing the source to identify the structure and content of the node. The closing string can include the tag name, attributes, and other syntax that indicates the end of a node.
     */
    protected _closing: string;
    /**
     * The position of the node in the source string, which can be used for error reporting, debugging, and other purposes related to tracking the location of the node within the original source. The position is a character index identifying where the node is defined.
     */
    protected _position: number;
    /**
     * The payload associated with the node, which can include any additional data or metadata that is extracted during the tokenization process. The payload can be used to store custom information related to the node, such as directive arguments, binding expressions, or any other relevant data that may be needed for processing and rendering the node within the scene.
     */
    protected _payload?: AreSyntaxTokenPayload$1;
    /**
     * Content string defined for the node — the inner content between delimiters.
     * Example: `{{name}}`
     */
    protected _content: string;
    /**
     * Markup string defined for the node
     * Example: `<custom-component :prop="value"> <div>Inner Content</div> </custom-component>`
     */
    protected _markup: string;
    /**
     * The scope associated with this node
     * uses to store all nested fragments and entities like other AreNodes and Scene
     */
    protected _scope: A_Scope;
    /**
     * Actual node identifier.
     */
    get id(): string;
    /**
     * Actual node type.
     * By default it's a tag name
     */
    get type(): string;
    /**
     * Content string defined for the node — the inner content between delimiters.
     * Example: `{{name}}`
     */
    get content(): string;
    /**
     * Markup string defined for the node
     * Example: `<custom-component :prop="value"> <div>Inner Content</div> </custom-component>`
     */
    get markup(): string;
    /**
     * The scope associated with this node
     * uses to store all nested fragments and entities like other AreNodes and Scene
     */
    get scope(): A_Scope;
    /**
     * The attributes defined for the node, which can include static attributes, binding attributes, directive attributes, and event attributes. These attributes are extracted during tokenization and processed during the compilation phase to generate the corresponding SceneInstructions for rendering and updating the node in the scene.
     */
    get attributes(): AreAttribute$1[];
    /**
     * A custom component associated with this node, which can be used to provide custom logic and behavior for the node. This component is typically defined in the context and can be resolved based on the node's type or other identifying information. The component can include its own content, markup, styles, and features that are specific to the functionality it provides.
     *
     * Example: If the node type is "custom-component", the corresponding component would be resolved from the context and can be used to provide custom rendering and behavior for nodes of that type.
     *
     * [!] Note: The component is optional and may not be defined for all nodes. If no component is associated with the node, it will be treated as a standard HTML element or a basic node without custom logic.
     */
    get component(): Are$1 | undefined;
    /**
     * The parent node of this node, which is the node that registered the current node in its scope. This is typically the node that is responsible for rendering the current node and managing its lifecycle within the scene. The parent node can be used to access shared context, propagate events, and manage interactions between nodes in a hierarchical structure.
     *
     * Example: For a node defined as `<div><span>Child Node</span></div>`, the parent node of the `<span>` element would be the `<div>` element, which is responsible for rendering the `<span>` and managing its lifecycle within the scene.
     */
    get parent(): AreNode | undefined;
    /**
     * The child nodes of this node, which are typically defined in the markup and registered in the scope as child entities. These child nodes can represent nested elements or components within the node and can have their own content, markup, styles, and features. The child nodes are managed within the scope of the parent node and can be accessed and manipulated as needed for rendering, updating, and lifecycle management.
     *
     * Example: For a node defined as `<div><span>Child Node</span></div>`, the child node would be the `<span>` element, which is registered as a child entity in the scope of the parent `<div>` node.
     */
    get children(): (AreNode)[];
    /**
     * It returns the scene where the node exists, so it should be the scene of the rootNode,
     * primary parent of this node.
     */
    get scene(): AreScene$1;
    protected _scene: AreScene$1;
    fromNew(newEntity: AreNodeNewProps): void;
    fromASEID(aseid: string | ASEID): void;
    /**
     * Sets the content string for the node — the inner text/markup between the node's
     * opening and closing delimiters. Content is processed by the rendering engine to
     * generate the corresponding SceneInstructions for rendering the node.
     *
     * @param content
     */
    setContent(content: string): void;
    /**
     * Sets the markup string for the node, which is the full raw matched string including delimiters. The markup can include HTML-like syntax, custom components, directives, and other features that are processed by the rendering engine to generate the corresponding SceneInstructions for rendering the node.
     *
     * @param markup
     */
    setMarkup(markup: string): void;
    /**
     * Adds a child node to the current node's scope and ensures the child inherits from this node's scope.
     *
     * @param child - The node to add as a child
     */
    addChild(child: AreNode): void;
    /**
     * Removes a child node from the current node's scope. This is typically used when a child node is no longer needed or should be detached from the parent node. The method ensures that the child node is properly deregistered from the scope and any associated resources are cleaned up as necessary.
     *
     * @param node  - The child node to be removed from the current node's scope
     */
    removeChild(node: AreNode): void;
    /**
     * Executes initialization logic for the node, which typically involves setting up the node's scope, registering any necessary entities, and preparing the node for rendering and interaction within the scene. This method is called during the initial phase of the node's lifecycle and is responsible for ensuring that the node is properly initialized before it is compiled and rendered in the scene.
     */
    init(): void;
    /**
     * Loads the node, which typically involves executing any necessary setup or initialization logic to prepare the node for rendering and interaction within the scene. This may include processing the node's content, markup, styles, and features to generate the corresponding SceneInstructions, as well as setting up any event listeners or reactive properties as needed.
     */
    load(): Promise<any>;
    /**
     * Tokenizes the node content, which typically involves parsing the raw content string to identify the structure, child nodes, attributes, directives, and other features. This process is essential for breaking down the content into its constituent parts and preparing it for further processing during the compilation phase. The tokenization process can involve creating child nodes, extracting attributes and their values, and identifying any directives or bindings that need to be processed during rendering.
     */
    tokenize(): void;
    /**
     * Transforms the node, which typically involves executing any necessary logic to reshape the node's structure or content before it is compiled and rendered in the scene. This may include applying any transformations defined by directives, processing any dynamic content or expressions, and performing any other necessary tasks to ensure that the node is properly prepared for compilation and rendering based on its content, markup, styles, and features.
     */
    transform(): void;
    /**
     * Compile the node. This method should transform the node's content, markup, and styles into a set of SceneInstructions that can be executed to render the node in the scene. The compile method is responsible for processing the node's features, attributes, directives, and other properties to generate the necessary instructions for rendering and updating the node in response to changes in state or context.
     *
     * [!] Note: The compile method should ensure that the node's scope is properly inherited from the context scope before processing, and it should handle any errors that may occur during compilation to ensure that the node can be rendered correctly in the scene.
     */
    compile(): void;
    /**
     * Mounts the node, which typically involves executing any necessary logic to render the node in the scene and to set up any interactions or behaviors associated with the node. This may include applying the generated SceneInstructions from the compile phase, attaching event listeners, and performing any other necessary tasks to ensure that the node is properly rendered and functional within the scene.
     *
     * [!] Note: The mount method should ensure that the node's scope is properly inherited from the context scope before performing any mounting logic, and it should handle any errors that may occur during mounting to ensure that the node can be rendered correctly in the scene.
     */
    mount(): void;
    /**
     * Interprets the node, which typically involves executing any necessary logic to process the node's features, attributes, directives, and other properties to generate the corresponding SceneInstructions for rendering and updating the node in response to changes in state or context. This method is responsible for ensuring that the node is properly interpreted based on its content, markup, styles, and features to enable dynamic behavior and responsiveness within the scene.
     *
     * [!] Note: The interpret method should NOT go though own child, since it may be used by both mount and update operations!
     */
    interpret(): void;
    /**
     * Updates the node, which typically involves executing any necessary logic to update the node's rendering and behavior in response to changes in state, context, or other factors. This may include reapplying SceneInstructions, updating event listeners, and performing any other necessary tasks to ensure that the node remains functional and correctly rendered within the scene as changes occur.
     *
     * [!] Note: The update method should ensure that the node's scope is properly inherited from the context scope before performing any update logic, and it should handle any errors that may occur during updating to ensure that the node can be updated correctly in the scene.
     */
    update(): void;
    /**
     * Unmounts the node, which typically involves executing any necessary logic to remove the node from the scene and to clean up any resources associated with the node. This may include reverting any applied SceneInstructions, detaching event listeners, and performing any other necessary tasks to ensure that the node is properly removed from the scene and that resources are released as needed.
     *
     * [!] Note: The unmount method should ensure that the node's scope is properly inherited from the context scope before performing any unmounting logic, and it should handle any errors that may occur during unmounting to ensure that the node can be removed correctly from the scene.
     */
    unmount(): void;
    cloneWithScope<T extends AreNode = AreNode>(this: T): T;
    reset(): void;
    clone<T extends AreNode = AreNode>(this: T): T;
    /**
     * Emits an event or a scope to the node, which can be used to trigger event handlers or to provide additional context for processing within the node. The method can accept either an AreEvent instance or an A_Scope instance, and it will handle the emission accordingly. This allows for flexible communication and interaction within the node's context, enabling dynamic behavior and responsiveness based on events or changes in scope.
     *
     * @param scope - The scope or event to be emitted to the node
     */
    emit(scope: A_Scope): any;
    emit(event: AreEvent$1): any;
    /**
     * Destroys the node, which typically involves executing any necessary cleanup logic to remove the node from the scene and to free up any resources associated with the node. This may include deregistering the node from its scope, removing any event listeners or reactive properties, and performing any other necessary cleanup tasks to ensure that the node is properly removed from the scene and that resources are released as needed.
     *
     * [!] Note: The destroy method should ensure that the node's scope is properly inherited from the context scope before performing any cleanup, and it should handle any errors that may occur during destruction to ensure that resources are released correctly.
     */
    destroy(): Promise<any>;
    /**
     * Method to ensure that the current scope is inherited from the context scope
     *
     * @throws A_Error if the scope is not inherited from the context scope
     */
    protected checkScopeInheritance(): void;
}

declare const AreAttributeFeatures: {
    /**
     * Initializes the attribute. This method is called when the attribute is first created and should set up any necessary state or perform any initial processing based on the provided content and context. It can also be used to validate the attribute's content and throw errors if it is invalid.
     */
    readonly Init: "_AreAttribute_Init";
    /**
     * Uses to generate all rendering instructions for the attribute. This method is called during the compilation phase of the ARE component and should return an array of instructions that describe how to render the attribute based on its content and context. The instructions can include details such as which DOM properties to set, which events to listen for, and how to update the attribute when the underlying data changes.
     */
    readonly Transform: "_AreAttribute_Transform";
    /**
     * Feature that should convert a directiveAttribute definition into a set of SceneInstructions to be rendered correctly
     */
    readonly Compile: "_AreAttribute_Compile";
    /**
     * Feature that should update the directiveAttribute based on the changes in the store or other dependencies. This method is called during the update phase of the ARE component and should perform any necessary updates to the attribute based on changes in the underlying data or context. This can include tasks such as updating DOM properties, re-evaluating expressions, or modifying event listeners to ensure that the attribute remains in sync with the current state of the application.
     */
    readonly Update: "_AreAttribute_Update";
    /**
     * Feature that should validate the attribute's content and context. This method is called during the validation phase of the ARE component and should check whether the attribute's content is valid based on its expected format, type, or other constraints. If the content is invalid, this method should throw an error with a descriptive message to help developers identify and fix the issue.
     */
    readonly Validate: "_AreAttribute_Validate";
};

/**
 * This file defines the types for the AreAttribute entity, which represents an attribute of a node in the ARE (Adaptive Rendering Engine) framework. The AreAttribute entity is responsible for managing the details of an attribute, such as its name, raw content, and value, as well as providing methods for initializing, transforming, compiling, updating, and validating the attribute based on its content and context. The types defined in this file include the initialization properties for creating a new AreAttribute instance, the serialized format for storing or transmitting an AreAttribute instance, and the names of the features that can be implemented by the AreAttribute entity.
 */
type AreAttribute_Init = {
    /**
     * Property name (e.g. "label")
     */
    name: string;
    /**
     * Full raw attribute (e.g. ' :label="buttonLabel" ')
     */
    raw: string;
    /**
     * Attribute content (e.g. "buttonLabel")
     */
    content: string;
    /**
     * The prefix of the attribute, for example for ':label' it would be ':', for 'v-if' it would be 'v-'. This can be used to determine the type of the attribute and how to process it.
     */
    prefix: string;
};
/**
 * The evaluated value of the attribute, which can be different from the raw value depending on the context and type of the attribute. For example, for a directive like `v-if="condition"`, the raw value is "condition", but the evaluated value would be the result of evaluating "condition" in the current scope.
 */
type AreAttribute_Serialized = {
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
} & A_TYPES__Entity_Serialized;
/**
 * The names of the features that can be implemented by the AreAttribute entity. These features correspond to specific methods that can be defined on the AreAttribute class to provide custom behavior for initializing, transforming, compiling, updating, and validating the attribute based on its content and context. Each feature name is associated with a specific method that should be implemented to handle the corresponding aspect of the attribute's lifecycle and behavior within the ARE framework.
 */
type AreAttributeFeatureNames = typeof AreAttributeFeatures[keyof typeof AreAttributeFeatures];

declare class AreAttribute extends A_Entity<AreAttribute_Init, AreAttribute_Serialized> {
    /**
     * Property name (e.g. "label")
     */
    name: string;
    /**
     * Full raw attribute (e.g. ' :label="buttonLabel" ')
     */
    raw: string;
    /**
     * Attribute content (e.g. "buttonLabel")
     * Example: For a directive like `v-if="condition"`, the raw value is "condition", but the content would be "condition" without the quotes, and the value would be the result of evaluating "condition" in the current scope.
     */
    content: string;
    /**
     * The evaluated value of the attribute, which can be different from the raw value depending on the context and type of the attribute. For example, for a directive like `v-if="condition"`, the raw value is "condition", but the evaluated value would be the result of evaluating "condition" in the current scope.
     */
    value: any;
    /**
     * The prefix of the attribute, for example for ':label' it would be ':', for 'v-if' it would be 'v-'. This can be used to determine the type of the attribute and how to process it.
     */
    prefix: string;
    /**
     * The scope where the attribute is defined, which can be used to access other entities and features within the same scope. This is particularly useful for attributes that need to interact with other parts of the scene or component, as it allows them to access shared data and functionality without needing to pass it explicitly through parameters.
     */
    get scope(): A_Scope<any, _adaas_a_concept.A_TYPES__Component_Constructor<_adaas_a_concept.A_Component>[], _adaas_a_concept.A_TYPES__Error_Constructor<_adaas_a_concept.A_Error<_adaas_a_concept.A_TYPES__Error_Init, _adaas_a_concept.A_TYPES__Error_Serialized>>[], _adaas_a_concept.A_TYPES__Entity_Constructor<A_Entity<any, _adaas_a_concept.A_TYPES__Entity_Serialized>>[], _adaas_a_concept.A_Fragment<_adaas_a_concept.A_TYPES__Fragment_Serialized>[]>;
    /**
     * The owner node of the attribute, which is the node that the attribute is attached to. This can be used to access the properties and features of the owner node, as well as to determine the context in which the attribute is being used. For example, if the attribute is attached to a button element, the owner would be that button node, and the attribute could use this information to modify the button's behavior or appearance based on its content and context.
     */
    get owner(): AreNode$1;
    /**
     * Initializes the attribute based on the provided properties. This method is called when a new attribute is created and should set up the attribute's state based on the provided properties. It can also be used to generate a unique ASEID for the attribute based on its name and content, which can be used for caching and identification purposes within the ARE framework.
     *
     * @param newEntity
     */
    fromNew(newEntity: AreAttribute_Init): void;
    /**
     * Creates a clone of the current attribute instance. This method can be used to create a new instance of the attribute with the same properties and state as the original, which can be useful in scenarios where you want to reuse an attribute's configuration or create variations of it without modifying the original instance.
     *
     * @returns
     */
    clone(): this;
    /**
     * Initializes the attribute. This method is called when the attribute is first created and should set up any necessary state or perform any initial processing based on the provided content and context. It can also be used to validate the attribute's content and throw errors if it is invalid.
     *
     * @param scope
     */
    init(scope?: A_Scope): void;
    /**
     * Generates all rendering instructions for the attribute. This method is called during the compilation phase of the ARE component and should return an array of instructions that describe how to render the attribute based on its content and context. The instructions can include details such as which DOM properties to set, which events to listen for, and how to update the attribute when the underlying data changes.
     *
     * @param scope
     */
    transform(scope?: A_Scope): void;
    /**
     * Compiles the attribute. This method should transform attribute details into a set of SceneInstructions. It may also modify attribute value, since this field is editable during runtime.
     *
     * @param scope
     */
    compile(scope?: A_Scope): void;
    /**
     * Updates the attribute based on changes in the store or other dependencies. This method is called during the update phase of the ARE component and should perform any necessary updates to the attribute based on changes in the underlying data or context. This can include tasks such as updating DOM properties, re-evaluating expressions, or modifying event listeners to ensure that the attribute remains in sync with the current state of the application.
     *
     * @param scope
     */
    update(scope?: A_Scope): void;
    /**
     * Validates the attribute's content and context. This method is called during the validation phase of the ARE component and should check whether the attribute's content is valid based on its expected format, type, or other constraints. If the content is invalid, this method should throw an error with a descriptive message to help developers identify and fix the issue.
     *
     * @param scope
     */
    validate(scope?: A_Scope): void;
}

interface AreSyntaxTokenRules<T extends AreNode$1 = AreNode$1> {
    /** Opening delimiter e.g. '<', '{{', '<!--', '{' */
    opening?: string;
    /** Closing delimiter e.g. '>', '}}', '-->', '}' */
    closing?: string;
    /** Optional self-closing marker e.g. '/>' */
    selfClosing?: string;
    /** Regex that must match content immediately before the opening delimiter */
    prefix?: RegExp;
    /** Replaces open/close entirely — matches entire pattern via RegExp */
    pattern?: RegExp;
    /**
     * Fully custom matcher — complete control over how a token is found.
     * Receives (source, from, to, build) where build(raw, content, position, closing)
     * constructs the AreSyntaxTokenMatch. Return null if no match found.
     */
    matcher?: (source: string, from: number, to: number, build: (raw: string, content: string, position: number, closing: string) => AreSyntaxTokenMatch) => AreSyntaxTokenMatch | null;
    /** Constructor to instantiate when this rule matches */
    component: A_TYPES__Entity_Constructor<T>;
    /** Higher = checked first. Default: 0 */
    priority?: number;
    /** Whether this token can contain nested tokens of same open/close. Default: true */
    nested?: boolean;
    /** Custom data extractor — called after match, result stored in match.meta */
    extract?: (raw: string, match: AreSyntaxTokenMatch) => Record<string, any>;
}
type AreSyntaxTokenPayload = {
    /**
     * Allows to override ASEID generation for this token match. Useful when the token corresponds to an existing entity or needs a stable ID across parses. If not provided, ASEID will be generated based on position and content.
     */
    id?: string;
    /**
     * Allows to override the entity type for this token match. Useful when the token corresponds to an existing entity or needs a specific entity type across parses. If not provided, the entity type will be inferred from the token.
     */
    entity?: string;
    /**
     * Allows to override the scope for this token match. Useful when the token corresponds to an existing entity or needs a specific scope across parses. If not provided, the scope will be generated based on position and content.
     */
    scope?: string;
    [key: string]: any;
};
interface AreSyntaxTokenMatch {
    /** Full matched string including delimiters */
    raw: string;
    /** Content between delimiters */
    content: string;
    /** The opening delimiter that matched */
    opening: string;
    /** The closing delimiter that matched */
    closing: string;
    /** Start position in source string */
    position: number;
    /** Data extracted via rule.extract */
    payload: AreSyntaxTokenPayload;
    /** @internal – the rule that produced this match (used by instantiate) */
    _rule?: AreSyntaxTokenRules;
}
interface AreSyntaxInitOptions {
    /**
     * Array of token rules defining the syntax to be parsed. Each rule specifies how to identify and process a particular type of token (e.g. interpolation, directive, comment) within templates. The rules are checked in order of priority, allowing for flexible and customizable parsing behavior.
     */
    rules: AreSyntaxTokenRules[];
    /**
     * Whether to trim leading/trailing whitespace from token content. Default: true. When enabled, any whitespace at the start or end of the content captured by a token will be removed before further processing. This can help prevent issues with unintended spaces affecting rendering or logic, especially in cases like interpolations or directives where extra whitespace may be common.
     */
    trimWhitespace?: boolean;
    /** Throw on unclosed tokens. Default: true */
    strictMode?: boolean;
}
type AreSyntaxCompiledExpression = {
    execute: (store: AreStore$1, scope?: Record<string, any>) => any;
    isCallable: boolean;
};

declare class AreSyntax extends A_Fragment {
    /**
     * Max allowed length of an expression string to prevent excessively long inputs that could lead to performance issues or abuse.
     */
    private readonly MAX_LENGTH;
    /**
     * Max allowed nesting depth of parentheses, brackets, and braces in expressions to prevent excessively complex inputs that could lead to performance issues or abuse. Default is 5 levels of nesting.
     */
    private readonly MAX_DEPTH;
    /**
     * List of regex patterns that are blocked in expressions to prevent access to unsafe or sensitive features. This includes patterns for global objects, functions, and syntax that could be used for malicious purposes (e.g. "eval", "Function", "fetch", "XMLHttpRequest", "import", "require", "document", "window", "globalThis", "global", "process", "__proto__", "constructor", "prototype"). Expressions containing any of these patterns will be rejected during validation.
     */
    private readonly BLOCKED_PATTERNS;
    /**
     * Set of global identifiers that are blocked in expressions to prevent access to unsafe or sensitive features. This includes global objects and functions that could be used for malicious purposes (e.g. "eval", "Function", "fetch", "XMLHttpRequest", "document", "window", "globalThis", "global", "process", "setTimeout", "setInterval", "localStorage", "sessionStorage", "indexedDB", "WebSocket", "Worker"). Accessing any of these identifiers in an expression will be rejected during validation.
     */
    private readonly BLOCKED_GLOBALS;
    /**
     * Regex pattern that defines the allowed characters in expressions. This pattern allows letters, digits, whitespace, and common operators and punctuation used in JavaScript expressions. Expressions containing characters that do not match this pattern will be rejected during validation to prevent injection of potentially harmful code.
     */
    private readonly ALLOWED_CHARS;
    /**
     * Simple dot-path identifier pattern (e.g. "name", "user.name", "user.profile.name").
     * Matches strings that consist solely of identifier characters separated by dots.
     */
    private readonly SIMPLE_PATH;
    /**
     * Compiled expression — a pre-parsed function ready for repeated execution.
     * Created once via compile(), reused on every apply/click.
     */
    private readonly _rules;
    private readonly _trimWhitespace;
    private readonly _strictMode;
    constructor(config?: Partial<AreSyntaxInitOptions>);
    /**
     * Get the array of token rules that define the syntax for parsing templates. Each rule specifies how to identify and process a particular type of token (e.g. interpolation, directive, comment) within templates. The rules are checked in order of priority, allowing for flexible and customizable parsing behavior.
     */
    get rules(): AreSyntaxTokenRules<AreNode>[];
    /**
     * Indicates whether leading and trailing whitespace should be trimmed from token content. When enabled, any whitespace at the start or end of the content captured by a token will be removed before further processing. This can help prevent issues with unintended spaces affecting rendering or logic, especially in cases like interpolations or directives where extra whitespace may be common. Default is true.
     */
    get trimWhitespace(): boolean;
    /**
     * Indicates whether the parser should throw an error when it encounters unclosed tokens. When enabled, if the parser finds an opening delimiter without a corresponding closing delimiter (e.g. an unclosed interpolation or directive), it will throw an error instead of silently ignoring it. This can help catch syntax errors and ensure that templates are well-formed. Default is true.
     */
    get strictMode(): boolean;
    /**
     * Compiles an expression string into a reusable executor.
     * Performs validation and Function construction once.
     * Use when the same expression will be evaluated multiple times
     * e.g. event handlers, instructions that re-apply on store changes.
     *
     * @example
     *   // compile once at apply() time
     *   const compiled = AreCommonHelper.compile('(e) => !!pageTitle ? $testHandler(e, item) : null')
     *
     *   // execute on every click — no re-parsing, no re-validation
     *   element.addEventListener('click', (e) => {
     *       const fn = compiled.execute(store, { $testHandler: handler, item })
     *       if (typeof fn === 'function') fn(e)
     *   })
     */
    compile(expr: string): AreSyntaxCompiledExpression;
    /**
     * Evaluates an expression string against the provided store.
     * Automatically determines whether the result should be callable
     * based on the shape of the expression.
     *
     * Returns the raw value for plain expressions (interpolations, bindings).
     * Returns a bound function for callable expressions (event handlers).
     *
     * @param expr  Expression string to evaluate.
     * @param store AreStore used for identifier resolution.
     * @param scope Optional extra bindings checked **before** the store.
     *              Useful for injecting event-specific values (`$event`, `element`)
     *              or emit wrappers (`$handleClick`).
     *
     * @example
     *   // simple value
     *   evaluate('user.name', store)
     *
     *   // with emit wrapper
     *   evaluate('$handleClick($event, user.name)', store, {
     *       $event: domEvent,
     *       $handleClick: (...args) => node.emit(new AreEvent('handleClick', args)),
     *   })
     *
     *   // arrow with conditional
     *   evaluate('(e) => isValid(user.name) ? $handleClick(e) : null', store, {
     *       $handleClick: (...args) => node.emit(new AreEvent('handleClick', args)),
     *   })
     */
    evaluate(expr: string, store: AreStore$1, scope?: Record<string, any>): any;
    /**
     * Extracts $-prefixed handler names from an expression.
     * These represent event emission targets, not store references.
     *
     * Examples:
     *   "$handleClick"                                     → Set(["handleClick"])
     *   "$handleClick(user.name)"                           → Set(["handleClick"])
     *   "(e) => isValid(user.name) ? $handleClick(e) : null" → Set(["handleClick"])
     */
    extractEmitHandlers(expr: string): Set<string>;
    private isCallableExpression;
    private validate;
    private checkDepth;
    private createSandbox;
    private nestedHandler;
    private assertSafeKey;
    private execute;
}

declare class AreSyntaxError extends A_Error {
    static readonly SyntaxParseError = "Are Syntax Parse Error";
    static readonly SyntaxNotSupportedError = "Are Syntax Not Supported Error";
    static readonly MethodNotImplementedError = "Are Syntax Method Not Implemented Error";
}

declare class AreTokenizer extends A_Component {
    /**
     * Get the AreSyntax from the current scope. The AreSyntax defines the syntax rules and structures for tokenizing templates. It provides mechanisms for parsing and interpreting templates, attributes, directives, interpolations, and event listeners, enabling dynamic and interactive UI rendering within the ARE framework. If no AreSyntax is found in the scope, an error is thrown indicating that AreTokenizer requires an AreSyntax to function properly.
     */
    protected get config(): AreSyntax$1;
    /**
     * Instantiate AreNodes based on the token matches obtained from scanning the source template. This method takes the raw source string from the context, scans it for tokens using the defined syntax rules, and creates corresponding AreNode instances for each matched token. The resulting array of AreNodes represents the structured representation of the template, which can then be used for further processing, such as rendering or applying scene instructions.
     *
     *
     * @param context
     * @returns
     */
    instantiate<T extends AreNode$1>(context: AreContext$1): void;
    tokenize(node: AreNode$1, context: AreContext$1, logger?: A_Logger): void;
    protected scan(source: string, from: number, to: number, context: AreContext$1): AreSyntaxTokenMatch$1[];
    protected findNextMatch(source: string, from: number, to: number): AreSyntaxTokenMatch$1 | null;
    protected matchRule(source: string, rule: AreSyntaxTokenRules$1, from: number, to: number): AreSyntaxTokenMatch$1 | null;
    protected matchStandardRule(source: string, rule: AreSyntaxTokenRules$1, from: number, to: number): AreSyntaxTokenMatch$1 | null;
    protected matchPrefixedRule(source: string, rule: AreSyntaxTokenRules$1, from: number, to: number): AreSyntaxTokenMatch$1 | null;
    protected findMatchingClose(source: string, opening: string, closing: string, from: number, to: number): number;
    protected buildMatch(rule: AreSyntaxTokenRules$1, raw: string, content: string, position: number, closingUsed: string): AreSyntaxTokenMatch$1;
    protected tryPlainText(raw: string, position: number): AreSyntaxTokenMatch$1 | null;
    protected findRuleForMatch(match: AreSyntaxTokenMatch$1): AreSyntaxTokenRules$1 | undefined;
}

declare class AreTokenizerError extends A_Error {
}

declare class AreCompiler extends A_Component {
    /**
     * Defines a custom method for compiling a node into a set of SceneInstructions. This method is called during the compilation phase of the ARE component and should perform any necessary transformations on the node and its attributes to generate the appropriate instructions for rendering. This can include tasks such as processing directives, evaluating expressions, and generating instructions for dynamic content based on the node's properties and context.
     *
     * @param node
     */
    static Compile<T extends AreNode$1>(node: A_TYPES__Entity_Constructor<T>): any;
    /**
     * Defines a custom method for compiling an attribute into a set of SceneInstructions. This method is called during the compilation phase of the ARE component and should perform any necessary transformations on the attribute to generate the appropriate instructions for rendering. This can include tasks such as processing directives, evaluating expressions, and generating instructions for dynamic content based on the attribute's properties and context.
     *
     * @param attribute
     */
    static Compile<T extends AreAttribute$1>(attribute: A_TYPES__Entity_Constructor<T>): any;
    compile(node: AreNode$1, scene: AreScene$1, logger?: A_Logger, ...args: any[]): void;
}

declare class AreCompilerError extends A_Error {
    static readonly RenderError = "Are Compiler Render Error";
    static readonly CompilationError = "Are Compiler Compilation Error";
}

declare class AreTransformer extends A_Component {
    transform(node: AreNode$1, scope: A_Scope, scene: AreScene$1, ...args: any[]): void;
}

declare class AreInterpreter extends A_Component {
    /**
     * Decorator to mark a method as an instruction Apply handler for the specific instruction type. The method will be called during the render phase of the ARE component when the corresponding instruction needs to be applied. The method should contain logic to perform the necessary operations on the rendering target based on the instruction's content and context.
     *
     * @param action
     * @returns
     */
    static Apply(action: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    /**
     * Decorator to mark a method as an instruction Update handler for the specific instruction type. The method will be called during the render phase of the ARE component when the corresponding instruction has been updated. The method should contain logic to perform the necessary operations on the rendering target to update the effects of the instruction based on its new content and context.
     *
     * @param action
     * @returns
     */
    static Update(action: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    /**
     * Decorator to mark a method as an instruction Revert handler for the specific instruction type. The method will be called during the render phase of the ARE component when the corresponding instruction needs to be reverted. The method should contain logic to perform the necessary operations on the rendering target to undo the effects of the instruction based on its content and context.
     *
     * @param action
     * @returns
     */
    static Revert(action: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    /**
     * The method responsible for executing the render operation based on the current state of the Scene. It processes the instructions that need to be applied and reverted, ensuring that the rendering target is updated accordingly. The method handles any errors that may occur during the application or reversion of instructions, maintaining the integrity of the rendering process.
     *
     * @param scene
     */
    interpret(scene: AreScene$1): void;
    protected applyInstruction(instruction: AreInstruction$1, interpreter: AreInterpreter, store: AreStore$1, scope: A_Scope, feature: A_Feature, ...args: any[]): void;
    protected updateInstruction(instruction: AreInstruction$1, interpreter: AreInterpreter, store: AreStore$1, scope: A_Scope, feature: A_Feature, ...args: any[]): void;
    protected revertInstruction(instruction: AreInstruction$1, interpreter: AreInterpreter, store: AreStore$1, scope: A_Scope, feature: A_Feature, ...args: any[]): void;
}

declare class AreInterpreterError extends A_Error {
}

declare const AreStoreAreComponentMetaKeys: {
    readonly StoreExtensions: "_AreStore_StoreExtensions";
};

type AreStorePathValue<T, P extends string> = P extends `${infer K}.${infer Rest}` ? K extends keyof T ? AreStorePathValue<T[K], Rest> : never : P extends keyof T ? T[P] : never;
type AreStoreWatchingEntity = {
    update(...args: any[]): void;
};
type AreStoreAreComponentMetaKeyNames = typeof AreStoreAreComponentMetaKeys[keyof typeof AreStoreAreComponentMetaKeys];

declare class AreStore<T extends Record<string, any> = Record<string, any>> extends A_ExecutionContext<T> {
    protected dependencies: Map<string, Set<AreStoreWatchingEntity>>;
    protected _keys: Set<keyof T>;
    /**
     * Allows to define a pure function that will be executed in the context of the store, so it can access the store's data and methods, but it won't have access to the component's scope or other features. This can be useful for example for defining a function that will update the store's data based on some logic, without having access to the component's scope or other features, so we can keep the store's logic separate from the component's logic.
     */
    static get Function(): <T extends Are$1>(target: T, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
    get owner(): AreNode$1;
    get parent(): AreStore | undefined;
    get context(): AreContext$1;
    constructor(aseid: ASEID | string);
    get watchers(): Set<AreStoreWatchingEntity>;
    get keys(): Set<keyof T>;
    watch(instruction: AreStoreWatchingEntity): void;
    unwatch(instruction: AreStoreWatchingEntity): void;
    set<K extends keyof T>(values: Partial<T>): this;
    set<P extends A_TYPES__Paths<T>>(key: P, value: AreStorePathValue<T, P>): this;
    get<K extends keyof T>(key: K): T[K] | undefined;
    protected setAsObject(values: Partial<T>): this;
    protected setAsKeyValue<K extends keyof T, P extends A_TYPES__Paths<T>>(key: K | P, value: T[K] | AreStorePathValue<T, P>): this;
    /**
     * Notifies instructions — immediately or deferred if inside a batch.
     */
    private notify;
    /**
     * Removes an instruction from all dependency sets.
     * Called when an instruction is reverted/destroyed.
     */
    unregister(instruction: AreStoreWatchingEntity): void;
    /**
     * Normalizes a path once — reused in both get and set.
     */
    private normalizePath;
    /**
     * Extracts direct children of the current markup level into typed instances.
     * No tree walking, recursion, or nested parsing — just direct children.
     */
    extractPathSegments(path: string): string[];
    /**
     * Method allows to initialize all extensions defined in the component with @AreStore.Function decorator, so we can use them in the store's context. This method should be called in the component's constructor after super() call, so the store will have access to the component's instance and its properties.
     *
     * @param component
     */
    loadExtensions(component: Are$1): void;
}

declare class AreEvent<T extends Record<string, any> = Record<string, any>> extends A_ExecutionContext<T> {
}

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

declare const AreSceneStatuses: {
    Active: string;
    Inactive: string;
    Destroyed: string;
};

type AreSceneChanges = {
    /**
     * An array of instructions that are planned to be applied to the scene. These instructions represent the changes that will be made to the scene when they
     */
    toApply: AreInstruction$1[];
    /**
     * An array of instructions that are planned to be reverted from the scene. These instructions represent the changes that will be undone from the scene when they are reverted, allowing for a rollback of changes if needed.
     */
    toRevert: AreInstruction$1[];
};
type AreScene_Serialized = {
    instructions: AreInstructionSerialized$1[];
} & A_TYPES__Fragment_Serialized;
type AreSceneStatusNames = typeof AreSceneStatuses[keyof typeof AreSceneStatuses];

declare class AreScene extends A_Fragment {
    protected _groupToInstructionsMap: Map<string, Set<AreInstruction$1>>;
    /**
     * Plan is a queue of changes that should be applied to render the node
     *
     * It works as FIFO, so the first instruction that should be applied is the first one in the queue, and so on.
     */
    protected _plan: Array<AreInstruction$1>;
    /**
     * State is a list of instructions that are currently applied to the node,
     * so it represents the current state of the node in the scene.
     *
     * It always in a reverse order of the plan, so the last instruction in the state is the first one that should be reverted when we need to revert the changes, and so on.
     *
     * For example, if we have a node with two instructions in the plan: [Instruction A, Instruction B], and both of them are applied to the node, then the state will be [Instruction B, Instruction A], so when we need to revert the changes, we will revert Instruction B first, and then Instruction A.
     */
    protected _state: Array<AreInstruction$1>;
    protected _host: AreDeclaration$1 | undefined;
    /**
     * Scene status is used to determine the current lifecycle stage of the scene, which can be 'active', 'inactive' or 'destroyed'. This status can be used to control the behavior of the scene and its instructions, for example, we can prevent applying new instructions to an inactive or destroyed scene, or we can trigger certain actions when the scene becomes active or inactive. The default status of the scene is 'inactive', which means that the scene is not yet rendered and its instructions are not applied, and it will become 'active' when it is mounted and its instructions are applied, and it will become 'destroyed' when it is unmounted and its instructions are reverted.
     */
    protected _status: AreSceneStatusNames;
    constructor(
    /**
     * Scene identity will be used to identify mounting point in the parent scene
     */
    id: string | ASEID);
    /**
     * Scene ID that corresponds to the root node's ID (part of ASEID)
     */
    get id(): string;
    /**
     * The scope where scene is registered. This scope is owned by AreNode
     */
    get scope(): A_Scope;
    /**
     * The owner node of the scene, which is the node that registered the scene in its scope.
     * This is typically the node that is responsible for rendering the scene and managing its lifecycle.
     */
    get owner(): AreNode$1;
    /**
     * It's a primary declaration instruction that represents the node in the scene, so it should be registered as a host instruction for the scene, and it will be used to keep track of the node in the scene and to manage its lifecycle.
     */
    get host(): AreDeclaration$1 | undefined;
    /**
     * Scene status is used to determine the current lifecycle stage of the scene, which can be 'active', 'inactive' or 'destroyed'. This status can be used to control the behavior of the scene and its instructions, for example, we can prevent applying new instructions to an inactive or destroyed scene, or we can trigger certain actions when the scene becomes active or inactive. The default status of the scene is 'inactive', which means that the scene is not yet rendered and its instructions are not applied, and it will become 'active' when it is mounted and its instructions are applied, and it will become 'destroyed' when it is unmounted and its instructions are reverted.
     */
    get status(): AreSceneStatusNames;
    get isActive(): boolean;
    get isInactive(): boolean;
    /**
     * Returns All declaration instructions are registered in the scene scope. Since declaration instructions are the main instructions that represent the structure of the node, we have a separate getter for them to easily access and manage them in the scene.
     */
    get declarations(): AreDeclaration$1[];
    /**
     * Returns All mutation instructions are registered in the scene scope. Mutation instructions are the instructions that represent the changes to be applied to the node, so we have a separate getter for them to easily access and manage them in the scene, especially when we want to apply or revert changes based on the mutations.
     */
    get mutations(): AreMutation$1[];
    /**
     * Returns All instructions are registered in the scene scope.
     */
    get instructions(): AreInstruction$1[];
    /**
     * Plan is a queue of changes that should be applied to render the node
     *
     * It works as FIFO, so the first instruction that should be applied is the first one in the queue, and so on.
     */
    get planned(): AreInstruction$1[];
    /**
     * State is a list of instructions that are currently applied to the node,
     * so it represents the current state of the node in the scene.
     *
     * It always in a reverse order of the plan, so the last instruction in the state is the first one that should be reverted when we need to revert the changes, and so on.
     *
     * For example, if we have a node with two instructions in the plan: [Instruction A, Instruction B], and both of them are applied to the node, then the state will be [Instruction B, Instruction A], so when we need to revert the changes, we will revert Instruction B first, and then Instruction A.
     */
    get applied(): AreInstruction$1[];
    /**
     * Should return instructions to be reverted and to be applied.
     * A difference between plan vs state is that plan is what should be applied to the scene,
     * while state is what currently applied to the scene.
     *
     */
    get changes(): AreSceneChanges;
    activate(): void;
    deactivate(): void;
    /**
     * Each scene has a primary declaration instruction that represents the node in the scene, so it should be registered as a host instruction for the scene, and it will be used to keep track of the node in the scene and to manage its lifecycle. This method allows to set the host instruction for the scene, but it will throw an error if we try to set another host instruction while there is already a host instruction set, so we can ensure that there is only one host instruction for the scene at any given time.
     *
     * @param instruction
     */
    setHost(instruction: AreDeclaration$1): void;
    /**
     * Unsets the current host instruction from the scene.
     *
     * This method should be used when we want to remove the primary declaration instruction that represents the node in the scene, for example, when we want to unmount the node or when we want to replace it with another node. Unsetting the host instruction will allow us to set a new host instruction for the scene if needed.
     */
    removeHost(): void;
    /**
     * Method that should register the instruction in the plan, so it will be rendered in the next render cycle.
     *
     * @param instruction
     */
    plan(instruction: AreInstruction$1): void;
    planBefore(instruction: AreInstruction$1, beforeInstruction: AreInstruction$1): void;
    planAfter(instruction: AreInstruction$1, afterInstruction: AreInstruction$1): void;
    moveBefore(instruction: AreInstruction$1, beforeInstruction: AreInstruction$1): void;
    moveAfter(instruction: AreInstruction$1, afterInstruction: AreInstruction$1): void;
    /**
     * Allows to remove instruction from the plan, so it will not be rendered anymore, but it will still be registered in the scene scope, so it can be planned again if needed.
     *
     * @param instruction
     */
    unPlan(instruction: AreInstruction$1): void;
    /**
     * Checks if the instruction is already in the plan, so it will be rendered in the next render cycle.
     *
     * @param instruction
     * @returns
     */
    getPlanned(instruction: AreInstruction$1): AreInstruction$1 | undefined;
    /**
     * Checks if the instruction is already in the plan, so it will be rendered in the next render cycle.
     *
     * @param instruction
     * @returns
     */
    isInPlan(instruction: AreInstruction$1): boolean;
    /**
     * Method moves the instruction to state to keep it applied and to be able to revert it later if needed. The instruction should be already registered in the scene scope and planned to be applied, otherwise it will not be applied.
     *
     * @param instruction
     */
    apply(instruction: AreInstruction$1): void;
    /**
     * Method moves the instruction from state to unapply it and to be able to apply it later if needed. The instruction should be already registered in the scene scope and applied, otherwise it will not be unapplied.
     *
     * @param instruction
     */
    unApply(instruction: AreInstruction$1): void;
    /**
     * Checks if the instruction is already in the state, so it is currently applied to the scene.
     *
     * @param instruction
     * @returns
     */
    getApplied(instruction: AreInstruction$1): AreInstruction$1 | undefined;
    /**
     * Checks if the instruction is already in the state, so it is currently applied to the scene.
     *
     * @param instruction
     * @returns
     */
    isApplied(instruction: AreInstruction$1): boolean;
    /**
     * Method that should reset the scene to the initial state, so it will clear the plan and state, but it will not deregister the instructions from the scene scope, so they will still be registered in the scene and can be planned and applied again if needed.
     *
     */
    reset(): void;
}

declare class AreSceneError extends A_Error {
    static readonly SceneAlreadyInactive = "AreSceneError.SceneAlreadyInactive";
    static readonly SceneAlreadyActive = "AreSceneError.SceneAlreadyActive";
    static readonly HostInstructionHasConnectedInstructions = "AreSceneError.HostInstructionHasConnectedInstructions";
    static readonly SingleHostInstruction = "AreSceneError.SingleHostInstruction";
    static readonly SceneError = "AreSceneError.SceneError";
    static readonly RootNotFound = "AreSceneError.RootNotFound";
    static readonly UpdateFailed = "AreSceneError.UpdateFailed";
    static readonly MountFailed = "AreSceneError.MountFailed";
    static readonly UnmountFailed = "AreSceneError.UnmountFailed";
    static readonly MountPointNotFound = "AreSceneError.MountPointNotFound";
    static readonly InvalidTemplate = "AreSceneError.InvalidTemplate";
    static readonly RenderFailed = "AreSceneError.RenderFailed";
}

type AreInstructionNewProps<T extends any = Record<string, any>> = {
    /**
     * The deduplication ID that prevents duplicated instruction within the same node.
     *
     * For example to prevent duplicated AddAttribute instruction for the same attribute, we can use the attribute name as the deduplication ID, so if we have two AddAttribute instructions with the same attribute name, only the first one will be applied, and the second one will be ignored.
     *
     *
     * [!] Note; By default it uses action name and group if provided
     */
    /**
     * the Host operation to be performed. Exactly this name will be used to call a method from the Host class.
     */
    name: string;
    /**
     * The parent instruction that created this instruction. For example, if we have a CreateElement instruction that creates a new element, and then we have an AddAttribute instruction that adds an attribute to that element, the AddAttribute instruction would have the CreateElement instruction as its parent. This can be used to track the hierarchy of instructions and their dependencies.
     */
    parent?: AreInstruction | undefined;
    /**
     * Group is an optional property that can be used to group instructions together.
     *
     * For example a set of instructions that depend on create CreateElement instruction can be grouped together with the same group name, so if the CreateElement instruction is reverted, all the instructions in the same group will be reverted as well, and so on.
     *
     * This can be useful to manage complex changes that involve multiple instructions.
     *
     * [!] Note, the best option is to use ASEID of the Instruction as a group, so all instructions with the same ASEID will be treated as a single change, and will be applied and reverted together.
     */
    group?: AreInstruction | undefined;
    /**
     * A set of additional parameters that may be needed for the rendering purpose.
     *
     * For example: for AddAttribute instruction, we may need to provide the attribute name and value as a payload, so the Host can use this information to add the attribute to the node.
     */
    payload?: T;
};
type AreInstructionSerialized<T extends any = Record<string, any>> = {
    /**
     * The name of the instruction, which corresponds to the operation that should be performed in the Host. This name is used to identify the specific method in the Host that should be called to execute the instruction, allowing for a clear mapping between instructions and their corresponding actions in the rendering process.
     */
    name: string;
    /**
     * The type of the instruction, which can be used to categorize instructions and determine how they should be processed. For example, we can have different types for declaration instructions (e.g., DeclarationInstruction or CreateElement) and mutation instructions (e.g., AddAttribute), allowing for better organization and management of instructions based on their purpose and behavior in the scene.
     */
    type: string;
    /**
     * The parent instruction that created this instruction. For example, if we have a CreateElement instruction that creates a new element, and then we have an AddAttribute instruction that adds an attribute to that element, the AddAttribute instruction would have the CreateElement instruction as its parent. This can be used to track the hierarchy of instructions and their dependencies.
     */
    parent?: string | undefined;
    /**
     * Group is an optional property that can be used to group instructions together. For example a set of instructions that depend on create CreateElement instruction can be grouped together with the same group name, so if the CreateElement instruction is reverted, all the instructions in the same group will be reverted as well, and so on. This can be useful to manage complex changes that involve multiple instructions. The best option is to use ASEID of the Instruction as a group, so all instructions with the same ASEID will be treated as a single change, and will be applied and reverted together.
     */
    group?: string | undefined;
    /**
     * A set of additional parameters that may be needed for the rendering purpose. For example: for AddAttribute instruction, we may need to provide the attribute name and value as a payload, so the Host can use this information to add the attribute to the node.
     */
    payload: T;
} & A_TYPES__Entity_Serialized;

declare class AreInstruction<T extends Record<string, any> = Record<string, any>, S extends AreInstructionSerialized<T> = AreInstructionSerialized<T>> extends A_Entity<AreInstructionNewProps<T>, S> implements AreStoreWatchingEntity$1 {
    /**
     * The name of the instruction, for example "CreateElement", "AddAttribute", "RemoveNode", etc. This is used to identify the type of the instruction and how to process it. The name should be in PascalCase format, and should be unique across all instruction types. It is recommended to use a prefix that indicates the category of the instruction, for example "CreateElement" for instructions that create new elements, "UpdateAttribute" for instructions that update attributes, etc.
     */
    protected _name: string;
    /**
     * The payload of the instruction, which can contain any additional information that may be needed for the rendering purpose. For example, for CreateElement instruction, the payload can contain the tag name and parent information, so the Host can use this information to create the element in the correct place in the scene. The payload is optional and can be an empty object if no additional information is needed.
     */
    protected _payload?: T;
    /**
     * Group is an optional property that can be used to group instructions together. For example a set of instructions that depend on create CreateElement instruction can be grouped together with the same group name, so if the CreateElement instruction is reverted, all the instructions in the same group will be reverted as well, and so on. This can be useful to manage complex changes that involve multiple instructions.
     *
     * [!] Note, the best option is to use ASEID of the Instruction as a group, so all instructions with the same ASEID will be treated as a single change, and will be applied and reverted together.
     */
    protected _group: string | undefined;
    /**
     * The parent instruction that created this instruction. For example, if we have a CreateElement instruction that creates a new element, and then we have an AddAttribute instruction that adds an attribute to that element, the AddAttribute instruction would have the CreateElement instruction as its parent. This can be used to track the hierarchy of instructions and their dependencies.
     */
    protected _parent: string | undefined;
    /**
     * A set of properties that influence the behavior of the instruction, for example, for AddTextInstruction, we can interpolation dependent on some key in the store, so we can have a property called "interpolationKey" that will be used to track the dependencies of the instruction, and when the value of this key changes in the scope, we can update the instruction accordingly.
     */
    protected _props: Set<string>;
    /**
     * The name of the instruction, for example "CreateElement", "AddAttribute", "RemoveNode", etc. This is used to identify the type of the instruction and how to process it. The name should be in PascalCase format, and should be unique across all instruction types. It is recommended to use a prefix that indicates the category of the instruction, for example "CreateElement" for instructions that create new elements, "UpdateAttribute" for instructions that update attributes, etc.
     */
    get name(): string;
    /**
     * The payload of the instruction, which can contain any additional information that may be needed for the rendering purpose. For example, for CreateElement instruction, the payload can contain the tag name and parent information, so the Host can use this information to create the element in the correct place in the scene. The payload is optional and can be an empty object if no additional information is needed.
     *
     * [!] Note, the payload should be serializable, so it can be stored and transmitted easily. It is recommended to use simple data structures for the payload, such as objects, arrays, strings, numbers, etc., and avoid using complex data types that may not be easily serializable.
     */
    get payload(): T;
    /**
     * Group is an optional property that can be used to group instructions together. For example a set of instructions that depend on create CreateElement instruction can be grouped together with the same group name, so if the CreateElement instruction is reverted, all the instructions in the same group will be reverted as well, and so on. This can be useful to manage complex changes that involve multiple instructions.
     *
     * [!] Note, the best option is to use ASEID of the Instruction as a group, so all instructions with the same ASEID will be treated as a single change, and will be applied and reverted together.
     */
    get group(): string | undefined;
    /**
     * The parent instruction ASEID that created this instruction. For example, if we have a CreateElement instruction that creates a new element, and then we have an AddAttribute instruction that adds an attribute to that element, the AddAttribute instruction would have the CreateElement instruction as its parent. This can be used to track the hierarchy of instructions and their dependencies.
     *
     * [!] Note, the parent should be provided as an ASEID string, so it can be easily referenced and tracked across different contexts and times.
     */
    get parent(): string | undefined;
    get id(): string;
    get owner(): AreNode$1;
    fromNew(newEntity: AreInstructionNewProps<T>): void;
    fromUndefined(): void;
    /**
     * Group this instruction with another instruction. This means that when one of the instructions in the group is applied or reverted, all the instructions in the same group will be applied or reverted together. This can be useful to manage complex changes that involve multiple instructions.
     *
     * For example, if we have a CreateElement instruction that creates a new element, and then we have an AddAttribute instruction that adds an attribute to that element, we can group them together with the same group name, so if we revert the CreateElement instruction, the AddAttribute instruction will be reverted as well, and so on.
     *
     * @param instruction
     * @returns
     */
    groupWith(instruction: AreInstruction): this;
    /**
     * Ungroup this instruction from any group. This means that this instruction will be treated as an independent instruction, and will not be applied or reverted together with any other instructions. This can be useful when you want to separate an instruction from a group, so it can be applied or reverted independently.
     *
     * @returns
     */
    unGroup(): this;
    /**
     * Attach this instruction to a parent instruction. This means that this instruction will be considered as a child of the parent instruction, and can be used to track the hierarchy of instructions and their dependencies.
     *
     * For example, if we have a CreateElement instruction that creates a new element, and then we have an AddAttribute instruction that adds an attribute to that element, we can attach the AddAttribute instruction to the CreateElement instruction as its parent, so we can track that the AddAttribute instruction is related to the CreateElement instruction.
     *
     * @param parent
     * @returns
     */
    attachTo(parent: AreInstruction): this;
    /**
     * Detach this instruction from its parent instruction. This means that this instruction will no longer be considered as a child of the parent instruction, and will not be related to it in any way. This can be useful when you want to separate an instruction from its parent, so it can be treated as an independent instruction.
     *
     * @returns
     */
    detach(): this;
    /**
     * Apply this instruction to the scene. This means that the changes represented by this instruction will be applied to the scene, and the Host will perform the necessary operations to reflect these changes in the rendered output.
     *
     * For example, if this instruction is a CreateElement instruction, when we apply it, the Host will create a new element in the scene according to the information provided in the payload of the instruction. If this instruction is an AddAttribute instruction, when we apply it, the Host will add the specified attribute to the target element in the scene. The apply method can also accept an optional scope parameter, which can be used to provide additional context or information that may be needed for applying the instruction.
     *
     * @param scope
     */
    apply(scope?: A_Scope): void;
    /**
     * Update this instruction in the scene. This means that the changes represented by this instruction will be updated in the scene, and the Host will perform the necessary operations to reflect these changes in the rendered output. This is particularly useful for instructions that have dynamic properties or effects that may change over time, allowing for adjustments to be made to the instruction's behavior or effects without needing to revert and reapply it entirely. The update method can also accept an optional scope parameter, which can be used to provide additional context or information that may be needed for updating the instruction.
     *
     * @param scope
     */
    update(scope?: A_Scope): void;
    /**
     * Revert this instruction from the scene. This means that the changes represented by this instruction will be reverted from the scene, and the Host will perform the necessary operations to undo these changes in the rendered output.
     *
     * @param scope
     */
    revert(scope?: A_Scope): void;
}

declare const AreInstructionFeatures: {
    /**
     * The 'Apply' feature indicates that the instruction has been applied to the scene or component, meaning that its effects have been executed and are now reflected in the state of the scene or component. This status is typically used to track the lifecycle of an instruction, allowing for proper management and potential reversal of changes if needed.
     */
    readonly Apply: "_AreInstruction_Apply";
    /**
     * The 'Update' feature indicates that the instruction has been updated, meaning that its properties or effects have been modified after it was initially applied. This status is important for managing dynamic changes in the scene or component, allowing for adjustments to be made to the instruction's behavior or effects without needing to revert and reapply it entirely.
     */
    readonly Update: "_AreInstruction_Update";
    /**
     * The 'Revert' feature indicates that the instruction has been reverted, meaning that any changes or effects that were applied by the instruction have been undone, and the scene or component has been returned to its previous state before the instruction was applied. This status is crucial for managing the state of the scene or component, especially in cases where an instruction needs to be rolled back due to errors or changes in requirements.
     */
    readonly Revert: "_AreInstruction_Revert";
};
declare const AreInstructionDefaultNames: {
    readonly Default: "_Are_DefaultInstruction";
    readonly Declaration: "_Are_DeclarationInstruction";
    readonly Mutation: "_Are_MutationInstruction";
};

declare class AreInstructionError extends A_Error {
}

/**
 * This is a top-level instruction that represents the creation of a new element in the scene. It contains all the necessary information to create a new element, such as its tag and parent. This instruction can be applied to the scene to create a new element and can be reverted to remove the created element.
 */
declare class AreDeclaration<T extends Record<string, any> = Record<string, any>, S extends AreInstructionSerialized$1<T> = AreInstructionSerialized$1<T>> extends AreInstruction$1<T, S> {
    constructor(
    /**
     * Serialized form of the instruction, used for deserialization and reconstruction of the instruction instance. This allows for the instruction to be easily stored, transmitted, and recreated in different contexts or at different times, while maintaining all the necessary information and relationships intact.
     */
    serialized: AreInstructionSerialized$1);
    constructor(
    /**
     * The name of the operation to be performed in Host. For example, for CreateElement instruction, the name can be "createElement", so the Host can have a method with the same name to handle this instruction.
     */
    name: string, 
    /**
     * In case this is a child instruction that is related to a declaration instruction, we can pass the parent declaration instruction to establish the relationship between them. This allows us to manage related instructions together and ensure that they are executed in the correct order in the scene.
     */
    parent: AreDeclaration, 
    /**
     * A set of additional parameters that may be needed for the rendering purpose. For example, for CreateElement instruction, the payload can contain the tag name and parent information, so the Host can use this information to create the element in the correct place in the scene.
     */
    payload: T);
    constructor(
    /**
     * The name of the operation to be performed in Host. For example, for CreateElement instruction, the name can be "createElement", so the Host can have a method with the same name to handle this instruction.
     */
    name?: string, 
    /**
     * A set of additional parameters that may be needed for the rendering purpose. For example, for CreateElement instruction, the payload can contain the tag name and parent information, so the Host can use this information to create the element in the correct place in the scene.
     */
    payload?: T);
}

declare class AreMutation<T extends Record<string, any> = Record<string, any>, S extends AreInstructionSerialized$1<T> = AreInstructionSerialized$1<T>> extends AreInstruction$1<T, S> {
    get parent(): string;
    get group(): string;
    constructor(
    /**
     * Serialized form of the instruction, used for deserialization and reconstruction of the instruction instance. This allows for the instruction to be easily stored, transmitted, and recreated in different contexts or at different times, while maintaining all the necessary information and relationships intact.
     */
    serialized: S);
    constructor(
    /**
     * The name of the operation to be performed in Host.
     */
    name: string, 
    /**
     * Parent instruction for grouping in case of mutations related to a specific declaration. This allows for better organization and management of instructions in the scene, as all mutations related to the same declaration will be executed together.
     */
    parent: AreDeclaration, 
    /**
     * A set of additional parameters that may be needed for the rendering purpose. For example, for AddAttribute instruction, the payload can contain the attribute name and value as a payload, so the Host can use this information to add the attribute to the node.
     */
    payload?: T);
    fromNew(newEntity: AreInstructionNewProps$1<T>): void;
}

declare class AreLifecycle extends A_Component {
    static Init<T extends AreNode$1>(node: A_TYPES__Entity_Constructor<T>): any;
    static Init<T extends AreAttribute$1>(attribute: A_TYPES__Entity_Constructor<T>): any;
    /**
     *  Handles before init lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    beforeInit(node: AreNode$1, scope: A_Scope, scene: AreScene$1, feature: A_Feature, ...args: any[]): void;
    /**
     * Initializes the AreNode and prepares it for mounting
     *
     * @param node
     * @param scope
     * @param syntax
     * @param feature
     * @param logger
     * @param args
     */
    init(node: AreNode$1, scope: A_Scope, context: AreContext$1, logger?: A_Logger, ...args: any[]): void;
    /**
     * Handles after init lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    afterInit(
    /**
     * Node to be mounted
     */
    node: AreNode$1, scope: A_Scope, scene: AreScene$1, feature: A_Feature, ...args: any[]): void;
    /**
     *  Handles before mount lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    beforeMount(node: AreNode$1, scope: A_Scope, scene: AreScene$1, feature: A_Feature, ...args: any[]): void;
    /**
     * Mount the AreNode into the Host
     *
     * @param scope
     * @param node
     * @param scene
     * @param logger
     */
    mount(
    /**
     * Node to be mounted
     */
    node: AreNode$1, 
    /**
     * Node Content
     */
    scene: AreScene$1, logger?: A_Logger, ...args: any[]): void;
    /**
     * Handles after mount lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    afterMount(
    /**
     * Node to be mounted
     */
    node: AreNode$1, scope: A_Scope, scene: AreScene$1, feature: A_Feature, ...args: any[]): void;
    /**
     * Handles before update lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    beforeUpdate(node: AreNode$1, scope: A_Scope, scene: AreScene$1, feature: A_Feature, ...args: any[]): void;
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
    node: AreNode$1, context: AreContext$1, logger?: A_Logger, ...args: any[]): void;
    /**
     * Handles after update lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    afterUpdate(node: AreNode$1, scope: A_Scope, scene: AreScene$1, feature: A_Feature, ...args: any[]): void;
    /**
     * Handles before unmount lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    beforeUnmount(node: AreNode$1, scope: A_Scope, scene: AreScene$1, feature: A_Feature, ...args: any[]): void;
    /**
     * Unmounts the AreNode from the Host
     *
     * @param node
     * @param scene
     * @param args
     *
     */
    unmount(node: AreNode$1, scene: AreScene$1, ...args: any[]): void;
    /**
     * Handles after unmount lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    afterUnmount(node: AreNode$1, scope: A_Scope, scene: AreScene$1, feature: A_Feature, ...args: any[]): void;
    /**
     * Handles before destroy lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    beforeDestroy(node: AreNode$1, scope: A_Scope, feature: A_Feature, ...args: any[]): void;
    /**
     * Destroys the AreNode from the Host
     *
     * @param node
     * @param scene
     * @param args
     *
     */
    destroy(node: AreNode$1, scene: AreScene$1, ...args: any[]): void;
    /**
     * Handles after destroy lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    afterDestroy(node: AreNode$1, scope: A_Scope, feature: A_Feature, ...args: any[]): void;
}

declare class AreLifecycleError extends A_Error {
    static readonly InvalidLifecycleMethod = "Invalid lifecycle method. Lifecycle method must be one of the following: onBeforeLoad, onLoad, onUpdate, onDestroy.";
}

declare class AreLoader extends A_Component {
    /**
     * Loads the AreNode
     *
     * @param node
     * @param scope
     * @param syntax
     * @param feature
     * @param logger
     * @param args
     */
    load(node: AreNode$1, scope: A_Scope, feature: A_Feature, logger?: A_Logger, context?: AreContext$1, ...args: any[]): Promise<void>;
}

declare class AreLoaderError extends A_Error {
    static readonly SyntaxError = "Are Loader Syntax Error";
    static readonly EmptyTemplateError = "Are Loader Empty Template Error";
}

declare class AreWatcher extends A_Component {
    private readonly handlers;
    private current;
    constructor();
    onChange(handler: (url: URL) => void): () => void;
    get url(): URL;
    destroy(): void;
    private onPopState;
    private onHashChange;
    private onURLChange;
    private attachListeners;
    private patchHistory;
    private notify;
}

declare class AreSignal<_TSignalDataType extends Record<string, any> = Record<string, any>> extends A_Signal<_TSignalDataType> {
}

type AreSignalsContextConfig<T extends Are$1> = {
    [key in string]: {
        default: A_TYPES__Ctor<T>;
        pool: Array<A_TYPES__Ctor<T>>;
        conditions: Array<{
            vector: Array<A_Signal<any>>;
            component: A_TYPES__Ctor<T>;
        }>;
    };
};

declare class AreSignalsMeta extends A_ComponentMeta<{
    vectorToComponent: Map<A_SignalVector, A_TYPES__Ctor<Are$1>>;
    componentToVector: Map<A_TYPES__Ctor<Are$1>, Set<A_SignalVector>>;
} & A_TYPES__ComponentMeta> {
    registerCondition<T extends Are$1>(component: A_TYPES__Ctor<T>, vector: A_SignalVector): void;
    findComponentByVector(vector: A_SignalVector): A_TYPES__Ctor<Are$1> | undefined;
}

declare class AreSignalsContext<T extends Are$1 = Are$1> extends A_Fragment {
    /**
     * Where key is the root ID and the value is an Array of components that participate in conditional compilation.
     */
    protected _componentMap: Map<string, Set<A_TYPES__Ctor<T>>>;
    protected _defaultsMap: Map<string, A_TYPES__Ctor<T>>;
    protected _conditionsMap: Map<string, Array<{
        vector: Array<any>;
        component: A_TYPES__Ctor<T>;
    }>>;
    protected _subscribers: Set<AreNode$1>;
    protected signalsMeta(): AreSignalsMeta;
    subscribe<S extends AreNode$1>(subscriber: S): void;
    unsubscribe<S extends AreNode$1>(subscriber: S): void;
    get subscribers(): Set<AreNode$1>;
    constructor(
    /**
     * Where key is the root ID and the value is an Array of components that participate in conditional compilation.
     */
    config?: Partial<AreSignalsContextConfig<T>>);
    /**
     * Returns the components associated with the given ID. If no components are found, returns an empty array.
     *
     * @param id The ID of the component group.
     * @returns An array of component constructors.
     */
    getComponentById(id: string): Array<A_TYPES__Ctor<T>>;
    /**
     * Returns the components associated with the root ID of the given node. If no components are found, returns an empty array.
     *
     * @param node The AreNode whose root ID is used to retrieve the components.
     * @returns An array of component constructors.
     */
    getComponentByRoot(node: AreNode$1): Array<A_TYPES__Ctor<T>>;
    /**
     * Adds a new component to the specified root ID. If the root ID does not exist, it will be created.
     *
     * @param rootId The ID of the root component group.
     * @param components An array of component constructors to add.
     */
    extendRoot(rootId: string, components: Array<A_TYPES__Ctor<T>>): void;
    /**
     * Whether routing is configured for the given root ID.
     * When false, the root should leave its original template content untouched.
     *
     * @param rootId The id attribute of the <are-root> element.
     */
    hasRoot(rootId: string): boolean;
    /**
     * Returns the default component associated with the given root ID, if any.
     *
     * @param rootId The ID of the root component group.
     */
    getDefault(rootId: string): A_TYPES__Ctor<T> | undefined;
    /**
     * Finds the matching component for the given root ID and incoming signal vector.
     *
     * Matching priorities (mirroring AreSignalsMeta):
     * 1. Full equivalence  — vector.equals(conditionVector)
     * 2. Logical match     — vector.match(conditionVector)
     * 3. Inclusion         — incoming vector contains every signal type from condition, checked with signal.compare()
     *
     * @param rootId  The id attribute of the <are-root> element.
     * @param vector  The incoming signal vector from the bus.
     */
    findComponentByVector(rootId: string, vector: A_SignalVector): A_TYPES__Ctor<T> | undefined;
}

declare class AreSignals extends A_Component {
    handleSignalVector(vector: A_SignalVector, context: AreSignalsContext, state: A_SignalState, scope: A_Scope, logger?: A_Logger): Promise<void>;
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
    propagateEvent(node: AreNode$1, scope: A_Scope, event: AreEvent$1, feature: A_Feature, logger?: A_Logger, ...args: any[]): Promise<void>;
}

declare class AreInit extends AreSignal$1 {
    static default(): AreInit | undefined;
}

declare class AreRoute extends AreSignal$1<A_Route> {
    constructor(path: string | RegExp);
    get route(): A_Route;
    static default(): AreRoute | undefined;
    compare(other: A_Signal<A_Route>): boolean;
}

type AreEngineDependencies = {
    context: AreContext$1;
    syntax: AreSyntax$1;
    loader: A_TYPES__Component_Constructor<AreLoader$1>;
    tokenizer: A_TYPES__Component_Constructor<AreTokenizer$1>;
    compiler: A_TYPES__Component_Constructor<AreCompiler$1>;
    transformer: A_TYPES__Component_Constructor<AreTransformer$1>;
    interpreter: A_TYPES__Component_Constructor<AreInterpreter$1>;
    lifecycle: A_TYPES__Component_Constructor<AreLifecycle$1>;
    signals: A_TYPES__Component_Constructor<AreSignals$1>;
};

declare class AreEngine extends A_Component {
    /**
     * Feature decorator for the load method, which is responsible for the initial loading phase of the engine. This method is where the engine reads the source template, tokenizes it, and prepares the initial context for building the scene. The decorator allows for extending or overriding the default loading behavior by attaching additional functionality before or after the load process.
     */
    static get Load(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    /**
     * Feature decorator for the build method, which is responsible for constructing the scene based on the loaded context. This method typically involves initializing root nodes, applying transformations, and compiling the scene into a format that can be executed by the interpreter. The decorator allows for customizing the build process by adding additional steps or modifying the existing behavior.
     */
    static get Build(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    /**
     * Feature decorator for the execute method, which is responsible for the final execution phase of the engine. This method typically involves mounting the root nodes to the DOM and starting the reactive update cycle based on signals and state changes. The decorator allows for customizing the execution process by adding additional steps or modifying the existing behavior.
     */
    static get Execute(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    /**
     * Method to start the engine, which involves loading necessary resources, building the scene, and executing the rendering process. It accepts an optional scope parameter that can be used to provide a custom scope for the engine's operations, allowing for greater flexibility in how dependencies are managed and accessed during the rendering lifecycle.
     *
     * @param scope
     * @returns
     */
    load(scope?: A_Scope): Promise<void>;
    /**
     * Method responsible for building the scene, which includes initializing root nodes, loading necessary data, applying transformations, and compiling the scene into a format that can be executed by the interpreter.
     *
     * @param context
     * @param logger
     */
    build(scope?: A_Scope): Promise<void>;
    /**
     * Method responsible for executing the rendering process, which involves mounting the root nodes to the DOM and starting the reactive update cycle based on signals and state changes.
     *
     * @param context
     * @param logger
     */
    execute(scope?: A_Scope): Promise<void>;
    protected defaultBuild(context: AreContext$1, logger?: A_Logger): Promise<void>;
    protected defaultExecute(context: AreContext$1, bus?: A_SignalBus, logger?: A_Logger): Promise<void>;
    init(scope: A_Scope): Promise<void>;
    verify(scope: A_Scope, syntax?: AreSyntax$1, syntaxContext?: AreSyntax$1, transformer?: AreTransformer$1, loader?: AreLoader$1, compiler?: AreCompiler$1, interpreter?: AreInterpreter$1, lifecycle?: AreLifecycle$1, logger?: A_Logger): Promise<void>;
    /**
     * Method to pack all necessary dependencies for the engine. This method is called during the initialization phase of the engine and ensures that all required components are registered in the container scope, allowing for proper dependency injection and management throughout the engine's lifecycle.
     *
     * @param scope
     * @param dependencies
     */
    protected package(scope: A_Scope, dependencies?: Partial<AreEngineDependencies>): void;
    protected packDependency<T extends A_TYPES__A_DependencyInjectable>(scope: A_Scope, dependency: T | A_TYPES__Ctor<T>, existed?: A_TYPES__Ctor<T>): T | A_TYPES__Ctor<T>;
}

declare const AreEngineFeatures: {
    Load: string;
    Build: string;
    Execute: string;
};

declare class AreEngineError extends A_Error {
    static readonly MissedRequiredDependency = "A Required Dependency is missing in AreEngine";
}

export { Are, AreAttribute, type AreAttributeFeatureNames, AreAttributeFeatures, type AreAttribute_Init, type AreAttribute_Serialized, AreCompiler, AreCompilerError, AreContext, type AreContextInit, AreDeclaration, AreEngine, type AreEngineDependencies, AreEngineError, AreEngineFeatures, AreEvent, type AreEventProps, type AreFeatureNames, AreFeatures, AreInit, AreInstruction, AreInstructionDefaultNames, AreInstructionError, AreInstructionFeatures, type AreInstructionNewProps, type AreInstructionSerialized, AreInterpreter, AreInterpreterError, AreLifecycle, AreLifecycleError, AreLoader, AreLoaderError, AreMutation, AreNode, type AreNodeFeatureNames, AreNodeFeatures, type AreNodeNewProps, type AreNodeStatusNames, AreNodeStatuses, type ArePropDefinition, AreRoute, AreScene, type AreSceneChanges, AreSceneError, type AreSceneStatusNames, AreSceneStatuses, type AreScene_Serialized, AreSignal, AreSignals, AreSignalsContext, type AreSignalsContextConfig, AreStore, type AreStoreAreComponentMetaKeyNames, AreStoreAreComponentMetaKeys, type AreStorePathValue, type AreStoreWatchingEntity, AreSyntax, type AreSyntaxCompiledExpression, AreSyntaxError, type AreSyntaxInitOptions, type AreSyntaxTokenMatch, type AreSyntaxTokenPayload, type AreSyntaxTokenRules, AreTokenizer, AreTokenizerError, AreTransformer, AreWatcher };
