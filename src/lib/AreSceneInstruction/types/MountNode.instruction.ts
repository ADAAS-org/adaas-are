import type { AreNode } from "@adaas/are/node";
import { AreSceneInstruction } from "../AreSceneInstruction.entity";




export class MountNodeInstruction extends AreSceneInstruction<{
    path: string;
}> {


    get path(): string {
        return this.params!.path;
    }

    constructor(
        node: AreNode,
        path: string,
    ) {
        super({
            id: [node],
            action: 'mount-node',
            node,
            params: {
                path
            }
        });
    }
}
