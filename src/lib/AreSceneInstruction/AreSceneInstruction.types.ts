import { AreNode } from "../AreNode";
import { AreSceneInstructionsStatuses } from "./AreSceneInstruction.constants";

export type AreSceneInstructionNewProps<T extends any = Record<string, any>> = {
    /**
     * The deduplication ID that prevents duplicated instruction within the same node. 
     * 
     * For example to prevent duplicated AddAttribute instruction for the same attribute, we can use the attribute name as the deduplication ID, so if we have two AddAttribute instructions with the same attribute name, only the first one will be applied, and the second one will be ignored.
     * 
     * 
     * [!] Note; By default it uses action name and group if provided
     */
    id?: Array<any>;
    /**
     * Group is an optional property that can be used to group instructions together.
     * 
     * For example a set of instructions that depend on create CreateElement instruction can be grouped together with the same group name, so if the CreateElement instruction is reverted, all the instructions in the same group will be reverted as well, and so on.
     * 
     * This can be useful to manage complex changes that involve multiple instructions.
     * 
     * [!] Note, the best option is to use ASEID of the Instruction as a group, so all instructions with the same ASEID will be treated as a single change, and will be applied and reverted together.
     */
    group?: string;
    /**
     * the Host operation to be performed. Exactly this name will be used to call a method from the Host class. 
     */
    name: string;
    /**
     * A set of additional parameters that may be needed for the rendering purpose. 
     * 
     * For example: for AddAttribute instruction, we may need to provide the attribute name and value as a payload, so the Host can use this information to add the attribute to the node.
     */
    payload?: T;
};


export type AreSceneInstructionsStatusNames = typeof AreSceneInstructionsStatuses[keyof typeof AreSceneInstructionsStatuses];