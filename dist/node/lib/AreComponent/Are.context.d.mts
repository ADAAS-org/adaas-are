import * as _adaas_a_concept from '@adaas/a-concept';
import { A_Fragment } from '@adaas/a-concept';
import { A_SignalVector } from '@adaas/a-utils/a-signal';
import { AreNode } from '@adaas/are/node/AreNode.entity';
import { A_ExecutionContext } from '@adaas/a-utils/a-execution';

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

export { AreContext };
