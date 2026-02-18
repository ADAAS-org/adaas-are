'use strict';

var aConcept = require('@adaas/a-concept');
var component = require('@adaas/are/component');
var syntax = require('@adaas/are/syntax');
var signals = require('@adaas/are/signals');
var aService = require('@adaas/a-utils/a-service');
var aLogger = require('@adaas/a-utils/a-logger');
var aSignal = require('@adaas/a-utils/a-signal');

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
var _a, _b;
class AreApp extends aService.A_Service {
  async [_b = aService.A_ServiceFeatures.onAfterLoad](context, logger) {
  }
  async [_a = aService.A_ServiceFeatures.onStart](context, syntax, bus, logger) {
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
    await bus.next(new signals.AreInitSignal());
  }
}
__decorateClass([
  aConcept.A_Feature.Extend(),
  __decorateParam(0, aConcept.A_Dependency.Required()),
  __decorateParam(0, aConcept.A_Inject(component.AreContext)),
  __decorateParam(1, aConcept.A_Inject(aLogger.A_Logger))
], AreApp.prototype, _b);
__decorateClass([
  aConcept.A_Feature.Extend(),
  __decorateParam(0, aConcept.A_Dependency.Required()),
  __decorateParam(0, aConcept.A_Inject(component.AreContext)),
  __decorateParam(1, aConcept.A_Inject(syntax.AreSyntax)),
  __decorateParam(2, aConcept.A_Inject(aSignal.A_SignalBus)),
  __decorateParam(3, aConcept.A_Inject(aLogger.A_Logger))
], AreApp.prototype, _a);

exports.AreApp = AreApp;
//# sourceMappingURL=AreApp.container.js.map
//# sourceMappingURL=AreApp.container.js.map