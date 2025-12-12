import { AreNode } from "@adaas/are/entities/AreNode/AreNode.entity";
import { AreIndex } from "@adaas/are/context/AreIndex/AreIndex.context";
import { A_Config, A_Logger, A_Polyfill, A_ServiceFeatures } from "@adaas/a-utils";
import { A_Caller, A_Component, A_Container, A_Dependency, A_Feature, A_FormatterHelper, A_Inject, A_Scope, A_TYPES__EntityFeatures } from "@adaas/a-concept";
import { AreNodeFeatures } from "@adaas/are/entities/AreNode/AreNode.constants";
import { AreStore } from "@adaas/are/context/AreStore/AreStore.context";
import { AreProps } from "@adaas/are/context/AreProps/AreProps.context";
import { AreBrowserDom } from "@adaas/are/context/AreBrowserDom/AreBrowserDom.context";
import { Are } from "../AreComponent/Are.component";
import { AreCompiler } from "../AreCompiler/AreCompiler.component";
import { AreScene } from "@adaas/are/context/AreScene/AreScene.context";
import { AreEvent } from "@adaas/are/context/AreEvent/AreEvent.context";

/**
 * Browser DOM specific scene implementation
 * Handles all browser/DOM related operations and provides web-specific compilation logic
 */
export class AreBrowserCompiler extends AreCompiler {


