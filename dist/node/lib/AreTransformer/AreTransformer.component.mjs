import { __decorateClass, __decorateParam } from '../../chunk-EQQGB2QZ.mjs';
import { A_Feature, A_Inject, A_Caller, A_Scope, A_Component } from '@adaas/a-concept';
import { A_Frame } from '@adaas/a-frame';
import { AreNode } from '@adaas/are/node/AreNode.entity';
import { AreNodeFeatures } from '@adaas/are/node/AreNode.constants';
import { AreScene } from '@adaas/are/scene/AreScene.context';

let AreTransformer = class extends A_Component {
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
  A_Feature.Extend({
    name: AreNodeFeatures.onTransform,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreScene))
], AreTransformer.prototype, "transform", 1);
AreTransformer = __decorateClass([
  A_Frame.Component({
    description: "Reshapes the AreNode tree before compilation without changing its abstraction level. Responsible for structural rewrites that would complicate the compiler if left unhandled \u2014 converting $for nodes into AreGroupNode, extracting AreText and AreInterpolation from raw text, sorting directives via TopologicalSorter, and flagging static nodes."
  })
], AreTransformer);

export { AreTransformer };
//# sourceMappingURL=AreTransformer.component.mjs.map
//# sourceMappingURL=AreTransformer.component.mjs.map