import { __decorateClass, __decorateParam } from '../../chunk-EQQGB2QZ.mjs';
import { A_Feature, A_TYPES__EntityFeatures, A_Inject, A_Caller, A_Scope, A_Component } from '@adaas/a-concept';
import { A_Frame } from '@adaas/a-frame';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { AreNode } from '@adaas/are/node/AreNode.entity';
import { AreFeatures } from '@adaas/are/component/Are.constants';
import { AreContext } from '@adaas/are/component/Are.context';

let AreLoader = class extends A_Component {
  async load(node, scope, feature, logger, context, ...args) {
    logger?.debug("red", `Loading node <${node.aseid.toString()}> with content:`, scope);
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
  A_Frame.Component({
    description: "Entry point of the pipeline. Accepts a raw template string and orchestrates the initial processing by delegating to Syntax. Returns a structured AreNode tree ready for transformation. Knows nothing about the template content or grammar rules."
  })
], AreLoader);

export { AreLoader };
//# sourceMappingURL=AreLoader.component.mjs.map
//# sourceMappingURL=AreLoader.component.mjs.map