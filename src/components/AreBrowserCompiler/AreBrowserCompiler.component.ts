import { AreNode } from "@adaas/are/entities/AreNode/AreNode.entity";
import { AreIndex } from "@adaas/are/context/AreIndex/AreIndex.context";
import { A_Config, A_Logger, A_Polyfill, A_Schedule, A_ScheduleObject, A_ServiceFeatures, A_SignalVector, A_SignalVectorFeatures } from "@adaas/a-utils";
import { A_Caller, A_CommonHelper, A_Component, A_Container, A_Dependency, A_Error, A_Feature, A_FormatterHelper, A_Inject, A_Scope, A_TYPES__EntityFeatures } from "@adaas/a-concept";
import { AreNodeFeatures } from "@adaas/are/entities/AreNode/AreNode.constants";
import { AreStore } from "@adaas/are/context/AreStore/AreStore.context";
import { AreProps } from "@adaas/are/context/AreProps/AreProps.context";
import { Are } from "../AreComponent/Are.component";
import { AreCompiler } from "../AreCompiler/AreCompiler.component";
import { AreScene } from "@adaas/are/context/AreScene/AreScene.context";
import { AreEvent } from "@adaas/are/context/AreEvent/AreEvent.context";
import { AreSyntax } from "@adaas/are/context/AreSyntax/AreSyntax.context";
import { AreInitSignal } from "src/signals/AreInit.signal";
import { AreSceneAction } from "@adaas/are/entities/AreSceneAction/AreSceneAction.entity";

/**
 * Browser DOM specific scene implementation
 * Handles all browser/DOM related operations and provides web-specific compilation logic
 */
export class AreBrowserCompiler extends AreCompiler {


