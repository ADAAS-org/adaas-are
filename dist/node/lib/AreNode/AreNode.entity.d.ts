import { A_Entity, A_Scope, ASEID } from '@adaas/a-concept';
import { AreEvent } from '@adaas/are/event/AreEvent.context';
import { AreScene } from '@adaas/are/scene/AreScene.context';
import { AreAttribute } from '@adaas/are/attribute/AreAttribute.entity';
import { Are } from '@adaas/are/component/Are.component';
import { AreNodeNewProps, AreNodeStatusNames } from './AreNode.types.js';
import { AreSyntaxTokenPayload } from '@adaas/are/syntax/AreSyntax.types';
import './AreNode.constants.js';

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
    protected _payload?: AreSyntaxTokenPayload;
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
    get attributes(): AreAttribute[];
    /**
     * A custom component associated with this node, which can be used to provide custom logic and behavior for the node. This component is typically defined in the context and can be resolved based on the node's type or other identifying information. The component can include its own content, markup, styles, and features that are specific to the functionality it provides.
     *
     * Example: If the node type is "custom-component", the corresponding component would be resolved from the context and can be used to provide custom rendering and behavior for nodes of that type.
     *
     * [!] Note: The component is optional and may not be defined for all nodes. If no component is associated with the node, it will be treated as a standard HTML element or a basic node without custom logic.
     */
    get component(): Are | undefined;
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
    get scene(): AreScene;
    protected _scene: AreScene;
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
    emit(event: AreEvent): any;
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

export { AreNode };
