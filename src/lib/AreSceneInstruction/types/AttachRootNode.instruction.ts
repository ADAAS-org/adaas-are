import type { AreNode } from "@adaas/are/node";
import { AreSceneInstruction } from "../AreSceneInstruction.entity";



export class AttachRootNodeInstruction extends AreSceneInstruction<{}> {


    get id(): string {
        return this.node.aseid.toString();
    }

    constructor(
        node: AreNode,
    ) {
        super({
            id: [node],
            action: 'attach-root-node',
            node,
            params: {}
        });
    }
}