import { AreNode } from "../../AreNode/AreNode.entity";
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