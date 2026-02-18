'use strict';

var aConcept = require('@adaas/a-concept');
var aConfig = require('@adaas/a-utils/a-config');
var aLogger = require('@adaas/a-utils/a-logger');
var aService = require('@adaas/a-utils/a-service');
var scene = require('@adaas/are/scene');

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
class AreRouter extends aConcept.A_Component {
  async [_a = aService.A_ServiceFeatures.onBeforeLoad](scope, root, config, logger) {
    logger?.debug("cyan", `AreRouter initializing  ...`);
  }
}
__decorateClass([
  aConcept.A_Feature.Extend(),
  __decorateParam(0, aConcept.A_Dependency.Parent()),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(1, aConcept.A_Inject(scene.AreScene)),
  __decorateParam(2, aConcept.A_Inject(aConfig.A_Config)),
  __decorateParam(3, aConcept.A_Inject(aLogger.A_Logger))
], AreRouter.prototype, _a);

exports.AreRouter = AreRouter;
//# sourceMappingURL=AreRouter.componeent.js.map
//# sourceMappingURL=AreRouter.componeent.js.map