import { A_Fragment } from "@adaas/a-concept";
import { Are } from "@adaas/are/components/AreComponent/Are.component";
import { AreNode } from "@adaas/are/entities/AreNode/AreNode.entity";
import { AreProps } from "../AreProps/AreProps.context";
import { AreStore } from "../AreStore/AreStore.context";
import { AreSyntaxInitOptions } from "./AreSyntax.types";

export type AreAttribute = {
    tag: string;        // tag name
    name: string;       // prop name (e.g. "label")
    raw: string;        // raw attribute text
    value: string;     // expression or literal
    binding: boolean;   // true if :prop
};

export type AreInterpolation = {
    raw: string;
    name: string;
}


export type AreListener = {
    tag: string;      // tag name where listener was found
    name: string;     // event name (e.g. "input")
    raw: string;      // full raw attribute (e.g. ' @input="onChange"')
    handler: string;  // handler expression (e.g. "onChange")
};


export type AreDirective = {
    tag: string;      // tag name
    name: string;     // directive name (e.g. "$if")
    raw: string;      // full raw attribute
    value?: string;   // optional value expression
    template: string; // full tag template where directive was found
};


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
            directiveDelimiter: config.directiveDelimiter || '$',
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
     * Extracts custom directives from the FIRST/TOP-LEVEL opening tag ONLY.
     * Directives start with `$`
     *
     * Examples:
     *   $if="condition"
     *   $show
     *   $no-update=""
     * 
     * Note: This method intentionally ignores nested elements and only processes
     * the very first opening tag in the provided template string.
     */
    *extractDirectives(template: string): Iterable<AreDirective> {
        // Trim whitespace to ensure we start at the actual first tag
        const trimmedTemplate = template.trim();
        
        // Match ONLY the very first opening tag (anchored with ^)
        const firstTagMatch = trimmedTemplate.match(
            /^<([a-zA-Z][^\s/>]*)(\s[^>]*?)?>/
        );

        if (!firstTagMatch) return;

        const tag = firstTagMatch[1];
        const attributesPart = firstTagMatch[2];

        // If no attributes, no directives possible
        if (!attributesPart) return;

        /**
         * Extract directives from the first tag's attributes only.
         * Matches patterns like:
         *  $if="condition"
         *  $show
         *  $no-update=""
         */
        const directiveRegex = /\s+(\$[a-zA-Z0-9_-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'))?/g;

        let match: RegExpExecArray | null;

        while ((match = directiveRegex.exec(attributesPart)) !== null) {
            const name = match[1];

            // Optional whitelist support - only apply if whitelist is explicitly provided
            if (
                this.config.customDirectives &&
                this.config.customDirectives.length > 0 &&
                !this.config.customDirectives.includes(name)
            ) {
                continue;
            }

            const raw = match[0];
            const value = match[2] ?? match[3];
            const tagTemplate = firstTagMatch[0]; // Only the first tag

            yield {
                tag,
                name,
                raw,
                value,
                template: tagTemplate
            };
        }
    }


    /**
     * Extracts component props from the FIRST opening tag.
     *
     * Examples:
     *   label="Click"
     *   :label="'Click Me'"
     *
     * Excludes:
     *   @click
     *   $if
     */
    *extractAttributes(template: string): Iterable<AreAttribute> {
        // Match first opening tag
        const firstTagMatch = template.match(
            /^<([a-zA-Z][^\s/>]*)(\s[^>]*?)?>/
        );

        if (!firstTagMatch) return;

        const tag = firstTagMatch[1];
        const attributesPart = firstTagMatch[2];

        if (!attributesPart) return;

        /**
         * Matches:
         *   label="text"
         *   :label="'Click'"
         *
         * Skips:
         *   @click
         *   $if
         */
        const propRegex =
            /\s+(:?)([a-zA-Z][a-zA-Z0-9._-]*)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;

        let match: RegExpExecArray | null;

        while ((match = propRegex.exec(attributesPart)) !== null) {
            const isBinding = match[1] === ':';
            const name = match[2];

            // Exclude listeners & directives explicitly
            if (
                name.startsWith(this.config.listenerDelimiter) ||
                name.startsWith(this.config.directiveDelimiter)
            ) {
                continue;
            }

            const raw = match[0];
            const value = match[3] ?? match[4];

            yield {
                tag,
                name,
                raw,
                value: value || '',
                binding: isBinding
            };
        }
    }


    /**
     * Extracts event listeners from the FIRST/TOP-LEVEL opening tag ONLY in the template.
     * Supports:
     *  - @event="handler"
     *  - @event='handler'
     * 
     * Note: This method intentionally ignores nested elements and only processes
     * the very first opening tag in the provided template string.
     */
    *extractListeners(template: string): Iterable<AreListener> {
        // Trim whitespace to ensure we start at the actual first tag
        const trimmedTemplate = template.trim();
        
        // Match ONLY the very first opening tag (anchored with ^)
        const firstTagMatch = trimmedTemplate.match(
            /^<([a-zA-Z][^\s/>]*)(\s[^>]*?)?>/
        );

        if (!firstTagMatch) return;

        const tag = firstTagMatch[1];
        const attributesPart = firstTagMatch[2];

        // If no attributes, no listeners possible
        if (!attributesPart) return;

        /**
         * Extract listeners from the first tag's attributes only.
         * Match listener attributes:
         *  @input="onChange"
         *  @change='handleChange'
         */
        const listenerRegex = new RegExp(
            `\\s+${this.config.listenerDelimiter}([a-zA-Z0-9_:-]+)` +
            `\\s*=\\s*(?:"([^"]*)"|'([^']*)')`,
            'g'
        );

        let match: RegExpExecArray | null;

        while ((match = listenerRegex.exec(attributesPart)) !== null) {
            const raw = match[0];
            const name = match[1];
            const handler = match[2] ?? match[3] ?? "";

            yield {
                tag,
                name,
                raw,
                handler
            };
        }
    }



    isBindingProp(prop: AreAttribute): boolean {
        console.log('Checking if prop is binding:', prop);
        return prop.raw.trim().startsWith(':')
    }


    extractPropValue(prop: AreAttribute, parentStore: AreStore): any {

        if (prop.value == null) {
            return undefined;
        }

        // Binding prop (starts with :)
        if (prop.binding) {
            const value = prop.value.trim();

            // Static literal binding: :label="'Click'" or :"Click"
            if (
                (value.startsWith("'") && value.endsWith("'")) ||
                (value.startsWith('"') && value.endsWith('"'))
            ) {
                return value.slice(1, -1);
            }

            // Dynamic binding: :label="someKey"
            // (future: expressions, paths, computed, etc.)
            return parentStore?.get(value);
        }

        // Static prop: label="Click"
        return prop.value;
    }


    applyDirective(node: AreNode, template: string, directive: AreDirective, value?: any): string {

        console.log(
            '\n\n\n' + '============================='
            + `\nApplying directive '${directive.name}' on <${node.aseid.entity}>`
            + `\nDirective raw: ${directive.raw}`
            + '\n\n\n' + '============================='
        )

        switch (directive.name) {
            // case '$trim': {
            //     return template.replace(directive.raw, '').trim();
            // }
            case '$if': {
                // Only remove the element if the condition is falsy
                // If condition is truthy, keep the element but remove the directive attribute
                if (value) {
                    // Condition is true - keep element, just remove the $if attribute
                    return template.replace(directive.raw, '');
                } else {
                    // Condition is false - remove the entire element
                    return template.replace(directive.template, '');
                }
            }
            // case '$no-update': {
            //     return template.replace(directive.raw, '').trim();
            // }
            default: {
                return template;
            }
        }
    }


    // extractPropValue(prop: AreProp, parentStore: AreStore): any {
    //     switch (true) {

    //         case this.isBindingProp(prop) && !(prop.value.startsWith('\'') && prop.value.endsWith('\'')): {
    //             // Dynamic binding (for now only string literals are supported)
    //             // In future it should support expressions and data paths
    //             return parentStore?.get(prop.value);
    //         }
    //         case this.isBindingProp(prop) && (prop.value.startsWith('\'') && prop.value.endsWith('\'')): {
    //             // Static binding
    //             return prop.value.substring(1, prop.value.length - 1);
    //         }
    //         default: {
    //             // Static value
    //             return prop.value;
    //         }
    //     }
    // }

    replaceInterpolation(template: string, interpolation: AreInterpolation | string, value: any): string {
        const key = typeof interpolation === 'string' ? interpolation : interpolation.name;


        console.log('Replacing interpolation', key, 'with value', value, new RegExp(`${this.config.interpolationDelimiters[0]}\\s*${key}\\s*${this.config.interpolationDelimiters[1]}`, 'g'));

        return template.replace(new RegExp(`${this.config.interpolationDelimiters[0]}\\s*${key}\\s*${this.config.interpolationDelimiters[1]}`, 'g'), value !== undefined ? String(value) : '');
    }
}