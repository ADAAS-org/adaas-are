import { A_Caller, A_Component, A_Context, A_Dependency, A_Feature, A_FormatterHelper, A_Inject, A_Scope, A_TYPES__EntityFeatures } from "@adaas/a-concept";
import { A_Config, A_Logger, A_LOGGER_COLORS, A_ScheduleObject, A_ServiceFeatures, A_Signal_Init, A_SignalBus, A_SignalVector, A_SignalVectorFeatures } from "@adaas/a-utils";
import { AreNodeFeatures } from "@adaas/are/entities/AreNode/AreNode.constants";
import { AreNode } from "@adaas/are/entities/AreNode/AreNode.entity";
import { AreFeatures } from "../AreComponent/Are.constants";
import { AreStore } from "@adaas/are/context/AreStore/AreStore.context";
import { AreScene } from "@adaas/are/context/AreScene/AreScene.context";
import { Are } from "../AreComponent/Are.component";
import { AreIndex } from "@adaas/are/context/AreIndex/AreIndex.context";
import { AreProps } from "@adaas/are/context/AreProps/AreProps.context";
import { AreInitSignal } from "src/signals/AreInit.signal";
import { AreEvent } from "@adaas/are/context/AreEvent/AreEvent.context";
import { AreSyntax } from "@adaas/are/context/AreSyntax/AreSyntax.context";

export class AreCompiler extends A_Component {


    // ==================================================================================
    // ========================= COMPONENT METHODS =======================================
    // ==================================================================================

