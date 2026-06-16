import { A_Context, A_TYPES__ComponentMeta, A_TYPES__Paths, ASEID } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame/core";
import { A_ExecutionContext } from "@adaas/a-utils/a-execution";
import { A_Logger } from "@adaas/a-utils/a-logger";
import type { AreNode } from "@adaas/are/node/AreNode.entity";
import type { Are } from "@adaas/are/component/Are.component";
import type { AreMeta } from "@adaas/are/component/Are.meta";
import { AreStoreAreComponentMetaKeys } from "./AreStore.constants";
import { AreStorePathValue, AreStoreWatchingEntity } from "./AreStore.types";
import { AreContext } from "@adaas/are/component/Are.context";
import { A_UtilsHelper } from "@adaas/a-utils/helpers";




@A_Frame.Define({
    namespace: 'A-ARE',
    description: 'Runtime data store scoped to an AreNode. Holds interpolation values, dynamic data bindings, and any per-node state that components need to read or write during rendering. Can be injected into directives, attributes, and lifecycle handlers to share mutable data across the render pipeline without exposing it globally.',
})
export class AreStore<
    T extends Record<string, any> = Record<string, any>
> extends A_ExecutionContext<T> {

    protected dependencies: Map<string, Set<AreStoreWatchingEntity>> = new Map();

    /**
     * Reverse index of `dependencies`: for every watcher, the set of
     * normalized paths it is currently registered against on THIS store.
     * Maintained alongside `dependencies` so a watcher's stale subscriptions
     * can be pruned in O(deps) when it re-evaluates (see {@link pruneWatcher}).
     */
    protected watcherPaths: Map<AreStoreWatchingEntity, Set<string>> = new Map();

    protected _keys: Set<keyof T> = new Set();

    /**
     * Re-entrant batch depth. While > 0, `dispatch()` accumulates affected
     * watchers into `_pendingNotify` instead of notifying synchronously; the
     * outermost `batch()` flushes them exactly once.
     */
    private _batchDepth = 0;

    private _pendingNotify: Set<AreStoreWatchingEntity> = new Set();



    /**
     * Allows to define a pure function that will be executed in the context of the store, so it can access the store's data and methods, but it won't have access to the component's scope or other features. This can be useful for example for defining a function that will update the store's data based on some logic, without having access to the component's scope or other features, so we can keep the store's logic separate from the component's logic.
     */
    static get Function() {
        return <T extends Are>(target: T, propertyKey: string, descriptor: PropertyDescriptor) => {
            // TODO: fix types
            const targetMeta = A_Context.meta<AreMeta<A_TYPES__ComponentMeta>, T>(target.constructor as any) as any;

            const originalMethod = descriptor.value;

            const allExtensions = targetMeta.get(AreStoreAreComponentMetaKeys.StoreExtensions) || {};

            allExtensions[propertyKey] = originalMethod;

            targetMeta.set(AreStoreAreComponentMetaKeys.StoreExtensions, allExtensions);

            return descriptor;
        }
    }

    get owner(): AreNode {
        return A_Context.scope(this).issuer() as AreNode;
    }

    get parent(): AreStore | undefined {
        return this.owner.parent?.scope.resolve<AreStore>(AreStore);
    }

    get context(): AreContext {
        return A_Context.scope(this).resolve(AreContext) as AreContext;
    }

    constructor(aseid: ASEID | string) {
        super(aseid.toString());
    }

    get watchers(): Set<AreStoreWatchingEntity> {
        return this.context.get('watchers') || new Set();
    }

    get keys(): Set<keyof T> {
        return this._keys;
    }


    watch(instruction: AreStoreWatchingEntity, reevaluate: boolean = false): void {
        // A re-evaluating watcher (an Update window) begins a fresh tracking
        // pass: drop its previously recorded dependencies (this store +
        // ancestors) so paths it no longer reads stop notifying it (#5).
        //
        // Initial application is NOT a re-evaluation. A watcher may read the
        // store across MULTIPLE apply windows (e.g. the `$for` directive reads
        // its source array in the Transform phase but not in the Compile
        // phase). Pruning on every watch window would let a later phase wipe
        // the subscription an earlier phase established, leaving the watcher
        // permanently unsubscribed. So only prune when explicitly told this is
        // a re-evaluation.
        if (reevaluate) {
            this.pruneWatcher(instruction);
        }

        const watchers: Set<AreStoreWatchingEntity> = this.context.get('watchers') || new Set();
        watchers.add(instruction);
        this.context.set('watchers', watchers);
    }

    unwatch(instruction: AreStoreWatchingEntity): void {
        const watchers: Set<AreStoreWatchingEntity> = this.context.get('watchers') || new Set();
        watchers.delete(instruction);
        this.context.set('watchers', watchers);
    }


    /**
     * Remove a key (or nested path) from the store and notify every watcher
     * registered against that path — same ancestor/descendant matching rules
     * as {@link set}. Falls through to `A_ExecutionContext.drop()` for the
     * underlying meta cleanup so dependent renders re-evaluate against the
     * now-missing value.
     */
    drop<P extends A_TYPES__Paths<T>>(key: P | keyof T): void {
        const [firstPart, ...pathPart] = String(key).split('.');

        if (pathPart.length === 0) {
            this._keys.delete(firstPart as keyof T);
            super.drop(firstPart as keyof T);
        } else {
            // Nested drop — clear the leaf inside the existing object so
            // subscribers reading the parent see the updated shape.
            const primaryObject = super.get(firstPart);
            if (primaryObject && typeof primaryObject === 'object') {
                const result = A_UtilsHelper.setBypath(primaryObject, pathPart.join('.'), undefined);
                super.set(firstPart as keyof T, result ? result[firstPart] : primaryObject);
            }
        }

        this.dispatch(this.collectAffected(String(key)));
    }

    set<K extends keyof T>(values: Partial<T>): this
    set<P extends A_TYPES__Paths<T>>(key: P, value: AreStorePathValue<T, P>): this
    set<K extends keyof T, P extends A_TYPES__Paths<T>>(
        param1: K | Partial<T> | P,
        param2?: T[K] | AreStorePathValue<T, P>
    ): this {
        if (typeof param1 === 'string' && param2 !== undefined) {
            this.setAsKeyValue(param1 as P, param2 as AreStorePathValue<T, P>);
        } else if (typeof param1 === 'object') {
            this.setAsObject(param1 as Partial<T>);
        } else {
            throw new Error('Invalid parameters for set method. Expected either (key: string, value: any) or (values: object).');
        }


        return this;
    }


    get<K extends keyof T>(key: K): T[K] | undefined {
        const [firstPart, ...pathPart] = String(key).split('.');

        if (!this._keys.has(firstPart as keyof T)) {
            return this.parent?.get(key as any);
        }

        if (this.watchers.size > 0) {
            const ancestors = this.extractPathSegments(String(key))

            for (const ancestor of ancestors) {
                // normalize once at registration — not at lookup
                const normAncestor = this.normalizePath(ancestor)

                if (!this.dependencies.has(normAncestor)) {
                    this.dependencies.set(normAncestor, new Set())
                }


                this.watchers.forEach(watcher => {
                    this.dependencies.get(normAncestor)!.add(watcher)
                    // keep the reverse index in sync so this subscription can
                    // later be pruned when the watcher re-evaluates (#5)
                    let paths = this.watcherPaths.get(watcher)
                    if (!paths) {
                        paths = new Set()
                        this.watcherPaths.set(watcher, paths)
                    }
                    paths.add(normAncestor)
                })
            }
        }

        const primaryObject = super.get(firstPart);

        const value = A_UtilsHelper.getByPath(primaryObject, pathPart.join('.'));

        return value as T[K] | undefined;
    }


    protected setAsObject(values: Partial<T>): this {
        const entires = Object.entries(values);

        // Collect the union of affected watchers across ALL keys, then notify
        // once. A multi-key object set is a single logical change, so a watcher
        // reading several of those keys must re-render only once (#3, #4).
        const affected = new Set<AreStoreWatchingEntity>();

        for (const [key, value] of entires) {
            this._keys.add(key as keyof T);
            super.set(key as keyof T, value as T[keyof T]);

            for (const watcher of this.collectAffected(String(key))) {
                affected.add(watcher);
            }
        }

        this.dispatch(affected);
        return this;
    }

    protected setAsKeyValue<K extends keyof T, P extends A_TYPES__Paths<T>>(
        key: K | P,
        value: T[K] | AreStorePathValue<T, P>
    ): this {
        const [firstPart, ...pathPart] = String(key).split('.');

        this._keys.add(firstPart as keyof T);

        const primaryObject = super.get(firstPart);

        const result = A_UtilsHelper.setBypath(primaryObject, pathPart.join('.'), value);

        super.set(firstPart as keyof T, result ? result[firstPart] : value);

        this.dispatch(this.collectAffected(String(key)));

        return this;
    }


    /**
     * Force a re-notification of every registered watcher, bypassing the
     * usual key/path dependency tracking. Useful when external state
     * (entities, lists, services) has mutated in place and the store
     * has no way to detect the change through `set()`.
     *
     * If `key` is provided, only watchers registered against that key
     * (or any of its ancestor/descendant paths — same rules as `set()`)
     * are notified.
     */
    forceUpdate<P extends A_TYPES__Paths<T>>(key?: P | keyof T | string): this {
        if (key === undefined) {
            const all = new Set<AreStoreWatchingEntity>();
            for (const instructions of this.dependencies.values()) {
                for (const watcher of instructions) all.add(watcher);
            }
            this.dispatch(all);
            return this;
        }

        this.dispatch(this.collectAffected(String(key)));

        return this;
    }

    /**
     * Runs `fn` with notifications deferred: every watcher affected by writes
     * performed inside `fn` is collected and notified exactly once when the
     * outermost batch completes. Nested `batch()` calls are coalesced into the
     * outermost flush. Use this to wrap a burst of `set()`/`drop()` calls that
     * logically belong together so each dependent renders only once (#4).
     */
    batch(fn: () => void): this {
        this._batchDepth++;
        try {
            fn();
        } finally {
            this._batchDepth--;
            if (this._batchDepth === 0 && this._pendingNotify.size > 0) {
                const pending = this._pendingNotify;
                this._pendingNotify = new Set();
                this.notify(pending);
            }
        }
        return this;
    }

    /**
     * Builds the deduplicated set of watchers affected by a change to
     * `changedKey`, using the same exact/descendant/ancestor path matching as
     * `set()`. Returning a single union Set guarantees each watcher appears at
     * most once regardless of how many of its registered paths matched (#3).
     */
    protected collectAffected(changedKey: string): Set<AreStoreWatchingEntity> {
        const normChanged = this.normalizePath(String(changedKey));
        const prefix = normChanged + '.';
        const affected = new Set<AreStoreWatchingEntity>();

        for (const [normRegistered, instructions] of this.dependencies) {
            if (
                normRegistered === normChanged ||             // exact
                normRegistered.startsWith(prefix) ||          // descendant
                normChanged.startsWith(normRegistered + '.')  // ancestor
            ) {
                for (const instruction of instructions) affected.add(instruction);
            }
        }

        return affected;
    }

    /**
     * Notifies the given watchers now, or defers them to the batch flush when a
     * `batch()` is active. The incoming set is already deduplicated by
     * {@link collectAffected}.
     */
    protected dispatch(affected: Set<AreStoreWatchingEntity>): void {
        if (affected.size === 0) return;

        if (this._batchDepth > 0) {
            for (const watcher of affected) this._pendingNotify.add(watcher);
            return;
        }

        this.notify(affected);
    }

    /**
     * Removes a watcher from every dependency set it holds on THIS store (and,
     * best-effort, on ancestor stores reached via parent delegation in
     * `get()`), clearing the matching reverse-index entries. Called at the
     * start of each tracking window so a re-evaluating watcher does not keep
     * stale subscriptions (#5).
     */
    protected pruneWatcher(instruction: AreStoreWatchingEntity): void {
        const paths = this.watcherPaths.get(instruction);
        if (paths) {
            for (const path of paths) {
                const set = this.dependencies.get(path);
                if (set) {
                    set.delete(instruction);
                    if (set.size === 0) this.dependencies.delete(path);
                }
            }
            this.watcherPaths.delete(instruction);
        }

        // Reads can be delegated to a parent store; prune there too. Guarded
        // because `parent` requires a live node owner, absent in isolated use.
        try {
            this.parent?.pruneWatcher(instruction);
        } catch {
            // no node owner / standalone store — nothing to prune upstream
        }
    }

    /**
     * Notifies instructions — immediately or deferred if inside a batch.
     *
     * A failing watcher is isolated so one bad `update()` cannot abort the rest
     * of the flush, but the error is surfaced (no longer swallowed silently) so
     * render-time failures are diagnosable. Logger resolution is best-effort and
     * confined to this cold error path.
     */
    private notify(instructions: Set<AreStoreWatchingEntity>): void {
        for (const instruction of instructions) {

            try {
                instruction.update()
            } catch (error) {
                try {
                    const logger = A_Context.scope(this).resolve(A_Logger);
                    logger?.error(error as Error);
                } catch {
                    // No logger available in this scope — fall back to console so
                    // the failure is still observable rather than discarded.
                    console.error('[AreStore] watcher update failed:', error);
                }
            }
            // instruction.owner.scene.unApply(instruction);
        }
    }
    /**
     * Removes an instruction from all dependency sets on this store, clearing
     * its reverse-index entry and any pending batched notification. Called when
     * an instruction is reverted/destroyed so a torn-down node's watcher can
     * never be re-notified by a later `set()` (#1).
     */
    unregister(instruction: AreStoreWatchingEntity): void {
        for (const [path, instructions] of this.dependencies) {
            instructions.delete(instruction);
            if (instructions.size === 0) this.dependencies.delete(path);
        }
        this.watcherPaths.delete(instruction);
        this._pendingNotify.delete(instruction);
    }
    /**
     * Normalizes a path once — reused in both get and set.
     */
    private normalizePath(path: string): string {
        return path.replace(/\[(\d+)\]/g, '.$1')
    }

    /**
     * Extracts direct children of the current markup level into typed instances.
     * No tree walking, recursion, or nested parsing — just direct children.
     */
    extractPathSegments(path: string): string[] {
        const normalized = path.replace(/\[(\d+)\]/g, '.$1')
        const parts = normalized.split('.').filter(Boolean)
        const ancestors: string[] = []
        let current = ''

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i]
            const isIndex = /^\d+$/.test(part)

            if (i === 0) {
                current = part
            } else if (isIndex) {
                current = `${current}[${part}]`
            } else {
                current = `${current}.${part}`
            }

            ancestors.push(current)
        }

        return ancestors
    }

    /**
     * Method allows to initialize all extensions defined in the component with @AreStore.Function decorator, so we can use them in the store's context. This method should be called in the component's constructor after super() call, so the store will have access to the component's instance and its properties.
     * 
     * @param component 
     */
    loadExtensions(component: Are) {
        const targetMeta = A_Context.meta<AreMeta<A_TYPES__ComponentMeta>, Are>(component as any) as any;

        const allExtensions = targetMeta.get(AreStoreAreComponentMetaKeys.StoreExtensions) || {};

        this.set(allExtensions);
    }

}
