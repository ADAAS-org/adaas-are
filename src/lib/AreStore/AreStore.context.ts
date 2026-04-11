import { A_Context, A_TYPES__ComponentMeta, A_TYPES__Paths, ASEID } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame";
import { A_ExecutionContext } from "@adaas/a-utils/a-execution";
import type { AreNode } from "@adaas/are/node/AreNode.entity";
import type { Are } from "@adaas/are/component/Are.component";
import type { AreMeta } from "@adaas/are/component/Are.meta";
import { AreStoreAreComponentMetaKeys } from "./AreStore.constants";
import { AreStorePathValue, AreStoreWatchingEntity } from "./AreStore.types";
import { AreContext } from "@adaas/are/component/Are.context";
import { A_UtilsHelper } from "@adaas/a-utils/helpers";




@A_Frame.Fragment({
    description: "Are Store uses to keep AreNode related information for interpolations, runtime data, etc. This object can be injected to manipulate with data at runtime.",
})
export class AreStore<
    T extends Record<string, any> = Record<string, any>
> extends A_ExecutionContext<T> {

    protected dependencies: Map<string, Set<AreStoreWatchingEntity>> = new Map();

    protected _keys: Set<keyof T> = new Set();



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


    watch(instruction: AreStoreWatchingEntity): void {
        const watchers: Set<AreStoreWatchingEntity> = this.context.get('watchers') || new Set();
        watchers.add(instruction);
        this.context.set('watchers', watchers);
    }

    unwatch(instruction: AreStoreWatchingEntity): void {
        const watchers: Set<AreStoreWatchingEntity> = this.context.get('watchers') || new Set();
        watchers.delete(instruction);
        this.context.set('watchers', watchers);
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


                this.watchers.forEach(watcher => this.dependencies.get(normAncestor)!.add(watcher))
            }
        }

        const primaryObject = super.get(firstPart);

        const value = A_UtilsHelper.getByPath(primaryObject, pathPart.join('.'));

        return value as T[K] | undefined;
    }


    protected setAsObject(values: Partial<T>): this {
        const entires = Object.entries(values);

        for (const [key, value] of entires) {

            this._keys.add(key as keyof T);
            super.set(key as keyof T, value as T[keyof T]);

            // normalize once — dependencies are already stored normalized
            const normChanged = this.normalizePath(String(key))
            const prefix = normChanged + '.'


            for (const [normRegistered, instructions] of this.dependencies) {
                if (
                    normRegistered === normChanged ||   // exact
                    normRegistered.startsWith(prefix) ||   // descendant
                    normChanged.startsWith(normRegistered + '.') // ancestor
                ) {
                    this.notify(instructions)
                }
            }

        }
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

        // normalize once — dependencies are already stored normalized
        const normChanged = this.normalizePath(String(key))
        const prefix = normChanged + '.'

        for (const [normRegistered, instructions] of this.dependencies) {
            if (
                normRegistered === normChanged ||   // exact
                normRegistered.startsWith(prefix) ||   // descendant
                normChanged.startsWith(normRegistered + '.') // ancestor
            ) {
                this.notify(instructions)
            }
        }

        return this;
    }


    /**
     * Notifies instructions — immediately or deferred if inside a batch.
     */
    private notify(instructions: Set<AreStoreWatchingEntity>): void {
        for (const instruction of instructions) {

            try {
                instruction.update()
            } catch (error) {

            }
            // instruction.owner.scene.unApply(instruction);
        }
    }
    /**
     * Removes an instruction from all dependency sets.
     * Called when an instruction is reverted/destroyed.
     */
    unregister(instruction: AreStoreWatchingEntity): void {
        for (const instructions of this.dependencies.values()) {
            instructions.delete(instruction);
        }
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
