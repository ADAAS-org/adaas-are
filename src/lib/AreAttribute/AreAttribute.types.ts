import { A_TYPES__Entity_Serialized } from "@adaas/a-concept";
import { AreAttributeFeatures } from "./AreAttribute.constants";


export type AreAttribute_Init = {
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

}


export type AreAttribute_Serialized = {
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

} & A_TYPES__Entity_Serialized



export type AreAttributeFeatureNames = keyof typeof AreAttributeFeatures;