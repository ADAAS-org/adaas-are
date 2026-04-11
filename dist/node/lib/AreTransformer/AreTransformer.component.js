'use strict';

var aConcept = require('@adaas/a-concept');
var aFrame = require('@adaas/a-frame');
var AreNode_entity = require('@adaas/are/node/AreNode.entity');
var AreNode_constants = require('@adaas/are/node/AreNode.constants');
var AreScene_context = require('@adaas/are/scene/AreScene.context');

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);
exports.AreTransformer = class AreTransformer extends aConcept.A_Component {
  transform(node, scope, scene, ...args) {
    const queue = [node];
    while (queue.length > 0) {
      const current = queue.shift();
      for (let i = 0; i < current.attributes.length; i++) {
        const attribute = current.attributes[i];
        attribute.transform();
      }
      queue.push(...current.children);
    }
  }
};
__decorateClass([
  aConcept.A_Feature.Extend({
    name: AreNode_constants.AreNodeFeatures.onTransform,
    scope: [AreNode_entity.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(AreScene_context.AreScene))
], exports.AreTransformer.prototype, "transform", 1);
exports.AreTransformer = __decorateClass([
  aFrame.A_Frame.Component({
    description: "Reshapes the AreNode tree before compilation without changing its abstraction level. Responsible for structural rewrites that would complicate the compiler if left unhandled \u2014 converting $for nodes into AreGroupNode, extracting AreText and AreInterpolation from raw text, sorting directives via TopologicalSorter, and flagging static nodes."
  })
], exports.AreTransformer);
//# sourceMappingURL=AreTransformer.component.js.map
//# sourceMappingURL=AreTransformer.component.js.map