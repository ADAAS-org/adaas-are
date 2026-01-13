import { AreSignal } from "../entities/AreSignal/AreSignal.entity";

export class AreInitSignal extends AreSignal<{ ready: boolean }> {
    static async default(): Promise<AreSignal | undefined> {
        return new AreInitSignal({ data: { ready: false } });
    }
}