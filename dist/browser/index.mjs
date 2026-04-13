import { A_Feature, A_Inject, A_Scope, A_Caller, A_Meta, A_TYPES__EntityFeatures, A_Dependency, A_Concept, A_Error, A_Fragment, A_Context, A_Entity, A_FormatterHelper, A_TypeGuards, A_ComponentMeta, A_Component, A_CommonHelper } from '@adaas/a-concept';
import { A_Frame } from '@adaas/a-frame';
import { A_SignalBusFeatures, A_SignalVector, A_SignalState, A_SignalBus, A_Signal } from '@adaas/a-utils/a-signal';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { A_ExecutionContext } from '@adaas/a-utils/a-execution';
import { A_Service, A_ServiceFeatures } from '@adaas/a-utils/a-service';
import { A_UtilsHelper } from '@adaas/a-utils/helpers';
import { A_Route } from '@adaas/a-utils/a-route';

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);

// src/lib/AreComponent/Are.constants.ts
var AreFeatures = {
  //===================================================================================
  // -----------------------------Node Lifecycle Hooks---------------------------------
  //===================================================================================
  /**
   * Allows to define a custom method for the component's initialization logic. This method is called before the component is initialized and can be used to perform any necessary setup or configuration before the component is rendered. It can also be used to implement custom logic for handling specific features or behaviors of the component during the initialization process.
   */
  onBeforeInit: "_Are_onBeforeInit",
  /**
   * Allows to define a custom method for the component's logic that should be executed after the component has been initialized. This method is called after the component has been initialized and can be used to perform any necessary setup or configuration based on the initial state of the component. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-initialization process.
   */
  onAfterInit: "_Are_onAfterInit",
  //------------------------------------------------------------------------------------
  /**
   * Allows to define a custom method for the component's mounting logic. This method is called before the component is mounted to the DOM and can be used to perform any necessary setup or configuration before the component is rendered. It can also be used to implement custom logic for handling specific features or behaviors of the component during the mounting process.
   */
  onBeforeMount: "_Are_onBeforeMount",
  /**
   * Allows to define a custom method for the component's logic that should be executed after the component has been mounted to the DOM. This method is called after the component has been mounted and can be used to perform any necessary setup or configuration based on the initial state of the component and its presence in the DOM. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-mounting process.
   */
  onAfterMount: "_Are_onAfterMount",
  //------------------------------------------------------------------------------------
  /**
   * Allows to define a custom method for the component's unmounting logic. This method is called before the component is unmounted from the DOM and can be used to perform any necessary cleanup or teardown before the component is removed. It can also be used to implement custom logic for handling specific features or behaviors of the component during the unmounting process.
   */
  onBeforeUnmount: "_Are_onBeforeUnmount",
  /**
   * Allows to define a custom method for the component's logic that should be executed after the component has been unmounted from the DOM. This method is called after the component has been unmounted and can be used to perform any necessary cleanup or teardown based on the final state of the component and its removal from the DOM. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-unmounting process.
   */
  onAfterUnmount: "_Are_onAfterUnmount",
  //------------------------------------------------------------------------------------
  /**
   * Allows to define a custom method for the component's update logic. This method is called whenever the component's state changes and can be used to perform any necessary updates or side effects based on the new state. It can also be used to optimize performance by implementing custom logic for determining when the component should re-render based on specific state changes.
   */
  onBeforeUpdate: "_Are_onBeforeUpdate",
  /**
   * Allows to define a custom method for the component's logic that should be executed after the component's state has been updated. This method is called after the component has re-rendered in response to state changes, and can be used to perform any necessary side effects or additional updates based on the new state. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-update process.
   */
  onAfterUpdate: "_Are_onAfterUpdate",
  /**
   * Allows to define a custom method for the component's logic that should be executed before the component is destroyed. This method is called before the component is destroyed and can be used to perform any necessary cleanup or teardown based on the final state of the component. It can also be used to implement custom logic for handling specific features or behaviors of the component during the pre-destruction process.
   */
  onBeforeDestroy: "_Are_onBeforeDestroy",
  /**
   * Allows to define a custom method for the component's logic that should be executed after the component is destroyed. This method is called after the component has been destroyed and can be used to perform any necessary cleanup or teardown based on the final state of the component. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-destruction process.
   */
  onAfterDestroy: "_Are_onAfterDestroy",
  //===================================================================================
  // -----------------------------Loading Extension------------------------------------
  //===================================================================================
  onTemplate: "_Are_onTemplate",
  onStyles: "_Are_onStyles",
  onData: "_Are_onData",
  //===================================================================================
  // -----------------------------Runtime Hooks------------------------------------
  //=================================================================================== 
  onSignal: "_Are_onSignal"
};

