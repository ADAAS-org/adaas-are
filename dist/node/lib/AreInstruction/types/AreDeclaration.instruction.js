'use strict';

var aFrame = require('@adaas/a-frame');
var AreInstruction_entity = require('@adaas/are/instruction/AreInstruction.entity');
var AreInstruction_constants = require('@adaas/are/instruction/AreInstruction.constants');

var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(result)) || result;
  return result;
};
exports.AreDeclaration = class AreDeclaration extends AreInstruction_entity.AreInstruction {
  constructor(param1, param2, param3) {
    if (typeof param1 === "object" && "aseid" in param1)
      super(param1);
    else
      super({
        name: param1 || AreInstruction_constants.AreInstructionDefaultNames.Default,
        parent: param2 instanceof exports.AreDeclaration ? param2 : void 0,
        group: param2 instanceof exports.AreDeclaration ? param2.group : void 0,
        payload: param2 instanceof exports.AreDeclaration ? param3 || {} : param2 || {}
        // id: [param1, A_IdentityHelper.generateTimeId(), param2 instanceof AreDeclaration ? (param3 || {}) as T : (param2 || {}) as T]
      });
  }
};
exports.AreDeclaration = __decorateClass([
  aFrame.A_Frame.Entity({
    namespace: "A-ARE",
    name: "AreDeclaration",
    description: "AreDeclaration is a top-level rendering instruction that represents the creation of a new element in the ARE scene. It carries the target tag name and parent reference needed by the Host to construct the DOM element, and can be applied or reverted to manage element creation and removal deterministically."
  })
], exports.AreDeclaration);
//# sourceMappingURL=AreDeclaration.instruction.js.map
//# sourceMappingURL=AreDeclaration.instruction.js.map