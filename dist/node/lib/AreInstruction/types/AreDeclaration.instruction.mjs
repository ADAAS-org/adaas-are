import { __decorateClass } from '../../../chunk-EQQGB2QZ.mjs';
import { A_Frame } from '@adaas/a-frame';
import { AreInstruction } from '@adaas/are/instruction/AreInstruction.entity';
import { AreInstructionDefaultNames } from '@adaas/are/instruction/AreInstruction.constants';

let AreDeclaration = class extends AreInstruction {
  constructor(param1, param2, param3) {
    if (typeof param1 === "object" && "aseid" in param1)
      super(param1);
    else
      super({
        name: param1 || AreInstructionDefaultNames.Default,
        parent: param2 instanceof AreDeclaration ? param2 : void 0,
        group: param2 instanceof AreDeclaration ? param2.group : void 0,
        payload: param2 instanceof AreDeclaration ? param3 || {} : param2 || {}
        // id: [param1, A_IdentityHelper.generateTimeId(), param2 instanceof AreDeclaration ? (param3 || {}) as T : (param2 || {}) as T]
      });
  }
};
AreDeclaration = __decorateClass([
  A_Frame.Entity({
    namespace: "A-ARE",
    name: "AreDeclaration",
    description: "AreDeclaration is a top-level rendering instruction that represents the creation of a new element in the ARE scene. It carries the target tag name and parent reference needed by the Host to construct the DOM element, and can be applied or reverted to manage element creation and removal deterministically."
  })
], AreDeclaration);

export { AreDeclaration };
//# sourceMappingURL=AreDeclaration.instruction.mjs.map
//# sourceMappingURL=AreDeclaration.instruction.mjs.map