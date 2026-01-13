import { A_Fragment } from "@adaas/a-concept"
import { AreNode } from "@adaas/are/entities/AreNode/AreNode.entity"


export class AreEvent<
    T extends any = any
> extends A_Fragment {


    protected _node?: AreNode

    protected _props: {
        data: T,
        event: string
    }

    constructor(eventName: string, props: {
        data: T,
        node?: AreNode,
        event: string
    }) {
        super({ name: eventName })


        this._props = props;
        this._node = props.node;
    }

    get node(): AreNode | undefined {
        return this._node;
    }

    get data(): T {
        return this._props.data
    }

    get event(): string {
        return this._props.event
    }


    bind(node: AreNode) {
        this._node = node;
    }
}