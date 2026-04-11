'use strict';

const AreInstructionFeatures = {
  /**
   * The 'Apply' feature indicates that the instruction has been applied to the scene or component, meaning that its effects have been executed and are now reflected in the state of the scene or component. This status is typically used to track the lifecycle of an instruction, allowing for proper management and potential reversal of changes if needed.
   */
  Apply: "_AreInstruction_Apply",
  /**
   * The 'Update' feature indicates that the instruction has been updated, meaning that its properties or effects have been modified after it was initially applied. This status is important for managing dynamic changes in the scene or component, allowing for adjustments to be made to the instruction's behavior or effects without needing to revert and reapply it entirely.
   */
  Update: "_AreInstruction_Update",
  /**
   * The 'Revert' feature indicates that the instruction has been reverted, meaning that any changes or effects that were applied by the instruction have been undone, and the scene or component has been returned to its previous state before the instruction was applied. This status is crucial for managing the state of the scene or component, especially in cases where an instruction needs to be rolled back due to errors or changes in requirements.
   */
  Revert: "_AreInstruction_Revert"
};
const AreInstructionDefaultNames = {
  Default: "_Are_DefaultInstruction",
  Declaration: "_Are_DeclarationInstruction",
  Mutation: "_Are_MutationInstruction"
};

exports.AreInstructionDefaultNames = AreInstructionDefaultNames;
exports.AreInstructionFeatures = AreInstructionFeatures;
//# sourceMappingURL=AreInstruction.constants.js.map
//# sourceMappingURL=AreInstruction.constants.js.map