import { A_Component, A_TYPES__Entity_Constructor } from '@adaas/a-concept';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { AreScene } from '@adaas/are/scene/AreScene.context';
import { AreNode } from '@adaas/are/node/AreNode.entity';
import { AreAttribute } from '@adaas/are/attribute/AreAttribute.entity';

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
