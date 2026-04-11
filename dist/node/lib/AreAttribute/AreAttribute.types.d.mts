import { A_TYPES__Entity_Serialized } from '@adaas/a-concept';
import { AreAttributeFeatures } from './AreAttribute.constants.mjs';

/**
 * This file defines the types for the AreAttribute entity, which represents an attribute of a node in the ARE (Adaptive Rendering Engine) framework. The AreAttribute entity is responsible for managing the details of an attribute, such as its name, raw content, and value, as well as providing methods for initializing, transforming, compiling, updating, and validating the attribute based on its content and context. The types defined in this file include the initialization properties for creating a new AreAttribute instance, the serialized format for storing or transmitting an AreAttribute instance, and the names of the features that can be implemented by the AreAttribute entity.
 */
type AreAttribute_Init = {
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
     */
    content: string;
    /**
     * The prefix of the attribute, for example for ':label' it would be ':', for 'v-if' it would be 'v-'. This can be used to determine the type of the attribute and how to process it.
     */
    prefix: string;
};
/**
 * The evaluated value of the attribute, which can be different from the raw value depending on the context and type of the attribute. For example, for a directive like `v-if="condition"`, the raw value is "condition", but the evaluated value would be the result of evaluating "condition" in the current scope.
 */
type AreAttribute_Serialized = {
    /**
     * Property name (e.g. "label")
     */
    name: string;
    /**
     * Full raw attribute (e.g. ' :label="buttonLabel" ')
     */
    raw: string;
    /**
     * Attribute value (e.g. "buttonLabel")
     */
    value: string;
} & A_TYPES__Entity_Serialized;
/**
 * The names of the features that can be implemented by the AreAttribute entity. These features correspond to specific methods that can be defined on the AreAttribute class to provide custom behavior for initializing, transforming, compiling, updating, and validating the attribute based on its content and context. Each feature name is associated with a specific method that should be implemented to handle the corresponding aspect of the attribute's lifecycle and behavior within the ARE framework.
 */
type AreAttributeFeatureNames = typeof AreAttributeFeatures[keyof typeof AreAttributeFeatures];

export type { AreAttributeFeatureNames, AreAttribute_Init, AreAttribute_Serialized };
