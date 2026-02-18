'use strict';

var AreSceneInstruction_entity = require('../AreSceneInstruction.entity');

class AddAttributeInstruction extends AreSceneInstruction_entity.AreSceneInstruction {
  get name() {
    return this.params.name;
  }
  get value() {
    return this.params.value;
  }
  constructor(node, name, value) {
    super({
      id: [name, node],
      action: "add-attribute",
      node,
      params: {
        name,
        value
      }
    });
  }
}

exports.AddAttributeInstruction = AddAttributeInstruction;
//# sourceMappingURL=AddAttribute.instruction.js.map
//# sourceMappingURL=AddAttribute.instruction.js.map