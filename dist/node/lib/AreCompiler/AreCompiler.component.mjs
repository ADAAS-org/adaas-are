import { __decorateClass, __decorateParam } from '../../chunk-EQQGB2QZ.mjs';
import { A_Feature, A_Inject, A_Caller, A_Component } from '@adaas/a-concept';
import { A_Frame } from '@adaas/a-frame';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { AreScene } from '@adaas/are/scene/AreScene.context';
import { AreNode } from '@adaas/are/node/AreNode.entity';
import { AreNodeFeatures } from '@adaas/are/node/AreNode.constants';
import { AreAttributeFeatures } from '@adaas/are/attribute/AreAttribute.constants';
import { AreDeclaration } from '@adaas/are/instruction/types/AreDeclaration.instruction';

let AreCompiler = class extends A_Component {
  static Compile(param1) {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: param1.prototype instanceof AreNode ? AreNodeFeatures.onCompile : AreAttributeFeatures.Compile,
        scope: [param1],
        override: ["compile"]
      })(target, propertyKey, descriptor);
    };
  }
  compile(node, scene, logger, ...args) {
    try {
      logger?.debug("cyan", `AreCompiler: compile node <${node.aseid.toString()}>`);
      const hostInstruction = new AreDeclaration();
      scene.setHost(hostInstruction);
      scene.plan(hostInstruction);
      for (let i = 0; i < node.attributes.length; i++) {
        const attribute = node.attributes[i];
        attribute.compile();
      }
      if (node.children && node.children.length > 0) {
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];
          child.compile();
        }
      }
    } catch (error) {
      logger?.error(error);
    }
  }
};
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onCompile,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreScene)),
  __decorateParam(2, A_Inject(A_Logger))
], AreCompiler.prototype, "compile", 1);
AreCompiler = __decorateClass([
  A_Frame.Component({
    namespace: "A-ARE",
    name: "AreCompiler",
    description: "Walks the transformed AreNode tree and emits a Scene. Translates each node, binding, directive and interpolation into a typed instruction. Knows nothing about the DOM or any rendering target \u2014 its only concern is producing a complete and ordered set of instructions that fully describes how the tree should be rendered."
  })
], AreCompiler);

export { AreCompiler };
//# sourceMappingURL=AreCompiler.component.mjs.map
//# sourceMappingURL=AreCompiler.component.mjs.map