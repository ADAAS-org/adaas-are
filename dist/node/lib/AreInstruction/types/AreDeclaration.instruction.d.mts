import { AreInstruction } from '@adaas/are/instruction/AreInstruction.entity';
import { AreInstructionSerialized } from '@adaas/are/instruction/AreInstruction.types';

/**
 * This is a top-level instruction that represents the creation of a new element in the scene. It contains all the necessary information to create a new element, such as its tag and parent. This instruction can be applied to the scene to create a new element and can be reverted to remove the created element.
 */
declare class AreDeclaration<T extends Record<string, any> = Record<string, any>, S extends AreInstructionSerialized<T> = AreInstructionSerialized<T>> extends AreInstruction<T, S> {
    constructor(
    /**
     * Serialized form of the instruction, used for deserialization and reconstruction of the instruction instance. This allows for the instruction to be easily stored, transmitted, and recreated in different contexts or at different times, while maintaining all the necessary information and relationships intact.
     */
    serialized: AreInstructionSerialized);
    constructor(
    /**
     * The name of the operation to be performed in Host. For example, for CreateElement instruction, the name can be "createElement", so the Host can have a method with the same name to handle this instruction.
     */
    name: string, 
    /**
     * In case this is a child instruction that is related to a declaration instruction, we can pass the parent declaration instruction to establish the relationship between them. This allows us to manage related instructions together and ensure that they are executed in the correct order in the scene.
     */
    parent: AreDeclaration, 
    /**
     * A set of additional parameters that may be needed for the rendering purpose. For example, for CreateElement instruction, the payload can contain the tag name and parent information, so the Host can use this information to create the element in the correct place in the scene.
     */
    payload: T);
    constructor(
    /**
     * The name of the operation to be performed in Host. For example, for CreateElement instruction, the name can be "createElement", so the Host can have a method with the same name to handle this instruction.
     */
    name?: string, 
    /**
     * A set of additional parameters that may be needed for the rendering purpose. For example, for CreateElement instruction, the payload can contain the tag name and parent information, so the Host can use this information to create the element in the correct place in the scene.
     */
    payload?: T);
}

export { AreDeclaration };
