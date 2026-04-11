import { A_TYPES__Entity_Serialized } from "@adaas/a-concept";
import { AreInstruction } from "./AreInstruction.entity";
import { AreNode } from "@adaas/are/node/AreNode.entity";

export type AreInstructionNewProps<T extends any = Record<string, any>> = {
    /**
     * The deduplication ID that prevents duplicated instruction within the same node. 
     * 
     * For example to prevent duplicated AddAttribute instruction for the same attribute, we can use the attribute name as the deduplication ID, so if we have two AddAttribute instructions with the same attribute name, only the first one will be applied, and the second one will be ignored.
     * 
     * 
     * [!] Note; By default it uses action name and group if provided
     */
    // id?: Array<any>;
    /**
     * the Host operation to be performed. Exactly this name will be used to call a method from the Host class. 
     */
    name: string;
    /**
     * The parent instruction that created this instruction. For example, if we have a CreateElement instruction that creates a new element, and then we have an AddAttribute instruction that adds an attribute to that element, the AddAttribute instruction would have the CreateElement instruction as its parent. This can be used to track the hierarchy of instructions and their dependencies.
     */
    parent?: AreInstruction | undefined;
    /**
     * Group is an optional property that can be used to group instructions together.
     * 
     * For example a set of instructions that depend on create CreateElement instruction can be grouped together with the same group name, so if the CreateElement instruction is reverted, all the instructions in the same group will be reverted as well, and so on.
     * 
     * This can be useful to manage complex changes that involve multiple instructions.
     * 
     * [!] Note, the best option is to use ASEID of the Instruction as a group, so all instructions with the same ASEID will be treated as a single change, and will be applied and reverted together.
     */
    group?: AreInstruction | undefined;
    /**
     * A set of additional parameters that may be needed for the rendering purpose. 
     * 
     * For example: for AddAttribute instruction, we may need to provide the attribute name and value as a payload, so the Host can use this information to add the attribute to the node.
     */
    payload?: T;
};


export type AreInstructionSerialized<T extends any = Record<string, any>> = {
    /**
     * The name of the instruction, which corresponds to the operation that should be performed in the Host. This name is used to identify the specific method in the Host that should be called to execute the instruction, allowing for a clear mapping between instructions and their corresponding actions in the rendering process.
     */
    name: string;
    /**
     * The type of the instruction, which can be used to categorize instructions and determine how they should be processed. For example, we can have different types for declaration instructions (e.g., DeclarationInstruction or CreateElement) and mutation instructions (e.g., AddAttribute), allowing for better organization and management of instructions based on their purpose and behavior in the scene.
     */
    type: string
    /**
     * The parent instruction that created this instruction. For example, if we have a CreateElement instruction that creates a new element, and then we have an AddAttribute instruction that adds an attribute to that element, the AddAttribute instruction would have the CreateElement instruction as its parent. This can be used to track the hierarchy of instructions and their dependencies.
     */
    parent?: string | undefined;
    /**
     * Group is an optional property that can be used to group instructions together. For example a set of instructions that depend on create CreateElement instruction can be grouped together with the same group name, so if the CreateElement instruction is reverted, all the instructions in the same group will be reverted as well, and so on. This can be useful to manage complex changes that involve multiple instructions. The best option is to use ASEID of the Instruction as a group, so all instructions with the same ASEID will be treated as a single change, and will be applied and reverted together.
     */
    group?: string | undefined;
    /**
     * A set of additional parameters that may be needed for the rendering purpose. For example: for AddAttribute instruction, we may need to provide the attribute name and value as a payload, so the Host can use this information to add the attribute to the node.
     */
    payload: T;
} & A_TYPES__Entity_Serialized
