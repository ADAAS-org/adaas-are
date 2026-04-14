import { __decorateClass, __decorateParam } from '../../chunk-EQQGB2QZ.mjs';
import { A_Feature, A_Dependency, A_Inject } from '@adaas/a-concept';
import { A_Service, A_ServiceFeatures } from '@adaas/a-utils/a-service';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { AreContext } from '@adaas/are/component/Are.context';
import { AreEngine } from '@adaas/are/engine/AreEngine.component';
import { AreWatcher } from '@adaas/are/watcher/AreWatcher.component';

var _a;
class AreContainer extends A_Service {
  async [_a = A_ServiceFeatures.onStart](engine, context, watchers, logger) {
    try {
      for (const watcher of watchers ?? []) {
        await watcher.init();
      }
      await engine.load();
      await engine.build();
      await engine.execute();
      for (const watcher of watchers ?? []) {
        await watcher.watch();
      }
      logger?.info("cyan", `UI Application started at <${context.roots.map((root) => root.aseid.id).join(", ")}> with ${context.roots.length} root nodes.`);
      logger?.debug(
        "cyan",
        "Performance:",
        "------------------------------ \n",
        ...context.performance,
        "------------------------------ \n",
        "Stats:",
        "------------------------------ \n",
        ...context.stats
      );
    } catch (error) {
      logger?.error(error);
    }
  }
}
__decorateClass([
  A_Feature.Extend(),
  __decorateParam(0, A_Dependency.Required()),
  __decorateParam(0, A_Inject(AreEngine)),
  __decorateParam(1, A_Dependency.Required()),
  __decorateParam(1, A_Inject(AreContext)),
  __decorateParam(2, A_Dependency.All()),
  __decorateParam(2, A_Dependency.Flat()),
  __decorateParam(2, A_Inject(AreWatcher)),
  __decorateParam(3, A_Inject(A_Logger))
], AreContainer.prototype, _a, 1);

export { AreContainer };
//# sourceMappingURL=Are.container.mjs.map
//# sourceMappingURL=Are.container.mjs.map