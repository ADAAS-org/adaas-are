import { A_Route } from '@adaas/a-utils/a-route';
import { A_Signal } from '@adaas/a-utils/a-signal';

declare class AreRouteSignal extends A_Signal<{
    route: A_Route;
}> {
    constructor(path: string | RegExp);
    get route(): A_Route;
    static default(): Promise<A_Signal | undefined>;
}

export { AreRouteSignal };
