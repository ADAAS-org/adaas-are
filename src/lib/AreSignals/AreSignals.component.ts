import { A_Caller, A_Component, A_Feature, A_Inject, A_Meta, A_Scope } from "@adaas/a-concept";
import { A_SignalBusFeatures, A_SignalState, A_SignalVector } from "@adaas/a-utils/a-signal";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { AreContext } from "@adaas/are/component/Are.context";
import { AreFeatures } from "@adaas/are/component/Are.constants";
import { AreNode } from "@adaas/are/node/AreNode.entity";
import { AreNodeFeatures } from "@adaas/are/node/AreNode.constants";
import { AreEvent } from "@adaas/are/event/AreEvent.context";
import { A_Frame } from "@adaas/a-frame";
import { AreSignalsMeta } from "./AreSignals.meta";
import { AreSignalsContext } from "./AreSignals.context";



@A_Frame.Component({
    namespace: 'A-ARE',
    name: 'AreSignals',
    description: 'AreSignals is the central signal bus component within the ARE framework. It listens for incoming signal vectors and dispatches them to all subscribed root nodes, enabling reactive, event-driven rendering and lifecycle management across the component tree.'
})
@A_Meta.Define(AreSignalsMeta)
export class AreSignals extends A_Component {

    @A_Feature.Extend({
        name: A_SignalBusFeatures.onNext,
    })
    async handleSignalVector(
        @A_Inject(A_SignalVector) vector: A_SignalVector,
        @A_Inject(AreSignalsContext) context: AreSignalsContext,
        @A_Inject(A_SignalState) state: A_SignalState,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(A_Logger) logger?: A_Logger,
    ) {
        logger?.debug(`Handling Signal Vector with ${context.subscribers.size} root nodes.`, vector);

        try {
            for (const root of context.subscribers) {

                const callScope = new A_Scope({
                    fragments: [new AreEvent(
                        AreFeatures.onSignal, {
                        vector
                    })]
                })
                    .import(scope, root.scope);

                logger?.debug('Emitting signal for root node:', vector);

                await root.emit(callScope);

                callScope.destroy();
            }
        } catch (error) {
            logger?.error(error);
        }
    }



    // -----------------------------------------------------------------------------------------
    // ----------------------------Are-Node Event Section----------------------------------------
    // -----------------------------------------------------------------------------------------
    /**
     * Handles events triggered on the AreNode
     * 
     * @param node 
     * @param scope 
     * @param event 
     * @param scene 
     * @param feature 
     * @param args 
     */
    @A_Feature.Extend({
        name: AreNodeFeatures.onEmit,
        scope: [AreNode]
    })
    async propagateEvent(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreEvent) event: AreEvent,
        @A_Inject(A_Feature) feature: A_Feature,
        @A_Inject(A_Logger) logger?: A_Logger,
        ...args: any[]
    ) {
        let currentNode = node;
        let target = node;

        while (currentNode && currentNode.parent) {
            if (currentNode.component) {
                target = currentNode;
                break;
            }
            currentNode = currentNode.parent;
        }

        if (target.component)
            await feature.chain(target.component, event.name, scope);
    }
}