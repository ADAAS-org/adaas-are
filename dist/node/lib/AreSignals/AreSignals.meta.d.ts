import { A_ComponentMeta, A_TYPES__Ctor, A_TYPES__ComponentMeta } from '@adaas/a-concept';
import { A_SignalVector } from '@adaas/a-utils/a-signal';
import { Are } from '../AreComponent/Are.component.js';
import '../AreComponent/Are.types.js';
import '../AreComponent/Are.constants.js';

declare class AreSignalsMeta extends A_ComponentMeta<{
    vectorToComponent: Map<A_SignalVector, A_TYPES__Ctor<Are>>;
    componentToVector: Map<A_TYPES__Ctor<Are>, Set<A_SignalVector>>;
} & A_TYPES__ComponentMeta> {
    registerCondition<T extends Are>(component: A_TYPES__Ctor<T>, vector: A_SignalVector): void;
    findComponentByVector(vector: A_SignalVector): A_TYPES__Ctor<Are> | undefined;
}

export { AreSignalsMeta };
