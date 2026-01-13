import { A_Caller, A_Component, A_Context, A_Dependency, A_Feature, A_FormatterHelper, A_Inject, A_Scope, A_TYPES__EntityFeatures } from "@adaas/a-concept";
import { A_Config, A_Logger, A_LOGGER_COLORS, A_ServiceFeatures, A_Signal_Init, A_SignalBus, A_SignalVector, A_SignalVectorFeatures } from "@adaas/a-utils";
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



    protected debug(node: AreNode, message: string) {

        // const scene = A_Context.scope(node).resolve(AreScene)!;
        const scene = node.scope.resolve(AreScene)!;

        A_Context.scope(this).resolve(A_Logger)?.debug(
            'magenta',
            `${' - '.repeat(scene.depth)} ${message}`
        );
    }

    @A_Feature.Extend()
    protected async [A_ServiceFeatures.onBeforeLoad](
        @A_Dependency.Parent()
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreScene) root?: AreScene,
        @A_Inject(A_Config) config?: A_Config<any>,
        @A_Inject(A_Logger) logger?: A_Logger,
    ): Promise<void> {
        // 1) Initialize Scene if not present
        logger?.debug('cyan', `Initializing AreBrowserDom in AreBrowserCompiler...`);
        const mountPoint = config?.get('ARE_MOUNT_POINT') || 'are-app';

        if (!root) {
            scope.register(new AreScene(mountPoint));
            scope.register(new AreIndex(mountPoint));
        }
    }

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
        this.debug(node, `[Event -> Handle] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

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
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(A_Feature) feature: A_Feature,
        ...args: any[]
    ) {
        this.debug(node, `[Load -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

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
        console.log('feature', feature);

        this.debug(node, `[Load -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

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
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(AreSyntax) syntax: AreSyntax,

        @A_Inject(A_Logger) logger?: A_Logger,
        ...args: any[]
    ) {

        const component = this.component(node, scope);

        if (!component) {
            scope.resolve(A_Logger)?.warning(
                'Component Not Found',
                `No component registered for entity: ${node.aseid.entity}. Please ensure that the component is registered in the scope before rendering.`
            );
            return;
        }
        
        const data = await component.data();
        const template = await component.template();
        const styles = await component.styles();

        const newNodeScene = new AreScene(node.aseid, template);
        const newNodeIndex = new AreIndex(node.aseid);
        const newNodeStore = new AreStore(node.aseid);
        const newNodeProps = new AreProps(node.aseid);

        node.scope.register(newNodeScene);
        node.scope.register(newNodeIndex);
        node.scope.register(newNodeStore);
        node.scope.register(newNodeProps);



        // .replace(/\s+/g, ' ').trim();

        // const scene = scope.resolve<AreScene>(AreScene)!;

        // Add styles to the scene
        // await scene.addStyles(node, styles);

        // Update scene with template that can be modified via later during compile phase
        // await scene.reset(node.template);

        const store = scope.resolve<AreStore>(AreStore)!;

        // Update store with component default data
        store.setMultiple(data);


        // Copy original template to the node
        node.template = template
        // .replace(/\s+/g, ' ').trim();
        node.styles = styles

        this.debug(node, `Loaded component <${node.aseid.entity}> with ${this.constructor.name}`);
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
        this.debug(node, `[Compile -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

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

        this.debug(node, `[Compile -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        const component = scope.resolve<Are>(A_FormatterHelper.toPascalCase(node.aseid.entity));


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
        this.debug(node, `[Render -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        const component = scope.resolve<Are>(A_FormatterHelper.toPascalCase(node.aseid.entity));

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
        this.debug(node, `[Render -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        const component = scope.resolve<Are>(A_FormatterHelper.toPascalCase(node.aseid.entity));

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

        @A_Dependency.Required()
        @A_Inject(AreScene) parentScene: AreScene,
        ...args: any[]
    ) {

        this.debug(node, `Rendering node <${node.aseid.entity}> into ${scene.name}`);

        for (const newNode of scene.nodes()) {

            scene.attach(newNode);

            await newNode.load();

            await newNode.compile();

        }


        this.debug(node, `Node <${node.aseid.entity}> rendered successfully.`);
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

    }



    @A_Feature.Extend({
        name: A_TYPES__EntityFeatures.DESTROY,
        scope: [AreNode]
    })
    async destroy() {

    }





}