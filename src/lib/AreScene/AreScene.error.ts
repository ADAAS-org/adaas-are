import { A_Error } from "@adaas/a-concept";


export class AreSceneError extends A_Error {

    static readonly SceneAlreadyInactive = 'AreSceneError.SceneAlreadyInactive';

    static readonly SceneAlreadyActive = 'AreSceneError.SceneAlreadyActive';

    static readonly HostInstructionHasConnectedInstructions = 'AreSceneError.HostInstructionHasConnectedInstructions';

    static readonly SingleHostInstruction = 'AreSceneError.SingleHostInstruction';

    static readonly SceneError = 'AreSceneError.SceneError';

    static readonly RootNotFound = 'AreSceneError.RootNotFound';

    static readonly UpdateFailed = 'AreSceneError.UpdateFailed';

    static readonly MountFailed = 'AreSceneError.MountFailed';

    static readonly UnmountFailed = 'AreSceneError.UnmountFailed';

    static readonly MountPointNotFound = 'AreSceneError.MountPointNotFound';

    static readonly InvalidTemplate = 'AreSceneError.InvalidTemplate';

    static readonly RenderFailed = 'AreSceneError.RenderFailed';

}