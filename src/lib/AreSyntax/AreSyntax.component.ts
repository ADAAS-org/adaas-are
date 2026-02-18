import { A_Component, A_Context, A_Error } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame";
import { AreDirective, AreInterpolation, AreAttribute, AreListener } from "./AreSyntax.types";
import { AreSyntaxContext } from "./AreSyntax.context";
import { AreNode } from "@adaas/are/node";
import type { AreStore } from "@adaas/are/store";


@A_Frame.Component({
    namespace: 'A-ARE',
    name: 'AreSyntax',
    description: 'Context component that defines the syntax rules and structures for the A-Concept Rendering Engine (ARE). It provides mechanisms for parsing and interpreting templates, attributes, directives, interpolations, and event listeners, enabling dynamic and interactive UI rendering within the ARE framework.'
})
export class AreSyntax extends A_Component {


    get config(): AreSyntaxContext {
        return A_Context.scope(this).resolveFlat<AreSyntaxContext>(AreSyntaxContext)!;
    }


    /**
     * Determines if a tag is a root node
     * 
     * @param node 
     * @returns 
     */
    @A_Frame.Method({
        description: 'Determines if a given AreNode is a root node based on its entity type.'
    })
    isRootNode(node: AreNode): boolean {
        return node.aseid.entity.toLowerCase() === this.config.rootTag;
    }

    /**
     * Determines if a tag is a custom component or standard HTML
     * 
     * @param node 
     * @returns 
     */
    @A_Frame.Method({
        description: 'Determines if a given AreNode represents a custom component as opposed to a standard HTML tag.'
    })
    isCustomNode(node: AreNode): boolean {
        return !this.config.standardTags.has(node.aseid.entity.toLowerCase());
    }


    /**
     * Extracts root AreNode elements from the document based on the configured root tag.
     * 
     * @returns An iterable of AreNode instances representing the root elements.
     */
    @A_Frame.Method({
        description: 'Extracts root AreNode elements from the document based on the configured root tag.'
    })
    extractRoots(template: string): AreNode[] {
        const rootTag = this.config.rootTag;
        const rootTagRegex = new RegExp(`<${rootTag}([\\s>])`, 'gi');
        let match: RegExpExecArray | null;
        const nodes: AreNode[] = [];

        while ((match = rootTagRegex.exec(template)) !== null) {
            const startIndex = match.index;
            const endTag = `</${rootTag}>`;
            const endIndex = template.indexOf(endTag, startIndex);

            if (endIndex === -1) {
                throw new A_Error(`Missing closing tag for <${rootTag}> starting at index ${startIndex}`);
            }

            const attributes = this.extractAttributes(template.slice(startIndex, endIndex + endTag.length));
            let rootId = `auto-root-${startIndex}`;
            
            for (let i = 0; i < attributes.length; i++) {
                if (attributes[i].name === 'id') {
                    rootId = attributes[i].value;
                    break;
                }
            }

            const markup = template.slice(startIndex, endIndex + endTag.length);
            const content = markup.slice(rootTag.length + 2, -endTag.length).trim();
            

            const node = new AreNode({
                id: rootId,
                scope: 'are',
                component: 'are-root',
                markup: markup,
                template: content,
            });

            nodes.push(node);
        }
        
        return nodes;
    }


