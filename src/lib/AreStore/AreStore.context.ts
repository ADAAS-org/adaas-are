import { A_TYPES__Paths, ASEID } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame";
import { A_ExecutionContext } from "@adaas/a-utils/a-execution";
import type { AreNode } from "../AreNode";
import { AreStorePathValue, AreStoreWatchingEntity } from "./AreStore.types";
import { AreCommonHelper } from "@adaas/are/helpers/AreCommon.helper";





@A_Frame.Fragment({
    description: "Are Store uses to keep AreNode related information for interpolations, runtime data, etc. This object can be injected to manipulate with data at runtime.",
})
export class AreStore<
    T extends Record<string, any> = Record<string, any>
> extends A_ExecutionContext<T> {



    watchList: Set<AreStoreWatchingEntity> = new Set();
    watchPaths: Set<string> = new Set();

    changes = new Map<string, any>();

    constructor(aseid: ASEID | string) {
        super(aseid.toString());
    }


    // watch(entity: AreStoreWatchingEntity) {
    //     const path = entity.key;

    //     this.watchList.add(entity);

    //     const impactedPaths = String(path).split('.').reduce((acc, part, index, arr) => {
    //         const currentPath = arr.slice(0, index + 1).join('.');
    //         acc.push(currentPath);
    //         return acc;
    //     }, [] as string[]);

    //     impactedPaths.forEach(p => {
    //         this.watchPaths.add(p);
    //     });
    // }

    // unwatch(entity: AreStoreWatchingEntity) {
    //     const path = entity.key;

    //     this.watchList.delete(entity);

    //     const impactedPaths = String(path).split('.').reduce((acc, part, index, arr) => {
    //         const currentPath = arr.slice(0, index + 1).join('.');
    //         acc.push(currentPath);
    //         return acc;
    //     }, [] as string[]);

    //     impactedPaths.forEach(p => {
    //         this.watchPaths.delete(p);
    //     });
    // }


    set<K extends keyof T>(values: Partial<T>): this
    set<P extends A_TYPES__Paths<T>>(key: P, value: AreStorePathValue<T, P>): this
    set<K extends keyof T, P extends A_TYPES__Paths<T>>(
        param1: K | Partial<T> | P,
        param2?: T[K] | AreStorePathValue<T, P>
    ): this {
        if (typeof param1 === 'string' && param2 !== undefined) {
            return this.setAsKeyValue(param1 as P, param2 as AreStorePathValue<T, P>);
        } else if (typeof param1 === 'object') {
            return this.setAsObject(param1 as Partial<T>);
        } else {
            throw new Error('Invalid parameters for set method. Expected either (key: string, value: any) or (values: object).');
        }
    }

    protected setAsObject(values: Partial<T>): this {
        //  get impacted paths for this key and add them to watchPaths

        const impactedPaths = Object.keys(values).reduce((acc, key) => {
            const pathParts = String(key).split('.');
            pathParts.reduce((subAcc, part, index) => {
                const currentPath = subAcc ? `${subAcc}.${part}` : part;
                acc.add(currentPath);
                return currentPath;
            }, '');
            return acc;
        }, new Set<string>());


        Object.entries(values).forEach(([key, value]) => {
            super.set(key as keyof T, value as T[keyof T]);
        });
        return this;
    }

    protected setAsKeyValue<K extends keyof T, P extends A_TYPES__Paths<T>>(
        key: K | P,
        value: T[K] | AreStorePathValue<T, P>
    ): this {
        const [firstPart, ...pathPart] = String(key).split('.');

        const primaryObject = this.get(firstPart);

        const result = AreCommonHelper.setPropertyByPath(primaryObject, pathPart.join('.'), value);

        super.set(firstPart as keyof T, result ? result[firstPart] : value);

        return this;
    }



    get<K extends keyof T>(key: K): T[K] | undefined {
        const [firstPart, ...pathPart] = String(key).split('.');

        const primaryObject = this.get(firstPart);

        const value = AreCommonHelper.extractPropertyByPath(primaryObject, pathPart.join('.'));

        return value as T[K] | undefined;
    }

}
