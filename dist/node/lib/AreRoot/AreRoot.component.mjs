import { __decorateClass, __decorateParam } from '../../chunk-EQQGB2QZ.mjs';
import { A_Feature, A_Inject, A_Caller } from '@adaas/a-concept';
import { Are } from '@adaas/are/component';
import { AreStore } from '@adaas/are/store';
import { AreEvent } from '@adaas/are/event';
import { AreScene } from '@adaas/are/scene';
import { A_ServiceFeatures } from '@adaas/a-utils/a-service';
import { A_SignalVector } from '@adaas/a-utils/a-signal';

class AreRoot extends Are {
  async attachListeners() {
  }
  async template(node, store) {
  }
  async onSignal(node, store, scene, vector, event) {
    console.log("Vector  received :", vector);
    console.log("Node  received   :", node);
  }
}
__decorateClass([
  A_Feature.Extend({
    name: A_ServiceFeatures.onLoad
  })
], AreRoot.prototype, "attachListeners", 1);
__decorateClass([
  Are.Template,
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreStore))
], AreRoot.prototype, "template", 1);
__decorateClass([
  Are.Signal,
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreStore)),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Inject(A_SignalVector)),
  __decorateParam(4, A_Inject(AreEvent))
], AreRoot.prototype, "onSignal", 1);

export { AreRoot };
//# sourceMappingURL=AreRoot.component.mjs.map
//# sourceMappingURL=AreRoot.component.mjs.map