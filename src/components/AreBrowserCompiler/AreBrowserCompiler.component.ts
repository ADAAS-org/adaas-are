import { AreNode } from "@adaas/are/entities/AreNode/AreNode.entity";
import { AreIndex } from "@adaas/are/context/AreIndex/AreIndex.context";
import { A_Config, A_ExecutionContext, A_Logger, A_ServiceFeatures, } from "@adaas/a-utils";
import { A_Caller, A_Dependency, A_Error, A_Feature, A_Inject, A_Scope, ASEID } from "@adaas/a-concept";
import { AreNodeFeatures } from "@adaas/are/entities/AreNode/AreNode.constants";
import { AreStore } from "@adaas/are/context/AreStore/AreStore.context";
import { AreProps } from "@adaas/are/context/AreProps/AreProps.context";
import { AreCompiler } from "../AreCompiler/AreCompiler.component";
import { AreScene } from "@adaas/are/context/AreScene/AreScene.context";
import { AreSyntax } from "@adaas/are/context/AreSyntax/AreSyntax.context";
import { AddStyleInstruction } from "@adaas/are/entities/AreSceneInstruction/types/AddStyle.instruction";
import { AttachListenerInstruction } from "@adaas/are/entities/AreSceneInstruction/types/AttachListener.instruction";
import { AddDirectiveInstruction } from "@adaas/are/entities/AreSceneInstruction/types/AddDirective.instruction";
import { AddAttributeInstruction } from "@adaas/are/entities/AreSceneInstruction/types/AddAttribute.instruction";
import { MountNodeInstruction } from "@adaas/are/entities/AreSceneInstruction/types/MountNode.instruction";
import { ReplaceInterpolationInstruction } from "@adaas/are/entities/AreSceneInstruction/types/ReplaceInterpolation.instruction";
import { AreSceneInstructionFeatures } from "@adaas/are/entities/AreSceneInstruction/AreSceneInstruction.constants";
import { AreApp } from "@adaas/are/containers/AreApp/AreApp.container";
import { UnmountNodeInstruction } from "@adaas/are/entities/AreSceneInstruction/types/UnmountNode.instruction";

/**
 * Browser DOM specific scene implementation
 * Handles all browser/DOM related operations and provides web-specific compilation logic
 */
export class AreBrowserCompiler extends AreCompiler {


    @A_Feature.Extend()
    protected async [A_ServiceFeatures.onBeforeLoad](
        @A_Inject(AreApp) app: AreApp,


        @A_Inject(AreScene) root?: AreScene,
        @A_Inject(A_Config) config?: A_Config<any>,
        @A_Inject(A_Logger) logger?: A_Logger,
    ): Promise<void> {
        // 1) Initialize Scene if not present
        logger?.debug('cyan', `Initializing AreScene in AreBrowserCompiler...`);
        // const mountPointID = config?.get('ARE_MOUNT_POINT') || 'app';

        if (!root) {
            const mountPointElements = document.getElementsByTagName('are-root')


            for (const element of Array.from(mountPointElements)) {

                const rootId = element.getAttribute('id');

                if (!rootId) {
                    throw new A_Error(`are-root element must have an 'id' attribute to identify the mount point.`);
                }

                const rootNode = new AreNode({
                    id: rootId,
                    scope: 'are',
                    component: 'are-root',
                    markup: element.outerHTML,
                    template: element.innerHTML,
                });

                app.addRoot(rootNode)
            }
        }
    }



