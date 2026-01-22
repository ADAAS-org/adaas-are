import { AreDirective } from "@adaas/are/context/AreSyntax/AreSyntax.context";
import { AreSceneInstruction } from "../AreSceneInstruction.entity";
import { AreNode } from "../../AreNode/AreNode.entity";




export class AddDirectiveInstruction extends AreSceneInstruction<{
    directive: AreDirective;
    value: any;
}> {

    get directive(): AreDirective {
        return this.params!.directive;
    }

    get value(): any {
        return this.params!.value;
    }

    constructor(
        node: AreNode,
        directive: AreDirective,
        value: any
    ) {
        super({
            id: [directive, node],
            action: 'directive',
            node,
            params: {
                directive,
                value,
            }
        });
    }
}