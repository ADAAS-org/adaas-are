import { A_Fragment } from '@adaas/a-concept';
import { AreSyntaxInitOptions } from './AreSyntax.types.js';

declare class AreSyntaxContext extends A_Fragment {
    /**
     * Initialization options for configuring the AreSyntax context.
     */
    protected readonly config: Partial<AreSyntaxInitOptions>;
    constructor(
    /**
     * Initialization options for configuring the AreSyntax context.
     */
    config?: Partial<AreSyntaxInitOptions>);
    /**
     * identifier of the root tag to use when compiling in browser context.
     *
     * @return {string} The root tag identifier.
     */
    get rootTag(): string;
    /**
     * List of standard HTML tags to recognize.
     * [!] This is a set of tags that can be ignored when determining if a node is a custom component.
     *
     * @return {Set<string>} A set of standard HTML tag names.
     */
    get standardTags(): Set<string>;
    /**
     * Enable or disable debug mode for syntax parsing.
     * When enabled, additional debug information will be logged during parsing.
     *
     * @return {boolean} True if debug mode is enabled, false otherwise.
     */
    get debugMode(): boolean;
    /**
     * Custom interpolation delimiters for template parsing.
     * Default is ['{{', '}}'].
     *
     * @return {[string, string]} The opening and closing interpolation delimiters.
     */
    get interpolationDelimiters(): [string, string];
    /**
     * Custom binding delimiter for data binding parsing.
     * Default is ':'.
     * @return {string} The binding delimiter.
     */
    get bindingDelimiter(): string;
    /**
     * Custom listener delimiter for event binding parsing.
     * Default is '@'.
     *
     * @return {string} The listener delimiter.
     */
    get listenerDelimiter(): string;
    /**
     * Enable or disable strict mode for syntax parsing.
     * When enabled, the parser will throw errors for any syntax violations.
     * Default is true.
     *
     * @return {boolean} True if strict mode is enabled, false otherwise.
     */
    get strictMode(): boolean;
    /**
     * Enable or disable whitespace trimming in templates.
     * When enabled, leading and trailing whitespace in template expressions will be trimmed.
     * Default is true.
     *
     * @return {boolean} True if whitespace trimming is enabled, false otherwise.
     */
    get trimWhitespace(): boolean;
    /**
     * Custom directive delimiter for directive parsing.
     * Default is '$'.
     *
     * @return {string} The directive delimiter.
     */
    get directiveDelimiter(): string;
    get customDirectives(): string[];
}

export { AreSyntaxContext };
