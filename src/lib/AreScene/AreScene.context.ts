import { A_Context, A_Dependency, A_Fragment, A_Scope, ASEID } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame";
import type { AreNode } from "@adaas/are/node/AreNode.entity";
import { AreDeclaration } from "@adaas/are/instruction/types/AreDeclaration.instruction";
import { AreInstruction } from "@adaas/are/instruction/AreInstruction.entity";
import { AreSceneChanges, AreSceneStatusNames } from "./AreScene.types";
import { AreSceneError } from "./AreScene.error";
import { AreMutation } from "@adaas/are/instruction/types/AreMutation.instruction";
import { AreSceneStatuses } from "./AreScene.constants";



@A_Frame.Component({
    namespace: 'A-ARE',
    name: 'AreScene',
    description: "Persistent runtime structure that owns the rendering state for a component's lifetime. Maintains two sets — applied (what is currently in the DOM) and planned (what should be). Acts as the single source of truth for all rendering decisions. The Compiler produces it once, the Interpreter reads it on every update."
})
export class AreScene extends A_Fragment {
    // -----------------------------------------------------------------------------------
    // -----------------------------------Scene Index-------------------------------------
    // -----------------------------------------------------------------------------------
    protected _groupToInstructionsMap: Map<string, Set<AreInstruction>> = new Map();

    /**
     * Plan is a queue of changes that should be applied to render the node
     * 
     * It works as FIFO, so the first instruction that should be applied is the first one in the queue, and so on.
     */
    protected _plan: Array<AreInstruction> = [];
    /**
     * State is a list of instructions that are currently applied to the node, 
     * so it represents the current state of the node in the scene.
     * 
     * It always in a reverse order of the plan, so the last instruction in the state is the first one that should be reverted when we need to revert the changes, and so on.
     * 
     * For example, if we have a node with two instructions in the plan: [Instruction A, Instruction B], and both of them are applied to the node, then the state will be [Instruction B, Instruction A], so when we need to revert the changes, we will revert Instruction B first, and then Instruction A.
     */
    protected _state: Array<AreInstruction> = [];


    protected _host: AreDeclaration | undefined;
    /**
     * Scene status is used to determine the current lifecycle stage of the scene, which can be 'active', 'inactive' or 'destroyed'. This status can be used to control the behavior of the scene and its instructions, for example, we can prevent applying new instructions to an inactive or destroyed scene, or we can trigger certain actions when the scene becomes active or inactive. The default status of the scene is 'inactive', which means that the scene is not yet rendered and its instructions are not applied, and it will become 'active' when it is mounted and its instructions are applied, and it will become 'destroyed' when it is unmounted and its instructions are reverted.
     */
    protected _status: AreSceneStatusNames = AreSceneStatuses.Active;


    constructor(
        /**
         * Scene identity will be used to identify mounting point in the parent scene
         */
        id: string | ASEID,
    ) {
        super({ name: id.toString() });
    }

    /**
     * Scene ID that corresponds to the root node's ID (part of ASEID) 
     */
    get id(): string {
        return this.name;
    }
    /**
     * The scope where scene is registered. This scope is owned by AreNode 
     */
    get scope(): A_Scope {
        return A_Context.scope(this);
    }
    /**
     * The owner node of the scene, which is the node that registered the scene in its scope. 
     * This is typically the node that is responsible for rendering the scene and managing its lifecycle.
     */
    get owner(): AreNode {
        return this.scope.issuer() as AreNode;
    }
    /**
     * It's a primary declaration instruction that represents the node in the scene, so it should be registered as a host instruction for the scene, and it will be used to keep track of the node in the scene and to manage its lifecycle.
     */
    get host(): AreDeclaration | undefined {
        return this._host;
    }
    /**
     * Scene status is used to determine the current lifecycle stage of the scene, which can be 'active', 'inactive' or 'destroyed'. This status can be used to control the behavior of the scene and its instructions, for example, we can prevent applying new instructions to an inactive or destroyed scene, or we can trigger certain actions when the scene becomes active or inactive. The default status of the scene is 'inactive', which means that the scene is not yet rendered and its instructions are not applied, and it will become 'active' when it is mounted and its instructions are applied, and it will become 'destroyed' when it is unmounted and its instructions are reverted.
     */
    get status(): AreSceneStatusNames {
        return this._status;
    }

    get isActive(): boolean {
        return this.status === AreSceneStatuses.Active;
    }

    get isInactive(): boolean {
        return this.status === AreSceneStatuses.Inactive;
    }

