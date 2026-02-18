'use strict';

var AreSceneInstruction_entity = require('../AreSceneInstruction.entity');

class MountNodeInstruction extends AreSceneInstruction_entity.AreSceneInstruction {
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

exports.MountNodeInstruction = MountNodeInstruction;
//# sourceMappingURL=MountNode.instruction.js.map
//# sourceMappingURL=MountNode.instruction.js.map