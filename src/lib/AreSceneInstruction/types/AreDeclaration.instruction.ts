import { A_IdentityHelper } from "@adaas/a-concept";
import { AreSceneInstruction } from "../AreSceneInstruction.entity";


/**
 * This is a top-level instruction that represents the creation of a new element in the scene. It contains all the necessary information to create a new element, such as its tag and parent. This instruction can be applied to the scene to create a new element and can be reverted to remove the created element.
 */
export class AreDeclarationInstruction<T extends Record<string, any> = {}> extends AreSceneInstruction<T> {

    /**
     * Since it's a declaration instruction, it can be grouped by its id to ensure that all instructions related to the same declaration are executed together. The group is determined by the id of the instruction, which is generated based on the action and payload. This allows for better organization and management of instructions in the scene.
     */
    get group(): string {
        return this.aseid.id
    }

    constructor(
        /**
         * The name of the operation to be performed in Host. For example, for CreateElement instruction, the name can be "createElement", so the Host can have a method with the same name to handle this instruction.
         */
        name: string,
        /**
         * A set of additional parameters that may be needed for the rendering purpose. For example, for CreateElement instruction, the payload can contain the tag name and parent information, so the Host can use this information to create the element in the correct place in the scene.
         */
        payload: T = {} as T
    ) {
        super({
            name,
            payload,
            id: [name, payload, A_IdentityHelper.generateTimeId()]
        });
    }
}