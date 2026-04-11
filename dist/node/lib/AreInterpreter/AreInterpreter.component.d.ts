import { A_Component, A_Scope, A_Feature } from '@adaas/a-concept';
import { AreScene } from '@adaas/are/scene/AreScene.context';
import { AreInstruction } from '@adaas/are/instruction/AreInstruction.entity';
import { AreStore } from '@adaas/are/store/AreStore.context';

declare class AreInterpreter extends A_Component {
    /**
     * Decorator to mark a method as an instruction Apply handler for the specific instruction type. The method will be called during the render phase of the ARE component when the corresponding instruction needs to be applied. The method should contain logic to perform the necessary operations on the rendering target based on the instruction's content and context.
     *
     * @param action
     * @returns
     */
    static Apply(action: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    /**
     * Decorator to mark a method as an instruction Update handler for the specific instruction type. The method will be called during the render phase of the ARE component when the corresponding instruction has been updated. The method should contain logic to perform the necessary operations on the rendering target to update the effects of the instruction based on its new content and context.
     *
     * @param action
     * @returns
     */
    static Update(action: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    /**
     * Decorator to mark a method as an instruction Revert handler for the specific instruction type. The method will be called during the render phase of the ARE component when the corresponding instruction needs to be reverted. The method should contain logic to perform the necessary operations on the rendering target to undo the effects of the instruction based on its content and context.
     *
     * @param action
     * @returns
     */
    static Revert(action: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    /**
     * The method responsible for executing the render operation based on the current state of the Scene. It processes the instructions that need to be applied and reverted, ensuring that the rendering target is updated accordingly. The method handles any errors that may occur during the application or reversion of instructions, maintaining the integrity of the rendering process.
     *
     * @param scene
     */
    interpret(scene: AreScene): void;
    protected applyInstruction(instruction: AreInstruction, interpreter: AreInterpreter, store: AreStore, scope: A_Scope, feature: A_Feature, ...args: any[]): void;
    protected updateInstruction(instruction: AreInstruction, interpreter: AreInterpreter, store: AreStore, scope: A_Scope, feature: A_Feature, ...args: any[]): void;
    protected revertInstruction(instruction: AreInstruction, interpreter: AreInterpreter, store: AreStore, scope: A_Scope, feature: A_Feature, ...args: any[]): void;
}

export { AreInterpreter };
