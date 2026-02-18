import { __decorateClass, __decorateParam } from '../../chunk-EQQGB2QZ.mjs';
import { A_Feature, A_Dependency, A_Inject } from '@adaas/a-concept';
import { AreContext } from '@adaas/are/component';
import { AreSyntax } from '@adaas/are/syntax';
import { AreInitSignal } from '@adaas/are/signals';
import { A_Service, A_ServiceFeatures } from '@adaas/a-utils/a-service';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { A_SignalBus } from '@adaas/a-utils/a-signal';

var _a, _b;
class AreApp extends A_Service {
  async [_b = A_ServiceFeatures.onAfterLoad](context, logger) {
  }
  async [_a = A_ServiceFeatures.onStart](context, syntax, bus, logger) {
    for (const root of syntax.extractRoots(context.source)) {
      context.addRoot(root);
      let startTime = Date.now();
      await root.load();
      logger?.info("red", `Root <${root.aseid.id}> loaded in ${Date.now() - startTime} ms.`);
      startTime = Date.now();
      root.compile();
      logger?.info("red", `Root <${root.aseid.id}> compiled in ${Date.now() - startTime} ms.`);
      startTime = Date.now();
      root.render();
      logger?.info("red", `Root <${root.aseid.id}> rendered in ${Date.now() - startTime} ms.`);
    }
    logger?.debug("cyan", `UI Application started at <${context.roots.map((root) => root.aseid.id).join(", ")}> with ${context.roots.length} root nodes.`);
    await bus.next(new AreInitSignal());
  }
}
__decorateClass([
  A_Feature.Extend(),
  __decorateParam(0, A_Dependency.Required()),
  __decorateParam(0, A_Inject(AreContext)),
  __decorateParam(1, A_Inject(A_Logger))
], AreApp.prototype, _b, 1);
__decorateClass([
  A_Feature.Extend(),
  __decorateParam(0, A_Dependency.Required()),
  __decorateParam(0, A_Inject(AreContext)),
  __decorateParam(1, A_Inject(AreSyntax)),
  __decorateParam(2, A_Inject(A_SignalBus)),
  __decorateParam(3, A_Inject(A_Logger))
], AreApp.prototype, _a, 1);

export { AreApp };
//# sourceMappingURL=AreApp.container.mjs.map
//# sourceMappingURL=AreApp.container.mjs.map