'use strict';

var core = require('@adaas/a-frame/core');
var aExecution = require('@adaas/a-utils/a-execution');

var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(result)) || result;
  return result;
};
exports.AreEvent = class AreEvent extends aExecution.A_ExecutionContext {
};
exports.AreEvent = __decorateClass([
  core.A_Frame.Define({
    namespace: "A-ARE",
    description: "Event context for managing events within the A-Concept Rendering Engine (ARE) framework, encapsulating event data and associated nodes to facilitate event-driven interactions."
  })
], exports.AreEvent);
//# sourceMappingURL=AreEvent.context.js.map
//# sourceMappingURL=AreEvent.context.js.map