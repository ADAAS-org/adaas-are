import { A_Caller, A_Component, A_Dependency, A_Feature, A_FormatterHelper, A_Inject, A_Scope, A_TYPES__EntityFeatures } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame";
import { AreIndex } from "@adaas/are/index";
import { AreScene } from "@adaas/are/scene";
import { AreNode, AreNodeFeatures } from "@adaas/are/node";
import {
    ARE_CONSTANTS__DEFAULT_SCENE_INSTRUCTIONS,
    AreDeclarationInstruction,
    AreMutationInstruction,
} from "@adaas/are/scene-instruction";
import { AreSyntax } from "@adaas/are/syntax";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { A_SignalBusFeatures, A_SignalState, A_SignalVector } from "@adaas/a-utils/a-signal";
import { Are, AreContext, AreFeatures } from "@adaas/are/component";
import { AreStore } from "@adaas/are/store";
import { AreEvent } from "@adaas/are/event";
import { AreAttribute, AreBindingAttribute, AreDirectiveAttribute, AreEventAttribute, AreStaticAttribute } from "../AreAttribute";
import { AreInterpolation } from "../AreInterpolation";
import { AreAttributeFeatures } from "../AreAttribute/AreAttribute.constants";
import { AreDirective } from "../AreDirective";
import { AreInterpolationFeatures } from "../AreInterpolation/AreInterpolation.constants";



@A_Frame.Component({
    namespace: 'A-ARE',
    name: 'AreCompiler',
    description: 'AreCompiler is responsible for compiling AreNodes into their respective components, managing the compilation lifecycle, and ensuring that each node is processed according to its defined behavior within the A-Concept Rendering Engine (ARE) framework.'
})
export class AreCompiler extends A_Component {
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