    @A_Feature.Extend()
    protected async [A_ServiceFeatures.onBeforeLoad](
        @A_Dependency.Parent()
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreScene) root?: AreScene,
        @A_Inject(A_Config) config?: A_Config<any>,
        @A_Inject(A_Logger) logger?: A_Logger,
    ): Promise<void> {
        // 1) Initialize Scene if not present
        logger?.debug('cyan', `Initializing AreScene in AreBrowserCompiler...`);
        const mountPointID = config?.get('ARE_MOUNT_POINT') || 'are-app';

        if (!root) {
            const mountPointElement = document.getElementById(mountPointID);

            if (!mountPointElement) {
                throw new Error(`Mount point with id '${mountPointID}' not found in the DOM.`);
            }

            scope.register(new AreScene(mountPointID, mountPointElement.innerHTML));
            scope.register(new AreIndex(mountPointID));


            await this.buildSceneIndex(scope.resolve<AreScene>(AreScene)!);
        }

    }




    protected counter = 0

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

        this.debug(node, `Compiling node <${node.aseid.entity}> in Scene <${parentScene.name}>`);


        // 1) first Deal WIth interpolations - replace them with wrapped Nodes 
        if (node.aseid.entity !== 'are-interpolation')
            for (const interpolation of syntax.extractInterpolations(node.template)) {
                node.template = syntax.replaceInterpolation(node.template, interpolation,
                    `<are-interpolation :value="${interpolation.name}"></are-interpolation>`
                );
            }

        let template = node.template || '';
        let styles = node.styles || '';



        // 1) extract all props from the markup and set them in the props store
        for (const attr of syntax.extractAttributes(node.markup)) {
            const name = attr.name;
            const value = (syntax.isBindingProp(attr) ?
                store.get(attr.value) || parentStore.get(attr.value)
                : attr.value) || '';

            props.set(name, value);

            parentScene.plan(new AreSceneAction({
                id: [attr, node],
                action: 'attribute',
                node,
                params: { name, value }
            }));
        }

        // 3a) Process directives first before other operations
        for (const directive of syntax.extractDirectives(node.markup)) {
            let directiveValue: any;

            // Get the directive value from store or props
            if (directive.value) {
                directiveValue = store.get(directive.value) || props.get(directive.value);
            }



            parentScene.plan(new AreSceneAction({
                id: [directive, node],
                action: 'directive',
                node,
                params: { directive, value: directiveValue }
            }));

        }

        const mountAction = new AreSceneAction({
            id: ['mount', node],
            action: 'mount',
            node,
            params: {}
        })

        if (!parentScene.isPlanned(mountAction)) {
            scene?.debug('red', `AreCompiler: Building Scene Index for <${scene.name}> during compilation of Node <${node.aseid.entity}>`);

            await scene.reset(template);
            await this.buildSceneIndex(scene);

            parentScene.plan(mountAction);
        }

        // 2) replace all style interpolations in the styles
        for (const interpolation of syntax.extractInterpolations(styles)) {
            const value = store.get(interpolation.name);

            styles = syntax.replaceInterpolation(styles, interpolation, value);
        }
        if (styles.trim())
            parentScene.plan(new AreSceneAction({
                id: [styles, node],
                action: 'style',
                node,
                params: { styles }
            }));

        // 3) go through all listeners and register them in the scene
        for (const listener of syntax.extractListeners(node.markup)) {


            const targetNode = parentScene.scope.parent?.resolve<AreNode>(AreNode, {
                query: {
                    aseid: parentScene.name
                }
            }) as any;

            const callback = async (e) => {
                const newEvent = new AreEvent(listener.handler, {
                    event: listener.name,
                    data: e
                })

                await targetNode.emit(newEvent);

            }

            parentScene.plan(new AreSceneAction({
                id: [node, listener],
                action: 'listener',
                node,
                params: {
                    listener, callback
                }
            }))
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
     * Updates the AreNode
     */
    @A_Feature.Extend({
        name: AreNodeFeatures.onUpdate,
        scope: [AreNode]
    })
    async update(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreScene) scene: AreScene,

        @A_Inject(A_Logger) logger?: A_Logger,
    ) {
        logger?.debug('red',
            ' ',
            `AreBrowserCompiler: Updating Node <${node.aseid.entity}> in Scene <${scene.name}>`,
            ' '
        );

        await node.compile();

        logger?.debug('red',
            ' ',
            `AreBrowserCompiler: Node <${node.aseid.entity}> updated successfully.`,
            ' '
        );

        //  And then re-mount the parent scene
        // because current scene is a current node - content

        await node.mount();

        logger?.debug('red',
            ' ',
            `AreBrowserCompiler: Scene <${scene.name}> mounted successfully after Node <${node.aseid.entity}> update.`,
            ' '
        );
    }




    @A_Feature.Extend({
        name: A_TYPES__EntityFeatures.DESTROY,
        scope: [AreNode]
    })
    async destroy() {

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
    ): Element | null {
        if (!path) {
            return root;
        }

        const indices = path.split('.').map(index => parseInt(index, 10));
        let current: Element | null = root;

        for (const index of indices) {
            if (!current) {
                return null;
            }

            // Get only element children (not text nodes, comments, etc.)
            const elementChildren = Array.from(current.children).filter(child => child.nodeType === Node.ELEMENT_NODE);

            if (index >= elementChildren.length) {
                return null;
            }

            current = elementChildren[index] as Element;
        }

        return current;
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


    buildSceneIndex(
        scene: AreScene,
    ) {
        // Use a position-based approach that maps DOM paths to original markup exactly
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = scene.template;

        // Create a mapping of DOM paths to original markup using DOM traversal
        const markupMap = this.createPositionBasedMarkupMap(scene.template);

        this.indexElementsFromDOM(tempDiv, scene, [], markupMap);
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
            if (element.children.length > 0) {
                this.mapDOMPositions(element, currentPath, markupMap);
            }
        }
    }

    /**
     * Index elements using actual DOM structure with position-based markup mapping
     */
    private indexElementsFromDOM(
        parentElement: Element,
        scene: AreScene,
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
                scope: scene.name,
                component: element.tagName.toLowerCase(),
                markup: originalMarkup || element.outerHTML,
            });

            // Add to scene index
            scene.index.add(areNode, currentPath.join('.'));

            // Recursively process children
            if (element.children.length > 0) {
                this.indexElementsFromDOM(element, scene, currentPath, markupMap);
            }
        }
    } @A_Feature.Extend({
        name: AreNodeFeatures.onMount,
        scope: [AreNode]
    })
    async mount(
        /**
         * Node to be mounted
         */
        @A_Inject(A_Caller) node: AreNode,
        /**
         * Node Content
         */
        @A_Dependency.Flat()
        @A_Inject(AreScene) scene: AreScene,

        /**
         * Scene where target node is registered
         */
        @A_Dependency.Parent()
        @A_Inject(AreScene) parentScene: AreScene,

        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreSyntax) syntax: AreSyntax,

        @A_Inject(A_Logger) logger?: A_Logger,
    ) {

        const mountPoint = document.getElementById(parentScene.id!) || document.querySelector(`[aseid="${parentScene.id}"]`);

        if (!mountPoint) {
            throw new A_Error(`Mount point with id '${parentScene.id}' not found in the DOM.`);
        }



        for (const action of parentScene.renderPlanFor(node, {
            order: ['mount', 'style', 'listener', 'attribute', 'directive']
        })) {
            if (parentScene.isMounted(action)) {
                scene.debug('yellow', `Action '${action.name}' for Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()} already mounted. Skipping...`);
                continue;
            }

            const path = parentScene.index.pathOf(node)!;
            const element = this.getElementByPath(mountPoint, path);

            scene.debug('red', `Mounting action '${action.name}' for Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()} at path '${path}'`);

            if (!element) {
                throw new A_Error(`Element at path '${path}' not found in the mount point.`);
            }
            switch (action.name) {
                case 'mount': {
                    if (syntax.isCustomNode(node)) {

                        scene.debug('red', `Mounting Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()} at path '${path}'`);
                        const wrapper = document.createElement(this.component(node, scope)?.wrapper || 'div');

                        wrapper.setAttribute('aseid', node.aseid.toString());

                        wrapper.innerHTML = scene.template;

                        // Replace the placement with the rendered content
                        (element).replaceWith(wrapper);
                    }
                    break;
                }
                case 'style': {
                    const styles = action.params?.styles;

                    const styleElementId = `a-style-${node.aseid.entity}`;
                    let styleElement = document.querySelector(`#${styleElementId}`) as HTMLStyleElement | null;

                    if (!styleElement) {
                        styleElement = document.createElement('style');
                        styleElement.id = styleElementId;
                        document.head.appendChild(styleElement);
                    }
                    styleElement.innerHTML = styles;
                    break;
                }

                case 'listener': {
                    const listener = action.params?.listener;
                    const callback = action.params?.callback;

                    if (listener && callback) {

                        scene.debug('green', `Mounting listener '${listener.name}' for target <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`);

                        element.addEventListener(listener.name, callback as EventListener);
                    }
                    break;
                }
                case 'attribute': {
                    const name = action.params?.name;
                    const value = action.params?.value;

                    if (name) {
                        // scene.debug('green', `Setting attribute '${name}'='${value}' for target <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`);

                        element.setAttribute(name, value);
                    }
                    break;
                }
                case 'directive':
                    // Directives are already processed during compilation
                    break;
                default:
                    break;
            }


            if (node.type !== 'are-interpolation' && action.name === 'mount')
                parentScene.mount(action)
        }

        for (const child of scene.nodes()) {

            await child.mount();
        }

    }



    @A_Feature.Extend({
        name: A_SignalVectorFeatures.Next
    })
    async renderScene(
        @A_Inject(A_Caller) vector: A_SignalVector<[AreInitSignal]>,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(A_Logger) logger: A_Logger,
        @A_Inject(AreSyntax) syntax: AreSyntax,
    ) {
        try {
            logger?.debug('red',
                ' ',
                `AreCompiler: Rendering Scene <${scene.name}>`,
                ' '
            );

            for (const newNode of scene.nodes()) {

                console.log('\n===============================\n\nWTF??? ', newNode, scene, '\n\n===============================\n');

                scene.attach(newNode);

                await newNode.load();

                await newNode.compile();

                await newNode.mount();

                console.log('\n===============================\n\nMounted Node ', newNode, scene, '\n\n===============================\n');
            }

        } catch (error) {
            logger.error(error);
        }

    }
}