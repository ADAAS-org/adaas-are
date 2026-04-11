import { AreSignal } from '../AreSignal.entity.mjs';
import '@adaas/a-utils/a-signal';

declare class AreInit extends AreSignal {
    static default(): AreInit | undefined;
}

export { AreInit };