    // ==================================================================================
    // ========================= COMPONENT METHODS =======================================
    // ==================================================================================
    /**
     * Compiles the AreNode using AreCompiler
     * 
     * 
     * @param logger 
     */
    @A_Feature.Extend({
        name: AreNodeFeatures.onCompile,
        scope: [AreNode]
    })
    async compile(
        /**
         * Actual Node no be compiled
         */
        @A_Inject(A_Caller) node: AreNode,
        /**
         * Nodes owned Scene
         * 
         */
        @A_Dependency.Flat()
        @A_Inject(AreScene) scene: AreScene,
        /**
         * Parent Scene where the node is registered
         */
        @A_Dependency.Parent()
        @A_Inject(AreScene) parentScene: AreScene,

        /**
         * Global Syntax Definition for parsing markup
         */
        @A_Inject(AreSyntax) syntax: AreSyntax,
        /**
         * Scope of the Compilation Feature - actually the AreNode scope
         */
        @A_Inject(A_Scope) scope: A_Scope,

        @A_Inject(AreProps) props: AreProps,
        @A_Inject(AreStore) store: AreStore,

        @A_Dependency.Parent()
        @A_Inject(AreStore) parentStore: AreStore,



        @A_Inject(A_Logger) logger?: A_Logger,
    ) {

        logger?.debug('violet',
            '--------------------------------------',
            'Start Compiling Node: <' + node.aseid.entity + '> ASEID: ' + node.aseid.toString(),
            '--------------------------------------'
        )


        //  the case when it's NOT a RootNode
        if (parentScene) {

            logger?.debug(scene.debugPrefix + `Compiling node <${node.aseid.entity}> in Scene <${parentScene.name}>`);


            // -------------------------------------------------------
            // 1) index the scene and plan Mount Node instruction
            // -------------------------------------------------------

            const mountInstruction = new MountNodeInstruction(node, scene.path);

            if (!parentScene.isPlanned(mountInstruction)) {
                logger?.debug('red', scene.debugPrefix + `AreCompiler: Building Scene Index for <${scene.name}> during compilation of Node <${node.aseid.entity}>`);


                //  move to load
                this.index(node);

                parentScene.plan(mountInstruction);
                await mountInstruction.init();
            }

            if (syntax.isCustomNode(node))
                for (const interpolation of syntax.extractInterpolations(node.template)) {

                    const value = store.get(interpolation.name) || parentStore.get(interpolation.name);

                    const instruction = new ReplaceInterpolationInstruction(node, interpolation, value);

                    const stateInstruction = parentScene.getState(instruction);

                    instruction.update({ value, prevValue: stateInstruction?.value });

                    if (!parentScene.isPlanned(instruction)) {
                        parentScene.plan(instruction);
                        await instruction.init();
                    } else {
                        parentScene.unPlan(instruction);
                        parentScene.plan(instruction);
                    }
                }

            // 1) extract all props from the markup and set them in the props store
            for (const attr of syntax.extractAttributes(node.markup)) {
                const name = attr.name;
                const value = (syntax.isBindingProp(attr) ?
                    store.get(attr.value) || parentStore.get(attr.value)
                    : attr.value) || '';

                props.set(name, value);

                parentScene.plan(new AddAttributeInstruction(node, name, value));
            }

            // 3a) Process directives first before other operations
            for (const directive of syntax.extractDirectives(node.markup)) {
                let directiveValue: any;

                // Get the directive value from store or props
                if (directive.value) {
                    directiveValue = store.get(directive.value) || parentStore.get(directive.value);
                }

                console.log('Processing directive', directive.name, 'with value', directiveValue);

                let instruction = new AddDirectiveInstruction(node, directive, directiveValue);

                const stateInstruction = parentScene.getState(instruction);

                if (!stateInstruction || stateInstruction.value !== directiveValue) {
                    parentScene.unPlan(instruction);
                    parentScene.plan(instruction);

                    await instruction.init();
                }

            }

            // -------------------------------------------------------
            // 2) replace all style interpolations in the styles
            // -------------------------------------------------------
            let styles = node.styles || '';

            for (const interpolation of syntax.extractInterpolations(styles)) {
                const value = store.get(interpolation.name);

                styles = syntax.replaceInterpolation(styles, interpolation, value);
            }

            if (styles.trim()) {
                const instruction = new AddStyleInstruction(node, styles);

                if (!parentScene.isPlanned(instruction)) {
                    parentScene.plan(instruction);
                    await instruction.init();
                }
            }

            // -------------------------------------------------------
            // 3) go through all listeners and register them in the scene
            // -------------------------------------------------------
            for (const listener of syntax.extractListeners(node.markup)) {

                //  target emitter should be custom component that owns the listener
                let currentScene = scene;
                let targetNode = node


                while (!syntax.isCustomNode(targetNode) && currentScene.parent) {
                    targetNode = currentScene.parent.scope.resolveFlat<AreNode>(AreNode, {
                        query: {
                            aseid: currentScene.id
                        }
                    }) as any as AreNode

                    currentScene = currentScene.parent;
                }


                const instruction = new AttachListenerInstruction(node, targetNode, listener);

                if (!parentScene.isPlanned(instruction)) {
                    parentScene.plan(instruction);
                    await instruction.init();
                }
            }
        } else {
            logger?.debug('red', scene.debugPrefix + `Root Node is found during compilation of Node <${node.aseid.entity}>. Indexing the Scene...`, scene);

            this.index(node);
        }


        for (const sceneNode of scene.nodes()) {

            const existed = scene.scope.resolveFlat<AreNode>(AreNode, {
                query: {
                    aseid: sceneNode.aseid
                }
            });


            if (!existed) {
                scene.attach(sceneNode)

                await sceneNode.load();
            }

            await sceneNode.compile();
        }
    }




