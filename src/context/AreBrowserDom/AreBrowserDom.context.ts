import { AreNode } from "@adaas/are/entities/AreNode/AreNode.entity";
import { AreScene } from "../AreScene/AreScene.context"
import { AreSceneError } from "../AreScene/AreScene.error";
import { AreEvent } from "../AreEvent/AreEvent.context";


export class AreBrowserDom extends AreScene<Element> {

    protected _virtual!: Document;

    constructor(
        name?: string,
        template?: string
    ) {
        super(name);

        this._virtual = new DOMParser().parseFromString(template || this.mountPoint?.innerHTML || `<${this.name}></${this.name}>`, "text/html");
    }


    get template(): string {
        return this._virtual.documentElement.innerHTML;
    }

    get mountPoint(): HTMLElement | null {
        return document.getElementById(this.name)
    }

    set template(value: string) {
        // Parse HTML into a DOM-like structure using DOMParser
        const parser = new DOMParser();
        this._virtual = parser.parseFromString(value, "text/html");
    }


    [Symbol.iterator](): Iterator<AreNode> {

        const walker = document.createTreeWalker(this._virtual.body, NodeFilter.SHOW_ELEMENT);

        let current: Node | null = walker.nextNode();

        return {
            next: (): IteratorResult<AreNode> => {
                if (!current) return {
                    done: true,
                    value: null
                };

                let node = this.index.getByElement(current as Element) || new AreNode({
                    scope: this.name,
                    component: (current as Element).tagName.toLowerCase(),
                    markup: (current as Element).outerHTML,
                });


                this.index.add(node, current as Element);

                const result = {
                    done: false,
                    value: node
                };

                current = walker.nextNode();

                return result;
            }
        };
    }



    async mount(
        node: AreNode,
    ) {
        const element = this.index.getByNode(node);


        if (element) {
            const wrapper = this._virtual.createElement('div');
            wrapper.setAttribute('aseid', node.aseid.toString());

            const nodeContent = node.scope.resolve<AreBrowserDom>(AreBrowserDom);

            if (!nodeContent) {
                throw new AreSceneError(
                    AreSceneError.MountFailed,
                    `Scene for node with ASEID '${node.aseid.toString()}' not found in the scope '${node.scope.name}'.`
                );
            }

            // add body contents to wrapper via childre to do not lose listeners 
            wrapper.replaceChildren(...Array.from(nodeContent._virtual.body.childNodes));

            // Replace the placement with the rendered content
            element.replaceWith(wrapper);


            // copy styles from node content scene to parent scene
            const styleElements = nodeContent._virtual.querySelectorAll('style[id^="a-style-"]');

            styleElements.forEach(styleEl => {

                const existingStyleEl = this._virtual.getElementById(styleEl.id);

                if (!existingStyleEl)
                    this._virtual.head.appendChild(styleEl.cloneNode(true));
            });

        } else {
            throw new AreSceneError(
                AreSceneError.MountFailed,
                `Placement for node with ASEID '${node.aseid.toString()}' not found in the scene.`
            );
        }
    }


    async update(
        node: AreNode,
    ) {
        const element = this.index.getByNode(node);

        if (element) {
            const wrapper = this._virtual.createElement('div');
            wrapper.setAttribute('aseid', node.aseid.toString());

            const scene = node.scope.resolve<AreBrowserDom>(AreBrowserDom);

            if (!scene) {
                throw new AreSceneError(
                    AreSceneError.UpdateFailed,
                    `Scene for node with ASEID '${node.aseid.toString()}' not found in the scope '${node.scope.name}'.`
                );
            }

            wrapper.innerHTML = scene.template;

            // Replace the placement with the rendered content
            element.replaceWith(wrapper);

        } else {
            throw new AreSceneError(
                AreSceneError.UpdateFailed,
                `Placement for node with ASEID '${node.aseid.toString()}' not found in the scene.`
            );
        }
    }


    async unmount(
        node: AreNode,
    ) {

        this.scope.deregister(node);

        await node.destroy();

        const element = this.index.getByNode(node);
        if (element) {
            element.remove();
        }

        this.index.removeByNode(node);
    }


    async addListener(event: string, handler: string, owner: AreNode, node: AreNode) {
        const element = this.index.getByNode(node);

        console.log('Adding listener', { event, handler, owner, node, element });

        if (element) {
            element.addEventListener(event, async (e) => {
                const newEvent = new AreEvent(handler, {
                    event,
                    data: e
                })

                await owner.emit(newEvent);
            });
        }
    }


    async addStyles(node: AreNode, styles: string) {

        if (styles.trim().length > 0) {
            const styleElementId = `a-style-${node.aseid.entity}`;
            let styleElement = this._virtual.getElementById(styleElementId) as HTMLStyleElement | null;

            if (!styleElement) {
                styleElement = this._virtual.createElement('style');
                styleElement.id = styleElementId;
                this._virtual.head.appendChild(styleElement);
            }

            styleElement.innerHTML = styles;
        }
    }


    async render() {
        const newEl = this._virtual.body.firstElementChild;

        if (this.mountPoint && newEl) {

            // PATCH attributes
            for (const attr of Array.from(newEl.attributes)) {
                this.mountPoint.setAttribute(attr.name, attr.value);
            }

            // PATCH children (simple example)
            this.mountPoint.replaceChildren(...Array.from(newEl.childNodes));


            // 3) copy styles 
            const existingStyleElements = this.mountPoint.querySelectorAll('style[id^="a-style-"]');
            existingStyleElements.forEach(el => el.remove());

            const styleElements = this._virtual.querySelectorAll('style[id^="a-style-"]');

            styleElements.forEach(styleEl => {

                const existingStyleEl = this.mountPoint?.ownerDocument.getElementById(styleEl.id);

                if (!existingStyleEl)

                    this.mountPoint?.ownerDocument.head!.appendChild(styleEl.cloneNode(true));
            });


        } else {
            throw new AreSceneError(
                AreSceneError.RenderFailed,
                `No <${this.name}> root element found in the document. Please ensure that your HTML contains an <${this.name}> element to serve as the application root.`
            );
        }
    }


    async parentOf(node: AreNode): Promise<AreNode | null> {
        const parentElement = this.index.getByNode(node)?.parentElement;

        if (parentElement) {
            const parentNode = this.index.getByElement(parentElement);
            if (parentNode) {
                return parentNode;
            }
        }

        return null;
    }


    async childrenOf(node: AreNode): Promise<AreNode[]> {
        const children: AreNode[] = [];

        const parentElement = this.index.getByNode(node);

        if (parentElement) {
            for (const childElement of Array.from(parentElement.children)) {
                const childNode = this.index.getByElement(childElement);
                if (childNode) {
                    children.push(childNode);

                } else {
                    const newNode = new AreNode({
                        scope: this.name,
                        component: (childElement as Element).tagName.toLowerCase(),
                        markup: (childElement as Element).outerHTML,
                    });

                    this.index.add(newNode, childElement);

                    children.push(newNode);
                }
            }
        }

        return children;
    }


    async clear() {
        this._virtual = new DOMParser().parseFromString('', "text/html");

        this.index.clear();
    }


    async reset(template: string) {
        this._virtual = new DOMParser().parseFromString(template, "text/html");

        this.index.clear();
    }

}