

import { A_Route } from "@adaas/a-utils";
import { AreSignal } from "../entities/AreSignal/AreSignal.entity";

export class AreRouterSignal extends AreSignal<{
    route: A_Route;
}> {
    static async default(): Promise<AreSignal | undefined> {
        return new AreRouterSignal({
            data: {
                route: new A_Route(document.location.href),
            }
        });
    }
}