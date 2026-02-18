'use strict';

var aFrame = require('@adaas/a-frame');
var aExecution = require('@adaas/a-utils/a-execution');

var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(result)) || result;
  return result;
};
exports.AreStore = class AreStore extends aExecution.A_ExecutionContext {
  constructor(aseid) {
    super(aseid.toString());
  }
  set(param1, param2) {
    if (typeof param1 === "object") {
      Object.entries(param1).forEach(([key, value]) => {
        super.set(key, value);
      });
    } else if (param2 !== void 0) {
      super.set(param1, param2);
    }
    return this;
  }
};
exports.AreStore = __decorateClass([
  aFrame.A_Frame.Fragment({
    description: "Are Store uses to keep AreNode related information for interpolations, runtime data, etc. This object can be injected to manipulate with data at runtime."
  })
], exports.AreStore);
//# sourceMappingURL=AreStore.context.js.map
//# sourceMappingURL=AreStore.context.js.map