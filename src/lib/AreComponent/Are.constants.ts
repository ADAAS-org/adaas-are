export const AreFeatures = {
    //===================================================================================
    // -----------------------------Node Lifecycle Hooks---------------------------------
    //===================================================================================
    /**
     * Allows to define a custom method for the component's initialization logic. This method is called before the component is initialized and can be used to perform any necessary setup or configuration before the component is rendered. It can also be used to implement custom logic for handling specific features or behaviors of the component during the initialization process.
     */
    onBeforeInit: '_Are_onBeforeInit',
    /**
     * Allows to define a custom method for the component's logic that should be executed after the component has been initialized. This method is called after the component has been initialized and can be used to perform any necessary setup or configuration based on the initial state of the component. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-initialization process.
     */
    onAfterInit: '_Are_onAfterInit',
    //------------------------------------------------------------------------------------
    /**
     * Allows to define a custom method for the component's mounting logic. This method is called before the component is mounted to the DOM and can be used to perform any necessary setup or configuration before the component is rendered. It can also be used to implement custom logic for handling specific features or behaviors of the component during the mounting process.
     */
    onBeforeMount: '_Are_onBeforeMount',
    /**
     * Allows to define a custom method for the component's logic that should be executed after the component has been mounted to the DOM. This method is called after the component has been mounted and can be used to perform any necessary setup or configuration based on the initial state of the component and its presence in the DOM. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-mounting process.
     */
    onAfterMount: '_Are_onAfterMount',
    //------------------------------------------------------------------------------------
    /**
     * Allows to define a custom method for the component's unmounting logic. This method is called before the component is unmounted from the DOM and can be used to perform any necessary cleanup or teardown before the component is removed. It can also be used to implement custom logic for handling specific features or behaviors of the component during the unmounting process.
     */
    onBeforeUnmount: '_Are_onBeforeUnmount',
    /**
     * Allows to define a custom method for the component's logic that should be executed after the component has been unmounted from the DOM. This method is called after the component has been unmounted and can be used to perform any necessary cleanup or teardown based on the final state of the component and its removal from the DOM. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-unmounting process.
     */
    onAfterUnmount: '_Are_onAfterUnmount',
    //------------------------------------------------------------------------------------
    /**
     * Allows to define a custom method for the component's update logic. This method is called whenever the component's state changes and can be used to perform any necessary updates or side effects based on the new state. It can also be used to optimize performance by implementing custom logic for determining when the component should re-render based on specific state changes.
     */
    onBeforeUpdate: '_Are_onBeforeUpdate',
    /**
     * Allows to define a custom method for the component's logic that should be executed after the component's state has been updated. This method is called after the component has re-rendered in response to state changes, and can be used to perform any necessary side effects or additional updates based on the new state. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-update process.
     */
    onAfterUpdate: '_Are_onAfterUpdate',
    /**
     * Allows to define a custom method for the component's logic that should be executed before the component is destroyed. This method is called before the component is destroyed and can be used to perform any necessary cleanup or teardown based on the final state of the component. It can also be used to implement custom logic for handling specific features or behaviors of the component during the pre-destruction process.
     */
    onBeforeDestroy: '_Are_onBeforeDestroy',
    /**
     * Allows to define a custom method for the component's logic that should be executed after the component is destroyed. This method is called after the component has been destroyed and can be used to perform any necessary cleanup or teardown based on the final state of the component. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-destruction process.
     */
    onAfterDestroy: '_Are_onAfterDestroy',

    //===================================================================================
    // -----------------------------Loading Extension------------------------------------
    //===================================================================================
    onTemplate: '_Are_onTemplate',
    onStyles: '_Are_onStyles',
    onData: '_Are_onData',
    //===================================================================================
    // -----------------------------Runtime Hooks------------------------------------
    //=================================================================================== 
    onSignal: '_Are_onSignal',
} as const;