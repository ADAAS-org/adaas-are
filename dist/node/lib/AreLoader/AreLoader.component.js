'use strict';

var aConcept = require('@adaas/a-concept');
var aFrame = require('@adaas/a-frame');
var aLogger = require('@adaas/a-utils/a-logger');
var AreNode_entity = require('@adaas/are/node/AreNode.entity');
var Are_constants = require('@adaas/are/component/Are.constants');
var Are_context = require('@adaas/are/component/Are.context');

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
exports.AreLoader = class AreLoader extends aConcept.A_Component {
  async load(node, scope, feature, logger, context, ...args) {
    logger?.debug("red", `Loading node <${node.aseid.toString()}> with content:`, scope);
    if (node.component) {
      context?.startPerformance("Total AreFeatures.onData");
      await feature.chain(node.component, Are_constants.AreFeatures.onData, scope);
      context?.endPerformance("Total AreFeatures.onData");
      context?.startPerformance("Total AreFeatures.onLoad");
      await feature.chain(node.component, Are_constants.AreFeatures.onStyles, scope);
      context?.endPerformance("Total AreFeatures.onLoad");
      context?.startPerformance("Total AreFeatures.onTemplate");
      await feature.chain(node.component, Are_constants.AreFeatures.onTemplate, scope);
      context?.endPerformance("Total AreFeatures.onTemplate");
    }
    context?.startPerformance("Tokenization");
    node.tokenize();
    context?.endPerformance("Tokenization");
    for (let i = 0; i < node.children.length; i++) {
      const childNode = node.children[i];
      const res = childNode.load();
      if (res instanceof Promise) {
        await res;
      }
    }
  }
};
__decorateClass([
  aConcept.A_Feature.Extend({
    name: aConcept.A_TYPES__EntityFeatures.LOAD,
    scope: [AreNode_entity.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(aConcept.A_Feature)),
  __decorateParam(3, aConcept.A_Inject(aLogger.A_Logger)),
  __decorateParam(4, aConcept.A_Inject(Are_context.AreContext))
], exports.AreLoader.prototype, "load", 1);
exports.AreLoader = __decorateClass([
  aFrame.A_Frame.Component({
    description: "Entry point of the pipeline. Accepts a raw template string and orchestrates the initial processing by delegating to Syntax. Returns a structured AreNode tree ready for transformation. Knows nothing about the template content or grammar rules."
  })
], exports.AreLoader);
//# sourceMappingURL=AreLoader.component.js.map
//# sourceMappingURL=AreLoader.component.js.map