    /**
     * Returns All declaration instructions are registered in the scene scope. Since declaration instructions are the main instructions that represent the structure of the node, we have a separate getter for them to easily access and manage them in the scene.
     */
    get declarations(): AreDeclaration[] {
        return this.scope.resolve<AreDeclaration>(new A_Dependency(AreDeclaration, {
            flat: true,
            pagination: {
                count: -1,
            }
        })) as AreDeclaration[] || [];
    }
    /**
     * Returns All mutation instructions are registered in the scene scope. Mutation instructions are the instructions that represent the changes to be applied to the node, so we have a separate getter for them to easily access and manage them in the scene, especially when we want to apply or revert changes based on the mutations.
     */
    get mutations(): AreMutation[] {
        return this.scope.resolve<AreMutation>(new A_Dependency(AreMutation, {
            flat: true,
            pagination: {
                count: -1,
            }
        })) as AreMutation[] || [];
    }
    /**
     * Returns All instructions are registered in the scene scope. 
     */
    get instructions(): AreInstruction[] {
        return this.scope.resolveFlatAll<AreInstruction>(AreInstruction) || [];
    }
    /**
     * Plan is a queue of changes that should be applied to render the node
     * 
     * It works as FIFO, so the first instruction that should be applied is the first one in the queue, and so on.
     */
    get planned(): AreInstruction[] {
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
    get applied(): AreInstruction[] {
        return this._state.reverse(); // we reverse the state to have the correct order of instructions, so the first instruction in the state is the first one that should be reverted when we need to revert the changes, and so on.
    }

    /**
     * Should return instructions to be reverted and to be applied. 
     * A difference between plan vs state is that plan is what should be applied to the scene, 
     * while state is what currently applied to the scene. 
     * 
     */
    get changes(): AreSceneChanges {
        const toApply = this.planned.filter(i => !this.isApplied(i));
        const toRevert = this.applied.filter(i => !this.isInPlan(i));

        return {
            toApply,
            toRevert,
        }
    }


    //===============================================================================================
    //============================= Scene Primary Methods ===========================================
    //===============================================================================================
    activate(): void {
        this._status = AreSceneStatuses.Active;
    }

    deactivate(): void {

        this._status = AreSceneStatuses.Inactive;
    }
    /**
     * Each scene has a primary declaration instruction that represents the node in the scene, so it should be registered as a host instruction for the scene, and it will be used to keep track of the node in the scene and to manage its lifecycle. This method allows to set the host instruction for the scene, but it will throw an error if we try to set another host instruction while there is already a host instruction set, so we can ensure that there is only one host instruction for the scene at any given time.
     * 
     * @param instruction 
     */
    setHost(instruction: AreDeclaration): void {
        if (this.host) {
            const dependentInstructions = this.scope.resolve<AreMutation>(new A_Dependency(AreMutation, {
                flat: true,
                pagination: {
                    count: -1,
                },
                query: {
                    parent: this.host.aseid.toString(),

                }
            })) as Array<AreMutation> || [];

            dependentInstructions.forEach(element => {
                element.attachTo(instruction)
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
    removeHost(): void {
        if (this.host)
            throw new AreSceneError({
                title: AreSceneError.HostInstructionHasConnectedInstructions,
                description: `Cannot remove host instruction (${this.host.aseid}) from scene ${this.id} because it has planned instructions in the scene. Please unPlan all instructions related to the host instruction before removing it.`,
            });

        this._host = undefined;

    }

    // ------------------------------------------------------------------------------------------------------------
    // Scene Render Plan Methods
    // ------------------------------------------------------------------------------------------------------------
    /**
     * Method that should register the instruction in the plan, so it will be rendered in the next render cycle.
     * 
     * @param instruction 
     */
    plan(instruction: AreInstruction) {
        // const registered = this.getPlanned(instruction);

        // if (!registered) {
        try {
            this.scope.register(instruction);

        } catch (error) {

        }
        this._plan.push(instruction);

        // We also add the instruction to the group map, so we can easily manage instructions by group, for example, when we want to unPlan all instructions related to a specific host instruction, we can easily find them in the group map and unPlan them.
        if (!this._groupToInstructionsMap.has(instruction.group || 'default')) {
            this._groupToInstructionsMap.set(instruction.group || 'default', new Set());
        }
        this._groupToInstructionsMap.get(instruction.group || 'default')!.add(instruction);
        // }
    }

    planBefore(instruction: AreInstruction, beforeInstruction: AreInstruction) {
        const beforeIndex = this._plan.findIndex(i => i.aseid.toString() === beforeInstruction.aseid.toString());
        const instructionIndex = this._plan.findIndex(i => i.aseid.toString() === instruction.aseid.toString());

        if (beforeIndex === -1) {
            throw new AreSceneError({
                title: AreSceneError.SceneError,
                description: `Instruction ${beforeInstruction.aseid} is not in the plan of scene ${this.id}. Cannot plan instruction ${instruction.aseid} before it.`,
            });
        }

        if (instructionIndex === -1) {

            try {
                this.scope.register(instruction);

            } catch (error) {

            }
            this._plan.splice(beforeIndex, 0, instruction);
        } else {
            // Instruction is already in the plan, we just need to move it before the beforeInstruction
            this._plan.splice(instructionIndex, 1); // remove from current position
            this._plan.splice(beforeIndex, 0, instruction); // insert before the beforeInstruction
        }
    }

    planAfter(instruction: AreInstruction, afterInstruction: AreInstruction) {
        const afterIndex = this._plan.findIndex(i => i.aseid.toString() === afterInstruction.aseid.toString());
        const instructionIndex = this._plan.findIndex(i => i.aseid.toString() === instruction.aseid.toString());

        if (afterIndex === -1) {
            throw new AreSceneError({
                title: AreSceneError.SceneError,
                description: `Instruction ${afterInstruction.aseid} is not in the plan of scene ${this.id}. Cannot plan instruction ${instruction.aseid} after it.`,
            });
        }

        if (instructionIndex === -1) {
            this.scope.register(instruction);
            this._plan.splice(afterIndex + 1, 0, instruction);
        } else {
            // Instruction is already in the plan, we just need to move it after the afterInstruction
            this._plan.splice(instructionIndex, 1); // remove from current position
            this._plan.splice(afterIndex + 1, 0, instruction); // insert after the afterInstruction
        }
    }


    moveBefore(instruction: AreInstruction, beforeInstruction: AreInstruction) {
        if (!this.isInPlan(instruction)) {
            throw new AreSceneError({
                title: AreSceneError.SceneError,
                description: `Instruction ${instruction.aseid} is not in the plan of scene ${this.id}. Cannot move instruction before ${beforeInstruction.aseid}. Please plan the instruction before moving it.`,
            });
        }

        this.planBefore(instruction, beforeInstruction);
    }

    moveAfter(instruction: AreInstruction, afterInstruction: AreInstruction) {
        if (!this.isInPlan(instruction)) {
            throw new AreSceneError({
                title: AreSceneError.SceneError,
                description: `Instruction ${instruction.aseid} is not in the plan of scene ${this.id}. Cannot move instruction after ${afterInstruction.aseid}. Please plan the instruction before moving it.`,
            });
        }

        this.planAfter(instruction, afterInstruction);
    }


    /**
     * Allows to remove instruction from the plan, so it will not be rendered anymore, but it will still be registered in the scene scope, so it can be planned again if needed.
     * 
     * @param instruction 
     */
    unPlan(
        instruction: AreInstruction
    ) {
        // const registered = this.getPlanned(instruction);

        // if (registered) {
        // this.scope.deregister(instruction);
        this._plan = this._plan.filter(i => i.aseid.toString() !== instruction.aseid.toString());
        // }

    }
    /**
     * Checks if the instruction is already in the plan, so it will be rendered in the next render cycle.
     * 
     * @param instruction 
     * @returns 
     */
    getPlanned(instruction: AreInstruction): AreInstruction | undefined {
        const found = this._plan.find(i => i.aseid.toString() === instruction.aseid.toString());

        return found;
    }
    /**
     * Checks if the instruction is already in the plan, so it will be rendered in the next render cycle.
     * 
     * @param instruction 
     * @returns 
     */
    isInPlan(instruction: AreInstruction): boolean {
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
    apply(instruction: AreInstruction) {
        if (!this.isApplied(instruction)) {
            this._state.push(instruction);
        }
    }
    /**
     * Method moves the instruction from state to unapply it and to be able to apply it later if needed. The instruction should be already registered in the scene scope and applied, otherwise it will not be unapplied.
     * 
     * @param instruction 
     */
    unApply(
        instruction: AreInstruction
    ) {
        this._state = this._state.filter(i => i.aseid.toString() !== instruction.aseid.toString());
    }
    /**
     * Checks if the instruction is already in the state, so it is currently applied to the scene.
     * 
     * @param instruction 
     * @returns 
     */
    getApplied(instruction: AreInstruction): AreInstruction | undefined {
        const found = this._state.find(i => i.aseid.toString() === instruction.aseid.toString());

        return found;
    }
    /**
     * Checks if the instruction is already in the state, so it is currently applied to the scene.
     * 
     * @param instruction 
     * @returns 
     */
    isApplied(instruction: AreInstruction): boolean {
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
}