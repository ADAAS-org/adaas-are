'use strict';

var aConcept = require('@adaas/a-concept');
var component = require('@adaas/are/component');
var store = require('@adaas/are/store');
var event = require('@adaas/are/event');
var scene = require('@adaas/are/scene');
var aService = require('@adaas/a-utils/a-service');
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
class AreRoot extends component.Are {
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
  aConcept.A_Feature.Extend({
    name: aService.A_ServiceFeatures.onLoad
  })
], AreRoot.prototype, "attachListeners");
__decorateClass([
  component.Are.Template,
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(store.AreStore))
], AreRoot.prototype, "template");
__decorateClass([
  component.Are.Signal,
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(store.AreStore)),
  __decorateParam(2, aConcept.A_Inject(scene.AreScene)),
  __decorateParam(3, aConcept.A_Inject(aSignal.A_SignalVector)),
  __decorateParam(4, aConcept.A_Inject(event.AreEvent))
], AreRoot.prototype, "onSignal");

exports.AreRoot = AreRoot;
//# sourceMappingURL=AreRoot.component.js.map
//# sourceMappingURL=AreRoot.component.js.map