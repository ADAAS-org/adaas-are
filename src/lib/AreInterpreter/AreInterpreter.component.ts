import { A_Caller, A_Component, A_Feature, A_Inject, A_Scope, A_TYPES__Entity_Constructor } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame";
import { AreScene } from "@adaas/are/scene/AreScene.context";
import { AreNode } from "@adaas/are/node/AreNode.entity";
import { AreNodeFeatures } from "@adaas/are/node/AreNode.constants";
import { AreInstructionFeatures } from "@adaas/are/instruction/AreInstruction.constants";
import { AreInstruction } from "@adaas/are/instruction/AreInstruction.entity";
import { AreStore } from "@adaas/are/store/AreStore.context";
import { A_Logger } from "@adaas/a-utils/a-logger";



@A_Frame.Component({
    description: 'Stateless executor that reads the Scene and translates its instructions into operations on a rendering target. Computes the diff between applied and planned, calls revert on removed instructions and apply on added ones. Owns no state of its own — all state lives in the Scene. Can be swapped for any target implementation (DOMInterpreter, SSRInterpreter, CanvasInterpreter) without touching any other part of the pipeline.'
})
export class AreInterpreter extends A_Component {
    /**
     * Decorator to mark a method as an instruction Apply handler for the specific instruction type. The method will be called during the render phase of the ARE component when the corresponding instruction needs to be applied. The method should contain logic to perform the necessary operations on the rendering target based on the instruction's content and context.
     * 
     * @param action 
     * @returns 
     */
    static Apply(action: string) {
        const name = action + AreInstructionFeatures.Apply

        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }
    /**
     * Decorator to mark a method as an instruction Update handler for the specific instruction type. The method will be called during the render phase of the ARE component when the corresponding instruction has been updated. The method should contain logic to perform the necessary operations on the rendering target to update the effects of the instruction based on its new content and context.
     * 
     * @param action 
     * @returns 
     */
    static Update(action: string) {
        const name = action + AreInstructionFeatures.Update

        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }
    /**
     * Decorator to mark a method as an instruction Revert handler for the specific instruction type. The method will be called during the render phase of the ARE component when the corresponding instruction needs to be reverted. The method should contain logic to perform the necessary operations on the rendering target to undo the effects of the instruction based on its content and context.
     * 
     * @param action 
     * @returns 
     */
    static Revert(action: string) {

        const name = action + AreInstructionFeatures.Revert

        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }
    /**
     * The method responsible for executing the render operation based on the current state of the Scene. It processes the instructions that need to be applied and reverted, ensuring that the rendering target is updated accordingly. The method handles any errors that may occur during the application or reversion of instructions, maintaining the integrity of the rendering process.
     * 
     * @param scene 
     */
    @A_Feature.Extend({
        name: AreNodeFeatures.onInterpret,
        scope: [AreNode]
    })
    interpret(
        @A_Inject(AreScene) scene: AreScene,
    ) {
        /**
          * 1. First we need to get all changes to be applied and reverted during render operation
          */
        const { toApply, toRevert } = scene.changes

        /**
         * 2. Then we need to revert all instructions from scene
         */
        for (const instruction of toRevert) {
            try {
                instruction.revert();
                scene.unApply(instruction);
            } catch (error) {
                instruction.apply();
                scene.apply(instruction);
            }
        }
        /**
         * 3. Finally we should apply everything that needs to be applied
         */
        for (const instruction of toApply) {
            try {
                /**
                 * 3.1. if everything went well then just simply apply and attach to state this instruction
                 */
                instruction.apply();
                scene.apply(instruction);
            } catch (error) {
                /**
                 * 2.2. if any error happened we simply revert the instruction and remove it from the state
                 */
                instruction.revert();
                scene.unApply(instruction);
            }
        }
    }

    // -----------------------------------------------------------------------------------------
    // ----------------------------Are-Instruction Section----------------------------------------
    // -----------------------------------------------------------------------------------------

    @A_Feature.Extend({
        name: AreInstructionFeatures.Apply,
        scope: [AreInstruction]
    })
    protected applyInstruction(
        @A_Inject(A_Caller) instruction: AreInstruction,
        @A_Inject(AreInterpreter) interpreter: AreInterpreter,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(A_Feature) feature: A_Feature,
        ...args: any[]
    ) {
        try {
            /**
             * 1. uses to track all calls to Store
             */
            store.watch(instruction);
            /**
             * So we're looking for any instruction name in the interpreter to be executed.
             */
            feature.chain(interpreter, instruction.name + AreInstructionFeatures.Apply, scope);

            store.unwatch(instruction);
        } catch (error) {
            store.unwatch(instruction);
            throw error;
        }

    }

    @A_Feature.Extend({
        name: AreInstructionFeatures.Update,
        scope: [AreInstruction]
    })
    protected updateInstruction(
        @A_Inject(A_Caller) instruction: AreInstruction,
        @A_Inject(AreInterpreter) interpreter: AreInterpreter,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(A_Feature) feature: A_Feature,
        ...args: any[]
    ) {
        try {
            /**
             * 1. uses to track all calls to Store
             */
            store.watch(instruction);
            /**
             * So we're looking for any instruction name in the interpreter to be executed.
             */
            feature.chain(interpreter, instruction.name + AreInstructionFeatures.Update, scope);

            store.unwatch(instruction);
        } catch (error) {
            store.unwatch(instruction);
            throw error;
        }

    }


    @A_Feature.Extend({
        name: AreInstructionFeatures.Revert,
        scope: [AreInstruction]
    })
    protected revertInstruction(
        @A_Inject(A_Caller) instruction: AreInstruction,
        @A_Inject(AreInterpreter) interpreter: AreInterpreter,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(A_Feature) feature: A_Feature,
        ...args: any[]
    ) {
        try {
            /**
             * 1. uses to track all calls to Store
             */
            // store.watch(instruction);
            /**
             * So we're looking for any instruction name in the interpreter to be executed.
             */
            feature.chain(interpreter, instruction.name + AreInstructionFeatures.Revert, scope);

            // store.unwatch(instruction);
        } catch (error) {
            // store.unwatch(instruction);
            throw error;
        }
    }
}