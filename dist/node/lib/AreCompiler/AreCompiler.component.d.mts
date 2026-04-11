import { A_Component, A_TYPES__Entity_Constructor } from '@adaas/a-concept';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { g as AreNode, A as AreAttribute, k as AreScene } from '../../Are.context-D7w32H1G.mjs';
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

declare class AreCompiler extends A_Component {
    /**
     * Defines a custom method for compiling a node into a set of SceneInstructions. This method is called during the compilation phase of the ARE component and should perform any necessary transformations on the node and its attributes to generate the appropriate instructions for rendering. This can include tasks such as processing directives, evaluating expressions, and generating instructions for dynamic content based on the node's properties and context.
     *
     * @param node
     */
    static Compile<T extends AreNode>(node: A_TYPES__Entity_Constructor<T>): any;
    /**
     * Defines a custom method for compiling an attribute into a set of SceneInstructions. This method is called during the compilation phase of the ARE component and should perform any necessary transformations on the attribute to generate the appropriate instructions for rendering. This can include tasks such as processing directives, evaluating expressions, and generating instructions for dynamic content based on the attribute's properties and context.
     *
     * @param attribute
     */
    static Compile<T extends AreAttribute>(attribute: A_TYPES__Entity_Constructor<T>): any;
    compile(node: AreNode, scene: AreScene, logger?: A_Logger, ...args: any[]): void;
}

export { AreCompiler };
