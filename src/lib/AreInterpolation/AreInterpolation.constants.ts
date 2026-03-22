


export const AreInterpolationFeatures = {
    /**
     * Uses to generate all rendering instructions for the attribute. This method is called during the compilation phase of the ARE component and should return an array of instructions that describe how to render the attribute based on its content and context. The instructions can include details such as which DOM properties to set, which events to listen for, and how to update the attribute when the underlying data changes.
     */
    COMPILE:'_AreInterpolation_Compile',
    UPDATE:'_AreInterpolation_Update',
    VALIDATE:'_AreInterpolation_Validate',
    SERIALIZE:'_AreInterpolation_Serialize',
    DESERIALIZE:'_AreInterpolation_Deserialize',
    CLONE:'_AreInterpolation_Clone',
} as const;





