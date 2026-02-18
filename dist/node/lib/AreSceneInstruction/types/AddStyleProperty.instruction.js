'use strict';

var AreSceneInstruction_entity = require('../AreSceneInstruction.entity');

class AddStylePropertyInstruction extends AreSceneInstruction_entity.AreSceneInstruction {
  get styles() {
    return this.params.property;
  }
  get value() {
    return this.params.value;
  }
  constructor(node, property, value) {
    super({
      id: [property, node],
      action: "add-style",
      node,
      params: {
        property,
        value
      }
    });
  }
}

exports.AddStylePropertyInstruction = AddStylePropertyInstruction;
//# sourceMappingURL=AddStyleProperty.instruction.js.map
//# sourceMappingURL=AddStyleProperty.instruction.js.map