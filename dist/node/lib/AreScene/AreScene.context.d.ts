import { A_Fragment, ASEID, A_Scope } from '@adaas/a-concept';
import { AreNode } from '@adaas/are/node/AreNode.entity';
import { AreDeclaration } from '@adaas/are/instruction/types/AreDeclaration.instruction';
import { AreInstruction } from '@adaas/are/instruction/AreInstruction.entity';
import { AreSceneStatusNames, AreSceneChanges } from './AreScene.types.js';
import { AreMutation } from '@adaas/are/instruction/types/AreMutation.instruction';
import '@adaas/are/instruction/AreInstruction.types';
import './AreScene.constants.js';

declare class AreScene extends A_Fragment {
    protected _groupToInstructionsMap: Map<string, Set<AreInstruction>>;
    /**
     * Plan is a queue of changes that should be applied to render the node
     *
     * It works as FIFO, so the first instruction that should be applied is the first one in the queue, and so on.
     */
    protected _plan: Array<AreInstruction>;
    /**
     * State is a list of instructions that are currently applied to the node,
     * so it represents the current state of the node in the scene.
     *
     * It always in a reverse order of the plan, so the last instruction in the state is the first one that should be reverted when we need to revert the changes, and so on.
     *
     * For example, if we have a node with two instructions in the plan: [Instruction A, Instruction B], and both of them are applied to the node, then the state will be [Instruction B, Instruction A], so when we need to revert the changes, we will revert Instruction B first, and then Instruction A.
     */
    protected _state: Array<AreInstruction>;
    protected _host: AreDeclaration | undefined;
    /**
     * Scene status is used to determine the current lifecycle stage of the scene, which can be 'active', 'inactive' or 'destroyed'. This status can be used to control the behavior of the scene and its instructions, for example, we can prevent applying new instructions to an inactive or destroyed scene, or we can trigger certain actions when the scene becomes active or inactive. The default status of the scene is 'inactive', which means that the scene is not yet rendered and its instructions are not applied, and it will become 'active' when it is mounted and its instructions are applied, and it will become 'destroyed' when it is unmounted and its instructions are reverted.
     */
    protected _status: AreSceneStatusNames;
    constructor(
    /**
     * Scene identity will be used to identify mounting point in the parent scene
     */
    id: string | ASEID);
    /**
     * Scene ID that corresponds to the root node's ID (part of ASEID)
     */
    get id(): string;
    /**
     * The scope where scene is registered. This scope is owned by AreNode
     */
    get scope(): A_Scope;
    /**
     * The owner node of the scene, which is the node that registered the scene in its scope.
     * This is typically the node that is responsible for rendering the scene and managing its lifecycle.
     */
    get owner(): AreNode;
    /**
     * It's a primary declaration instruction that represents the node in the scene, so it should be registered as a host instruction for the scene, and it will be used to keep track of the node in the scene and to manage its lifecycle.
     */
    get host(): AreDeclaration | undefined;
    /**
     * Scene status is used to determine the current lifecycle stage of the scene, which can be 'active', 'inactive' or 'destroyed'. This status can be used to control the behavior of the scene and its instructions, for example, we can prevent applying new instructions to an inactive or destroyed scene, or we can trigger certain actions when the scene becomes active or inactive. The default status of the scene is 'inactive', which means that the scene is not yet rendered and its instructions are not applied, and it will become 'active' when it is mounted and its instructions are applied, and it will become 'destroyed' when it is unmounted and its instructions are reverted.
     */
    get status(): AreSceneStatusNames;
    get isActive(): boolean;
    get isInactive(): boolean;
    /**
     * Returns All declaration instructions are registered in the scene scope. Since declaration instructions are the main instructions that represent the structure of the node, we have a separate getter for them to easily access and manage them in the scene.
     */
    get declarations(): AreDeclaration[];
    /**
     * Returns All mutation instructions are registered in the scene scope. Mutation instructions are the instructions that represent the changes to be applied to the node, so we have a separate getter for them to easily access and manage them in the scene, especially when we want to apply or revert changes based on the mutations.
     */
    get mutations(): AreMutation[];
    /**
     * Returns All instructions are registered in the scene scope.
     */
    get instructions(): AreInstruction[];
    /**
     * Plan is a queue of changes that should be applied to render the node
     *
     * It works as FIFO, so the first instruction that should be applied is the first one in the queue, and so on.
     */
    get planned(): AreInstruction[];
    /**
     * State is a list of instructions that are currently applied to the node,
     * so it represents the current state of the node in the scene.
     *
     * It always in a reverse order of the plan, so the last instruction in the state is the first one that should be reverted when we need to revert the changes, and so on.
     *
     * For example, if we have a node with two instructions in the plan: [Instruction A, Instruction B], and both of them are applied to the node, then the state will be [Instruction B, Instruction A], so when we need to revert the changes, we will revert Instruction B first, and then Instruction A.
     */
    get applied(): AreInstruction[];
    /**
     * Should return instructions to be reverted and to be applied.
     * A difference between plan vs state is that plan is what should be applied to the scene,
     * while state is what currently applied to the scene.
     *
     */
    get changes(): AreSceneChanges;
    activate(): void;
    deactivate(): void;
    /**
     * Each scene has a primary declaration instruction that represents the node in the scene, so it should be registered as a host instruction for the scene, and it will be used to keep track of the node in the scene and to manage its lifecycle. This method allows to set the host instruction for the scene, but it will throw an error if we try to set another host instruction while there is already a host instruction set, so we can ensure that there is only one host instruction for the scene at any given time.
     *
     * @param instruction
     */
    setHost(instruction: AreDeclaration): void;
    /**
     * Unsets the current host instruction from the scene.
     *
     * This method should be used when we want to remove the primary declaration instruction that represents the node in the scene, for example, when we want to unmount the node or when we want to replace it with another node. Unsetting the host instruction will allow us to set a new host instruction for the scene if needed.
     */
    removeHost(): void;
    /**
     * Method that should register the instruction in the plan, so it will be rendered in the next render cycle.
     *
     * @param instruction
     */
    plan(instruction: AreInstruction): void;
    planBefore(instruction: AreInstruction, beforeInstruction: AreInstruction): void;
    planAfter(instruction: AreInstruction, afterInstruction: AreInstruction): void;
    moveBefore(instruction: AreInstruction, beforeInstruction: AreInstruction): void;
    moveAfter(instruction: AreInstruction, afterInstruction: AreInstruction): void;
    /**
     * Allows to remove instruction from the plan, so it will not be rendered anymore, but it will still be registered in the scene scope, so it can be planned again if needed.
     *
     * @param instruction
     */
    unPlan(instruction: AreInstruction): void;
    /**
     * Checks if the instruction is already in the plan, so it will be rendered in the next render cycle.
     *
     * @param instruction
     * @returns
     */
    getPlanned(instruction: AreInstruction): AreInstruction | undefined;
    /**
     * Checks if the instruction is already in the plan, so it will be rendered in the next render cycle.
     *
     * @param instruction
     * @returns
     */
    isInPlan(instruction: AreInstruction): boolean;
    /**
     * Method moves the instruction to state to keep it applied and to be able to revert it later if needed. The instruction should be already registered in the scene scope and planned to be applied, otherwise it will not be applied.
     *
     * @param instruction
     */
    apply(instruction: AreInstruction): void;
    /**
     * Method moves the instruction from state to unapply it and to be able to apply it later if needed. The instruction should be already registered in the scene scope and applied, otherwise it will not be unapplied.
     *
     * @param instruction
     */
    unApply(instruction: AreInstruction): void;
    /**
     * Checks if the instruction is already in the state, so it is currently applied to the scene.
     *
     * @param instruction
     * @returns
     */
    getApplied(instruction: AreInstruction): AreInstruction | undefined;
    /**
     * Checks if the instruction is already in the state, so it is currently applied to the scene.
     *
     * @param instruction
     * @returns
     */
    isApplied(instruction: AreInstruction): boolean;
    /**
     * Method that should reset the scene to the initial state, so it will clear the plan and state, but it will not deregister the instructions from the scene scope, so they will still be registered in the scene and can be planned and applied again if needed.
     *
     */
    reset(): void;
}

export { AreScene };
