import * as _adaas_a_concept from '@adaas/a-concept';
import { A_TYPES__Entity_Serialized, A_Entity, A_Scope, A_TYPES__Fragment_Serialized, A_Fragment, ASEID, A_TYPES__Paths, A_TYPES__Entity_Constructor } from '@adaas/a-concept';
import { A_SignalVector } from '@adaas/a-utils/a-signal';
import { AreEvent } from './lib/AreEvent/AreEvent.context.js';
import { AreStoreWatchingEntity, AreStorePathValue } from './lib/AreStore/AreStore.types.js';
import { AreSceneStatuses } from './lib/AreScene/AreScene.constants.js';
import { AreAttribute_Init, AreAttribute_Serialized } from './lib/AreAttribute/AreAttribute.types.js';
import { Are } from './lib/AreComponent/Are.component.js';
import { A_ExecutionContext } from '@adaas/a-utils/a-execution';
import { AreNodeStatuses, AreNodeFeatures } from './lib/AreNode/AreNode.constants.js';

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

type AreSceneChanges = {
    /**
     * An array of instructions that are planned to be applied to the scene. These instructions represent the changes that will be made to the scene when they
     */
    toApply: AreInstruction[];
    /**
     * An array of instructions that are planned to be reverted from the scene. These instructions represent the changes that will be undone from the scene when they are reverted, allowing for a rollback of changes if needed.
     */
    toRevert: AreInstruction[];
};
type AreScene_Serialized = {
    instructions: AreInstructionSerialized[];
} & A_TYPES__Fragment_Serialized;
type AreSceneStatusNames = typeof AreSceneStatuses[keyof typeof AreSceneStatuses];

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

