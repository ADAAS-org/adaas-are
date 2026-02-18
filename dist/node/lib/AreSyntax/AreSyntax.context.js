'use strict';

var aConcept = require('@adaas/a-concept');
var aFrame = require('@adaas/a-frame');

var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(result)) || result;
  return result;
};
exports.AreSyntaxContext = class AreSyntaxContext extends aConcept.A_Fragment {
  constructor(config = {}) {
    super({ name: "AreSyntaxContext" });
    this.config = config;
  }
  /**
   * identifier of the root tag to use when compiling in browser context.
   * 
   * @return {string} The root tag identifier.
   */
  get rootTag() {
    return this.config.rootTag || "are-root";
  }
  /**
   * List of standard HTML tags to recognize.
   * [!] This is a set of tags that can be ignored when determining if a node is a custom component.
   * 
   * @return {Set<string>} A set of standard HTML tag names.
   */
  get standardTags() {
    return new Set(this.config.standardTags || []);
  }
  /**
   * Enable or disable debug mode for syntax parsing.
   * When enabled, additional debug information will be logged during parsing.
   * 
   * @return {boolean} True if debug mode is enabled, false otherwise.
   */
  get debugMode() {
    return this.config.debugMode || false;
  }
  /**
   * Custom interpolation delimiters for template parsing.
   * Default is ['{{', '}}'].
   * 
   * @return {[string, string]} The opening and closing interpolation delimiters.
   */
  get interpolationDelimiters() {
    return this.config.interpolationDelimiters || ["{{", "}}"];
  }
  /**
   * Custom binding delimiter for data binding parsing.
   * Default is ':'.
   * @return {string} The binding delimiter.
   */
  get bindingDelimiter() {
    return this.config.bindingDelimiter || ":";
  }
  /**
   * Custom listener delimiter for event binding parsing.
   * Default is '@'.
   * 
   * @return {string} The listener delimiter.
   */
  get listenerDelimiter() {
    return this.config.listenerDelimiter || "@";
  }
  /**
   * Enable or disable strict mode for syntax parsing.
   * When enabled, the parser will throw errors for any syntax violations.
   * Default is true.
   * 
   * @return {boolean} True if strict mode is enabled, false otherwise.
   */
  get strictMode() {
    return this.config.strictMode !== false;
  }
  /**
   * Enable or disable whitespace trimming in templates.
   * When enabled, leading and trailing whitespace in template expressions will be trimmed.
   * Default is true.
   * 
   * @return {boolean} True if whitespace trimming is enabled, false otherwise.
   */
  get trimWhitespace() {
    return this.config.trimWhitespace !== false;
  }
  /**
   * Custom directive delimiter for directive parsing.
   * Default is '$'.
   * 
   * @return {string} The directive delimiter.
   */
  get directiveDelimiter() {
    return this.config.directiveDelimiter || "$";
  }
  /*
   * A list of custom directives to be recognized by the syntax parser.
   * Each directive should be a string representing the directive name.
   * Default is an empty array.
   */
  get customDirectives() {
    return this.config.customDirectives || [];
  }
};
exports.AreSyntaxContext = __decorateClass([
  aFrame.A_Frame.Fragment({
    namespace: "A-ARE",
    name: "AreSyntaxContext",
    description: "Context that defines the syntax rules and structures for the A-Concept Rendering Engine (ARE). It provides mechanisms for parsing and interpreting templates, attributes, directives, interpolations, and event listeners, enabling dynamic and interactive UI rendering within the ARE framework."
  })
], exports.AreSyntaxContext);
//# sourceMappingURL=AreSyntax.context.js.map
//# sourceMappingURL=AreSyntax.context.js.map