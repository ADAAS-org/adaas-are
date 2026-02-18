import { ASEID } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame";
import { A_ExecutionContext } from "@adaas/a-utils/a-execution";



@A_Frame.Fragment({
    namespace: 'A-ARE',
    name: 'AreProps',
    description: 'Execution context for managing properties within the A-Concept Rendering Engine (ARE) framework, allowing for type-safe storage and retrieval of key-value pairs associated with a specific ASEID.'
})
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