declare class AreScene extends A_Fragment {
    protected _groupToInstructionsMap: Map<string, Set<AreInstruction>>;
    /**
     * Plan is a queue of changes that should be applied to render the node
     *
     * It works as FIFO, so the first instruction that should be applied is the first one in the queue, and so on.
     */
    protected _plan: Array<AreInstruction>;
    /**
     * State is a list of instructions that are currently applied to the node,
     * so it represents the current state of the node in the scene.
     *
     * It always in a reverse order of the plan, so the last instruction in the state is the first one that should be reverted when we need to revert the changes, and so on.
     *
     * For example, if we have a node with two instructions in the plan: [Instruction A, Instruction B], and both of them are applied to the node, then the state will be [Instruction B, Instruction A], so when we need to revert the changes, we will revert Instruction B first, and then Instruction A.
     */
    protected _state: Array<AreInstruction>;
    protected _host: AreDeclaration | undefined;
    /**
     * Scene status is used to determine the current lifecycle stage of the scene, which can be 'active', 'inactive' or 'destroyed'. This status can be used to control the behavior of the scene and its instructions, for example, we can prevent applying new instructions to an inactive or destroyed scene, or we can trigger certain actions when the scene becomes active or inactive. The default status of the scene is 'inactive', which means that the scene is not yet rendered and its instructions are not applied, and it will become 'active' when it is mounted and its instructions are applied, and it will become 'destroyed' when it is unmounted and its instructions are reverted.
     */
    protected _status: AreSceneStatusNames;
    constructor(
    /**
     * Scene identity will be used to identify mounting point in the parent scene
     */
    id: string | ASEID);
    /**
     * Scene ID that corresponds to the root node's ID (part of ASEID)
     */
    get id(): string;
    /**
     * The scope where scene is registered. This scope is owned by AreNode
     */
    get scope(): A_Scope;
    /**
     * The owner node of the scene, which is the node that registered the scene in its scope.
     * This is typically the node that is responsible for rendering the scene and managing its lifecycle.
     */
    get owner(): AreNode;
    /**
     * It's a primary declaration instruction that represents the node in the scene, so it should be registered as a host instruction for the scene, and it will be used to keep track of the node in the scene and to manage its lifecycle.
     */
    get host(): AreDeclaration | undefined;
    /**
     * Scene status is used to determine the current lifecycle stage of the scene, which can be 'active', 'inactive' or 'destroyed'. This status can be used to control the behavior of the scene and its instructions, for example, we can prevent applying new instructions to an inactive or destroyed scene, or we can trigger certain actions when the scene becomes active or inactive. The default status of the scene is 'inactive', which means that the scene is not yet rendered and its instructions are not applied, and it will become 'active' when it is mounted and its instructions are applied, and it will become 'destroyed' when it is unmounted and its instructions are reverted.
     */
    get status(): AreSceneStatusNames;
    get isActive(): boolean;
    get isInactive(): boolean;
    /**
     * Returns All declaration instructions are registered in the scene scope. Since declaration instructions are the main instructions that represent the structure of the node, we have a separate getter for them to easily access and manage them in the scene.
     */
    get declarations(): AreDeclaration[];
    /**
     * Returns All mutation instructions are registered in the scene scope. Mutation instructions are the instructions that represent the changes to be applied to the node, so we have a separate getter for them to easily access and manage them in the scene, especially when we want to apply or revert changes based on the mutations.
     */
    get mutations(): AreMutation[];
    /**
     * Returns All instructions are registered in the scene scope.
     */
    get instructions(): AreInstruction[];
    /**
     * Plan is a queue of changes that should be applied to render the node
     *
     * It works as FIFO, so the first instruction that should be applied is the first one in the queue, and so on.
     */
    get planned(): AreInstruction[];
    /**
     * State is a list of instructions that are currently applied to the node,
     * so it represents the current state of the node in the scene.
     *
     * It always in a reverse order of the plan, so the last instruction in the state is the first one that should be reverted when we need to revert the changes, and so on.
     *
     * For example, if we have a node with two instructions in the plan: [Instruction A, Instruction B], and both of them are applied to the node, then the state will be [Instruction B, Instruction A], so when we need to revert the changes, we will revert Instruction B first, and then Instruction A.
     */
    get applied(): AreInstruction[];
    /**
     * Should return instructions to be reverted and to be applied.
     * A difference between plan vs state is that plan is what should be applied to the scene,
     * while state is what currently applied to the scene.
     *
     */
    get changes(): AreSceneChanges;
    activate(): void;
    deactivate(): void;
    /**
     * Each scene has a primary declaration instruction that represents the node in the scene, so it should be registered as a host instruction for the scene, and it will be used to keep track of the node in the scene and to manage its lifecycle. This method allows to set the host instruction for the scene, but it will throw an error if we try to set another host instruction while there is already a host instruction set, so we can ensure that there is only one host instruction for the scene at any given time.
     *
     * @param instruction
     */
    setHost(instruction: AreDeclaration): void;
    /**
     * Unsets the current host instruction from the scene.
     *
     * This method should be used when we want to remove the primary declaration instruction that represents the node in the scene, for example, when we want to unmount the node or when we want to replace it with another node. Unsetting the host instruction will allow us to set a new host instruction for the scene if needed.
     */
    removeHost(): void;
    /**
     * Method that should register the instruction in the plan, so it will be rendered in the next render cycle.
     *
     * @param instruction
     */
    plan(instruction: AreInstruction): void;
    planBefore(instruction: AreInstruction, beforeInstruction: AreInstruction): void;
    planAfter(instruction: AreInstruction, afterInstruction: AreInstruction): void;
    moveBefore(instruction: AreInstruction, beforeInstruction: AreInstruction): void;
    moveAfter(instruction: AreInstruction, afterInstruction: AreInstruction): void;
    /**
     * Allows to remove instruction from the plan, so it will not be rendered anymore, but it will still be registered in the scene scope, so it can be planned again if needed.
     *
     * @param instruction
     */
    unPlan(instruction: AreInstruction): void;
    /**
     * Checks if the instruction is already in the plan, so it will be rendered in the next render cycle.
     *
     * @param instruction
     * @returns
     */
    getPlanned(instruction: AreInstruction): AreInstruction | undefined;
    /**
     * Checks if the instruction is already in the plan, so it will be rendered in the next render cycle.
     *
     * @param instruction
     * @returns
     */
    isInPlan(instruction: AreInstruction): boolean;
    /**
     * Method moves the instruction to state to keep it applied and to be able to revert it later if needed. The instruction should be already registered in the scene scope and planned to be applied, otherwise it will not be applied.
     *
     * @param instruction
     */
    apply(instruction: AreInstruction): void;
    /**
     * Method moves the instruction from state to unapply it and to be able to apply it later if needed. The instruction should be already registered in the scene scope and applied, otherwise it will not be unapplied.
     *
     * @param instruction
     */
    unApply(instruction: AreInstruction): void;
    /**
     * Checks if the instruction is already in the state, so it is currently applied to the scene.
     *
     * @param instruction
     * @returns
     */
    getApplied(instruction: AreInstruction): AreInstruction | undefined;
    /**
     * Checks if the instruction is already in the state, so it is currently applied to the scene.
     *
     * @param instruction
     * @returns
     */
    isApplied(instruction: AreInstruction): boolean;
    /**
     * Method that should reset the scene to the initial state, so it will clear the plan and state, but it will not deregister the instructions from the scene scope, so they will still be registered in the scene and can be planned and applied again if needed.
     *
     */
    reset(): void;
}

