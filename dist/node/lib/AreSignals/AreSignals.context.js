'use strict';

var aConcept = require('@adaas/a-concept');
var aFrame = require('@adaas/a-frame');
var aSignal = require('@adaas/a-utils/a-signal');
var AreSignals_component = require('./AreSignals.component');

var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(result)) || result;
  return result;
};
exports.AreSignalsContext = class AreSignalsContext extends aConcept.A_Fragment {
  constructor(config) {
    super({ name: "AreSignalsContext" });
    /**
     * Where key is the root ID and the value is an Array of components that participate in conditional compilation.
     */
    this._componentMap = /* @__PURE__ */ new Map();
    this._defaultsMap = /* @__PURE__ */ new Map();
    this._conditionsMap = /* @__PURE__ */ new Map();
    this._subscribers = /* @__PURE__ */ new Set();
    const configEntries = config ? Object.entries(config) : [];
    for (const [rootId, conf] of configEntries) {
      const def = conf?.default;
      const pool = conf?.pool || [];
      const conditions = conf?.conditions || [];
      this._componentMap.set(rootId, new Set(pool));
      if (def)
        this._defaultsMap.set(rootId, def);
      this._conditionsMap.set(rootId, conditions);
    }
  }
  signalsMeta() {
    const signalsMeta = aConcept.A_Context.meta(AreSignals_component.AreSignals);
    if (!signalsMeta) {
      throw new Error("AreSignalsMeta not found in context. Please ensure that AreSignalsMeta is properly registered in the A-Concept context.");
    }
    return signalsMeta;
  }
  subscribe(subscriber) {
    this._subscribers.add(subscriber);
  }
  unsubscribe(subscriber) {
    this._subscribers.delete(subscriber);
  }
  get subscribers() {
    return this._subscribers;
  }
  /**
   * Returns the components associated with the given ID. If no components are found, returns an empty array.
   * 
   * @param id The ID of the component group.
   * @returns An array of component constructors.
   */
  getComponentById(id) {
    const set = this._componentMap.get(id) || /* @__PURE__ */ new Set();
    return Array.from(set);
  }
  /**
   * Returns the components associated with the root ID of the given node. If no components are found, returns an empty array.
   * 
   * @param node The AreNode whose root ID is used to retrieve the components.
   * @returns An array of component constructors.
   */
  getComponentByRoot(node) {
    return this.getComponentById(node.id);
  }
  /**
   * Adds a new component to the specified root ID. If the root ID does not exist, it will be created.
   * 
   * @param rootId The ID of the root component group.
   * @param components An array of component constructors to add.
   */
  extendRoot(rootId, components) {
    if (!this._componentMap.has(rootId)) {
      this._componentMap.set(rootId, /* @__PURE__ */ new Set());
    }
    const set = this._componentMap.get(rootId);
    for (const comp of components) {
      set.add(comp);
    }
  }
  /**
   * Whether routing is configured for the given root ID.
   * When false, the root should leave its original template content untouched.
   * 
   * @param rootId The id attribute of the <are-root> element.
   */
  hasRoot(rootId) {
    return this._componentMap.has(rootId) || this._conditionsMap.has(rootId);
  }
  /**
   * Returns the default component associated with the given root ID, if any.
   * 
   * @param rootId The ID of the root component group.
   */
  getDefault(rootId) {
    return this._defaultsMap.get(rootId);
  }
  /**
   * Finds the matching component for the given root ID and incoming signal vector.
   * 
   * Matching priorities (mirroring AreSignalsMeta):
   * 1. Full equivalence  — vector.equals(conditionVector)
   * 2. Logical match     — vector.match(conditionVector)
   * 3. Inclusion         — incoming vector contains every signal type from condition, checked with signal.compare()
   * 
   * @param rootId  The id attribute of the <are-root> element.
   * @param vector  The incoming signal vector from the bus.
   */
  findComponentByVector(rootId, vector) {
    const conditions = this._conditionsMap.get(rootId) || [];
    for (const condition of conditions) {
      const conditionVector = new aSignal.A_SignalVector(condition.vector);
      if (vector.equals(conditionVector)) {
        return condition.component;
      }
    }
    for (const condition of conditions) {
      const conditionVector = new aSignal.A_SignalVector(condition.vector);
      if (vector.match(conditionVector)) {
        return condition.component;
      }
    }
    for (const condition of conditions) {
      const allMatch = condition.vector.every((condSignal) => {
        for (const incomingSignal of vector) {
          if (!incomingSignal)
            continue;
          if (incomingSignal.constructor === condSignal.constructor && condSignal.compare(incomingSignal)) {
            return true;
          }
        }
        return false;
      });
      if (allMatch) {
        return condition.component;
      }
    }
    return void 0;
  }
};
exports.AreSignalsContext = __decorateClass([
  aFrame.A_Frame.Fragment({
    description: "AreSignalsContext is a fragment that manages the set of root nodes subscribed to the signal bus. It tracks which Are components should receive signal vectors from AreSignals and provides the subscriber registry used during signal dispatch."
  })
], exports.AreSignalsContext);
//# sourceMappingURL=AreSignals.context.js.map
//# sourceMappingURL=AreSignals.context.js.map