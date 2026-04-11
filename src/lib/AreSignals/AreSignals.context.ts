import { A_Context, A_Fragment, A_TYPES__Ctor } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame";
import { A_Signal, A_SignalVector } from "@adaas/a-utils/a-signal";
import { Are } from "@adaas/are/component/Are.component";
import { AreSignalsContextConfig } from "./AreSignals.types";
import { AreNode } from "@adaas/are/node/AreNode.entity";
import { AreSignalsMeta } from "./AreSignals.meta";
import { AreSignals } from "./AreSignals.component";



@A_Frame.Fragment({
    description: 'AreSignalsContext is a fragment that manages the set of root nodes subscribed to the signal bus. It tracks which Are components should receive signal vectors from AreSignals and provides the subscriber registry used during signal dispatch.'
})
export class AreSignalsContext<
    T extends Are = Are
> extends A_Fragment {

    /**
     * Where key is the root ID and the value is an Array of components that participate in conditional compilation.
     */
    protected _componentMap: Map<string, Set<A_TYPES__Ctor<T>>> = new Map();

    protected _defaultsMap: Map<string, A_TYPES__Ctor<T>> = new Map();

    protected _conditionsMap: Map<string, Array<{
        vector: Array<any>;
        component: A_TYPES__Ctor<T>;
    }>> = new Map();


    protected _subscribers: Set<AreNode> = new Set();


    protected signalsMeta() {
        const signalsMeta = A_Context.meta<AreSignalsMeta>(AreSignals);
        if (!signalsMeta) {
            throw new Error('AreSignalsMeta not found in context. Please ensure that AreSignalsMeta is properly registered in the A-Concept context.');
        }
        return signalsMeta;
    }

    subscribe<S extends AreNode>(subscriber: S) {
        this._subscribers.add(subscriber);
    }

    unsubscribe<S extends AreNode>(subscriber: S) {
        this._subscribers.delete(subscriber);
    }

    get subscribers(): Set<AreNode> {
        return this._subscribers;
    }

    constructor(
        /**
         * Where key is the root ID and the value is an Array of components that participate in conditional compilation.
         */
        config?: Partial<AreSignalsContextConfig<T>>
    ) {
        super({ name: 'AreSignalsContext' });
        // Initialize the map with the provided config

        const configEntries = config ? Object.entries(config) : [];

        for (const [rootId, conf] of configEntries) {
            const def = conf?.default;
            const pool = conf?.pool || [];
            const conditions = conf?.conditions || [];

            this._componentMap.set(rootId, new Set(pool));

            if (def)
                this._defaultsMap.set(rootId, def);

            this._conditionsMap.set(rootId, conditions);
        }

    }


    /**
     * Returns the components associated with the given ID. If no components are found, returns an empty array.
     * 
     * @param id The ID of the component group.
     * @returns An array of component constructors.
     */
    getComponentById(id: string): Array<A_TYPES__Ctor<T>> {
        const set = this._componentMap.get(id) || new Set();
        return Array.from(set);
    }

    /**
     * Returns the components associated with the root ID of the given node. If no components are found, returns an empty array.
     * 
     * @param node The AreNode whose root ID is used to retrieve the components.
     * @returns An array of component constructors.
     */
    getComponentByRoot(node: AreNode): Array<A_TYPES__Ctor<T>> {
        return this.getComponentById(node.id);
    }

    /**
     * Adds a new component to the specified root ID. If the root ID does not exist, it will be created.
     * 
     * @param rootId The ID of the root component group.
     * @param components An array of component constructors to add.
     */
    extendRoot(rootId: string, components: Array<A_TYPES__Ctor<T>>) {
        if (!this._componentMap.has(rootId)) {
            this._componentMap.set(rootId, new Set());
        }
        const set = this._componentMap.get(rootId)!;
        for (const comp of components) {
            set.add(comp);
        }
    }

    /**
     * Whether routing is configured for the given root ID.
     * When false, the root should leave its original template content untouched.
     * 
     * @param rootId The id attribute of the <are-root> element.
     */
    hasRoot(rootId: string): boolean {
        return this._componentMap.has(rootId) || this._conditionsMap.has(rootId);
    }

    /**
     * Returns the default component associated with the given root ID, if any.
     * 
     * @param rootId The ID of the root component group.
     */
    getDefault(rootId: string): A_TYPES__Ctor<T> | undefined {
        return this._defaultsMap.get(rootId);
    }

    /**
     * Finds the matching component for the given root ID and incoming signal vector.
     * 
     * Matching priorities (mirroring AreSignalsMeta):
     * 1. Full equivalence  — vector.equals(conditionVector)
     * 2. Logical match     — vector.match(conditionVector)
     * 3. Inclusion         — incoming vector contains every signal type from condition, checked with signal.compare()
     * 
     * @param rootId  The id attribute of the <are-root> element.
     * @param vector  The incoming signal vector from the bus.
     */
    findComponentByVector(rootId: string, vector: A_SignalVector): A_TYPES__Ctor<T> | undefined {
        const conditions = this._conditionsMap.get(rootId) || [];

        for (const condition of conditions) {
            const conditionVector = new A_SignalVector(condition.vector as A_Signal[]);

            // Priority 1: full equivalence
            if (vector.equals(conditionVector as any)) {
                return condition.component as A_TYPES__Ctor<T>;
            }
        }

        for (const condition of conditions) {
            const conditionVector = new A_SignalVector(condition.vector as A_Signal[]);

            // Priority 2: logical match (order-independent, same data)
            if (vector.match(conditionVector as any)) {
                return condition.component as A_TYPES__Ctor<T>;
            }
        }

        for (const condition of conditions) {
            // Priority 3: inclusion — every signal type in condition is present in the incoming
            // vector WITH data comparison via signal.compare()
            const allMatch = condition.vector.every((condSignal: A_Signal) => {
                for (const incomingSignal of vector) {
                    if(!incomingSignal)
                        continue;
                    if (
                        incomingSignal.constructor === condSignal.constructor &&
                        condSignal.compare(incomingSignal)
                    ) {
                        return true;
                    }
                }
                return false;
            });

            if (allMatch) {
                return condition.component as A_TYPES__Ctor<T>;
            }
        }

        return undefined;
    }

}

