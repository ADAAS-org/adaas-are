import { A_TYPES__Entity_Serialized, A_Entity, A_Scope } from '@adaas/a-concept';
import { AreNode } from '@adaas/are/node/AreNode.entity';
import { AreStoreWatchingEntity } from '@adaas/are/store/AreStore.types';

type AreInstructionNewProps<T extends any = Record<string, any>> = {
    /**
     * The deduplication ID that prevents duplicated instruction within the same node.
     *
     * For example to prevent duplicated AddAttribute instruction for the same attribute, we can use the attribute name as the deduplication ID, so if we have two AddAttribute instructions with the same attribute name, only the first one will be applied, and the second one will be ignored.
     *
     *
     * [!] Note; By default it uses action name and group if provided
     */
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
type AreInstructionSerialized<T extends any = Record<string, any>> = {
    /**
     * The name of the instruction, which corresponds to the operation that should be performed in the Host. This name is used to identify the specific method in the Host that should be called to execute the instruction, allowing for a clear mapping between instructions and their corresponding actions in the rendering process.
     */
    name: string;
    /**
     * The type of the instruction, which can be used to categorize instructions and determine how they should be processed. For example, we can have different types for declaration instructions (e.g., DeclarationInstruction or CreateElement) and mutation instructions (e.g., AddAttribute), allowing for better organization and management of instructions based on their purpose and behavior in the scene.
     */
    type: string;
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
} & A_TYPES__Entity_Serialized;

declare class AreInstruction<T extends Record<string, any> = Record<string, any>, S extends AreInstructionSerialized<T> = AreInstructionSerialized<T>> extends A_Entity<AreInstructionNewProps<T>, S> implements AreStoreWatchingEntity {
    /**
     * The name of the instruction, for example "CreateElement", "AddAttribute", "RemoveNode", etc. This is used to identify the type of the instruction and how to process it. The name should be in PascalCase format, and should be unique across all instruction types. It is recommended to use a prefix that indicates the category of the instruction, for example "CreateElement" for instructions that create new elements, "UpdateAttribute" for instructions that update attributes, etc.
     */
    protected _name: string;
    /**
     * The payload of the instruction, which can contain any additional information that may be needed for the rendering purpose. For example, for CreateElement instruction, the payload can contain the tag name and parent information, so the Host can use this information to create the element in the correct place in the scene. The payload is optional and can be an empty object if no additional information is needed.
     */
    protected _payload?: T;
    /**
     * Group is an optional property that can be used to group instructions together. For example a set of instructions that depend on create CreateElement instruction can be grouped together with the same group name, so if the CreateElement instruction is reverted, all the instructions in the same group will be reverted as well, and so on. This can be useful to manage complex changes that involve multiple instructions.
     *
     * [!] Note, the best option is to use ASEID of the Instruction as a group, so all instructions with the same ASEID will be treated as a single change, and will be applied and reverted together.
     */
    protected _group: string | undefined;
    /**
     * The parent instruction that created this instruction. For example, if we have a CreateElement instruction that creates a new element, and then we have an AddAttribute instruction that adds an attribute to that element, the AddAttribute instruction would have the CreateElement instruction as its parent. This can be used to track the hierarchy of instructions and their dependencies.
     */
    protected _parent: string | undefined;
    /**
     * A set of properties that influence the behavior of the instruction, for example, for AddTextInstruction, we can interpolation dependent on some key in the store, so we can have a property called "interpolationKey" that will be used to track the dependencies of the instruction, and when the value of this key changes in the scope, we can update the instruction accordingly.
     */
    protected _props: Set<string>;
    /**
     * The name of the instruction, for example "CreateElement", "AddAttribute", "RemoveNode", etc. This is used to identify the type of the instruction and how to process it. The name should be in PascalCase format, and should be unique across all instruction types. It is recommended to use a prefix that indicates the category of the instruction, for example "CreateElement" for instructions that create new elements, "UpdateAttribute" for instructions that update attributes, etc.
     */
    get name(): string;
    /**
     * The payload of the instruction, which can contain any additional information that may be needed for the rendering purpose. For example, for CreateElement instruction, the payload can contain the tag name and parent information, so the Host can use this information to create the element in the correct place in the scene. The payload is optional and can be an empty object if no additional information is needed.
     *
     * [!] Note, the payload should be serializable, so it can be stored and transmitted easily. It is recommended to use simple data structures for the payload, such as objects, arrays, strings, numbers, etc., and avoid using complex data types that may not be easily serializable.
     */
    get payload(): T;
    /**
     * Group is an optional property that can be used to group instructions together. For example a set of instructions that depend on create CreateElement instruction can be grouped together with the same group name, so if the CreateElement instruction is reverted, all the instructions in the same group will be reverted as well, and so on. This can be useful to manage complex changes that involve multiple instructions.
     *
     * [!] Note, the best option is to use ASEID of the Instruction as a group, so all instructions with the same ASEID will be treated as a single change, and will be applied and reverted together.
     */
    get group(): string | undefined;
    /**
     * The parent instruction ASEID that created this instruction. For example, if we have a CreateElement instruction that creates a new element, and then we have an AddAttribute instruction that adds an attribute to that element, the AddAttribute instruction would have the CreateElement instruction as its parent. This can be used to track the hierarchy of instructions and their dependencies.
     *
     * [!] Note, the parent should be provided as an ASEID string, so it can be easily referenced and tracked across different contexts and times.
     */
    get parent(): string | undefined;
    get id(): string;
    get owner(): AreNode;
    fromNew(newEntity: AreInstructionNewProps<T>): void;
    fromUndefined(): void;
    /**
     * Group this instruction with another instruction. This means that when one of the instructions in the group is applied or reverted, all the instructions in the same group will be applied or reverted together. This can be useful to manage complex changes that involve multiple instructions.
     *
     * For example, if we have a CreateElement instruction that creates a new element, and then we have an AddAttribute instruction that adds an attribute to that element, we can group them together with the same group name, so if we revert the CreateElement instruction, the AddAttribute instruction will be reverted as well, and so on.
     *
     * @param instruction
     * @returns
     */
    groupWith(instruction: AreInstruction): this;
    /**
     * Ungroup this instruction from any group. This means that this instruction will be treated as an independent instruction, and will not be applied or reverted together with any other instructions. This can be useful when you want to separate an instruction from a group, so it can be applied or reverted independently.
     *
     * @returns
     */
    unGroup(): this;
    /**
     * Attach this instruction to a parent instruction. This means that this instruction will be considered as a child of the parent instruction, and can be used to track the hierarchy of instructions and their dependencies.
     *
     * For example, if we have a CreateElement instruction that creates a new element, and then we have an AddAttribute instruction that adds an attribute to that element, we can attach the AddAttribute instruction to the CreateElement instruction as its parent, so we can track that the AddAttribute instruction is related to the CreateElement instruction.
     *
     * @param parent
     * @returns
     */
    attachTo(parent: AreInstruction): this;
    /**
     * Detach this instruction from its parent instruction. This means that this instruction will no longer be considered as a child of the parent instruction, and will not be related to it in any way. This can be useful when you want to separate an instruction from its parent, so it can be treated as an independent instruction.
     *
     * @returns
     */
    detach(): this;
    /**
     * Apply this instruction to the scene. This means that the changes represented by this instruction will be applied to the scene, and the Host will perform the necessary operations to reflect these changes in the rendered output.
     *
     * For example, if this instruction is a CreateElement instruction, when we apply it, the Host will create a new element in the scene according to the information provided in the payload of the instruction. If this instruction is an AddAttribute instruction, when we apply it, the Host will add the specified attribute to the target element in the scene. The apply method can also accept an optional scope parameter, which can be used to provide additional context or information that may be needed for applying the instruction.
     *
     * @param scope
     */
    apply(scope?: A_Scope): void;
    /**
     * Update this instruction in the scene. This means that the changes represented by this instruction will be updated in the scene, and the Host will perform the necessary operations to reflect these changes in the rendered output. This is particularly useful for instructions that have dynamic properties or effects that may change over time, allowing for adjustments to be made to the instruction's behavior or effects without needing to revert and reapply it entirely. The update method can also accept an optional scope parameter, which can be used to provide additional context or information that may be needed for updating the instruction.
     *
     * @param scope
     */
    update(scope?: A_Scope): void;
    /**
     * Revert this instruction from the scene. This means that the changes represented by this instruction will be reverted from the scene, and the Host will perform the necessary operations to undo these changes in the rendered output.
     *
     * @param scope
     */
    revert(scope?: A_Scope): void;
}

export { AreInstruction as A, type AreInstructionNewProps as a, type AreInstructionSerialized as b };
