import { A_SignalVector } from "@adaas/a-utils/a-signal";
import { AreInitSignal } from "src/signals/AreInit.signal";
import { AreRouteSignal } from "src/signals/AreRoute.signal";



export type AreContextInit = {
    /**
     * The base template to be used for rendering and compilation.
     */
    source?: string;
    /**
     * Conditions Mapping between roots and signals associated with components rendered inside the roots. This can be used to manage complex rendering logic and to optimize performance by ensuring that components are only rendered when necessary based on the defined conditions.
     */
    map: { [rootName: string]: A_SignalVector };
}






const test = {
    app: {
        s: new A_SignalVector([new AreRouteSignal('home'), new AreInitSignal()])
    }
}