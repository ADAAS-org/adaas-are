export type AreSyntaxAttributeType = 'directive'
    | 'binding'
    | 'event'
    | 'static'
    | 'custom';



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
     * Custom tag delimiters for template parsing.
     * Default is ['<', '>'].
     */
    tagDelimiters: [string, string];

    /**
     * Custom binding delimiters for data binding parsing.
     * Default is ':'.
     */
    bindingDelimiter?: string;

    /**
     * Custom events delimiters for event binding parsing.
     * Default is '@'.
     */
    eventDelimiter?: string;

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
    standardTags?: string[]
};


// ==================================================================================
// ========================= SYNTAX Structures TYPES ================================
// ==================================================================================

export type AreAttributeTemplate = {
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
     * The prefix used in the attribute (e.g. ":" for bindings, "@" for listeners, "$" for directives)
     */
    prefix: string;
    /**
     * The type of the attribute based on its prefix (e.g. "binding", "event", "directive", "static")
     */
    type: AreSyntaxAttributeType;

};

export type AreInterpolationTemplate = {
    /**
     * Tag name where the interpolation was found
     */
    raw: string;
    /**
     * The key inside the interpolation (e.g. "user.name" for {{ user.name }})
     */
    key: string;
    /**
     * Position in the template where this interpolation was found 
     */
    position: number;
}


export type AreListener = {
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


export type AreDirectiveTemplate = {
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
