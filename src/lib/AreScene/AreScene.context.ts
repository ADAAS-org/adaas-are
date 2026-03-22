import { A_Context, A_Dependency, A_Fragment, A_Scope, ASEID } from "@adaas/a-concept";
import { AreIndex } from "../AreIndex/AreIndex.context";
import { AreNode, AreRootNode } from "@adaas/are/node";
import { AreSCene_Serialized, AreSceneChanges } from "./AreScene.types";
import { AreProps } from "@adaas/are/props";
import { AreStore } from "@adaas/are/store";
import { AreSceneInstruction, AreSceneInstructionsStatuses } from "@adaas/are/scene-instruction";
import { A_Frame } from "@adaas/a-frame";



@A_Frame.Component({
    namespace: 'A-ARE',
    name: 'AreScene',
    description: 'AreScene fragment is keeps only what actually is displayed, while Are Node has everything related to the node like template, markup, styles, etc. Scene is responsible for rendering, managing state and lifecycle of the nodes within the scene.'
})
export class AreScene extends A_Fragment {
    /**
     * Plan is a queue of changes that should be applied to render the node
     * 
     * It works as FIFO, so the first instruction that should be applied is the first one in the queue, and so on.
     */
    protected _plan: Array<AreSceneInstruction> = [];
    /**
     * State is a list of instructions that are currently applied to the node, 
     * so it represents the current state of the node in the scene.
     * 
     * It always in a reverse order of the plan, so the last instruction in the state is the first one that should be reverted when we need to revert the changes, and so on.
     * 
     * For example, if we have a node with two instructions in the plan: [Instruction A, Instruction B], and both of them are applied to the node, then the state will be [Instruction B, Instruction A], so when we need to revert the changes, we will revert Instruction B first, and then Instruction A.
     */
    protected _state: Array<AreSceneInstruction> = [];


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
    get owner(): AreRootNode {
        return this.scope.issuer() as AreRootNode;
    }
    /**
     * Returns All instructions are registered in the scene scope. 
     */
    get instructions(): AreSceneInstruction[] {
        return this.scope.resolveFlatAll<AreSceneInstruction>(AreSceneInstruction) || [];
    }
    /**
     * Plan is a queue of changes that should be applied to render the node
     * 
     * It works as FIFO, so the first instruction that should be applied is the first one in the queue, and so on.
     */
    get planned(): AreSceneInstruction[] {
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
    get applied(): AreSceneInstruction[] {
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
    /**
     * Method that should register the instruction as a basic draw plan.
     * 
     * [!] Note: Comparing to plan method this one Adds Instruction to the node to keep original instructions 
     *     AND to PLAN to set the default rendering procedure. 
     * 
     * @param instruction 
     * @returns 
     */
    register(instruction: AreSceneInstruction) {
        const registered = this.getRegistered(instruction);

        if (!registered) {
            this.scope.register(instruction);
            this.plan(instruction);
        }
    }
    /**
     * Allows to deregister method from original initial node scope, so it will be removed from the node and will not be rendered anymore.
     * 
     * @param instruction 
     */
    deregister(instruction: AreSceneInstruction) {
        const registered = this.getRegistered(instruction);

        if (registered) {
            this.scope.deregister(registered);
            this.unPlan(registered);
        }
    }
    /**
     * Checks if the instruction is already registered in the scene scope. 
     * 
     * @param instruction 
     * @returns 
     */
    isRegistered(instruction: AreSceneInstruction): boolean {
        return !!this.getRegistered(instruction);
    }
    /**
     * Returns the instruction if it's registered in the scene scope, otherwise returns undefined.
     * 
     * @param instruction 
     * @returns 
     */
    getRegistered(instruction: AreSceneInstruction): AreSceneInstruction | undefined {
        const found = this.scope.resolve(new A_Dependency(instruction.constructor as any, {
            query: { aseid: instruction.aseid }
        })) as AreSceneInstruction | undefined;

        return found;
    }

    // ------------------------------------------------------------------------------------------------------------
    // Scene Render Plan Methods
    // ------------------------------------------------------------------------------------------------------------
    /**
     * Method that should register the instruction in the plan, so it will be rendered in the next render cycle.
     * 
     * @param instruction 
     */
    plan(instruction: AreSceneInstruction) {
        const planned = this.getPlanned(instruction);

        if (!planned) {
            this._plan.push(instruction);
        }
    }
    /**
     * Allows to remove instruction from the plan, so it will not be rendered anymore, but it will still be registered in the scene scope, so it can be planned again if needed.
     * 
     * @param instruction 
     */
    unPlan(
        instruction: AreSceneInstruction
    ) {
        this._plan = this._plan.filter(i => i.aseid.toString() !== instruction.aseid.toString());
    }
    /**
     * Checks if the instruction is already in the plan, so it will be rendered in the next render cycle.
     * 
     * @param instruction 
     * @returns 
     */
    getPlanned(instruction: AreSceneInstruction): AreSceneInstruction | undefined {
        const found = this._plan.find(i => i.aseid.toString() === instruction.aseid.toString());

        return found;
    }
    /**
     * Checks if the instruction is already in the plan, so it will be rendered in the next render cycle.
     * 
     * @param instruction 
     * @returns 
     */
    isInPlan(instruction: AreSceneInstruction): boolean {
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
    apply(instruction: AreSceneInstruction) {

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
        instruction: AreSceneInstruction
    ) {
        this._state = this._state.filter(i => i.aseid.toString() !== instruction.aseid.toString());
    }
    /**
     * Checks if the instruction is already in the state, so it is currently applied to the scene.
     * 
     * @param instruction 
     * @returns 
     */
    getApplied(instruction: AreSceneInstruction): AreSceneInstruction | undefined {
        const found = this._state.find(i => i.aseid.toString() === instruction.aseid.toString());

        return found;
    }
    /**
     * Checks if the instruction is already in the state, so it is currently applied to the scene.
     * 
     * @param instruction 
     * @returns 
     */
    isApplied(instruction: AreSceneInstruction): boolean {
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