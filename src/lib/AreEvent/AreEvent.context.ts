import { A_Fragment } from "@adaas/a-concept"
import { A_Frame } from "@adaas/a-frame"
import type { AreNode } from "@adaas/are/node"
import { AreEventProps } from "./AreEvent.types"



@A_Frame.Fragment({
    namespace: 'A-ARE',
    name: 'AreEvent',
    description: 'Event context for managing events within the A-Concept Rendering Engine (ARE) framework, encapsulating event data and associated nodes to facilitate event-driven interactions.'
})
export class AreEvent<
    T extends any = any
> extends A_Fragment {


    protected _node?: AreNode

    protected _props: AreEventProps<T>

    constructor(eventName: string, props: AreEventProps<T>) {
        super({ name: eventName })


        this._props = props;
    }

    get data(): T {
        return this._props.data
    }

    get event(): string {
        return this._props.event
    }


}