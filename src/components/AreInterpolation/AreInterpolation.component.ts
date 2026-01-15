import { A_Caller, A_Inject } from "@adaas/a-concept";
import { Are } from "../AreComponent/Are.component";
import { AreNode } from "@adaas/are/entities/AreNode/AreNode.entity";
import { AreScene } from "@adaas/are/context/AreScene/AreScene.context";
import { A_Logger } from "@adaas/a-utils";
import { AreProps } from "@adaas/are/context/AreProps/AreProps.context";



export class AreInterpolation extends Are {

    get wrapper(): string {
        return 'span';
    }

    async template(): Promise<string> {
        return ``;
    }


    @Are.onAfterCompile
    async onAfterCompile(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(A_Logger) logger: A_Logger,
        @A_Inject(AreProps) props: AreProps,
    ) {
        logger.info('blue', `AreInterpolation onAfterCompile called... : <${node.aseid.entity}> : `, node.aseid.toString(), props);

        await scene.reset(props.get('value'));
    }
}