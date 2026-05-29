import { A_TYPES__Ctor } from "@adaas/a-concept";
import { A_Signal } from "@adaas/a-utils/a-signal";
import { Are } from "@adaas/are/component/Are.component";


export type AreSignalsContextConfig<T extends Are> = {
    /**
     * Where key is the root ID and the value is an Array of components that participate in conditional compilation.
     */
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
        }>
    }
}