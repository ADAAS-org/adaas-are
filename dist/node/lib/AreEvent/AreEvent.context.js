'use strict';

var aConcept = require('@adaas/a-concept');
var aFrame = require('@adaas/a-frame');

var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(result)) || result;
  return result;
};
exports.AreEvent = class AreEvent extends aConcept.A_Fragment {
  constructor(eventName, props) {
    super({ name: eventName });
    this._props = props;
  }
  get data() {
    return this._props.data;
  }
  get event() {
    return this._props.event;
  }
};
exports.AreEvent = __decorateClass([
  aFrame.A_Frame.Fragment({
    namespace: "A-ARE",
    name: "AreEvent",
    description: "Event context for managing events within the A-Concept Rendering Engine (ARE) framework, encapsulating event data and associated nodes to facilitate event-driven interactions."
  })
], exports.AreEvent);
//# sourceMappingURL=AreEvent.context.js.map
//# sourceMappingURL=AreEvent.context.js.map