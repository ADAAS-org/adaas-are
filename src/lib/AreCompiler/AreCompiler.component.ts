import { A_Caller, A_Component, A_Feature, A_Inject, A_TYPES__Entity_Constructor, } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { AreScene } from "@adaas/are/scene/AreScene.context";
import { AreNode } from "@adaas/are/node/AreNode.entity";
import { AreNodeFeatures } from "@adaas/are/node/AreNode.constants";
import { AreAttribute } from "@adaas/are/attribute/AreAttribute.entity";
import { AreAttributeFeatures } from "@adaas/are/attribute/AreAttribute.constants";
import { AreDeclaration } from "@adaas/are/instruction/types/AreDeclaration.instruction";


@A_Frame.Component({
    namespace: 'A-ARE',
    name: 'AreCompiler',
    description: 'Walks the transformed AreNode tree and emits a Scene. Translates each node, binding, directive and interpolation into a typed instruction. Knows nothing about the DOM or any rendering target — its only concern is producing a complete and ordered set of instructions that fully describes how the tree should be rendered.'
})
export class AreCompiler extends A_Component {

    /**
     * Defines a custom method for compiling a node into a set of SceneInstructions. This method is called during the compilation phase of the ARE component and should perform any necessary transformations on the node and its attributes to generate the appropriate instructions for rendering. This can include tasks such as processing directives, evaluating expressions, and generating instructions for dynamic content based on the node's properties and context.
     * 
     * @param node 
     */
    static Compile<T extends AreNode>(node: A_TYPES__Entity_Constructor<T>)
    /**
     * Defines a custom method for compiling an attribute into a set of SceneInstructions. This method is called during the compilation phase of the ARE component and should perform any necessary transformations on the attribute to generate the appropriate instructions for rendering. This can include tasks such as processing directives, evaluating expressions, and generating instructions for dynamic content based on the attribute's properties and context.
     * 
     * @param attribute 
     */
    static Compile<T extends AreAttribute>(attribute: A_TYPES__Entity_Constructor<T>)
    static Compile<T extends AreNode | AreAttribute>(param1: A_TYPES__Entity_Constructor<T>) {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: param1.prototype instanceof AreNode
                    ? AreNodeFeatures.onCompile
                    : AreAttributeFeatures.Compile,
                scope: [param1],
                override: ['compile']
            })(target, propertyKey, descriptor);
        }
    }


    // -----------------------------------------------------------------------------------------
    // ----------------------------Are-Node Compile Section----------------------------------------
    // -----------------------------------------------------------------------------------------
    @A_Feature.Extend({
        name: AreNodeFeatures.onCompile,
        scope: [AreNode]
    })
    compile(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(A_Logger) logger?: A_Logger,
        ...args: any[]
    ) {
        try {
            logger?.debug('cyan', `AreCompiler: compile node <${node.aseid.toString()}>`);

            /**
             * 1. Create & register Host Instructions to add it if no other cases presented
             * 
             * [!] Note: it can be removed by directives or modified if needed
             */
            const hostInstruction = new AreDeclaration()
            scene.setHost(hostInstruction);
            scene.plan(hostInstruction);

            /**
             * 1. Prepare Instructions for attributes and add then to render plan.
             */
            for (let i = 0; i < node.attributes.length; i++) {
                const attribute = node.attributes[i];
                attribute.compile();
            }

            /**
             * 2. Compile all nested nodes of the root node. 
             */
            if (node.children && node.children.length > 0) {
                for (let i = 0; i < node.children.length; i++) {
                    const child = node.children[i];
                    child.compile();
                }
            }

        } catch (error) {
            logger?.error(error)
        }
    }
}