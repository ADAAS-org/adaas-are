import { A_Signal } from "@adaas/a-utils/a-signal";

export class AreInitSignal extends A_Signal {
    static async default(): Promise<A_Signal| undefined> {
        return new AreInitSignal({ data: { ready: false } });
    }
}