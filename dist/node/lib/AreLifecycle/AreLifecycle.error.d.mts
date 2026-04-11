import { A_Error } from '@adaas/a-concept';

declare class AreLifecycleError extends A_Error {
    static readonly InvalidLifecycleMethod = "Invalid lifecycle method. Lifecycle method must be one of the following: onBeforeLoad, onLoad, onUpdate, onDestroy.";
}

export { AreLifecycleError };
