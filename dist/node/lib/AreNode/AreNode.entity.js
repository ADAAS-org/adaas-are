'use strict';

var aConcept = require('@adaas/a-concept');
var AreNode_constants = require('./AreNode.constants');
var scene = require('@adaas/are/scene');
var aFrame = require('@adaas/a-frame');

var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(result)) || result;
  return result;
};
exports.AreNode = class AreNode extends aConcept.A_Entity {
  get id() {
    return this.aseid.id;
  }
  get scope() {
    if (!this._scope) {
      this._scope = new aConcept.A_Scope({
        name: `${this.aseid.id}`
      });
    }
    return this._scope;
  }
  get content() {
    return this.scope.resolveFlat(scene.AreScene);
  }
  get type() {
    return this.aseid.entity;
  }
  get template() {
    return this._template;
  }
  get markup() {
    return this._markup;
  }
  get styles() {
    return this._styles;
  }
  fromNew(newEntity) {
    this.aseid = this.generateASEID({
      id: newEntity.id,
      entity: newEntity.component,
      scope: newEntity.scope
    });
    this._template = newEntity.template || "";
    this._markup = newEntity.markup || "";
    this._styles = newEntity.styles || "";
  }
  fromASEID(aseid) {
    super.fromASEID(aseid);
    this._template = "";
    this._markup = "";
    this._styles = "";
  }
  setTemplate(template) {
    this._template = template;
  }
  setMarkup(markup) {
    this._markup = markup;
  }
  setStyles(styles) {
    this._styles = styles;
  }
  async emit(eventOrScope) {
    this.checkScopeInheritance();
    const eventScope = aConcept.A_TypeGuards.isScopeInstance(eventOrScope) ? eventOrScope.inherit(this.scope) : new aConcept.A_Scope({
      name: `${eventOrScope.name}-scope`,
      fragments: [eventOrScope]
    }).inherit(this.scope);
    try {
      await this.call(AreNode_constants.AreNodeFeatures.onEvent, eventScope);
      eventScope.destroy();
    } catch (error) {
      eventScope.destroy();
      throw error;
    }
  }
  compile() {
    this.checkScopeInheritance();
    try {
      this.call(AreNode_constants.AreNodeFeatures.onCompile, this.scope);
    } catch (error) {
      throw error;
    }
  }
  render() {
    this.checkScopeInheritance();
    try {
      return this.call(AreNode_constants.AreNodeFeatures.onRender, this.scope);
    } catch (error) {
      throw error;
    }
  }
  async update() {
    this.checkScopeInheritance();
    try {
      await this.call(AreNode_constants.AreNodeFeatures.onUpdate, this.scope);
    } catch (error) {
      throw error;
    }
  }
  async reset() {
    this.scope.destroy();
    this._template = "";
    this._styles = "";
    this._scope = new aConcept.A_Scope({
      name: `${this.aseid.id}`
    });
  }
  unmount() {
    this.checkScopeInheritance();
    try {
      this.call(AreNode_constants.AreNodeFeatures.onUnmount, this.scope);
    } catch (error) {
      throw error;
    }
  }
  async load() {
    return await super.load(this.scope);
  }
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
    description: "An AreNode entity represents a node within the A-Concept Rendering Engine (ARE) framework. It encapsulates template, markup, and styles, and manages its own scope for nested fragments and entities. AreNodes are responsible for handling events, compiling, rendering, updating, and lifecycle management within the ARE context."
  })
], exports.AreNode);
//# sourceMappingURL=AreNode.entity.js.map
//# sourceMappingURL=AreNode.entity.js.map