        if (node.component)
            await feature.chain(node.component, AreFeatures.onBeforeLoad, node.scope);
        else
            logger?.warning(
                'Component Not Found',
                `No component registered for entity: ${node.aseid.entity}. Please ensure that the component is registered in the scope before rendering.`
            );
    }

    /**
     * Loads the AreNode 
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
        /**
         * 1. Comparing to StaticNode ComponentNode has own Store
         */
        if (node.component) {
            const storeConstructor = scope.resolveConstructor(AreStore);

            const newNodeStore = new storeConstructor(node.aseid);
            scope.register(newNodeStore);
        }
        const sceneConstructor = scope.resolveConstructor(AreScene);

        const newNodeScene = new sceneConstructor(node.aseid);

        scope.register(newNodeScene);

        if (node.component) {
            await feature.chain(node.component, AreFeatures.onData, scope);
            await feature.chain(node.component, AreFeatures.onStyles, scope);
            await feature.chain(node.component, AreFeatures.onTemplate, scope);
        } else {
            logger?.warning(
                'Component Not Found',
                `No component registered for entity: ${node.aseid.entity}. Please ensure that the component is registered in the scope before rendering.`
            );
        }

        /**
         * 2. extract all attributes (directives, bindings, etc) from the markup
         * and register them in the node scope for later use during compilation and rendering
         */
        const attributes = syntax.extractAttributesV2(node.markup);

        for (let i = 0; i < attributes.length; i++) {
            const attribute = attributes[i];

            scope.register(attribute);
        }

        /**
         * 3. Extract Interpolations, since they are part of the markup and structure and can't be changed or created dynamically like attributes and directives, we need to extract them and register them in the scope for later use during compilation and rendering
         */
        const interpolations = syntax.extractInterpolationsV2(node.markup);

        for (let i = 0; i < interpolations.length; i++) {
            const interpolation = new AreInterpolation({
                key: interpolations[i].key,
                raw: interpolations[i].raw,
                position: interpolations[i].position,
            });

            scope.register(interpolation);
        }


        /**
         * 4. The we need to extract all children from markup and register them as child nodes of the current node, and then load them recursively to extract their attributes, directives, interpolations, and children as well. This is necessary to build the full node tree and to ensure that all nodes are properly loaded and prepared for compilation and rendering.
         */
        const children = syntax.extractChildren(node.markup);

        for (let i = 0; i < children.length; i++) {
            const childNode = children[i];

            node.addChild(childNode);

            await childNode.load();
        }
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
        @A_Inject(A_Feature) feature: A_Feature,
        ...args: any[]
    ) {
        const logger = scope.resolve<A_Logger>(A_Logger);

        logger?.debug(`[Load -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        if (node.component)
            await feature.chain(node.component, AreFeatures.onAfterLoad, node.scope);
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

        logger?.debug(`[Compile -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);


        if (node.component)
            feature.chain(node.component, AreFeatures.onBeforeCompile, node.scope);
    }

    @A_Feature.Extend({
        name: AreNodeFeatures.onCompile,
        scope: [AreNode]
    })
    compile(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreScene) scene: AreScene,
        ...args: any[]
    ) {
        /**
         * 1. Create & register Create Element Instructions to add it if no other cases presented
         * 
         * [!] Note: it can be removed by directives or modified if needed
         */
        scene.register(new AreDeclarationInstruction(
            ARE_CONSTANTS__DEFAULT_SCENE_INSTRUCTIONS.CreateElement,
            {
                tag: node.type,
            }
        ));
        /**
         * 2. Prepare Instructions for directives and add then to render plan.
         */
        for (let i = 0; i < node.directives.length; i++) {
            const directive = node.directives[i];
            directive.compile();
        }
        /**
         * 3. Compile all bindings of the node, since they are part of the structure and content of the node and can affect the rendering logic and instructions, we need to compile them to ensure that they are properly processed and their instructions are added to the render plan.
         */
        for (let i = 0; i < node.bindings.length; i++) {
            const binding = node.bindings[i];
            binding.compile();
        }
        /**
         * 4. Prepare Instructions for attributes and add then to render plan. 
         */
        for (let i = 0; i < node.attributes.length; i++) {
            const attribute = node.attributes[i];
            attribute.compile();
        }
        /**
         * 5. Compile all events of the node, since they are part of the structure and content of the node and can affect the rendering logic and instructions, we need to compile them to ensure that they are properly processed and their instructions are added to the render plan.
         */
        for (let i = 0; i < node.events.length; i++) {
            const event = node.events[i];
            event.compile();
        }
        /**
         * 6. Compile all nested nodes of the root node. 
         */
        for (let i = 0; i < node.children.length; i++) {
            const child = node.children[i];
            child.compile();
        }
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
        name: AreNodeFeatures.onAfterCompile,
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

        logger?.debug(`[Compile -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        if (node.component)
            feature.chain(node.component, AreFeatures.onAfterCompile, node.scope);
    }

    // -----------------------------------------------------------------------------------------
    // ----------------------------Are-Node Mount Section----------------------------------------
    // -----------------------------------------------------------------------------------------
    /**
     *  Handles before mount lifecycle of the AreNode
     * 
     * @param node 
     * @param scope 
     * @param scene 
     * @param feature 
     * @param args 
     */
    @A_Feature.Extend({
        name: AreNodeFeatures.onBeforeMount,
        before: /.*/,
        scope: [AreNode]
    })
    beforeMount(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(A_Feature) feature: A_Feature,
        ...args: any[]
    ) {
        const logger = scope.resolve<A_Logger>(A_Logger);

        logger?.debug(`[Mount -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        if (node.component)
            feature.chain(node.component, AreFeatures.onBeforeMount, node.scope);
    }
    /**
     * Mount the AreNode into the Host
     * 
     * @param scope 
     * @param node 
     * @param scene 
     * @param logger 
     */
    @A_Feature.Extend({
        name: AreNodeFeatures.onMount,
        scope: [AreNode]
    })
    mount(
        /**
         * Node to be mounted
         */
        @A_Inject(A_Caller) node: AreNode,
        /**
         * Node Content
         */
        @A_Inject(AreScene) scene: AreScene,

        @A_Dependency.All()
        @A_Dependency.Flat()
        @A_Inject(AreNode) children: AreNode[],


        @A_Inject(A_Logger) logger?: A_Logger,
        ...args: any[]
    ) {
        /**
         * 1. We should simply run and render node itself.
         */
        node.render();
        /**
         * 2. Then go through all children of the node and mount the.
         */
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            child.mount();
        }
    }

    /**
     * Handles after mount lifecycle of the AreNode
     * 
     * @param node 
     * @param scope 
     * @param scene 
     * @param feature 
     * @param args 
     */
    @A_Feature.Extend({
        name: AreNodeFeatures.onAfterMount,
        after: /.*/,
        scope: [AreNode]
    })
    afterMount(
        /**
         * Node to be mounted
         */
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(A_Feature) feature: A_Feature,
        ...args: any[]
    ) {
        const logger = scope.resolve<A_Logger>(A_Logger);

        logger?.debug(`[Mount -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        if (node.component)
            feature.chain(node.component, AreFeatures.onAfterMount, node.scope);




    }


    // -----------------------------------------------------------------------------------------
    // ----------------------------Are-Node Render Section----------------------------------------
    // -----------------------------------------------------------------------------------------
    @A_Feature.Extend({
        name: AreNodeFeatures.onRender,
        scope: [AreNode]
    })
    render(
        /**
         * Node to be rendered
         */
        @A_Inject(A_Caller) node: AreNode,
        /**
         * Node Content
         */
        @A_Inject(AreScene) scene: AreScene,


        @A_Inject(A_Logger) logger?: A_Logger,
        ...args: any[]
    ) {
        /**
          * 1. First we need to get all changes to be applied and reverted during render operation
          */
        const { toApply, toRevert } = scene.changes
        /**
         * 2. Then we need to revert all instructions from scene
         */
        for (const instruction of toRevert) {
            try {
                instruction.revert();
                scene.unApply(instruction);
            } catch (error) {
                instruction.apply();
                scene.apply(instruction);
            }
        }
        /**
         * 3. Finally we should apply everything that needs to be applied
         */
        for (const instruction of toApply) {
            try {
                /**
                 * 3.1. if everything went well then just simply apply and attach to state this instruction
                 */
                instruction.apply();
                scene.apply(instruction);
            } catch (error) {
                /**
                 * 2.2. if any error happened we simply revert the instruction and remove it from the state
                 */
                instruction.revert();
                scene.unApply(instruction);
            }
        }

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

        logger?.debug(`[Update -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);


        if (node.component)
            feature.chain(node.component, AreFeatures.onBeforeUpdate, node.scope);
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

        @A_Dependency.All()
        @A_Dependency.Flat()
        @A_Inject(AreNode) children: AreNode[],

        ...args: any[]
    ) {
        /**
         * [!!!] TODO: replace it to not go through all children and attributes and directives every time, but only go through the ones that are impacted by the change, for example by using AreCache to track the impacted paths and related attributes and directives, so we can optimize the update process and avoid unnecessary updates and renders.
         */
        /**
         * 1. First we need to update all directives that may impact 
         *    component visibility and other structural and behavioral aspects of the node,
         */
        for (let i = 0; i < node.directives.length; i++) {
            const directive = node.directives[i];
            directive.update();
        }
        /**
         * 2. Then check all bindings changes
         */
        for (let i = 0; i < node.bindings.length; i++) {
            const binding = node.bindings[i];
            binding.update();
        }
        /**
         * 3. Check changes in interpolations
         */
        for (let i = 0; i < node.interpolations.length; i++) {
            const interpolation = node.interpolations[i];
            interpolation.update();
        }
        /**
         * 4. Render everything that changed 
         */
        node.render();
        /**
         * 5. And finally go though all children of the node and update the. 
         */
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            child.update();
        }
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

        logger?.debug(`[Update -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);


        if (node.component)
            feature.chain(node.component, AreFeatures.onAfterUpdate, node.scope);
    }




    // -----------------------------------------------------------------------------------------
    // -------------------------Are-Node Unmount Section----------------------------------------
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
        name: AreNodeFeatures.onBeforeUnmount,
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

        logger?.debug(`[Unmount -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        if (node.component)
            feature.chain(node.component, AreFeatures.onBeforeUnmount, node.scope);
    }

    /**
     * Unmounts the AreNode from the Host
     * 
     * @param node 
     * @param scene 
     * @param args 
     *  
     */
    @A_Feature.Extend({
        name: AreNodeFeatures.onUnmount,
        scope: [AreNode]
    })
    unmount(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreScene) scene: AreScene,

        ...args: any[]
    ) {
        /**
         * 1. We have to revert all instructions related to this node and remove them from the state 
         */
        for (let i = 0; i < scene.applied.length; i++) {
            const instruction = scene.applied[i];
            instruction.revert();
            scene.unApply(instruction);
        }
        /**
         * 2. Then we should unmount all children of the node
         */
        for (let i = 0; i < node.children.length; i++) {
            const child = node.children[i];
            child.unmount();
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
        name: AreNodeFeatures.onAfterUnmount,
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

        logger?.debug(`[Unmount -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        if (node.component)
            feature.chain(node.component, AreFeatures.onAfterUnmount, node.scope);
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

        logger?.debug(`Event Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}} for event: ${event.name}`);

        if (node.component) {
            try {
                await feature.chain(node.component, event.name, scope);
            } catch (error) {
                logger?.error(error);
            }
        }
    }



    // -----------------------------------------------------------------------------------------
    // -------------------------Are-Interpolation Compile Section-----------------------------------
    // -----------------------------------------------------------------------------------------
    /**
     * Default compile method for interpolations, which can be overridden by specific implementations if needed.
     * 
     * @param interpolation 
     * @param scope 
     * @param scene 
     * @param store 
     * @param feature 
     */
    @A_Feature.Extend({
        name: AreInterpolationFeatures.COMPILE,
        scope: [AreInterpolation]
    })
    compileInterpolation(
        @A_Inject(A_Caller) interpolation: AreInterpolation,

        @A_Dependency.All()
        @A_Dependency.Flat()
        @A_Inject(AreDeclarationInstruction) declarations: AreDeclarationInstruction[],

        @A_Inject(AreScene) scene: AreScene,

        @A_Dependency.Parent()
        @A_Inject(AreStore) parentStore: AreStore,
        ...args: any[]
    ) {
        for (let i = 0; i < declarations.length; i++) {
            const declaration = declarations[i];

            const value = parentStore.get(`${declaration.group}.${interpolation.key}`)
                || parentStore.get(interpolation.key);

            scene.register(new AreMutationInstruction(
                ARE_CONSTANTS__DEFAULT_SCENE_INSTRUCTIONS.AddInterpolation,
                declaration,
                {
                    raw: interpolation.raw,
                    key: interpolation.key,
                    value: value,
                }
            ));

        }
    }




    // -----------------------------------------------------------------------------------------
    // -------------------------Are-Attribute Compile Section-----------------------------------
    // -----------------------------------------------------------------------------------------
    @A_Feature.Extend({
        name: AreAttributeFeatures.COMPILE,
        scope: [AreStaticAttribute]
    })
    compileStaticAttribute(
        @A_Inject(A_Caller) attribute: AreAttribute,

        @A_Dependency.All()
        @A_Dependency.Flat()
        @A_Inject(AreDeclarationInstruction) declarations: AreDeclarationInstruction[],

        @A_Inject(AreScene) scene: AreScene,
        ...args: any[]
    ) {
        for (let i = 0; i < declarations.length; i++) {
            const declaration = declarations[i];
            /**
             * Default case when attribute was not able to be identified as a binding, directive, or event, we just want to add it as a regular attribute to the node. This is the most basic case for attributes that don't have any special behavior or processing logic, and it ensures that they are still rendered on the node even if they don't have any dynamic functionality.
             */
            scene.register(new AreMutationInstruction(
                ARE_CONSTANTS__DEFAULT_SCENE_INSTRUCTIONS.AddAttribute,
                declaration,
                {
                    name: attribute.name,
                    value: attribute.content
                }
            ));
        }
    }

    @A_Feature.Extend({
        name: AreAttributeFeatures.COMPILE,
        scope: [AreDirectiveAttribute]
    })
    compileDirectiveAttribute(
        @A_Inject(A_Caller) attribute: AreAttribute,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(A_Feature) feature: A_Feature,
        @A_Inject(A_Logger) logger?: A_Logger,
        ...args: any[]
    ) {
        /**
         * 3. If the attribute is a directive, then we should find a component that is responsible for
         *    the directive compiling logic, and call it. 
         *    In case component is not found we just want to log a warning, 
         *    since the directive may be handled by some parent component or simply is a mistake in the template.
         */
        const directiveHandlerComponent = scope.resolve<AreDirective>(`AreDirective${A_FormatterHelper.toPascalCase(attribute.name)}`) as AreDirective | undefined;

        if (directiveHandlerComponent) {
            feature.chain(directiveHandlerComponent, AreFeatures.onBeforeLoad, attribute.owner.scope);
        } else {
            logger?.warning(`Directive handler component not found for directive: ${attribute.name}. Make sure to create a component named "AreDirective${A_FormatterHelper.toPascalCase(attribute.name)}" to handle this directive.`);
        }
    }

    @A_Feature.Extend({
        name: AreAttributeFeatures.COMPILE,
        scope: [AreEventAttribute]
    })
    compileEventAttribute(
        @A_Inject(A_Caller) attribute: AreEventAttribute,

        @A_Dependency.All()
        @A_Dependency.Flat()
        @A_Inject(AreDeclarationInstruction) declarations: AreDeclarationInstruction[],

        @A_Inject(AreScene) scene: AreScene,
        ...args: any[]
    ) {

        for (let i = 0; i < declarations.length; i++) {
            const declaration = declarations[i];
            /**
             * 2. In case the attribute is an event listener, then 
             *    we should simply add a callback handler that will be used to proxy an event 
             *    into the ComponentNode component.  
             *[!] In this case AreAttribute is AreEventAttribute that has prepared callback function to be used 
             *    in the event listener. It is important to store callback function once 
             *    to prevent duplicated functions in case of multiple compilations during development.
             */
            scene.register(new AreMutationInstruction(
                ARE_CONSTANTS__DEFAULT_SCENE_INSTRUCTIONS.AddListener,
                declaration,
                {
                    name: attribute.name,
                    callback: attribute.callback
                }));
        }
    }


    @A_Feature.Extend({
        name: AreAttributeFeatures.COMPILE,
        scope: [AreBindingAttribute]
    })
    compileBindingAttribute(
        @A_Inject(A_Caller) attribute: AreBindingAttribute,

        @A_Dependency.All()
        @A_Dependency.Flat()
        @A_Inject(AreDeclarationInstruction) declarations: AreDeclarationInstruction[],

        @A_Inject(AreScene) scene: AreScene,
        @A_Dependency.Parent()
        @A_Inject(AreStore) parentStore: AreStore,
        ...args: any[]
    ) {

        for (let i = 0; i < declarations.length; i++) {
            const declaration = declarations[i];

            const value = parentStore.get(`${declaration.group}.${attribute.content}`)
                || parentStore.get(attribute.content);

            /**
             * 1. In case the attribute is a binding then we just need to extract it value 
             *    and plan it rendering instructions
             */
            scene.register(new AreMutationInstruction(
                ARE_CONSTANTS__DEFAULT_SCENE_INSTRUCTIONS.AddAttribute,
                declaration,
                {
                    name: attribute.name,
                    value
                }));
        }
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