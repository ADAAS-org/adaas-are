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
exports.AreProps = class AreProps extends aExecution.A_ExecutionContext {
  constructor(aseid) {
    super(aseid.toString());
  }
  setMultiple(values) {
    Object.entries(values).forEach(([key, value]) => {
      this.set(key, value);
    });
  }
};
exports.AreProps = __decorateClass([
  aFrame.A_Frame.Fragment({
    namespace: "A-ARE",
    name: "AreProps",
    description: "Execution context for managing properties within the A-Concept Rendering Engine (ARE) framework, allowing for type-safe storage and retrieval of key-value pairs associated with a specific ASEID."
  })
], exports.AreProps);
//# sourceMappingURL=AreProps.context.js.map
//# sourceMappingURL=AreProps.context.js.map