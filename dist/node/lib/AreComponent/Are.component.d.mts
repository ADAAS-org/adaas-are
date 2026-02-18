import { A_Component } from '@adaas/a-concept';

declare class Are extends A_Component {
    static get EventHandler(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    static get onBeforeLoad(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    static get onAfterLoad(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    static get onBeforeCompile(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    static get onAfterCompile(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    static get onBeforeMount(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    static get onAfterMount(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    static get onBeforeUnmount(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    static get onAfterUnmount(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    static get onBeforeUpdate(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    static get onAfterUpdate(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    static get Template(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    static get Styles(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    static get Data(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    static get Signal(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    /**
     * Returns the template string for the component
     *
     * Could be overridden to provide dynamic templates based on component state
     *
     * @returns
     */
    template(...args: any[]): Promise<void>;
    /**
     * Returns the styles string for the component
     *
     * Could be overridden to provide dynamic styles based on component state
     *
     * @returns
     */
    styles(...args: any[]): Promise<void>;
    /**
     * Returns the data object for the component
     *
     * Uses as the initial state of the component
     *
     * @returns
     */
    data(...args: any[]): Promise<void>;
}

export { Are };
