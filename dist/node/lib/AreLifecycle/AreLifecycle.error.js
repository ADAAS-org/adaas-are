'use strict';

var aConcept = require('@adaas/a-concept');

class AreLifecycleError extends aConcept.A_Error {
}
AreLifecycleError.InvalidLifecycleMethod = "Invalid lifecycle method. Lifecycle method must be one of the following: onBeforeLoad, onLoad, onUpdate, onDestroy.";

exports.AreLifecycleError = AreLifecycleError;
//# sourceMappingURL=AreLifecycle.error.js.map
//# sourceMappingURL=AreLifecycle.error.js.map