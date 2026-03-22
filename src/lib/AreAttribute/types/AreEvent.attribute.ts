import { AreEvent } from "@adaas/are/event";
import { AreAttribute } from "../AreAttribute.entity";
import { AreComponentNode, AreNode } from "@adaas/are/node";
import { A_Error } from "@adaas/a-concept";


export class AreEventAttribute extends AreAttribute {

    protected _callback!: (e: any) => Promise<void>;

    get callback() {
        if (!this._callback) {
            /**
             * We need to get the first component node that should be used as a target to obtain a listener method. 
             */
            let target: AreComponentNode | undefined;
            let currentNode: AreNode | undefined = this.owner;

            while (!target && currentNode) {
                if (currentNode instanceof AreComponentNode) {
                    target = currentNode;
                } else {
                    currentNode = currentNode.parent;
                }
            }

            if (!target) {
                throw new A_Error({
                    title: 'Event Attribute Error',
                    description: `No component node found for event attribute ${this.name} on node ${this.owner.id}`,
                });
            }

            /**
             * Then assign a callback that will be stored in the event listener to prevent duplicated functions. 
             */
            this._callback = async (e) => {
                const newEvent = new AreEvent(this.value, {
                    event: this.name,
                    data: e
                });

                await target.emit(newEvent);
            }
        }

        return this._callback;
    }

}