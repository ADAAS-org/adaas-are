'use strict';

var AreSceneInstruction_entity = require('../AreSceneInstruction.entity');

class ReplaceInterpolationInstruction extends AreSceneInstruction_entity.AreSceneInstruction {
  get placement() {
    return this.params?.prevValue || this.interpolation.raw;
  }
  get position() {
    return this.interpolation.position;
  }
  get interpolation() {
    return this.params.interpolation;
  }
  get value() {
    return this.params?.value || "";
  }
  constructor(node, interpolation, value, prevValue) {
    super({
      id: [node, interpolation],
      action: "replace-interpolation",
      node,
      params: {
        interpolation,
        prevValue,
        value
      }
    });
  }
}

exports.ReplaceInterpolationInstruction = ReplaceInterpolationInstruction;
//# sourceMappingURL=ReplaceInterpolation.instruction.js.map
//# sourceMappingURL=ReplaceInterpolation.instruction.js.map