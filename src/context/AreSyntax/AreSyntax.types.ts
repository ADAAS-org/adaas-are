

export type AreSyntaxInitOptions = {
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
    bindingDelimiter: string;


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
};