import { A_Frame } from "@adaas/a-frame"
import { A_ExecutionContext } from "@adaas/a-utils/a-execution"


@A_Frame.Fragment({
    namespace: 'A-ARE',
    name: 'AreEvent',
    description: 'Event context for managing events within the A-Concept Rendering Engine (ARE) framework, encapsulating event data and associated nodes to facilitate event-driven interactions.'
})
export class AreEvent<
    T extends Record<string, any> = Record<string, any>
> extends A_ExecutionContext<T> {

}