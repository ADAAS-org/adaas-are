import { ASEID } from '@adaas/a-concept';
import { A_ExecutionContext } from '@adaas/a-utils/a-execution';

declare class AreStore<T extends Record<string, any> = Record<string, any>> extends A_ExecutionContext<T> {
    constructor(aseid: ASEID);
    set<K extends keyof T>(values: Partial<T>): this;
    set<K extends keyof T>(key: K, value: T[K]): this;
}

export { AreStore };
