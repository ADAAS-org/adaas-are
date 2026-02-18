import { A_Component } from '@adaas/a-concept';
import { AreInterpolation, AreDirective, AreAttribute, AreListener } from './AreSyntax.types.mjs';
import { AreSyntaxContext } from './AreSyntax.context.mjs';
import { b as AreNode } from '../../index-DMXWCL7R.mjs';
import { AreStore } from '../AreStore/AreStore.context.mjs';
import '../AreEvent/AreEvent.types.mjs';
import '../AreNode/AreNode.types.mjs';
import '../AreScene/AreScene.types.mjs';
import '../AreProps/AreProps.context.mjs';
import '@adaas/a-utils/a-execution';

declare class AreSyntax extends A_Component {
    get config(): AreSyntaxContext;
    /**
     * Determines if a tag is a root node
     *
     * @param node
     * @returns
     */
    isRootNode(node: AreNode): boolean;
    /**
     * Determines if a tag is a custom component or standard HTML
     *
     * @param node
     * @returns
     */
    isCustomNode(node: AreNode): boolean;
    /**
     * Extracts root AreNode elements from the document based on the configured root tag.
     *
     * @returns An iterable of AreNode instances representing the root elements.
     */
    extractRoots(template: string): AreNode[];
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
    extractInterpolations(template: string): AreInterpolation[];
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
    extractDirectives(template: string): AreDirective[];
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
    extractAttributes(template: string): AreAttribute[];
    /**
     * Extracts event listeners from the FIRST/TOP-LEVEL opening tag ONLY in the template.
     * Supports:
     *  - @event="handler"
     *  - @event='handler'
     *
     * Note: This method intentionally ignores nested elements and only processes
     * the very first opening tag in the provided template string.
     */
    extractListeners(template: string): AreListener[];
    isBindingProp(prop: AreAttribute): boolean;
    extractPropValue(prop: AreAttribute, parentStore: AreStore): any;
    replaceInterpolation(template: string, interpolation: AreInterpolation | string, value: any): string;
}

export { AreSyntax };
