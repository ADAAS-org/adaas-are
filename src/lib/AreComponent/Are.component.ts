import { A_Component, A_Context, A_Feature, A_Meta, A_TYPES__Ctor } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame";
import { A_Signal, A_SignalVector } from "@adaas/a-utils/a-signal";
import { AreSignals } from "@adaas/are/signals/AreSignals.component";
import { AreSignalsMeta } from "@adaas/are/signals/AreSignals.meta";
import { ArePropDefinition } from "./Are.types";
import { AreMeta } from "./Are.meta";
import { AreFeatures } from "./Are.constants";


@A_Frame.Component({
    namespace: 'A-ARE',
    name: 'Are',
    description: 'Base component class for A-Concept Rendering Engine (ARE) components. It provides lifecycle decorators and methods for defining templates, styles, and data, facilitating the creation of dynamic and interactive UI components within the ARE framework.'
})
@A_Meta.Define(AreMeta)
export class Are extends A_Component {
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
            const componentMeta = A_Context.meta<AreMeta>(target);
            const signalsMeta = A_Context.meta<AreSignalsMeta>(AreSignals);

            let vector: A_SignalVector | undefined;

            switch (true) {
                case signals instanceof A_SignalVector:
                    vector = signals;
                    break;
                case Array.isArray(signals):
                    vector = new A_SignalVector(signals);
                    break;
                default:
                    throw new Error('Invalid input for Are.Condition. Expected an array of A_Signal or an instance of A_SignalVector.');
            }

            if (vector) {
                componentMeta.vector = vector;
                signalsMeta.registerCondition(target, vector);
            }

            return target;
        };
    }

    //==================================================================================
    //======================== LIFECYCLE DECORATORS ====================================
    //==================================================================================
    /**
     * Allows to define a custom method for the component's template. This method should return a string representing the HTML template of the component. The template can include dynamic content and bindings that will be processed during rendering to create the final DOM structure for the component.
     */
    static get EventHandler() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: propertyKey,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }
    /**
     * Allows to define a custom method for the component's template. This method should return a string representing the HTML template of the component. The template can include dynamic content and bindings that will be processed during rendering to create the final DOM structure for the component.
     */
    static get onBeforeInit() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreFeatures.onBeforeInit,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }
    /**
     * Allows to define a custom method for the component's initialization logic. This method is called after the component is instantiated but before it is rendered, and can be used to set up any necessary state, perform data fetching, or execute any other logic that needs to happen before the component is rendered for the first time.
     */
    static get onAfterInit() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreFeatures.onAfterInit,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }
    /**
     * Allows to define a custom method for the component's mounting logic. This method is called after the component has been rendered and added to the DOM, and can be used to perform any necessary setup or initialization that requires access to the DOM elements of the component. It can also be used to implement custom logic for handling specific features or behaviors of the component during the mounting process.
     */
    static get onBeforeMount() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreFeatures.onBeforeMount,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }
    /**
     * Allows to define a custom method for the component's logic that should be executed after the component is mounted. This method is called after the component has been rendered and added to the DOM, and can be used to perform any necessary setup or initialization that requires access to the DOM elements of the component. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-mounting process.
     */
    static get onAfterMount() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreFeatures.onAfterMount,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }
    /**
     * Allows to define a custom method for the component's unmounting logic. This method is called before the component is removed from the DOM, and can be used to perform any necessary cleanup or teardown, such as removing event listeners, canceling timers, or releasing any resources that were allocated during the component's lifecycle. It can also be used to implement custom logic for handling specific features or behaviors of the component during the unmounting process.
     */
    static get onBeforeUnmount() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreFeatures.onBeforeUnmount,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }
    /**
     * Allows to define a custom method for the component's logic that should be executed after the component is unmounted. This method is called after the component has been removed from the DOM, and can be used to perform any necessary cleanup or teardown that needs to happen after the component is no longer in the DOM. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-unmounting process.
     */
    static get onAfterUnmount() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreFeatures.onAfterUnmount,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }
    /**
     * Allows to define a custom method for the component's update logic. This method is called whenever the component's state changes and can be used to perform any necessary updates or side effects based on the new state. It can also be used to optimize performance by implementing custom logic for determining when the component should re-render based on specific state changes.
     */
    static get onBeforeUpdate() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreFeatures.onBeforeUpdate,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }
    /**
     * Allows to define a custom method for the component's logic that should be executed after the component's state has been updated. This method is called after the component has re-rendered in response to state changes, and can be used to perform any necessary side effects or additional updates based on the new state. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-update process.
     */
    static get onAfterUpdate() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreFeatures.onAfterUpdate,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }
    /**
     * Allows to define a custom method for the component's template. This method should return a string representing the HTML template of the component. The template can include dynamic content and bindings that will be processed during rendering to create the final DOM structure for the component.
     */
    static get Template() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreFeatures.onTemplate,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }
    /**
     * Allows to define a custom method for the component's styles. This method should return a string representing the CSS styles of the component. The styles can include dynamic content and can be processed during rendering to apply the appropriate styles to the component's DOM elements.
     */
    static get Styles() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreFeatures.onStyles,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }
    /**
     * Allows to define a custom method for the component's data. This method should return an object representing the initial state of the component. The data can include any properties that are needed to manage the component's state and can be reactive, allowing the component to re-render when the data changes.
     */
    static get Data() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreFeatures.onData,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }
    /**
     * Allows to define a custom method for handling signals emitted by the component or other parts of the application. This method can be used to implement custom logic for responding to specific signals, such as user interactions, state changes, or other events that may affect the component's behavior or appearance. By defining this method, developers can create more dynamic and interactive components that can react to changes in the application state or user input in a flexible and efficient way.
     */
    static get Signal() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreFeatures.onSignal,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }
    // ==================================================================================
    // ========================= COMPONENT PROPERTIES ===================================
    // ==================================================================================
    /**
     * Props can be used to store any additional data or configuration for the component. They are not reactive by default but can be used in the component's methods and lifecycle hooks to manage state or pass information. Props can be defined as a simple object with key-value pairs, where keys are the prop names and values are the prop values. They can be accessed and modified within the component's methods to influence rendering or behavior based on the component's state or external inputs.
     */
    props: Record<string, ArePropDefinition> = {};


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
    template(
        ...args: any[]
    ): Promise<void> | void {

    }

    /**
     * Returns the styles string for the component
     *  
     * Could be overridden to provide dynamic styles based on component state
     * 
     * @returns 
     */
    @Are.Styles
    styles(
        ...args: any[]
    ): Promise<void> | void {

    }

    /**
     * Returns the data object for the component
     * 
     * Uses as the initial state of the component
     * 
     * @returns 
     */
    @Are.Data
    data(
        ...args: any[]
    ): Promise<void> | void {

    }
}