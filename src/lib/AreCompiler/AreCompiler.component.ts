import { A_Caller, A_Component, A_Container, A_Context, A_Dependency, A_Error, A_Feature, A_FormatterHelper, A_Inject, A_Scope, A_TYPES__EntityFeatures, ASEID } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame";
import { AreIndex } from "@adaas/are/index";
import { AreScene } from "@adaas/are/scene";
import { AreNode, AreNodeFeatures } from "@adaas/are/node";
import {
    AreSceneInstructionFeatures,
    AttachRootNodeInstruction,
    MountNodeInstruction,
    UnmountNodeInstruction,
    AddStyleInstruction,
    AttachListenerInstruction,
    AddAttributeInstruction,
    ReplaceInterpolationInstruction,
    AddDirectiveInstruction,
} from "@adaas/are/scene-instruction";
import { AreSyntax } from "@adaas/are/syntax";
import { A_ExecutionContext } from "@adaas/a-utils/a-execution";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { A_SignalBusFeatures, A_SignalState, A_SignalVector } from "@adaas/a-utils/a-signal";
import { Are, AreContext, AreFeatures } from "@adaas/are/component";
import { AreProps } from "@adaas/are/props";
import { AreStore } from "@adaas/are/store";
import { AreEvent } from "@adaas/are/event";
import { AreCompilerError } from "./AreCompiler.error";



@A_Frame.Component({
    namespace: 'A-ARE',
    name: 'AreCompiler',
    description: 'AreCompiler is responsible for compiling AreNodes into their respective components, managing the compilation lifecycle, and ensuring that each node is processed according to its defined behavior within the A-Concept Rendering Engine (ARE) framework.'
})
export class AreCompiler extends A_Component {



    // ==================================================================================
    // ========================= COMPONENT METHODS ======================================
    // ==================================================================================
    index(node: AreNode) {

    }

    component(node: AreNode): Are | undefined {
        let scope: A_Scope

        try {
            scope = node.scope
        } catch (error) {
            scope = A_Context.scope(this)
        }

        return scope.resolve<Are>(A_FormatterHelper.toPascalCase(node.aseid.entity)) as Are | undefined;
    }
    // ==================================================================================
    // ========================= ARE-NODE METHODS ======================================
    // ==================================================================================

    // -----------------------------------------------------------------------------------------
    // ----------------------------Are-Node Load Section----------------------------------------
    // -----------------------------------------------------------------------------------------
    /**
     * Handles before load lifecycle of the AreNode
     * 
     * @param node 
     * @param scope 
     * @param feature 
     * @param args 
     */
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


        const component = scope.resolveOnce<Are>(A_FormatterHelper.toPascalCase(node.aseid.entity));

