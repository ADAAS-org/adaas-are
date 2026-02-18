import type { AreNode } from "@adaas/are/node";
import { AreSceneInstruction } from "../AreSceneInstruction.entity";


export class UnmountNodeInstruction extends AreSceneInstruction<{
    path: string
}> {

    constructor(
        node: AreNode,
        path: string
    ) {
        super({
            id: [node],
            action: 'unmount-node',
            node,
            params: {
                path
            }
        });
    }
}