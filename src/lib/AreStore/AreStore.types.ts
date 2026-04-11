import { AreStoreAreComponentMetaKeys } from "./AreStore.constants";


// Helper type to extract the value type from a nested path
export type AreStorePathValue<T, P extends string> = P extends `${infer K}.${infer Rest}`
    ? K extends keyof T
    ? AreStorePathValue<T[K], Rest>
    : never
    : P extends keyof T
    ? T[P]
    : never;



export type AreStoreWatchingEntity = {
    update(...args: any[]): void;
};

export type AreStoreAreComponentMetaKeyNames = typeof AreStoreAreComponentMetaKeys[keyof typeof AreStoreAreComponentMetaKeys];