// src/lib/AreInstruction/AreInstruction.constants.ts
var AreInstructionFeatures = {
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
var AreInstructionDefaultNames = {
  Default: "_Are_DefaultInstruction",
  Declaration: "_Are_DeclarationInstruction",
  Mutation: "_Are_MutationInstruction"
};

// src/lib/AreInstruction/AreInstruction.entity.ts
var AreInstruction = class extends A_Entity {
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

// src/lib/AreInstruction/types/AreDeclaration.instruction.ts
var AreDeclaration = class extends AreInstruction {
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
var AreSceneError = class extends A_Error {
};
AreSceneError.SceneAlreadyInactive = "AreSceneError.SceneAlreadyInactive";
AreSceneError.SceneAlreadyActive = "AreSceneError.SceneAlreadyActive";
AreSceneError.HostInstructionHasConnectedInstructions = "AreSceneError.HostInstructionHasConnectedInstructions";
AreSceneError.SingleHostInstruction = "AreSceneError.SingleHostInstruction";
AreSceneError.SceneError = "AreSceneError.SceneError";
AreSceneError.RootNotFound = "AreSceneError.RootNotFound";
AreSceneError.UpdateFailed = "AreSceneError.UpdateFailed";
AreSceneError.MountFailed = "AreSceneError.MountFailed";
AreSceneError.UnmountFailed = "AreSceneError.UnmountFailed";
AreSceneError.MountPointNotFound = "AreSceneError.MountPointNotFound";
AreSceneError.InvalidTemplate = "AreSceneError.InvalidTemplate";
AreSceneError.RenderFailed = "AreSceneError.RenderFailed";
var AreInstructionError = class extends A_Error {
};

// src/lib/AreInstruction/types/AreMutation.instruction.ts
var AreMutation = class extends AreInstruction {
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

// src/lib/AreScene/AreScene.constants.ts
var AreSceneStatuses = {
  Active: "active",
  Inactive: "inactive",
  Destroyed: "destroyed"
};

// src/lib/AreScene/AreScene.context.ts
var AreScene = class extends A_Fragment {
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
    this._status = AreSceneStatuses.Active;
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
    return A_Context.scope(this);
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
    return this.status === AreSceneStatuses.Active;
  }
  get isInactive() {
    return this.status === AreSceneStatuses.Inactive;
  }
  /**
   * Returns All declaration instructions are registered in the scene scope. Since declaration instructions are the main instructions that represent the structure of the node, we have a separate getter for them to easily access and manage them in the scene.
   */
  get declarations() {
    return this.scope.resolve(new A_Dependency(AreDeclaration, {
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
    return this.scope.resolve(new A_Dependency(AreMutation, {
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
    return this.scope.resolveFlatAll(AreInstruction) || [];
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
    this._status = AreSceneStatuses.Active;
  }
  deactivate() {
    this._status = AreSceneStatuses.Inactive;
  }
  /**
   * Each scene has a primary declaration instruction that represents the node in the scene, so it should be registered as a host instruction for the scene, and it will be used to keep track of the node in the scene and to manage its lifecycle. This method allows to set the host instruction for the scene, but it will throw an error if we try to set another host instruction while there is already a host instruction set, so we can ensure that there is only one host instruction for the scene at any given time.
   * 
   * @param instruction 
   */
  setHost(instruction) {
    if (this.host) {
      const dependentInstructions = this.scope.resolve(new A_Dependency(AreMutation, {
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
      throw new AreSceneError({
        title: AreSceneError.HostInstructionHasConnectedInstructions,
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
      throw new AreSceneError({
        title: AreSceneError.SceneError,
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
      throw new AreSceneError({
        title: AreSceneError.SceneError,
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
      throw new AreSceneError({
        title: AreSceneError.SceneError,
        description: `Instruction ${instruction.aseid} is not in the plan of scene ${this.id}. Cannot move instruction before ${beforeInstruction.aseid}. Please plan the instruction before moving it.`
      });
    }
    this.planBefore(instruction, beforeInstruction);
  }
  moveAfter(instruction, afterInstruction) {
    if (!this.isInPlan(instruction)) {
      throw new AreSceneError({
        title: AreSceneError.SceneError,
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
AreScene = __decorateClass([
  A_Frame.Component({
    namespace: "A-ARE",
    name: "AreScene",
    description: "Persistent runtime structure that owns the rendering state for a component's lifetime. Maintains two sets \u2014 applied (what is currently in the DOM) and planned (what should be). Acts as the single source of truth for all rendering decisions. The Compiler produces it once, the Interpreter reads it on every update."
  })
], AreScene);

// src/lib/AreAttribute/AreAttribute.constants.ts
var AreAttributeFeatures = {
  /**
   * Initializes the attribute. This method is called when the attribute is first created and should set up any necessary state or perform any initial processing based on the provided content and context. It can also be used to validate the attribute's content and throw errors if it is invalid.
   */
  Init: "_AreAttribute_Init",
  /**
   * Uses to generate all rendering instructions for the attribute. This method is called during the compilation phase of the ARE component and should return an array of instructions that describe how to render the attribute based on its content and context. The instructions can include details such as which DOM properties to set, which events to listen for, and how to update the attribute when the underlying data changes.
   */
  Transform: "_AreAttribute_Transform",
  /**
   * Feature that should convert a directiveAttribute definition into a set of SceneInstructions to be rendered correctly
   */
  Compile: "_AreAttribute_Compile",
  /**
   * Feature that should update the directiveAttribute based on the changes in the store or other dependencies. This method is called during the update phase of the ARE component and should perform any necessary updates to the attribute based on changes in the underlying data or context. This can include tasks such as updating DOM properties, re-evaluating expressions, or modifying event listeners to ensure that the attribute remains in sync with the current state of the application.
   */
  Update: "_AreAttribute_Update",
  /**
   * Feature that should validate the attribute's content and context. This method is called during the validation phase of the ARE component and should check whether the attribute's content is valid based on its expected format, type, or other constraints. If the content is invalid, this method should throw an error with a descriptive message to help developers identify and fix the issue.
   */
  Validate: "_AreAttribute_Validate"
};

// src/lib/AreAttribute/AreAttribute.entity.ts
var AreAttribute = class extends A_Entity {
  /**
   * The scope where the attribute is defined, which can be used to access other entities and features within the same scope. This is particularly useful for attributes that need to interact with other parts of the scene or component, as it allows them to access shared data and functionality without needing to pass it explicitly through parameters.
   */
  get scope() {
    return A_Context.scope(this);
  }
  /**
   * The owner node of the attribute, which is the node that the attribute is attached to. This can be used to access the properties and features of the owner node, as well as to determine the context in which the attribute is being used. For example, if the attribute is attached to a button element, the owner would be that button node, and the attribute could use this information to modify the button's behavior or appearance based on its content and context.
   */
  get owner() {
    return this.scope.issuer();
  }
  /**
   * Initializes the attribute based on the provided properties. This method is called when a new attribute is created and should set up the attribute's state based on the provided properties. It can also be used to generate a unique ASEID for the attribute based on its name and content, which can be used for caching and identification purposes within the ARE framework.
   * 
   * @param newEntity 
   */
  fromNew(newEntity) {
    this.aseid = this.generateASEID({
      entity: newEntity.name
      // id: id,
    });
    this.name = newEntity.name;
    this.prefix = newEntity.prefix;
    this.raw = newEntity.raw;
    this.content = newEntity.content;
  }
  // =====================================================================================
  // ------------------------------- Attribute Methods ------------------------------
  // =====================================================================================
  /**
   * Creates a clone of the current attribute instance. This method can be used to create a new instance of the attribute with the same properties and state as the original, which can be useful in scenarios where you want to reuse an attribute's configuration or create variations of it without modifying the original instance.
   * 
   * @returns 
   */
  clone() {
    return new this.constructor({
      name: this.name,
      raw: this.raw,
      content: this.content,
      prefix: this.prefix
    });
  }
  // =====================================================================================
  // ------------------------------- Attribute Lifecycle ------------------------------
  // =====================================================================================
  /**
   * Initializes the attribute. This method is called when the attribute is first created and should set up any necessary state or perform any initial processing based on the provided content and context. It can also be used to validate the attribute's content and throw errors if it is invalid.
   * 
   * @param scope 
   */
  init(scope) {
    this.call(AreAttributeFeatures.Init, scope || this.scope);
  }
  /**
   * Generates all rendering instructions for the attribute. This method is called during the compilation phase of the ARE component and should return an array of instructions that describe how to render the attribute based on its content and context. The instructions can include details such as which DOM properties to set, which events to listen for, and how to update the attribute when the underlying data changes.
   * 
   * @param scope 
   */
  transform(scope) {
    this.call(AreAttributeFeatures.Transform, scope || this.scope);
  }
  compile(scope) {
    this.call(AreAttributeFeatures.Compile, scope || this.scope);
  }
  /**
   * Updates the attribute based on changes in the store or other dependencies. This method is called during the update phase of the ARE component and should perform any necessary updates to the attribute based on changes in the underlying data or context. This can include tasks such as updating DOM properties, re-evaluating expressions, or modifying event listeners to ensure that the attribute remains in sync with the current state of the application.
   * 
   * @param scope 
   */
  update(scope) {
    this.call(AreAttributeFeatures.Update, scope || this.scope);
  }
  /**
   * Validates the attribute's content and context. This method is called during the validation phase of the ARE component and should check whether the attribute's content is valid based on its expected format, type, or other constraints. If the content is invalid, this method should throw an error with a descriptive message to help developers identify and fix the issue.
   * 
   * @param scope 
   */
  validate(scope) {
    this.call(AreAttributeFeatures.Validate, scope || this.scope);
  }
};
__decorateClass([
  A_Frame.Method({
    description: "Compile the attribute. This method should transform attribute details into a set of SceneInstructions. It may also modify attribute value, since this field is editable during runtime."
  })
], AreAttribute.prototype, "compile", 1);
AreAttribute = __decorateClass([
  A_Frame.Component({
    namespace: "A-ARE",
    name: "AreAttribute",
    description: "Represents an HTML attribute within the A-Concept Rendering Engine (ARE) framework, encapsulating the attribute's name, raw content, evaluated value, and associated features for initialization, transformation, compilation, updating, and validation."
  })
], AreAttribute);

// src/lib/AreNode/AreNode.constants.ts
var AreNodeFeatures = {
  // ==============================================================================
  // Lifecycle features
  // ==============================================================================
  /**
   * Feature that is called to handle before init lifecycle of the element node
   */
  onBeforeInit: "_AreNode_onBeforeInit",
  /**
   * Feature that is called to init the element node
   */
  onInit: "_AreNode_onInit",
  /**
   * 
   */
  onAfterInit: "_AreNode_onAfterInit",
  /**
   * Feature that is called to handle before mount lifecycle of the element node
   */
  onBeforeMount: "_AreNode_onBeforeMount",
  /**
   * Feature that is called to mount the element node
   */
  onMount: "_AreNode_onMount",
  /**
   * Feature that is called to handle after mount lifecycle of the element node
   */
  onAfterMount: "_AreNode_onAfterMount",
  /**
   * Feature that is called to handle before update lifecycle of the element node
   */
  onBeforeUpdate: "_AreNode_onBeforeUpdate",
  /**
   * Feature that is called to handle update lifecycle of the element node
   */
  onUpdate: "_AreNode_onUpdate",
  /**
   * Feature that is called to handle after update lifecycle of the element node
   */
  onAfterUpdate: "_AreNode_onAfterUpdate",
  /**
   * Feature that is called to handle before unmount lifecycle of the element node
   */
  onBeforeUnmount: "_AreNode_onBeforeUnmount",
  /**
   * Feature that is called to unmount the element node
   */
  onUnmount: "_AreNode_onUnmount",
  /**
   * Feature that is called to handle after unmount lifecycle of the element node
   */
  onAfterUnmount: "_AreNode_onAfterUnmount",
  /**
   * Feature that is called to handle before destroy lifecycle of the element node
   */
  onBeforeDestroy: "_AreNode_onBeforeDestroy",
  /**
   * Feature that is called to handle before destroy lifecycle of the element node
   */
  onDestroy: "_AreNode_onDestroy",
  /**
   * Feature that is called to handle after destroy lifecycle of the element node
   */
  onAfterDestroy: "_AreNode_onAfterDestroy",
  //=============================================================================
  // Build features
  // ==============================================================================
  /**
   * Feature that is called to tokenize the element node template and extract its content, attributes, and child nodes. 
   */
  onTokenize: "_AreNode_onTokenize",
  /**
   * Feature that is called to transform the element node template, markup, styles, and data into a format that can be used for compilation. This feature is responsible for processing the raw template and extracting the necessary information to create the render plan and instructions for the node.
   */
  onTransform: "_AreNode_onTransform",
  /**
   * Event fired when the element node is interpreted
   */
  onInterpret: "_AreNode_onInterpret",
  /**
   * Feature that is called to compile the element node
   */
  onCompile: "_AreNode_onCompile",
  /**
   * Feature that is called to handle events
   */
  onEmit: "_AreNode_onEmit"
};
var AreNodeStatuses = {
  /**
   * Status indicating that the node is pending compilation. When a node is in the pending status, it means that it has been created but has not yet been compiled. During this phase, the node is typically being prepared for compilation, which may involve setting up its template, markup, styles, and any associated data or context. Once the node is ready for compilation, its status will change to "compiling".
   */
  Pending: "pending",
  /**
   * Status indicating that the node is in the process of being compiled. During this status, the node is being analyzed and transformed based on its template, markup, and styles to generate the necessary instructions for rendering and updating the node in the scene.
   */
  Compiling: "compiling",
  /**
   * Status indicating that the node has been compiled and is ready to be rendered. In this status, the node has generated all the necessary instructions and is prepared to be mounted in the scene.
   */
  Compiled: "compiled",
  /**
   * Status indicating that the node is currently mounted in the scene. When a node is mounted, it means that it has been rendered and is actively part of the scene's structure and content.
   */
  Mounted: "mounted",
  /**
   * Status indicating that the node has been unmounted from the scene. When a node is unmounted, it means that it has been removed from the scene's structure and content, and is no longer actively rendered in the scene.
   */
  Unmounted: "unmounted"
};
var AreContext = class extends A_ExecutionContext {
  constructor(source = "") {
    super("AreContext");
    /**
     * The roots array holds references to the root nodes of the ARE scene, allowing for easy access and management of the top-level components in the rendering hierarchy. The signalsMap is a mapping between root nodes and their associated signal vectors, enabling efficient management of reactive updates and interactions within the ARE framework based on changes in the application state or user input.
     */
    this._roots = [];
    /**
     * This property stores a map between root node and conditions that should be met to render particular component inside the root node. This can be used to manage complex rendering logic and to optimize performance by ensuring that components are only rendered when necessary based on the defined conditions.
     */
    this._signalsMap = /* @__PURE__ */ new Map();
    this._performance = /* @__PURE__ */ new Map();
    this._performanceStart = /* @__PURE__ */ new Map();
    this._performanceDepth = /* @__PURE__ */ new Map();
    this._source = source;
  }
  /**
   * The global object can be used to store any global data or configurations that need to be accessed across different components and entities within the ARE framework. This can include things like theme settings, user preferences, or any other shared data that is relevant to the entire scene or application. By centralizing this information in the context, it allows for easier management and access to global state without needing to pass it through multiple layers of components or entities.
   */
  get globals() {
    return this.get("globals") || {};
  }
  /**
   * The scope of the context, which can be used to access other entities and features within the same scope. This is particularly useful for components that need to interact with other parts of the scene or component, as it allows them to access shared data and functionality without needing to pass it explicitly through parameters.
   */
  get scope() {
    return A_Context.scope(this);
  }
  /**
   * The roots array holds references to the root nodes of the ARE scene, allowing for easy access and management of the top-level components in the rendering hierarchy. The signalsMap is a mapping between root nodes and their associated signal vectors, enabling efficient management of reactive updates and interactions within the ARE framework based on changes in the application state or user input.
   */
  get roots() {
    return this._roots;
  }
  /**
   * This property stores a map between root node and conditions that should be met to render particular component inside the root node. This can be used to manage complex rendering logic and to optimize performance by ensuring that components are only rendered when necessary based on the defined conditions.
   */
  get source() {
    return this._source;
  }
  get performance() {
    const perfObj = [];
    this._performance.forEach((value, key) => {
      perfObj.push(`${key}: ${value} ms`);
    });
    return perfObj;
  }
  get stats() {
    return [
      `- Total Roots: ${this._roots.length}`,
      `- Total Nodes in Scene: ${this._roots.reduce((acc, root) => acc + this.countNodes(root), 0)}`,
      `- Total Instructions: ${this._roots.reduce((acc, root) => acc + this.countInstructions(root), 0)}`
    ];
  }
  countInstructions(node) {
    let count = 0;
    if (node.scene) {
      count += node.scene.instructions.length;
    }
    for (const child of node.children) {
      count += this.countInstructions(child);
    }
    return count;
  }
  countNodes(node) {
    let count = 1;
    for (const child of node.children) {
      count += this.countNodes(child);
    }
    return count;
  }
  /**
   * This property stores a map between root node and conditions that should be met to render particular component inside the root node. This can be used to manage complex rendering logic and to optimize performance by ensuring that components are only rendered when necessary based on the defined conditions.
   * 
   * @param node 
   */
  addRoot(node) {
    this._roots.push(node);
    this.scope.register(node);
  }
  /**
   * This property stores a map between root node and conditions that should be met to render particular component inside the root node. This can be used to manage complex rendering logic and to optimize performance by ensuring that components are only rendered when necessary based on the defined conditions.
   * 
   * @param node 
   */
  removeRoot(node) {
    this._roots = this._roots.filter((r) => r.aseid.toString() !== node.aseid.toString());
  }
  startPerformance(label = "default") {
    const depth = this._performanceDepth.get(label) || 0;
    this._performanceDepth.set(label, depth + 1);
    if (depth === 0) {
      this._performanceStart.set(label, Date.now());
    }
  }
  endPerformance(label) {
    const depth = this._performanceDepth.get(label) || 0;
    if (depth <= 1) {
      const startTime = this._performanceStart.get(label) || this._performanceStart.get("default");
      if (startTime) {
        const duration = Date.now() - startTime;
        const accumulated = this._performance.get(label) || 0;
        this._performance.set(label, accumulated + duration);
        this._performanceStart.delete(label);
      }
      this._performanceDepth.delete(label);
    } else {
      this._performanceDepth.set(label, depth - 1);
    }
  }
};
AreContext = __decorateClass([
  A_Frame.Fragment({
    namespace: "A-ARE",
    name: "AreContext",
    description: "Context fragment for the A-Concept Rendering Engine (ARE) framework, serving as a foundational component for managing shared state and configurations within the ARE environment. This Context uses to encapsulate global settings, resources, and utilities that can be accessed by various ARE components and entities during the rendering and interaction processes."
  })
], AreContext);

// src/lib/AreNode/AreNode.entity.ts
var AreNode = class extends A_Entity {
  /**
   * Actual node identifier. 
   */
  get id() {
    return this.aseid.id;
  }
  /**
   * Actual node type. 
   * By default it's a tag name
   */
  get type() {
    return this.aseid.entity;
  }
  /**
   * Content string defined for the node — the inner content between delimiters.
   * Example: `{{name}}`
   */
  get content() {
    return this._content;
  }
  /**
   * Markup string defined for the node
   * Example: `<custom-component :prop="value"> <div>Inner Content</div> </custom-component>`
   */
  get markup() {
    return this._markup;
  }
  /**
   * The scope associated with this node
   * uses to store all nested fragments and entities like other AreNodes and Scene
   */
  get scope() {
    if (!this._scope) {
      this._scope = A_Context.allocate(this, new A_Scope({ name: `${this.aseid.id}-scope` }));
    }
    return this._scope;
  }
  /**
   * The attributes defined for the node, which can include static attributes, binding attributes, directive attributes, and event attributes. These attributes are extracted during tokenization and processed during the compilation phase to generate the corresponding SceneInstructions for rendering and updating the node in the scene.
   */
  get attributes() {
    return this.scope.resolveFlatAll(AreAttribute);
  }
  /**
   * A custom component associated with this node, which can be used to provide custom logic and behavior for the node. This component is typically defined in the context and can be resolved based on the node's type or other identifying information. The component can include its own content, markup, styles, and features that are specific to the functionality it provides.
   * 
   * Example: If the node type is "custom-component", the corresponding component would be resolved from the context and can be used to provide custom rendering and behavior for nodes of that type.
   * 
   * [!] Note: The component is optional and may not be defined for all nodes. If no component is associated with the node, it will be treated as a standard HTML element or a basic node without custom logic.
   */
  get component() {
    return this.scope.resolve(A_FormatterHelper.toPascalCase(this.aseid.entity));
  }
  /**
   * The parent node of this node, which is the node that registered the current node in its scope. This is typically the node that is responsible for rendering the current node and managing its lifecycle within the scene. The parent node can be used to access shared context, propagate events, and manage interactions between nodes in a hierarchical structure.
   * 
   * Example: For a node defined as `<div><span>Child Node</span></div>`, the parent node of the `<span>` element would be the `<div>` element, which is responsible for rendering the `<span>` and managing its lifecycle within the scene.
   */
  get parent() {
    const parentIssuer = this.scope.parent?.issuer();
    if (!parentIssuer || !(parentIssuer instanceof AreNode)) return void 0;
    return parentIssuer;
  }
  /**
   * The child nodes of this node, which are typically defined in the markup and registered in the scope as child entities. These child nodes can represent nested elements or components within the node and can have their own content, markup, styles, and features. The child nodes are managed within the scope of the parent node and can be accessed and manipulated as needed for rendering, updating, and lifecycle management.
   * 
   * Example: For a node defined as `<div><span>Child Node</span></div>`, the child node would be the `<span>` element, which is registered as a child entity in the scope of the parent `<div>` node.
   */
  get children() {
    return this.scope.resolveFlatAll(AreNode) || [];
  }
  /**
   * It returns the scene where the node exists, so it should be the scene of the rootNode, 
   * primary parent of this node.
   */
  get scene() {
    if (!this._scene)
      this._scene = this.scope.resolve(AreScene);
    return this._scene;
  }
  fromNew(newEntity) {
    this.aseid = this.generateASEID({
      id: newEntity.payload?.id,
      entity: newEntity.payload?.entity || "node",
      scope: newEntity.payload?.scope
    });
    this.status = AreNodeStatuses.Pending;
    this._content = newEntity.content || "";
    this._markup = newEntity.raw || "";
    this._opening = newEntity.opening || "";
    this._closing = newEntity.closing || "";
    this._position = newEntity.position || 0;
    this._payload = newEntity.payload;
  }
  fromASEID(aseid) {
    super.fromASEID(aseid);
    this._content = "";
    this._markup = "";
    this.status = AreNodeStatuses.Pending;
  }
  /**
   * Sets the content string for the node — the inner text/markup between the node's
   * opening and closing delimiters. Content is processed by the rendering engine to
   * generate the corresponding SceneInstructions for rendering the node.
   * 
   * @param content 
   */
  setContent(content) {
    this._content = content;
  }
  /**
   * Sets the markup string for the node, which is the full raw matched string including delimiters. The markup can include HTML-like syntax, custom components, directives, and other features that are processed by the rendering engine to generate the corresponding SceneInstructions for rendering the node.
   * 
   * @param markup 
   */
  setMarkup(markup) {
    this._markup = markup;
  }
  /**
   * Adds a child node to the current node's scope and ensures the child inherits from this node's scope.
   * 
   * @param child - The node to add as a child
   */
  addChild(child) {
    this.scope.register(child);
    if (!child.scope.isInheritedFrom(this.scope))
      child.scope.inherit(this.scope);
  }
  /**
   * Removes a child node from the current node's scope. This is typically used when a child node is no longer needed or should be detached from the parent node. The method ensures that the child node is properly deregistered from the scope and any associated resources are cleaned up as necessary.
   * 
   * @param node  - The child node to be removed from the current node's scope
   */
  removeChild(node) {
    this.scope.deregister(node);
  }
  // ============================================================================================
  //                                Node Lifecycle Methods
  // ============================================================================================
  /**
   * Executes initialization logic for the node, which typically involves setting up the node's scope, registering any necessary entities, and preparing the node for rendering and interaction within the scene. This method is called during the initial phase of the node's lifecycle and is responsible for ensuring that the node is properly initialized before it is compiled and rendered in the scene.
   */
  init() {
    this.call(AreNodeFeatures.onBeforeInit, this.scope);
    this.call(AreNodeFeatures.onInit, this.scope);
    this.call(AreNodeFeatures.onAfterInit, this.scope);
  }
  /**
   * Loads the node, which typically involves executing any necessary setup or initialization logic to prepare the node for rendering and interaction within the scene. This may include processing the node's content, markup, styles, and features to generate the corresponding SceneInstructions, as well as setting up any event listeners or reactive properties as needed.
   */
  async load() {
    this.checkScopeInheritance();
    try {
      const context = this.scope.resolve(AreContext);
      context?.startPerformance("Node Load");
      const res = super.load(this.scope);
      context?.endPerformance("Node Load");
      return res;
    } catch (error) {
      throw error;
    }
  }
  /**
   * Tokenizes the node content, which typically involves parsing the raw content string to identify the structure, child nodes, attributes, directives, and other features. This process is essential for breaking down the content into its constituent parts and preparing it for further processing during the compilation phase. The tokenization process can involve creating child nodes, extracting attributes and their values, and identifying any directives or bindings that need to be processed during rendering.
   */
  tokenize() {
    this.checkScopeInheritance();
    try {
      const context = this.scope.resolve(AreContext);
      context?.startPerformance("Node Tokenize");
      this.call(AreNodeFeatures.onTokenize, this.scope);
      context?.endPerformance("Node Tokenize");
    } catch (error) {
      throw error;
    }
  }
  /**
   * Transforms the node, which typically involves executing any necessary logic to reshape the node's structure or content before it is compiled and rendered in the scene. This may include applying any transformations defined by directives, processing any dynamic content or expressions, and performing any other necessary tasks to ensure that the node is properly prepared for compilation and rendering based on its content, markup, styles, and features.
   */
  transform() {
    this.checkScopeInheritance();
    try {
      const context = this.scope.resolve(AreContext);
      context?.startPerformance("Node Transform");
      this.call(AreNodeFeatures.onTransform, this.scope);
      context?.endPerformance("Node Transform");
    } catch (error) {
      throw error;
    }
  }
  /**
   * Compile the node. This method should transform the node's content, markup, and styles into a set of SceneInstructions that can be executed to render the node in the scene. The compile method is responsible for processing the node's features, attributes, directives, and other properties to generate the necessary instructions for rendering and updating the node in response to changes in state or context.
   * 
   * [!] Note: The compile method should ensure that the node's scope is properly inherited from the context scope before processing, and it should handle any errors that may occur during compilation to ensure that the node can be rendered correctly in the scene.
   */
  compile() {
    this.checkScopeInheritance();
    try {
      const context = this.scope.resolve(AreContext);
      context?.startPerformance("Node Compile");
      this.call(AreNodeFeatures.onCompile, this.scope);
      context?.endPerformance("Node Compile");
    } catch (error) {
      throw error;
    }
  }
  /**
   * Mounts the node, which typically involves executing any necessary logic to render the node in the scene and to set up any interactions or behaviors associated with the node. This may include applying the generated SceneInstructions from the compile phase, attaching event listeners, and performing any other necessary tasks to ensure that the node is properly rendered and functional within the scene.
   * 
   * [!] Note: The mount method should ensure that the node's scope is properly inherited from the context scope before performing any mounting logic, and it should handle any errors that may occur during mounting to ensure that the node can be rendered correctly in the scene.
   */
  mount() {
    this.checkScopeInheritance();
    try {
      const context = this.scope.resolve(AreContext);
      context?.startPerformance("Node Mount");
      this.call(AreNodeFeatures.onBeforeMount, this.scope);
      this.call(AreNodeFeatures.onMount, this.scope);
      this.call(AreNodeFeatures.onAfterMount, this.scope);
      context?.endPerformance("Node Mount");
    } catch (error) {
      throw error;
    }
  }
  /**
   * Interprets the node, which typically involves executing any necessary logic to process the node's features, attributes, directives, and other properties to generate the corresponding SceneInstructions for rendering and updating the node in response to changes in state or context. This method is responsible for ensuring that the node is properly interpreted based on its content, markup, styles, and features to enable dynamic behavior and responsiveness within the scene.
   * 
   * [!] Note: The interpret method should NOT go though own child, since it may be used by both mount and update operations!
   */
  interpret() {
    this.checkScopeInheritance();
    try {
      const context = this.scope.resolve(AreContext);
      context?.startPerformance("Node Interpret");
      this.call(AreNodeFeatures.onInterpret, this.scope);
      context?.endPerformance("Node Interpret");
    } catch (error) {
      throw error;
    }
  }
  /**
   * Updates the node, which typically involves executing any necessary logic to update the node's rendering and behavior in response to changes in state, context, or other factors. This may include reapplying SceneInstructions, updating event listeners, and performing any other necessary tasks to ensure that the node remains functional and correctly rendered within the scene as changes occur.
   * 
   * [!] Note: The update method should ensure that the node's scope is properly inherited from the context scope before performing any update logic, and it should handle any errors that may occur during updating to ensure that the node can be updated correctly in the scene.
   */
  update() {
    this.checkScopeInheritance();
    try {
      const context = this.scope.resolve(AreContext);
      context?.startPerformance("Node Update");
      this.call(AreNodeFeatures.onBeforeUpdate, this.scope);
      this.call(AreNodeFeatures.onUpdate, this.scope);
      this.call(AreNodeFeatures.onAfterUpdate, this.scope);
      context?.endPerformance("Node Update");
    } catch (error) {
      throw error;
    }
  }
  /**
   * Unmounts the node, which typically involves executing any necessary logic to remove the node from the scene and to clean up any resources associated with the node. This may include reverting any applied SceneInstructions, detaching event listeners, and performing any other necessary tasks to ensure that the node is properly removed from the scene and that resources are released as needed.
   * 
   * [!] Note: The unmount method should ensure that the node's scope is properly inherited from the context scope before performing any unmounting logic, and it should handle any errors that may occur during unmounting to ensure that the node can be removed correctly from the scene.
   */
  unmount() {
    this.checkScopeInheritance();
    try {
      const context = this.scope.resolve(AreContext);
      context?.startPerformance("Node Unmount");
      this.call(AreNodeFeatures.onBeforeUnmount, this.scope);
      this.call(AreNodeFeatures.onUnmount, this.scope);
      this.call(AreNodeFeatures.onAfterUnmount, this.scope);
      context?.endPerformance("Node Unmount");
    } catch (error) {
      throw error;
    }
  }
  cloneWithScope() {
    const currentScope = this.scope;
    A_Context.deallocate(currentScope);
    const newNode = new this.constructor({
      opening: this._opening,
      closing: this._closing,
      position: this._position,
      payload: this._payload || {},
      content: this._content,
      raw: this._markup
    });
    if (newNode._scope)
      A_Context.deallocate(newNode._scope);
    newNode._scope = currentScope;
    A_Context.allocate(newNode, currentScope);
    this._scope = A_Context.allocate(this);
    return newNode;
  }
  reset() {
    for (const child of this.children) {
      this.scope.deregister(child);
    }
    for (const attribute of this.attributes) {
      this.scope.deregister(attribute);
    }
  }
  clone() {
    const newNode = new this.constructor({
      opening: this._opening,
      closing: this._closing,
      position: this._position,
      payload: this._payload || {},
      content: this._content,
      raw: this._markup
    });
    for (const child of this.children) {
      newNode.addChild(child.clone());
    }
    for (const attribute of this.attributes) {
      newNode.scope.register(attribute.clone());
    }
    return newNode;
  }
  async emit(eventOrScope) {
    this.checkScopeInheritance();
    const eventScope = A_TypeGuards.isScopeInstance(eventOrScope) ? eventOrScope.inherit(this.scope) : new A_Scope({
      name: `${eventOrScope.name}-scope`,
      fragments: [eventOrScope]
    }).inherit(this.scope);
    try {
      await this.call(AreNodeFeatures.onEmit, eventScope);
      eventScope.destroy();
    } catch (error) {
      eventScope.destroy();
      throw error;
    }
  }
  /**
   * Destroys the node, which typically involves executing any necessary cleanup logic to remove the node from the scene and to free up any resources associated with the node. This may include deregistering the node from its scope, removing any event listeners or reactive properties, and performing any other necessary cleanup tasks to ensure that the node is properly removed from the scene and that resources are released as needed.
   * 
   * [!] Note: The destroy method should ensure that the node's scope is properly inherited from the context scope before performing any cleanup, and it should handle any errors that may occur during destruction to ensure that resources are released correctly.
   */
  async destroy() {
    this.checkScopeInheritance();
    try {
      await super.destroy(this.scope);
      this.scope.destroy();
    } catch (error) {
      this._scope.destroy();
      throw error;
    }
  }
  //============================================================================================
  //                                Helpers Methods
  //============================================================================================
  /**
   * Method to ensure that the current scope is inherited from the context scope
   * 
   * @throws A_Error if the scope is not inherited from the context scope
   */
  checkScopeInheritance() {
    let attachedScope;
    try {
      attachedScope = A_Context.scope(this);
    } catch (error) {
      throw new A_Error({
        title: `A_UI_Node Scope Inheritance Error`,
        description: `The A_UI_Node entity with ASEID '${this.aseid.toString()}' is not bound to any context scope. Please ensure that the entity is created within a valid context.`,
        originalError: error
      });
    }
  }
};
AreNode = __decorateClass([
  A_Frame.Entity({
    namespace: "A-ARE",
    name: "AreNode",
    description: "An AreNode entity represents a node within the A-Concept Rendering Engine (ARE) framework. It encapsulates content, markup, and styles, and manages its own scope for nested fragments and entities. AreNodes are responsible for handling events, compiling, rendering, updating, and lifecycle management within the ARE context."
  })
], AreNode);
var AreEvent = class extends A_ExecutionContext {
};
AreEvent = __decorateClass([
  A_Frame.Fragment({
    namespace: "A-ARE",
    name: "AreEvent",
    description: "Event context for managing events within the A-Concept Rendering Engine (ARE) framework, encapsulating event data and associated nodes to facilitate event-driven interactions."
  })
], AreEvent);
var AreSignalsMeta = class extends A_ComponentMeta {
  registerCondition(component, vector) {
    const vectorToComponent = this.get("vectorToComponent") || /* @__PURE__ */ new Map();
    const componentToVector = this.get("componentToVector") || /* @__PURE__ */ new Map();
    vectorToComponent.set(vector, component);
    if (!componentToVector.has(component)) {
      componentToVector.set(component, /* @__PURE__ */ new Set());
    }
    componentToVector.get(component)?.add(vector);
    this.set("vectorToComponent", vectorToComponent);
    this.set("componentToVector", componentToVector);
  }
  findComponentByVector(vector) {
    const vectorToComponent = this.get("vectorToComponent");
    if (vectorToComponent) {
      const component = vectorToComponent.get(vector);
      if (component) {
        return component;
      }
    }
    if (vectorToComponent) {
      for (const [registeredVector, component] of vectorToComponent.entries()) {
        if (vector.equals(registeredVector)) {
          return component;
        }
      }
      for (const [registeredVector, component] of vectorToComponent.entries()) {
        if (vector.match(registeredVector)) {
          return component;
        }
      }
      for (const [registeredVector, component] of vectorToComponent.entries()) {
        if (vector.includes(registeredVector)) {
          return component;
        }
      }
    }
    return void 0;
  }
};
var AreSignalsContext = class extends A_Fragment {
  constructor(config) {
    super({ name: "AreSignalsContext" });
    /**
     * Where key is the root ID and the value is an Array of components that participate in conditional compilation.
     */
    this._componentMap = /* @__PURE__ */ new Map();
    this._defaultsMap = /* @__PURE__ */ new Map();
    this._conditionsMap = /* @__PURE__ */ new Map();
    this._subscribers = /* @__PURE__ */ new Set();
    const configEntries = config ? Object.entries(config) : [];
    for (const [rootId, conf] of configEntries) {
      const def = conf?.default;
      const pool = conf?.pool || [];
      const conditions = conf?.conditions || [];
      this._componentMap.set(rootId, new Set(pool));
      if (def)
        this._defaultsMap.set(rootId, def);
      this._conditionsMap.set(rootId, conditions);
    }
  }
  signalsMeta() {
    const signalsMeta = A_Context.meta(AreSignals);
    if (!signalsMeta) {
      throw new Error("AreSignalsMeta not found in context. Please ensure that AreSignalsMeta is properly registered in the A-Concept context.");
    }
    return signalsMeta;
  }
  subscribe(subscriber) {
    this._subscribers.add(subscriber);
  }
  unsubscribe(subscriber) {
    this._subscribers.delete(subscriber);
  }
  get subscribers() {
    return this._subscribers;
  }
  /**
   * Returns the components associated with the given ID. If no components are found, returns an empty array.
   * 
   * @param id The ID of the component group.
   * @returns An array of component constructors.
   */
  getComponentById(id) {
    const set = this._componentMap.get(id) || /* @__PURE__ */ new Set();
    return Array.from(set);
  }
  /**
   * Returns the components associated with the root ID of the given node. If no components are found, returns an empty array.
   * 
   * @param node The AreNode whose root ID is used to retrieve the components.
   * @returns An array of component constructors.
   */
  getComponentByRoot(node) {
    return this.getComponentById(node.id);
  }
  /**
   * Adds a new component to the specified root ID. If the root ID does not exist, it will be created.
   * 
   * @param rootId The ID of the root component group.
   * @param components An array of component constructors to add.
   */
  extendRoot(rootId, components) {
    if (!this._componentMap.has(rootId)) {
      this._componentMap.set(rootId, /* @__PURE__ */ new Set());
    }
    const set = this._componentMap.get(rootId);
    for (const comp of components) {
      set.add(comp);
    }
  }
  /**
   * Whether routing is configured for the given root ID.
   * When false, the root should leave its original template content untouched.
   * 
   * @param rootId The id attribute of the <are-root> element.
   */
  hasRoot(rootId) {
    return this._componentMap.has(rootId) || this._conditionsMap.has(rootId);
  }
  /**
   * Returns the default component associated with the given root ID, if any.
   * 
   * @param rootId The ID of the root component group.
   */
  getDefault(rootId) {
    return this._defaultsMap.get(rootId);
  }
  /**
   * Finds the matching component for the given root ID and incoming signal vector.
   * 
   * Matching priorities (mirroring AreSignalsMeta):
   * 1. Full equivalence  — vector.equals(conditionVector)
   * 2. Logical match     — vector.match(conditionVector)
   * 3. Inclusion         — incoming vector contains every signal type from condition, checked with signal.compare()
   * 
   * @param rootId  The id attribute of the <are-root> element.
   * @param vector  The incoming signal vector from the bus.
   */
  findComponentByVector(rootId, vector) {
    const conditions = this._conditionsMap.get(rootId) || [];
    for (const condition of conditions) {
      const conditionVector = new A_SignalVector(condition.vector);
      if (vector.equals(conditionVector)) {
        return condition.component;
      }
    }
    for (const condition of conditions) {
      const conditionVector = new A_SignalVector(condition.vector);
      if (vector.match(conditionVector)) {
        return condition.component;
      }
    }
    for (const condition of conditions) {
      const allMatch = condition.vector.every((condSignal) => {
        for (const incomingSignal of vector) {
          if (!incomingSignal)
            continue;
          if (incomingSignal.constructor === condSignal.constructor && condSignal.compare(incomingSignal)) {
            return true;
          }
        }
        return false;
      });
      if (allMatch) {
        return condition.component;
      }
    }
    return void 0;
  }
};
AreSignalsContext = __decorateClass([
  A_Frame.Fragment({
    description: "AreSignalsContext is a fragment that manages the set of root nodes subscribed to the signal bus. It tracks which Are components should receive signal vectors from AreSignals and provides the subscriber registry used during signal dispatch."
  })
], AreSignalsContext);

// src/lib/AreSignals/AreSignals.component.ts
var AreSignals = class extends A_Component {
  async handleSignalVector(vector, context, state, scope, logger) {
    logger?.debug(`Handling Signal Vector with ${context.subscribers.size} root nodes.`, vector);
    try {
      for (const root of context.subscribers) {
        const callScope = new A_Scope({
          fragments: [new AreEvent(
            AreFeatures.onSignal,
            {
              vector
            }
          )]
        }).import(scope, root.scope);
        logger?.debug("Emitting signal for root node:", vector);
        await root.emit(callScope);
        callScope.destroy();
      }
    } catch (error) {
      logger?.error(error);
    }
  }
  async propagateEvent(node, scope, event, feature, logger, ...args) {
    let currentNode = node;
    let target = node;
    while (currentNode && currentNode.parent) {
      if (currentNode.component) {
        target = currentNode;
        break;
      }
      currentNode = currentNode.parent;
    }
    if (target.component)
      await feature.chain(target.component, event.name, scope);
  }
};
__decorateClass([
  A_Feature.Extend({
    name: A_SignalBusFeatures.onNext
  }),
  __decorateParam(0, A_Inject(A_SignalVector)),
  __decorateParam(1, A_Inject(AreSignalsContext)),
  __decorateParam(2, A_Inject(A_SignalState)),
  __decorateParam(3, A_Inject(A_Scope)),
  __decorateParam(4, A_Inject(A_Logger))
], AreSignals.prototype, "handleSignalVector", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onEmit,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreEvent)),
  __decorateParam(3, A_Inject(A_Feature)),
  __decorateParam(4, A_Inject(A_Logger))
], AreSignals.prototype, "propagateEvent", 1);
AreSignals = __decorateClass([
  A_Frame.Component({
    namespace: "A-ARE",
    name: "AreSignals",
    description: "AreSignals is the central signal bus component within the ARE framework. It listens for incoming signal vectors and dispatches them to all subscribed root nodes, enabling reactive, event-driven rendering and lifecycle management across the component tree."
  }),
  A_Meta.Define(AreSignalsMeta)
], AreSignals);
var AreMeta = class extends A_ComponentMeta {
};

// src/lib/AreComponent/Are.component.ts
var Are = class extends A_Component {
  constructor() {
    super(...arguments);
    // ==================================================================================
    // ========================= COMPONENT PROPERTIES ===================================
    // ==================================================================================
    /**
     * Props can be used to store any additional data or configuration for the component. They are not reactive by default but can be used in the component's methods and lifecycle hooks to manage state or pass information. Props can be defined as a simple object with key-value pairs, where keys are the prop names and values are the prop values. They can be accessed and modified within the component's methods to influence rendering or behavior based on the component's state or external inputs.
     */
    this.props = {};
  }
  static Condition(signals) {
    return function(target) {
      const componentMeta = A_Context.meta(target);
      const signalsMeta = A_Context.meta(AreSignals);
      let vector;
      switch (true) {
        case signals instanceof A_SignalVector:
          vector = signals;
          break;
        case Array.isArray(signals):
          vector = new A_SignalVector(signals);
          break;
        default:
          throw new Error("Invalid input for Are.Condition. Expected an array of A_Signal or an instance of A_SignalVector.");
      }
      if (vector) {
        componentMeta.vector = vector;
        signalsMeta.registerCondition(target, vector);
      }
      return target;
    };
  }
  //==================================================================================
  //======================== LIFECYCLE DECORATORS ====================================
  //==================================================================================
  /**
   * Allows to define a custom method for the component's template. This method should return a string representing the HTML template of the component. The template can include dynamic content and bindings that will be processed during rendering to create the final DOM structure for the component.
   */
  static get EventHandler() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: propertyKey,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Allows to define a custom method for the component's template. This method should return a string representing the HTML template of the component. The template can include dynamic content and bindings that will be processed during rendering to create the final DOM structure for the component.
   */
  static get onBeforeInit() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: AreFeatures.onBeforeInit,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Allows to define a custom method for the component's initialization logic. This method is called after the component is instantiated but before it is rendered, and can be used to set up any necessary state, perform data fetching, or execute any other logic that needs to happen before the component is rendered for the first time.
   */
  static get onAfterInit() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: AreFeatures.onAfterInit,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Allows to define a custom method for the component's mounting logic. This method is called after the component has been rendered and added to the DOM, and can be used to perform any necessary setup or initialization that requires access to the DOM elements of the component. It can also be used to implement custom logic for handling specific features or behaviors of the component during the mounting process.
   */
  static get onBeforeMount() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: AreFeatures.onBeforeMount,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Allows to define a custom method for the component's logic that should be executed after the component is mounted. This method is called after the component has been rendered and added to the DOM, and can be used to perform any necessary setup or initialization that requires access to the DOM elements of the component. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-mounting process.
   */
  static get onAfterMount() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: AreFeatures.onAfterMount,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Allows to define a custom method for the component's unmounting logic. This method is called before the component is removed from the DOM, and can be used to perform any necessary cleanup or teardown, such as removing event listeners, canceling timers, or releasing any resources that were allocated during the component's lifecycle. It can also be used to implement custom logic for handling specific features or behaviors of the component during the unmounting process.
   */
  static get onBeforeUnmount() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: AreFeatures.onBeforeUnmount,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Allows to define a custom method for the component's logic that should be executed after the component is unmounted. This method is called after the component has been removed from the DOM, and can be used to perform any necessary cleanup or teardown that needs to happen after the component is no longer in the DOM. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-unmounting process.
   */
  static get onAfterUnmount() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: AreFeatures.onAfterUnmount,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Allows to define a custom method for the component's update logic. This method is called whenever the component's state changes and can be used to perform any necessary updates or side effects based on the new state. It can also be used to optimize performance by implementing custom logic for determining when the component should re-render based on specific state changes.
   */
  static get onBeforeUpdate() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: AreFeatures.onBeforeUpdate,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Allows to define a custom method for the component's logic that should be executed after the component's state has been updated. This method is called after the component has re-rendered in response to state changes, and can be used to perform any necessary side effects or additional updates based on the new state. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-update process.
   */
  static get onAfterUpdate() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: AreFeatures.onAfterUpdate,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Allows to define a custom method for the component's template. This method should return a string representing the HTML template of the component. The template can include dynamic content and bindings that will be processed during rendering to create the final DOM structure for the component.
   */
  static get Template() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: AreFeatures.onTemplate,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Allows to define a custom method for the component's styles. This method should return a string representing the CSS styles of the component. The styles can include dynamic content and can be processed during rendering to apply the appropriate styles to the component's DOM elements.
   */
  static get Styles() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: AreFeatures.onStyles,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Allows to define a custom method for the component's data. This method should return an object representing the initial state of the component. The data can include any properties that are needed to manage the component's state and can be reactive, allowing the component to re-render when the data changes.
   */
  static get Data() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: AreFeatures.onData,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Allows to define a custom method for handling signals emitted by the component or other parts of the application. This method can be used to implement custom logic for responding to specific signals, such as user interactions, state changes, or other events that may affect the component's behavior or appearance. By defining this method, developers can create more dynamic and interactive components that can react to changes in the application state or user input in a flexible and efficient way.
   */
  static get Signal() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: AreFeatures.onSignal,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  template(...args) {
  }
  styles(...args) {
  }
  data(...args) {
  }
};
__decorateClass([
  Are.Template
], Are.prototype, "template", 1);
__decorateClass([
  Are.Styles
], Are.prototype, "styles", 1);
__decorateClass([
  Are.Data
], Are.prototype, "data", 1);
Are = __decorateClass([
  A_Frame.Component({
    namespace: "A-ARE",
    name: "Are",
    description: "Base component class for A-Concept Rendering Engine (ARE) components. It provides lifecycle decorators and methods for defining templates, styles, and data, facilitating the creation of dynamic and interactive UI components within the ARE framework."
  }),
  A_Meta.Define(AreMeta)
], Are);
var AreSyntax = class extends A_Fragment {
  constructor(config) {
    super({ name: "AreSyntax" });
    /**
     * Max allowed length of an expression string to prevent excessively long inputs that could lead to performance issues or abuse.
     */
    this.MAX_LENGTH = 500;
    /**
     * Max allowed nesting depth of parentheses, brackets, and braces in expressions to prevent excessively complex inputs that could lead to performance issues or abuse. Default is 5 levels of nesting.
     */
    this.MAX_DEPTH = 5;
    /**
     * List of regex patterns that are blocked in expressions to prevent access to unsafe or sensitive features. This includes patterns for global objects, functions, and syntax that could be used for malicious purposes (e.g. "eval", "Function", "fetch", "XMLHttpRequest", "import", "require", "document", "window", "globalThis", "global", "process", "__proto__", "constructor", "prototype"). Expressions containing any of these patterns will be rejected during validation.
     */
    this.BLOCKED_PATTERNS = [
      /\beval\b/,
      /\bFunction\b/,
      /\bfetch\b/,
      /\bXMLHttpRequest\b/,
      /\bimport\b/,
      /\brequire\b/,
      /\bdocument\b/,
      /\bwindow\b/,
      /\bglobalThis\b/,
      /\bglobal\b/,
      /\bprocess\b/,
      /\b__proto__\b/,
      /\bprototype\b/,
      /\bconstructor\b/,
      /\bObject\s*\.\s*assign\b/,
      /\bObject\s*\.\s*defineProperty\b/,
      /\bsetTimeout\b/,
      /\bsetInterval\b/,
      /\blocalStorage\b/,
      /\bsessionStorage\b/,
      /\bcookie\b/,
      /\bWebSocket\b/,
      /\bWorker\b/
    ];
    /**
     * Set of global identifiers that are blocked in expressions to prevent access to unsafe or sensitive features. This includes global objects and functions that could be used for malicious purposes (e.g. "eval", "Function", "fetch", "XMLHttpRequest", "document", "window", "globalThis", "global", "process", "setTimeout", "setInterval", "localStorage", "sessionStorage", "indexedDB", "WebSocket", "Worker"). Accessing any of these identifiers in an expression will be rejected during validation.
     */
    this.BLOCKED_GLOBALS = /* @__PURE__ */ new Set([
      "eval",
      "Function",
      "fetch",
      "XMLHttpRequest",
      "document",
      "window",
      "globalThis",
      "global",
      "process",
      "setTimeout",
      "setInterval",
      "clearTimeout",
      "clearInterval",
      "localStorage",
      "sessionStorage",
      "indexedDB",
      "WebSocket",
      "Worker",
      "Blob",
      "File",
      "require",
      "module",
      "exports",
      "alert",
      "confirm",
      "prompt"
    ]);
    /**
     * Regex pattern that defines the allowed characters in expressions. This pattern allows letters, digits, whitespace, and common operators and punctuation used in JavaScript expressions. Expressions containing characters that do not match this pattern will be rejected during validation to prevent injection of potentially harmful code.
     */
    this.ALLOWED_CHARS = /^[\w\s\d\.\[\]()=><|&!+\-*/%?:,'"`;~^$]+$/;
    /**
     * Simple dot-path identifier pattern (e.g. "name", "user.name", "user.profile.name").
     * Matches strings that consist solely of identifier characters separated by dots.
     */
    this.SIMPLE_PATH = /^[a-zA-Z_$][\w$]*(?:\.[a-zA-Z_$][\w$]*)*$/;
    this._trimWhitespace = config?.trimWhitespace !== false;
    this._strictMode = config?.strictMode !== false;
    this._rules = [...config?.rules ?? []].sort(
      (a, b) => (b.priority ?? 0) - (a.priority ?? 0)
    );
  }
  /**
   * Get the array of token rules that define the syntax for parsing templates. Each rule specifies how to identify and process a particular type of token (e.g. interpolation, directive, comment) within templates. The rules are checked in order of priority, allowing for flexible and customizable parsing behavior.
   */
  get rules() {
    return this._rules;
  }
  /**
   * Indicates whether leading and trailing whitespace should be trimmed from token content. When enabled, any whitespace at the start or end of the content captured by a token will be removed before further processing. This can help prevent issues with unintended spaces affecting rendering or logic, especially in cases like interpolations or directives where extra whitespace may be common. Default is true.
   */
  get trimWhitespace() {
    return this._trimWhitespace;
  }
  /**
   * Indicates whether the parser should throw an error when it encounters unclosed tokens. When enabled, if the parser finds an opening delimiter without a corresponding closing delimiter (e.g. an unclosed interpolation or directive), it will throw an error instead of silently ignoring it. This can help catch syntax errors and ensure that templates are well-formed. Default is true.
   */
  get strictMode() {
    return this._strictMode;
  }
  /**
   * Compiles an expression string into a reusable executor.
   * Performs validation and Function construction once.
   * Use when the same expression will be evaluated multiple times
   * e.g. event handlers, instructions that re-apply on store changes.
   *
   * @example
   *   // compile once at apply() time
   *   const compiled = AreCommonHelper.compile('(e) => !!pageTitle ? $testHandler(e, item) : null')
   *
   *   // execute on every click — no re-parsing, no re-validation
   *   element.addEventListener('click', (e) => {
   *       const fn = compiled.execute(store, { $testHandler: handler, item })
   *       if (typeof fn === 'function') fn(e)
   *   })
   */
  compile(expr) {
    const trimmed = expr.trim();
    this.validate(trimmed);
    const isCallable = this.isCallableExpression(trimmed);
    const isSimplePath = this.SIMPLE_PATH.test(trimmed);
    let compiled = null;
    if (!isSimplePath) {
      try {
        compiled = new Function("scope", `"use strict"; with(scope) { return (${trimmed}) }`);
      } catch (e) {
        throw new Error(`Expression syntax error in "${trimmed}": ${e.message}`);
      }
    }
    const createSandboxFn = this.createSandbox.bind(this);
    return {
      isCallable,
      execute(store, scope) {
        if (isSimplePath) {
          if (scope && trimmed in scope) return scope[trimmed];
          const value = store.get(trimmed);
          if (value !== void 0) return value;
        }
        const sandbox = createSandboxFn(store, scope);
        let result;
        try {
          result = compiled ? compiled(sandbox) : new Function("scope", `"use strict"; with(scope) { return (${trimmed}) }`)(sandbox);
        } catch (e) {
          throw new Error(`Expression evaluation error in "${trimmed}": ${e.message}`);
        }
        if (isCallable && typeof result !== "function") {
          throw new Error(
            `Expression "${trimmed}" was expected to be callable \u2014 got ${result === null ? "null" : typeof result}`
          );
        }
        return result;
      }
    };
  }
  /**
   * Evaluates an expression string against the provided store.
   * Automatically determines whether the result should be callable
   * based on the shape of the expression.
   *
   * Returns the raw value for plain expressions (interpolations, bindings).
   * Returns a bound function for callable expressions (event handlers).
   *
   * @param expr  Expression string to evaluate.
   * @param store AreStore used for identifier resolution.
   * @param scope Optional extra bindings checked **before** the store.
   *              Useful for injecting event-specific values (`$event`, `element`)
   *              or emit wrappers (`$handleClick`).
   *
   * @example
   *   // simple value
   *   evaluate('user.name', store)
   *
   *   // with emit wrapper
   *   evaluate('$handleClick($event, user.name)', store, {
   *       $event: domEvent,
   *       $handleClick: (...args) => node.emit(new AreEvent('handleClick', args)),
   *   })
   *
   *   // arrow with conditional
   *   evaluate('(e) => isValid(user.name) ? $handleClick(e) : null', store, {
   *       $handleClick: (...args) => node.emit(new AreEvent('handleClick', args)),
   *   })
   */
  evaluate(expr, store, scope) {
    const trimmed = expr.trim();
    this.validate(trimmed);
    if (this.SIMPLE_PATH.test(trimmed)) {
      if (scope && trimmed in scope) return scope[trimmed];
      const value = store.get(trimmed);
      if (value !== void 0) return value;
    }
    const sandbox = this.createSandbox(store, scope);
    const result = this.execute(trimmed, sandbox);
    if (this.isCallableExpression(trimmed)) {
      if (typeof result !== "function") {
        throw new Error(
          `Expression "${trimmed}" was expected to be callable \u2014 got ${result === null ? "null" : typeof result}`
        );
      }
    }
    return result;
  }
  /**
   * Extracts $-prefixed handler names from an expression.
   * These represent event emission targets, not store references.
   *
   * Examples:
   *   "$handleClick"                                     → Set(["handleClick"])
   *   "$handleClick(user.name)"                           → Set(["handleClick"])
   *   "(e) => isValid(user.name) ? $handleClick(e) : null" → Set(["handleClick"])
   */
  extractEmitHandlers(expr) {
    const stripped = expr.trim().replace(/'[^']*'|"[^"]*"|`[^`]*`/g, '""');
    const handlers = /* @__PURE__ */ new Set();
    const pattern = /\$([a-zA-Z_][\w$]*)/g;
    let match;
    while ((match = pattern.exec(stripped)) !== null) {
      handlers.add(match[1]);
    }
    return handlers;
  }
  // ── Classification ────────────────────────────────────────────────────────
  isCallableExpression(expr) {
    if (/^\(?[\w\s,]*\)?\s*=>/.test(expr)) return true;
    if (/^function\s*\(/.test(expr)) return true;
    return false;
  }
  // ── Validation ────────────────────────────────────────────────────────────
  validate(expr) {
    if (expr.length > this.MAX_LENGTH) {
      throw new Error(
        `Expression exceeds maximum length of ${this.MAX_LENGTH} characters`
      );
    }
    for (const pattern of this.BLOCKED_PATTERNS) {
      if (pattern.test(expr)) {
        throw new Error(`Expression contains blocked pattern: ${pattern.source}`);
      }
    }
    if (!this.ALLOWED_CHARS.test(expr)) {
      throw new Error(`Expression contains disallowed characters`);
    }
    this.checkDepth(expr);
  }
  checkDepth(expr) {
    let depth = 0;
    let max = 0;
    for (const ch of expr) {
      if (ch === "(" || ch === "[" || ch === "{") {
        depth++;
        max = Math.max(max, depth);
      }
      if (ch === ")" || ch === "]" || ch === "}") depth--;
    }
    if (max > this.MAX_DEPTH) {
      throw new Error(`Expression exceeds maximum nesting depth of ${this.MAX_DEPTH}`);
    }
  }
  // ── Sandbox ───────────────────────────────────────────────────────────────
  createSandbox(store, scope) {
    return new Proxy({}, {
      has: (_, key) => {
        if (typeof key === "string" && this.BLOCKED_GLOBALS.has(key)) return false;
        return true;
      },
      get: (_, key) => {
        if (typeof key !== "string") return void 0;
        if (scope && key in scope) return scope[key];
        this.assertSafeKey(key);
        const value = store.get(key);
        if (typeof value === "function") return value.bind(store);
        if (value !== null && typeof value === "object" && value !== void 0) {
          return new Proxy(value, this.nestedHandler(key, store));
        }
        return value;
      },
      set: () => {
        throw new Error("Expression scope is read-only");
      }
    });
  }
  nestedHandler(prefix, store) {
    return {
      has: () => true,
      get: (target, key) => {
        if (typeof key !== "string") return void 0;
        this.assertSafeKey(key);
        const fullKey = `${prefix}.${key}`;
        const value = store.get(fullKey);
        if (value === void 0) return target[key];
        if (typeof value === "function") return value.bind(store);
        if (value !== null && typeof value === "object") {
          return new Proxy(value, this.nestedHandler(fullKey, store));
        }
        return value;
      },
      set: () => {
        throw new Error("Expression scope is read-only");
      }
    };
  }
  assertSafeKey(key) {
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      throw new Error(`Access to "${key}" is not allowed in expressions`);
    }
    if (this.BLOCKED_GLOBALS.has(key)) {
      throw new Error(`Access to "${key}" is not allowed in expressions`);
    }
  }
  // ── Execution ─────────────────────────────────────────────────────────────
  execute(expr, sandbox) {
    let fn;
    try {
      fn = new Function("scope", `with(scope) { return (${expr}) }`);
    } catch (e) {
      throw new Error(`Expression syntax error in "${expr}": ${e.message}`);
    }
    try {
      return fn(sandbox);
    } catch (e) {
      throw new Error(`Expression evaluation error in "${expr}": ${e.message}`);
    }
  }
};
AreSyntax = __decorateClass([
  A_Frame.Fragment({
    namespace: "A-ARE",
    name: "AreSyntaxContext",
    description: "Context that defines the syntax rules and structures for the A-Concept Rendering Engine (ARE). It provides mechanisms for parsing and interpreting templates, attributes, directives, interpolations, and event listeners, enabling dynamic and interactive UI rendering within the ARE framework."
  })
], AreSyntax);
var AreCompiler = class extends A_Component {
  static Compile(param1) {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: param1.prototype instanceof AreNode ? AreNodeFeatures.onCompile : AreAttributeFeatures.Compile,
        scope: [param1],
        override: ["compile"]
      })(target, propertyKey, descriptor);
    };
  }
  compile(node, scene, logger, ...args) {
    try {
      logger?.debug("cyan", `AreCompiler: compile node <${node.aseid.toString()}>`);
      const hostInstruction = new AreDeclaration();
      scene.setHost(hostInstruction);
      scene.plan(hostInstruction);
      for (let i = 0; i < node.attributes.length; i++) {
        const attribute = node.attributes[i];
        attribute.compile();
      }
      if (node.children && node.children.length > 0) {
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];
          child.compile();
        }
      }
    } catch (error) {
      logger?.error(error);
    }
  }
};
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onCompile,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreScene)),
  __decorateParam(2, A_Inject(A_Logger))
], AreCompiler.prototype, "compile", 1);
AreCompiler = __decorateClass([
  A_Frame.Component({
    namespace: "A-ARE",
    name: "AreCompiler",
    description: "Walks the transformed AreNode tree and emits a Scene. Translates each node, binding, directive and interpolation into a typed instruction. Knows nothing about the DOM or any rendering target \u2014 its only concern is producing a complete and ordered set of instructions that fully describes how the tree should be rendered."
  })
], AreCompiler);
var AreTransformer = class extends A_Component {
  transform(node, scope, scene, ...args) {
    const queue = [node];
    while (queue.length > 0) {
      const current = queue.shift();
      for (let i = 0; i < current.attributes.length; i++) {
        const attribute = current.attributes[i];
        attribute.transform();
      }
      queue.push(...current.children);
    }
  }
};
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onTransform,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreScene))
], AreTransformer.prototype, "transform", 1);
AreTransformer = __decorateClass([
  A_Frame.Component({
    description: "Reshapes the AreNode tree before compilation without changing its abstraction level. Responsible for structural rewrites that would complicate the compiler if left unhandled \u2014 converting $for nodes into AreGroupNode, extracting AreText and AreInterpolation from raw text, sorting directives via TopologicalSorter, and flagging static nodes."
  })
], AreTransformer);
var AreLoader = class extends A_Component {
  async load(node, scope, feature, logger, context, ...args) {
    logger?.debug("red", `Loading node <${node.aseid.toString()}> with content:`, scope);
    if (node.component) {
      context?.startPerformance("Total AreFeatures.onData");
      await feature.chain(node.component, AreFeatures.onData, scope);
      context?.endPerformance("Total AreFeatures.onData");
      context?.startPerformance("Total AreFeatures.onLoad");
      await feature.chain(node.component, AreFeatures.onStyles, scope);
      context?.endPerformance("Total AreFeatures.onLoad");
      context?.startPerformance("Total AreFeatures.onTemplate");
      await feature.chain(node.component, AreFeatures.onTemplate, scope);
      context?.endPerformance("Total AreFeatures.onTemplate");
    }
    context?.startPerformance("Tokenization");
    node.tokenize();
    context?.endPerformance("Tokenization");
    for (let i = 0; i < node.children.length; i++) {
      const childNode = node.children[i];
      const res = childNode.load();
      if (res instanceof Promise) {
        await res;
      }
    }
  }
};
__decorateClass([
  A_Feature.Extend({
    name: A_TYPES__EntityFeatures.LOAD,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(A_Feature)),
  __decorateParam(3, A_Inject(A_Logger)),
  __decorateParam(4, A_Inject(AreContext))
], AreLoader.prototype, "load", 1);
AreLoader = __decorateClass([
  A_Frame.Component({
    description: "Entry point of the pipeline. Accepts a raw template string and orchestrates the initial processing by delegating to Syntax. Returns a structured AreNode tree ready for transformation. Knows nothing about the template content or grammar rules."
  })
], AreLoader);

// src/lib/AreStore/AreStore.constants.ts
var AreStoreAreComponentMetaKeys = {
  StoreExtensions: "_AreStore_StoreExtensions"
};
var AreStore = class extends A_ExecutionContext {
  constructor(aseid) {
    super(aseid.toString());
    this.dependencies = /* @__PURE__ */ new Map();
    this._keys = /* @__PURE__ */ new Set();
  }
  /**
   * Allows to define a pure function that will be executed in the context of the store, so it can access the store's data and methods, but it won't have access to the component's scope or other features. This can be useful for example for defining a function that will update the store's data based on some logic, without having access to the component's scope or other features, so we can keep the store's logic separate from the component's logic.
   */
  static get Function() {
    return (target, propertyKey, descriptor) => {
      const targetMeta = A_Context.meta(target.constructor);
      const originalMethod = descriptor.value;
      const allExtensions = targetMeta.get(AreStoreAreComponentMetaKeys.StoreExtensions) || {};
      allExtensions[propertyKey] = originalMethod;
      targetMeta.set(AreStoreAreComponentMetaKeys.StoreExtensions, allExtensions);
      return descriptor;
    };
  }
  get owner() {
    return A_Context.scope(this).issuer();
  }
  get parent() {
    return this.owner.parent?.scope.resolve(AreStore);
  }
  get context() {
    return A_Context.scope(this).resolve(AreContext);
  }
  get watchers() {
    return this.context.get("watchers") || /* @__PURE__ */ new Set();
  }
  get keys() {
    return this._keys;
  }
  watch(instruction) {
    const watchers = this.context.get("watchers") || /* @__PURE__ */ new Set();
    watchers.add(instruction);
    this.context.set("watchers", watchers);
  }
  unwatch(instruction) {
    const watchers = this.context.get("watchers") || /* @__PURE__ */ new Set();
    watchers.delete(instruction);
    this.context.set("watchers", watchers);
  }
  set(param1, param2) {
    if (typeof param1 === "string" && param2 !== void 0) {
      this.setAsKeyValue(param1, param2);
    } else if (typeof param1 === "object") {
      this.setAsObject(param1);
    } else {
      throw new Error("Invalid parameters for set method. Expected either (key: string, value: any) or (values: object).");
    }
    return this;
  }
  get(key) {
    const [firstPart, ...pathPart] = String(key).split(".");
    if (!this._keys.has(firstPart)) {
      return this.parent?.get(key);
    }
    if (this.watchers.size > 0) {
      const ancestors = this.extractPathSegments(String(key));
      for (const ancestor of ancestors) {
        const normAncestor = this.normalizePath(ancestor);
        if (!this.dependencies.has(normAncestor)) {
          this.dependencies.set(normAncestor, /* @__PURE__ */ new Set());
        }
        this.watchers.forEach((watcher) => this.dependencies.get(normAncestor).add(watcher));
      }
    }
    const primaryObject = super.get(firstPart);
    const value = A_UtilsHelper.getByPath(primaryObject, pathPart.join("."));
    return value;
  }
  setAsObject(values) {
    const entires = Object.entries(values);
    for (const [key, value] of entires) {
      this._keys.add(key);
      super.set(key, value);
      const normChanged = this.normalizePath(String(key));
      const prefix = normChanged + ".";
      for (const [normRegistered, instructions] of this.dependencies) {
        if (normRegistered === normChanged || // exact
        normRegistered.startsWith(prefix) || // descendant
        normChanged.startsWith(normRegistered + ".")) {
          this.notify(instructions);
        }
      }
    }
    return this;
  }
  setAsKeyValue(key, value) {
    const [firstPart, ...pathPart] = String(key).split(".");
    this._keys.add(firstPart);
    const primaryObject = super.get(firstPart);
    const result = A_UtilsHelper.setBypath(primaryObject, pathPart.join("."), value);
    super.set(firstPart, result ? result[firstPart] : value);
    const normChanged = this.normalizePath(String(key));
    const prefix = normChanged + ".";
    for (const [normRegistered, instructions] of this.dependencies) {
      if (normRegistered === normChanged || // exact
      normRegistered.startsWith(prefix) || // descendant
      normChanged.startsWith(normRegistered + ".")) {
        this.notify(instructions);
      }
    }
    return this;
  }
  /**
   * Notifies instructions — immediately or deferred if inside a batch.
   */
  notify(instructions) {
    for (const instruction of instructions) {
      try {
        instruction.update();
      } catch (error) {
      }
    }
  }
  /**
   * Removes an instruction from all dependency sets.
   * Called when an instruction is reverted/destroyed.
   */
  unregister(instruction) {
    for (const instructions of this.dependencies.values()) {
      instructions.delete(instruction);
    }
  }
  /**
   * Normalizes a path once — reused in both get and set.
   */
  normalizePath(path) {
    return path.replace(/\[(\d+)\]/g, ".$1");
  }
  /**
   * Extracts direct children of the current markup level into typed instances.
   * No tree walking, recursion, or nested parsing — just direct children.
   */
  extractPathSegments(path) {
    const normalized = path.replace(/\[(\d+)\]/g, ".$1");
    const parts = normalized.split(".").filter(Boolean);
    const ancestors = [];
    let current = "";
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isIndex = /^\d+$/.test(part);
      if (i === 0) {
        current = part;
      } else if (isIndex) {
        current = `${current}[${part}]`;
      } else {
        current = `${current}.${part}`;
      }
      ancestors.push(current);
    }
    return ancestors;
  }
  /**
   * Method allows to initialize all extensions defined in the component with @AreStore.Function decorator, so we can use them in the store's context. This method should be called in the component's constructor after super() call, so the store will have access to the component's instance and its properties.
   * 
   * @param component 
   */
  loadExtensions(component) {
    const targetMeta = A_Context.meta(component);
    const allExtensions = targetMeta.get(AreStoreAreComponentMetaKeys.StoreExtensions) || {};
    this.set(allExtensions);
  }
};
AreStore = __decorateClass([
  A_Frame.Fragment({
    description: "Are Store uses to keep AreNode related information for interpolations, runtime data, etc. This object can be injected to manipulate with data at runtime."
  })
], AreStore);

// src/lib/AreInterpreter/AreInterpreter.component.ts
var AreInterpreter = class extends A_Component {
  /**
   * Decorator to mark a method as an instruction Apply handler for the specific instruction type. The method will be called during the render phase of the ARE component when the corresponding instruction needs to be applied. The method should contain logic to perform the necessary operations on the rendering target based on the instruction's content and context.
   * 
   * @param action 
   * @returns 
   */
  static Apply(action) {
    const name = action + AreInstructionFeatures.Apply;
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Decorator to mark a method as an instruction Update handler for the specific instruction type. The method will be called during the render phase of the ARE component when the corresponding instruction has been updated. The method should contain logic to perform the necessary operations on the rendering target to update the effects of the instruction based on its new content and context.
   * 
   * @param action 
   * @returns 
   */
  static Update(action) {
    const name = action + AreInstructionFeatures.Update;
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Decorator to mark a method as an instruction Revert handler for the specific instruction type. The method will be called during the render phase of the ARE component when the corresponding instruction needs to be reverted. The method should contain logic to perform the necessary operations on the rendering target to undo the effects of the instruction based on its content and context.
   * 
   * @param action 
   * @returns 
   */
  static Revert(action) {
    const name = action + AreInstructionFeatures.Revert;
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  interpret(scene) {
    const { toApply, toRevert } = scene.changes;
    for (const instruction of toRevert) {
      try {
        instruction.revert();
        scene.unApply(instruction);
      } catch (error) {
        instruction.apply();
        scene.apply(instruction);
      }
    }
    for (const instruction of toApply) {
      try {
        instruction.apply();
        scene.apply(instruction);
      } catch (error) {
        instruction.revert();
        scene.unApply(instruction);
      }
    }
  }
  applyInstruction(instruction, interpreter, store, scope, feature, ...args) {
    try {
      store.watch(instruction);
      feature.chain(interpreter, instruction.name + AreInstructionFeatures.Apply, scope);
      store.unwatch(instruction);
    } catch (error) {
      store.unwatch(instruction);
      throw error;
    }
  }
  updateInstruction(instruction, interpreter, store, scope, feature, ...args) {
    try {
      store.watch(instruction);
      feature.chain(interpreter, instruction.name + AreInstructionFeatures.Update, scope);
      store.unwatch(instruction);
    } catch (error) {
      store.unwatch(instruction);
      throw error;
    }
  }
  revertInstruction(instruction, interpreter, store, scope, feature, ...args) {
    try {
      feature.chain(interpreter, instruction.name + AreInstructionFeatures.Revert, scope);
    } catch (error) {
      throw error;
    }
  }
};
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onInterpret,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(AreScene))
], AreInterpreter.prototype, "interpret", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreInstructionFeatures.Apply,
    scope: [AreInstruction]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreInterpreter)),
  __decorateParam(2, A_Inject(AreStore)),
  __decorateParam(3, A_Inject(A_Scope)),
  __decorateParam(4, A_Inject(A_Feature))
], AreInterpreter.prototype, "applyInstruction", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreInstructionFeatures.Update,
    scope: [AreInstruction]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreInterpreter)),
  __decorateParam(2, A_Inject(AreStore)),
  __decorateParam(3, A_Inject(A_Scope)),
  __decorateParam(4, A_Inject(A_Feature))
], AreInterpreter.prototype, "updateInstruction", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreInstructionFeatures.Revert,
    scope: [AreInstruction]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreInterpreter)),
  __decorateParam(2, A_Inject(AreStore)),
  __decorateParam(3, A_Inject(A_Scope)),
  __decorateParam(4, A_Inject(A_Feature))
], AreInterpreter.prototype, "revertInstruction", 1);
AreInterpreter = __decorateClass([
  A_Frame.Component({
    description: "Stateless executor that reads the Scene and translates its instructions into operations on a rendering target. Computes the diff between applied and planned, calls revert on removed instructions and apply on added ones. Owns no state of its own \u2014 all state lives in the Scene. Can be swapped for any target implementation (DOMInterpreter, SSRInterpreter, CanvasInterpreter) without touching any other part of the pipeline."
  })
], AreInterpreter);
var AreEngineError = class extends A_Error {
};
AreEngineError.MissedRequiredDependency = "A Required Dependency is missing in AreEngine";
var AreLifecycle = class extends A_Component {
  static Init(param1) {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: param1.prototype instanceof AreNode ? AreNodeFeatures.onInit : AreAttributeFeatures.Init,
        scope: [param1],
        override: ["init"]
      })(target, propertyKey, descriptor);
    };
  }
  beforeInit(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(`[Init -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, AreFeatures.onBeforeInit, node.scope);
  }
  init(node, scope, context, logger, ...args) {
    context.startPerformance("AreLifecycle.init");
    const newNodeScene = new AreScene(node.aseid);
    scope.register(newNodeScene);
    if (node.component) {
      const newNodeStore = new AreStore(node.aseid);
      scope.register(newNodeStore);
      newNodeStore.loadExtensions(node.component);
    }
    context.endPerformance("AreLifecycle.init");
  }
  afterInit(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(`[Init -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, AreFeatures.onAfterInit, node.scope);
  }
  beforeMount(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(`[Mount -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, AreFeatures.onBeforeMount, node.scope);
  }
  mount(node, scene, logger, ...args) {
    logger?.debug(`[Mount] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    const queue = [node];
    while (queue.length > 0) {
      const current = queue.shift();
      const scene2 = current.scene;
      if (scene2.isInactive)
        continue;
      const { toApply, toRevert } = scene2.changes;
      for (const instruction of toRevert) {
        try {
          instruction.revert();
          scene2.unApply(instruction);
        } catch (error) {
          instruction.apply();
          scene2.apply(instruction);
        }
      }
      for (const instruction of toApply) {
        try {
          instruction.apply();
          scene2.apply(instruction);
        } catch (error) {
          instruction.revert();
          scene2.unApply(instruction);
        }
      }
      queue.push(...current.children);
    }
  }
  afterMount(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(`[Mount -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, AreFeatures.onAfterMount, node.scope);
  }
  beforeUpdate(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(`[Update -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, AreFeatures.onBeforeUpdate, node.scope);
  }
  update(node, context, logger, ...args) {
    logger?.debug(`[Update] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    const queue = [node];
    while (queue.length > 0) {
      const current = queue.shift();
      const scene = current.scene;
      if (scene.isInactive)
        continue;
      const { toApply, toRevert } = scene.changes;
      console.log(" -- Scene Changes -- ");
      console.log("To Apply: ", toApply);
      console.log("To Revert: ", toRevert);
      for (const instruction of toRevert) {
        try {
          instruction.revert();
          scene.unApply(instruction);
        } catch (error) {
          instruction.apply();
          scene.apply(instruction);
        }
      }
      for (const instruction of toApply) {
        try {
          instruction.apply();
          scene.apply(instruction);
        } catch (error) {
          console.log("WTF?? ", error);
          instruction.revert();
          scene.unApply(instruction);
        }
      }
      queue.push(...current.children);
    }
  }
  afterUpdate(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(`[Update -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, AreFeatures.onAfterUpdate, node.scope);
  }
  beforeUnmount(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(`[Unmount -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, AreFeatures.onBeforeUnmount, node.scope);
  }
  unmount(node, scene, ...args) {
    const queue = [node];
    while (queue.length > 0) {
      const current = queue.shift();
      const scene2 = current.scene;
      const applied = [...scene2.applied];
      for (let i = applied.length - 1; i >= 0; i--) {
        const instruction = applied[i];
        try {
          instruction.revert();
          scene2.unApply(instruction);
        } catch (error) {
          scene2.unApply(instruction);
        }
      }
      queue.push(...current.children);
    }
  }
  afterUnmount(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(`[Unmount -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, AreFeatures.onAfterUnmount, node.scope);
  }
  beforeDestroy(node, scope, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(`[Destroy -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, AreFeatures.onBeforeDestroy, node.scope);
  }
  destroy(node, scene, ...args) {
  }
  afterDestroy(node, scope, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(`[Destroy -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, AreFeatures.onAfterDestroy, node.scope);
  }
};
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onBeforeInit,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Inject(A_Feature))
], AreLifecycle.prototype, "beforeInit", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onInit,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreContext)),
  __decorateParam(3, A_Inject(A_Logger))
], AreLifecycle.prototype, "init", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onAfterInit,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Inject(A_Feature))
], AreLifecycle.prototype, "afterInit", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onBeforeMount,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Inject(A_Feature))
], AreLifecycle.prototype, "beforeMount", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onMount,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreScene)),
  __decorateParam(2, A_Inject(A_Logger))
], AreLifecycle.prototype, "mount", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onAfterMount,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Inject(A_Feature))
], AreLifecycle.prototype, "afterMount", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onUpdate,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Inject(A_Feature))
], AreLifecycle.prototype, "beforeUpdate", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onUpdate,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreContext)),
  __decorateParam(2, A_Inject(A_Logger))
], AreLifecycle.prototype, "update", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onUpdate,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Inject(A_Feature))
], AreLifecycle.prototype, "afterUpdate", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onBeforeUnmount,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Inject(A_Feature))
], AreLifecycle.prototype, "beforeUnmount", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onUnmount,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreScene))
], AreLifecycle.prototype, "unmount", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onAfterUnmount,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Inject(A_Feature))
], AreLifecycle.prototype, "afterUnmount", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onBeforeDestroy,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(A_Feature))
], AreLifecycle.prototype, "beforeDestroy", 1);
__decorateClass([
  A_Feature.Extend({
    name: A_TYPES__EntityFeatures.DESTROY,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreScene))
], AreLifecycle.prototype, "destroy", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onAfterDestroy,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(A_Feature))
], AreLifecycle.prototype, "afterDestroy", 1);
AreLifecycle = __decorateClass([
  A_Frame.Component({
    description: "Handles the lifecycle of the AreNode and related entities such as interpolations, directives, attributes, and so on. It provides lifecycle hooks for initialization, mounting, updating, and unmounting of the nodes, allowing to manage the state and behavior of the nodes throughout their lifecycle in a structured and consistent way."
  })
], AreLifecycle);

