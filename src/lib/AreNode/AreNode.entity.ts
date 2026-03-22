import { A_Context, A_Entity, A_Error, A_FormatterHelper, A_Scope, A_TypeGuards, ASEID } from "@adaas/a-concept";
import { AreNodeNewProps, AreNodeStatusNames } from "./AreNode.types";
import { AreEvent } from "@adaas/are/event";
import { AreNodeFeatures, AreNodeStatuses } from "./AreNode.constants";
import { AreScene } from "@adaas/are/scene";
import { A_Frame } from "@adaas/a-frame";
import { AreStore } from "@adaas/are/store";
import { AreBindingAttribute, AreDirectiveAttribute, AreEventAttribute, AreStaticAttribute } from "@adaas/are/attribute";
import { AreInterpolation } from "@adaas/are/interpolation";
import { AreStyle } from "../AreStyle";
import { Are } from "../AreComponent";
import { AreSceneInstruction } from "../AreSceneInstruction";
import { AreDirective } from "../AreDirective";
import { AreDirectiveMeta } from "../AreDirective/AreDirective.meta";


@A_Frame.Entity({
    namespace: 'A-ARE',
    name: 'AreNode',
    description: 'An AreNode entity represents a node within the A-Concept Rendering Engine (ARE) framework. It encapsulates template, markup, and styles, and manages its own scope for nested fragments and entities. AreNodes are responsible for handling events, compiling, rendering, updating, and lifecycle management within the ARE context.'
})
export class AreNode extends A_Entity<AreNodeNewProps> {
    /**
     * The current status of the node, which can be used to track the lifecycle and rendering state of the node within the scene. 
     */
    status!: AreNodeStatusNames;

    /**
     * Template string defined for the node
     * Example: `<div>{{name}}</div>`
     */
    protected _template!: string
    /**
     * Markup string defined for the node
     * Example: `<custom-component :prop="value"> <div>Inner Content</div> </custom-component>`
     */
    protected _markup!: string
    /**
     * The scope associated with this node
     * uses to store all nested fragments and entities like other AreNodes and Scene
     */
    protected _scope!: A_Scope

    /**
     * Actual node identifier. 
     */
    get id(): string {
        return this.aseid.id;
    }
    /**
     * Actual node type. 
     * By default it's a tag name
     */
    get type(): string {
        return this.aseid.entity;
    }
    /**
     * Template string defined for the node
     * Example: `<div>{{name}}</div>`
     */
    get template(): string {
        return this._template;
    }
    /**
     * Markup string defined for the node
     * Example: `<custom-component :prop="value"> <div>Inner Content</div> </custom-component>`
     */
    get markup(): string {
        return this._markup;
    }
    /**
     * The scope associated with this node
     * uses to store all nested fragments and entities like other AreNodes and Scene
     */
    get scope(): A_Scope {
        if (!this._scope) {
            this._scope = A_Context.allocate(this, new A_Scope({ name: `${this.aseid.id}-scope` }));
        }

        return this._scope;
    }
    /**
     * The store associated with this node, which is used to manage the state and data related to the node. 
     */
    get store(): AreStore {
        return this.scope.resolve<AreStore>(AreStore)!;
    }

    /**
     * Returns an array of compiled instructions that are associated with the node. These instructions are typically generated during the compilation phase and are used to define how the node should be rendered and updated in the scene. The instructions can include operations such as adding or removing elements, updating attributes, attaching event listeners, and other actions that are necessary to render the node correctly based on its template, markup, and styles.
     * 
     * Example: If the node's template includes a directive like `v-if="condition"`, the compiled instructions might include an instruction to add or remove the corresponding element based on the evaluated value of `condition`.
     */
    get instructions(): AreSceneInstruction[] {
        return this.scope.resolveFlatAll<AreSceneInstruction>(AreSceneInstruction) || [];
    }

