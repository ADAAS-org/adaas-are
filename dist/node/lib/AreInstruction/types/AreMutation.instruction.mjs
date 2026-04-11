import { __decorateClass } from '../../../chunk-EQQGB2QZ.mjs';
import { A_Frame } from '@adaas/a-frame';
import { AreInstructionDefaultNames } from '@adaas/are/instruction/AreInstruction.constants';
import { AreInstruction } from '@adaas/are/instruction/AreInstruction.entity';
import { AreInstructionError } from '@adaas/are/instruction/AreInstruction.error';

let AreMutation = class extends AreInstruction {
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
        name: param1 || AreInstructionDefaultNames.Mutation,
        group: param2,
        parent: param2,
        payload: param3
        // id: [param1, param3, param2?.group]
      });
  }
  fromNew(newEntity) {
    if (!newEntity.parent)
      throw new AreInstructionError({
        title: "Mutation instruction must have a parent declaration instruction",
        description: `Mutation instruction with name ${newEntity.name} must have a parent declaration instruction for grouping and organization purposes. Please provide a parent declaration instruction when creating this mutation instruction.`
      });
    super.fromNew(newEntity);
  }
};
AreMutation = __decorateClass([
  A_Frame.Entity({
    namespace: "A-ARE",
    name: "AreMutation",
    description: "AreMutation is a rendering instruction that represents a reversible change applied to an existing declaration node in the ARE scene \u2014 such as updating an attribute, modifying content, or altering child structure. It references a parent AreDeclaration and is grouped with related mutations for coordinated apply and revert operations."
  })
], AreMutation);

export { AreMutation };
//# sourceMappingURL=AreMutation.instruction.mjs.map
//# sourceMappingURL=AreMutation.instruction.mjs.map