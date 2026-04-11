import { __decorateClass } from '../../chunk-EQQGB2QZ.mjs';
import { A_Entity, A_Context, A_FormatterHelper, A_Error } from '@adaas/a-concept';
import { A_Frame } from '@adaas/a-frame';
import { AreInstructionFeatures } from './AreInstruction.constants';

let AreInstruction = class extends A_Entity {
  /**
   * The name of the instruction, for example "CreateElement", "AddAttribute", "RemoveNode", etc. This is used to identify the type of the instruction and how to process it. The name should be in PascalCase format, and should be unique across all instruction types. It is recommended to use a prefix that indicates the category of the instruction, for example "CreateElement" for instructions that create new elements, "UpdateAttribute" for instructions that update attributes, etc.
   */
  get name() {
    return this._name;
  }
  /**
   * The payload of the instruction, which can contain any additional information that may be needed for the rendering purpose. For example, for CreateElement instruction, the payload can contain the tag name and parent information, so the Host can use this information to create the element in the correct place in the scene. The payload is optional and can be an empty object if no additional information is needed. 
   * 
   * [!] Note, the payload should be serializable, so it can be stored and transmitted easily. It is recommended to use simple data structures for the payload, such as objects, arrays, strings, numbers, etc., and avoid using complex data types that may not be easily serializable.
   */
  get payload() {
    return this._payload || {};
  }
  /**
   * Group is an optional property that can be used to group instructions together. For example a set of instructions that depend on create CreateElement instruction can be grouped together with the same group name, so if the CreateElement instruction is reverted, all the instructions in the same group will be reverted as well, and so on. This can be useful to manage complex changes that involve multiple instructions. 
   * 
   * [!] Note, the best option is to use ASEID of the Instruction as a group, so all instructions with the same ASEID will be treated as a single change, and will be applied and reverted together.
   */
  get group() {
    return this._group;
  }
  /**
   * The parent instruction ASEID that created this instruction. For example, if we have a CreateElement instruction that creates a new element, and then we have an AddAttribute instruction that adds an attribute to that element, the AddAttribute instruction would have the CreateElement instruction as its parent. This can be used to track the hierarchy of instructions and their dependencies.
   * 
   * [!] Note, the parent should be provided as an ASEID string, so it can be easily referenced and tracked across different contexts and times.
   */
  get parent() {
    return this._parent;
  }
  get id() {
    return this.aseid.id;
  }
  get owner() {
    return A_Context.scope(this).issuer();
  }
  fromNew(newEntity) {
    this.aseid = this.generateASEID({
      // shard: newEntity.node.id,
      entity: A_FormatterHelper.toKebabCase(newEntity.name)
      // id: id,
    });
    this._name = newEntity.name;
    this._payload = newEntity.payload;
    this._group = newEntity.group?.aseid.toString();
    this._parent = newEntity.parent?.aseid.toString();
  }
  fromUndefined() {
    throw new A_Error({
      title: "Cannot create an instruction without properties",
      description: "AreInstruction cannot be created without properties. Please provide the necessary properties to create an instruction."
    });
  }
  // ===============================================================================
  // ----------------------------Instruction Operations ------------------------------
  // ===============================================================================
  /**
   * Group this instruction with another instruction. This means that when one of the instructions in the group is applied or reverted, all the instructions in the same group will be applied or reverted together. This can be useful to manage complex changes that involve multiple instructions. 
   * 
   * For example, if we have a CreateElement instruction that creates a new element, and then we have an AddAttribute instruction that adds an attribute to that element, we can group them together with the same group name, so if we revert the CreateElement instruction, the AddAttribute instruction will be reverted as well, and so on.
   * 
   * @param instruction 
   * @returns 
   */
  groupWith(instruction) {
    this._group = instruction.id;
    return this;
  }
  /**
   * Ungroup this instruction from any group. This means that this instruction will be treated as an independent instruction, and will not be applied or reverted together with any other instructions. This can be useful when you want to separate an instruction from a group, so it can be applied or reverted independently.
   * 
   * @returns 
   */
  unGroup() {
    this._group = void 0;
    return this;
  }
  /**
   * Attach this instruction to a parent instruction. This means that this instruction will be considered as a child of the parent instruction, and can be used to track the hierarchy of instructions and their dependencies. 
   * 
   * For example, if we have a CreateElement instruction that creates a new element, and then we have an AddAttribute instruction that adds an attribute to that element, we can attach the AddAttribute instruction to the CreateElement instruction as its parent, so we can track that the AddAttribute instruction is related to the CreateElement instruction.
   * 
   * @param parent 
   * @returns 
   */
  attachTo(parent) {
    this._parent = parent.id;
    return this;
  }
  /**
   * Detach this instruction from its parent instruction. This means that this instruction will no longer be considered as a child of the parent instruction, and will not be related to it in any way. This can be useful when you want to separate an instruction from its parent, so it can be treated as an independent instruction.
   * 
   * @returns 
   */
  detach() {
    this._parent = void 0;
    return this;
  }
  // ===============================================================================
  // ----------------------------Instruction Features ------------------------------
  // ===============================================================================
  /**
   * Apply this instruction to the scene. This means that the changes represented by this instruction will be applied to the scene, and the Host will perform the necessary operations to reflect these changes in the rendered output. 
   * 
   * For example, if this instruction is a CreateElement instruction, when we apply it, the Host will create a new element in the scene according to the information provided in the payload of the instruction. If this instruction is an AddAttribute instruction, when we apply it, the Host will add the specified attribute to the target element in the scene. The apply method can also accept an optional scope parameter, which can be used to provide additional context or information that may be needed for applying the instruction.
   * 
   * @param scope 
   */
  apply(scope) {
    this.call(AreInstructionFeatures.Apply, scope);
  }
  /**
   * Update this instruction in the scene. This means that the changes represented by this instruction will be updated in the scene, and the Host will perform the necessary operations to reflect these changes in the rendered output. This is particularly useful for instructions that have dynamic properties or effects that may change over time, allowing for adjustments to be made to the instruction's behavior or effects without needing to revert and reapply it entirely. The update method can also accept an optional scope parameter, which can be used to provide additional context or information that may be needed for updating the instruction.
   * 
   * @param scope 
   */
  update(scope) {
    this.call(AreInstructionFeatures.Update, scope);
  }
  /**
   * Revert this instruction from the scene. This means that the changes represented by this instruction will be reverted from the scene, and the Host will perform the necessary operations to undo these changes in the rendered output.
   * 
   * @param scope 
   */
  revert(scope) {
    this.call(AreInstructionFeatures.Revert, scope);
  }
};
AreInstruction = __decorateClass([
  A_Frame.Entity({
    namespace: "A-ARE",
    name: "AreInstruction",
    description: "AreInstruction is the base entity for all rendering instructions in the ARE framework. It represents a serializable, reversible operation (such as creating or mutating a DOM element) that can be applied to and tracked within the AreScene, enabling deterministic rendering and undo/redo capabilities."
  })
], AreInstruction);

export { AreInstruction };
//# sourceMappingURL=AreInstruction.entity.mjs.map
//# sourceMappingURL=AreInstruction.entity.mjs.map