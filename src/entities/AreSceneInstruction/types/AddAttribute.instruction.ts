import { AreNode } from "../../AreNode/AreNode.entity";
import { AreSceneInstruction } from "../AreSceneInstruction.entity";



export class AddAttributeInstruction extends AreSceneInstruction<{
    name: string;
    value: string;
}> {

    get name(): string {
        return this.params!.name;
    }

    get value(): string {
        return this.params!.value;
    }

    constructor(
        node: AreNode,
        name: string,
        value: string
    ) {
        super({
            id: [name, node],
            action: 'add-attribute',
            node,
            params: {
                name,
                value,
            }
        });
    }
}