    /**
     * The static attributes defined for the node, which are typically used to represent static properties or characteristics of the node that do not change based on the context or state. These attributes are usually defined in the template and are not reactive.
     * 
     * Example: For a node defined as `<div class="static-class">`, the static attribute would be `class="static-class"`.
     */
    get attributes(): AreStaticAttribute[] {
        return this.scope.resolveFlatAll<AreStaticAttribute>(AreStaticAttribute);
    }
    /**
     * The binding attributes defined for the node, which are typically used to represent dynamic properties or characteristics of the node that can change based on the context or state. These attributes are usually defined in the template with a specific syntax (e.g., `:prop="value"` or `v-bind:prop="value"`) and are reactive, meaning that they will update automatically when the underlying data changes.
     * 
     * Example: For a node defined as `<div :class="dynamicClass">`, the binding attribute would be `:class="dynamicClass"`.
     */
    get bindings(): AreBindingAttribute[] {
        return this.scope.resolveFlatAll<AreBindingAttribute>(AreBindingAttribute);
    }
    /**
     * The directive attributes defined for the node, which are typically used to represent special instructions or behaviors that should be applied to the node. These attributes are usually defined in the template with a specific syntax (e.g., `v-if="condition"` or `v-for="item in list"`) and are processed by the rendering engine to apply the corresponding logic or behavior to the node.
     * 
     * Example: For a node defined as `<div v-if="isVisible">`, the directive attribute would be `v-if="isVisible"`.
     */
    get directives(): AreDirectiveAttribute[] {
        /**
         * 1. get all registered directives for the node
         */
        const directives = this.scope.resolveFlatAll<AreDirectiveAttribute>(AreDirectiveAttribute)!;
        /**
         * 2. Order them in the way that defined in the meta
         * 
         *   Each meta has a prioprity of order that may impact the way how directives are compiled and rendered. For example, a directive with higher priority may need to be compiled before other directives to ensure that its logic is applied correctly before other directives are processed. By ordering the directives based on their defined priority in the meta, we can ensure that the compilation and rendering process follows the intended logic and behavior as defined by the directive implementations.
         */

        return directives.sort((a, b) => {
            const aMeta = A_Context.meta<AreDirectiveMeta, AreDirective>(a);
            const bMeta = A_Context.meta<AreDirectiveMeta, AreDirective>(b);

            const aPriority = aMeta.priority ?? 0;
            const bPriority = bMeta.priority ?? 0;

            return bPriority - aPriority;
        });
    }
    /**
     * The interpolations inside the node template, which are typically used to represent dynamic content or expressions that should be evaluated and rendered within the node. These interpolations are usually defined in the template with a specific syntax (e.g., `{{ expression }}`) and are reactive, meaning that they will update automatically when the underlying data changes.
     * 
     * Example: For a node defined as `<div>{{ name }}</div>`, the interpolation would be `{{ name }}`.
     */
    get interpolations(): AreInterpolation[] {
        return this.scope.resolveFlatAll<AreInterpolation>(AreInterpolation);
    }
    /**
     * The event attributes defined for the node, which are typically used to represent event listeners or handlers that should be attached to the node. These attributes are usually defined in the template with a specific syntax (e.g., `@click="handleClick"` or `v-on:click="handleClick"`) and are processed by the rendering engine to attach the corresponding event listeners to the node.
     * 
     * Example: For a node defined as `<button @click="handleClick">`, the event attribute would be `@click="handleClick"`.
     */
    get events(): AreEventAttribute[] {
        return this.scope.resolveFlatAll<AreEventAttribute>(AreEventAttribute)!;
    }
    /**
     * The styles defined for the node, which can include inline styles or styles defined in a separate stylesheet that are applied to the node. These styles can be used to control the visual appearance of the node and can be defined using standard CSS syntax.
     */
    get styles(): AreStyle {
        return this.scope.resolveFlat<AreStyle>(AreStyle)!;
    }
    /**
     * A custom component associated with this node, which can be used to provide custom logic and behavior for the node. This component is typically defined in the context and can be resolved based on the node's type or other identifying information. The component can include its own template, markup, styles, and features that are specific to the functionality it provides.
     * 
     * Example: If the node type is "custom-component", the corresponding component would be resolved from the context and can be used to provide custom rendering and behavior for nodes of that type.
     * 
     * [!] Note: The component is optional and may not be defined for all nodes. If no component is associated with the node, it will be treated as a standard HTML element or a basic node without custom logic.
     */
    get component(): Are | undefined {
        return this.scope.resolve<Are>(A_FormatterHelper.toPascalCase(this.aseid.entity)) as Are | undefined;
    }
    /**
     * The parent node of this node, which is the node that registered the current node in its scope. This is typically the node that is responsible for rendering the current node and managing its lifecycle within the scene. The parent node can be used to access shared context, propagate events, and manage interactions between nodes in a hierarchical structure.
     * 
     * Example: For a node defined as `<div><span>Child Node</span></div>`, the parent node of the `<span>` element would be the `<div>` element, which is responsible for rendering the `<span>` and managing its lifecycle within the scene.
     */
    get parent(): AreNode | undefined {
        return this.scope.issuer() as AreNode | undefined;
    }
    /**
     * The child nodes of this node, which are typically defined in the markup and registered in the scope as child entities. These child nodes can represent nested elements or components within the node and can have their own templates, markup, styles, and features. The child nodes are managed within the scope of the parent node and can be accessed and manipulated as needed for rendering, updating, and lifecycle management.
     * 
     * Example: For a node defined as `<div><span>Child Node</span></div>`, the child node would be the `<span>` element, which is registered as a child entity in the scope of the parent `<div>` node.
     */
    get children(): AreNode[] {
        return this.scope.resolveFlatAll<AreNode>(AreNode) || [];
    }
    /**
     * It returns the scene where the node exists, so it should be the scene of the rootNode, 
     * primary parent of this node.
     */
    get scene(): AreScene {
        return this.scope.resolve<AreScene>(AreScene)!;
    }




