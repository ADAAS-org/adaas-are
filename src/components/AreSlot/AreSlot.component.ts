import { A_Logger, A_SignalVectorFeatures, A_SignalState, A_SignalVector } from "@adaas/a-utils";
import { Are } from "../AreComponent/Are.component";
import { A_Caller, A_Feature, A_Inject } from "@adaas/a-concept";
import { AreNodeFeatures } from "@adaas/are/entities/AreNode/AreNode.constants";
import { AreNode } from "@adaas/are/entities/AreNode/AreNode.entity";
import { AreScene } from "@adaas/are/context/AreScene/AreScene.context";




export class AreSlot extends Are {



    async template() {
        return `<div>Are Slot Component</div>`;
    }



    @A_Feature.Extend()
    async [A_SignalVectorFeatures.Next](
        @A_Inject(A_SignalVector) vector: A_SignalVector
    ) {
        // Emit signals if needed

        console.log('AreSlot Signal Vector Emitted:', vector);
    }



    // @A_Feature.Extend({
    //     name: AreNodeFeatures.onCompile,
    //     scope: [AreNode]
    // })
    // async compile(
    //     @A_Inject(A_Caller) node: AreNode,
    //     @A_Inject(AreScene) scene: AreScene,
    //     @A_Inject(A_Logger) logger: A_Logger,
    //     @A_Inject(A_SignalState) signalState?: A_SignalState,
    // ) {

    //     const vector = await signalState?.toVector().toDataVector()

    //     logger.debug('red',
    //         '================================================================',
    //         `Compiling AreSlot Component at Scene: <${scene.name}>`,
    //         '================================================================',
    //         vector
    //     )
    // }

}