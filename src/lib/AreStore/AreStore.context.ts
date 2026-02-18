import { ASEID } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame";
import { A_ExecutionContext } from "@adaas/a-utils/a-execution";



@A_Frame.Fragment({
    description: "Are Store uses to keep AreNode related information for interpolations, runtime data, etc. This object can be injected to manipulate with data at runtime.",
})
export class AreStore<
    T extends Record<string, any> = Record<string, any>
> extends A_ExecutionContext<T> {

    constructor(aseid: ASEID) {
        super(aseid.toString());
    }



    set<K extends keyof T>(values: Partial<T>): this 
    set<K extends keyof T>(key: K, value: T[K]): this 
    set<K extends keyof T>(
        param1: K | Partial<T>,
        param2?: T[K]
    ): this {
        if (typeof param1 === 'object') {
            Object.entries(param1).forEach(([key, value]) => {
                super.set(key as K, value as T[K]);
            });
        } else if (param2 !== undefined) {
            super.set(param1 as K, param2);
        }
        return this;
    }

}