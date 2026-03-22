

export const AreNodeFeatures = {

    /**
     * Event fired when the element node is about to be rendered
     */
    onBeforeRender: '_AreNode_onBeforeRender',
    /**
     * Event fired when the element node is rendered
     */
    onRender: '_AreNode_onRender',
    /**
     * Event fired when the element node is after rendered
     */
    onAfterRender: '_AreNode_onAfterRender',


    /**
     * Feature that is called to handle before compile lifecycle of the element node
     */
    onBeforeCompile: '_AreNode_onBeforeCompile',
    /**
     * Feature that is called to compile the element node
     */
    onCompile: '_AreNode_onCompile',
    /**
     * Feature that is called to handle after compile lifecycle of the element node
     */
    onAfterCompile: '_AreNode_onAfterCompile',


    /**
     * Feature that is called to handle events
     */
    onEvent: '_AreNode_onEvent',


    /**
     * Feature that is called to handle before update lifecycle of the element node
     */
    onBeforeUpdate: '_AreNode_onBeforeUpdate',
    /**
     * Feature that is called to handle update lifecycle of the element node
     */
    onUpdate: '_AreNode_onUpdate',
    /**
     * Feature that is called to handle after update lifecycle of the element node
     */
    onAfterUpdate: '_AreNode_onAfterUpdate',


    /**
     * Feature that is called to handle before mount lifecycle of the element node
     */
    onBeforeMount: '_AreNode_onBeforeMount',
    /**
     * Feature that is called to mount the element node
     */
    onMount: '_AreNode_onMount',
    /**
     * Feature that is called to handle after mount lifecycle of the element node
     */
    onAfterMount: '_AreNode_onAfterMount',


    /**
     * Feature that is called to handle before unmount lifecycle of the element node
     */
    onBeforeUnmount: '_AreNode_onBeforeUnmount',
    /**
     * Feature that is called to unmount the element node
     */
    onUnmount: '_AreNode_onUnmount',
    /**
     * Feature that is called to handle after unmount lifecycle of the element node
     */
    onAfterUnmount: '_AreNode_onAfterUnmount',



} as const;



export const AreNodeStatuses = {
    /**
     * Status indicating that the node is pending compilation. When a node is in the pending status, it means that it has been created but has not yet been compiled. During this phase, the node is typically being prepared for compilation, which may involve setting up its template, markup, styles, and any associated data or context. Once the node is ready for compilation, its status will change to "compiling".
     */
    Pending: 'pending',
    /**
     * Status indicating that the node is in the process of being compiled. During this status, the node is being analyzed and transformed based on its template, markup, and styles to generate the necessary instructions for rendering and updating the node in the scene.
     */
    Compiling: 'compiling',
    /**
     * Status indicating that the node has been compiled and is ready to be rendered. In this status, the node has generated all the necessary instructions and is prepared to be mounted in the scene.
     */
    Compiled: 'compiled',
    /**
     * Status indicating that the node is currently mounted in the scene. When a node is mounted, it means that it has been rendered and is actively part of the scene's structure and content.
     */
    Mounted: 'mounted',
    /**
     * Status indicating that the node has been unmounted from the scene. When a node is unmounted, it means that it has been removed from the scene's structure and content, and is no longer actively rendered in the scene.
     */
    Unmounted: 'unmounted',
} as const;