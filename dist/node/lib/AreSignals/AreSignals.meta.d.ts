import { A_ComponentMeta, A_TYPES__Ctor, A_TYPES__ComponentMeta } from '@adaas/a-concept';
import { A_SignalVector } from '@adaas/a-utils/a-signal';
import { Are } from '../AreComponent/Are.component.js';
import '../AreComponent/Are.types.js';
import '../AreComponent/Are.constants.js';

declare class AreSignalsMeta extends A_ComponentMeta<{
    vectorToComponent: Map<A_SignalVector, A_TYPES__Ctor<Are>>;
    componentToVector: Map<A_TYPES__Ctor<Are>, Set<A_SignalVector>>;
    /**
     * Conditions scoped to a single root id. The outer key is the root id
     * (the `id` attribute of an `<are-root>` outlet); the inner map mirrors
     * the global `vectorToComponent` map but only applies when matching is
     * performed for that exact root. Conditions registered here are NEVER
     * considered for any other root, allowing the same component / vector to
     * resolve differently per outlet in a multi-root application.
     */
    rootScopedConditions: Map<string, Map<A_SignalVector, A_TYPES__Ctor<Are>>>;
} & A_TYPES__ComponentMeta> {
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
    registerCondition<T extends Are>(component: A_TYPES__Ctor<T>, vector: A_SignalVector, root?: string): void;
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
    findComponentByVector(vector: A_SignalVector, allowed?: ReadonlySet<A_TYPES__Ctor<Are>> | ReadonlyArray<A_TYPES__Ctor<Are>>, root?: string): A_TYPES__Ctor<Are> | undefined;
    /**
     * Resolves the best component from a vector→component map using the
     * three-tier priority shared by all condition matching:
     *   1. Simple identity lookup (same vector instance).
     *   2. Full equivalence (`vector.equals`).
     *   3. Logical match (`vector.match`, order-independent).
     *   4. Inclusion (`vector.includes`, provided vector is a subset).
     */
    protected matchInMap(map: Map<A_SignalVector, A_TYPES__Ctor<Are>>, vector: A_SignalVector, isAllowed: (component: A_TYPES__Ctor<Are>) => boolean): A_TYPES__Ctor<Are> | undefined;
}

export { AreSignalsMeta };
