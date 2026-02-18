import { A_Caller, A_Feature, A_FormatterHelper, A_Inject, A_Scope } from "@adaas/a-concept";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { Are, AreEvent, AreNode, AreScene, AreStore } from "src";


export class ABtn extends Are {


    @Are.Template
    async template(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreStore) store: AreStore,
    ) {
        node.setTemplate(`
        <button class="a-btn" @click="handleClick"> Make it:  {{name}} {{number}}</button> 
            <a-input $if="showInput" ></a-input>
        <button class="a-btn" @click="handleClick2"> Do:  {{btn2}}</button> 
            <a-input $if="showInput2" ></a-input>
        `);
    }


    @Are.Styles
    async styles(
        @A_Inject(A_Caller) node: AreNode,
    ): Promise<void> {
        node.setStyles(`
            .a-btn {
                padding: 10px 20px;
                background-color: {{bgColor}}!important;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 16px;
            }
        `);
    }

    @Are.Data
    async data(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreStore) store: AreStore,
    ) {
        store.set({
            name: 'A_Button Element',
            showInput: false,
            bgColor: '#007BFF',
            btn2: 'Button 2',
            showInput2: false,
            number: 0,
        });
    }

    // @Are.onBeforeLoad
    // async onLoad(
    //     @A_Inject(A_Caller) node: AreNode,
    //     @A_Inject(AreStore) store: AreStore,
    //     @A_Inject(A_Logger) logger: A_Logger,
    // ) {
    //     logger.debug('red', `Before ABtn Component Load ... : <${node.aseid.entity}> : ${node.aseid.toString()}`);
    // }

    // @Are.onAfterLoad
    // async onAfterLoad(
    //     @A_Inject(A_Caller) node: AreNode,
    //     @A_Inject(AreStore) store: AreStore,
    //     @A_Inject(A_Logger) logger: A_Logger,
    // ) {
    //     logger.debug('red', `After ABtn Component Load ... : <${node.aseid.entity}> : ${node.aseid.toString()}`);
    // }

    @Are.EventHandler
    async handleClick(
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Logger) logger: A_Logger,
        @A_Inject(AreEvent) event: AreEvent,
        @A_Inject(AreScene) scene: AreScene,
    ) {

        //  just set random Text
        store.set('number', Math.floor(Math.random() * 1000));
        store.set('name', `Clicked! `);

        console.log('Changing ShowInput from ', store.get('showInput'));
        store.set('showInput', !store.get('showInput'));

        console.log('Changing ShowInput to ', store.get('showInput'), store);

        store.set('bgColor', '#ff5733');

        console.log('event data:', event);

        await node.update();

        // await new AreUpdateSignal(node).next(scope);
    }


    @Are.EventHandler
    async handleClick2(
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Logger) logger: A_Logger,
        @A_Inject(AreEvent) event: AreEvent,
        @A_Inject(AreScene) scene: AreScene,
    ) {

        //  just set random Text
        store.set('btn2', `Button 2 Clicked! `);

        store.set('showInput2', !store.get('showInput2'));

        console.log('event data:', event);

        await node.update();

        // await new AreUpdateSignal(node).next(scope);
    }

}