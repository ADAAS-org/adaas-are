import '../../../chunk-EQQGB2QZ.mjs';
import { AreSceneInstruction } from '../AreSceneInstruction.entity';

class MountNodeInstruction extends AreSceneInstruction {
  get path() {
    return this.params.path;
  }
  constructor(node, path) {
    super({
      id: [node],
      action: "mount-node",
      node,
      params: {
        path
      }
    });
  }
}

export { MountNodeInstruction };
//# sourceMappingURL=MountNode.instruction.mjs.map
//# sourceMappingURL=MountNode.instruction.mjs.map