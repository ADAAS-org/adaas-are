


export enum AreNodeFeatures {
    /**
     * Event fired when the element node is about to be rendered
     */
    onBeforeRender = '_AreNode_onBeforeRender',
    /**
     * Event fired when the element node is rendered
     */
    onRender = '_AreNode_onRender',
    /**
     * Event fired when the element node is after rendered
     */
    onAfterRender = '_AreNode_onAfterRender',
    /**
     * Feature that is called to compile the element node
     */
    onCompile = '_AreNode_onCompile',
    /**
     * Feature that is called to handle events
     */
    onEvent = '_AreNode_onEvent',
    /**
     * Feature that is called to update the element node
     */
    onUpdate = '_AreNode_onUpdate',
    /**
     * Feature that is called to mount the element node
     */
    onMount = '_AreNode_onMount',
}