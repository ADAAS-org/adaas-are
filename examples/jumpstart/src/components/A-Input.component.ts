import { A_Caller, A_Feature, A_Inject, A_Scope } from "@adaas/a-concept";
import { A_Logger } from "@adaas/a-utils";
import { Are } from "@adaas/are/components/AreComponent/Are.component";
import { AreStore } from "@adaas/are/context/AreStore/AreStore.context";
import { AreNode } from "@adaas/are/entities/AreNode/AreNode.entity";


export class AInput extends Are {

    async template() {
        return `<input type="text" placeholder="A_Input Element"/>`;
    }

    @Are.EventHandler
    async A_UI_NODE_onBeforeLoad(
        @A_Inject(AreNode) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Logger) logger: A_Logger,
    ): Promise<void> {
        logger.log('green', `AInput is initializing... : <${node.aseid.entity}> : `, node.aseid.toString());

        // store.data.set('btnName', 'Nope');
    }

}