import { ASEID } from "@adaas/a-concept";
import { A_ExecutionContext } from "@adaas/a-utils";


export class AreProps<
    T extends Record<string, any> = Record<string, any>
> extends A_ExecutionContext<T> {

    constructor(aseid: ASEID) {
        super(aseid.toString());
    }


    setMultiple(values: Partial<T>): void {
        Object.entries(values).forEach(([key, value]) => {
            this.set(key as keyof T, value);
        });
    }
}