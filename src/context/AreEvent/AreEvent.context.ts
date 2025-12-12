import { A_Fragment } from "@adaas/a-concept"


export class AreEvent<
    T extends any = any
> extends A_Fragment {

    protected _props: {
        data: T,
        event: string
    }

    constructor(eventName: string, props: {
        data: T,
        event: string
    }) {
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