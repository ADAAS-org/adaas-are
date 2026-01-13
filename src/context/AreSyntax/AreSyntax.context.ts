import { A_Fragment } from "@adaas/a-concept";
import { Are } from "@adaas/are/components/AreComponent/Are.component";
import { AreNode } from "@adaas/are/entities/AreNode/AreNode.entity";
import { AreProps } from "../AreProps/AreProps.context";
import { AreStore } from "../AreStore/AreStore.context";
import { AreSyntaxInitOptions } from "./AreSyntax.types";

export type AreProp = {
    name: string;
    raw: string;
    value: string;
}

export type AreInterpolation = {
    raw: string;
    name: string;
}


export type AreListener = {
    name: string;
    raw: string;
    handler: string;
}

export type AreDirective = {
    name: string;
    raw: string;
    value?: string;
}


export class AreSyntax extends A_Fragment {

    readonly config!: Required<AreSyntaxInitOptions>;

    constructor(
        config: Partial<AreSyntaxInitOptions> = {}
    ) {
        super({ name: 'AreSyntax' });

        this.config = {
            debugMode: config.debugMode || false,
            interpolationDelimiters: config.interpolationDelimiters || ['{{', '}}'],
            bindingDelimiter: config.bindingDelimiter || ':',
            listenerDelimiter: config.listenerDelimiter || '@',
            strictMode: config.strictMode || true,
            customDirectives: config.customDirectives || [],
            trimWhitespace: config.trimWhitespace || true,
            rootTag: config.rootTag || 'are-root',
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


    isRootNode(node: AreNode): boolean {
        return node.aseid.entity.toLowerCase() === 'are-root';
    }

    /**
     * Determines if a tag is a custom component or standard HTML
     * 
     * @param node 
     * @returns 
     */
    isCustomNode(node: AreNode): boolean {
        return !this.STANDARD_HTML_TAGS.has(node.aseid.entity.toLowerCase());
    }


    /**
     * Interpolation is a placeholder for dynamic data in the template 
     * Example: {{dataProperty}}
     * 
     * @param template 
     */
    *extractInterpolations(template: string): Iterable<AreInterpolation> {
        const interpolationRegex = new RegExp(`${this.config.interpolationDelimiters[0]}\\s*([a-zA-Z0-9_.$]+)\\s*${this.config.interpolationDelimiters[1]}`, 'g');
        let match: RegExpExecArray | null;

        while ((match = interpolationRegex.exec(template)) !== null) {
            yield { raw: match[0], name: match[1] };
        }
    }


    /**
     * All props of the tag started with default $ is a directive 
     * Example: $if="condition", $for, $show, $hide, $no-update
     * 
     * @param template 
     */
    *extractDirectives(template: string): Iterable<string> {
        for (const directive of this.config.customDirectives) {
            const directiveRegex = new RegExp(`\\s+${directive}(\\s|=|>)`, 'g');
            if (directiveRegex.test(template)) {
                yield directive;
            }
        }
    }

    /**
     * Extracts all properties from a tag in the template
     * Example: <are-btn :label="'Click Me'" @click="handleClick" />
     * 
     * @param template 
     */
    *extractProps(template: string): Iterable<AreProp> {
        // Extract attributes from the tag
        const attrRegex = new RegExp(`([a-zA-Z0-9${this.config.bindingDelimiter}${this.config.listenerDelimiter}][a-zA-Z0-9:._-]+)\\s*=\\s*"(.*?)"`, 'g');
        let attrMatch: RegExpExecArray | null;

        while ((attrMatch = attrRegex.exec(template)) !== null) {
            const raw = attrMatch[0];
            const name = attrMatch[1];
            const value = attrMatch[2];
            yield { name, raw, value };
        }
    }

    *extractListeners(template: string): Iterable<AreListener> {
        // Extract event listeners from the tag
        const eventRegex = new RegExp(`@([a-zA-Z0-9${this.config.bindingDelimiter}${this.config.listenerDelimiter}_-]+)\\s*=\\s*"(.*?)"`, 'g');
        let eventMatch: RegExpExecArray | null;

        while ((eventMatch = eventRegex.exec(template)) !== null) {
            const raw = eventMatch[0];
            const name = eventMatch[1];
            const handler = eventMatch[2];
            yield { name, raw, handler };
        }
    }



    isBindingProp(prop: AreProp): boolean {
        return prop.raw.startsWith(':') 
    }


    extractPropName(prop: AreProp): string {
        return prop.name.substring(1);
    }


    extractPropValue(prop: AreProp, parentStore: AreStore): any {
        switch (true) {

            case this.isBindingProp(prop) && !(prop.value.startsWith('\'') && prop.value.endsWith('\'')): {
                // Dynamic binding (for now only string literals are supported)
                // In future it should support expressions and data paths
                return parentStore?.get(prop.value);
            }
            case this.isBindingProp(prop) && (prop.value.startsWith('\'') && prop.value.endsWith('\'')): {
                // Static binding
                return prop.value.substring(1, prop.value.length - 1);
            }
            default: {
                // Static value
                return prop.value;
            }
        }
    }

    replaceInterpolation(template: string, interpolation: AreInterpolation | string, value: any): string {
        const key = typeof interpolation === 'string' ? interpolation : interpolation.name;


        console.log('Replacing interpolation', key, 'with value', value, new RegExp(`${this.config.interpolationDelimiters[0]}\\s*${key}\\s*${this.config.interpolationDelimiters[1]}`, 'g'));

        return template.replace(new RegExp(`${this.config.interpolationDelimiters[0]}\\s*${key}\\s*${this.config.interpolationDelimiters[1]}`, 'g'), value !== undefined ? String(value) : '');
    }
}