    @A_Feature.Extend({
        name: AreNodeFeatures.onEvent,
        scope: [AreNode]
    })
    async event(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreEvent) event: AreEvent,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(A_Feature) feature: A_Feature,
        ...args: any[]
    ) {
        const logger = scope.resolve<A_Logger>(A_Logger);

        logger?.debug(scene.debugPrefix + `Event Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}} for event: ${event.name}`);

        const component = scope.resolve<Are>(A_FormatterHelper.toPascalCase(node.aseid.entity));

        if (component) {
            await feature.chain(component, event.name, scope);
        }
    }


    @A_Feature.Extend({
        name: A_TYPES__EntityFeatures.LOAD,
        before: /.*/,
        scope: [AreNode]
    })
    async beforeLoad(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(A_Feature) feature: A_Feature,
        ...args: any[]
    ) {
        const logger = scope.resolve<A_Logger>(A_Logger);


        const component = scope.resolve<Are>(A_FormatterHelper.toPascalCase(node.aseid.entity));

        if (component)
            await feature.chain(component, AreFeatures.onBeforeLoad, node.scope);
    }


    @A_Feature.Extend({
        name: A_TYPES__EntityFeatures.LOAD,
        after: /.*/,
        scope: [AreNode]
    })
    async afterLoad(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(A_Feature) feature: A_Feature,
        ...args: any[]
    ) {
        const logger = scope.resolve<A_Logger>(A_Logger);

        logger?.debug(scene.debugPrefix + `[
Load -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        const component = this.component(node, scope);

        if (component)
            await feature.chain(component, AreFeatures.onAfterLoad, node.scope);

    }


    component(node: AreNode, scope: A_Scope): Are | undefined {
        return scope.resolve<Are>(A_FormatterHelper.toPascalCase(node.aseid.entity));
    }



    @A_Feature.Extend({
        name: A_TYPES__EntityFeatures.LOAD,
        scope: [AreNode]
    })
    async load(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreSyntax) syntax: AreSyntax,
        @A_Inject(A_Feature) feature: A_Feature,

        @A_Inject(A_Logger) logger?: A_Logger,
        ...args: any[]
    ) {

        const component = this.component(node, scope);


        if (!component && syntax.isCustomNode(node)) {
            logger?.warning(
                'Component Not Found',
                `No component registered for entity: ${node.aseid.entity}. Please ensure that the component is registered in the scope before rendering.`
            );
        }


        const newNodeScene = new AreScene(node.aseid);
        const newNodeIndex = new AreIndex(node.aseid);
        const newNodeStore = new AreStore(node.aseid);
        const newNodeProps = new AreProps(node.aseid);

        node.scope.register(newNodeScene);
        node.scope.register(newNodeIndex);

        if (syntax.isCustomNode(node)) {
            node.scope.register(newNodeStore);
            node.scope.register(newNodeProps);
        }




        if (component) {
            await feature.chain(component, AreFeatures.onData, scope);
            await feature.chain(component, AreFeatures.onStyles, scope);
            await feature.chain(component, AreFeatures.onTemplate, scope);
        }




        logger?.debug(newNodeScene.debugPrefix + `Loaded component <${node.aseid.entity}> with ${this.constructor.name}`);
    }


    @A_Feature.Extend({
        name: AreNodeFeatures.onCompile,
        before: /.*/,
        scope: [AreNode]
    })
    async beforeCompile(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(A_Feature) feature: A_Feature,
        ...args: any[]
    ) {
        const logger = scope.resolve<A_Logger>(A_Logger);

        logger?.debug(scene.debugPrefix + `[Compile -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        const component = scope.resolve<Are>(A_FormatterHelper.toPascalCase(node.aseid.entity));

        if (component)
            await feature.chain(component, AreFeatures.onBeforeCompile, node.scope);
    }

    @A_Feature.Extend({
        name: AreNodeFeatures.onCompile,
        after: /.*/,
        scope: [AreNode]
    })
    async afterCompile(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(A_Feature) feature: A_Feature,
        ...args: any[]
    ) {
        const logger = scope.resolve<A_Logger>(A_Logger);
        const component = scope.resolve<Are>(A_FormatterHelper.toPascalCase(node.aseid.entity));

        logger?.debug(scene.debugPrefix + `[Compile -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);


        if (component)
            await feature.chain(component, AreFeatures.onAfterCompile, node.scope);
    }

    /**
     * Compiles the AreNode using AreCompiler
     * 
     * 
     * @param logger 
     */
    @A_Feature.Extend({
        name: AreNodeFeatures.onCompile,
        scope: [AreNode]
    })
    async compile(
        @A_Inject(A_Caller) node: AreNode,
        ...args: any[]
    ) {

        // Compilation logic can be added here

    }



    @A_Feature.Extend({
        name: AreNodeFeatures.onBeforeRender,
        before: /.*/,
        scope: [AreNode]
    })
    async beforeRender(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(A_Feature) feature: A_Feature,
        ...args: any[]
    ) {

        const logger = scope.resolve<A_Logger>(A_Logger);
        const component = scope.resolve<Are>(A_FormatterHelper.toPascalCase(node.aseid.entity));

        logger?.debug(scene.debugPrefix + `[Render -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        if (component)
            await feature.chain(component, AreFeatures.onBeforeRender, node.scope);
    }

    @A_Feature.Extend({
        name: AreNodeFeatures.onAfterRender,
        after: /.*/,
        scope: [AreNode]
    })
    async afterRender(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(A_Feature) feature: A_Feature,
        ...args: any[]
    ) {
        const logger = scope.resolve<A_Logger>(A_Logger);
        const component = this.component(node, scope);

        logger?.debug(scene.debugPrefix + `[Render -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);


        if (component)
            await feature.chain(component, AreFeatures.onAfterRender, node.scope);

    }


    /**
     * Renders the AreNode into the AreScene
     * 
     * @param scope 
     * @param node 
     * @param scene 
     * @param logger 
     */
    @A_Feature.Extend({
        name: AreNodeFeatures.onRender,
        scope: [AreNode]
    })
    async render(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(A_Scope) scope: A_Scope,

        @A_Dependency.Required()
        @A_Inject(AreScene) parentScene?: AreScene,
        ...args: any[]
    ) {
        const logger = node.scope.resolve<A_Logger>(A_Logger);

        logger?.debug(scene.debugPrefix + `Rendering node <${node.aseid.entity}> into ${scene.name}`);

    }

    index(
        node: AreNode
    ) {

    }


    /**
     * Updates the AreNode
     */
    @A_Feature.Extend({
        name: AreNodeFeatures.onUpdate,
        scope: [AreNode]
    })
    async update(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreScene) scene: AreScene,


        ...args: any[]
    ) {
        await node.compile();

        await node.render();
    }



    @A_Feature.Extend({
        name: A_TYPES__EntityFeatures.DESTROY,
        scope: [AreNode]
    })
    async destroy(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(AreScene) parentScene: AreScene,

        @A_Inject(AreIndex) index: AreIndex,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(AreProps) props: AreProps,
        @A_Inject(A_Scope) scope: A_Scope,

        @A_Inject(A_Logger) logger?: A_Logger,
        ...args: any[]
    ) {

        // logger?.debug(scene.debugPrefix + `Destroying node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`);
        console.log('Destroying node <' + node.aseid.entity + '> ASEID: ' + node.aseid.toString());
        // parentScene.resetState(node);
        // index.clear();
        // store.clear();
        // props.clear();

        for (const child of scene.nodes()) {
            await child.destroy();
        }
    }





}