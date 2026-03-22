import type { AreAttribute } from "@adaas/are/attribute";
import type { AreInterpolation } from "@adaas/are/interpolation";


// Helper type to extract the value type from a nested path
export type AreStorePathValue<T, P extends string> = P extends `${infer K}.${infer Rest}`
    ? K extends keyof T
    ? AreStorePathValue<T[K], Rest>
    : never
    : P extends keyof T
    ? T[P]
    : never;

export type AreStoreWatchingEntity = AreAttribute | AreInterpolation;
