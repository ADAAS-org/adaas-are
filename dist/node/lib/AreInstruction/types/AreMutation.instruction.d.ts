import { AreInstruction } from '@adaas/are/instruction/AreInstruction.entity';
import { AreInstructionSerialized, AreInstructionNewProps } from '@adaas/are/instruction/AreInstruction.types';
import { AreDeclaration } from './AreDeclaration.instruction.js';

declare class AreMutation<T extends Record<string, any> = Record<string, any>, S extends AreInstructionSerialized<T> = AreInstructionSerialized<T>> extends AreInstruction<T, S> {
    get parent(): string;
    get group(): string;
    constructor(
    /**
     * Serialized form of the instruction, used for deserialization and reconstruction of the instruction instance. This allows for the instruction to be easily stored, transmitted, and recreated in different contexts or at different times, while maintaining all the necessary information and relationships intact.
     */
    serialized: S);
    constructor(
    /**
     * The name of the operation to be performed in Host.
     */
    name: string, 
    /**
     * Parent instruction for grouping in case of mutations related to a specific declaration. This allows for better organization and management of instructions in the scene, as all mutations related to the same declaration will be executed together.
     */
    parent: AreDeclaration, 
    /**
     * A set of additional parameters that may be needed for the rendering purpose. For example, for AddAttribute instruction, the payload can contain the attribute name and value as a payload, so the Host can use this information to add the attribute to the node.
     */
    payload?: T);
    fromNew(newEntity: AreInstructionNewProps<T>): void;
}

export { AreMutation };
