import { A_Context, A_Fragment } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame";
import { A_SignalVector } from "@adaas/a-utils/a-signal";
import { AreNode } from "@adaas/are/node/AreNode.entity";
import { AreInstruction } from "@adaas/are/instruction/AreInstruction.entity";
import { A_ExecutionContext } from "@adaas/a-utils/a-execution";



@A_Frame.Fragment({
    namespace: 'A-ARE',
    name: 'AreContext',
    description: 'Context fragment for the A-Concept Rendering Engine (ARE) framework, serving as a foundational component for managing shared state and configurations within the ARE environment. This Context uses to encapsulate global settings, resources, and utilities that can be accessed by various ARE components and entities during the rendering and interaction processes.'
})
export class AreContext extends A_ExecutionContext {

    /**
     * The source string represents the original template or input from which the ARE scene is generated. This can be used for debugging, error reporting, or any features that require access to the raw template data. The roots array holds references to the root nodes of the ARE scene, allowing for easy access and management of the top-level components in the rendering hierarchy. The signalsMap is a mapping between root nodes and their associated signal vectors, enabling efficient management of reactive updates and interactions within the ARE framework based on changes in the application state or user input.
     */
    protected _source: string;
    /**
     * The roots array holds references to the root nodes of the ARE scene, allowing for easy access and management of the top-level components in the rendering hierarchy. The signalsMap is a mapping between root nodes and their associated signal vectors, enabling efficient management of reactive updates and interactions within the ARE framework based on changes in the application state or user input.
     */
    protected _roots: Array<AreNode> = [];
    /**
     * This property stores a map between root node and conditions that should be met to render particular component inside the root node. This can be used to manage complex rendering logic and to optimize performance by ensuring that components are only rendered when necessary based on the defined conditions.
     */
    protected _signalsMap: Map<string, A_SignalVector> = new Map();

    protected _performance = new Map<string, number>();
    protected _performanceStart = new Map<string, number>();
    protected _performanceDepth = new Map<string, number>();

    /**
     * The global object can be used to store any global data or configurations that need to be accessed across different components and entities within the ARE framework. This can include things like theme settings, user preferences, or any other shared data that is relevant to the entire scene or application. By centralizing this information in the context, it allows for easier management and access to global state without needing to pass it through multiple layers of components or entities.
     */
    get globals() {
        return this.get('globals') || {};
    }


    constructor(
        /**
         * The source string represents the original template or input from which the ARE scene is generated. This can be used for debugging, error reporting, or any features that require access to the raw template data. The roots array holds references to the root nodes of the ARE scene, allowing for easy access and management of the top-level components in the rendering hierarchy. The signalsMap is a mapping between root nodes and their associated signal vectors, enabling efficient management of reactive updates and interactions within the ARE framework based on changes in the application state or user input.
         */
        source: string = ''
    ) {
        super('AreContext');
        this._source = source;
    }
    /**
     * The scope of the context, which can be used to access other entities and features within the same scope. This is particularly useful for components that need to interact with other parts of the scene or component, as it allows them to access shared data and functionality without needing to pass it explicitly through parameters.
     */
    get scope() {
        return A_Context.scope(this);
    }
    /**
     * The roots array holds references to the root nodes of the ARE scene, allowing for easy access and management of the top-level components in the rendering hierarchy. The signalsMap is a mapping between root nodes and their associated signal vectors, enabling efficient management of reactive updates and interactions within the ARE framework based on changes in the application state or user input.
     */
    get roots(): Array<AreNode> {
        return this._roots;
    }
    /**
     * This property stores a map between root node and conditions that should be met to render particular component inside the root node. This can be used to manage complex rendering logic and to optimize performance by ensuring that components are only rendered when necessary based on the defined conditions.
     */
    get source(): string {
        return this._source;
    }

    get performance(): Array<string> {
        const perfObj: Array<string> = [];
        this._performance.forEach((value, key) => {
            perfObj.push(`${key}: ${value} ms`);
        });
        return perfObj;
    }


    get stats() {
        return [
            `- Total Roots: ${this._roots.length}`,
            `- Total Nodes in Scene: ${this._roots.reduce((acc, root) => acc + this.countNodes(root), 0,)}`,
            `- Total Instructions: ${this._roots.reduce((acc, root) => acc + this.countInstructions(root), 0,)}`,
        ]
    }

    protected countInstructions(node: AreNode): number {
        let count = 0; // Count instructions for the current node
        // Assuming each node has a method or property that returns its instructions
        if (node.scene) {
            count += node.scene.instructions.length;
        }
        for (const child of node.children) {
            count += this.countInstructions(child); // Recursively count instructions in child nodes
        }
        return count;
    }

    protected countNodes(node: AreNode): number {
        let count = 1; // Count the current node
        for (const child of node.children) {
            count += this.countNodes(child); // Recursively count child nodes
        }
        return count;
    }

    /**
     * This property stores a map between root node and conditions that should be met to render particular component inside the root node. This can be used to manage complex rendering logic and to optimize performance by ensuring that components are only rendered when necessary based on the defined conditions.
     * 
     * @param node 
     */
    addRoot(node: AreNode) {
        this._roots.push(node);
        this.scope.register(node);
    }
    /**
     * This property stores a map between root node and conditions that should be met to render particular component inside the root node. This can be used to manage complex rendering logic and to optimize performance by ensuring that components are only rendered when necessary based on the defined conditions.
     * 
     * @param node 
     */
    removeRoot(node: AreNode) {
        this._roots = this._roots.filter(r => r.aseid.toString() !== node.aseid.toString());
    }




    startPerformance(label: string = 'default') {
        const depth = this._performanceDepth.get(label) || 0;
        this._performanceDepth.set(label, depth + 1);

        if (depth === 0) {
            this._performanceStart.set(label, Date.now());
        }
    }

    endPerformance(label: string) {
        const depth = this._performanceDepth.get(label) || 0;

        if (depth <= 1) {
            const startTime = this._performanceStart.get(label) || this._performanceStart.get('default');

            if (startTime) {
                const duration = Date.now() - startTime;
                const accumulated = this._performance.get(label) || 0;
                this._performance.set(label, accumulated + duration);
                this._performanceStart.delete(label);
            }

            this._performanceDepth.delete(label);
        } else {
            this._performanceDepth.set(label, depth - 1);
        }
    }
}
