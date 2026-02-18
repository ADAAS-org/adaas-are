import { __decorateClass } from '../../chunk-EQQGB2QZ.mjs';
import { A_Fragment } from '@adaas/a-concept';
import { A_Frame } from '@adaas/a-frame';

let AreEvent = class extends A_Fragment {
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
AreEvent = __decorateClass([
  A_Frame.Fragment({
    namespace: "A-ARE",
    name: "AreEvent",
    description: "Event context for managing events within the A-Concept Rendering Engine (ARE) framework, encapsulating event data and associated nodes to facilitate event-driven interactions."
  })
], AreEvent);

export { AreEvent };
//# sourceMappingURL=AreEvent.context.mjs.map
//# sourceMappingURL=AreEvent.context.mjs.map