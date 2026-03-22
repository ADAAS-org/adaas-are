import { AreSceneInstruction } from "../AreSceneInstruction.entity";
import { AreDeclarationInstruction } from "./AreDeclaration.instruction";



export class AreMutationInstruction<T extends Record<string, any> = {}> extends AreSceneInstruction<T> {


    get group(): string {
        return this._group!;
    }

    constructor(
        /**
         * The name of the operation to be performed in Host.
         */
        name: string,
        /**
         * Parent instruction for grouping in case of mutations related to a specific declaration. This allows for better organization and management of instructions in the scene, as all mutations related to the same declaration will be executed together.
         */
        parent: AreDeclarationInstruction,
        /**
         * A set of additional parameters that may be needed for the rendering purpose. For example, for AddAttribute instruction, the payload can contain the attribute name and value as a payload, so the Host can use this information to add the attribute to the node.
         */
        payload: T = {} as T,
    ) {
        super({
            name: name,
            group: parent.group,
            payload,
            id: [name, payload, parent.group]
        });
    }
}