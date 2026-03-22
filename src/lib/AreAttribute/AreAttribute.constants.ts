


export const AreAttributeFeatures = {
    /**
     * Uses to generate all rendering instructions for the attribute. This method is called during the compilation phase of the ARE component and should return an array of instructions that describe how to render the attribute based on its content and context. The instructions can include details such as which DOM properties to set, which events to listen for, and how to update the attribute when the underlying data changes.
     */
    COMPILE: '_AreAttribute_Compile',
    UPDATE: '_AreAttribute_Update',
    VALIDATE: '_AreAttribute_Validate',
    SERIALIZE: '_AreAttribute_Serialize',
    DESERIALIZE: '_AreAttribute_Deserialize',
    CLONE: '_AreAttribute_Clone',
}