// src/lib/AreEngine/AreEngine.constants.ts
var AreEngineFeatures = {
  Load: "_AreEngine_Load",
  Build: "_AreEngine_Build",
  Execute: "_AreEngine_Execute"
};
var AreTokenizerError = class extends A_Error {
};
var AreTokenizer = class extends A_Component {
  /**
   * Get the AreSyntax from the current scope. The AreSyntax defines the syntax rules and structures for tokenizing templates. It provides mechanisms for parsing and interpreting templates, attributes, directives, interpolations, and event listeners, enabling dynamic and interactive UI rendering within the ARE framework. If no AreSyntax is found in the scope, an error is thrown indicating that AreTokenizer requires an AreSyntax to function properly.
   */
  get config() {
    const syntax = A_Context.scope(this).resolve(AreSyntax);
    if (!syntax) throw new AreTokenizerError({
      title: "Syntax Context Not Found",
      description: "AreTokenizer requires an AreSyntax to be present in the same scope. Ensure that an AreSyntax fragment is included in the concept and is accessible from the scope where AreTokenizer is used."
    });
    return syntax;
  }
  instantiate(context) {
    context.startPerformance("Tokenizer Instantiate");
    const source = context.source;
    const nodes = this.scan(source, 0, source.length, context).map((match) => {
      const rule = this.findRuleForMatch(match);
      if (!rule) throw new Error(`No rule found for match at position ${match.position}`);
      return new rule.component(match);
    });
    for (const node of nodes) {
      context.addRoot(node);
    }
    context.endPerformance("Tokenizer Instantiate");
  }
  tokenize(node, context, logger) {
    context.startPerformance(`Tokenize method`);
    const source = node.content;
    const content = this.scan(source, 0, source.length, context).map((match) => {
      const rule = this.findRuleForMatch(match);
      if (!rule) throw new Error(`No rule found for match at position ${match.position}`);
      return new rule.component(match);
    });
    logger?.debug("red", `Tokenized node <${node.aseid.toString()}> with content:`, content.length);
    context.endPerformance(`Tokenize method`);
    context.startPerformance(`Tokenize node Create Children`);
    for (const child of content) {
      node.addChild(child);
      context.startPerformance("AreTokenizer.tokenize child init");
      child.init();
      context.endPerformance("AreTokenizer.tokenize child init");
    }
    context.endPerformance(`Tokenize node Create Children`);
  }
  scan(source, from, to, context) {
    context.startPerformance("Tokenizer Scan");
    const tokens = [];
    let index = from;
    let hasMatchBefore = false;
    while (index < to) {
      const match = this.findNextMatch(source, index, to);
      if (!match) {
        const rest = source.slice(index, to);
        const t = this.tryPlainText(rest, index);
        if (t && !(this.config.trimWhitespace && !rest.trim())) tokens.push(t);
        break;
      }
      if (match.position > index) {
        const plain = source.slice(index, match.position);
        const t = this.tryPlainText(plain, index);
        if (t) {
          if (this.config.trimWhitespace && !plain.trim()) {
            if (hasMatchBefore) {
              t.content = " ";
              tokens.push(t);
            }
          } else {
            tokens.push(t);
          }
        }
      }
      tokens.push(match);
      hasMatchBefore = true;
      index = match.position + match.raw.length;
    }
    context.endPerformance("Tokenizer Scan");
    return tokens;
  }
  findNextMatch(source, from, to) {
    let earliest = null;
    for (const rule of this.config.rules) {
      if (!rule.opening && !rule.closing && !rule.pattern && !rule.matcher) continue;
      const match = this.matchRule(source, rule, from, to);
      if (!match) continue;
      if (!earliest || match.position < earliest.position) earliest = match;
    }
    return earliest;
  }
  matchRule(source, rule, from, to) {
    if (rule.matcher) {
      return rule.matcher(
        source,
        from,
        to,
        (raw, content, position, closing) => this.buildMatch(rule, raw, content, position, closing)
      );
    }
    if (rule.pattern) {
      const slice = source.slice(from, to);
      rule.pattern.lastIndex = 0;
      const m = rule.pattern.exec(slice);
      if (!m) return null;
      return this.buildMatch(rule, m[0], m[0], from + m.index, "");
    }
    if (!rule.opening || !rule.closing) return null;
    if (rule.prefix) return this.matchPrefixedRule(source, rule, from, to);
    return this.matchStandardRule(source, rule, from, to);
  }
  matchStandardRule(source, rule, from, to) {
    const opening = rule.opening;
    const closing = rule.closing;
    const openPos = source.indexOf(opening, from);
    if (openPos === -1 || openPos >= to) return null;
    const contentStart = openPos + opening.length;
    if (rule.selfClosing) {
      const selfClosePos = source.indexOf(rule.selfClosing, contentStart);
      const normalClosePos = source.indexOf(closing, contentStart);
      if (selfClosePos !== -1 && (normalClosePos === -1 || selfClosePos < normalClosePos)) {
        const closeEnd = selfClosePos + rule.selfClosing.length;
        return this.buildMatch(rule, source.slice(openPos, closeEnd), source.slice(contentStart, selfClosePos), openPos, rule.selfClosing);
      }
    }
    const closePos = rule.nested !== false ? this.findMatchingClose(source, opening, closing, contentStart, to) : source.indexOf(closing, contentStart);
    if (closePos === -1) {
      if (this.config.strictMode) throw new Error(`Unclosed token '${opening}' at position ${openPos}`);
      return null;
    }
    return this.buildMatch(rule, source.slice(openPos, closePos + closing.length), source.slice(contentStart, closePos), openPos, closing);
  }
  matchPrefixedRule(source, rule, from, to) {
    const opening = rule.opening;
    const closing = rule.closing;
    let searchFrom = from;
    while (searchFrom < to) {
      const openPos = source.indexOf(opening, searchFrom);
      if (openPos === -1 || openPos >= to) return null;
      const before = source.slice(from, openPos);
      const prefixRe = new RegExp(rule.prefix.source + "$");
      const prefixM = prefixRe.exec(before);
      if (prefixM) {
        const actualStart = openPos - prefixM[0].length;
        const contentStart = openPos + opening.length;
        const closePos = rule.nested !== false ? this.findMatchingClose(source, opening, closing, contentStart, to) : source.indexOf(closing, contentStart);
        if (closePos === -1) {
          if (this.config.strictMode) throw new Error(`Unclosed token '${opening}' at position ${openPos}`);
          return null;
        }
        return this.buildMatch(rule, source.slice(actualStart, closePos + closing.length), source.slice(contentStart, closePos), actualStart, closing);
      }
      searchFrom = openPos + 1;
    }
    return null;
  }
  findMatchingClose(source, opening, closing, from, to) {
    let level = 1;
    let index = from;
    while (index < to) {
      const nextOpen = source.indexOf(opening, index);
      const nextClose = source.indexOf(closing, index);
      if (nextClose === -1) return -1;
      if (nextOpen !== -1 && nextOpen < nextClose) {
        level++;
        index = nextOpen + opening.length;
        continue;
      }
      level--;
      if (level === 0) return nextClose;
      index = nextClose + closing.length;
    }
    return -1;
  }
  buildMatch(rule, raw, content, position, closingUsed) {
    const trimmed = this.config.trimWhitespace ? content.trim() : content;
    const match = { raw, content: trimmed, opening: rule.opening ?? "", closing: closingUsed, position, payload: {}, _rule: rule };
    if (rule.extract) match.payload = rule.extract(raw, match);
    return match;
  }
  tryPlainText(raw, position) {
    if (!raw) return null;
    const rule = this.config.rules.find((r) => !r.opening && !r.closing && !r.pattern && !r.matcher);
    if (!rule) return null;
    const match = this.buildMatch(rule, raw, raw, position, "");
    match._rule = rule;
    return match;
  }
  findRuleForMatch(match) {
    if (match._rule) return match._rule;
    return this.config.rules.find((r) => (r.opening ?? "") === match.opening && (r.closing ?? "") === match.closing);
  }
};
__decorateClass([
  A_Feature.Extend({
    name: AreEngineFeatures.Load
    // scope: [AreEngine]
  }),
  __decorateParam(0, A_Inject(AreContext))
], AreTokenizer.prototype, "instantiate", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onTokenize,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreContext)),
  __decorateParam(2, A_Inject(A_Logger))
], AreTokenizer.prototype, "tokenize", 1);
AreTokenizer = __decorateClass([
  A_Frame.Component({
    namespace: "A-ARE",
    name: "AreTokenizer",
    description: "AreTokenizer is responsible for scanning and tokenizing template source strings using the syntax rules defined in AreSyntax. It converts raw template strings into AreNode instances that represent the structured AST of the template, enabling downstream compilation and rendering within the ARE framework."
  })
], AreTokenizer);
var AreSignal = class extends A_Signal {
};
AreSignal = __decorateClass([
  A_Frame.Entity({
    namespace: "A-ARE",
    name: "AreSignal",
    description: "AreSignal is the base class for all signals used within the ARE framework. It extends A_Signal to provide a typed signal entity that components can subscribe to and emit, enabling reactive communication between ARE components and driving lifecycle and rendering updates."
  })
], AreSignal);

