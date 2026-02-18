import type  { AreNode } from "@adaas/are/node";
import { AreSceneInstruction } from "../AreSceneInstruction.entity";

export class AddStyleInstruction extends AreSceneInstruction<{
    styles: string;
}> {

    get styles(): string {
        return this.params!.styles;
    }


    constructor(
        node: AreNode,
        styles: string,
    ) {
        super({
            id: [styles, node],
            action: 'add-style',
            node,
            params: {
                styles,
            }
        });
    }
}