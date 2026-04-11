import { A_IdentityHelper } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame";
import { AreInstruction } from "@adaas/are/instruction/AreInstruction.entity";
import { AreInstructionNewProps, AreInstructionSerialized } from "@adaas/are/instruction/AreInstruction.types";
import { AreInstructionDefaultNames } from "@adaas/are/instruction/AreInstruction.constants";


/**
 * This is a top-level instruction that represents the creation of a new element in the scene. It contains all the necessary information to create a new element, such as its tag and parent. This instruction can be applied to the scene to create a new element and can be reverted to remove the created element.
 */
@A_Frame.Entity({
    namespace: 'A-ARE',
    name: 'AreDeclaration',
    description: 'AreDeclaration is a top-level rendering instruction that represents the creation of a new element in the ARE scene. It carries the target tag name and parent reference needed by the Host to construct the DOM element, and can be applied or reverted to manage element creation and removal deterministically.'
})
export class AreDeclaration<
    T extends Record<string, any> = Record<string, any>,
    S extends AreInstructionSerialized<T> = AreInstructionSerialized<T>
> extends AreInstruction<T, S> {

    constructor(
        /**
         * Serialized form of the instruction, used for deserialization and reconstruction of the instruction instance. This allows for the instruction to be easily stored, transmitted, and recreated in different contexts or at different times, while maintaining all the necessary information and relationships intact.
         */
        serialized: AreInstructionSerialized,
    )
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
        payload: T,
    )
    constructor(
        /**
         * The name of the operation to be performed in Host. For example, for CreateElement instruction, the name can be "createElement", so the Host can have a method with the same name to handle this instruction.
         */
        name?: string,
        /**
         * A set of additional parameters that may be needed for the rendering purpose. For example, for CreateElement instruction, the payload can contain the tag name and parent information, so the Host can use this information to create the element in the correct place in the scene.
         */
        payload?: T,
    )
    constructor(
        /**
         * The name of the operation to be performed in Host. For example, for CreateElement instruction, the name can be "createElement", so the Host can have a method with the same name to handle this instruction.
         */
        param1?: string | S,
        /**
         * A set of additional parameters that may be needed for the rendering purpose. For example, for CreateElement instruction, the payload can contain the tag name and parent information, so the Host can use this information to create the element in the correct place in the scene.
         */
        param2?: T | AreDeclaration,
        /**
         * In case this is a child instruction that is related to a declaration instruction, we can pass the parent declaration instruction to establish the relationship between them. This allows us to manage related instructions together and ensure that they are executed in the correct order in the scene.
         */
        param3?: AreDeclaration | T,
    ) {
        if (typeof param1 === 'object' && 'aseid' in param1)
            super(param1);
        else
            super({
                name: param1 || AreInstructionDefaultNames.Default,
                parent: param2 instanceof AreDeclaration ? param2 : undefined,
                group: param2 instanceof AreDeclaration ? param2.group : undefined,
                payload: param2 instanceof AreDeclaration ? (param3 || {}) as T : (param2 || {}) as T,
                // id: [param1, A_IdentityHelper.generateTimeId(), param2 instanceof AreDeclaration ? (param3 || {}) as T : (param2 || {}) as T]
            } as AreInstructionNewProps<T>);
    }

}