'use strict';

var aConcept = require('@adaas/a-concept');
var aService = require('@adaas/a-utils/a-service');
var aLogger = require('@adaas/a-utils/a-logger');
var Are_context = require('@adaas/are/component/Are.context');
var AreEngine_component = require('@adaas/are/engine/AreEngine.component');
var AreWatcher_component = require('@adaas/are/watcher/AreWatcher.component');

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);
var _a;
class AreContainer extends aService.A_Service {
  async [_a = aService.A_ServiceFeatures.onStart](engine, context, watchers, logger) {
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
  aConcept.A_Feature.Extend(),
  __decorateParam(0, aConcept.A_Dependency.Required()),
  __decorateParam(0, aConcept.A_Inject(AreEngine_component.AreEngine)),
  __decorateParam(1, aConcept.A_Dependency.Required()),
  __decorateParam(1, aConcept.A_Inject(Are_context.AreContext)),
  __decorateParam(2, aConcept.A_Dependency.All()),
  __decorateParam(2, aConcept.A_Dependency.Flat()),
  __decorateParam(2, aConcept.A_Inject(AreWatcher_component.AreWatcher)),
  __decorateParam(3, aConcept.A_Inject(aLogger.A_Logger))
], AreContainer.prototype, _a);

exports.AreContainer = AreContainer;
//# sourceMappingURL=Are.container.js.map
//# sourceMappingURL=Are.container.js.map