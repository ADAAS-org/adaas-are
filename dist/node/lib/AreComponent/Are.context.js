'use strict';

var aConcept = require('@adaas/a-concept');
var aFrame = require('@adaas/a-frame');

var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(result)) || result;
  return result;
};
exports.AreContext = class AreContext extends aConcept.A_Fragment {
  constructor(source = "") {
    super({ name: "AreContext" });
    this._roots = [];
    this._source = source;
  }
  get scope() {
    return aConcept.A_Context.scope(this);
  }
  get roots() {
    return this._roots;
  }
  get source() {
    return this._source;
  }
  addRoot(node) {
    this._roots.push(node);
    this.scope.register(node);
  }
  removeRoot(node) {
    this._roots = this._roots.filter((r) => r.aseid.toString() !== node.aseid.toString());
  }
};
exports.AreContext = __decorateClass([
  aFrame.A_Frame.Fragment({
    namespace: "A-ARE",
    name: "AreContext",
    description: "Context fragment for the A-Concept Rendering Engine (ARE) framework, serving as a foundational component for managing shared state and configurations within the ARE environment. This Context uses to encapsulate global settings, resources, and utilities that can be accessed by various ARE components and entities during the rendering and interaction processes."
  })
], exports.AreContext);
//# sourceMappingURL=Are.context.js.map
//# sourceMappingURL=Are.context.js.map