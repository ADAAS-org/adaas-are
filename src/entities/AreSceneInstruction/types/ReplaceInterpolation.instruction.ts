import { AreInterpolation } from "@adaas/are/context/AreSyntax/AreSyntax.context";
import { AreSceneInstruction } from "../AreSceneInstruction.entity";
import { AreNode } from "../../AreNode/AreNode.entity";


export class ReplaceInterpolationInstruction extends AreSceneInstruction<{
    interpolation: AreInterpolation;
    value: string;
    prevValue?: string;
}> {

    get placement() {
        return this.params?.prevValue || this.interpolation.raw;
    }

    get position() {
        return this.interpolation.position;
    }

    get interpolation(): AreInterpolation {
        return this.params!.interpolation;
    }

    get value(): string {
        return this.params?.value || '';
    }

    constructor(
        node: AreNode,
        interpolation: AreInterpolation,
        value: string,
        prevValue?: string,
    ) {
        super({
            id: [node, interpolation],
            action: 'replace-interpolation',
            node: node,
            params: {
                interpolation,
                prevValue: prevValue,
                value,
            }
        });
    }
}