    /**
     * Compute path for DOM element relative to virtual root (legacy method, kept for compatibility)
     * @deprecated Use string-based path computation instead
     */
    computePath(node: Node, virtual: Element): string {
        const path: number[] = [];
        let current: Node | null = node;

        while (current && current !== virtual) {
            const parent = current.parentNode;
            if (parent) {
                const index = Array.from(parent.childNodes)
                    .filter(n => (n as any).nodeType === Node.ELEMENT_NODE)
                    .indexOf(current);

                path.unshift(index);
            }
            current = parent;
        }

        return path.join('.');
    }

    /**
     * Get DOM element by string path from root element
     * Works with paths generated by the string-based parser
     */
    getElementByPath(
        root: Element,
        path: string
    ): Element | undefined {
        if (!path) {
            return root;
        }

        const indices = path.split('.').map(index => parseInt(index, 10));
        let current: Element | undefined = root;

        for (const index of indices) {
            if (!current) {
                return undefined;
            }

            // Get only element children (not text nodes, comments, etc.)
            const elementChildren = Array.from(current.children).filter(child => child.nodeType === Node.ELEMENT_NODE);

            if (index >= elementChildren.length) {
                return undefined;
            }

            current = elementChildren[index] as Element;
        }

        return current;
    }



    getElementByNode(node: AreNode): Element | undefined {
        const scene = node.scope.resolveFlat<AreScene>(AreScene)!;
        const root = document.getElementById(new ASEID(scene.root.id).id)!;

        return this.getElementByPath(root, scene.path);
    }

    insertElementAtPath(
        root: Element,
        path: string,
        element: Element
    ): void {
        const parentPath = path.split('.').slice(0, -1).join('.');
        const parentElement = this.getElementByPath(root, parentPath);
        const index = parseInt(path.split('.').slice(-1)[0], 10);
        if (parentElement) {
            const children = Array.from(parentElement.children).filter(child => child.nodeType === Node.ELEMENT_NODE);
            if (index >= children.length) {
                parentElement.appendChild(element);
            } else {
                parentElement.insertBefore(element, children[index]);
            }
        }
    }

    insertElementByNode(
        node: AreNode,
        element: Element
    ): void {
        const scene = node.scope.resolveFlat<AreScene>(AreScene)!;
        const root = document.getElementById(new ASEID(scene.root.id).id)!;
        this.insertElementAtPath(root, scene.path, element);
    }


