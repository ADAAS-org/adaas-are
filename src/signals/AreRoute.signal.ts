import { A_Route } from "@adaas/a-utils/a-route";
import { A_Signal } from "@adaas/a-utils/a-signal";



export class AreRouteSignal extends A_Signal<{
    route: A_Route;
}> {

    constructor(path: string | RegExp) {
        super({
            data: {
                route: new A_Route(path)
            }
        });
    }

    get route(): A_Route {
        return this.data.route;
    }

    static async default(): Promise<A_Signal | undefined> {
        return new AreRouteSignal(document.location.href);
    }
}