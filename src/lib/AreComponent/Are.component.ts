import { A_Component, A_Context, A_Feature, A_Meta, A_TYPES__Ctor } from "@adaas/a-concept";
import { AreFeatures } from "./Are.constants";
import { A_Frame } from "@adaas/a-frame";
import { AreMeta } from "./Are.meta";
import { A_Signal, A_SignalVector } from "@adaas/a-utils/a-signal";


@A_Frame.Component({
    namespace: 'A-ARE',
    name: 'Are',
    description: 'Base component class for A-Concept Rendering Engine (ARE) components. It provides lifecycle decorators and methods for defining templates, styles, and data, facilitating the creation of dynamic and interactive UI components within the ARE framework.'
})
@A_Meta.Define(AreMeta)
export class Are extends A_Component {


    //==================================================================================
    //======================== LIFECYCLE DECORATORS ====================================
    //==================================================================================

    /**
     * Allows to apply Signal Vector as a condition for rendering the component. The component will be rendered only if at least one of the signals in the vector is active. This can be used to manage complex rendering logic and to optimize performance by ensuring that components are only rendered when necessary based on the defined conditions.
     * 
     * @param signals 
     * @returns 
     */
    static Condition(vector: A_SignalVector)
    static Condition(vector: Array<A_Signal>)
    static Condition(signals: Array<A_Signal> | A_SignalVector) {
        return function <TTarget extends A_TYPES__Ctor<Are>>(
            target: TTarget
        ): TTarget {
            // Store meta info on the target class itself for the Meta decorator to pick up
            const meta = A_Context.meta<AreMeta>(target);

            if (Array.isArray(signals))
                meta.vector = new A_SignalVector(signals);
            else if (signals instanceof A_SignalVector)
                meta.vector = signals;

            return target;
        };

    }

    static get EventHandler() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: propertyKey,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }

    static get onBeforeLoad() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreFeatures.onBeforeLoad,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }


    static get onAfterLoad() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreFeatures.onAfterLoad,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }


    static get onBeforeCompile() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreFeatures.onBeforeCompile,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }

    static get onAfterCompile() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreFeatures.onAfterCompile,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }

    static get onBeforeMount() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreFeatures.onBeforeMount,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }

    static get onAfterMount() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreFeatures.onAfterMount,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }

    static get onBeforeUnmount() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreFeatures.onBeforeUnmount,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }

    static get onAfterUnmount() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreFeatures.onAfterUnmount,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }

    static get onBeforeUpdate() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreFeatures.onBeforeUpdate,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }

    static get onAfterUpdate() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreFeatures.onAfterUpdate,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }


    static get Template() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreFeatures.onTemplate,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }


    static get Styles() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreFeatures.onStyles,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }

    static get Data() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreFeatures.onData,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }

    static get Signal() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreFeatures.onSignal,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }

    // ==================================================================================
    // ========================= COMPONENT METHODS ======================================
    // ==================================================================================

    /**
     * Returns the template string for the component
     * 
     * Could be overridden to provide dynamic templates based on component state
     * 
     * @returns 
     */
    @Are.Template
    async template(
        ...args: any[]
    ): Promise<void> {

    }

    /**
     * Returns the styles string for the component
     *  
     * Could be overridden to provide dynamic styles based on component state
     * 
     * @returns 
     */
    @Are.Styles
    async styles(
        ...args: any[]
    ): Promise<void> {

    }

    /**
     * Returns the data object for the component
     * 
     * Uses as the initial state of the component
     * 
     * @returns 
     */
    @Are.Data
    async data(
        ...args: any[]
    ): Promise<void> {

    }

}