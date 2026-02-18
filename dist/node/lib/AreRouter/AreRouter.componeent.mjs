import { __decorateClass, __decorateParam } from '../../chunk-EQQGB2QZ.mjs';
import { A_Component, A_Feature, A_Dependency, A_Inject, A_Scope } from '@adaas/a-concept';
import { A_Config } from '@adaas/a-utils/a-config';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { A_ServiceFeatures } from '@adaas/a-utils/a-service';
import { AreScene } from '@adaas/are/scene';

var _a;
class AreRouter extends A_Component {
  async [_a = A_ServiceFeatures.onBeforeLoad](scope, root, config, logger) {
    logger?.debug("cyan", `AreRouter initializing  ...`);
  }
}
__decorateClass([
  A_Feature.Extend(),
  __decorateParam(0, A_Dependency.Parent()),
  __decorateParam(0, A_Inject(A_Scope)),
  __decorateParam(1, A_Inject(AreScene)),
  __decorateParam(2, A_Inject(A_Config)),
  __decorateParam(3, A_Inject(A_Logger))
], AreRouter.prototype, _a, 1);

export { AreRouter };
//# sourceMappingURL=AreRouter.componeent.mjs.map
//# sourceMappingURL=AreRouter.componeent.mjs.map