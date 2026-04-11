import { A_ComponentMeta, A_TYPES__ComponentMeta } from '@adaas/a-concept';
import { A_SignalVector } from '@adaas/a-utils/a-signal';

/**
 * The AreMeta class serves as a metadata container for components within the A-Concept Rendering Engine (ARE) framework. It extends the base A_ComponentMeta class and includes additional properties and features specific to ARE components. The AreMeta class can be used to define and manage metadata for ARE components, such as their template, styles, data, and signal handling logic, allowing for a structured and organized way to manage component behavior and interactions within the ARE environment.
 */
declare class AreMeta<T extends Record<string, any> = Record<string, any>> extends A_ComponentMeta<T & A_TYPES__ComponentMeta> {
    /**
     * Optional property to store a signal vector associated with the component. This can be used to manage and handle signals emitted by the component or other parts of the application, allowing for dynamic interactions and responsive behavior based on changes in the application state or user input.
     */
    vector?: A_SignalVector;
}

export { AreMeta };