declare class AreAttribute extends A_Entity<AreAttribute_Init, AreAttribute_Serialized> {
    /**
     * Property name (e.g. "label")
     */
    name: string;
    /**
     * Full raw attribute (e.g. ' :label="buttonLabel" ')
     */
    raw: string;
    /**
     * Attribute content (e.g. "buttonLabel")
     * Example: For a directive like `v-if="condition"`, the raw value is "condition", but the content would be "condition" without the quotes, and the value would be the result of evaluating "condition" in the current scope.
     */
    content: string;
    /**
     * The evaluated value of the attribute, which can be different from the raw value depending on the context and type of the attribute. For example, for a directive like `v-if="condition"`, the raw value is "condition", but the evaluated value would be the result of evaluating "condition" in the current scope.
     */
    value: any;
    /**
     * The prefix of the attribute, for example for ':label' it would be ':', for 'v-if' it would be 'v-'. This can be used to determine the type of the attribute and how to process it.
     */
    prefix: string;
    /**
     * The scope where the attribute is defined, which can be used to access other entities and features within the same scope. This is particularly useful for attributes that need to interact with other parts of the scene or component, as it allows them to access shared data and functionality without needing to pass it explicitly through parameters.
     */
    get scope(): A_Scope<any, _adaas_a_concept.A_TYPES__Component_Constructor<_adaas_a_concept.A_Component>[], _adaas_a_concept.A_TYPES__Error_Constructor<_adaas_a_concept.A_Error<_adaas_a_concept.A_TYPES__Error_Init, _adaas_a_concept.A_TYPES__Error_Serialized>>[], _adaas_a_concept.A_TYPES__Entity_Constructor<A_Entity<any, _adaas_a_concept.A_TYPES__Entity_Serialized>>[], _adaas_a_concept.A_Fragment<_adaas_a_concept.A_TYPES__Fragment_Serialized>[]>;
    /**
     * The owner node of the attribute, which is the node that the attribute is attached to. This can be used to access the properties and features of the owner node, as well as to determine the context in which the attribute is being used. For example, if the attribute is attached to a button element, the owner would be that button node, and the attribute could use this information to modify the button's behavior or appearance based on its content and context.
     */
    get owner(): AreNode;
    /**
     * Initializes the attribute based on the provided properties. This method is called when a new attribute is created and should set up the attribute's state based on the provided properties. It can also be used to generate a unique ASEID for the attribute based on its name and content, which can be used for caching and identification purposes within the ARE framework.
     *
     * @param newEntity
     */
    fromNew(newEntity: AreAttribute_Init): void;
    /**
     * Creates a clone of the current attribute instance. This method can be used to create a new instance of the attribute with the same properties and state as the original, which can be useful in scenarios where you want to reuse an attribute's configuration or create variations of it without modifying the original instance.
     *
     * @returns
     */
    clone(): this;
    /**
     * Initializes the attribute. This method is called when the attribute is first created and should set up any necessary state or perform any initial processing based on the provided content and context. It can also be used to validate the attribute's content and throw errors if it is invalid.
     *
     * @param scope
     */
    init(scope?: A_Scope): void;
    /**
     * Generates all rendering instructions for the attribute. This method is called during the compilation phase of the ARE component and should return an array of instructions that describe how to render the attribute based on its content and context. The instructions can include details such as which DOM properties to set, which events to listen for, and how to update the attribute when the underlying data changes.
     *
     * @param scope
     */
    transform(scope?: A_Scope): void;
    /**
     * Compiles the attribute. This method should transform attribute details into a set of SceneInstructions. It may also modify attribute value, since this field is editable during runtime.
     *
     * @param scope
     */
    compile(scope?: A_Scope): void;
    /**
     * Updates the attribute based on changes in the store or other dependencies. This method is called during the update phase of the ARE component and should perform any necessary updates to the attribute based on changes in the underlying data or context. This can include tasks such as updating DOM properties, re-evaluating expressions, or modifying event listeners to ensure that the attribute remains in sync with the current state of the application.
     *
     * @param scope
     */
    update(scope?: A_Scope): void;
    /**
     * Validates the attribute's content and context. This method is called during the validation phase of the ARE component and should check whether the attribute's content is valid based on its expected format, type, or other constraints. If the content is invalid, this method should throw an error with a descriptive message to help developers identify and fix the issue.
     *
     * @param scope
     */
    validate(scope?: A_Scope): void;
}

