import { __decorateClass } from '../../chunk-EQQGB2QZ.mjs';
import { A_Frame } from '@adaas/a-frame';
import { A_ExecutionContext } from '@adaas/a-utils/a-execution';

let AreStore = class extends A_ExecutionContext {
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
AreStore = __decorateClass([
  A_Frame.Fragment({
    description: "Are Store uses to keep AreNode related information for interpolations, runtime data, etc. This object can be injected to manipulate with data at runtime."
  })
], AreStore);

export { AreStore };
//# sourceMappingURL=AreStore.context.mjs.map
//# sourceMappingURL=AreStore.context.mjs.map