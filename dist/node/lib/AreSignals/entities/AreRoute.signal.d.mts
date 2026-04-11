import { A_Route } from '@adaas/a-utils/a-route';
import { A_Signal } from '@adaas/a-utils/a-signal';
import { AreSignal } from '../AreSignal.entity.mjs';

declare class AreRoute extends AreSignal<A_Route> {
    constructor(path: string | RegExp);
    get route(): A_Route;
    static default(): AreRoute | undefined;
    compare(other: A_Signal<A_Route>): boolean;
}

export { AreRoute };
