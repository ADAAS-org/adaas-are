import * as _adaas_a_concept from '@adaas/a-concept';
import { A_Entity, A_Scope } from '@adaas/a-concept';
import { AreNode } from '@adaas/are/node/AreNode.entity';
import { AreAttribute_Init, AreAttribute_Serialized } from './AreAttribute.types.js';
import './AreAttribute.constants.js';

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

export { AreAttribute };
