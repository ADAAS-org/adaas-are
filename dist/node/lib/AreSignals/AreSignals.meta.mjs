import '../../chunk-EQQGB2QZ.mjs';
import { A_ComponentMeta } from '@adaas/a-concept';

class AreSignalsMeta extends A_ComponentMeta {
  /**
   * Registers a condition vector for a component.
   *
   * @param component The component constructor to render when the condition matches.
   * @param vector    The signal vector that activates the component.
   * @param root      Optional root id. When provided, the condition only
   *                  applies to the outlet with that id (per-root targeting).
   *                  When omitted, the condition applies to ALL roots — this
   *                  is the original, root-agnostic behavior.
   */
  registerCondition(component, vector, root) {
    if (root) {
      const rootScopedConditions = this.get("rootScopedConditions") || /* @__PURE__ */ new Map();
      if (!rootScopedConditions.has(root)) {
        rootScopedConditions.set(root, /* @__PURE__ */ new Map());
      }
      rootScopedConditions.get(root).set(vector, component);
      this.set("rootScopedConditions", rootScopedConditions);
      return;
    }
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
   * @param root     Optional root id. When provided, conditions registered
   *                 specifically for that root (via `@Are.Condition(vector,
   *                 { root })`) are considered FIRST and take priority over
   *                 global, root-agnostic conditions. Conditions scoped to a
   *                 DIFFERENT root are never returned here.
   */
  findComponentByVector(vector, allowed, root) {
    if (!vector) return void 0;
    const allowedSet = allowed ? allowed instanceof Set ? allowed : new Set(allowed) : void 0;
    const isAllowed = (component) => !allowedSet || allowedSet.has(component);
    if (root) {
      const rootScoped = this.get("rootScopedConditions")?.get(root);
      if (rootScoped) {
        const match = this.matchInMap(rootScoped, vector, isAllowed);
        if (match) return match;
      }
    }
    const vectorToComponent = this.get("vectorToComponent");
    if (vectorToComponent) {
      return this.matchInMap(vectorToComponent, vector, isAllowed);
    }
    return void 0;
  }
  /**
   * Resolves the best component from a vector→component map using the
   * three-tier priority shared by all condition matching:
   *   1. Simple identity lookup (same vector instance).
   *   2. Full equivalence (`vector.equals`).
   *   3. Logical match (`vector.match`, order-independent).
   *   4. Inclusion (`vector.includes`, provided vector is a subset).
   */
  matchInMap(map, vector, isAllowed) {
    const direct = map.get(vector);
    if (direct && isAllowed(direct)) {
      return direct;
    }
    for (const [registeredVector, component] of map.entries()) {
      if (isAllowed(component) && vector.equals(registeredVector)) {
        return component;
      }
    }
    for (const [registeredVector, component] of map.entries()) {
      if (isAllowed(component) && vector.match(registeredVector)) {
        return component;
      }
    }
    for (const [registeredVector, component] of map.entries()) {
      if (isAllowed(component) && vector.includes(registeredVector)) {
        return component;
      }
    }
    return void 0;
  }
}

export { AreSignalsMeta };
//# sourceMappingURL=AreSignals.meta.mjs.map
//# sourceMappingURL=AreSignals.meta.mjs.map