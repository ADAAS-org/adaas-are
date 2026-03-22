

export const AreSceneInstructionFeatures = {
    Apply: '_AreSceneInstruction_Apply',
    Revert: '_AreSceneInstruction_Revert'
} as const


export const ARE_CONSTANTS__DEFAULT_SCENE_INSTRUCTIONS = {
    CreateElement: '_AreScene_CreateElement',

    AddRootElement: '_AreScene_AddRootElement',
    AddElement: '_AreScene_AddElement',
    AddAttribute: '_AreScene_AddAttribute',
    RemoveAttribute: '_AreScene_RemoveAttribute',
    AddStyle: '_AreScene_AddStyle',
    RemoveStyle: '_AreScene_RemoveStyle',
    AddListener: '_AreScene_AddListener',
    AddInterpolation: '_AreScene_AddInterpolation',
    RemoveElement: '_AreScene_RemoveElement',
    RemoveRootElement: '_AreScene_RemoveRootElement',
    addEventListener: '_AreScene_addEventListener',
    removeEventListener: '_AreScene_removeEventListener',
} as const


export const AreSceneInstructionsStatuses = {
    Planned: '_AreSceneInstruction_Planned',
    Applied: '_AreSceneInstruction_Applied',
    Reverted: '_AreSceneInstruction_Reverted'
} as const