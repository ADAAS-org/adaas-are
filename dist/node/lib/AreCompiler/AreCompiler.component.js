'use strict';

var aConcept = require('@adaas/a-concept');
var aFrame = require('@adaas/a-frame');
var aLogger = require('@adaas/a-utils/a-logger');
var AreScene_context = require('@adaas/are/scene/AreScene.context');
var AreNode_entity = require('@adaas/are/node/AreNode.entity');
var AreNode_constants = require('@adaas/are/node/AreNode.constants');
var AreAttribute_constants = require('@adaas/are/attribute/AreAttribute.constants');
var AreDeclaration_instruction = require('@adaas/are/instruction/types/AreDeclaration.instruction');

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
exports.AreCompiler = class AreCompiler extends aConcept.A_Component {
  static Compile(param1) {
    return (target, propertyKey, descriptor) => {
      return aConcept.A_Feature.Extend({
        name: param1.prototype instanceof AreNode_entity.AreNode ? AreNode_constants.AreNodeFeatures.onCompile : AreAttribute_constants.AreAttributeFeatures.Compile,
        scope: [param1],
        override: ["compile"]
      })(target, propertyKey, descriptor);
    };
  }
  compile(node, scene, logger, ...args) {
    try {
      logger?.debug("cyan", `AreCompiler: compile node <${node.aseid.toString()}>`);
      const hostInstruction = new AreDeclaration_instruction.AreDeclaration();
      scene.setHost(hostInstruction);
      scene.plan(hostInstruction);
      for (let i = 0; i < node.attributes.length; i++) {
        const attribute = node.attributes[i];
        attribute.compile();
      }
      if (node.children && node.children.length > 0) {
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];
          child.compile();
        }
      }
    } catch (error) {
      logger?.error(error);
    }
  }
};
__decorateClass([
  aConcept.A_Feature.Extend({
    name: AreNode_constants.AreNodeFeatures.onCompile,
    scope: [AreNode_entity.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(AreScene_context.AreScene)),
  __decorateParam(2, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreCompiler.prototype, "compile", 1);
exports.AreCompiler = __decorateClass([
  aFrame.A_Frame.Component({
    namespace: "A-ARE",
    name: "AreCompiler",
    description: "Walks the transformed AreNode tree and emits a Scene. Translates each node, binding, directive and interpolation into a typed instruction. Knows nothing about the DOM or any rendering target \u2014 its only concern is producing a complete and ordered set of instructions that fully describes how the tree should be rendered."
  })
], exports.AreCompiler);
//# sourceMappingURL=AreCompiler.component.js.map
//# sourceMappingURL=AreCompiler.component.js.map