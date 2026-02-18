import { A_Caller, A_Dependency, A_Feature, A_Inject } from "@adaas/a-concept";
import { Are } from "@adaas/are/component";
import { AreStore } from "@adaas/are/store";
import { AreNode } from "@adaas/are/node";
import { AreEvent } from "@adaas/are/event";
import { AreScene } from "@adaas/are/scene";
import { A_ServiceFeatures } from "@adaas/a-utils/a-service";
import { A_SignalVector } from "@adaas/a-utils/a-signal";



export class AreRoot extends Are {

    @A_Feature.Extend({
        name: A_ServiceFeatures.onLoad
    })
    async attachListeners() {
        
    }



    @Are.Template
    async template(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreStore) store: AreStore,
    ) {



        // node.setTemplate(`
        //     <h2>Welcome to Adaas ARE Framework!</h2>
        // `);
    }


    @Are.Signal
    async onSignal(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(A_SignalVector) vector: A_SignalVector,
        @A_Inject(AreEvent) event: AreEvent,
        // @A_Dependency.All()
        // @A_Inject(A_Signal) signals: A_Signal[],
    ) {
        // Handle signals here
        // console.log('Signals received :', signals);
        console.log('Vector  received :', vector);
        console.log('Node  received   :', node);


    }
}
