import '../../../chunk-EQQGB2QZ.mjs';
import { AreSceneInstruction } from '../AreSceneInstruction.entity';

class AttachRootNodeInstruction extends AreSceneInstruction {
  get id() {
    return this.node.aseid.toString();
  }
  constructor(node) {
    super({
      id: [node],
      action: "attach-root-node",
      node,
      params: {}
    });
  }
}

export { AttachRootNodeInstruction };
//# sourceMappingURL=AttachRootNode.instruction.mjs.map
//# sourceMappingURL=AttachRootNode.instruction.mjs.map