import { A_Fragment } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame";
import { AreSyntaxInitOptions } from "./AreSyntax.types";

@A_Frame.Fragment({
    namespace: 'A-ARE',
    name: 'AreSyntaxContext',
    description: 'Context that defines the syntax rules and structures for the A-Concept Rendering Engine (ARE). It provides mechanisms for parsing and interpreting templates, attributes, directives, interpolations, and event listeners, enabling dynamic and interactive UI rendering within the ARE framework.'
})
export class AreSyntaxContext extends A_Fragment {


    constructor(
        /**
         * Initialization options for configuring the AreSyntax context.
         */
        protected readonly config: Partial<AreSyntaxInitOptions> = {}
    ) {
        super({ name: 'AreSyntaxContext' });

    }


    /**
     * identifier of the root tag to use when compiling in browser context.
     * 
     * @return {string} The root tag identifier.
     */
    get rootTag(): string {
        return this.config.rootTag || 'are-root';
    }
    /**
     * List of standard HTML tags to recognize.
     * [!] This is a set of tags that can be ignored when determining if a node is a custom component.
     * 
     * @return {Set<string>} A set of standard HTML tag names.
     */
    get standardTags(): Set<string> {
        return new Set(this.config.standardTags || [])
    };
    /**
     * Enable or disable debug mode for syntax parsing.
     * When enabled, additional debug information will be logged during parsing.
     * 
     * @return {boolean} True if debug mode is enabled, false otherwise.
     */
    get debugMode(): boolean {
        return this.config.debugMode || false;
    }
    /**
     * Custom interpolation delimiters for template parsing.
     * Default is ['{{', '}}'].
     * 
     * @return {[string, string]} The opening and closing interpolation delimiters.
     */
    get interpolationDelimiters(): [string, string] {
        return this.config.interpolationDelimiters || ['{{', '}}'];
    }
    /**
     * Custom binding delimiter for data binding parsing.
     * Default is ':'.
     * @return {string} The binding delimiter.
     */
    get bindingDelimiter(): string {
        return this.config.bindingDelimiter || ':';
    }
    /**
     * Custom listener delimiter for event binding parsing.
     * Default is '@'.
     * 
     * @return {string} The listener delimiter.
     */
    get listenerDelimiter(): string {
        return this.config.listenerDelimiter || '@';
    }
    /**
     * Enable or disable strict mode for syntax parsing.
     * When enabled, the parser will throw errors for any syntax violations.
     * Default is true.
     * 
     * @return {boolean} True if strict mode is enabled, false otherwise.
     */
    get strictMode(): boolean {
        return this.config.strictMode !== false;
    }
    /**
     * Enable or disable whitespace trimming in templates.
     * When enabled, leading and trailing whitespace in template expressions will be trimmed.
     * Default is true.
     * 
     * @return {boolean} True if whitespace trimming is enabled, false otherwise.
     */
    get trimWhitespace(): boolean {
        return this.config.trimWhitespace !== false;
    }
    /**
     * Custom directive delimiter for directive parsing.
     * Default is '$'.
     * 
     * @return {string} The directive delimiter.
     */
    get directiveDelimiter(): string {
        return this.config.directiveDelimiter || '$';
    }

    /*
     * A list of custom directives to be recognized by the syntax parser.
     * Each directive should be a string representing the directive name.
     * Default is an empty array.
     */
    get customDirectives(): string[] {
        return this.config.customDirectives || [];
    }
}