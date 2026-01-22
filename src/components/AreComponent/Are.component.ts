import { A_Component, A_Error, A_Feature } from "@adaas/a-concept";
import { AreFeatures } from "./Are.constants";
import { AreCompiler } from "../AreCompiler/AreCompiler.component";


export class Are extends A_Component {


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


    // ==================================================================================
    // ========================= COMPONENT METHODS ======================================
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