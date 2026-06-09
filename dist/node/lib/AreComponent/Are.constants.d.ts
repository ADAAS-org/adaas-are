declare const AreFeatures: {
    /**
     * Allows to define a custom method for the component's initialization logic. This method is called before the component is initialized and can be used to perform any necessary setup or configuration before the component is rendered. It can also be used to implement custom logic for handling specific features or behaviors of the component during the initialization process.
     */
    readonly onBeforeInit: "_Are_onBeforeInit";
    /**
     * Allows to define a custom method for the component's logic that should be executed after the component has been initialized. This method is called after the component has been initialized and can be used to perform any necessary setup or configuration based on the initial state of the component. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-initialization process.
     */
    readonly onAfterInit: "_Are_onAfterInit";
    /**
     * Allows to define a custom method for the component's mounting logic. This method is called before the component is mounted to the DOM and can be used to perform any necessary setup or configuration before the component is rendered. It can also be used to implement custom logic for handling specific features or behaviors of the component during the mounting process.
     */
    readonly onBeforeMount: "_Are_onBeforeMount";
    /**
     * Allows to define a custom method for the component's logic that should be executed after the component has been mounted to the DOM. This method is called after the component has been mounted and can be used to perform any necessary setup or configuration based on the initial state of the component and its presence in the DOM. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-mounting process.
     */
    readonly onAfterMount: "_Are_onAfterMount";
    /**
     * Allows to define a custom method for the component's unmounting logic. This method is called before the component is unmounted from the DOM and can be used to perform any necessary cleanup or teardown before the component is removed. It can also be used to implement custom logic for handling specific features or behaviors of the component during the unmounting process.
     */
    readonly onBeforeUnmount: "_Are_onBeforeUnmount";
    /**
     * Allows to define a custom method for the component's logic that should be executed after the component has been unmounted from the DOM. This method is called after the component has been unmounted and can be used to perform any necessary cleanup or teardown based on the final state of the component and its removal from the DOM. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-unmounting process.
     */
    readonly onAfterUnmount: "_Are_onAfterUnmount";
    /**
     * Allows to define a custom method for the component's update logic. This method is called whenever the component's state changes and can be used to perform any necessary updates or side effects based on the new state. It can also be used to optimize performance by implementing custom logic for determining when the component should re-render based on specific state changes.
     */
    readonly onBeforeUpdate: "_Are_onBeforeUpdate";
    /**
     * Allows to define a custom method for the component's logic that should be executed after the component's state has been updated. This method is called after the component has re-rendered in response to state changes, and can be used to perform any necessary side effects or additional updates based on the new state. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-update process.
     */
    readonly onAfterUpdate: "_Are_onAfterUpdate";
    /**
     * Allows to define a custom method for the component's logic that should be executed before the component is destroyed. This method is called before the component is destroyed and can be used to perform any necessary cleanup or teardown based on the final state of the component. It can also be used to implement custom logic for handling specific features or behaviors of the component during the pre-destruction process.
     */
    readonly onBeforeDestroy: "_Are_onBeforeDestroy";
    /**
     * Allows to define a custom method for the component's logic that should be executed after the component is destroyed. This method is called after the component has been destroyed and can be used to perform any necessary cleanup or teardown based on the final state of the component. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-destruction process.
     */
    readonly onAfterDestroy: "_Are_onAfterDestroy";
    readonly onTemplate: "_Are_onTemplate";
    readonly onStyles: "_Are_onStyles";
    readonly onData: "_Are_onData";
    readonly onSignal: "_Are_onSignal";
};
/**
 * Derives the per-signal-type feature key used by `@Are.Signal(SignalCtor)`
 * typed handlers. Composed from the generic `onSignal` feature name plus the
 * signal class's stable identifier (`entity` static getter from A_Entity, with
 * a `.name` fallback for plain classes). The colon-delimited key is matched
 * by name on the component's feature registry, so the typed handler is
 * dispatched only when the runtime emits an event with the same composed
 * name.
 */
declare function AreSignalFeatureKey(ctor: {
    entity?: string;
    name: string;
}): string;

export { AreFeatures, AreSignalFeatureKey };
