import { A_ComponentMeta, A_TYPES__Ctor, A_TYPES__ComponentMeta } from '@adaas/a-concept';
import { A_SignalVector } from '@adaas/a-utils/a-signal';
import { Are } from '../AreComponent/Are.component.mjs';
import '../AreComponent/Are.types.mjs';
import '../AreComponent/Are.constants.mjs';

declare class AreSignalsMeta extends A_ComponentMeta<{
    vectorToComponent: Map<A_SignalVector, A_TYPES__Ctor<Are>>;
    componentToVector: Map<A_TYPES__Ctor<Are>, Set<A_SignalVector>>;
} & A_TYPES__ComponentMeta> {
    registerCondition<T extends Are>(component: A_TYPES__Ctor<T>, vector: A_SignalVector): void;
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
    findComponentByVector(vector: A_SignalVector, allowed?: ReadonlySet<A_TYPES__Ctor<Are>> | ReadonlyArray<A_TYPES__Ctor<Are>>): A_TYPES__Ctor<Are> | undefined;
}

export { AreSignalsMeta };
