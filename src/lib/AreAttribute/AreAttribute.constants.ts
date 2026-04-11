export const AreAttributeFeatures = {
    /**
     * Initializes the attribute. This method is called when the attribute is first created and should set up any necessary state or perform any initial processing based on the provided content and context. It can also be used to validate the attribute's content and throw errors if it is invalid.
     */
    Init: '_AreAttribute_Init',
    /**
     * Uses to generate all rendering instructions for the attribute. This method is called during the compilation phase of the ARE component and should return an array of instructions that describe how to render the attribute based on its content and context. The instructions can include details such as which DOM properties to set, which events to listen for, and how to update the attribute when the underlying data changes.
     */
    Transform: '_AreAttribute_Transform',
    /**
     * Feature that should convert a directiveAttribute definition into a set of SceneInstructions to be rendered correctly
     */
    Compile: '_AreAttribute_Compile',
    /**
     * Feature that should update the directiveAttribute based on the changes in the store or other dependencies. This method is called during the update phase of the ARE component and should perform any necessary updates to the attribute based on changes in the underlying data or context. This can include tasks such as updating DOM properties, re-evaluating expressions, or modifying event listeners to ensure that the attribute remains in sync with the current state of the application.
     */
    Update: '_AreAttribute_Update',
    /**
     * Feature that should validate the attribute's content and context. This method is called during the validation phase of the ARE component and should check whether the attribute's content is valid based on its expected format, type, or other constraints. If the content is invalid, this method should throw an error with a descriptive message to help developers identify and fix the issue.
     */
    Validate: '_AreAttribute_Validate',
} as const