    /**
     * Compute string path for a DOM element relative to a root element
     * This generates the same format as parseHTMLElements uses
     */
    computeStringPath(element: Element, root: Element): string {
        if (element === root) {
            return '';
        }

        const path: number[] = [];
        let current: Element | null = element;

        while (current && current !== root) {
            const parent = current.parentElement;
            if (parent) {
                const index = Array.from(parent.children).indexOf(current);
                if (index === -1) {
                    return '';
                }
                path.unshift(index);
            }
            current = parent;
        }

        return path.join('.');
    }


    index(
        node: AreNode
    ) {
        const index = node.scope.resolveFlat<AreIndex>(AreIndex)!;
        const scene = node.scope.resolveFlat<AreScene>(AreScene)!;

        scene.reset();

        // Use a position-based approach that maps DOM paths to original markup exactly
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = node.template;

        // Create a mapping of DOM paths to original markup using DOM traversal
        const markupMap = this.createPositionBasedMarkupMap(node.template);

        this.indexElementsFromDOM(tempDiv, index, [], markupMap);
    }

    /**
     * Create a position-based mapping by parsing the original template with DOM
     * This ensures 1:1 correspondence between DOM structure and original markup
     */
    private createPositionBasedMarkupMap(template: string): Map<string, string> {
        const markupMap = new Map<string, string>();
        const originalDiv = document.createElement('div');
        originalDiv.innerHTML = template;

        // Traverse the original DOM and map each position to its outerHTML
        this.mapDOMPositions(originalDiv, [], markupMap);

        return markupMap;
    }

    /**
     * Recursively map DOM positions to their exact original markup
     */
    private mapDOMPositions(
        parentElement: Element,
        parentPath: number[],
        markupMap: Map<string, string>
    ): void {
        const children = Array.from(parentElement.children);

        for (let i = 0; i < children.length; i++) {
            const element = children[i];
            const currentPath = [...parentPath, i];
            const pathKey = currentPath.join('.');

            // Store the exact outerHTML for this position
            markupMap.set(pathKey, element.outerHTML);

            // Recursively process children
            // if (element.children.length > 0) {
            //     this.mapDOMPositions(element, currentPath, markupMap);
            // }
        }
    }

    /**
     * Index elements using actual DOM structure with position-based markup mapping
     */
    private indexElementsFromDOM(
        parentElement: Element,
        index: AreIndex,
        parentPath: number[],
        markupMap: Map<string, string>
    ): void {
        const children = Array.from(parentElement.children);

        for (let i = 0; i < children.length; i++) {
            const element = children[i];
            const currentPath = [...parentPath, i];
            const pathKey = currentPath.join('.');

            // Get the exact markup for this position from our mapping
            const originalMarkup = markupMap.get(pathKey);


            // Create AreNode with preserved original markup
            const areNode = new AreNode({
                scope: index.name,
                component: element.tagName.toLowerCase(),
                markup: originalMarkup || element.outerHTML,
                template: element.innerHTML,
            });

            // Add to index
            index.add(areNode, currentPath.join('.'));


            // Recursively process children
            // if (element.children.length > 0) {
            //     this.indexElementsFromDOM(element, index, currentPath, markupMap);
            // }
        }
    }