    @A_Feature.Extend()
    protected async [A_ServiceFeatures.onBeforeLoad](
        @A_Dependency.Parent()
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreBrowserDom) root?: AreBrowserDom,
        @A_Inject(AreIndex) index?: AreIndex,
        @A_Inject(A_Config) config?: A_Config<any>,
        @A_Inject(A_Logger) logger?: A_Logger,
    ): Promise<void> {
        // 1) Initialize Scene if not present
        logger?.debug('cyan', `Initializing AreBrowserDom in AreBrowserCompiler...`);
        const mountPoint = config?.get('ARE_MOUNT_POINT') || 'are-app';

        if (!root) {

            scope.register(new AreBrowserDom(mountPoint));
        }

        if (!index) {
            scope.register(new AreIndex(mountPoint));
        }
    }

    protected STANDARD_HTML_TAGS = new Set([
        "html", "head", "body", "div", "span", "p", "a", "ul", "ol", "li",
        "table", "thead", "tbody", "tr", "td", "th", "form", "input", "button",
        "select", "option", "textarea", "label", "img", "h1", "h2", "h3", "h4",
        "h5", "h6", "script", "style", "link", "meta", "nav", "footer", "header",
        "section", "article", "aside", "main", "canvas", "video", "audio", "br",
        "hr", "strong", "em", "small", "pre", "code", "iframe", "details",
        "summary", "svg", "path", "circle", "rect", "polygon", "g", "defs"
    ]);

    /**
     * Determines if a tag is a custom component or standard HTML
     * 
     * @param node 
     * @returns 
     */
    isCustomComponent(node: AreNode): boolean {
        return !this.STANDARD_HTML_TAGS.has(node.aseid.entity.toLowerCase());
    }

    *extractInterpolations(template: string): Iterable<string> {
        const interpolationRegex = /{{\s*([\w.]+)\s*}}/g;
        let match: RegExpExecArray | null;

        while ((match = interpolationRegex.exec(template)) !== null) {
            yield match[1];
        }
    }

    *extractProps(template: string): Iterable<{ name: string; raw: string; value: string }> {
        // Extract attributes from the tag
        const attrRegex = /([a-zA-Z0-9:@][a-zA-Z0-9:._-]+)\s*=\s*"(.*?)"/g;
        let attrMatch: RegExpExecArray | null;

        while ((attrMatch = attrRegex.exec(template)) !== null) {
            const raw = attrMatch[0];
            const name = attrMatch[1];
            const value = attrMatch[2];
            yield { name, raw, value };
        }
    }

    *extractEvents(template: string): Iterable<{ name: string; raw: string; handler: string }> {
        // Extract event listeners from the tag
        const eventRegex = /@([a-zA-Z0-9:_-]+)\s*=\s*"(.*?)"/g;
        let eventMatch: RegExpExecArray | null;

        while ((eventMatch = eventRegex.exec(template)) !== null) {
            const raw = eventMatch[0];
            const name = eventMatch[1];
            const handler = eventMatch[2];
            yield { name, raw, handler };
        }
    }

    // ==================================================================================
    // ========================= COMPONENT METHODS =======================================
    // ==================================================================================
    @A_Feature.Extend({
        name: A_TYPES__EntityFeatures.LOAD,
        scope: [AreNode]
    })
    /**
     * Uses to Load AreNode definitions or other necessary resources
     */
    async load(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(A_Scope) scope: A_Scope,
    ) {
        this.debugLogger(scene, `Loading component <${node.aseid.entity}> with ${this.constructor.name}`);

        scope.register(new AreBrowserDom(node.aseid.id));
        await super.load(node, scene, scope,);
    }


    @A_Feature.Extend({
        name: AreNodeFeatures.onEvent,
        scope: [AreNode]
    })
    async event(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreEvent) event: AreEvent
    ) {

        const component = scope.resolve<Are>(A_FormatterHelper.toPascalCase(node.aseid.entity));

        await component?.call(event.name, scope)
    }

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
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreScene) scene: AreScene,

        @A_Dependency.Parent()
        @A_Inject(AreScene) parentScene: AreScene,

        @A_Dependency.Parent()
        @A_Inject(AreStore) parentStore: AreStore,

        @A_Inject(AreProps) props: AreProps,

        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Logger) logger: A_Logger,
    ) {
        this.debugLogger(scene, `Compiling node with AreBrowserCompiler in Scene <${scene.name}>`);


        let template = node.template || '';
        let styles = node.styles || '';

        for (const prop of this.extractProps(node.markup)) {

            switch (true) {

                // 1) Prop is a string binding
                case prop.name.startsWith(':') && prop.value.startsWith('\'') && prop.value.endsWith('\''):
                    // String binding
                    props.set(prop.name.slice(1), prop.value.slice(1, -1));
                    break;

                case prop.name.startsWith(':') && !(prop.value.startsWith('\'') && prop.value.endsWith('\'')):
                    // Dynamic binding (for now only string literals are supported)
                    // In future it should support expressions and data paths
                    const dynamicValue = parentStore?.get(prop.value);

                    props.set(prop.name.slice(1), dynamicValue);

                    break;

                // // 2) Event listener
                // case prop.name.startsWith('@'):
                //     // Event listener
                //     const eventName = prop.name.slice(1);
                //     const handlerName = prop.value;


                //     console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Adding listener:', eventName, '->', handlerName);

                //     await scene.addListener(eventName, handlerName, node);

                //     break;

                // 3) Standard property

                default:
                    props.set(prop.name, prop.value);
                    break;
            }

            logger.debug('red', `Setting property '${prop.name}' with value '${prop.value}' in component <${node.aseid.entity}>`);
        }

        // 1) replace all interpolations in the template


        // 2) replace all style interpolations in the styles
        for (const interpolation of this.extractInterpolations(styles)) {
            const value = store.get(interpolation);

            styles = styles.replace(new RegExp(`{{\\s*${interpolation}\\s*}}`, 'g'), value !== undefined ? String(value) : '');
        }

        // 3) Apply styles to the document head


        /**
         * A place in scene where this node is located
         */
        await scene.reset(template);

        await scene.addStyles(node, styles);

        // await scene.styles(styles);
        for (const element of scene) {

            const children = await scene.childrenOf(element);

            //  1) ensure that we only process leaf nodes (no children) and non-custom components
            if (children.length > 0 || this.isCustomComponent(element))
                continue;


            for (const prop of this.extractProps(element.markup)) {

            }

            for (const interpolation of this.extractInterpolations(element.markup)) {
                const [target, property] = interpolation.split('.');
                let value: any;

                switch (target) {
                    case 'props':
                        value = props.get(property);
                        break;
                    case 'data':
                        value = store.get(property);
                        break;
                    default:
                        //  Try props first, then store
                        value = props.get(interpolation) || store.get(interpolation);
                        break;
                }

                template = element.markup.replace(new RegExp(`{{\\s*${interpolation}\\s*}}`, 'g'), value !== undefined ? String(value) : '');

                template = template.replace(element.markup, template);
            }



            for (const listeners of this.extractEvents(element.markup)) {

                await scene.addListener(listeners.name, listeners.handler, node, element);

                this.debugLogger(scene, `[Compile -> ADD -> Listener] '${listeners.name}' with handler '${listeners.handler}' in component <${node.aseid.entity}> for element <${element.aseid.entity}> ASEID '${element.aseid.toString()}'`);
            }

        }



        this.debugLogger(scene, `Node <${node.aseid.entity}> compiled successfully.`);
    }



    /**
     * Updates the AreNode
     */
    @A_Feature.Extend({
        name: AreNodeFeatures.onUpdate,
        scope: [AreNode]
    })
    async update() {

    }


    @A_Feature.Extend({
        name: A_TYPES__EntityFeatures.DESTROY,
        scope: [AreNode]
    })
    async destroy() {

    }
}