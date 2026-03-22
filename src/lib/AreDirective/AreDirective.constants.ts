

export const AreDirectiveFeatures = {
    /**
     * Feature that should convert a directiveAttribute definition into a set of SceneInstructions to be rendered correctly
     */
    Compile: '_AreDirective_Compile',
    /**
     * Feature that should update the directiveAttribute based on the changes in the store or other dependencies. 
     */
    Update: '_AreDirective_Update',
} as const