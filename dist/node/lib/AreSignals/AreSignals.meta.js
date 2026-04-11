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
  findComponentByVector(vector) {
    const vectorToComponent = this.get("vectorToComponent");
    if (vectorToComponent) {
      const component = vectorToComponent.get(vector);
      if (component) {
        return component;
      }
    }
    if (vectorToComponent) {
      for (const [registeredVector, component] of vectorToComponent.entries()) {
        if (vector.equals(registeredVector)) {
          return component;
        }
      }
      for (const [registeredVector, component] of vectorToComponent.entries()) {
        if (vector.match(registeredVector)) {
          return component;
        }
      }
      for (const [registeredVector, component] of vectorToComponent.entries()) {
        if (vector.includes(registeredVector)) {
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