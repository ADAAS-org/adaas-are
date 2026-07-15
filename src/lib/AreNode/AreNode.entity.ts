import { A_CommonHelper, A_Context, A_Entity, A_Error, A_FormatterHelper, A_Scope, A_TYPES__Ctor, A_TypeGuards, ASEID } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame/core";
import { AreEvent } from "@adaas/are/event/AreEvent.context";
import { AreScene } from "@adaas/are/scene/AreScene.context";
import { AreAttribute } from "@adaas/are/attribute/AreAttribute.entity";
import { Are } from "@adaas/are/component/Are.component";
import { AreNodeFeatures, AreNodeStatuses } from "./AreNode.constants";
import { AreNodeNewProps, AreNodeStatusNames, AreNode_Serialized } from "./AreNode.types";
import { AreSyntaxTokenPayload } from "@adaas/are/syntax/AreSyntax.types";
import { AreContext } from "@adaas/are/component/Are.context";


@A_Frame.Define({
    namespace: 'A-ARE',
    description: 'An AreNode entity represents a node within the A-Concept Rendering Engine (ARE) framework. It encapsulates content, markup, and styles, and manages its own scope for nested fragments and entities. AreNodes are responsible for handling events, compiling, rendering, updating, and lifecycle management within the ARE context.'
})
export class AreNode extends A_Entity<AreNodeNewProps, AreNode_Serialized> {

    static get concept(): string {
        return 'are';
    }


    /**
     * The current status of the node, which can be used to track the lifecycle and rendering state of the node within the scene. 
     */
    status!: AreNodeStatusNames;