    @A_Feature.Extend({
        name: AreNodeFeatures.onRender,
        scope: [AreNode]
    })
    async render(
        /**
         * Node to be mounted
         */
        @A_Inject(A_Caller) node: AreNode,
        /**
         * Node Content
         */
        @A_Dependency.Flat()
        @A_Inject(AreScene) scene: AreScene,

        @A_Inject(A_Scope) scope: A_Scope,

        /**
         * Scene where target node is registered
         * 
         * [!] For Root Node it doesn't exists
         */
        @A_Dependency.Parent()
        @A_Inject(AreScene) parentScene?: AreScene,

        @A_Inject(A_Logger) logger?: A_Logger,


    ) {
        logger?.debug('AreBrowserCompiler: Rendering <' + node.aseid.entity + '> ASEID: ' + node.aseid.toString(), scene);

        if (parentScene) {


            // 1) should be mounted or unmounted
            for (const instruction of parentScene.renderPlanFor(node, {
                filter: (inst) => inst instanceof MountNodeInstruction || inst instanceof UnmountNodeInstruction,
            })) {

                if (parentScene.getState(instruction)) {
                    logger?.debug('yellow', scene.debugPrefix + `Action '${instruction.action}' for Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()} already mounted. Skipping...`, instruction);
                    continue;
                }

                logger?.debug('red', scene.debugPrefix + `Processing ${instruction.action} Instruction for Node <${node.aseid.entity}> `, instruction);

                const executionContext = new A_ExecutionContext('AreBrowserCompiler: Mount/Unmount Node Instruction');

                // .set('mountPoint', mountPoint);

                const applyScope = new A_Scope({ fragments: [executionContext] }).inherit(scope);

                await instruction.apply(applyScope);

                applyScope.destroy();

                parentScene.setState(instruction);

            }

            //  if There's no Mount Instruction planned, ite means that this node should not be rendered 
            //  and any other instructions related to it should be ignored
            if (!parentScene.isPlanned(new MountNodeInstruction(node, scene.path))) {
                logger?.debug('yellow', scene.debugPrefix + `Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()} has no Mount Instruction planned. Skipping mount.`);
                return;
            }

            // const path = parentScene.index.pathOf(node)!;
            // const element = this.getElementByNode(node);


            // if (!element) {
            //     throw new A_Error(`Element at path not found in the mount point.`);
            // }

            for (const instruction of parentScene.renderPlanFor(node, {
                order: [
                    AddStyleInstruction,
                    AttachListenerInstruction,
                    AddAttributeInstruction,
                    ReplaceInterpolationInstruction
                ]
            })) {

                if (parentScene.getState(instruction)) {
                    logger?.debug('yellow', scene.debugPrefix + `Action '${instruction.action}' for Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()} already mounted. Skipping...`, instruction);
                    continue;
                }


                const executionContext = new A_ExecutionContext('AreBrowserCompiler: Mount Node Instruction');

                executionContext
                    .set('content', scene)
                // .set('element', element)
                // .set('mountPoint', mountPoint);

                const applyScope = new A_Scope({ fragments: [executionContext] }).inherit(scope);

                await instruction.apply(applyScope);

                applyScope.destroy();


                parentScene.setState(instruction);
            }
        } else {
            // ensure root identified
            const rootElement = document.getElementById(node.id);

            if (!rootElement) {
                throw new A_Error(`Root element with id '${node.id}' not found in the DOM.`);
            }

            rootElement.setAttribute('aseid', node.aseid.toString());
        }

        for (const child of scene.nodes()) {
            await child.render();
        }
    }


    @A_Feature.Extend({
        name: AreNodeFeatures.onUnmount,
        scope: [AreNode]
    })
    async unmount(
        /**
         * Node to be unmounted
         */
        @A_Inject(A_Caller) node: AreNode,
        /**
         * Node Content
         */
        @A_Dependency.Flat()
        @A_Inject(AreScene) scene: AreScene,

        @A_Inject(A_Scope) scope: A_Scope,

        /**
         * Scene where target node is registered
         * 
         * [!] For Root Node it doesn't exists
         */
        @A_Dependency.Parent()
        @A_Inject(AreScene) parentScene?: AreScene,

        @A_Inject(A_Logger) logger?: A_Logger,
    ) {

        console.log('Unmounting node <' + node.aseid.entity + '> ASEID: ' + node.aseid.toString(), parentScene);
        if (parentScene)
            for (const instruction of parentScene.renderPlanFor(node, {})) {
                scene.dropState(instruction);
                this.interpolationTextNodes.delete(instruction.aseid.toString());
            }



        for (const child of scene.nodes()) {
            await child.unmount();
        }

    }

