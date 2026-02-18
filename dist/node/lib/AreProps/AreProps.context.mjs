import { __decorateClass } from '../../chunk-EQQGB2QZ.mjs';
import { A_Frame } from '@adaas/a-frame';
import { A_ExecutionContext } from '@adaas/a-utils/a-execution';

let AreProps = class extends A_ExecutionContext {
  constructor(aseid) {
    super(aseid.toString());
  }
  setMultiple(values) {
    Object.entries(values).forEach(([key, value]) => {
      this.set(key, value);
    });
  }
};
AreProps = __decorateClass([
  A_Frame.Fragment({
    namespace: "A-ARE",
    name: "AreProps",
    description: "Execution context for managing properties within the A-Concept Rendering Engine (ARE) framework, allowing for type-safe storage and retrieval of key-value pairs associated with a specific ASEID."
  })
], AreProps);

export { AreProps };
//# sourceMappingURL=AreProps.context.mjs.map
//# sourceMappingURL=AreProps.context.mjs.map