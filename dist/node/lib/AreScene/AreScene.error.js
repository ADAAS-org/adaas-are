'use strict';

var aConcept = require('@adaas/a-concept');

class AreSceneError extends aConcept.A_Error {
}
AreSceneError.SceneAlreadyInactive = "AreSceneError.SceneAlreadyInactive";
AreSceneError.SceneAlreadyActive = "AreSceneError.SceneAlreadyActive";
AreSceneError.HostInstructionHasConnectedInstructions = "AreSceneError.HostInstructionHasConnectedInstructions";
AreSceneError.SingleHostInstruction = "AreSceneError.SingleHostInstruction";
AreSceneError.SceneError = "AreSceneError.SceneError";
AreSceneError.RootNotFound = "AreSceneError.RootNotFound";
AreSceneError.UpdateFailed = "AreSceneError.UpdateFailed";
AreSceneError.MountFailed = "AreSceneError.MountFailed";
AreSceneError.UnmountFailed = "AreSceneError.UnmountFailed";
AreSceneError.MountPointNotFound = "AreSceneError.MountPointNotFound";
AreSceneError.InvalidTemplate = "AreSceneError.InvalidTemplate";
AreSceneError.RenderFailed = "AreSceneError.RenderFailed";

exports.AreSceneError = AreSceneError;
//# sourceMappingURL=AreScene.error.js.map
//# sourceMappingURL=AreScene.error.js.map