'use strict';

var aConcept = require('@adaas/a-concept');
var aFrame = require('@adaas/a-frame');
var AreDeclaration_instruction = require('@adaas/are/instruction/types/AreDeclaration.instruction');
var AreInstruction_entity = require('@adaas/are/instruction/AreInstruction.entity');
var AreScene_error = require('./AreScene.error');
var AreMutation_instruction = require('@adaas/are/instruction/types/AreMutation.instruction');
var AreScene_constants = require('./AreScene.constants');

var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(result)) || result;
  return result;
};
exports.AreScene = class AreScene extends aConcept.A_Fragment {
  constructor(id) {
    super({ name: id.toString() });
    // -----------------------------------------------------------------------------------
    // -----------------------------------Scene Index-------------------------------------
    // -----------------------------------------------------------------------------------
    this._groupToInstructionsMap = /* @__PURE__ */ new Map();
    /**
     * Plan is a queue of changes that should be applied to render the node
     * 
     * It works as FIFO, so the first instruction that should be applied is the first one in the queue, and so on.
     */
    this._plan = [];
    /**
     * State is a list of instructions that are currently applied to the node, 
     * so it represents the current state of the node in the scene.
     * 
     * It always in a reverse order of the plan, so the last instruction in the state is the first one that should be reverted when we need to revert the changes, and so on.
     * 
     * For example, if we have a node with two instructions in the plan: [Instruction A, Instruction B], and both of them are applied to the node, then the state will be [Instruction B, Instruction A], so when we need to revert the changes, we will revert Instruction B first, and then Instruction A.
     */
    this._state = [];
    /**
     * Scene status is used to determine the current lifecycle stage of the scene, which can be 'active', 'inactive' or 'destroyed'. This status can be used to control the behavior of the scene and its instructions, for example, we can prevent applying new instructions to an inactive or destroyed scene, or we can trigger certain actions when the scene becomes active or inactive. The default status of the scene is 'inactive', which means that the scene is not yet rendered and its instructions are not applied, and it will become 'active' when it is mounted and its instructions are applied, and it will become 'destroyed' when it is unmounted and its instructions are reverted.
     */
    this._status = AreScene_constants.AreSceneStatuses.Active;
  }
  /**
   * Scene ID that corresponds to the root node's ID (part of ASEID) 
   */
  get id() {
    return this.name;
  }
  /**
   * The scope where scene is registered. This scope is owned by AreNode 
   */
  get scope() {
    return aConcept.A_Context.scope(this);
  }
  /**
   * The owner node of the scene, which is the node that registered the scene in its scope. 
   * This is typically the node that is responsible for rendering the scene and managing its lifecycle.
   */
  get owner() {
    return this.scope.issuer();
  }
  /**
   * It's a primary declaration instruction that represents the node in the scene, so it should be registered as a host instruction for the scene, and it will be used to keep track of the node in the scene and to manage its lifecycle.
   */
  get host() {
    return this._host;
  }
  /**
   * Scene status is used to determine the current lifecycle stage of the scene, which can be 'active', 'inactive' or 'destroyed'. This status can be used to control the behavior of the scene and its instructions, for example, we can prevent applying new instructions to an inactive or destroyed scene, or we can trigger certain actions when the scene becomes active or inactive. The default status of the scene is 'inactive', which means that the scene is not yet rendered and its instructions are not applied, and it will become 'active' when it is mounted and its instructions are applied, and it will become 'destroyed' when it is unmounted and its instructions are reverted.
   */
  get status() {
    return this._status;
  }
  get isActive() {
    return this.status === AreScene_constants.AreSceneStatuses.Active;
  }
  get isInactive() {
    return this.status === AreScene_constants.AreSceneStatuses.Inactive;
  }
  /**
   * Returns All declaration instructions are registered in the scene scope. Since declaration instructions are the main instructions that represent the structure of the node, we have a separate getter for them to easily access and manage them in the scene.
   */
  get declarations() {
    return this.scope.resolve(new aConcept.A_Dependency(AreDeclaration_instruction.AreDeclaration, {
      flat: true,
      pagination: {
        count: -1
      }
    })) || [];
  }
  /**
   * Returns All mutation instructions are registered in the scene scope. Mutation instructions are the instructions that represent the changes to be applied to the node, so we have a separate getter for them to easily access and manage them in the scene, especially when we want to apply or revert changes based on the mutations.
   */
  get mutations() {
    return this.scope.resolve(new aConcept.A_Dependency(AreMutation_instruction.AreMutation, {
      flat: true,
      pagination: {
        count: -1
      }
    })) || [];
  }
  /**
   * Returns All instructions are registered in the scene scope. 
   */
  get instructions() {
    return this.scope.resolveFlatAll(AreInstruction_entity.AreInstruction) || [];
  }
  /**
   * Plan is a queue of changes that should be applied to render the node
   * 
   * It works as FIFO, so the first instruction that should be applied is the first one in the queue, and so on.
   */
  get planned() {
    return this._plan;
  }
  /**
   * State is a list of instructions that are currently applied to the node, 
   * so it represents the current state of the node in the scene.
   * 
   * It always in a reverse order of the plan, so the last instruction in the state is the first one that should be reverted when we need to revert the changes, and so on.
   * 
   * For example, if we have a node with two instructions in the plan: [Instruction A, Instruction B], and both of them are applied to the node, then the state will be [Instruction B, Instruction A], so when we need to revert the changes, we will revert Instruction B first, and then Instruction A.
   */
  get applied() {
    return this._state.reverse();
  }
  /**
   * Should return instructions to be reverted and to be applied. 
   * A difference between plan vs state is that plan is what should be applied to the scene, 
   * while state is what currently applied to the scene. 
   * 
   */
  get changes() {
    const toApply = this.planned.filter((i) => !this.isApplied(i));
    const toRevert = this.applied.filter((i) => !this.isInPlan(i));
    return {
      toApply,
      toRevert
    };
  }
  //===============================================================================================
  //============================= Scene Primary Methods ===========================================
  //===============================================================================================
  activate() {
    this._status = AreScene_constants.AreSceneStatuses.Active;
  }
  deactivate() {
    this._status = AreScene_constants.AreSceneStatuses.Inactive;
  }
  /**
   * Each scene has a primary declaration instruction that represents the node in the scene, so it should be registered as a host instruction for the scene, and it will be used to keep track of the node in the scene and to manage its lifecycle. This method allows to set the host instruction for the scene, but it will throw an error if we try to set another host instruction while there is already a host instruction set, so we can ensure that there is only one host instruction for the scene at any given time.
   * 
   * @param instruction 
   */
  setHost(instruction) {
    if (this.host) {
      const dependentInstructions = this.scope.resolve(new aConcept.A_Dependency(AreMutation_instruction.AreMutation, {
        flat: true,
        pagination: {
          count: -1
        },
        query: {
          parent: this.host.aseid.toString()
        }
      })) || [];
      dependentInstructions.forEach((element) => {
        element.attachTo(instruction);
        element.groupWith(instruction);
      });
    }
    this._host = instruction;
  }
  /**
   * Unsets the current host instruction from the scene. 
   * 
   * This method should be used when we want to remove the primary declaration instruction that represents the node in the scene, for example, when we want to unmount the node or when we want to replace it with another node. Unsetting the host instruction will allow us to set a new host instruction for the scene if needed.
   */
  removeHost() {
    if (this.host)
      throw new AreScene_error.AreSceneError({
        title: AreScene_error.AreSceneError.HostInstructionHasConnectedInstructions,
        description: `Cannot remove host instruction (${this.host.aseid}) from scene ${this.id} because it has planned instructions in the scene. Please unPlan all instructions related to the host instruction before removing it.`
      });
    this._host = void 0;
  }
  // ------------------------------------------------------------------------------------------------------------
  // Scene Render Plan Methods
  // ------------------------------------------------------------------------------------------------------------
  /**
   * Method that should register the instruction in the plan, so it will be rendered in the next render cycle.
   * 
   * @param instruction 
   */
  plan(instruction) {
    try {
      this.scope.register(instruction);
    } catch (error) {
    }
    this._plan.push(instruction);
    if (!this._groupToInstructionsMap.has(instruction.group || "default")) {
      this._groupToInstructionsMap.set(instruction.group || "default", /* @__PURE__ */ new Set());
    }
    this._groupToInstructionsMap.get(instruction.group || "default").add(instruction);
  }
  planBefore(instruction, beforeInstruction) {
    const beforeIndex = this._plan.findIndex((i) => i.aseid.toString() === beforeInstruction.aseid.toString());
    const instructionIndex = this._plan.findIndex((i) => i.aseid.toString() === instruction.aseid.toString());
    if (beforeIndex === -1) {
      throw new AreScene_error.AreSceneError({
        title: AreScene_error.AreSceneError.SceneError,
        description: `Instruction ${beforeInstruction.aseid} is not in the plan of scene ${this.id}. Cannot plan instruction ${instruction.aseid} before it.`
      });
    }
    if (instructionIndex === -1) {
      try {
        this.scope.register(instruction);
      } catch (error) {
      }
      this._plan.splice(beforeIndex, 0, instruction);
    } else {
      this._plan.splice(instructionIndex, 1);
      this._plan.splice(beforeIndex, 0, instruction);
    }
  }
  planAfter(instruction, afterInstruction) {
    const afterIndex = this._plan.findIndex((i) => i.aseid.toString() === afterInstruction.aseid.toString());
    const instructionIndex = this._plan.findIndex((i) => i.aseid.toString() === instruction.aseid.toString());
    if (afterIndex === -1) {
      throw new AreScene_error.AreSceneError({
        title: AreScene_error.AreSceneError.SceneError,
        description: `Instruction ${afterInstruction.aseid} is not in the plan of scene ${this.id}. Cannot plan instruction ${instruction.aseid} after it.`
      });
    }
    if (instructionIndex === -1) {
      this.scope.register(instruction);
      this._plan.splice(afterIndex + 1, 0, instruction);
    } else {
      this._plan.splice(instructionIndex, 1);
      this._plan.splice(afterIndex + 1, 0, instruction);
    }
  }
  moveBefore(instruction, beforeInstruction) {
    if (!this.isInPlan(instruction)) {
      throw new AreScene_error.AreSceneError({
        title: AreScene_error.AreSceneError.SceneError,
        description: `Instruction ${instruction.aseid} is not in the plan of scene ${this.id}. Cannot move instruction before ${beforeInstruction.aseid}. Please plan the instruction before moving it.`
      });
    }
    this.planBefore(instruction, beforeInstruction);
  }
  moveAfter(instruction, afterInstruction) {
    if (!this.isInPlan(instruction)) {
      throw new AreScene_error.AreSceneError({
        title: AreScene_error.AreSceneError.SceneError,
        description: `Instruction ${instruction.aseid} is not in the plan of scene ${this.id}. Cannot move instruction after ${afterInstruction.aseid}. Please plan the instruction before moving it.`
      });
    }
    this.planAfter(instruction, afterInstruction);
  }
  /**
   * Allows to remove instruction from the plan, so it will not be rendered anymore, but it will still be registered in the scene scope, so it can be planned again if needed.
   * 
   * @param instruction 
   */
  unPlan(instruction) {
    this._plan = this._plan.filter((i) => i.aseid.toString() !== instruction.aseid.toString());
  }
  /**
   * Checks if the instruction is already in the plan, so it will be rendered in the next render cycle.
   * 
   * @param instruction 
   * @returns 
   */
  getPlanned(instruction) {
    const found = this._plan.find((i) => i.aseid.toString() === instruction.aseid.toString());
    return found;
  }
  /**
   * Checks if the instruction is already in the plan, so it will be rendered in the next render cycle.
   * 
   * @param instruction 
   * @returns 
   */
  isInPlan(instruction) {
    return !!this.getPlanned(instruction);
  }
  // -------------------------------------------------------------------------------------------------------------
  // Scene Apply Methods
  // -------------------------------------------------------------------------------------------------------------
  /**
   * Method moves the instruction to state to keep it applied and to be able to revert it later if needed. The instruction should be already registered in the scene scope and planned to be applied, otherwise it will not be applied.
   * 
   * @param instruction 
   */
  apply(instruction) {
    if (!this.isApplied(instruction)) {
      this._state.push(instruction);
    }
  }
  /**
   * Method moves the instruction from state to unapply it and to be able to apply it later if needed. The instruction should be already registered in the scene scope and applied, otherwise it will not be unapplied.
   * 
   * @param instruction 
   */
  unApply(instruction) {
    this._state = this._state.filter((i) => i.aseid.toString() !== instruction.aseid.toString());
  }
  /**
   * Checks if the instruction is already in the state, so it is currently applied to the scene.
   * 
   * @param instruction 
   * @returns 
   */
  getApplied(instruction) {
    const found = this._state.find((i) => i.aseid.toString() === instruction.aseid.toString());
    return found;
  }
  /**
   * Checks if the instruction is already in the state, so it is currently applied to the scene.
   * 
   * @param instruction 
   * @returns 
   */
  isApplied(instruction) {
    return !!this.getApplied(instruction);
  }
  /**
   * Method that should reset the scene to the initial state, so it will clear the plan and state, but it will not deregister the instructions from the scene scope, so they will still be registered in the scene and can be planned and applied again if needed.
   * 
   */
  reset() {
    this._plan = [];
    this._state = [];
  }
};
exports.AreScene = __decorateClass([
  aFrame.A_Frame.Component({
    namespace: "A-ARE",
    name: "AreScene",
    description: "Persistent runtime structure that owns the rendering state for a component's lifetime. Maintains two sets \u2014 applied (what is currently in the DOM) and planned (what should be). Acts as the single source of truth for all rendering decisions. The Compiler produces it once, the Interpreter reads it on every update."
  })
], exports.AreScene);
//# sourceMappingURL=AreScene.context.js.map
//# sourceMappingURL=AreScene.context.js.map