import { AreSignal } from '@adaas/are/signals/AreSignal.entity';

declare class AreInit extends AreSignal {
    static default(): AreInit | undefined;
}

export { AreInit };