    fromNew(newEntity: AreNodeNewProps): void {
        this.aseid = this.generateASEID({
            id: newEntity.id,
            entity: newEntity.component,
            scope: newEntity.scope,
        });

        this.status = AreNodeStatuses.Pending;
        this._template = newEntity.template || '';
        this._markup = newEntity.markup || '';
    }


    fromASEID(aseid: string | ASEID): void {
        super.fromASEID(aseid);

        this._template = '';
        this._markup = '';
        this.status = AreNodeStatuses.Pending;
    }
    /**
     * Sets the template string for the node, which defines the structure and content of the node as it should be rendered in the scene. The template can include HTML-like syntax, custom components, directives, and other features that are processed by the rendering engine to generate the corresponding SceneInstructions for rendering the node. The template is a fundamental part of the node's definition and is used to determine how the node should be displayed and how it interacts with its children and other entities in the scene.
     * 
     * @param template 
     */
    setTemplate(template: string): void {
        this._template = template;
    }
    /**
     * Sets the markup string for the node, which defines the inner content and structure of the node as it should be rendered in the scene. The markup can include HTML-like syntax, custom components, directives, and other features that are processed by the rendering engine to generate the corresponding SceneInstructions for rendering the node. The markup is typically used to define the content that goes inside the node's template and can be used to create complex nested structures and interactions within the node.
     * 
     * @param markup 
     */
    setMarkup(markup: string): void {
        this._markup = markup;
    }
    /**
     * The raw value of the attribute as defined in the template, which can include the original syntax and formatting. This is typically used for debugging or informational purposes to understand how the attribute was originally defined in the template.
     * 
     * @param node - The node to which the attribute belongs
     */
    addChild(node: AreNode): void {
        this.scope.register(node);
        node.scope.inherit(this.scope);
    }
    /**
     * Removes a child node from the current node's scope. This is typically used when a child node is no longer needed or should be detached from the parent node. The method ensures that the child node is properly deregistered from the scope and any associated resources are cleaned up as necessary.
     * 
     * @param node  - The child node to be removed from the current node's scope
     */
    removeChild(node: AreNode): void {
        this.scope.deregister(node);
    }

    // ============================================================================================
    //                                Node Lifecycle Methods
    // ============================================================================================

