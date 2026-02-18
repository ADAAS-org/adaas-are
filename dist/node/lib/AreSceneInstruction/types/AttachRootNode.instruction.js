'use strict';

var AreSceneInstruction_entity = require('../AreSceneInstruction.entity');

class AttachRootNodeInstruction extends AreSceneInstruction_entity.AreSceneInstruction {
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

exports.AttachRootNodeInstruction = AttachRootNodeInstruction;
//# sourceMappingURL=AttachRootNode.instruction.js.map
//# sourceMappingURL=AttachRootNode.instruction.js.map