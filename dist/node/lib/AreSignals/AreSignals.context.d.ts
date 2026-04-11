import { A_Fragment, A_TYPES__Ctor } from '@adaas/a-concept';
import { A_SignalVector } from '@adaas/a-utils/a-signal';
import { Are } from '@adaas/are/component/Are.component';
import { AreSignalsContextConfig } from './AreSignals.types.js';
import { AreNode } from '@adaas/are/node/AreNode.entity';
import { AreSignalsMeta } from './AreSignals.meta.js';

declare class AreSignalsContext<T extends Are = Are> extends A_Fragment {
    /**
     * Where key is the root ID and the value is an Array of components that participate in conditional compilation.
     */
    protected _componentMap: Map<string, Set<A_TYPES__Ctor<T>>>;
    protected _defaultsMap: Map<string, A_TYPES__Ctor<T>>;
    protected _conditionsMap: Map<string, Array<{
        vector: Array<any>;
        component: A_TYPES__Ctor<T>;
    }>>;
    protected _subscribers: Set<AreNode>;
    protected signalsMeta(): AreSignalsMeta;
    subscribe<S extends AreNode>(subscriber: S): void;
    unsubscribe<S extends AreNode>(subscriber: S): void;
    get subscribers(): Set<AreNode>;
    constructor(
    /**
     * Where key is the root ID and the value is an Array of components that participate in conditional compilation.
     */
    config?: Partial<AreSignalsContextConfig<T>>);
    /**
     * Returns the components associated with the given ID. If no components are found, returns an empty array.
     *
     * @param id The ID of the component group.
     * @returns An array of component constructors.
     */
    getComponentById(id: string): Array<A_TYPES__Ctor<T>>;
    /**
     * Returns the components associated with the root ID of the given node. If no components are found, returns an empty array.
     *
     * @param node The AreNode whose root ID is used to retrieve the components.
     * @returns An array of component constructors.
     */
    getComponentByRoot(node: AreNode): Array<A_TYPES__Ctor<T>>;
    /**
     * Adds a new component to the specified root ID. If the root ID does not exist, it will be created.
     *
     * @param rootId The ID of the root component group.
     * @param components An array of component constructors to add.
     */
    extendRoot(rootId: string, components: Array<A_TYPES__Ctor<T>>): void;
    /**
     * Whether routing is configured for the given root ID.
     * When false, the root should leave its original template content untouched.
     *
     * @param rootId The id attribute of the <are-root> element.
     */
    hasRoot(rootId: string): boolean;
    /**
     * Returns the default component associated with the given root ID, if any.
     *
     * @param rootId The ID of the root component group.
     */
    getDefault(rootId: string): A_TYPES__Ctor<T> | undefined;
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
    findComponentByVector(rootId: string, vector: A_SignalVector): A_TYPES__Ctor<T> | undefined;
}

export { AreSignalsContext };
