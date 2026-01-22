import { AreNode } from "../../AreNode/AreNode.entity";
import { AreSceneInstruction } from "../AreSceneInstruction.entity";

export class AddStylePropertyInstruction extends AreSceneInstruction<{
    property: string;
    value: string;
}> {

    get styles(): string {
        return this.params!.property;
    }

    get value(): string {
        return this.params!.value;
    }

    constructor(
        node: AreNode,
        property: string,
        value: string
    ) {
        super({
            id: [property, node],
            action: 'add-style',
            node,
            params: {
                property,
                value,
            }
        });
    }
}