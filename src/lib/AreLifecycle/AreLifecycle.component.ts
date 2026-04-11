import { A_Caller, A_Component, A_Dependency, A_Feature, A_Inject, A_Scope, A_TYPES__Entity_Constructor, A_TYPES__EntityFeatures } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame";
import { AreScene } from "@adaas/are/scene/AreScene.context";
import { AreNode } from "@adaas/are/node/AreNode.entity";
import { AreNodeFeatures } from "@adaas/are/node/AreNode.constants";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { AreFeatures } from "@adaas/are/component/Are.constants";
import { AreStore } from "@adaas/are/store/AreStore.context";
import { AreAttribute } from "@adaas/are/attribute/AreAttribute.entity";
import { AreAttributeFeatures } from "@adaas/are/attribute/AreAttribute.constants";
import { AreContext } from "@adaas/are/component/Are.context";




@A_Frame.Component({
    description: 'Handles the lifecycle of the AreNode and related entities such as interpolations, directives, attributes, and so on. It provides lifecycle hooks for initialization, mounting, updating, and unmounting of the nodes, allowing to manage the state and behavior of the nodes throughout their lifecycle in a structured and consistent way.'
})
export class AreLifecycle extends A_Component {



    static Init<T extends AreNode>(node: A_TYPES__Entity_Constructor<T>)
    static Init<T extends AreAttribute>(attribute: A_TYPES__Entity_Constructor<T>)
    static Init<T extends AreNode | AreAttribute>(param1: A_TYPES__Entity_Constructor<T>) {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: param1.prototype instanceof AreNode
                    ? AreNodeFeatures.onInit
                    : AreAttributeFeatures.Init,
                scope: [param1],
                override: ['init']
            })(target, propertyKey, descriptor);
        }
    }


    /**
     *  Handles before init lifecycle of the AreNode
     * 
     * @param node 
     * @param scope 
     * @param scene 
     * @param feature 
     * @param args 
     */
    @A_Feature.Extend({
        name: AreNodeFeatures.onBeforeInit,
        before: /.*/,
        scope: [AreNode]
    })
    beforeInit(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(A_Feature) feature: A_Feature,
        ...args: any[]
    ) {
        const logger = scope.resolve<A_Logger>(A_Logger);

        logger?.debug(`[Init -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        if (node.component)
            feature.chain(node.component, AreFeatures.onBeforeInit, node.scope);
    }
    /**
     * Initializes the AreNode and prepares it for mounting 
     * 
     * @param node 
     * @param scope 
     * @param syntax 
     * @param feature 
     * @param logger 
     * @param args 
     */
    @A_Feature.Extend({
        name: AreNodeFeatures.onInit,
        scope: [AreNode]
    })
    init(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreContext) context: AreContext,
        @A_Inject(A_Logger) logger?: A_Logger,
        ...args: any[]
    ) {
        context.startPerformance('AreLifecycle.init');

        const newNodeScene = new AreScene(node.aseid);

        scope.register(newNodeScene);

        /**
         * If Node has a custom component Defined
         */
        if (node.component) {
            const newNodeStore = new AreStore(node.aseid);
            scope.register(newNodeStore);


            newNodeStore.loadExtensions(node.component);
        }

        context.endPerformance('AreLifecycle.init');
    }
    /**
     * Handles after init lifecycle of the AreNode
     * 
     * @param node 
     * @param scope 
     * @param scene 
     * @param feature 
     * @param args 
     */
    @A_Feature.Extend({
        name: AreNodeFeatures.onAfterInit,
        after: /.*/,
        scope: [AreNode]
    })
    afterInit(
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

        logger?.debug(`[Init -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        if (node.component)
            feature.chain(node.component, AreFeatures.onAfterInit, node.scope);
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

        @A_Inject(A_Logger) logger?: A_Logger,
        ...args: any[]
    ) {

        logger?.debug(`[Mount] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        // walk entire tree inside one feature — no recursive feature calls
        const queue = [node]
        while (queue.length > 0) {
            const current = queue.shift()!

            const scene = current.scene;

            if (scene.isInactive)
                continue;

            // do update work on current
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

            queue.push(...current.children)
        }

        // /**
        //  * 1. We should simply run and render node itself.
        //  */
        // node.interpret();
        // /**
        //  * 2. Then go through all children of the node and mount the.
        //  */
        // for (let i = 0; i < node.children.length; i++) {
        //     const child = node.children[i];
        //     child.mount();
        // }
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

        @A_Inject(AreContext) context: AreContext,

        @A_Inject(A_Logger) logger?: A_Logger,

        ...args: any[]
    ) {

        logger?.debug(`[Update] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        // walk entire tree inside one feature — no recursive feature calls
        const queue = [node]
        while (queue.length > 0) {
            const current = queue.shift()!

            const scene = current.scene;

            if (scene.isInactive)
                continue;

            // do update work on current
            /**
             * 1. First we need to get all changes to be applied and reverted during render operation
             */
            const { toApply, toRevert } = scene.changes


            console.log(' -- Scene Changes -- ');
            console.log('To Apply: ', toApply);
            console.log('To Revert: ', toRevert);
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
                    console.log('WTF?? ', error);

                    /**
                     * 2.2. if any error happened we simply revert the instruction and remove it from the state
                     */
                    instruction.revert();
                    scene.unApply(instruction);
                }
            }

            queue.push(...current.children)
        }

        // /**
        //  * 4. Render everything that changed 
        //  */
        // node.interpret();
        // /**
        //  * 5. And finally go though all children of the node and update the. 
        //  */
        // for (let i = 0; i < node.children.length; i++) {
        //     const child = node.children[i];
        //     child.update();
        // }


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
        // walk entire tree inside one feature — no recursive feature calls
        const queue = [node]
        while (queue.length > 0) {
            const current = queue.shift()!

            const scene = current.scene;

            /**
             * 1. We have to revert all instructions related to this node and remove them from the state 
             */
            const applied = [...scene.applied];

            for (let i = applied.length - 1; i >= 0; i--) {
                const instruction = applied[i];

                try {
                    instruction.revert();
                    scene.unApply(instruction);
                } catch (error) {
                    scene.unApply(instruction);
                }
            }

            queue.push(...current.children)
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
    // -------------------------Are-Node Destroy Section----------------------------------------
    // -----------------------------------------------------------------------------------------
    /**
     * Handles before destroy lifecycle of the AreNode
     * 
     * @param node 
     * @param scope 
     * @param scene 
     * @param feature 
     * @param args 
     */
    @A_Feature.Extend({
        name: AreNodeFeatures.onBeforeDestroy,
        before: /.*/,
        scope: [AreNode]
    })
    beforeDestroy(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(A_Feature) feature: A_Feature,
        ...args: any[]
    ) {
        const logger = scope.resolve<A_Logger>(A_Logger);

        logger?.debug(`[Destroy -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        if (node.component)
            feature.chain(node.component, AreFeatures.onBeforeDestroy, node.scope);
    }

    /**
     * Destroys the AreNode from the Host
     * 
     * @param node 
     * @param scene 
     * @param args 
     *  
     */
    @A_Feature.Extend({
        name: A_TYPES__EntityFeatures.DESTROY,
        scope: [AreNode]
    })
    destroy(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreScene) scene: AreScene,

        ...args: any[]
    ) {

    }

    /**
     * Handles after destroy lifecycle of the AreNode
     * 
     * @param node 
     * @param scope 
     * @param scene 
     * @param feature 
     * @param args 
     */
    @A_Feature.Extend({
        name: AreNodeFeatures.onAfterDestroy,
        after: /.*/,
        scope: [AreNode]
    })
    afterDestroy(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(A_Feature) feature: A_Feature,
        ...args: any[]
    ) {
        const logger = scope.resolve<A_Logger>(A_Logger);

        logger?.debug(`[Destroy -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);

        if (node.component)
            feature.chain(node.component, AreFeatures.onAfterDestroy, node.scope);
    }
}