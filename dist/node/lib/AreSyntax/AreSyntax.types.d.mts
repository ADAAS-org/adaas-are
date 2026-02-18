type AreSyntaxInitOptions = {
    /**
     * Enable or disable debug mode for AreSyntax.
     * When enabled, additional logging and debugging information will be available.
     * Default is false.
     */
    debugMode?: boolean;
    /**
     * Custom interpolation delimiters for template parsing.
     * Default is ['{{', '}}'].
     */
    interpolationDelimiters?: [string, string];
    /**
     * Custom binding delimiters for data binding parsing.
     * Default is ':'.
     */
    bindingDelimiter?: string;
    /**
     * Custom listener delimiters for event binding parsing.
     * Default is '@'.
     */
    listenerDelimiter?: string;
    /**
     * Enable or disable strict mode for syntax parsing.
     * When enabled, the parser will throw errors for any syntax violations.
     * Default is true.
     */
    strictMode?: boolean;
    /**
     * A list of custom directives to be recognized by the syntax parser.
     * Each directive should be a string representing the directive name.
     * Default is an empty array.
     */
    customDirectives?: string[];
    /**
     * Enable or disable whitespace trimming in templates.
     * When enabled, leading and trailing whitespace in template expressions will be trimmed.
     * Default is true.
     */
    trimWhitespace?: boolean;
    /**
     * identifier of the root tag to use when compiling in browser context.
     */
    rootTag?: string;
    /**
     * Custom directive delimiter for directive parsing.
     * Default is '$'.
     */
    directiveDelimiter?: string;
    /**
     * List of standard HTML tags to recognize.
     */
    standardTags?: string[];
};
type AreAttribute = {
    /**
     * Tag name where the attribute was found
     */
    tag: string;
    /**
     * Property name (e.g. "label")
     */
    name: string;
    /**
     * Full raw attribute (e.g. ' :label="buttonLabel" ')
     */
    raw: string;
    /**
     * Attribute value (e.g. "buttonLabel")
     */
    value: string;
    /**
     * True if the attribute is a binding (e.g. :prop), false otherwise (e.g. prop="value")
     */
    binding: boolean;
};
type AreInterpolation = {
    /**
     * Tag name where the interpolation was found
     */
    raw: string;
    /**
     * Name of the interpolation (e.g. "userName")
     */
    name: string;
    /**
     * Position in the template where this interpolation was found
     */
    position: number;
};
type AreListener = {
    /**
     * tag name where listener was found
     */
    tag: string;
    /**
     * event name (e.g. "input")
     */
    name: string;
    /**
     * full raw attribute (e.g. ' @input="onChange"')
     */
    raw: string;
    /**
     * handler expression (e.g. "onChange")
     */
    handler: string;
};
type AreDirective = {
    /**
     * The tag name where the directive was found
     */
    tag: string;
    /**
     * The name of the directive (e.g. "$if")
     */
    name: string;
    /**
     * The full raw attribute text (e.g. '$if="condition"')
     */
    raw: string;
    /**
     * The value expression associated with the directive (e.g. "condition")
     */
    value?: string;
    /**
     * The full tag template where the directive was found
     */
    template: string;
};

export type { AreAttribute, AreDirective, AreInterpolation, AreListener, AreSyntaxInitOptions };
