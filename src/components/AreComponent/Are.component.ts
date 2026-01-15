import { A_Component, A_Feature } from "@adaas/a-concept";
import { AreFeatures } from "./Are.constants";


export class Are<
    _DataType extends Record<string, any> = Record<string, any>
> extends A_Component {


    //==================================================================================
    //======================== LIFECYCLE DECORATORS ====================================
    //==================================================================================

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



    // ==================================================================================
    // ========================= COMPONENT METHODS =======================================
    // ==================================================================================

    get wrapper(): string {
        return '';
    }

    /**
     * Returns the template string for the component
     * 
     * Could be overridden to provide dynamic templates based on component state
     * 
     * @returns 
     */
    async template(): Promise<string> {
        return ``;
    }

    /**
     * Returns the styles string for the component
     *  
     * Could be overridden to provide dynamic styles based on component state
     * 
     * @returns 
     */
    async styles(): Promise<string> {
        return ``;
    }

    /**
     * Returns the data object for the component
     * 
     * Uses as the initial state of the component
     * 
     * @returns 
     */
    async data(): Promise<_DataType> {
        return {} as _DataType;
    }
}