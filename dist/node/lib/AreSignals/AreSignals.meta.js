'use strict';

var aConcept = require('@adaas/a-concept');

class AreSignalsMeta extends aConcept.A_ComponentMeta {
  registerCondition(component, vector) {
    const vectorToComponent = this.get("vectorToComponent") || /* @__PURE__ */ new Map();
    const componentToVector = this.get("componentToVector") || /* @__PURE__ */ new Map();
    vectorToComponent.set(vector, component);
    if (!componentToVector.has(component)) {
      componentToVector.set(component, /* @__PURE__ */ new Set());
    }
    componentToVector.get(component)?.add(vector);
    this.set("vectorToComponent", vectorToComponent);
    this.set("componentToVector", componentToVector);
  }
  /**
   * Finds the best registered component whose condition vector matches the
   * provided signal vector.
   *
   * An optional `allowed` set restricts the search to specific component
   * constructors — used by outlets that maintain a pool of admissible
   * components. This prevents a globally-registered component from another
   * outlet (whose condition happens to match the same signals) from being
   * returned and then rejected by the caller, which would otherwise mask a
   * lower-priority but pool-eligible match.
   *
   * @param vector   The incoming signal vector.
   * @param allowed  Optional set/array of component constructors to consider.
   *                 When omitted, every registered component is eligible.
   */
  findComponentByVector(vector, allowed) {
    if (!vector) return void 0;
    const allowedSet = allowed ? allowed instanceof Set ? allowed : new Set(allowed) : void 0;
    const isAllowed = (component) => !allowedSet || allowedSet.has(component);
    const vectorToComponent = this.get("vectorToComponent");
    if (vectorToComponent) {
      const component = vectorToComponent.get(vector);
      if (component && isAllowed(component)) {
        return component;
      }
    }
    if (vectorToComponent) {
      for (const [registeredVector, component] of vectorToComponent.entries()) {
        if (isAllowed(component) && vector.equals(registeredVector)) {
          return component;
        }
      }
      for (const [registeredVector, component] of vectorToComponent.entries()) {
        if (isAllowed(component) && vector.match(registeredVector)) {
          return component;
        }
      }
      for (const [registeredVector, component] of vectorToComponent.entries()) {
        if (isAllowed(component) && vector.includes(registeredVector)) {
          return component;
        }
      }
    }
    return void 0;
  }
}

exports.AreSignalsMeta = AreSignalsMeta;
//# sourceMappingURL=AreSignals.meta.js.map
//# sourceMappingURL=AreSignals.meta.js.map