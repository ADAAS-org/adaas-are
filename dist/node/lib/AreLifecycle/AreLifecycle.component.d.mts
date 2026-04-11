import { A_Component, A_TYPES__Entity_Constructor, A_Scope, A_Feature } from '@adaas/a-concept';
import { g as AreNode, A as AreAttribute, k as AreScene, a as AreContext } from '../../Are.context-D7w32H1G.mjs';
import { A_Logger } from '@adaas/a-utils/a-logger';
import '@adaas/a-utils/a-signal';
import '../AreEvent/AreEvent.context.mjs';
import '@adaas/a-utils/a-execution';
import '../AreStore/AreStore.types.mjs';
import '../AreStore/AreStore.constants.mjs';
import '../AreScene/AreScene.constants.mjs';
import '../AreAttribute/AreAttribute.types.mjs';
import '../AreAttribute/AreAttribute.constants.mjs';
import '../AreComponent/Are.component.mjs';
import '../AreComponent/Are.types.mjs';
import '../AreComponent/Are.constants.mjs';
import '../AreNode/AreNode.constants.mjs';

declare class AreLifecycle extends A_Component {
    static Init<T extends AreNode>(node: A_TYPES__Entity_Constructor<T>): any;
    static Init<T extends AreAttribute>(attribute: A_TYPES__Entity_Constructor<T>): any;
    /**
     *  Handles before init lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    beforeInit(node: AreNode, scope: A_Scope, scene: AreScene, feature: A_Feature, ...args: any[]): void;
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
    init(node: AreNode, scope: A_Scope, context: AreContext, logger?: A_Logger, ...args: any[]): void;
    /**
     * Handles after init lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    afterInit(
    /**
     * Node to be mounted
     */
    node: AreNode, scope: A_Scope, scene: AreScene, feature: A_Feature, ...args: any[]): void;
    /**
     *  Handles before mount lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    beforeMount(node: AreNode, scope: A_Scope, scene: AreScene, feature: A_Feature, ...args: any[]): void;
    /**
     * Mount the AreNode into the Host
     *
     * @param scope
     * @param node
     * @param scene
     * @param logger
     */
    mount(
    /**
     * Node to be mounted
     */
    node: AreNode, 
    /**
     * Node Content
     */
    scene: AreScene, logger?: A_Logger, ...args: any[]): void;
    /**
     * Handles after mount lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    afterMount(
    /**
     * Node to be mounted
     */
    node: AreNode, scope: A_Scope, scene: AreScene, feature: A_Feature, ...args: any[]): void;
    /**
     * Handles before update lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    beforeUpdate(node: AreNode, scope: A_Scope, scene: AreScene, feature: A_Feature, ...args: any[]): void;
    /**
     * Updates the AreNode in the AreScene
     *
     * @param node
     * @param scene
     * @param args
     */
    update(
    /**
     * Node to be updated
     */
    node: AreNode, context: AreContext, logger?: A_Logger, ...args: any[]): void;
    /**
     * Handles after update lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    afterUpdate(node: AreNode, scope: A_Scope, scene: AreScene, feature: A_Feature, ...args: any[]): void;
    /**
     * Handles before unmount lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    beforeUnmount(node: AreNode, scope: A_Scope, scene: AreScene, feature: A_Feature, ...args: any[]): void;
    /**
     * Unmounts the AreNode from the Host
     *
     * @param node
     * @param scene
     * @param args
     *
     */
    unmount(node: AreNode, scene: AreScene, ...args: any[]): void;
    /**
     * Handles after unmount lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    afterUnmount(node: AreNode, scope: A_Scope, scene: AreScene, feature: A_Feature, ...args: any[]): void;
    /**
     * Handles before destroy lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    beforeDestroy(node: AreNode, scope: A_Scope, feature: A_Feature, ...args: any[]): void;
    /**
     * Destroys the AreNode from the Host
     *
     * @param node
     * @param scene
     * @param args
     *
     */
    destroy(node: AreNode, scene: AreScene, ...args: any[]): void;
    /**
     * Handles after destroy lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    afterDestroy(node: AreNode, scope: A_Scope, feature: A_Feature, ...args: any[]): void;
}

export { AreLifecycle };
