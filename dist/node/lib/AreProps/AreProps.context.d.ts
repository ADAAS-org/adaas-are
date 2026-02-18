import { ASEID } from '@adaas/a-concept';
import { A_ExecutionContext } from '@adaas/a-utils/a-execution';

declare class AreProps<T extends Record<string, any> = Record<string, any>> extends A_ExecutionContext<T> {
    constructor(aseid: ASEID);
    setMultiple(values: Partial<T>): void;
}

export { AreProps };
