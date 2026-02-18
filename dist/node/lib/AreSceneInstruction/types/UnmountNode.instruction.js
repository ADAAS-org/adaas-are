'use strict';

var AreSceneInstruction_entity = require('../AreSceneInstruction.entity');

class UnmountNodeInstruction extends AreSceneInstruction_entity.AreSceneInstruction {
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

exports.UnmountNodeInstruction = UnmountNodeInstruction;
//# sourceMappingURL=UnmountNode.instruction.js.map
//# sourceMappingURL=UnmountNode.instruction.js.map