declare class AreStore<T extends Record<string, any> = Record<string, any>> extends A_ExecutionContext<T> {
    protected dependencies: Map<string, Set<AreStoreWatchingEntity>>;
    protected _keys: Set<keyof T>;
    /**
     * Allows to define a pure function that will be executed in the context of the store, so it can access the store's data and methods, but it won't have access to the component's scope or other features. This can be useful for example for defining a function that will update the store's data based on some logic, without having access to the component's scope or other features, so we can keep the store's logic separate from the component's logic.
     */
    static get Function(): <T extends Are>(target: T, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
    get owner(): AreNode;
    get parent(): AreStore | undefined;
    get context(): AreContext;
    constructor(aseid: ASEID | string);
    get watchers(): Set<AreStoreWatchingEntity>;
    get keys(): Set<keyof T>;
    watch(instruction: AreStoreWatchingEntity): void;
    unwatch(instruction: AreStoreWatchingEntity): void;
    set<K extends keyof T>(values: Partial<T>): this;
    set<P extends A_TYPES__Paths<T>>(key: P, value: AreStorePathValue<T, P>): this;
    get<K extends keyof T>(key: K): T[K] | undefined;
    protected setAsObject(values: Partial<T>): this;
    protected setAsKeyValue<K extends keyof T, P extends A_TYPES__Paths<T>>(key: K | P, value: T[K] | AreStorePathValue<T, P>): this;
    /**
     * Notifies instructions — immediately or deferred if inside a batch.
     */
    private notify;
    /**
     * Removes an instruction from all dependency sets.
     * Called when an instruction is reverted/destroyed.
     */
    unregister(instruction: AreStoreWatchingEntity): void;
    /**
     * Normalizes a path once — reused in both get and set.
     */
    private normalizePath;
    /**
     * Extracts direct children of the current markup level into typed instances.
     * No tree walking, recursion, or nested parsing — just direct children.
     */
    extractPathSegments(path: string): string[];
    /**
     * Method allows to initialize all extensions defined in the component with @AreStore.Function decorator, so we can use them in the store's context. This method should be called in the component's constructor after super() call, so the store will have access to the component's instance and its properties.
     *
     * @param component
     */
    loadExtensions(component: Are): void;
}

interface AreSyntaxTokenRules<T extends AreNode = AreNode> {
    /** Opening delimiter e.g. '<', '{{', '<!--', '{' */
    opening?: string;
    /** Closing delimiter e.g. '>', '}}', '-->', '}' */
    closing?: string;
    /** Optional self-closing marker e.g. '/>' */
    selfClosing?: string;
    /** Regex that must match content immediately before the opening delimiter */
    prefix?: RegExp;
    /** Replaces open/close entirely — matches entire pattern via RegExp */
    pattern?: RegExp;
    /**
     * Fully custom matcher — complete control over how a token is found.
     * Receives (source, from, to, build) where build(raw, content, position, closing)
     * constructs the AreSyntaxTokenMatch. Return null if no match found.
     */
    matcher?: (source: string, from: number, to: number, build: (raw: string, content: string, position: number, closing: string) => AreSyntaxTokenMatch) => AreSyntaxTokenMatch | null;
    /** Constructor to instantiate when this rule matches */
    component: A_TYPES__Entity_Constructor<T>;
    /** Higher = checked first. Default: 0 */
    priority?: number;
    /** Whether this token can contain nested tokens of same open/close. Default: true */
    nested?: boolean;
    /** Custom data extractor — called after match, result stored in match.meta */
    extract?: (raw: string, match: AreSyntaxTokenMatch) => Record<string, any>;
}
type AreSyntaxTokenPayload = {
    /**
     * Allows to override ASEID generation for this token match. Useful when the token corresponds to an existing entity or needs a stable ID across parses. If not provided, ASEID will be generated based on position and content.
     */
    id?: string;
    /**
     * Allows to override the entity type for this token match. Useful when the token corresponds to an existing entity or needs a specific entity type across parses. If not provided, the entity type will be inferred from the token.
     */
    entity?: string;
    /**
     * Allows to override the scope for this token match. Useful when the token corresponds to an existing entity or needs a specific scope across parses. If not provided, the scope will be generated based on position and content.
     */
    scope?: string;
    [key: string]: any;
};
interface AreSyntaxTokenMatch {
    /** Full matched string including delimiters */
    raw: string;
    /** Content between delimiters */
    content: string;
    /** The opening delimiter that matched */
    opening: string;
    /** The closing delimiter that matched */
    closing: string;
    /** Start position in source string */
    position: number;
    /** Data extracted via rule.extract */
    payload: AreSyntaxTokenPayload;
    /** @internal – the rule that produced this match (used by instantiate) */
    _rule?: AreSyntaxTokenRules;
}
interface AreSyntaxInitOptions {
    /**
     * Array of token rules defining the syntax to be parsed. Each rule specifies how to identify and process a particular type of token (e.g. interpolation, directive, comment) within templates. The rules are checked in order of priority, allowing for flexible and customizable parsing behavior.
     */
    rules: AreSyntaxTokenRules[];
    /**
     * Whether to trim leading/trailing whitespace from token content. Default: true. When enabled, any whitespace at the start or end of the content captured by a token will be removed before further processing. This can help prevent issues with unintended spaces affecting rendering or logic, especially in cases like interpolations or directives where extra whitespace may be common.
     */
    trimWhitespace?: boolean;
    /** Throw on unclosed tokens. Default: true */
    strictMode?: boolean;
}
type AreSyntaxCompiledExpression = {
    execute: (store: AreStore, scope?: Record<string, any>) => any;
    isCallable: boolean;
};

type AreNodeNewProps = AreSyntaxTokenMatch;
type AreNodeFeatureNames = typeof AreNodeFeatures[keyof typeof AreNodeFeatures];
type AreNodeStatusNames = typeof AreNodeStatuses[keyof typeof AreNodeStatuses];

declare class AreNode extends A_Entity<AreNodeNewProps> {
    /**
     * The current status of the node, which can be used to track the lifecycle and rendering state of the node within the scene.
     */
    status: AreNodeStatusNames;
    /**
     * The opening string that defines the start of a node in the source. This is typically used for parsing and tokenizing the source to identify the structure and content of the node. The opening string can include the tag name, attributes, and other syntax that indicates the beginning of a node.
     */
    protected _opening: string;
    /**
     * The closing string that defines the end of a node in the source. This is typically used for parsing and tokenizing the source to identify the structure and content of the node. The closing string can include the tag name, attributes, and other syntax that indicates the end of a node.
     */
    protected _closing: string;
    /**
     * The position of the node in the source string, which can be used for error reporting, debugging, and other purposes related to tracking the location of the node within the original source. The position is a character index identifying where the node is defined.
     */
    protected _position: number;
    /**
     * The payload associated with the node, which can include any additional data or metadata that is extracted during the tokenization process. The payload can be used to store custom information related to the node, such as directive arguments, binding expressions, or any other relevant data that may be needed for processing and rendering the node within the scene.
     */
    protected _payload?: AreSyntaxTokenPayload;
    /**
     * Content string defined for the node — the inner content between delimiters.
     * Example: `{{name}}`
     */
    protected _content: string;
    /**
     * Markup string defined for the node
     * Example: `<custom-component :prop="value"> <div>Inner Content</div> </custom-component>`
     */
    protected _markup: string;
    /**
     * The scope associated with this node
     * uses to store all nested fragments and entities like other AreNodes and Scene
     */
    protected _scope: A_Scope;
    /**
     * Actual node identifier.
     */
    get id(): string;
    /**
     * Actual node type.
     * By default it's a tag name
     */
    get type(): string;
    /**
     * Content string defined for the node — the inner content between delimiters.
     * Example: `{{name}}`
     */
    get content(): string;
    /**
     * Markup string defined for the node
     * Example: `<custom-component :prop="value"> <div>Inner Content</div> </custom-component>`
     */
    get markup(): string;
    /**
     * The scope associated with this node
     * uses to store all nested fragments and entities like other AreNodes and Scene
     */
    get scope(): A_Scope;
    /**
     * The attributes defined for the node, which can include static attributes, binding attributes, directive attributes, and event attributes. These attributes are extracted during tokenization and processed during the compilation phase to generate the corresponding SceneInstructions for rendering and updating the node in the scene.
     */
    get attributes(): AreAttribute[];
    /**
     * A custom component associated with this node, which can be used to provide custom logic and behavior for the node. This component is typically defined in the context and can be resolved based on the node's type or other identifying information. The component can include its own content, markup, styles, and features that are specific to the functionality it provides.
     *
     * Example: If the node type is "custom-component", the corresponding component would be resolved from the context and can be used to provide custom rendering and behavior for nodes of that type.
     *
     * [!] Note: The component is optional and may not be defined for all nodes. If no component is associated with the node, it will be treated as a standard HTML element or a basic node without custom logic.
     */
    get component(): Are | undefined;
    /**
     * The parent node of this node, which is the node that registered the current node in its scope. This is typically the node that is responsible for rendering the current node and managing its lifecycle within the scene. The parent node can be used to access shared context, propagate events, and manage interactions between nodes in a hierarchical structure.
     *
     * Example: For a node defined as `<div><span>Child Node</span></div>`, the parent node of the `<span>` element would be the `<div>` element, which is responsible for rendering the `<span>` and managing its lifecycle within the scene.
     */
    get parent(): AreNode | undefined;
    /**
     * The child nodes of this node, which are typically defined in the markup and registered in the scope as child entities. These child nodes can represent nested elements or components within the node and can have their own content, markup, styles, and features. The child nodes are managed within the scope of the parent node and can be accessed and manipulated as needed for rendering, updating, and lifecycle management.
     *
     * Example: For a node defined as `<div><span>Child Node</span></div>`, the child node would be the `<span>` element, which is registered as a child entity in the scope of the parent `<div>` node.
     */
    get children(): (AreNode)[];
    /**
     * It returns the scene where the node exists, so it should be the scene of the rootNode,
     * primary parent of this node.
     */
    get scene(): AreScene;
    protected _scene: AreScene;
    fromNew(newEntity: AreNodeNewProps): void;
    fromASEID(aseid: string | ASEID): void;
    /**
     * Sets the content string for the node — the inner text/markup between the node's
     * opening and closing delimiters. Content is processed by the rendering engine to
     * generate the corresponding SceneInstructions for rendering the node.
     *
     * @param content
     */
    setContent(content: string): void;
    /**
     * Sets the markup string for the node, which is the full raw matched string including delimiters. The markup can include HTML-like syntax, custom components, directives, and other features that are processed by the rendering engine to generate the corresponding SceneInstructions for rendering the node.
     *
     * @param markup
     */
    setMarkup(markup: string): void;
    /**
     * Adds a child node to the current node's scope and ensures the child inherits from this node's scope.
     *
     * @param child - The node to add as a child
     */
    addChild(child: AreNode): void;
    /**
     * Removes a child node from the current node's scope. This is typically used when a child node is no longer needed or should be detached from the parent node. The method ensures that the child node is properly deregistered from the scope and any associated resources are cleaned up as necessary.
     *
     * @param node  - The child node to be removed from the current node's scope
     */
    removeChild(node: AreNode): void;
    /**
     * Executes initialization logic for the node, which typically involves setting up the node's scope, registering any necessary entities, and preparing the node for rendering and interaction within the scene. This method is called during the initial phase of the node's lifecycle and is responsible for ensuring that the node is properly initialized before it is compiled and rendered in the scene.
     */
    init(): void;
    /**
     * Loads the node, which typically involves executing any necessary setup or initialization logic to prepare the node for rendering and interaction within the scene. This may include processing the node's content, markup, styles, and features to generate the corresponding SceneInstructions, as well as setting up any event listeners or reactive properties as needed.
     */
    load(): Promise<any>;
    /**
     * Tokenizes the node content, which typically involves parsing the raw content string to identify the structure, child nodes, attributes, directives, and other features. This process is essential for breaking down the content into its constituent parts and preparing it for further processing during the compilation phase. The tokenization process can involve creating child nodes, extracting attributes and their values, and identifying any directives or bindings that need to be processed during rendering.
     */
    tokenize(): void;
    /**
     * Transforms the node, which typically involves executing any necessary logic to reshape the node's structure or content before it is compiled and rendered in the scene. This may include applying any transformations defined by directives, processing any dynamic content or expressions, and performing any other necessary tasks to ensure that the node is properly prepared for compilation and rendering based on its content, markup, styles, and features.
     */
    transform(): void;
    /**
     * Compile the node. This method should transform the node's content, markup, and styles into a set of SceneInstructions that can be executed to render the node in the scene. The compile method is responsible for processing the node's features, attributes, directives, and other properties to generate the necessary instructions for rendering and updating the node in response to changes in state or context.
     *
     * [!] Note: The compile method should ensure that the node's scope is properly inherited from the context scope before processing, and it should handle any errors that may occur during compilation to ensure that the node can be rendered correctly in the scene.
     */
    compile(): void;
    /**
     * Mounts the node, which typically involves executing any necessary logic to render the node in the scene and to set up any interactions or behaviors associated with the node. This may include applying the generated SceneInstructions from the compile phase, attaching event listeners, and performing any other necessary tasks to ensure that the node is properly rendered and functional within the scene.
     *
     * [!] Note: The mount method should ensure that the node's scope is properly inherited from the context scope before performing any mounting logic, and it should handle any errors that may occur during mounting to ensure that the node can be rendered correctly in the scene.
     */
    mount(): void;
    /**
     * Interprets the node, which typically involves executing any necessary logic to process the node's features, attributes, directives, and other properties to generate the corresponding SceneInstructions for rendering and updating the node in response to changes in state or context. This method is responsible for ensuring that the node is properly interpreted based on its content, markup, styles, and features to enable dynamic behavior and responsiveness within the scene.
     *
     * [!] Note: The interpret method should NOT go though own child, since it may be used by both mount and update operations!
     */
    interpret(): void;
    /**
     * Updates the node, which typically involves executing any necessary logic to update the node's rendering and behavior in response to changes in state, context, or other factors. This may include reapplying SceneInstructions, updating event listeners, and performing any other necessary tasks to ensure that the node remains functional and correctly rendered within the scene as changes occur.
     *
     * [!] Note: The update method should ensure that the node's scope is properly inherited from the context scope before performing any update logic, and it should handle any errors that may occur during updating to ensure that the node can be updated correctly in the scene.
     */
    update(): void;
    /**
     * Unmounts the node, which typically involves executing any necessary logic to remove the node from the scene and to clean up any resources associated with the node. This may include reverting any applied SceneInstructions, detaching event listeners, and performing any other necessary tasks to ensure that the node is properly removed from the scene and that resources are released as needed.
     *
     * [!] Note: The unmount method should ensure that the node's scope is properly inherited from the context scope before performing any unmounting logic, and it should handle any errors that may occur during unmounting to ensure that the node can be removed correctly from the scene.
     */
    unmount(): void;
    cloneWithScope<T extends AreNode = AreNode>(this: T): T;
    reset(): void;
    clone<T extends AreNode = AreNode>(this: T): T;
    /**
     * Emits an event or a scope to the node, which can be used to trigger event handlers or to provide additional context for processing within the node. The method can accept either an AreEvent instance or an A_Scope instance, and it will handle the emission accordingly. This allows for flexible communication and interaction within the node's context, enabling dynamic behavior and responsiveness based on events or changes in scope.
     *
     * @param scope - The scope or event to be emitted to the node
     */
    emit(scope: A_Scope): any;
    emit(event: AreEvent): any;
    /**
     * Destroys the node, which typically involves executing any necessary cleanup logic to remove the node from the scene and to free up any resources associated with the node. This may include deregistering the node from its scope, removing any event listeners or reactive properties, and performing any other necessary cleanup tasks to ensure that the node is properly removed from the scene and that resources are released as needed.
     *
     * [!] Note: The destroy method should ensure that the node's scope is properly inherited from the context scope before performing any cleanup, and it should handle any errors that may occur during destruction to ensure that resources are released correctly.
     */
    destroy(): Promise<any>;
    /**
     * Method to ensure that the current scope is inherited from the context scope
     *
     * @throws A_Error if the scope is not inherited from the context scope
     */
    protected checkScopeInheritance(): void;
}

declare class AreContext extends A_ExecutionContext {
    /**
     * The source string represents the original template or input from which the ARE scene is generated. This can be used for debugging, error reporting, or any features that require access to the raw template data. The roots array holds references to the root nodes of the ARE scene, allowing for easy access and management of the top-level components in the rendering hierarchy. The signalsMap is a mapping between root nodes and their associated signal vectors, enabling efficient management of reactive updates and interactions within the ARE framework based on changes in the application state or user input.
     */
    protected _source: string;
    /**
     * The roots array holds references to the root nodes of the ARE scene, allowing for easy access and management of the top-level components in the rendering hierarchy. The signalsMap is a mapping between root nodes and their associated signal vectors, enabling efficient management of reactive updates and interactions within the ARE framework based on changes in the application state or user input.
     */
    protected _roots: Array<AreNode>;
    /**
     * This property stores a map between root node and conditions that should be met to render particular component inside the root node. This can be used to manage complex rendering logic and to optimize performance by ensuring that components are only rendered when necessary based on the defined conditions.
     */
    protected _signalsMap: Map<string, A_SignalVector>;
    protected _performance: Map<string, number>;
    protected _performanceStart: Map<string, number>;
    protected _performanceDepth: Map<string, number>;
    /**
     * The global object can be used to store any global data or configurations that need to be accessed across different components and entities within the ARE framework. This can include things like theme settings, user preferences, or any other shared data that is relevant to the entire scene or application. By centralizing this information in the context, it allows for easier management and access to global state without needing to pass it through multiple layers of components or entities.
     */
    get globals(): any;
    constructor(
    /**
     * The source string represents the original template or input from which the ARE scene is generated. This can be used for debugging, error reporting, or any features that require access to the raw template data. The roots array holds references to the root nodes of the ARE scene, allowing for easy access and management of the top-level components in the rendering hierarchy. The signalsMap is a mapping between root nodes and their associated signal vectors, enabling efficient management of reactive updates and interactions within the ARE framework based on changes in the application state or user input.
     */
    source?: string);
    /**
     * The scope of the context, which can be used to access other entities and features within the same scope. This is particularly useful for components that need to interact with other parts of the scene or component, as it allows them to access shared data and functionality without needing to pass it explicitly through parameters.
     */
    get scope(): _adaas_a_concept.A_Scope<any, _adaas_a_concept.A_TYPES__Component_Constructor<_adaas_a_concept.A_Component>[], _adaas_a_concept.A_TYPES__Error_Constructor<_adaas_a_concept.A_Error<_adaas_a_concept.A_TYPES__Error_Init, _adaas_a_concept.A_TYPES__Error_Serialized>>[], _adaas_a_concept.A_TYPES__Entity_Constructor<_adaas_a_concept.A_Entity<any, _adaas_a_concept.A_TYPES__Entity_Serialized>>[], A_Fragment<_adaas_a_concept.A_TYPES__Fragment_Serialized>[]>;
    /**
     * The roots array holds references to the root nodes of the ARE scene, allowing for easy access and management of the top-level components in the rendering hierarchy. The signalsMap is a mapping between root nodes and their associated signal vectors, enabling efficient management of reactive updates and interactions within the ARE framework based on changes in the application state or user input.
     */
    get roots(): Array<AreNode>;
    /**
     * This property stores a map between root node and conditions that should be met to render particular component inside the root node. This can be used to manage complex rendering logic and to optimize performance by ensuring that components are only rendered when necessary based on the defined conditions.
     */
    get source(): string;
    get performance(): Array<string>;
    get stats(): string[];
    protected countInstructions(node: AreNode): number;
    protected countNodes(node: AreNode): number;
    /**
     * This property stores a map between root node and conditions that should be met to render particular component inside the root node. This can be used to manage complex rendering logic and to optimize performance by ensuring that components are only rendered when necessary based on the defined conditions.
     *
     * @param node
     */
    addRoot(node: AreNode): void;
    /**
     * This property stores a map between root node and conditions that should be met to render particular component inside the root node. This can be used to manage complex rendering logic and to optimize performance by ensuring that components are only rendered when necessary based on the defined conditions.
     *
     * @param node
     */
    removeRoot(node: AreNode): void;
    startPerformance(label?: string): void;
    endPerformance(label: string): void;
}

export { AreAttribute as A, AreContext as a, AreDeclaration as b, AreInstruction as c, type AreInstructionNewProps as d, type AreInstructionSerialized as e, AreMutation as f, AreNode as g, type AreNodeFeatureNames as h, type AreNodeNewProps as i, type AreNodeStatusNames as j, AreScene as k, type AreSceneChanges as l, type AreSceneStatusNames as m, type AreScene_Serialized as n, AreStore as o, type AreSyntaxCompiledExpression as p, type AreSyntaxInitOptions as q, type AreSyntaxTokenMatch as r, type AreSyntaxTokenPayload as s, type AreSyntaxTokenRules as t };
