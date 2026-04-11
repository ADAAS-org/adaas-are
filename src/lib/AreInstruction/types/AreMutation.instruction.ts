import { title } from "process";
import { A_Frame } from "@adaas/a-frame";
import { AreInstructionDefaultNames } from "@adaas/are/instruction/AreInstruction.constants";
import { AreInstruction } from "@adaas/are/instruction/AreInstruction.entity";
import { AreInstructionError } from "@adaas/are/instruction/AreInstruction.error";
import { AreInstructionNewProps, AreInstructionSerialized } from "@adaas/are/instruction/AreInstruction.types";
import { AreDeclaration } from "./AreDeclaration.instruction";



@A_Frame.Entity({
    namespace: 'A-ARE',
    name: 'AreMutation',
    description: 'AreMutation is a rendering instruction that represents a reversible change applied to an existing declaration node in the ARE scene — such as updating an attribute, modifying content, or altering child structure. It references a parent AreDeclaration and is grouped with related mutations for coordinated apply and revert operations.'
})
export class AreMutation<
    T extends Record<string, any> = Record<string, any>,
    S extends AreInstructionSerialized<T> = AreInstructionSerialized<T>
> extends AreInstruction<T, S> {

    get parent(): string {
        return this._parent!;
    }


    get group(): string {
        return this._group || this.parent;
    }

    constructor(
        /**
         * Serialized form of the instruction, used for deserialization and reconstruction of the instruction instance. This allows for the instruction to be easily stored, transmitted, and recreated in different contexts or at different times, while maintaining all the necessary information and relationships intact.
         */
        serialized: S,
    )
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
        payload?: T,
    )
    constructor(
        /**
         * The name of the operation to be performed in Host.
         */
        param1: string | S,
        /**
         * Parent instruction for grouping in case of mutations related to a specific declaration. This allows for better organization and management of instructions in the scene, as all mutations related to the same declaration will be executed together.
         */
        param2?: AreDeclaration,
        /**
         * A set of additional parameters that may be needed for the rendering purpose. For example, for AddAttribute instruction, the payload can contain the attribute name and value as a payload, so the Host can use this information to add the attribute to the node.
         */
        param3?: T,
    ) {
        if (typeof param1 === 'object' && 'aseid' in param1)
            super(param1);
        else
            super({
                name: param1 || AreInstructionDefaultNames.Mutation,
                group: param2,
                parent: param2,
                payload: param3,
                // id: [param1, param3, param2?.group]
            } as AreInstructionNewProps<T>);
    }



    fromNew(newEntity: AreInstructionNewProps<T>): void {
        if (!newEntity.parent)
            throw new AreInstructionError({
                title: "Mutation instruction must have a parent declaration instruction",
                description: `Mutation instruction with name ${newEntity.name} must have a parent declaration instruction for grouping and organization purposes. Please provide a parent declaration instruction when creating this mutation instruction.`
            });

        super.fromNew(newEntity);
    }
}