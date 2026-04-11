'use strict';

var aConcept = require('@adaas/a-concept');
var aSignal = require('@adaas/a-utils/a-signal');
var aLogger = require('@adaas/a-utils/a-logger');
var Are_constants = require('@adaas/are/component/Are.constants');
var AreNode_entity = require('@adaas/are/node/AreNode.entity');
var AreNode_constants = require('@adaas/are/node/AreNode.constants');
var AreEvent_context = require('@adaas/are/event/AreEvent.context');
var aFrame = require('@adaas/a-frame');
var AreSignals_meta = require('./AreSignals.meta');
var AreSignals_context = require('./AreSignals.context');

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
exports.AreSignals = class AreSignals extends aConcept.A_Component {
  async handleSignalVector(vector, context, state, scope, logger) {
    logger?.debug(`Handling Signal Vector with ${context.subscribers.size} root nodes.`, vector);
    try {
      for (const root of context.subscribers) {
        const callScope = new aConcept.A_Scope({
          fragments: [new AreEvent_context.AreEvent(
            Are_constants.AreFeatures.onSignal,
            {
              vector
            }
          )]
        }).import(scope, root.scope);
        logger?.debug("Emitting signal for root node:", vector);
        await root.emit(callScope);
        callScope.destroy();
      }
    } catch (error) {
      logger?.error(error);
    }
  }
  async propagateEvent(node, scope, event, feature, logger, ...args) {
    let currentNode = node;
    let target = node;
    while (currentNode && currentNode.parent) {
      if (currentNode.component) {
        target = currentNode;
        break;
      }
      currentNode = currentNode.parent;
    }
    if (target.component)
      await feature.chain(target.component, event.name, scope);
  }
};
__decorateClass([
  aConcept.A_Feature.Extend({
    name: aSignal.A_SignalBusFeatures.onNext
  }),
  __decorateParam(0, aConcept.A_Inject(aSignal.A_SignalVector)),
  __decorateParam(1, aConcept.A_Inject(AreSignals_context.AreSignalsContext)),
  __decorateParam(2, aConcept.A_Inject(aSignal.A_SignalState)),
  __decorateParam(3, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(4, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreSignals.prototype, "handleSignalVector", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: AreNode_constants.AreNodeFeatures.onEmit,
    scope: [AreNode_entity.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(AreEvent_context.AreEvent)),
  __decorateParam(3, aConcept.A_Inject(aConcept.A_Feature)),
  __decorateParam(4, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreSignals.prototype, "propagateEvent", 1);
exports.AreSignals = __decorateClass([
  aFrame.A_Frame.Component({
    namespace: "A-ARE",
    name: "AreSignals",
    description: "AreSignals is the central signal bus component within the ARE framework. It listens for incoming signal vectors and dispatches them to all subscribed root nodes, enabling reactive, event-driven rendering and lifecycle management across the component tree."
  }),
  aConcept.A_Meta.Define(AreSignals_meta.AreSignalsMeta)
], exports.AreSignals);
//# sourceMappingURL=AreSignals.component.js.map
//# sourceMappingURL=AreSignals.component.js.map