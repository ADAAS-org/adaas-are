import { __decorateClass, __decorateParam } from '../../chunk-EQQGB2QZ.mjs';
import { A_Feature, A_Inject, A_Scope, A_Caller, A_Meta, A_Component, A_Context } from '@adaas/a-concept';
import { A_SignalBusFeatures, A_SignalVector, A_SignalState } from '@adaas/a-utils/a-signal';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { AreContext } from '@adaas/are/component/Are.context';
import { AreFeatures, AreSignalFeatureKey } from '@adaas/are/component/Are.constants';
import { AreNode } from '@adaas/are/node/AreNode.entity';
import { AreNodeFeatures } from '@adaas/are/node/AreNode.constants';
import { AreEvent } from '@adaas/are/event/AreEvent.context';
import { A_Frame } from '@adaas/a-frame/core';
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
        for (const signal of vector) {
          if (!signal) continue;
          const ctor = signal.constructor;
          const typedFeatureName = AreSignalFeatureKey(ctor);
          const typedScope = new A_Scope({
            fragments: [new AreEvent(typedFeatureName, {
              vector,
              signal
            })]
          }).import(scope, root.scope);
          await root.emit(typedScope);
          typedScope.destroy();
        }
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
  // -----------------------------------------------------------------------------------------
  // ----------------------------Are-Component Notify Section---------------------------------
  // -----------------------------------------------------------------------------------------
  /**
   * Notifies all mounted nodes whose component is exactly the specified constructor
   * (strict match — subclasses are excluded).
   *
   * @param ctor  - The Are component constructor to target
   * @param event - The event to emit to all matching nodes
   */
  async notifyExact(ctor, event) {
    const context = A_Context.scope(this).resolve(AreContext);
    if (!context) return;
    for (const root of context.roots) {
      await this.traverseAndNotify(root, event, (component) => component.constructor === ctor);
    }
  }
  /**
   * Notifies all mounted nodes whose component is an instance of the specified
   * constructor, including nodes backed by subclasses (polymorphic match).
   *
   * @param ctor  - The Are component constructor to target
   * @param event - The event to emit to all matching nodes
   */
  async notifyAll(ctor, event) {
    const context = A_Context.scope(this).resolve(AreContext);
    if (!context) return;
    for (const root of context.roots) {
      await this.traverseAndNotify(root, event, (component) => component instanceof ctor);
    }
  }
  /**
   * Notifies all mounted nodes whose component matches the specified constructor.
   * 
   * By default uses polymorphic matching (includes subclasses). Pass `{ exact: true }`
   * to restrict to the exact constructor only.
   *
   * @param ctor    - The Are component constructor to target
   * @param event   - The event to emit to all matching nodes
   * @param options - `exact`: when true, subclasses are excluded (defaults to false)
   */
  async notify(ctor, event, options) {
    if (options?.exact) {
      return this.notifyExact(ctor, event);
    }
    return this.notifyAll(ctor, event);
  }
  async traverseAndNotify(node, event, match) {
    if (node.component && match(node.component)) {
      await node.emit(event);
    }
    for (const child of node.children) {
      await this.traverseAndNotify(child, event, match);
    }
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
  A_Frame.Define({
    namespace: "A-ARE",
    description: "AreSignals is the central signal bus component within the ARE framework. It listens for incoming signal vectors and dispatches them to all subscribed root nodes, enabling reactive, event-driven rendering and lifecycle management across the component tree."
  }),
  A_Meta.Define(AreSignalsMeta)
], AreSignals);

export { AreSignals };
//# sourceMappingURL=AreSignals.component.mjs.map
//# sourceMappingURL=AreSignals.component.mjs.map