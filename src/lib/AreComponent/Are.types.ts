import { A_SignalVector } from "@adaas/a-utils/a-signal";
import { AreFeatures } from "./Are.constants";


export type AreContextInit = {
    /**
     * The base template to be used for rendering and compilation.
     */
    source?: string;
    /**
     * Conditions Mapping between roots and signals associated with components rendered inside the roots. This can be used to manage complex rendering logic and to optimize performance by ensuring that components are only rendered when necessary based on the defined conditions.
     */
    map: { [rootName: string]: A_SignalVector };
}

export type ArePropDefinition = {
    /**
     * The type of the property, which can be used for validation and parsing purposes. This can include basic types like 'string', 'number', 'boolean', as well as more complex types like 'object' or 'array'.
     */
    type: string;
    /**
     * The default value of the property, which will be used if the property is not provided during the component's usage. This can help ensure that the component has a consistent behavior even when certain props are omitted.
     */
    default: any;
}

/**
 * The names of the features that can be implemented by the AreComponent entity. These features correspond to specific methods that can be defined on the AreComponent class to provide custom behavior for handling signals, defining the component's template, styles, data, and other aspects of its functionality within the ARE framework. Each feature name is associated with a specific method that should be implemented to handle the corresponding aspect of the component's behavior and lifecycle within the ARE framework.
 */
export type AreFeatureNames = typeof AreFeatures[keyof typeof AreFeatures];