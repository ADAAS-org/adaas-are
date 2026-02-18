'use strict';

var AreSceneInstruction_entity = require('../AreSceneInstruction.entity');

class AddDirectiveInstruction extends AreSceneInstruction_entity.AreSceneInstruction {
  get directive() {
    return this.params.directive;
  }
  get value() {
    return this.params.value;
  }
  constructor(node, directive, value) {
    super({
      id: [directive, node],
      action: "directive",
      node,
      params: {
        directive,
        value
      }
    });
  }
}

exports.AddDirectiveInstruction = AddDirectiveInstruction;
//# sourceMappingURL=AddDirective.instruction.js.map
//# sourceMappingURL=AddDirective.instruction.js.map