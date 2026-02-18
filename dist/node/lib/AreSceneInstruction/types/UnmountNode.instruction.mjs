import '../../../chunk-EQQGB2QZ.mjs';
import { AreSceneInstruction } from '../AreSceneInstruction.entity';

class UnmountNodeInstruction extends AreSceneInstruction {
  constructor(node, path) {
    super({
      id: [node],
      action: "unmount-node",
      node,
      params: {
        path
      }
    });
  }
}

export { UnmountNodeInstruction };
//# sourceMappingURL=UnmountNode.instruction.mjs.map
//# sourceMappingURL=UnmountNode.instruction.mjs.map