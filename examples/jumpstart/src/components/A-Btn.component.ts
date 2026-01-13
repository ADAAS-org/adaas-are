import { A_Caller, A_Feature, A_FormatterHelper, A_Inject, A_Scope } from "@adaas/a-concept";
import { A_Logger } from "@adaas/a-utils";
import { Are } from "@adaas/are/components/AreComponent/Are.component";
import { AreEvent } from "@adaas/are/context/AreEvent/AreEvent.context";
import { AreScene } from "@adaas/are/context/AreScene/AreScene.context";
import { AreStore } from "@adaas/are/context/AreStore/AreStore.context";
import { AreNode } from "@adaas/are/entities/AreNode/AreNode.entity";
import { AreInitSignal } from "src/signals/AreInit.signal";


export class ABtn extends Are {


    async template() {
        return `<button class="a-btn" @click="handleClick">{{name}}</button> <a-input a-if="showInput" @click="handleclikc"></a-input>`;
    }


    async styles(): Promise<string> {
        return `
            .a-btn {
                padding: 10px 20px;
                background-color: {{bgColor}}!important;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 16px;
            }
        `
    }

    async data() {
        return {
            name: 'A_Button Element',
            bgColor: '#007BFF',
        };
    }

    @Are.onBeforeLoad
    async onLoad(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Logger) logger: A_Logger,
    ) {
        logger.debug('red', `Before ABtn Component Load ... : <${node.aseid.entity}> : ${node.aseid.toString()}`);
    }

    @Are.onAfterLoad
    async onAfterLoad(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Logger) logger: A_Logger,
    ) {
        logger.debug('red', `After ABtn Component Load ... : <${node.aseid.entity}> : ${node.aseid.toString()}`);
    }

    @Are.EventHandler
    async handleClick(
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Logger) logger: A_Logger,
        @A_Inject(AreEvent) event: AreEvent,
        @A_Inject(AreScene) scene: AreScene,
    ) {

        store.set('name', 'Button Clicked!');

        store.set('bgColor', '#ff5733');

        console.log('event data:', event);

       await node.update();

        // await new AreUpdateSignal(node).next(scope);
    }

}