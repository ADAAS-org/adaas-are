'use strict';

var aSignal = require('@adaas/a-utils/a-signal');
var aFrame = require('@adaas/a-frame');

var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(result)) || result;
  return result;
};
exports.AreSignal = class AreSignal extends aSignal.A_Signal {
};
exports.AreSignal = __decorateClass([
  aFrame.A_Frame.Entity({
    namespace: "A-ARE",
    name: "AreSignal",
    description: "AreSignal is the base class for all signals used within the ARE framework. It extends A_Signal to provide a typed signal entity that components can subscribe to and emit, enabling reactive communication between ARE components and driving lifecycle and rendering updates."
  })
], exports.AreSignal);
//# sourceMappingURL=AreSignal.entity.js.map
//# sourceMappingURL=AreSignal.entity.js.map