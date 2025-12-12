import { A_Caller, A_Component, A_Context, A_Dependency, A_Feature, A_FormatterHelper, A_Inject, A_Scope, A_TYPES__EntityFeatures } from "@adaas/a-concept";
import { A_Logger, A_LOGGER_COLORS } from "@adaas/a-utils";
import { AreNodeFeatures } from "@adaas/are/entities/AreNode/AreNode.constants";
import { AreNode } from "@adaas/are/entities/AreNode/AreNode.entity";
import { AreFeatures } from "../AreComponent/Are.constants";
import { AreStore } from "@adaas/are/context/AreStore/AreStore.context";
import { AreScene } from "@adaas/are/context/AreScene/AreScene.context";
import { Are } from "../AreComponent/Are.component";
import { AreIndex } from "@adaas/are/context/AreIndex/AreIndex.context";
import { AreProps } from "@adaas/are/context/AreProps/AreProps.context";

export class AreCompiler extends A_Component {

    /**
     * Determines if a tag is a custom component or standard HTML
     * 
     * @param node 
     * @returns 
     */
    isCustomComponent(node: AreNode): boolean {
        return node.aseid.entity.toLowerCase().startsWith('a-');
    }


    protected debugLogger(scene: AreScene, message: string) {
        A_Context.scope(this).resolve(A_Logger)?.debug(
            'magenta',
            `${' - '.repeat(scene.depth)} ${message}`
        );
    }



    // ==================================================================================
    // ========================= COMPONENT METHODS =======================================
    // ==================================================================================

    @A_Feature.Extend({
        name: A_TYPES__EntityFeatures.LOAD,
        before: /.*/,
        scope: [AreNode]
    })
    async beforeLoad(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreScene) scene: AreScene,
        ...args: any[]
    ) {
        this.debugLogger(scene, `[Load -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        const component = scope.resolve<Are>(A_FormatterHelper.toPascalCase(node.aseid.entity));

        component?.call(AreFeatures.onBeforeLoad, node.scope);
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
        ...args: any[]
    ) {
        this.debugLogger(scene, `[Load -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        const component = scope.resolve<Are>(A_FormatterHelper.toPascalCase(node.aseid.entity));

        component?.call(AreFeatures.onAfterLoad, node.scope);
    }

    @A_Feature.Extend({
        name: A_TYPES__EntityFeatures.LOAD,
        scope: [AreNode]
    })
    async load(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(A_Scope) scope: A_Scope,
        ...args: any[]
    ) {

        // node.scope.register(new AreScene(node.aseid.id));
        node.scope.register(new AreIndex(node.aseid));
        node.scope.register(new AreStore(node.aseid));
        node.scope.register(new AreProps(node.aseid));


        const component = scope.resolve<Are>(A_FormatterHelper.toPascalCase(node.aseid.entity));

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

        node.template = template;
        node.styles = styles;

        const store = scope.resolve<AreStore>(AreStore)!;

        store.setMultiple(data);

        this.debugLogger(scene, `Loaded component <${node.aseid.entity}> with ${this.constructor.name}`);
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
        ...args: any[]
    ) {
        this.debugLogger(scene, `[Compile -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        const component = scope.resolve<Are>(A_FormatterHelper.toPascalCase(node.aseid.entity));

        component?.call(AreFeatures.onBeforeCompile, node.scope);
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
        ...args: any[]
    ) {

        this.debugLogger(scene, `[Compile -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        const component = scope.resolve<Are>(A_FormatterHelper.toPascalCase(node.aseid.entity));

        component?.call(AreFeatures.onAfterCompile, node.scope);
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
        name: AreNodeFeatures.onRender,
        before: /.*/,
        scope: [AreNode]
    })
    async beforeRender(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreScene) scene: AreScene,
        ...args: any[]
    ) {
        this.debugLogger(scene, `[Render -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        const component = scope.resolve<Are>(A_FormatterHelper.toPascalCase(node.aseid.entity));

        component?.call(AreFeatures.onBeforeRender, node.scope);
    }

    @A_Feature.Extend({
        name: AreNodeFeatures.onRender,
        after: /.*/,
        scope: [AreNode]
    })
    async afterRender(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreScene) scene: AreScene,
        ...args: any[]
    ) {
        this.debugLogger(scene, `[Render -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        const component = scope.resolve<Are>(A_FormatterHelper.toPascalCase(node.aseid.entity));

        component?.call(AreFeatures.onAfterRender, node.scope);
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

        this.debugLogger(scene, `Rendering node <${node.aseid.entity}> into ${scene.name}`);

        for (const newNode of scene) {


            switch (true) {
                case this.isCustomComponent(newNode): {

                    scene.attach(newNode);

                    await newNode.load();

                    await newNode.compile();

                    await newNode.render();

                    await scene.mount(newNode);

                    break;
                }

                default: {
                    break;
                }
            }
        }


        this.debugLogger(scene, `Node <${node.aseid.entity}> rendered successfully.`);
    }


    /**
     * Updates the AreNode
     */
    @A_Feature.Extend({
        name: AreNodeFeatures.onUpdate,
        scope: [AreNode]
    })
    async update() {

    }



    @A_Feature.Extend({
        name: A_TYPES__EntityFeatures.DESTROY,
        scope: [AreNode]
    })
    async destroy() {

    }

}