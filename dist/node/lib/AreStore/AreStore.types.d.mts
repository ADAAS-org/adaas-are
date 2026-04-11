import { AreStoreAreComponentMetaKeys } from './AreStore.constants.mjs';

type AreStorePathValue<T, P extends string> = P extends `${infer K}.${infer Rest}` ? K extends keyof T ? AreStorePathValue<T[K], Rest> : never : P extends keyof T ? T[P] : never;
type AreStoreWatchingEntity = {
    update(...args: any[]): void;
};
type AreStoreAreComponentMetaKeyNames = typeof AreStoreAreComponentMetaKeys[keyof typeof AreStoreAreComponentMetaKeys];

export type { AreStoreAreComponentMetaKeyNames, AreStorePathValue, AreStoreWatchingEntity };