// src/lib/AreSignals/entities/AreInit.signal.ts
var AreInit = class _AreInit extends AreSignal {
  static default() {
    return new _AreInit({ data: { ready: false } });
  }
};
var AreEngine = class extends A_Component {
  /**
   * Feature decorator for the load method, which is responsible for the initial loading phase of the engine. This method is where the engine reads the source template, tokenizes it, and prepares the initial context for building the scene. The decorator allows for extending or overriding the default loading behavior by attaching additional functionality before or after the load process.
   */
  static get Load() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: AreEngineFeatures.Load,
        scope: [target.constructor],
        override: ["defaultLoad"]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Feature decorator for the build method, which is responsible for constructing the scene based on the loaded context. This method typically involves initializing root nodes, applying transformations, and compiling the scene into a format that can be executed by the interpreter. The decorator allows for customizing the build process by adding additional steps or modifying the existing behavior.
   */
  static get Build() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: AreEngineFeatures.Build,
        scope: [target.constructor],
        override: ["defaultBuild"]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Feature decorator for the execute method, which is responsible for the final execution phase of the engine. This method typically involves mounting the root nodes to the DOM and starting the reactive update cycle based on signals and state changes. The decorator allows for customizing the execution process by adding additional steps or modifying the existing behavior.
   */
  static get Execute() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: AreEngineFeatures.Execute,
        scope: [target.constructor],
        override: ["defaultExecute"]
      })(target, propertyKey, descriptor);
    };
  }
  async load(scope) {
    const context = scope?.resolve(AreContext) || A_Context.scope(this).resolve(AreContext);
    context?.startPerformance();
    await this.call(AreEngineFeatures.Load, scope || A_Context.scope(this));
  }
  async build(scope) {
    const context = scope?.resolve(AreContext) || A_Context.scope(this).resolve(AreContext);
    context?.startPerformance("Build Total");
    await this.call(AreEngineFeatures.Build, scope || A_Context.scope(this));
    context?.endPerformance("Build Total");
  }
  async execute(scope) {
    const context = scope?.resolve(AreContext) || A_Context.scope(this).resolve(AreContext);
    context?.startPerformance("Execute Total");
    await this.call(AreEngineFeatures.Execute, scope || A_Context.scope(this));
    context?.endPerformance("Execute Total");
    context?.endPerformance("Total");
  }
  async defaultBuild(context, logger) {
    logger?.debug("cyan", "Starting to build the scene...");
    for (const root of context.roots) {
      context.startPerformance(`Init root <${root.aseid.id}>`);
      root.init();
      context.endPerformance(`Init root <${root.aseid.id}>`);
      context.startPerformance(`Load root <${root.aseid.id}>`);
      await root.load();
      context.endPerformance(`Load root <${root.aseid.id}>`);
      context.startPerformance(`Transform root <${root.aseid.id}>`);
      root.transform();
      context.endPerformance(`Transform root <${root.aseid.id}>`);
      context.startPerformance(`Compile root <${root.aseid.id}>`);
      root.compile();
      context.endPerformance(`Compile root <${root.aseid.id}>`);
      context.endPerformance(`Root <${root.aseid.id}> Total`);
    }
  }
  async defaultExecute(context, bus, logger) {
    logger?.debug("cyan", "Starting to execute the scene and mount root nodes...");
    for (const root of context.roots) {
      context.startPerformance(`Mount root <${root.aseid.id}>`);
      root.mount();
      context.endPerformance(`Mount root <${root.aseid.id}>`);
    }
    logger?.debug("cyan", "Emitting AreInit signal to start the reactive update cycle...");
    await bus?.next(new AreInit());
  }
  async init(scope) {
    this.package(scope);
  }
  async verify(scope, syntax, syntaxContext, transformer, loader, compiler, interpreter, lifecycle, logger) {
    if (!syntax)
      throw new AreEngineError({
        title: AreEngineError.MissedRequiredDependency,
        description: `AreSyntax or its inherited variation is a required dependency for ${this.constructor.name}. Please ensure that it is registered in the container scope before starting the engine.`
      });
    if (!syntaxContext)
      throw new AreEngineError({
        title: AreEngineError.MissedRequiredDependency,
        description: `AreSyntax or its inherited variation is a required dependency for ${this.constructor.name}. Please ensure that it is registered in the container scope before starting the engine.`
      });
    if (!loader)
      throw new AreEngineError({
        title: AreEngineError.MissedRequiredDependency,
        description: `AreLoader or its inherited variation is a required dependency for ${this.constructor.name}. Please ensure that it is registered in the container scope before starting the engine.`
      });
    if (!transformer)
      throw new AreEngineError({
        title: AreEngineError.MissedRequiredDependency,
        description: `AreTransformer or its inherited variation is a required dependency for ${this.constructor.name}. Please ensure that it is registered in the container scope before starting the engine.`
      });
    if (!compiler)
      throw new AreEngineError({
        title: AreEngineError.MissedRequiredDependency,
        description: `AreCompiler or its inherited variation is a required dependency for ${this.constructor.name}. Please ensure that it is registered in the container scope before starting the engine.`
      });
    if (!interpreter)
      throw new AreEngineError({
        title: AreEngineError.MissedRequiredDependency,
        description: `AreInterpreter or its inherited variation is a required dependency for ${this.constructor.name}. Please ensure that it is registered in the container scope before starting the engine.`
      });
    if (!lifecycle)
      throw new AreEngineError({
        title: AreEngineError.MissedRequiredDependency,
        description: `AreLifecycle or its inherited variation is a required dependency for ${this.constructor.name}. Please ensure that it is registered in the container scope before starting the engine.`
      });
  }
  package(scope, dependencies) {
    const { context, syntax, loader, tokenizer, compiler, transformer, interpreter, lifecycle, signals } = dependencies || {};
    const existedContext = scope.resolveConstructor(AreContext);
    const existedSyntax = scope.resolveConstructor(AreSyntax);
    const existedLoader = scope.resolveConstructor(AreLoader);
    const existedTokenizer = scope.resolveConstructor(AreTokenizer);
    const existedCompiler = scope.resolveConstructor(AreCompiler);
    const existedInterpreter = scope.resolveConstructor(AreInterpreter);
    const existedLifecycle = scope.resolveConstructor(AreLifecycle);
    const existedTransformer = scope.resolveConstructor(AreTransformer);
    const existedSignals = scope.resolveConstructor(AreSignals);
    this.packDependency(scope, context || AreContext, existedContext);
    this.packDependency(scope, syntax || AreSyntax, existedSyntax);
    this.packDependency(scope, tokenizer || AreTokenizer, existedTokenizer);
    this.packDependency(scope, loader || AreLoader, existedLoader);
    this.packDependency(scope, compiler || AreCompiler, existedCompiler);
    this.packDependency(scope, transformer || AreTransformer, existedTransformer);
    this.packDependency(scope, interpreter || AreInterpreter, existedInterpreter);
    this.packDependency(scope, lifecycle || AreLifecycle, existedLifecycle);
    this.packDependency(scope, signals || AreSignals, existedSignals);
  }
  packDependency(scope, dependency, existed) {
    const logger = scope.resolve(A_Logger);
    const thisName = A_CommonHelper.getComponentName(this);
    const scopeIssuerName = A_CommonHelper.getComponentName(scope.issuer());
    const dependencyName = A_CommonHelper.getComponentName(dependency);
    if (existed) {
      logger?.debug("cyan", `Dependency ${dependencyName} already exists in ${scopeIssuerName} scope. Skipping injection.`);
      return existed;
    } else {
      logger?.debug("cyan", `Injecting ${dependencyName} into ${scopeIssuerName} scope for ${thisName}...`);
      scope.register(dependency);
      return dependency;
    }
  }
};
__decorateClass([
  A_Frame.Method({
    description: "Method does engine loading, first read of the source and tokenization."
  })
], AreEngine.prototype, "load", 1);
__decorateClass([
  A_Frame.Method({
    description: "Method responsible for building the scene, which includes initializing root nodes, loading necessary data, applying transformations, and compiling the scene into a format that can be executed by the interpreter."
  })
], AreEngine.prototype, "build", 1);
__decorateClass([
  A_Frame.Method({
    description: "Method responsible for executing the rendering process, which involves mounting the root nodes to the DOM and starting the reactive update cycle based on signals and state changes."
  })
], AreEngine.prototype, "execute", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreEngineFeatures.Build,
    before: /.*/
  }),
  __decorateParam(0, A_Dependency.Required()),
  __decorateParam(0, A_Inject(AreContext)),
  __decorateParam(1, A_Inject(A_Logger))
], AreEngine.prototype, "defaultBuild", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreEngineFeatures.Execute,
    before: /.*/
  }),
  __decorateParam(0, A_Dependency.Required()),
  __decorateParam(0, A_Inject(AreContext)),
  __decorateParam(1, A_Inject(A_SignalBus)),
  __decorateParam(2, A_Inject(A_Logger))
], AreEngine.prototype, "defaultExecute", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreEngineFeatures.Load,
    before: /.*/
  }),
  __decorateParam(0, A_Inject(A_Scope))
], AreEngine.prototype, "init", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreEngineFeatures.Load,
    before: /.*/
  }),
  __decorateParam(0, A_Inject(A_Scope)),
  __decorateParam(1, A_Inject(AreSyntax)),
  __decorateParam(2, A_Inject(AreSyntax)),
  __decorateParam(3, A_Inject(AreTransformer)),
  __decorateParam(4, A_Inject(AreLoader)),
  __decorateParam(5, A_Inject(AreCompiler)),
  __decorateParam(6, A_Inject(AreInterpreter)),
  __decorateParam(7, A_Inject(AreLifecycle)),
  __decorateParam(8, A_Inject(A_Logger))
], AreEngine.prototype, "verify", 1);
__decorateClass([
  A_Frame.Method({
    description: "Method to pack all necessary dependencies for the engine. This method is called during the initialization phase of the engine and ensures that all required components are registered in the container scope, allowing for proper dependency injection and management throughout the engine's lifecycle."
  })
], AreEngine.prototype, "package", 1);
AreEngine = __decorateClass([
  A_Frame.Component({
    namespace: "A-ARE",
    name: "AreEngine",
    description: "Core rendering engine for A-Concept Rendering Engine (ARE), responsible for orchestrating the loading, building, and execution of the rendering process. It manages the lifecycle of root nodes, coordinates the interactions between syntax, transformer, loader, compiler, and interpreter components, and ensures the proper initialization and mounting of the UI application."
  })
], AreEngine);
var AreWatcher = class extends A_Component {
  /**
   * Initialize the watcher. This method is called once when the watcher is first created. Use this to set up any necessary state or start observing changes.
   */
  init() {
  }
  /**
   * Start watching for changes. This method is called after the engine has executed. Use this to set up any necessary event listeners or intervals to observe changes and produce signals.
   */
  watch() {
  }
  destroy() {
  }
};
__decorateClass([
  A_Concept.Stop()
], AreWatcher.prototype, "destroy", 1);
AreWatcher = __decorateClass([
  A_Frame.Component({
    namespace: "A-ARE",
    name: "AreWatcher",
    description: "AreWatcher is a component that observes changes and produces A_Signals Depending on the actual handlers"
  })
], AreWatcher);

