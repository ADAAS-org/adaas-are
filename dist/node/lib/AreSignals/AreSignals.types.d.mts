import { A_TYPES__Ctor } from '@adaas/a-concept';
import { A_Signal } from '@adaas/a-utils/a-signal';
import { Are } from '@adaas/are/component/Are.component';

type AreSignalsContextConfig<T extends Are> = {
    [key in string]: {
        default: A_TYPES__Ctor<T>;
        pool: Array<A_TYPES__Ctor<T>>;
        conditions: Array<{
            vector: Array<A_Signal<any>>;
            component: A_TYPES__Ctor<T>;
        }>;
    };
};

export type { AreSignalsContextConfig };
