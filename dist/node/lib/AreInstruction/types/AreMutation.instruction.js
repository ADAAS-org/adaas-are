'use strict';

var aFrame = require('@adaas/a-frame');
var AreInstruction_constants = require('@adaas/are/instruction/AreInstruction.constants');
var AreInstruction_entity = require('@adaas/are/instruction/AreInstruction.entity');
var AreInstruction_error = require('@adaas/are/instruction/AreInstruction.error');

var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(result)) || result;
  return result;
};
exports.AreMutation = class AreMutation extends AreInstruction_entity.AreInstruction {
  get parent() {
    return this._parent;
  }
  get group() {
    return this._group || this.parent;
  }
  constructor(param1, param2, param3) {
    if (typeof param1 === "object" && "aseid" in param1)
      super(param1);
    else
      super({
        name: param1 || AreInstruction_constants.AreInstructionDefaultNames.Mutation,
        group: param2,
        parent: param2,
        payload: param3
        // id: [param1, param3, param2?.group]
      });
  }
  fromNew(newEntity) {
    if (!newEntity.parent)
      throw new AreInstruction_error.AreInstructionError({
        title: "Mutation instruction must have a parent declaration instruction",
        description: `Mutation instruction with name ${newEntity.name} must have a parent declaration instruction for grouping and organization purposes. Please provide a parent declaration instruction when creating this mutation instruction.`
      });
    super.fromNew(newEntity);
  }
};
exports.AreMutation = __decorateClass([
  aFrame.A_Frame.Entity({
    namespace: "A-ARE",
    name: "AreMutation",
    description: "AreMutation is a rendering instruction that represents a reversible change applied to an existing declaration node in the ARE scene \u2014 such as updating an attribute, modifying content, or altering child structure. It references a parent AreDeclaration and is grouped with related mutations for coordinated apply and revert operations."
  })
], exports.AreMutation);
//# sourceMappingURL=AreMutation.instruction.js.map
//# sourceMappingURL=AreMutation.instruction.js.map