    @A_Feature.Extend({
        name: AreSceneInstructionFeatures.Apply,
        scope: [MountNodeInstruction]
    })
    async applyMountNodeInstruction(
        @A_Inject(A_Caller) instruction: MountNodeInstruction,
        @A_Inject(A_ExecutionContext) context: A_ExecutionContext<{
            element: Element,
            mountPoint: Element,
            content: AreScene,
        }>,
        @A_Inject(AreSyntax) syntax: AreSyntax,
        @A_Inject(A_Scope) scope: A_Scope,

        @A_Inject(A_Logger) logger?: A_Logger,
    ) {
        try {


            const node = instruction.node;
            const scene = instruction.scene;


            if (syntax.isCustomNode(node)) {

                logger?.debug('red', scene.debugPrefix + `Mounting Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()} at path `);
                const wrapper = document.createElement(this.component(node, scope)?.wrapper || 'div');

                wrapper.setAttribute('aseid', node.aseid.toString());

                wrapper.innerHTML = node.template;

                const element = this.getElementByNode(node);

                // Replace the placement with the rendered content
                if (!element) {
                    this.insertElementByNode(node, wrapper);
                } else {
                    (element).replaceWith(wrapper);
                }
            }

        } catch (error) {
            logger?.error(error)
        }
    }



    @A_Feature.Extend({
        name: AreSceneInstructionFeatures.Apply,
        scope: [UnmountNodeInstruction]
    })
    async applyUnmountNodeInstruction(
        @A_Inject(A_Caller) instruction: UnmountNodeInstruction,
        @A_Inject(A_ExecutionContext) context: A_ExecutionContext<{
            element: Element,
            mountPoint: Element,
            content: AreScene,
        }>,
        @A_Inject(A_Scope) scope: A_Scope,

        @A_Inject(A_Logger) logger?: A_Logger,
    ) {

        const node = instruction.node;
        const scene = instruction.scene;
        const index = scene.scope.resolveFlat<AreIndex>(AreIndex)!;
        const element = document.querySelector(`[aseid="${node.aseid.toString()}"]`)!;
        const path = index.pathOf(node)!;

        const content = node.scope.resolveFlat<AreScene>(AreScene)!;

        logger?.debug('red', scene.debugPrefix + `Unmounting Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`);



        try {
            element.remove();

            await node.unmount();
        } catch (error) {
            logger?.error(error)
        }


        //  then we have to do shift in index, since the node is removed
        //  so if current node path is 1 then all other nodes should be moved up and next node should became 1
        // for (const child of scene.nodes()) {
        //     const childPath = index.pathOf(child)!;

        //     console.log('Comparing paths for reindexing:', childPath, path);

        //     if(parseInt(childPath) > parseInt(path)) {
        //         const newPath = (parseInt(childPath) - 1).toString();
        //         console.log('Reindexing node <' + child.aseid.entity + '> from path ' + childPath + ' to ' + newPath);
        //         index.replacePath(childPath, newPath);
        //     }
        // }
    }


