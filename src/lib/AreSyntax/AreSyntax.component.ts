import { A_Component, A_Context, A_Error } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame";
import { AreInterpolationTemplate, AreAttributeTemplate, AreListener, AreDirectiveTemplate, AreSyntaxAttributeType } from "./AreSyntax.types";
import { AreSyntaxContext } from "./AreSyntax.context";
import { AreComponentNode, AreNode, AreRootNode, AreStaticNode } from "@adaas/are/node";
import type { AreStore } from "@adaas/are/store";
import { AreRoot } from "../AreRoot";
import { AreAttribute, AreBindingAttribute, AreDirectiveAttribute, AreEventAttribute, AreStaticAttribute } from "../AreAttribute";


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


    isStaticNode(node: AreNode): boolean {
        return false;
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
    extractRoots(template: string): AreRootNode[] {
        const rootTag = this.config.rootTag;
        const rootTagRegex = new RegExp(`<${rootTag}([\\s>])`, 'gi');
        let match: RegExpExecArray | null;
        const nodes: AreRootNode[] = [];

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


            const node = new AreRootNode({
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
     * This method should return only children of the current level
     *  
     * No treewalking, recursion, or nested parsing - just direct children of the provided markup.
     * It should be syntax-agnostic and work with any template format.
     * @param markup 
     * @returns 
     */
    extractChildren(markup: string): AreNode[] {
        const children: AreNode[] = [];
        let index = 0;

        // Factory for creating nodes based on tag name and content
        const createNode = (
            tagName: string,
            fullTag: string,
            content: string
        ): AreNode => {
            if (this.config.rootTag === tagName.toLowerCase()) {
                return new AreRootNode({
                    scope: 'are',
                    component: tagName,
                    markup: fullTag,
                    template: content,
                });
            }
            // Standard HTML tag
            if (this.config.standardTags.has(tagName.toLowerCase())) {
                return new AreStaticNode({
                    scope: 'are',
                    component: tagName,
                    markup: fullTag,
                    template: content,
                });
            }
            if (!this.config.standardTags.has(tagName.toLowerCase())) {
                return new AreComponentNode({
                    scope: 'are',
                    component: tagName,
                    markup: fullTag,
                    template: content,
                });
            }
            // Custom component
            return new AreNode({
                scope: 'are',
                component: tagName,
                markup: fullTag,
                template: content,
            });
        };

        while (index < markup.length) {
            const tagStart = markup.indexOf('<', index);
            if (tagStart === -1) break;

            if (markup[tagStart + 1] === '/') {
                index = tagStart + 1;
                continue;
            }

            if (markup[tagStart + 1] === '!' || markup[tagStart + 1] === '?') {
                const commentEnd = markup.indexOf('>', tagStart);
                if (commentEnd === -1) break;
                index = commentEnd + 1;
                continue;
            }

            const tagNameMatch = markup.slice(tagStart).match(/^<([a-zA-Z][^\s/>]*)/);
            if (!tagNameMatch) {
                index = tagStart + 1;
                continue;
            }

            const tagName = tagNameMatch[1];
            const openingTagEnd = markup.indexOf('>', tagStart);
            if (openingTagEnd === -1) break;

            // Self-closing tag
            if (markup[openingTagEnd - 1] === '/') {
                const fullTag = markup.slice(tagStart, openingTagEnd + 1);
                children.push(createNode(tagName, fullTag, ''));
                index = openingTagEnd + 1;
                continue;
            }

            // Regular tag: find matching closing tag at same level
            const closingTag = `</${tagName}>`;
            let level = 0;
            let searchIndex = openingTagEnd + 1;
            let closingTagStart = -1;

            while (searchIndex < markup.length) {
                const nextOpenTag = markup.indexOf(`<${tagName}`, searchIndex);
                const nextCloseTag = markup.indexOf(closingTag, searchIndex);

                if (nextCloseTag === -1) break;

                if (nextOpenTag !== -1 && nextOpenTag < nextCloseTag) {
                    const charAfterTag = markup[nextOpenTag + tagName.length + 1];
                    if (charAfterTag === ' ' || charAfterTag === '>' || charAfterTag === '/') {
                        level++;
                        searchIndex = nextOpenTag + tagName.length + 1;
                        continue;
                    }
                }

                if (level === 0) {
                    closingTagStart = nextCloseTag;
                    break;
                } else {
                    level--;
                    searchIndex = nextCloseTag + closingTag.length;
                }
            }

            if (closingTagStart === -1) {
                index = openingTagEnd + 1;
                continue;
            }

            const fullTag = markup.slice(tagStart, closingTagStart + closingTag.length);
            const content = markup.slice(openingTagEnd + 1, closingTagStart).trim();

            children.push(createNode(tagName, fullTag, content));
            index = closingTagStart + closingTag.length;
        }

        return children;
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
    extractInterpolations(template: string): AreInterpolationTemplate[] {
        const interpolationRegex = new RegExp(`${this.config.interpolationDelimiters[0]}\\s*([a-zA-Z0-9_.$]+)\\s*${this.config.interpolationDelimiters[1]}`, 'g');
        const interpolations: AreInterpolationTemplate[] = [];

        let match: RegExpExecArray | null;
        while ((match = interpolationRegex.exec(template)) !== null) {
            interpolations.push({
                raw: match[0],
                key: match[1],
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
    extractDirectives(template: string): AreDirectiveTemplate[] {
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
        const directives: AreDirectiveTemplate[] = [];

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
     * Extracts ALL attributes from the FIRST opening tag regardless of type.
     * 
     * This method captures all attribute types:
     * - Static attributes: label="Click"
     * - Binding attributes: :label="'Click Me'"
     * - Event listeners: @click="handler"
     * - Directives: $if="condition"
     * 
     * @param template - Template string containing the tag
     * @returns Array of attributes with name, value, prefix, and raw data
     */
    @A_Frame.Method({
        description: 'Extracts all attributes from the first opening tag of a template string, including static, binding, listeners, and directives.'
    })
    extractAttributesV2(template: string): Array<AreAttribute> {
        // Trim whitespace to ensure we start at the actual first tag
        const trimmedTemplate = template.trim();

        // Match ONLY the very first opening tag (anchored with ^)
        const firstTagMatch = trimmedTemplate.match(
            /^<([a-zA-Z][^\s/>]*)(\s[^>]*?)?>/
        );

        if (!firstTagMatch) return [];

        const attributesPart = firstTagMatch[2];

        // If no attributes, return empty array
        if (!attributesPart) return [];

        /**
         * Comprehensive regex that matches all attribute types:
         * - Static: name="value"
         * - Binding: :name="value" 
         * - Listeners: @name="value"
         * - Directives: $name="value" or $name (no value)
         */
        const allAttributesRegex = /\s+([@:$]?)([a-zA-Z][a-zA-Z0-9._-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'))?/g;

        let match: RegExpExecArray | null;
        const attributes: Array<AreAttribute> = [];

        while ((match = allAttributesRegex.exec(attributesPart)) !== null) {
            const prefix = match[1] || '';
            const name = match[2];
            const value = match[3] ?? match[4] ?? '';
            const raw = match[0];


            switch (prefix) {
                case this.config.directiveDelimiter:
                    attributes.push(new AreDirectiveAttribute({
                        name, raw, prefix,
                        content: value
                    }));
                    break;

                case this.config.bindingDelimiter:
                    attributes.push(new AreBindingAttribute({
                        name, raw, prefix,
                        content: value
                    }));
                    break;

                case this.config.eventDelimiter:
                    attributes.push(new AreEventAttribute({
                        name, raw, prefix,
                        content: value
                    }));
                    break;

                default:
                    attributes.push(new AreStaticAttribute({
                        name, raw, prefix,
                        content: value
                    }));
                    break;
            }
        }

        return attributes;
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
    extractInterpolationsV2(template: string): AreInterpolationTemplate[] {
        const interpolationRegex = new RegExp(`${this.config.interpolationDelimiters[0]}\\s*([a-zA-Z0-9_.$]+)\\s*${this.config.interpolationDelimiters[1]}`, 'g');
        const interpolations: AreInterpolationTemplate[] = [];

        let match: RegExpExecArray | null;
        while ((match = interpolationRegex.exec(template)) !== null) {
            interpolations.push({
                raw: match[0],
                key: match[1],
                position: match.index!
            });
        }

        return interpolations;
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
    extractAttributes(template: string): AreAttributeTemplate[] {
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
        const attributes: AreAttributeTemplate[] = [];

        while ((match = propRegex.exec(attributesPart)) !== null) {
            const isBinding = match[1] === this.config.bindingDelimiter;
            const name = match[2];

            // Exclude listeners & directives explicitly
            if (
                name.startsWith(this.config.eventDelimiter) ||
                name.startsWith(this.config.directiveDelimiter)
            ) {
                continue;
            }

            const raw = match[0];
            const value = match[3] ?? match[4];

            const prefix = isBinding ? this.config.bindingDelimiter : '';

            attributes.push({
                // tag,
                name,
                raw,
                value: value || '',
                prefix,
                type: this.getAttributeType(prefix)
                // binding: isBinding
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
            `\\s+${this.config.eventDelimiter}([a-zA-Z0-9_:-]+)` +
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

    /**
     * Determines if an attribute is a binding attribute (starts with :)
     * 
     * @param prefix - The attribute prefix
     * @returns True if it's a binding attribute
     */
    @A_Frame.Method({
        description: 'Determines if an attribute prefix indicates a binding attribute.'
    })
    isBinding(prefix: string): boolean {
        return prefix === this.config.bindingDelimiter;
    }

    /**
     * Determines if an attribute is an event listener (starts with @)
     * 
     * @param prefix - The attribute prefix
     * @returns True if it's a listener attribute
     */
    @A_Frame.Method({
        description: 'Determines if an attribute prefix indicates an event listener.'
    })
    isEvent(prefix: string): boolean {
        return prefix === this.config.eventDelimiter;
    }

    /**
     * Determines if an attribute is a directive (starts with $)
     * 
     * @param prefix - The attribute prefix
     * @returns True if it's a directive attribute
     */
    @A_Frame.Method({
        description: 'Determines if an attribute prefix indicates a directive.'
    })
    isDirective(prefix: string): boolean {
        return prefix === this.config.directiveDelimiter;
    }

    /**
     * Determines if an attribute is a static attribute (no special prefix)
     * 
     * @param prefix - The attribute prefix
     * @returns True if it's a static attribute
     */
    @A_Frame.Method({
        description: 'Determines if an attribute prefix indicates a static attribute.'
    })
    isStatic(prefix: string): boolean {
        return !prefix || prefix === '';
    }

    /**
     * Gets the attribute type based on its prefix
     * 
     * @param prefix - The attribute prefix
     * @returns The attribute type
     */
    @A_Frame.Method({
        description: 'Gets the attribute type based on its prefix.'
    })
    getAttributeType(prefix: string): AreSyntaxAttributeType {
        if (this.isBinding(prefix)) return 'binding';
        if (this.isEvent(prefix)) return 'event';
        if (this.isDirective(prefix)) return 'directive';
        return 'static';
    }

    isBindingProp(prop: AreAttributeTemplate): boolean {
        return prop.raw.trim().startsWith(this.config.bindingDelimiter)
    }


    extractPropValue(prop: AreAttributeTemplate, parentStore: AreStore): any {

        if (prop.value == null) {
            return undefined;
        }

        // Binding prop (starts with :)
        if (this.isBindingProp(prop)) {
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


    replaceInterpolation(template: string, interpolation: AreInterpolationTemplate | string, value: any): string {
        const key = typeof interpolation === 'string' ? interpolation : interpolation.key;

        return template.replace(new RegExp(`${this.config.interpolationDelimiters[0]}\\s*${key}\\s*${this.config.interpolationDelimiters[1]}`, 'g'), value !== undefined ? String(value) : '');
    }


}