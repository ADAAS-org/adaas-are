import { AreNode } from "@adaas/are/entities/AreNode/AreNode.entity";
import { AreIndex } from "@adaas/are/context/AreIndex/AreIndex.context";
import { A_Config, A_Logger, A_Polyfill, A_ServiceFeatures, A_SignalVector, A_SignalVectorFeatures } from "@adaas/a-utils";
import { A_Caller, A_Component, A_Container, A_Dependency, A_Feature, A_FormatterHelper, A_Inject, A_Scope, A_TYPES__EntityFeatures } from "@adaas/a-concept";
import { AreNodeFeatures } from "@adaas/are/entities/AreNode/AreNode.constants";
import { AreStore } from "@adaas/are/context/AreStore/AreStore.context";
import { AreProps } from "@adaas/are/context/AreProps/AreProps.context";
import { Are } from "../AreComponent/Are.component";
import { AreCompiler } from "../AreCompiler/AreCompiler.component";
import { AreScene } from "@adaas/are/context/AreScene/AreScene.context";
import { AreEvent } from "@adaas/are/context/AreEvent/AreEvent.context";
import { AreSyntax } from "@adaas/are/context/AreSyntax/AreSyntax.context";
import { AreInitSignal } from "src/signals/AreInit.signal";

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
         * Global Syntax Definition for parsing markup
         */
        @A_Inject(AreSyntax) syntax: AreSyntax,
        /**
         * Scope of the Compilation Feature - actually the AreNode scope
         */
        @A_Inject(A_Scope) scope: A_Scope,

        @A_Inject(AreProps) props: AreProps,
        @A_Inject(AreStore) store: AreStore,
        /**
         * Parent Scene where the node is registered
         */
        @A_Dependency.Parent()
        @A_Inject(AreScene) parentScene: AreScene,
        @A_Dependency.Parent()
        @A_Inject(AreStore) parentStore: AreStore,
        /**
         * Nodes owned Scene
         * 
         * [!] Note, not every node has a scene - e.g. if it's not a custom component
         */
        @A_Dependency.Flat()
        @A_Inject(AreScene) scene?: AreScene,


        @A_Inject(A_Logger) logger?: A_Logger,
    ) {

        this.debug(node, `Compiling node <${node.aseid.entity}> in Scene <${parentScene.name}>`);

        if (!scene)
            return;

        if (!this.component(node, scope)) {
            this.debug(node, `Node <${node.aseid.entity}> is not a registered component. Skipping compilation.`);
            return;
        }


        // 1) first Deal WIth interpolations - replace them with wrapped Nodes 
        if (node.aseid.entity !== 'are-interpolation')
            for (const interpolation of syntax.extractInterpolations(node.template)) {
                node.template = syntax.replaceInterpolation(node.template, interpolation,
                    `<are-interpolation :value="${interpolation.name}"></are-interpolation>`
                );
            }

        /**
         * Markup is the raw placement with all bindings and events
         * Example: `<custom-component :prop="value"> <div>Inner Content</div> </custom-component>`
         * 
         * Template is target replacement string where all bindings should go in place
         * Example: `<div> <h2>{{Interpolation}}</h2> <a-slot/> </div>`
         * 
         * Styles is the raw styles string with all bindings
         * Example: `
         *      h2 {
         *          color: {{titleColor}};
         *      }
         *  `
         * 
         * 
         * Then we need to:
         */

        let template = node.template || '';
        let styles = node.styles || '';



        if (scene && !scene.rendered) {
            logger?.debug('red',
                `${' - '.repeat(scene.depth)}` +
                `AreCompiler: Building Scene Index for <${scene.name}> during compilation of Node <${node.aseid.entity}>`,
            );

            await scene.reset(template);
            await this.buildSceneIndex(scene);
        }


        // 1) extract all props from the markup and set them in the props store
        for (const prop of syntax.extractProps(node.markup)) {
            const name = syntax.extractPropName(prop);
            const value = syntax.extractPropValue(prop, parentStore)

            logger?.log('green',
                `${' - '.repeat(scene ? scene.depth : 0)}` +
                `[Compile -> ADD -> Prop] '${name}' in component <${node.aseid.entity}> with value = ${value}`
            );

            props.set(name, value);
        }


        // 2) replace all style interpolations in the styles
        for (const interpolation of syntax.extractInterpolations(styles)) {
            const value = store.get(interpolation.name);

            styles = syntax.replaceInterpolation(styles, interpolation, value);
        }



        await scene.addStyles(node, styles);


        // 3) go through ONLY non-custom component nodes and find bindings and events
        for (const sceneNode of scene.nodes()) {

            if (syntax.isCustomNode(sceneNode)) {

                const existed = scene.scope.resolveFlat<AreNode>(AreNode, {
                    query: {
                        aseid: sceneNode.aseid
                    }
                })

                if (!existed) {
                    logger?.debug('green',
                        `${' - '.repeat(scene.depth)}` +
                        `[Compile -> ADD -> Component] Attaching custom component <${sceneNode.aseid.entity}> ASEID: ${sceneNode.aseid.toString()} to Scene <${scene.name}>`
                    );

                    scene.attach(sceneNode)

                    await sceneNode.load();
                }

                await sceneNode.compile();

                continue;
            }


            for (const interpolation of syntax.extractInterpolations(sceneNode.markup)) {
                const value = store.get(interpolation.name) || props.get(interpolation.name);

                await scene.bind(sceneNode, interpolation.name, value);

                logger?.debug('green',
                    `${' - '.repeat(scene.depth)}` +
                    `[Compile -> ADD -> Binding] '${interpolation.name}' with value '${value}' in component <${node.aseid.entity}> for element <${sceneNode.aseid.entity}> ASEID : ${sceneNode.aseid.toString()}; hashes:[${scene.computeHash(sceneNode)}::${scene.getHash(sceneNode)}]`);
            }

            // 3b) extract all listeners and register them in the scene


            for (const listeners of syntax.extractListeners(sceneNode.markup)) {

                await scene.addListener(listeners.name, listeners.handler, node, sceneNode);

                // this.debug(sceneNode, `[Compile -> ADD -> Listener] '${listeners.name}' with handler '${listeners.handler}' in component <${node.aseid.entity}> for element <${sceneNode.aseid.entity}> ASEID '${sceneNode.aseid.toString()}'`);
            }

        }




        this.debug(node, `Node <${node.aseid.entity}> compiled successfully.`);
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
        await this.mountScene(scene);

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


    getElementBypath(
        root: Element,
        path: string
    ): Element | null {
        const indices = path.split('.').map(index => parseInt(index, 10));
        let current: Node | null = root;

        for (const index of indices) {
            // only element nodes
            const elementChildren = Array.from(current.childNodes).filter(n => (n as any).nodeType === Node.ELEMENT_NODE);
            current = elementChildren[index];
            if (!current) {
                return null;
            }
        }

        return current as Element;
    }


    buildSceneIndex(
        scene: AreScene,
    ) {
        const virtual = new DOMParser().parseFromString(scene.template, 'text/html');

        const walker = document.createTreeWalker(virtual.body, NodeFilter.SHOW_ELEMENT);

        let current: Node | null = walker.nextNode();

        while (current) {

            const path: string = this.computePath(current, virtual.body);

            const areNode = new AreNode({
                scope: scene.name,
                component: current && (current as Element).tagName ? (current as Element).tagName.toLowerCase() : 'text-node',
                markup: current instanceof Element ? current.outerHTML : current.textContent || '',
            });

            scene.index.add(areNode, path);

            current = walker.nextNode();
        }
    }




    async mountScene(
        scene: AreScene,
        mountPointElement?: Element | null,
    ): Promise<Element> {
        const syntax = scene.scope.resolve<AreSyntax>(AreSyntax)!;
        const logger = scene.scope.resolve<A_Logger>(A_Logger)!;

        logger.debug('cyan',
            `${' - '.repeat(scene.depth)}` + `AreBrowserCompiler: Mounting Scene <${scene.name}>`,
        );

        if (!mountPointElement)
            mountPointElement = document.getElementById(scene.id!) || document.querySelector(`[aseid="${scene.id}"]`);

        if (!mountPointElement) {
            throw new Error(`Mount point with id '${scene.id}' not found in the DOM.`);
        }


        const walker = document.createTreeWalker(mountPointElement, NodeFilter.SHOW_ELEMENT);

        let current: Node | null = walker.nextNode();

        const treeWalkerStack: Map<Node, string> = new Map();

        while (current) {
            const path: string = this.computePath(current, mountPointElement);

            if (path) {
                treeWalkerStack.set(current, path);
            }

            current = walker.nextNode();
        }


        for (const [current, path] of treeWalkerStack) {


            const node = scene.index.nodeOf(path)!;

            logger.debug('cyan', `${' - '.repeat(scene.depth)}` + `[${path}] - CURRENT NODE: ${(current as Element).tagName.toLowerCase()} :: MAPPED ASEID: ${node ? node.aseid.toString() : 'NOT FOUND IN INDEX'}`);

            if (!node)
                continue;



            if (!scene.hasChangesFor(node)) {
                logger.debug('magenta',
                    `${' - '.repeat(scene.depth)}` + `[${path}] - NO CHANGES DETECTED FOR NODE <${node.aseid.entity}>. aseid: ${node.aseid.toString()} SKIPPING MOUNTING. hashes: [${scene.computeHash(node)}::${scene.getHash(node)}]`
                );
                continue;
            }

            logger.debug('green', `${' - '.repeat(scene.depth)}` + `[${path}] - MOUNTING NODE <${node.aseid.entity}>`);


            const wrapper = document.createElement('div');
            wrapper.setAttribute('aseid', node.aseid.toString());

            const nodeScene = node.scope.resolve<AreScene>(AreScene)!;

            if (nodeScene) {
                wrapper.innerHTML = nodeScene.template;

                // 2 ) update styles
                const styles = await nodeScene.getStyles(node);

                if (styles) {
                    const styleElementId = `a-style-${node.aseid.entity}`;
                    let styleElement = document.querySelector(`#${styleElementId}`) as HTMLStyleElement | null;

                    if (!styleElement) {
                        styleElement = document.createElement('style');
                        styleElement.id = styleElementId;
                        document.head.appendChild(styleElement);
                    }
                    styleElement.innerHTML = styles;
                }

                const build = await this.mountScene(nodeScene, wrapper);

                // Replace the placement with the rendered content
                wrapper.replaceChildren(...Array.from(build.childNodes));

                // Replace the placement with the rendered content
                (current as Element).replaceWith(wrapper);
            }

            //  3) update listeners
            const eventMap = await scene.getListeners(node);
            if (eventMap) {
                for (const [event, handlers] of eventMap.entries()) {
                    for (const handler of handlers) {
                        current.addEventListener(event, handler as EventListener);
                    }
                }
            }

            // 4) update bindings
            const bindingsMap = await scene.getBindings(node);
            if (bindingsMap) {
                console.log('bindingsMap', bindingsMap);
                for (const [name, value] of bindingsMap.entries()) {
                    // for (const value of values) {

                    console.log('Binding', name, 'with value', value, 'on node', node.aseid.toString(), syntax.replaceInterpolation(
                        (current as Element).innerHTML,
                        name,
                        value
                    ));

                    (current as Element).innerHTML = syntax.replaceInterpolation(
                        (current as Element).innerHTML,
                        name,
                        value
                    );
                    // }
                }
            }

            // 5) mount nested custom components and keep it state
            await scene.mount(node);

            logger.log('green', `${' - '.repeat(scene.depth)}` + `[${path}] - NODE <${node.aseid.entity}> MOUNTED SUCCESSFULLY. hashes: [${scene.computeHash(node)}::${scene.getHash(node)}]`);
        }

        logger.debug('cyan',
            `${' - '.repeat(scene.depth)}` + `AreBrowserCompiler: Scene <${scene.name}> mounted successfully.`,
        );


        await scene.render();

        return mountPointElement;
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

            // const updateSignal = vector.get(AreUpdateSignal);


            // console.log('updateSignal', updateSignal);
            // console.log('Node', updateSignal?.node);
            // console.log('Scene', scene);


            // if (updateSignal) {
            //     // for (const newNode of scene.parent?.nodes(n=>n.aseid.toString() === scene.id) || []) {

            //     await updateSignal.node.compile();

            //     // }
            //     // if (scene.parent)
            //     await this.mountScene(scene.parent);

            // }
            // else {
            for (const newNode of scene.nodes(syntax.isCustomNode.bind(syntax))) {
                scene.attach(newNode);

                await newNode.load();

                await newNode.compile();

            }

            logger?.debug('red',
                ' ',
                `AreCompiler: Mounting Scene <${scene.name}>`,
                ' '
            );

            await this.mountScene(scene);

            logger?.debug('red',
                ' ',
                `AreCompiler: Scene <${scene.name}> rendered successfully.`,
                ' '
            );
            // }


        } catch (error) {
            logger.error(error);
        }

    }
}