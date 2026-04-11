import { ASEID, A_TYPES__Paths } from '@adaas/a-concept';
import { A_ExecutionContext } from '@adaas/a-utils/a-execution';
import { AreNode } from '@adaas/are/node/AreNode.entity';
import { Are } from '@adaas/are/component/Are.component';
import { AreStoreWatchingEntity, AreStorePathValue } from './AreStore.types.mjs';
import { AreContext } from '@adaas/are/component/Are.context';
import './AreStore.constants.mjs';

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

export { AreStore };
