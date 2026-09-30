import { __decorateClass, __decorateParam } from '../../chunk-EQQGB2QZ.mjs';
import { A_Feature, A_TYPES__EntityFeatures, A_Inject, A_Caller, A_Scope, A_Component } from '@adaas/a-concept';
import { A_Frame } from '@adaas/a-frame/core';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { AreNode } from '@adaas/are/node/AreNode.entity';
import { AreFeatures } from '@adaas/are/component/Are.constants';
import { AreContext } from '@adaas/are/component/Are.context';
import { AreComponentResolver } from '@adaas/are/resolver/AreComponentResolver.fragment';
import { AreStore } from '@adaas/are/store/AreStore.context';

let AreLoader = class extends A_Component {
  async load(node, scope, feature, logger, context, ...args) {
    logger?.debug("red", `Loading node <${node.aseid.toString()}> with content:`, scope);
    if (!node.component && node.aseid.entity.includes("-")) {
      const resolver = scope.resolve(AreComponentResolver);
      if (resolver) {
        const Component = await resolver.resolve(node.aseid.entity);
        if (Component) {
          node.registerComponent(Component);
          this.initResolvedComponent(node, scope, feature);
        }
      }
    }
    if (node.component) {
      context?.startPerformance("Total AreFeatures.onData");
      await feature.chain(node.component, AreFeatures.onData, scope);
      context?.endPerformance("Total AreFeatures.onData");
      context?.startPerformance("Total AreFeatures.onLoad");
      await feature.chain(node.component, AreFeatures.onStyles, scope);
      context?.endPerformance("Total AreFeatures.onLoad");
      context?.startPerformance("Total AreFeatures.onTemplate");
      await feature.chain(node.component, AreFeatures.onTemplate, scope);
      context?.endPerformance("Total AreFeatures.onTemplate");
    }
    context?.startPerformance("Tokenization");
    node.tokenize();
    context?.endPerformance("Tokenization");
    await Promise.all(node.children.map((childNode) => childNode.load()));
  }
  /**
   * Catch a lazily-resolved node up on the component-specific part of `init`.
   *
   * `AreLifecycle.init` ran BEFORE the resolver supplied the class, so it saw
   * no component: the node got no store of its own and its component init
   * hooks never fired. Without its own store the node's reads/writes (data,
   * props injected by the compiler) land in the PARENT's store — so props
   * bound on a lazy tag were lost and its data leaked into the host.
   */
  initResolvedComponent(node, scope, feature) {
    const component = node.component;
    if (!component || scope.resolveFlat(AreStore)) return;
    feature.chain(component, AreFeatures.onBeforeInit, scope);
    const store = new AreStore(node.aseid);
    scope.register(store);
    store.loadExtensions(component);
    feature.chain(component, AreFeatures.onAfterInit, scope);
  }
};
__decorateClass([
  A_Feature.Extend({
    name: A_TYPES__EntityFeatures.LOAD,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(A_Feature)),
  __decorateParam(3, A_Inject(A_Logger)),
  __decorateParam(4, A_Inject(AreContext))
], AreLoader.prototype, "load", 1);
AreLoader = __decorateClass([
  A_Frame.Define({
    namespace: "A-ARE",
    description: "Entry point of the pipeline. Accepts a raw template string and orchestrates the initial processing by delegating to Syntax. Returns a structured AreNode tree ready for transformation. Knows nothing about the template content or grammar rules."
  })
], AreLoader);

export { AreLoader };
//# sourceMappingURL=AreLoader.component.mjs.map
//# sourceMappingURL=AreLoader.component.mjs.map