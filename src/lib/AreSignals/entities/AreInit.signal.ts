import { AreSignal } from "@adaas/are/signals/AreSignal.entity";

export class AreInit extends AreSignal {
    static default(): AreInit | undefined {
        return new AreInit({ data: { ready: false } });
    }
}