'use strict';

var aConcept = require('@adaas/a-concept');
var aFrame = require('@adaas/a-frame');
var AreScene_context = require('@adaas/are/scene/AreScene.context');
var AreAttribute_entity = require('@adaas/are/attribute/AreAttribute.entity');
var AreNode_constants = require('./AreNode.constants');
var Are_context = require('@adaas/are/component/Are.context');

var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(result)) || result;
  return result;
};
exports.AreNode = class AreNode extends aConcept.A_Entity {
  /**
   * Actual node identifier. 
   */
  get id() {
    return this.aseid.id;
  }
  /**
   * Actual node type. 
   * By default it's a tag name
   */
  get type() {
    return this.aseid.entity;
  }
  /**
   * Content string defined for the node — the inner content between delimiters.
   * Example: `{{name}}`
   */
  get content() {
    return this._content;
  }
  /**
   * Markup string defined for the node
   * Example: `<custom-component :prop="value"> <div>Inner Content</div> </custom-component>`
   */
  get markup() {
    return this._markup;
  }
  /**
   * The scope associated with this node
   * uses to store all nested fragments and entities like other AreNodes and Scene
   */
  get scope() {
    if (!this._scope) {
      this._scope = aConcept.A_Context.allocate(this, new aConcept.A_Scope({ name: `${this.aseid.id}-scope` }));
    }
    return this._scope;
  }
  /**
   * The attributes defined for the node, which can include static attributes, binding attributes, directive attributes, and event attributes. These attributes are extracted during tokenization and processed during the compilation phase to generate the corresponding SceneInstructions for rendering and updating the node in the scene.
   */
  get attributes() {
    return this.scope.resolveFlatAll(AreAttribute_entity.AreAttribute);
  }
  /**
   * A custom component associated with this node, which can be used to provide custom logic and behavior for the node. This component is typically defined in the context and can be resolved based on the node's type or other identifying information. The component can include its own content, markup, styles, and features that are specific to the functionality it provides.
   * 
   * Example: If the node type is "custom-component", the corresponding component would be resolved from the context and can be used to provide custom rendering and behavior for nodes of that type.
   * 
   * [!] Note: The component is optional and may not be defined for all nodes. If no component is associated with the node, it will be treated as a standard HTML element or a basic node without custom logic.
   */
  get component() {
    return this.scope.resolve(aConcept.A_FormatterHelper.toPascalCase(this.aseid.entity));
  }
  /**
   * The parent node of this node, which is the node that registered the current node in its scope. This is typically the node that is responsible for rendering the current node and managing its lifecycle within the scene. The parent node can be used to access shared context, propagate events, and manage interactions between nodes in a hierarchical structure.
   * 
   * Example: For a node defined as `<div><span>Child Node</span></div>`, the parent node of the `<span>` element would be the `<div>` element, which is responsible for rendering the `<span>` and managing its lifecycle within the scene.
   */
  get parent() {
    const parentIssuer = this.scope.parent?.issuer();
    if (!parentIssuer || !(parentIssuer instanceof exports.AreNode)) return void 0;
    return parentIssuer;
  }
  /**
   * The child nodes of this node, which are typically defined in the markup and registered in the scope as child entities. These child nodes can represent nested elements or components within the node and can have their own content, markup, styles, and features. The child nodes are managed within the scope of the parent node and can be accessed and manipulated as needed for rendering, updating, and lifecycle management.
   * 
   * Example: For a node defined as `<div><span>Child Node</span></div>`, the child node would be the `<span>` element, which is registered as a child entity in the scope of the parent `<div>` node.
   */
  get children() {
    return this.scope.resolveFlatAll(exports.AreNode) || [];
  }
  /**
   * It returns the scene where the node exists, so it should be the scene of the rootNode, 
   * primary parent of this node.
   */
  get scene() {
    if (!this._scene)
      this._scene = this.scope.resolve(AreScene_context.AreScene);
    return this._scene;
  }
  fromNew(newEntity) {
    this.aseid = this.generateASEID({
      id: newEntity.payload?.id,
      entity: newEntity.payload?.entity || "node",
      scope: newEntity.payload?.scope
    });
    this.status = AreNode_constants.AreNodeStatuses.Pending;
    this._content = newEntity.content || "";
    this._markup = newEntity.raw || "";
    this._opening = newEntity.opening || "";
    this._closing = newEntity.closing || "";
    this._position = newEntity.position || 0;
    this._payload = newEntity.payload;
  }
  fromASEID(aseid) {
    super.fromASEID(aseid);
    this._content = "";
    this._markup = "";
    this.status = AreNode_constants.AreNodeStatuses.Pending;
  }
  /**
   * Sets the content string for the node — the inner text/markup between the node's
   * opening and closing delimiters. Content is processed by the rendering engine to
   * generate the corresponding SceneInstructions for rendering the node.
   * 
   * @param content 
   */
  setContent(content) {
    this._content = content;
  }
  /**
   * Sets the markup string for the node, which is the full raw matched string including delimiters. The markup can include HTML-like syntax, custom components, directives, and other features that are processed by the rendering engine to generate the corresponding SceneInstructions for rendering the node.
   * 
   * @param markup 
   */
  setMarkup(markup) {
    this._markup = markup;
  }
  /**
   * Adds a child node to the current node's scope and ensures the child inherits from this node's scope.
   * 
   * @param child - The node to add as a child
   */
  addChild(child) {
    this.scope.register(child);
    if (!child.scope.isInheritedFrom(this.scope))
      child.scope.inherit(this.scope);
  }
  /**
   * Removes a child node from the current node's scope. This is typically used when a child node is no longer needed or should be detached from the parent node. The method ensures that the child node is properly deregistered from the scope and any associated resources are cleaned up as necessary.
   * 
   * @param node  - The child node to be removed from the current node's scope
   */
  removeChild(node) {
    this.scope.deregister(node);
  }
  // ============================================================================================
  //                                Node Lifecycle Methods
  // ============================================================================================
  /**
   * Executes initialization logic for the node, which typically involves setting up the node's scope, registering any necessary entities, and preparing the node for rendering and interaction within the scene. This method is called during the initial phase of the node's lifecycle and is responsible for ensuring that the node is properly initialized before it is compiled and rendered in the scene.
   */
  init() {
    this.call(AreNode_constants.AreNodeFeatures.onBeforeInit, this.scope);
    this.call(AreNode_constants.AreNodeFeatures.onInit, this.scope);
    this.call(AreNode_constants.AreNodeFeatures.onAfterInit, this.scope);
  }
  /**
   * Loads the node, which typically involves executing any necessary setup or initialization logic to prepare the node for rendering and interaction within the scene. This may include processing the node's content, markup, styles, and features to generate the corresponding SceneInstructions, as well as setting up any event listeners or reactive properties as needed.
   */
  async load() {
    this.checkScopeInheritance();
    try {
      const context = this.scope.resolve(Are_context.AreContext);
      context?.startPerformance("Node Load");
      const res = super.load(this.scope);
      context?.endPerformance("Node Load");
      return res;
    } catch (error) {
      throw error;
    }
  }
  /**
   * Tokenizes the node content, which typically involves parsing the raw content string to identify the structure, child nodes, attributes, directives, and other features. This process is essential for breaking down the content into its constituent parts and preparing it for further processing during the compilation phase. The tokenization process can involve creating child nodes, extracting attributes and their values, and identifying any directives or bindings that need to be processed during rendering.
   */
  tokenize() {
    this.checkScopeInheritance();
    try {
      const context = this.scope.resolve(Are_context.AreContext);
      context?.startPerformance("Node Tokenize");
      this.call(AreNode_constants.AreNodeFeatures.onTokenize, this.scope);
      context?.endPerformance("Node Tokenize");
    } catch (error) {
      throw error;
    }
  }
  /**
   * Transforms the node, which typically involves executing any necessary logic to reshape the node's structure or content before it is compiled and rendered in the scene. This may include applying any transformations defined by directives, processing any dynamic content or expressions, and performing any other necessary tasks to ensure that the node is properly prepared for compilation and rendering based on its content, markup, styles, and features.
   */
  transform() {
    this.checkScopeInheritance();
    try {
      const context = this.scope.resolve(Are_context.AreContext);
      context?.startPerformance("Node Transform");
      this.call(AreNode_constants.AreNodeFeatures.onTransform, this.scope);
      context?.endPerformance("Node Transform");
    } catch (error) {
      throw error;
    }
  }
  /**
   * Compile the node. This method should transform the node's content, markup, and styles into a set of SceneInstructions that can be executed to render the node in the scene. The compile method is responsible for processing the node's features, attributes, directives, and other properties to generate the necessary instructions for rendering and updating the node in response to changes in state or context.
   * 
   * [!] Note: The compile method should ensure that the node's scope is properly inherited from the context scope before processing, and it should handle any errors that may occur during compilation to ensure that the node can be rendered correctly in the scene.
   */
  compile() {
    this.checkScopeInheritance();
    try {
      const context = this.scope.resolve(Are_context.AreContext);
      context?.startPerformance("Node Compile");
      this.call(AreNode_constants.AreNodeFeatures.onCompile, this.scope);
      context?.endPerformance("Node Compile");
    } catch (error) {
      throw error;
    }
  }
  /**
   * Mounts the node, which typically involves executing any necessary logic to render the node in the scene and to set up any interactions or behaviors associated with the node. This may include applying the generated SceneInstructions from the compile phase, attaching event listeners, and performing any other necessary tasks to ensure that the node is properly rendered and functional within the scene.
   * 
   * [!] Note: The mount method should ensure that the node's scope is properly inherited from the context scope before performing any mounting logic, and it should handle any errors that may occur during mounting to ensure that the node can be rendered correctly in the scene.
   */
  mount() {
    this.checkScopeInheritance();
    try {
      const context = this.scope.resolve(Are_context.AreContext);
      context?.startPerformance("Node Mount");
      this.call(AreNode_constants.AreNodeFeatures.onBeforeMount, this.scope);
      this.call(AreNode_constants.AreNodeFeatures.onMount, this.scope);
      this.call(AreNode_constants.AreNodeFeatures.onAfterMount, this.scope);
      context?.endPerformance("Node Mount");
    } catch (error) {
      throw error;
    }
  }
  /**
   * Interprets the node, which typically involves executing any necessary logic to process the node's features, attributes, directives, and other properties to generate the corresponding SceneInstructions for rendering and updating the node in response to changes in state or context. This method is responsible for ensuring that the node is properly interpreted based on its content, markup, styles, and features to enable dynamic behavior and responsiveness within the scene.
   * 
   * [!] Note: The interpret method should NOT go though own child, since it may be used by both mount and update operations!
   */
  interpret() {
    this.checkScopeInheritance();
    try {
      const context = this.scope.resolve(Are_context.AreContext);
      context?.startPerformance("Node Interpret");
      this.call(AreNode_constants.AreNodeFeatures.onInterpret, this.scope);
      context?.endPerformance("Node Interpret");
    } catch (error) {
      throw error;
    }
  }
  /**
   * Updates the node, which typically involves executing any necessary logic to update the node's rendering and behavior in response to changes in state, context, or other factors. This may include reapplying SceneInstructions, updating event listeners, and performing any other necessary tasks to ensure that the node remains functional and correctly rendered within the scene as changes occur.
   * 
   * [!] Note: The update method should ensure that the node's scope is properly inherited from the context scope before performing any update logic, and it should handle any errors that may occur during updating to ensure that the node can be updated correctly in the scene.
   */
  update() {
    this.checkScopeInheritance();
    try {
      const context = this.scope.resolve(Are_context.AreContext);
      context?.startPerformance("Node Update");
      this.call(AreNode_constants.AreNodeFeatures.onBeforeUpdate, this.scope);
      this.call(AreNode_constants.AreNodeFeatures.onUpdate, this.scope);
      this.call(AreNode_constants.AreNodeFeatures.onAfterUpdate, this.scope);
      context?.endPerformance("Node Update");
    } catch (error) {
      throw error;
    }
  }
  /**
   * Unmounts the node, which typically involves executing any necessary logic to remove the node from the scene and to clean up any resources associated with the node. This may include reverting any applied SceneInstructions, detaching event listeners, and performing any other necessary tasks to ensure that the node is properly removed from the scene and that resources are released as needed.
   * 
   * [!] Note: The unmount method should ensure that the node's scope is properly inherited from the context scope before performing any unmounting logic, and it should handle any errors that may occur during unmounting to ensure that the node can be removed correctly from the scene.
   */
  unmount() {
    this.checkScopeInheritance();
    try {
      const context = this.scope.resolve(Are_context.AreContext);
      context?.startPerformance("Node Unmount");
      this.call(AreNode_constants.AreNodeFeatures.onBeforeUnmount, this.scope);
      this.call(AreNode_constants.AreNodeFeatures.onUnmount, this.scope);
      this.call(AreNode_constants.AreNodeFeatures.onAfterUnmount, this.scope);
      context?.endPerformance("Node Unmount");
    } catch (error) {
      throw error;
    }
  }
  cloneWithScope() {
    const currentScope = this.scope;
    aConcept.A_Context.deallocate(currentScope);
    const newNode = new this.constructor({
      opening: this._opening,
      closing: this._closing,
      position: this._position,
      payload: this._payload || {},
      content: this._content,
      raw: this._markup
    });
    if (newNode._scope)
      aConcept.A_Context.deallocate(newNode._scope);
    newNode._scope = currentScope;
    aConcept.A_Context.allocate(newNode, currentScope);
    this._scope = aConcept.A_Context.allocate(this);
    return newNode;
  }
  reset() {
    for (const child of this.children) {
      this.scope.deregister(child);
    }
    for (const attribute of this.attributes) {
      this.scope.deregister(attribute);
    }
  }
  clone() {
    const newNode = new this.constructor({
      opening: this._opening,
      closing: this._closing,
      position: this._position,
      payload: this._payload || {},
      content: this._content,
      raw: this._markup
    });
    for (const child of this.children) {
      newNode.addChild(child.clone());
    }
    for (const attribute of this.attributes) {
      newNode.scope.register(attribute.clone());
    }
    return newNode;
  }
  async emit(eventOrScope) {
    this.checkScopeInheritance();
    const eventScope = aConcept.A_TypeGuards.isScopeInstance(eventOrScope) ? eventOrScope.inherit(this.scope) : new aConcept.A_Scope({
      name: `${eventOrScope.name}-scope`,
      fragments: [eventOrScope]
    }).inherit(this.scope);
    try {
      await this.call(AreNode_constants.AreNodeFeatures.onEmit, eventScope);
      eventScope.destroy();
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
  async destroy() {
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
  checkScopeInheritance() {
    let attachedScope;
    try {
      attachedScope = aConcept.A_Context.scope(this);
    } catch (error) {
      throw new aConcept.A_Error({
        title: `A_UI_Node Scope Inheritance Error`,
        description: `The A_UI_Node entity with ASEID '${this.aseid.toString()}' is not bound to any context scope. Please ensure that the entity is created within a valid context.`,
        originalError: error
      });
    }
  }
};
exports.AreNode = __decorateClass([
  aFrame.A_Frame.Entity({
    namespace: "A-ARE",
    name: "AreNode",
    description: "An AreNode entity represents a node within the A-Concept Rendering Engine (ARE) framework. It encapsulates content, markup, and styles, and manages its own scope for nested fragments and entities. AreNodes are responsible for handling events, compiling, rendering, updating, and lifecycle management within the ARE context."
  })
], exports.AreNode);
//# sourceMappingURL=AreNode.entity.js.map
//# sourceMappingURL=AreNode.entity.js.map