        if (component)
            await feature.chain(component, AreFeatures.onBeforeLoad, node.scope);
    }

    /**
     * Loads the AreNode into the AreScene
     * 
     * @param node 
     * @param scope 
     * @param syntax 
     * @param feature 
     * @param logger 
     * @param args 
     */
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
        const loadTimerLabel = `Load Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`;
        console.time(loadTimerLabel);

        console.time(`Load: Component Resolution for <${node.aseid.entity}>`);
        const component = this.component(node);
        console.timeEnd(`Load: Component Resolution for <${node.aseid.entity}>`);


        if (!component && syntax.isCustomNode(node)) {
            logger?.warning(
                'Component Not Found',
                `No component registered for entity: ${node.aseid.entity}. Please ensure that the component is registered in the scope before rendering.`
            );
        }

        console.time(`Load: Scene/Store/Props Creation for <${node.aseid.entity}>`);
        const newNodeScene = new AreScene(node.aseid);
        const newNodeIndex = new AreIndex(node.aseid);
        const newNodeStore = new AreStore(node.aseid);
        const newNodeProps = new AreProps(node.aseid);

        scope.register(newNodeScene);
        scope.register(newNodeIndex);

        if (syntax.isCustomNode(node)) {
            scope.register(newNodeStore);
            scope.register(newNodeProps);
        }
        console.timeEnd(`Load: Scene/Store/Props Creation for <${node.aseid.entity}>`);

        if (component) {
            console.time(`Load: Component Lifecycle Chains for <${node.aseid.entity}>`);
            await feature.chain(component, AreFeatures.onData, scope);
            await feature.chain(component, AreFeatures.onStyles, scope);
            await feature.chain(component, AreFeatures.onTemplate, scope);
            console.timeEnd(`Load: Component Lifecycle Chains for <${node.aseid.entity}>`);
        }

        console.time(`Load: Node Indexing for <${node.aseid.entity}>`);
        this.index(node);
        console.timeEnd(`Load: Node Indexing for <${node.aseid.entity}>`);

        logger?.debug(newNodeScene.debugPrefix + `Loaded component <${node.aseid.entity}> with ${this.constructor.name}`);

        console.time(`Load: Child Nodes Processing for <${node.aseid.entity}>`);
        const sceneNodes = newNodeScene.nodes();
        for (let i = 0; i < sceneNodes.length; i++) {
            const sceneNode = sceneNodes[i];
            const childTimerLabel = `Load: Child Node [${i}] <${sceneNode.aseid.entity}> for Parent <${node.aseid.entity}>`;
            console.time(childTimerLabel);

            if (!newNodeScene.isAttached(sceneNode)) {
                newNodeScene.attach(sceneNode)
                await sceneNode.load();
            }

            console.timeEnd(childTimerLabel);
        }
        console.timeEnd(`Load: Child Nodes Processing for <${node.aseid.entity}>`);

        console.timeEnd(loadTimerLabel);

    }
    /**
     * Handles after load lifecycle of the AreNode
     * 
     * @param node 
     * @param scope 
     * @param scene 
     * @param feature 
     * @param args 
     */
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

        logger?.debug(scene.debugPrefix + `[Load -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        const component = this.component(node);

        if (component)
            await feature.chain(component, AreFeatures.onAfterLoad, node.scope);

    }

    // -----------------------------------------------------------------------------------------
    // ----------------------------Are-Node Compile Section----------------------------------------
    // -----------------------------------------------------------------------------------------
    /**
     * Handles before compile lifecycle of the AreNode
     * 
     * @param node 
     * @param scope 
     * @param scene 
     * @param feature 
     * @param args 
     */
    @A_Feature.Extend({
        name: AreNodeFeatures.onCompile,
        before: /.*/,
        scope: [AreNode]
    })
    beforeCompile(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(A_Feature) feature: A_Feature,
        ...args: any[]
    ) {
        const logger = scope.resolve<A_Logger>(A_Logger);

        logger?.debug(scene.debugPrefix + `[Compile -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        const component = scope.resolveOnce<Are>(A_FormatterHelper.toPascalCase(node.aseid.entity));

        if (component)
            feature.chain(component, AreFeatures.onBeforeCompile, node.scope);
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
    compile(
        /**
         * Actual Node no be compiled
         */
        @A_Inject(A_Caller) node: AreNode,
        /**
         * Nodes owned Scene, Node content
         */
        @A_Dependency.Flat()
        @A_Inject(AreScene) scene: AreScene,
        /**
         * Parent Scene where the node is registered
         */
        @A_Dependency.Parent()
        @A_Inject(AreScene) parentScene: AreScene,
        /**
         * Global Syntax Definition for parsing markup
         */
        @A_Inject(AreSyntax) syntax: AreSyntax,

        @A_Inject(AreProps) props: AreProps,
        @A_Inject(AreStore) store: AreStore,

        @A_Dependency.Parent()
        @A_Inject(AreStore) parentStore: AreStore,

        @A_Inject(A_Logger) logger?: A_Logger,

        @A_Inject(A_Scope) scope?: A_Scope,
    ) {
        const compileTimerLabel = `Compile Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`;
        console.time(compileTimerLabel);

        try {
            //  the case when it's NOT a RootNode
            if (!syntax.isRootNode(node)) {

                logger?.debug('violet', scene.debugPrefix + `Compiling node <${node.aseid.entity}> in Scene <${parentScene.name}>`);

                console.time(`Compile: Mount Instruction Planning for <${node.aseid.entity}>`);
                // -------------------------------------------------------
                // 1) index the scene and plan Mount Node instruction
                // -------------------------------------------------------
                const mountInstruction = new MountNodeInstruction(node, scene.path);

                if (!parentScene.isPlanned(mountInstruction)) {
                    logger?.debug('red', scene.debugPrefix + `Planning Node Mount for Node <${node.type}> ASEID: <${node.aseid.entity}>`);

                    parentScene.plan(mountInstruction);
                    mountInstruction.init();
                }
                console.timeEnd(`Compile: Mount Instruction Planning for <${node.aseid.entity}>`);

                console.time(`Compile: Template Interpolation Processing for <${node.aseid.entity}>`);
                if (syntax.isCustomNode(node)) {
                    const interpolations = syntax.extractInterpolations(node.template);
                    for (let i = 0; i < interpolations.length; i++) {
                        const interpolation = interpolations[i];
                        console.time(`Compile: Interpolation [${i}] "${interpolation.name}" for <${node.aseid.entity}>`);

                        const value = store.get(interpolation.name) || parentStore.get(interpolation.name);

                        const instruction = new ReplaceInterpolationInstruction(node, interpolation, value);

                        const stateInstruction = parentScene.getState(instruction);

                        instruction.update({ value, prevValue: stateInstruction?.value });

                        if (!parentScene.isPlanned(instruction)) {
                            parentScene.plan(instruction);
                            instruction.init();
                        } else {
                            parentScene.dropState(instruction);
                            parentScene.unPlan(instruction);
                            parentScene.plan(instruction);
                        }

                        console.timeEnd(`Compile: Interpolation [${i}] "${interpolation.name}" for <${node.aseid.entity}>`);
                    }
                }
                console.timeEnd(`Compile: Template Interpolation Processing for <${node.aseid.entity}>`);

                console.time(`Compile: Attributes Processing for <${node.aseid.entity}>`);
                // 1) extract all props from the markup and set them in the props store
                const attributes = syntax.extractAttributes(node.markup);
                for (let i = 0; i < attributes.length; i++) {
                    const attr = attributes[i];
                    console.time(`Compile: Attribute [${i}] "${attr.name}" for <${node.aseid.entity}>`);

                    const name = attr.name;
                    const value = (syntax.isBindingProp(attr) ?
                        store.get(attr.value) || parentStore.get(attr.value)
                        : attr.value) || '';

                    props.set(name, value);

                    parentScene.plan(new AddAttributeInstruction(node, name, value));

                    console.timeEnd(`Compile: Attribute [${i}] "${attr.name}" for <${node.aseid.entity}>`);
                }
                console.timeEnd(`Compile: Attributes Processing for <${node.aseid.entity}>`);

                console.time(`Compile: Directives Processing for <${node.aseid.entity}>`);
                // 3a) Process directives first before other operations
                const directives = syntax.extractDirectives(node.markup);
                for (let i = 0; i < directives.length; i++) {
                    const directive = directives[i];
                    console.time(`Compile: Directive [${i}] "${directive.name}" for <${node.aseid.entity}>`);

                    let directiveValue: any;

                    // Get the directive value from store or props
                    if (directive.value) {
                        directiveValue = store.get(directive.value) || parentStore.get(directive.value);
                    }

                    let instruction = new AddDirectiveInstruction(node, directive, directiveValue);

                    const stateInstruction = parentScene.getState(instruction);

                    if (!stateInstruction || stateInstruction.value !== directiveValue) {
                        parentScene.unPlan(instruction);
                        parentScene.plan(instruction);

                        instruction.init();
                    }

                    console.timeEnd(`Compile: Directive [${i}] "${directive.name}" for <${node.aseid.entity}>`);
                }
                console.timeEnd(`Compile: Directives Processing for <${node.aseid.entity}>`);

                console.time(`Compile: Styles Processing for <${node.aseid.entity}>`);
                // -------------------------------------------------------
                // 2) replace all style interpolations in the styles
                // -------------------------------------------------------
                let styles = node.styles || '';
                const styleInterpolations = syntax.extractInterpolations(styles);
                for (let i = 0; i < styleInterpolations.length; i++) {
                    const interpolation = styleInterpolations[i];
                    console.time(`Compile: Style Interpolation [${i}] "${interpolation.name}" for <${node.aseid.entity}>`);

                    const value = store.get(interpolation.name);
                    styles = syntax.replaceInterpolation(styles, interpolation, value);

                    console.timeEnd(`Compile: Style Interpolation [${i}] "${interpolation.name}" for <${node.aseid.entity}>`);
                }

                if (styles.trim()) {
                    const instruction = new AddStyleInstruction(node, styles);

                    if (!parentScene.isPlanned(instruction)) {
                        parentScene.plan(instruction);
                        instruction.init();
                    }
                }
                console.timeEnd(`Compile: Styles Processing for <${node.aseid.entity}>`);

                console.time(`Compile: Listeners Processing for <${node.aseid.entity}>`);
                // -------------------------------------------------------
                // 3) go through all listeners and register them in the scene
                // -------------------------------------------------------
                const listeners = syntax.extractListeners(node.markup);
                for (let i = 0; i < listeners.length; i++) {
                    const listener = listeners[i];
                    console.time(`Compile: Listener [${i}] "${listener.name}" for <${node.aseid.entity}>`);

                    //  target emitter should be custom component that owns the listener
                    let currentScene = scene;
                    let targetNode = node

                    while (!syntax.isCustomNode(targetNode) && currentScene.parent) {
                        targetNode = currentScene.parent.scope.resolve<AreNode>(new A_Dependency(AreNode, {
                            query: {
                                aseid: currentScene.id
                            }
                        })) as AreNode

                        currentScene = currentScene.parent;
                    }

                    const instruction = new AttachListenerInstruction(node, targetNode, listener);

                    if (!parentScene.isPlanned(instruction)) {
                        parentScene.plan(instruction);
                        instruction.init();
                    }

                    console.timeEnd(`Compile: Listener [${i}] "${listener.name}" for <${node.aseid.entity}>`);
                }
                console.timeEnd(`Compile: Listeners Processing for <${node.aseid.entity}>`);
            }

            console.time(`Compile: Child Nodes Compilation for <${node.aseid.entity}>`);
            const sceneNodes = scene.nodes();
            for (let i = 0; i < sceneNodes.length; i++) {
                const sceneNode = sceneNodes[i];
                const childTimerLabel = `Compile: Child Node [${i}] <${sceneNode.aseid.entity}> for Parent <${node.aseid.entity}>`;
                console.time(childTimerLabel);

                sceneNode.compile();

                console.timeEnd(childTimerLabel);
            }
            console.timeEnd(`Compile: Child Nodes Compilation for <${node.aseid.entity}>`);

        } catch (error) {
            logger?.error(error);
        }

        console.timeEnd(compileTimerLabel);
    }
    /**
     * Handles after compile lifecycle of the AreNode
     * 
     * @param node 
     * @param scope 
     * @param scene 
     * @param feature 
     * @param args 
     */
    @A_Feature.Extend({
        name: AreNodeFeatures.onCompile,
        after: /.*/,
        scope: [AreNode]
    })
    afterCompile(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(A_Feature) feature: A_Feature,
        ...args: any[]
    ) {
        const logger = scope.resolve<A_Logger>(A_Logger);
        const component = scope.resolveOnce<Are>(A_FormatterHelper.toPascalCase(node.aseid.entity));

        logger?.debug(scene.debugPrefix + `[Compile -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        if (component)
            feature.chain(component, AreFeatures.onAfterCompile, node.scope);
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

        const component = scope.resolveOnce<Are>(A_FormatterHelper.toPascalCase(node.aseid.entity));

        if (component) {

            try {

                await feature.chain(component, event.name, scope);

            } catch (error) {
                logger?.error(error);
            }
        }
    }

    // -----------------------------------------------------------------------------------------
    // ----------------------------Are-Node Render Section----------------------------------------
    // -----------------------------------------------------------------------------------------
    /**
     *  Handles before render lifecycle of the AreNode
     * 
     * @param node 
     * @param scope 
     * @param scene 
     * @param feature 
     * @param args 
     */
    @A_Feature.Extend({
        name: AreNodeFeatures.onBeforeRender,
        before: /.*/,
        scope: [AreNode]
    })
    beforeRender(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(A_Feature) feature: A_Feature,
        ...args: any[]
    ) {
        const logger = scope.resolve<A_Logger>(A_Logger);
        const component = scope.resolveOnce<Are>(A_FormatterHelper.toPascalCase(node.aseid.entity));

        logger?.debug(scene.debugPrefix + `[Render -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        if (component)
            feature.chain(component, AreFeatures.onBeforeRender, node.scope);
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
    render(
        /**
         * Node to be mounted
         */
        @A_Inject(A_Caller) node: AreNode,
        /**
         * Template Parsing Syntax to be used
         */
        @A_Inject(AreSyntax) syntax: AreSyntax,
        /**
         * Node Content
         */
        @A_Dependency.Flat()
        @A_Inject(AreScene) scene: AreScene,
        /**
         * Scene where target node is registered
         * 
         * [!] For Root Node it doesn't exists
         */
        @A_Dependency.Parent()
        @A_Inject(AreScene) parentScene?: AreScene,


        @A_Inject(A_Logger) logger?: A_Logger,
        ...args: any[]
    ) {
        const renderTimerLabel = `Render Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`;
        console.time(renderTimerLabel);

        if (syntax.isRootNode(node)) {
            logger?.debug('red', scene.debugPrefix + `Rendering Root Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`);

            console.time(`Render: Root Node Attachment for <${node.aseid.entity}>`);
            new AttachRootNodeInstruction(node).apply(node.scope);
            console.timeEnd(`Render: Root Node Attachment for <${node.aseid.entity}>`);
        } else {

            if (!parentScene) {
                throw new AreCompilerError(
                    AreCompilerError.RenderError,
                    `Parent Scene not found for Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()} during render process.`
                );
            }

            logger?.debug('red', scene.debugPrefix + `Rendering  Child Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`, parentScene);

            console.time(`Render: Mount/Unmount Instructions Processing for <${node.aseid.entity}>`);
            // 1) should be mounted or unmounted
            const mountUnmountInstructions = parentScene.renderPlanFor(node, {
                filter: (inst) => inst instanceof MountNodeInstruction || inst instanceof UnmountNodeInstruction,
            });

            for (let i = 0; i < mountUnmountInstructions.length; i++) {
                const instruction = mountUnmountInstructions[i];
                const instructionTimerLabel = `Render: Mount/Unmount Instruction [${i}] "${instruction.action}" for <${node.aseid.entity}>`;
                console.time(instructionTimerLabel);

                if (parentScene.getState(instruction)) {
                    logger?.debug('yellow', scene.debugPrefix + `Skipping Action '${instruction.action}' for Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()} already processed.`);
                    console.timeEnd(instructionTimerLabel);
                    continue;
                }

                logger?.debug('red', scene.debugPrefix + `Processing ${instruction.action} Instruction for Node <${node.aseid.entity}> `);

                instruction.apply();
                parentScene.setState(instruction);

                console.timeEnd(instructionTimerLabel);
            }
            console.timeEnd(`Render: Mount/Unmount Instructions Processing for <${node.aseid.entity}>`);

            //  if There's no Mount Instruction planned, ite means that this node should not be rendered 
            //  and any other instructions related to it should be ignored
            if (!parentScene.isPlanned(new MountNodeInstruction(node, scene.path))) {
                logger?.debug('yellow', scene.debugPrefix + `No Mount Instruction found for Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}. Skipping...`);
                console.timeEnd(renderTimerLabel);
                return;
            }

            console.time(`Render: Other Instructions Processing for <${node.aseid.entity}>`);
            // 2) process other instructions
            const otherInstructions = parentScene.renderPlanFor(node, {
                order: [
                    AddStyleInstruction,
                    AttachListenerInstruction,
                    AddAttributeInstruction,
                    ReplaceInterpolationInstruction
                ]
            });

            for (let i = 0; i < otherInstructions.length; i++) {
                const instruction = otherInstructions[i];
                const instructionTimerLabel = `Render: Instruction [${i}] "${instruction.action}" for <${node.aseid.entity}>`;
                console.time(instructionTimerLabel);

                if (parentScene.getState(instruction)) {
                    logger?.debug('yellow', scene.debugPrefix + `Skipping Action '${instruction.action}' for Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()} already processed.`);
                    console.timeEnd(instructionTimerLabel);
                    continue;
                }

                try {
                    console.time(`Render: Execution Context Creation for Instruction [${i}] <${node.aseid.entity}>`);
                    const executionContext = new A_ExecutionContext('AreBrowserCompiler: Mount Node Instruction');
                    executionContext.set('content', scene)
                    const applyScope = new A_Scope({ fragments: [executionContext] }).inherit(node.scope);
                    console.timeEnd(`Render: Execution Context Creation for Instruction [${i}] <${node.aseid.entity}>`);

                    console.time(`Render: Instruction Apply for [${i}] "${instruction.action}" <${node.aseid.entity}>`);
                    instruction.apply(applyScope);
                    console.timeEnd(`Render: Instruction Apply for [${i}] "${instruction.action}" <${node.aseid.entity}>`);

                    applyScope.destroy();
                    parentScene.setState(instruction);

                } catch (error) {
                    logger?.error(error);
                }

                console.timeEnd(instructionTimerLabel);
            }
            console.timeEnd(`Render: Other Instructions Processing for <${node.aseid.entity}>`);
        }

        console.time(`Render: Child Nodes Rendering for <${node.aseid.entity}>`);
        const childNodes = scene.nodes();
        for (let i = 0; i < childNodes.length; i++) {
            const child = childNodes[i];
            const childTimerLabel = `Render: Child Node [${i}] <${child.aseid.entity}> for Parent <${node.aseid.entity}>`;
            console.time(childTimerLabel);

            console.log(scene.debugPrefix + `Rendering Child Node <${child.aseid.entity}> ASEID: ${child.aseid.toString()}`);
            child.render();

            console.timeEnd(childTimerLabel);
        }
        console.timeEnd(`Render: Child Nodes Rendering for <${node.aseid.entity}>`);

        console.timeEnd(renderTimerLabel);
    }
    /**
     * Handles after render lifecycle of the AreNode
     * 
     * @param node 
     * @param scope 
     * @param scene 
     * @param feature 
     * @param args 
     */
    @A_Feature.Extend({
        name: AreNodeFeatures.onAfterRender,
        after: /.*/,
        scope: [AreNode]
    })
    afterRender(
        /**
         * Node to be rendered
         */
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(A_Feature) feature: A_Feature,
        ...args: any[]
    ) {
        const logger = scope.resolve<A_Logger>(A_Logger);
        const component = this.component(node);

        logger?.debug(scene.debugPrefix + `[Render -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);


        if (component)
            feature.chain(component, AreFeatures.onAfterRender, node.scope);

    }

    // -----------------------------------------------------------------------------------------
    // ----------------------------Are-Node Update Section----------------------------------------
    // -----------------------------------------------------------------------------------------
    /**
     * Handles before update lifecycle of the AreNode
     * 
     * @param node 
     * @param scope 
     * @param scene 
     * @param feature 
     * @param args 
     */
    @A_Feature.Extend({
        name: AreNodeFeatures.onUpdate,
        before: /.*/,
        scope: [AreNode]
    })
    beforeUpdate(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(A_Feature) feature: A_Feature,
        ...args: any[]
    ) {
        const logger = scope.resolve<A_Logger>(A_Logger);

        logger?.debug(scene.debugPrefix + `[Update -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        const component = this.component(node);

        if (component)
            feature.chain(component, AreFeatures.onBeforeUpdate, node.scope);
    }
    /**
     * Updates the AreNode in the AreScene
     * 
     * @param node 
     * @param scene 
     * @param args 
     */
    @A_Feature.Extend({
        name: AreNodeFeatures.onUpdate,
        scope: [AreNode]
    })
    update(
        /**
         * Node to be updated
         */
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreScene) scene: AreScene,

        ...args: any[]
    ) {
        console.time(scene.debugPrefix + `Updating Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`);

        console.time(`Node Compile Time for <${node.aseid.entity}> ASEID: ${node.aseid.toString()}>`);
        node.compile();
        console.timeEnd(`Node Compile Time for <${node.aseid.entity}> ASEID: ${node.aseid.toString()}>`);

        console.time(`Node Render Time for <${node.aseid.entity}> ASEID: ${node.aseid.toString()}>`);
        node.render();
        console.timeEnd(`Node Render Time for <${node.aseid.entity}> ASEID: ${node.aseid.toString()}>`);

        console.timeEnd(scene.debugPrefix + `Updating Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`);

    }
    /**
     * Handles after update lifecycle of the AreNode
     * 
     * @param node 
     * @param scope 
     * @param scene 
     * @param feature 
     * @param args 
     */
    @A_Feature.Extend({
        name: AreNodeFeatures.onUpdate,
        after: /.*/,
        scope: [AreNode]
    })
    afterUpdate(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(A_Feature) feature: A_Feature,
        ...args: any[]
    ) {
        const logger = scope.resolve<A_Logger>(A_Logger);

        logger?.debug(scene.debugPrefix + `[Update -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        const component = this.component(node);

        if (component)
            feature.chain(component, AreFeatures.onAfterUpdate, node.scope);
    }

    // -----------------------------------------------------------------------------------------
    // ----------------------------Are-Node Unmount Section----------------------------------------
    // -----------------------------------------------------------------------------------------
    /**
     * Handles before unmount lifecycle of the AreNode
     * 
     * @param node 
     * @param scope 
     * @param scene 
     * @param feature 
     * @param args 
     */
    @A_Feature.Extend({
        name: AreNodeFeatures.onUnmount,
        before: /.*/,
        scope: [AreNode]
    })
    beforeUnmount(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(A_Feature) feature: A_Feature,
        ...args: any[]
    ) {
        const logger = scope.resolve<A_Logger>(A_Logger);

        logger?.debug(scene.debugPrefix + `[Unmount -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        const component = this.component(node);

        if (component)
            feature.chain(component, AreFeatures.onBeforeUnmount, node.scope);
    }
    /**
     * Unmounts the AreNode from the AreScene
     * 
     * @param node 
     * @param syntax 
     * @param scene 
     * @param parentScene 
     * @param logger 
     */
    @A_Feature.Extend({
        name: AreNodeFeatures.onUnmount,
        scope: [AreNode]
    })
    unmount(
        /**
         * Node to be unmounted
         */
        @A_Inject(A_Caller) node: AreNode,
        /**
         * Template Parsing Syntax to be used
         */
        @A_Inject(AreSyntax) syntax: AreSyntax,
        /**
         * Node Content
         */
        @A_Dependency.Flat()
        @A_Inject(AreScene) scene: AreScene,
        /**
         * Scene where target node is registered
         * 
         * [!] For Root Node it doesn't exists
         */
        @A_Dependency.Parent()
        @A_Inject(AreScene) parentScene?: AreScene,

        @A_Inject(A_Logger) logger?: A_Logger,
    ) {
        try {


            logger?.debug('red', scene.debugPrefix + `Unmounting Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`);

            if (!syntax.isRootNode(node)) {
                if (!parentScene) {
                    throw new AreCompilerError(
                        AreCompilerError.RenderError,
                        `Parent Scene not found for Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()} during unmount process.`
                    );
                }

                for (const instruction of parentScene.renderPlanFor(node)) {
                    if (instruction.node === node) {
                        instruction.revert(node.scope);
                        parentScene.dropState(instruction);
                        parentScene.unPlan(instruction);
                    }
                }
            }

            for (const child of scene.nodes()) {
                child.unmount();
            }

            // await node.reset();
        } catch (error) {
            logger?.error(error);
        }
    }
    /**
     * Handles after unmount lifecycle of the AreNode
     * 
     * @param node 
     * @param scope 
     * @param scene 
     * @param feature 
     * @param args
     */
    @A_Feature.Extend({
        name: AreNodeFeatures.onUnmount,
        after: /.*/,
        scope: [AreNode]
    })
    afterUnmount(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(A_Feature) feature: A_Feature,
        ...args: any[]
    ) {
        const logger = scope.resolve<A_Logger>(A_Logger);

        logger?.debug(scene.debugPrefix + `[Unmount -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        const component = this.component(node);

        if (component)
            feature.chain(component, AreFeatures.onAfterUnmount, node.scope);
    }


    @A_Feature.Extend({
        name: A_SignalBusFeatures.onNext,
    })
    handleSignalVector(
        @A_Inject(A_SignalVector) vector: A_SignalVector,
        @A_Inject(AreContext) context: AreContext,
        @A_Inject(A_SignalState) state: A_SignalState,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(A_Logger) logger?: A_Logger,
    ) {
        logger?.info(`Handling Signal Vector with ${context.roots.length} root nodes.`);

        try {
            for (const root of context.roots) {

                const callScope = new A_Scope({
                    fragments: [new AreEvent(
                        AreFeatures.onSignal, {
                        event: 'SignalVectorNext',
                        data: { vector }
                    })]
                })
                    .import(scope, root.scope);

                console.log('Emitting signal for root node:', vector);

                root.emit(callScope);

                callScope.destroy();
            }
        } catch (error) {
            logger?.error(error);
        }

    }

}