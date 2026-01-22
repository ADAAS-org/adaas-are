import { AreNode } from "../../AreNode/AreNode.entity";
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
            id: [node, path],
            action: 'mount-node',
            node,
            params: {
                path
            }
        });
    }
}