// src/lib/AreComponent/Are.container.ts
var _a;
var AreApp = class extends A_Service {
  async [_a = A_ServiceFeatures.onStart](engine, context, watchers, logger) {
    try {
      for (const watcher of watchers) {
        await watcher.init();
      }
      await engine.load();
      await engine.build();
      await engine.execute();
      for (const watcher of watchers) {
        await watcher.watch();
      }
      logger?.info("cyan", `UI Application started at <${context.roots.map((root) => root.aseid.id).join(", ")}> with ${context.roots.length} root nodes.`);
      logger?.debug(
        "cyan",
        "Performance:",
        "------------------------------ \n",
        ...context.performance,
        "------------------------------ \n",
        "Stats:",
        "------------------------------ \n",
        ...context.stats
      );
    } catch (error) {
      logger?.error(error);
    }
  }
};
__decorateClass([
  A_Feature.Extend(),
  __decorateParam(0, A_Dependency.Required()),
  __decorateParam(0, A_Inject(AreEngine)),
  __decorateParam(1, A_Dependency.Required()),
  __decorateParam(1, A_Inject(AreContext)),
  __decorateParam(2, A_Dependency.All()),
  __decorateParam(2, A_Dependency.Flat()),
  __decorateParam(2, A_Inject(AreWatcher)),
  __decorateParam(3, A_Inject(A_Logger))
], AreApp.prototype, _a, 1);
var AreSyntaxError = class extends A_Error {
};
AreSyntaxError.SyntaxParseError = "Are Syntax Parse Error";
AreSyntaxError.SyntaxNotSupportedError = "Are Syntax Not Supported Error";
AreSyntaxError.MethodNotImplementedError = "Are Syntax Method Not Implemented Error";
var AreCompilerError = class extends A_Error {
};
AreCompilerError.RenderError = "Are Compiler Render Error";
AreCompilerError.CompilationError = "Are Compiler Compilation Error";
var AreInterpreterError = class extends A_Error {
};
var AreLifecycleError = class extends A_Error {
};
AreLifecycleError.InvalidLifecycleMethod = "Invalid lifecycle method. Lifecycle method must be one of the following: onBeforeLoad, onLoad, onUpdate, onDestroy.";
var AreLoaderError = class extends A_Error {
};
AreLoaderError.SyntaxError = "Are Loader Syntax Error";
AreLoaderError.EmptyTemplateError = "Are Loader Empty Template Error";
var AreRoute = class _AreRoute extends AreSignal {
  constructor(path) {
    super({
      data: new A_Route(path)
    });
  }
  get route() {
    return this.data;
  }
  static default() {
    return new _AreRoute(document.location.pathname || "/");
  }
  compare(other) {
    return this.route.toRegExp().test(other.data.toString());
  }
};

export { Are, AreApp, AreAttribute, AreAttributeFeatures, AreCompiler, AreCompilerError, AreContext, AreDeclaration, AreEngine, AreEngineError, AreEngineFeatures, AreEvent, AreFeatures, AreInit, AreInstruction, AreInstructionDefaultNames, AreInstructionError, AreInstructionFeatures, AreInterpreter, AreInterpreterError, AreLifecycle, AreLifecycleError, AreLoader, AreLoaderError, AreMutation, AreNode, AreNodeFeatures, AreNodeStatuses, AreRoute, AreScene, AreSceneError, AreSceneStatuses, AreSignal, AreSignals, AreSignalsContext, AreSignalsMeta, AreStore, AreStoreAreComponentMetaKeys, AreSyntax, AreSyntaxError, AreTokenizer, AreTokenizerError, AreTransformer, AreWatcher };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map