import { __decorateClass } from '../../chunk-EQQGB2QZ.mjs';
import { A_Signal } from '@adaas/a-utils/a-signal';
import { A_Frame } from '@adaas/a-frame/core';

let AreSignal = class extends A_Signal {
  static get concept() {
    return "are";
  }
};
AreSignal = __decorateClass([
  A_Frame.Define({
    namespace: "A-ARE",
    description: "AreSignal is the base class for all signals used within the ARE framework. It extends A_Signal to provide a typed signal entity that components can subscribe to and emit, enabling reactive communication between ARE components and driving lifecycle and rendering updates."
  })
], AreSignal);

export { AreSignal };
//# sourceMappingURL=AreSignal.entity.mjs.map
//# sourceMappingURL=AreSignal.entity.mjs.map