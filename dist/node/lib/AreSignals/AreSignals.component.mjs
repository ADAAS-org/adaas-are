import { __decorateClass, __decorateParam } from '../../chunk-EQQGB2QZ.mjs';
import { A_Feature, A_Inject, A_Scope, A_Caller, A_Meta, A_Component } from '@adaas/a-concept';
import { A_SignalBusFeatures, A_SignalVector, A_SignalState } from '@adaas/a-utils/a-signal';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { AreFeatures } from '@adaas/are/component/Are.constants';
import { AreNode } from '@adaas/are/node/AreNode.entity';
import { AreNodeFeatures } from '@adaas/are/node/AreNode.constants';
import { AreEvent } from '@adaas/are/event/AreEvent.context';
import { A_Frame } from '@adaas/a-frame';
import { AreSignalsMeta } from './AreSignals.meta';
import { AreSignalsContext } from './AreSignals.context';

let AreSignals = class extends A_Component {
  async handleSignalVector(vector, context, state, scope, logger) {
    logger?.debug(`Handling Signal Vector with ${context.subscribers.size} root nodes.`, vector);
    try {
      for (const root of context.subscribers) {
        const callScope = new A_Scope({
          fragments: [new AreEvent(
            AreFeatures.onSignal,
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
  A_Feature.Extend({
    name: A_SignalBusFeatures.onNext
  }),
  __decorateParam(0, A_Inject(A_SignalVector)),
  __decorateParam(1, A_Inject(AreSignalsContext)),
  __decorateParam(2, A_Inject(A_SignalState)),
  __decorateParam(3, A_Inject(A_Scope)),
  __decorateParam(4, A_Inject(A_Logger))
], AreSignals.prototype, "handleSignalVector", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onEmit,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreEvent)),
  __decorateParam(3, A_Inject(A_Feature)),
  __decorateParam(4, A_Inject(A_Logger))
], AreSignals.prototype, "propagateEvent", 1);
AreSignals = __decorateClass([
  A_Frame.Component({
    namespace: "A-ARE",
    name: "AreSignals",
    description: "AreSignals is the central signal bus component within the ARE framework. It listens for incoming signal vectors and dispatches them to all subscribed root nodes, enabling reactive, event-driven rendering and lifecycle management across the component tree."
  }),
  A_Meta.Define(AreSignalsMeta)
], AreSignals);

export { AreSignals };
//# sourceMappingURL=AreSignals.component.mjs.map
//# sourceMappingURL=AreSignals.component.mjs.map