    @A_Feature.Extend({
        name: AreSceneInstructionFeatures.Apply,
        scope: [AddStyleInstruction]
    })
    async applyAddStyleInstruction(
        @A_Inject(A_Caller) instruction: AddStyleInstruction,
        @A_Inject(A_ExecutionContext) context: A_ExecutionContext<{
            element: Element,
            mountPoint: Element,
            content: AreScene,
        }>,

        @A_Inject(A_Scope) scope: A_Scope,

        @A_Inject(A_Logger) logger?: A_Logger,
    ) {

        const node = instruction.node;
        const scene = instruction.scene;
        const element = this.getElementByNode(node)!;

        const styles = instruction.params?.styles || '';

        logger?.debug('green', scene.debugPrefix + `Applying styles for Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`);

        const styleElementId = `a-style-${node.aseid.entity}`;
        let styleElement = document.querySelector(`#${styleElementId}`) as HTMLStyleElement | null;

        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = styleElementId;
            document.head.appendChild(styleElement);
        }
        styleElement.innerHTML = styles;
    }



    @A_Feature.Extend({
        name: AreSceneInstructionFeatures.Apply,
        scope: [AttachListenerInstruction]
    })
    async applyAttachListenerInstruction(
        @A_Inject(A_Caller) instruction: AttachListenerInstruction,
        @A_Inject(A_ExecutionContext) context: A_ExecutionContext<{
            element: Element,
            mountPoint: Element,
            content: AreScene,
        }>,
        @A_Inject(A_Scope) scope: A_Scope,

        @A_Inject(A_Logger) logger?: A_Logger,
    ) {

        const node = instruction.node;
        const scene = instruction.scene;
        const content = context.get('content')!;

        const element = this.getElementByNode(instruction.node)!;
        const mountPoint = context.get('mountPoint')!;

        logger?.debug('green', scene.debugPrefix + `Attaching listener '${instruction.listener.name}' for target <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`);

        element.addEventListener(instruction.listener.name, instruction.callback as EventListener);
    }


    @A_Feature.Extend({
        name: AreSceneInstructionFeatures.Apply,
        scope: [AddAttributeInstruction]
    })
    async applyAddAttributeInstruction(
        @A_Inject(A_Caller) instruction: AddAttributeInstruction,
        @A_Inject(A_ExecutionContext) context: A_ExecutionContext<{
            element: Element,
            mountPoint: Element,
            content: AreScene,
        }>,
        @A_Inject(A_Scope) scope: A_Scope,

        @A_Inject(A_Logger) logger?: A_Logger,
    ) {

        const node = instruction.node;
        const scene = instruction.scene;
        const content = context.get('content')!;

        const element = this.getElementByNode(node)!;

        logger?.debug('green', scene.debugPrefix + `Setting attribute '${instruction.name}'='${instruction.value}' for target <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`, element);

        element.setAttribute(instruction.name, instruction.value);
    }



    interpolationTextNodes: Map<string, Text> = new Map();

    @A_Feature.Extend({
        name: AreSceneInstructionFeatures.Apply,
        scope: [ReplaceInterpolationInstruction]
    })
    async applyReplaceInterpolationInstruction(
        @A_Inject(A_Caller) instruction: ReplaceInterpolationInstruction,
        @A_Inject(A_ExecutionContext) context: A_ExecutionContext<{
            element: Element,
            mountPoint: Element,
            content: AreScene,
        }>,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreSyntax) syntax: AreSyntax,

        @A_Inject(A_Logger) logger?: A_Logger,
    ) {

        const node = instruction.node;
        const scene = instruction.scene;
        const element = this.getElementByNode(node)!;

        logger?.debug('magenta', scene.debugPrefix + `Replacing interpolation '${instruction.interpolation.name}' with value '${instruction.value}' for target <${node.aseid.entity}>`);

        const textNode = this.interpolationTextNodes.get(instruction.aseid.toString());

        if (textNode) {
            textNode.nodeValue = instruction.value;
        } else {

            const treeTextNodesWalker = document.createTreeWalker(
                element,
                NodeFilter.SHOW_TEXT,
                {
                    acceptNode: (node) => {
                        if (node.nodeValue && node.nodeValue.includes(instruction.interpolation.raw)) {
                            return NodeFilter.FILTER_ACCEPT;
                        }
                        return NodeFilter.FILTER_REJECT;
                    }
                },
            );

            const foundNode = treeTextNodesWalker.nextNode() as Text | null;


            //  then I have to split this node into multiple text nodes
            if (foundNode) {
                const parts = foundNode.nodeValue!.split(instruction.interpolation.raw);

                const parent = foundNode.parentNode;

                if (parent) {
                    for (let i = 0; i < parts.length; i++) {
                        const part = parts[i];

                        if (part) {
                            const textNodePart = document.createTextNode(part);
                            parent.insertBefore(textNodePart, foundNode);
                        }

                        if (i < parts.length - 1) {
                            const valueNode = document.createTextNode(instruction.value);
                            parent.insertBefore(valueNode, foundNode);

                            // store reference to this text node for future updates
                            this.interpolationTextNodes.set(instruction.aseid.toString(), valueNode);
                        }
                    }

                    // remove the original node
                    parent.removeChild(foundNode);
                }
            }
        }
    }









    @A_Feature.Extend({
        name: AreSceneInstructionFeatures.Init,
        scope: [AddDirectiveInstruction]
    })
    async initAddDirectiveInstruction(
        @A_Inject(A_Caller) instruction: AddDirectiveInstruction,

        @A_Inject(A_Scope) scope: A_Scope,

        @A_Inject(A_Logger) logger?: A_Logger,
    ) {
        console.log('INIT DIRECTIVE INSTRUCTION: ', instruction);

        const node = instruction.node;
        const scene = node.scope.resolveFlat<AreScene>(AreScene)!;
        const parentScene = instruction.scene;

        logger?.debug('green', scene.debugPrefix + `Initializing directive '${instruction.directive.name}' for Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`, scene, parentScene);


        switch (instruction.directive.name) {
            case '$if': {
                const mountInstruction = new MountNodeInstruction(node, scene.path);
                const unmountInstruction = new UnmountNodeInstruction(node, scene.path);


                switch (true) {
                    case !instruction.value && !!parentScene.getState(mountInstruction):
                        parentScene.unPlan(mountInstruction);

                        parentScene.plan(unmountInstruction);
                        parentScene.dropState(unmountInstruction);

                        break;
                    case !instruction.value && !parentScene.getState(mountInstruction):

                        parentScene.unPlan(mountInstruction);

                        break;
                    case instruction.value && !!parentScene.getState(unmountInstruction):

                        parentScene.unPlan(unmountInstruction);

                        parentScene.plan(mountInstruction);
                        parentScene.dropState(mountInstruction);
                        break;
                    case instruction.value && !parentScene.getState(unmountInstruction):

                        parentScene.unPlan(unmountInstruction);
                        break;
                    default:
                        break;
                }

                break;
            }
            default:
                logger?.warning('yellow', scene.debugPrefix + `Unknown directive '${instruction.directive.name}' for Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`);
        }




        // Directives may have async initialization logic in future
    }


    @A_Feature.Extend({
        name: AreSceneInstructionFeatures.Apply,
        scope: [AddDirectiveInstruction]
    })
    async applyAddDirectiveInstruction(
        @A_Inject(A_Caller) instruction: AddDirectiveInstruction,
        @A_Inject(A_ExecutionContext) context: A_ExecutionContext<{
            element: Element,
            mountPoint: Element,
            content: AreScene,
        }>,
        @A_Inject(A_Scope) scope: A_Scope,

        @A_Inject(A_Logger) logger?: A_Logger,
    ) {

        const node = instruction.node;
        const scene = instruction.scene;
        const element = this.getElementByNode(node);

        try {

            logger?.debug('green', scene.debugPrefix + `Applying directive '${instruction.directive.name}' for Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`, instruction);

            // switch (instruction.directive.name) {
            //     case '$if': {
            //         if (!instruction.value && element) {
            //             element.replaceWith(document.createComment(`$if directive removed node <${node.aseid.entity}>`));
            //         }
            //         break;
            //     }
            //     default:
            //         logger?.warning('yellow', scene.debugPrefix + `Unknown directive '${instruction.directive.name}' for Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`);
            // }

            // Directive application logic goes here
        } catch (error) {
            logger?.error(error)
        }
    }

}