    /**
     * Loads the node, which typically involves executing any necessary setup or initialization logic to prepare the node for rendering and interaction within the scene. This may include processing the node's template, markup, styles, and features to generate the corresponding SceneInstructions, as well as setting up any event listeners or reactive properties as needed.
     */
    async load(): Promise<any> {
        return await super.load(this.scope);
    }
    /**
     * Compile the node. This method should transform the node's template, markup, and styles into a set of SceneInstructions that can be executed to render the node in the scene. The compile method is responsible for processing the node's features, attributes, directives, and other properties to generate the necessary instructions for rendering and updating the node in response to changes in state or context.
     * 
     * [!] Note: The compile method should ensure that the node's scope is properly inherited from the context scope before processing, and it should handle any errors that may occur during compilation to ensure that the node can be rendered correctly in the scene.
     */
    compile(): void {

        this.checkScopeInheritance();

        try {

            this.call(AreNodeFeatures.onCompile, this.scope);

        } catch (error) {
            throw error;
        }
    }
    /**
     * Mounts the node, which typically involves executing any necessary logic to render the node in the scene and to set up any interactions or behaviors associated with the node. This may include applying the generated SceneInstructions from the compile phase, attaching event listeners, and performing any other necessary tasks to ensure that the node is properly rendered and functional within the scene.
     * 
     * [!] Note: The mount method should ensure that the node's scope is properly inherited from the context scope before performing any mounting logic, and it should handle any errors that may occur during mounting to ensure that the node can be rendered correctly in the scene.
     */
    mount(): void {

        this.checkScopeInheritance();

        try {
            this.call(AreNodeFeatures.onBeforeMount, this.scope);
            this.call(AreNodeFeatures.onMount, this.scope);

        } catch (error) {
            throw error;
        }
    }
    /**
     * Is responsible to run rendering process. It goes through all planned instructions in scene and executes them. The onRender feature should trigger any associated rendering logic defined for the node, which may include executing the generated SceneInstructions, updating the node's appearance based on changes in state or context, and performing any other necessary tasks to ensure that the node is rendered correctly within the scene.
     * 
     * [!] Note: The render method should NOT go though own child, since it may be used by both mount and update operations!
     */
    render() {
        this.checkScopeInheritance();

        try {
            this.call(AreNodeFeatures.onRender, this.scope);

        } catch (error) {
            throw error;
        }
    }
    /**
     * Updates the node, which typically involves executing any necessary logic to update the node's rendering and behavior in response to changes in state, context, or other factors. This may include reapplying SceneInstructions, updating event listeners, and performing any other necessary tasks to ensure that the node remains functional and correctly rendered within the scene as changes occur.
     * 
     * [!] Note: The update method should ensure that the node's scope is properly inherited from the context scope before performing any update logic, and it should handle any errors that may occur during updating to ensure that the node can be updated correctly in the scene.
     */
    update(): void {

        this.checkScopeInheritance();

        try {
            this.call(AreNodeFeatures.onUpdate, this.scope);

        } catch (error) {
            throw error;
        }
    }
    /**
     * Unmounts the node, which typically involves executing any necessary logic to remove the node from the scene and to clean up any resources associated with the node. This may include reverting any applied SceneInstructions, detaching event listeners, and performing any other necessary tasks to ensure that the node is properly removed from the scene and that resources are released as needed.
     * 
     * [!] Note: The unmount method should ensure that the node's scope is properly inherited from the context scope before performing any unmounting logic, and it should handle any errors that may occur during unmounting to ensure that the node can be removed correctly from the scene.
     */
    unmount(): void {

        this.checkScopeInheritance();

        try {
            this.call(AreNodeFeatures.onUnmount, this.scope);

        } catch (error) {
            throw error;
        }
    }

    reset(): void {
        this.scope.destroy();

        this._template = '';

        this._scope = new A_Scope({
            name: `${this.aseid.id}`,
        });
    }

    /**
     * Emits an event or a scope to the node, which can be used to trigger event handlers or to provide additional context for processing within the node. The method can accept either an AreEvent instance or an A_Scope instance, and it will handle the emission accordingly. This allows for flexible communication and interaction within the node's context, enabling dynamic behavior and responsiveness based on events or changes in scope.
     * 
     * @param scope - The scope or event to be emitted to the node
     */
    async emit(
        scope: A_Scope,
    )
    async emit(
        event: AreEvent,
    )
    async emit(
        eventOrScope: AreEvent | A_Scope,
    ) {
        this.checkScopeInheritance();

        /**
         * isolated event scope to avoid polluting the node scope
         */
        const eventScope = A_TypeGuards.isScopeInstance(eventOrScope)
            ? eventOrScope
                .inherit(this.scope)
            : new A_Scope({
                name: `${eventOrScope.name}-scope`,
                fragments: [eventOrScope]
            })
                .inherit(this.scope)

        try {

            await this.call(AreNodeFeatures.onEvent, eventScope)

            eventScope.destroy()

        } catch (error) {

            eventScope.destroy();

            throw error;
        }

    }


    /**
     * Destroys the node, which typically involves executing any necessary cleanup logic to remove the node from the scene and to free up any resources associated with the node. This may include deregistering the node from its scope, removing any event listeners or reactive properties, and performing any other necessary cleanup tasks to ensure that the node is properly removed from the scene and that resources are released as needed.
     * 
     * [!] Note: The destroy method should ensure that the node's scope is properly inherited from the context scope before performing any cleanup, and it should handle any errors that may occur during destruction to ensure that resources are released correctly.
     */
    async destroy(): Promise<any> {
        this.checkScopeInheritance();
        try {

            await super.destroy(this.scope);

            this.scope.destroy();

        } catch (error) {

            this._scope.destroy();

            throw error;
        }
    }


    //============================================================================================
    //                                Helpers Methods
    //============================================================================================
    /**
     * Method to ensure that the current scope is inherited from the context scope
     * 
     * @throws A_Error if the scope is not inherited from the context scope
     */
    protected checkScopeInheritance(): void {
        let attachedScope: A_Scope;

        try {
            attachedScope = A_Context.scope(this);
        } catch (error) {
            throw new A_Error({
                title: `A_UI_Node Scope Inheritance Error`,
                description: `The A_UI_Node entity with ASEID '${this.aseid.toString()}' is not bound to any context scope. Please ensure that the entity is created within a valid context.`,
                originalError: error
            });
        }
    }
}