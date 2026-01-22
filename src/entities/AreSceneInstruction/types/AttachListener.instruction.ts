import { AreListener } from "@adaas/are/context/AreSyntax/AreSyntax.context";
import { AreNode } from "../../AreNode/AreNode.entity";
import { AreSceneInstruction } from "../AreSceneInstruction.entity";
import { AreEvent } from "@adaas/are/context/AreEvent/AreEvent.context";

export class AttachListenerInstruction extends AreSceneInstruction<{
    target: AreNode;
    listener: AreListener;
}> {

    private _callback!: (e: any) => Promise<void>;

    get listener(): AreListener {
        return this.params!.listener;
    }

    get event(): string {
        return this.params!.listener.handler;
    }


    get target(): AreNode {
        return this.params!.target;
    }

    get callback(): (e: any) => Promise<void> {
        return this._callback;
    }



    constructor(
        node: AreNode,
        target: AreNode,
        listener: AreListener,
    ) {
        super({
            id: [node, listener.name],
            action: 'listener',
            node,
            params: {
                target,
                listener,
            }
        });

        this._callback = async (e) => {
            const newEvent = new AreEvent(listener.handler, {
                event: listener.name,
                data: e
            });

            await this.target.emit(newEvent);

        }
    }
}