    /**
     * Extracts interpolations from template (syntax-agnostic).
     * 
     * Simply finds all interpolation patterns and returns their position, raw text, and name.
     * Works with any template format - HTML, plain text, or any other syntax.
     * 
     * Example: `Hello {{name}}, welcome to {{place}}!`
     * Returns: [
     *   { raw: "{{name}}", name: "name", position: 6 },
     *   { raw: "{{place}}", name: "place", position: 26 }
     * ]
     * 
     * @param template - Template string in any format
     */
    @A_Frame.Method({
        description: 'Extracts interpolations from a template string based on the configured interpolation delimiters.'
    })
    extractInterpolations(template: string): AreInterpolation[] {
        const interpolationRegex = new RegExp(`${this.config.interpolationDelimiters[0]}\\s*([a-zA-Z0-9_.$]+)\\s*${this.config.interpolationDelimiters[1]}`, 'g');
        const interpolations: AreInterpolation[] = [];

        let match: RegExpExecArray | null;
        while ((match = interpolationRegex.exec(template)) !== null) {
            interpolations.push({
                raw: match[0],
                name: match[1],
                position: match.index!
            });
        }
        
        return interpolations;
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
    @A_Frame.Method({
        description: 'Extracts custom directives from the first opening tag of a template string.'
    })
    extractDirectives(template: string): AreDirective[] {
        // Trim whitespace to ensure we start at the actual first tag
        const trimmedTemplate = template.trim();

        // Match ONLY the very first opening tag (anchored with ^)
        const firstTagMatch = trimmedTemplate.match(
            /^<([a-zA-Z][^\s/>]*)(\s[^>]*?)?>/
        );

        if (!firstTagMatch) return [];

        const tag = firstTagMatch[1];
        const attributesPart = firstTagMatch[2];

        // If no attributes, no directives possible
        if (!attributesPart) return [];

        /**
         * Extract directives from the first tag's attributes only.
         * Matches patterns like:
         *  $if="condition"
         *  $show
         *  $no-update=""
         */
        const directiveRegex = new RegExp(
            `\\s+(\\${this.config.directiveDelimiter}[a-zA-Z0-9_-]+)(?:\\s*=\\s*(?:"([^"]*)"|'([^']*)'))?`,
            'g'
        );

        let match: RegExpExecArray | null;
        const directives: AreDirective[] = [];

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

            directives.push({
                tag,
                name,
                raw,
                value,
                template: tagTemplate
            });
        }
        
        return directives;
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
    extractAttributes(template: string): AreAttribute[] {
        // Match first opening tag
        const firstTagMatch = template.match(
            /^<([a-zA-Z][^\s/>]*)(\s[^>]*?)?>/
        );

        if (!firstTagMatch) return [];

        const tag = firstTagMatch[1];
        const attributesPart = firstTagMatch[2];

        if (!attributesPart) return [];

        /**
         * Matches:
         *   label="text"
         *   :label="'Click'"
         *
         * Skips:
         *   @click
         *   $if
         */
        const propRegex = new RegExp(
            `\\s+(\\${this.config.bindingDelimiter}?)([a-zA-Z][a-zA-Z0-9._-]*)\\s*=\\s*(?:"([^"]*)"|'([^']*)')`,
            'g'
        );

        let match: RegExpExecArray | null;
        const attributes: AreAttribute[] = [];

        while ((match = propRegex.exec(attributesPart)) !== null) {
            const isBinding = match[1] === this.config.bindingDelimiter;
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

            attributes.push({
                tag,
                name,
                raw,
                value: value || '',
                binding: isBinding
            });
        }
        
        return attributes;
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
    extractListeners(template: string): AreListener[] {
        // Trim whitespace to ensure we start at the actual first tag
        const trimmedTemplate = template.trim();

        // Match ONLY the very first opening tag (anchored with ^)
        const firstTagMatch = trimmedTemplate.match(
            /^<([a-zA-Z][^\s/>]*)(\s[^>]*?)?>/
        );

        if (!firstTagMatch) return [];

        const tag = firstTagMatch[1];
        const attributesPart = firstTagMatch[2];

        // If no attributes, no listeners possible
        if (!attributesPart) return [];

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
        const listeners: AreListener[] = [];

        while ((match = listenerRegex.exec(attributesPart)) !== null) {
            const raw = match[0];
            const name = match[1];
            const handler = match[2] ?? match[3] ?? "";

            listeners.push({
                tag,
                name,
                raw,
                handler
            });
        }
        
        return listeners;
    }



    isBindingProp(prop: AreAttribute): boolean {
        return prop.raw.trim().startsWith(this.config.bindingDelimiter)
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


    replaceInterpolation(template: string, interpolation: AreInterpolation | string, value: any): string {
        const key = typeof interpolation === 'string' ? interpolation : interpolation.name;

        return template.replace(new RegExp(`${this.config.interpolationDelimiters[0]}\\s*${key}\\s*${this.config.interpolationDelimiters[1]}`, 'g'), value !== undefined ? String(value) : '');
    }


}