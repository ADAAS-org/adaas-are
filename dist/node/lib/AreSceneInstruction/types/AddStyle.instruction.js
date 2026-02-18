'use strict';

var AreSceneInstruction_entity = require('../AreSceneInstruction.entity');

class AddStyleInstruction extends AreSceneInstruction_entity.AreSceneInstruction {
  get styles() {
    return this.params.styles;
  }
  constructor(node, styles) {
    super({
      id: [styles, node],
      action: "add-style",
      node,
      params: {
        styles
      }
    });
  }
}

exports.AddStyleInstruction = AddStyleInstruction;
//# sourceMappingURL=AddStyle.instruction.js.map
//# sourceMappingURL=AddStyle.instruction.js.map