    /**
     * The opening string that defines the start of a node in the source. This is typically used for parsing and tokenizing the source to identify the structure and content of the node. The opening string can include the tag name, attributes, and other syntax that indicates the beginning of a node.
     */
    protected _opening!: string;
    /**
     * The closing string that defines the end of a node in the source. This is typically used for parsing and tokenizing the source to identify the structure and content of the node. The closing string can include the tag name, attributes, and other syntax that indicates the end of a node.
     */
    protected _closing!: string;
    /**
     * The position of the node in the source string, which can be used for error reporting, debugging, and other purposes related to tracking the location of the node within the original source. The position is a character index identifying where the node is defined.
     */
    protected _position!: number;
    /**
     * The payload associated with the node, which can include any additional data or metadata that is extracted during the tokenization process. The payload can be used to store custom information related to the node, such as directive arguments, binding expressions, or any other relevant data that may be needed for processing and rendering the node within the scene.
     */
    protected _payload?: AreSyntaxTokenPayload
    /**
     * Content string defined for the node — the inner content between delimiters.
     * Example: `{{name}}`
     */
    protected _content!: string
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
     * Content string defined for the node — the inner content between delimiters.
     * Example: `{{name}}`
     */
    get content(): string {
        return this._content;
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
     * The attributes defined for the node, which can include static attributes, binding attributes, directive attributes, and event attributes. These attributes are extracted during tokenization and processed during the compilation phase to generate the corresponding SceneInstructions for rendering and updating the node in the scene.
     */
    get attributes(): AreAttribute[] {
        return this.scope.resolveFlatAll<AreAttribute>(AreAttribute);
    }
    /**
     * A custom component associated with this node, which can be used to provide custom logic and behavior for the node. This component is typically defined in the context and can be resolved based on the node's type or other identifying information. The component can include its own content, markup, styles, and features that are specific to the functionality it provides.
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
        const parentIssuer = this.scope.parent?.issuer();

        if (!parentIssuer || !(parentIssuer instanceof AreNode)) return undefined;

        return parentIssuer as AreNode | undefined;
    }
    /**
     * The child nodes of this node, which are typically defined in the markup and registered in the scope as child entities. These child nodes can represent nested elements or components within the node and can have their own content, markup, styles, and features. The child nodes are managed within the scope of the parent node and can be accessed and manipulated as needed for rendering, updating, and lifecycle management.
     * 
     * Example: For a node defined as `<div><span>Child Node</span></div>`, the child node would be the `<span>` element, which is registered as a child entity in the scope of the parent `<div>` node.
     */
    get children(): (AreNode)[] {
        return this.scope.resolveFlatAll<AreNode>(AreNode) || [];
    }
    /**
     * It returns the scene where the node exists, so it should be the scene of the rootNode, 
     * primary parent of this node.
     */
    get scene(): AreScene {
        if (!this._scene)
            this._scene = this.scope.resolve<AreScene>(AreScene)!;
        return this._scene;
    }


    protected _scene!: AreScene;


    fromNew(newEntity: AreNodeNewProps): void {
        this.aseid = this.generateASEID({
            id: newEntity.payload?.id,
            entity: newEntity.payload?.entity || 'node',
            scope: newEntity.payload?.scope,
        });

        this.status = AreNodeStatuses.Pending;
        this._content = newEntity.content || '';
        this._markup = newEntity.raw || '';
        this._opening = newEntity.opening || '';
        this._closing = newEntity.closing || '';
        this._position = newEntity.position || 0;
        this._payload = newEntity.payload;
    }


    fromASEID(aseid: string | ASEID): void {
        super.fromASEID(aseid);

        this._content = '';
        this._markup = '';
        this.status = AreNodeStatuses.Pending;
    }
    /**
     * Sets the content string for the node — the inner text/markup between the node's
     * opening and closing delimiters. Content is processed by the rendering engine to
     * generate the corresponding SceneInstructions for rendering the node.
     * 
     * @param content 
     */
    setContent(content: string): void {
        this._content = content;
    }
    /**
     * Sets the markup string for the node, which is the full raw matched string including delimiters. The markup can include HTML-like syntax, custom components, directives, and other features that are processed by the rendering engine to generate the corresponding SceneInstructions for rendering the node.
     * 
     * @param markup 
     */
    setMarkup(markup: string): void {
        this._markup = markup;
    }
    /**
     * Adds a child node to the current node's scope and ensures the child inherits from this node's scope.
     * 
     * @param child - The node to add as a child
     */
    addChild(child: AreNode): void {
        this.scope.register(child);

        if (!child.scope.isInheritedFrom(this.scope))
            child.scope.inherit(this.scope);
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
     * Executes initialization logic for the node, which typically involves setting up the node's scope, registering any necessary entities, and preparing the node for rendering and interaction within the scene. This method is called during the initial phase of the node's lifecycle and is responsible for ensuring that the node is properly initialized before it is compiled and rendered in the scene.
     */
    init(): void {

        // const context = this.scope.resolve(AreContext);

        // context?.startPerformance('Node Init');
        this.call(AreNodeFeatures.onBeforeInit, this.scope);
        this.call(AreNodeFeatures.onInit, this.scope);
        this.call(AreNodeFeatures.onAfterInit, this.scope);
        // context?.endPerformance('Node Init');
    }


    /**
     * Loads the node, which typically involves executing any necessary setup or initialization logic to prepare the node for rendering and interaction within the scene. This may include processing the node's content, markup, styles, and features to generate the corresponding SceneInstructions, as well as setting up any event listeners or reactive properties as needed.
     */
    async load(): Promise<any> {
        this.checkScopeInheritance();
        try {
            const context = this.scope.resolve(AreContext);

            context?.startPerformance('Node Load');

            const res = super.load(this.scope);

            context?.endPerformance('Node Load');

            return res;
        } catch (error) {
            throw error;
        }
    }
    /**
     * Tokenizes the node content, which typically involves parsing the raw content string to identify the structure, child nodes, attributes, directives, and other features. This process is essential for breaking down the content into its constituent parts and preparing it for further processing during the compilation phase. The tokenization process can involve creating child nodes, extracting attributes and their values, and identifying any directives or bindings that need to be processed during rendering.
     */
    tokenize(): void {
        this.checkScopeInheritance();
        try {
            const context = this.scope.resolve(AreContext);

            context?.startPerformance('Node Tokenize');
            this.call(AreNodeFeatures.onTokenize, this.scope);
            context?.endPerformance('Node Tokenize');

        } catch (error) {
            throw error;
        }
    }
    /**
     * Transforms the node, which typically involves executing any necessary logic to reshape the node's structure or content before it is compiled and rendered in the scene. This may include applying any transformations defined by directives, processing any dynamic content or expressions, and performing any other necessary tasks to ensure that the node is properly prepared for compilation and rendering based on its content, markup, styles, and features.
     */
    transform(): void {
        this.checkScopeInheritance();
        try {
            const context = this.scope.resolve(AreContext);

            context?.startPerformance('Node Transform');

            this.call(AreNodeFeatures.onTransform, this.scope);

            context?.endPerformance('Node Transform');
        } catch (error) {
            throw error;
        }
    }

    /**
     * Compile the node. This method should transform the node's content, markup, and styles into a set of SceneInstructions that can be executed to render the node in the scene. The compile method is responsible for processing the node's features, attributes, directives, and other properties to generate the necessary instructions for rendering and updating the node in response to changes in state or context.
     * 
     * [!] Note: The compile method should ensure that the node's scope is properly inherited from the context scope before processing, and it should handle any errors that may occur during compilation to ensure that the node can be rendered correctly in the scene.
     */
    compile(): void {
        this.checkScopeInheritance();

        try {
            const context = this.scope.resolve(AreContext);

            context?.startPerformance('Node Compile');

            this.call(AreNodeFeatures.onCompile, this.scope);

            context?.endPerformance('Node Compile');
        } catch (error) {
            throw error;
        }
    }
    /**
     * Mounts the node, which typically involves executing any necessary logic to render the node in the scene and to set up any interactions or behaviors associated with the node. This may include applying the generated SceneInstructions from the compile phase, attaching event listeners, and performing any other necessary tasks to ensure that the node is properly rendered and functional within the scene.
     * 
     * [!] Note: The mount method should ensure that the node's scope is properly inherited from the context scope before performing any mounting logic, and it should handle any errors that may occur during mounting to ensure that the node can be rendered correctly in the scene.
     */
    mount(): void | Promise<void> {

        this.checkScopeInheritance();

        const context = this.scope.resolve(AreContext);

        context?.startPerformance('Node Mount');

        this.call(AreNodeFeatures.onBeforeMount, this.scope);

        const onMount = this.call(AreNodeFeatures.onMount, this.scope);

        /**
         * The HTML engine time-slices large initial mounts and returns a Promise
         * from onMount. When that happens we must defer onAfterMount (and the perf
         * marker) until the whole subtree has finished mounting, so the
         * "mounted" contract still fires post-order. Small/synchronous mounts
         * return void here and keep the fully synchronous fast-path.
         */
        if (onMount && typeof (onMount as Promise<void>).then === 'function') {
            return (onMount as Promise<void>).then(() => {
                this.call(AreNodeFeatures.onAfterMount, this.scope);
                context?.endPerformance('Node Mount');
            });
        }

        this.call(AreNodeFeatures.onAfterMount, this.scope);

        context?.endPerformance('Node Mount');
    }
    /**
     * Interprets the node, which typically involves executing any necessary logic to process the node's features, attributes, directives, and other properties to generate the corresponding SceneInstructions for rendering and updating the node in response to changes in state or context. This method is responsible for ensuring that the node is properly interpreted based on its content, markup, styles, and features to enable dynamic behavior and responsiveness within the scene.
     * 
     * [!] Note: The interpret method should NOT go though own child, since it may be used by both mount and update operations!
     */
    interpret(): void {
        this.checkScopeInheritance();

        try {
            const context = this.scope.resolve(AreContext);

            context?.startPerformance('Node Interpret');

            this.call(AreNodeFeatures.onInterpret, this.scope);

            context?.endPerformance('Node Interpret');

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
            const context = this.scope.resolve(AreContext);

            context?.startPerformance('Node Update');
            this.call(AreNodeFeatures.onBeforeUpdate, this.scope);
            this.call(AreNodeFeatures.onUpdate, this.scope);
            this.call(AreNodeFeatures.onAfterUpdate, this.scope);

            context?.endPerformance('Node Update');

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
            const context = this.scope.resolve(AreContext);

            context?.startPerformance('Node Unmount');

            this.call(AreNodeFeatures.onBeforeUnmount, this.scope);
            this.call(AreNodeFeatures.onUnmount, this.scope);
            this.call(AreNodeFeatures.onAfterUnmount, this.scope);

            context?.endPerformance('Node Unmount');

        } catch (error) {
            throw error;
        }
    }

    cloneWithScope<T extends AreNode = AreNode>(this: T): T {
        const currentScope = this.scope;

        A_Context.deallocate(currentScope);

        const newNode = new (this.constructor as new (props: AreNodeNewProps) => T)({
            opening: this._opening,
            closing: this._closing,
            position: this._position,
            payload: this._payload || {},
            content: this._content,
            raw: this._markup,
        });

        if (newNode._scope)
            A_Context.deallocate(newNode._scope);

        newNode._scope = currentScope;

        A_Context.allocate(newNode, currentScope);

        this._scope = A_Context.allocate(this);

        return newNode as T;
    }

    reset(): void {
        for (const child of this.children) {
            this.scope.deregister(child);
        }

        for (const attribute of this.attributes) {
            this.scope.deregister(attribute);
        }
    }

    /**
     * Registers a component class at runtime — the documented entry point for
     * injecting a component that was NOT present at bootstrap (e.g. a class
     * fetched from a backend / lazily imported).
     *
     * The class is registered into the ROOT scope (the topmost scope in the
     * inheritance chain), NOT this node's local scope, so it becomes globally
     * resolvable for every node in the tree — exactly as if it had been
     * registered at bootstrap. Registering in the local scope would only make
     * the tag resolvable for this single node's subtree.
     *
     * `scope.register` bumps the resolution version; because version
     * aggregation walks up the parent chain, registering at the root
     * invalidates the resolve caches of all descendant scopes, so the new
     * component is picked up immediately on the next {@link render} / load.
     *
     * @param component - the component constructor to register.
     */
    registerComponent(component: A_TYPES__Ctor<Are>): void {
        let scope = this.scope;

        while (scope.parent) {
            scope = scope.parent;
        }

        scope.register(component);
    }

    /**
     * Builds and mounts this node's children from its CURRENT content in a
     * single pass — the canonical "(re)render my content" primitive.
     *
     * Call {@link setContent} first, then `render()`. It tokenizes the content
     * into child nodes and runs the full per-child pipeline
     * (`init → load → transform → compile → mount`) in document order — the
     * exact sequence the engine's build + execute applies to a fresh subtree,
     * so a runtime-injected component is rendered identically to a bootstrap
     * one.
     *
     * `load()` (async data) and `mount()` (time-sliced mount) may be
     * asynchronous, so `render()` awaits them and resolves only once the whole
     * subtree has finished mounting.
     *
     * [!] IDEMPOTENT: `render()` first {@link clear}s any previously built
     * children (unmount + deregister) so calling it again rebuilds the subtree
     * from scratch instead of appending a duplicate. This is essential because
     * `@Are.onAfterMount` — where imperative "dynamic component" hosts call
     * `setContent()` + `render()` — re-runs on EVERY (re)mount, including when
     * an `AreRoot` outlet restores a stashed subtree from `AreRootCache` on a
     * tab switch. Without the clear, `tokenize()` (which appends child nodes)
     * would accumulate a duplicate subtree per re-mount and re-init the stale,
     * already-live children — cascading scope-inheritance errors / a UI freeze.
     * A first render has no children, so the clear is a cheap no-op there.
     *
     * [!] This is the single source of truth for runtime subtree construction.
     * Consumers (e.g. routing outlets) MUST use it instead of re-implementing
     * the loop, so the proven order lives in one place.
     */
    async render(): Promise<void> {
        await this.clear();

        this.tokenize();

        for (const child of this.children) {
            child.init();

            const loaded = child.load();
            if (loaded instanceof Promise) await loaded;

            child.transform();
            child.compile();

            const mounted = child.mount();
            if (mounted instanceof Promise) await mounted;
        }
    }

    /**
     * Unmounts and detaches every child subtree of this node — the safe
     * counterpart to {@link render}, used when swapping out content.
     *
     * Each child is unmounted (removed from the rendered output) and then
     * deregistered from this node's scope. The children list is snapshotted up
     * front because `removeChild` mutates it.
     *
     * [!] A child can still appear in this node's children list while its OWN
     * sub-scope has already been deallocated (e.g. by `cloneWithScope` during
     * mount). `unmount()` asserts scope inheritance and would throw
     * "not bound to any context scope" for such a node, so it is guarded by a
     * cheap `A_Context.has` check — an unbound node has nothing to unmount and
     * is simply deregistered.
     *
     * It intentionally does NOT call `child.destroy()`: `destroy()` recurses
     * into the subtree where an internal node may likewise have no scope,
     * reintroducing the same throw. This is the hazard `AreRoot.stashChild`
     * sidesteps (its post-removeChild `void child.destroy()` rejection is
     * silently swallowed). Unmounting + deregistering is the empirically-safe
     * teardown: the detached subtree is unreferenced and collected.
     */
    async clear(): Promise<void> {
        for (const child of [...this.children]) {
            if (A_Context.has(child)) {
                child.unmount();
            }

            this.removeChild(child);
        }
    }

    clone<T extends AreNode = AreNode>(this: T): T {
        const newNode = new (this.constructor as new (props: AreNodeNewProps) => T)({
            opening: this._opening,
            closing: this._closing,
            position: this._position,
            payload: this._payload || {},
            content: this._content,
            raw: this._markup,
        });

        /**
         * Clone all content
         */
        for (const child of this.children) {
            newNode.addChild(child.clone());
        }
        /**
         * Clone all attributes
         */
        for (const attribute of this.attributes) {
            newNode.scope.register(attribute.clone());
        }

        return newNode as T;
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
            await this.call(AreNodeFeatures.onEmit, eventScope)

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
     * Serializes the node into its structural (runtime-free) form, recursively including attributes, child nodes and — for nodes that own a scene (root nodes) — the compiled instruction plan.
     *
     * Kept (static / structural): `aseid`, the class `type` discriminator, `entity`, `opening`, `closing`, `position`, `content`, `markup`, `payload`, nested `attributes`, `children` and the owned `scene` plan.
     * Dropped (runtime-only): the live scope, resolved component, the node `status` and any evaluated attribute values — these must be re-established when the tree is reconstructed and re-interpreted.
     *
     * [!] Note, the scene is embedded only by the node that owns it (its `id` matches the scene `id`), so the plan is not duplicated across the inheriting child nodes.
     *
     * @returns the serialized, runtime-free representation of the node and its subtree.
     */
    toJSON(): AreNode_Serialized {
        const scene = this._scope
            ? this._scope.resolve<AreScene>(AreScene)
            : undefined;

        return {
            aseid: this.aseid.toString(),
            type: A_CommonHelper.getComponentName(this.constructor),
            entity: this.aseid.entity,
            opening: this._opening,
            closing: this._closing,
            position: this._position,
            content: this._content,
            markup: this._markup,
            payload: this._payload,
            attributes: this._scope
                ? this.attributes.map(attribute => attribute.toJSON())
                : [],
            children: this._scope
                ? this.children.map(child => child.toJSON())
                : [],
            scene: scene && scene.id === this.id
                ? scene.toJSON()
                : undefined,
        };
    }

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