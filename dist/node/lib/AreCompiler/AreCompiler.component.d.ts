import { A_Component, A_Scope, A_Feature } from '@adaas/a-concept';
import { b as AreNode, c as AreScene, A as AreEvent } from '../../index-BD-6iOuR.js';
import { AreSyntax } from '../AreSyntax/AreSyntax.component.js';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { A_SignalVector, A_SignalState } from '@adaas/a-utils/a-signal';
import { Are } from '../AreComponent/Are.component.js';
import { AreContext } from '../AreComponent/Are.context.js';
import { AreProps } from '../AreProps/AreProps.context.js';
import { AreStore } from '../AreStore/AreStore.context.js';
import '../AreEvent/AreEvent.types.js';
import '../AreNode/AreNode.types.js';
import '../AreScene/AreScene.types.js';
import '../AreSyntax/AreSyntax.types.js';
import '../AreSyntax/AreSyntax.context.js';
import '@adaas/a-utils/a-execution';

declare class AreCompiler extends A_Component {
    index(node: AreNode): void;
    component(node: AreNode): Are | undefined;
    /**
     * Handles before load lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param feature
     * @param args
     */
    beforeLoad(node: AreNode, scope: A_Scope, feature: A_Feature, ...args: any[]): Promise<void>;
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
    load(node: AreNode, scope: A_Scope, syntax: AreSyntax, feature: A_Feature, logger?: A_Logger, ...args: any[]): Promise<void>;
    /**
     * Handles after load lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    afterLoad(node: AreNode, scope: A_Scope, scene: AreScene, feature: A_Feature, ...args: any[]): Promise<void>;
    /**
     * Handles before compile lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    beforeCompile(node: AreNode, scope: A_Scope, scene: AreScene, feature: A_Feature, ...args: any[]): void;
    /**
     * Compiles the AreNode using AreCompiler
     *
     *
     * @param logger
     */
    compile(
    /**
     * Actual Node no be compiled
     */
    node: AreNode, 
    /**
     * Nodes owned Scene, Node content
     */
    scene: AreScene, 
    /**
     * Parent Scene where the node is registered
     */
    parentScene: AreScene, 
    /**
     * Global Syntax Definition for parsing markup
     */
    syntax: AreSyntax, props: AreProps, store: AreStore, parentStore: AreStore, logger?: A_Logger, scope?: A_Scope): void;
    /**
     * Handles after compile lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    afterCompile(node: AreNode, scope: A_Scope, scene: AreScene, feature: A_Feature, ...args: any[]): void;
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
    event(node: AreNode, scope: A_Scope, event: AreEvent, scene: AreScene, feature: A_Feature, ...args: any[]): Promise<void>;
    /**
     *  Handles before render lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    beforeRender(node: AreNode, scope: A_Scope, scene: AreScene, feature: A_Feature, ...args: any[]): void;
    /**
     * Renders the AreNode into the AreScene
     *
     * @param scope
     * @param node
     * @param scene
     * @param logger
     */
    render(
    /**
     * Node to be mounted
     */
    node: AreNode, 
    /**
     * Template Parsing Syntax to be used
     */
    syntax: AreSyntax, 
    /**
     * Node Content
     */
    scene: AreScene, 
    /**
     * Scene where target node is registered
     *
     * [!] For Root Node it doesn't exists
     */
    parentScene?: AreScene, logger?: A_Logger, ...args: any[]): void;
    /**
     * Handles after render lifecycle of the AreNode
     *
     * @param node
     * @param scope
     * @param scene
     * @param feature
     * @param args
     */
    afterRender(
    /**
     * Node to be rendered
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
    node: AreNode, scene: AreScene, ...args: any[]): void;
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
     * Unmounts the AreNode from the AreScene
     *
     * @param node
     * @param syntax
     * @param scene
     * @param parentScene
     * @param logger
     */
    unmount(
    /**
     * Node to be unmounted
     */
    node: AreNode, 
    /**
     * Template Parsing Syntax to be used
     */
    syntax: AreSyntax, 
    /**
     * Node Content
     */
    scene: AreScene, 
    /**
     * Scene where target node is registered
     *
     * [!] For Root Node it doesn't exists
     */
    parentScene?: AreScene, logger?: A_Logger): void;
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
    handleSignalVector(vector: A_SignalVector, context: AreContext, state: A_SignalState, scope: A_Scope, logger?: A_Logger): void;
}

export { AreCompiler };
