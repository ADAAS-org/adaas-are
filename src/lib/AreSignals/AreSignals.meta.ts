import { A_ComponentMeta, A_TYPES__ComponentMeta, A_TYPES__Ctor } from "@adaas/a-concept";
import type { A_SignalVector } from "@adaas/a-utils/a-signal";
import type { Are } from "@adaas/are/component/Are.component";


export class AreSignalsMeta extends A_ComponentMeta<{
    vectorToComponent: Map<A_SignalVector, A_TYPES__Ctor<Are>>;
    componentToVector: Map<A_TYPES__Ctor<Are>, Set<A_SignalVector>>;
} & A_TYPES__ComponentMeta> {


    registerCondition<T extends Are>(component: A_TYPES__Ctor<T>, vector: A_SignalVector) {
        const vectorToComponent = this.get('vectorToComponent') || new Map<A_SignalVector, A_TYPES__Ctor<T>>();
        const componentToVector = this.get('componentToVector') || new Map<A_TYPES__Ctor<T>, Set<A_SignalVector>>();

        vectorToComponent.set(vector, component);
        if (!componentToVector.has(component)) {
            componentToVector.set(component, new Set<A_SignalVector>());
        }
        componentToVector.get(component)?.add(vector);

        this.set('vectorToComponent', vectorToComponent);
        this.set('componentToVector', componentToVector);
    }


    findComponentByVector(vector: A_SignalVector): A_TYPES__Ctor<Are> | undefined {

        /**
         * 1. try simple lookup
         */
        const vectorToComponent = this.get('vectorToComponent');

        if (vectorToComponent) {
            const component = vectorToComponent.get(vector);
            if (component) {
                return component;
            }
        }

        /**
         * 2. fallback to checking for matching vectors in the map (handles cases where vector instances differ but are logically equivalent)
         */
        if (vectorToComponent) {

            /**
             * 2.1 Priority 1: Full Equivalence - find a component whose registered vector is fully equivalent to the provided vector (i.e., all signals match in type and data).
             */
            for (const [registeredVector, component] of vectorToComponent.entries()) {
                if (vector.equals(registeredVector)) {
                    return component;
                }
            }
            /**
             * 2.2 Priority 2: Logical Match - find a component whose registered vector logically matches the provided vector (i.e., all signals match in type and data, but order may differ).
             */
            for (const [registeredVector, component] of vectorToComponent.entries()) {
                if (vector.match(registeredVector)) {
                    return component;
                }
            }
            /**
             * 2.3 Priority 3: Inclusion - find a component whose registered vector includes all signals from the provided vector (i.e., the provided vector is a subset of the registered vector).
             */
            for (const [registeredVector, component] of vectorToComponent.entries()) {
                if (vector.includes(registeredVector)) {
                    return component;
                }
            }
        }

        return undefined;
    }

}