import { A_TYPES__Ctor } from '@adaas/a-concept';
import { A_Signal } from '@adaas/a-utils/a-signal';
import { Are } from '../AreComponent/Are.component.js';
import '../AreComponent/Are.types.js';
import '../AreComponent/Are.constants.js';

type AreSignalsContextConfig<T extends Are> = {
    [key in string]: {
        default?: A_TYPES__Ctor<T>;
        pool?: Array<A_TYPES__Ctor<T>>;
        /**
         * Explicit signal-vector → component conditions for this outlet.
         * When omitted, routing is resolved via @Are.Condition decorators
         * registered in the global AreSignalsMeta.
         */
        conditions?: Array<{
            vector: Array<A_Signal<any>>;
            component: A_TYPES__Ctor<T>;
        }>;
    };
};

export type { AreSignalsContextConfig };
