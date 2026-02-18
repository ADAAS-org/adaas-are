import { A_Signal } from '@adaas/a-utils/a-signal';

declare class AreInitSignal extends A_Signal {
    static default(): Promise<A_Signal | undefined>;
}

export { AreInitSignal };
