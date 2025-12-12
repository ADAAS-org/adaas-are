

export enum AreFeatures {
    /**
     * Runs before the component is loaded into memory
     * 
     * Before template, styles and data are fetched
     */
    onBeforeLoad = '_Are_onBeforeLoad',
    /**
     * Runs after the component is loaded into memory
     * 
     * After template, styles and data are fetched
     */
    onAfterLoad = '_Are_onAfterLoad',
    onBeforeMount = '_Are_onBeforeMount',
    onAfterMount = '_Are_onAfterMount',
    onBeforeUnmount = '_Are_onBeforeUnmount',
    onAfterUnmount = '_Are_onAfterUnmount',
    onBeforeUpdate = '_Are_onBeforeUpdate',
    onAfterUpdate = '_Are_onAfterUpdate',
    onBeforeDestroy = '_Are_onBeforeDestroy',
    onAfterDestroy = '_Are_onAfterDestroy',


    onBeforeCompile = '_Are_onBeforeCompile',
    onAfterCompile = '_Are_onAfterCompile',

    onBeforeRender = '_Are_onBeforeRender',
    onAfterRender = '_Are_onAfterRender',
}