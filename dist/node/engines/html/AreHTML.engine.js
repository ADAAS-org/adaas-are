'use strict';

var aConcept = require('@adaas/a-concept');
var aFrame = require('@adaas/a-frame');
var syntax = require('@adaas/are/syntax');
var AreHTML_compiler = require('./AreHTML.compiler');
var aService = require('@adaas/a-utils/a-service');
var aLogger = require('@adaas/a-utils/a-logger');

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);
exports.AreHTMLEngine = class AreHTMLEngine extends aConcept.A_Component {
  async injectSyntax(container, syntax$1, compiler, logger) {
    if (!syntax$1) {
      logger?.info("cyan", "Injecting AreHTMLSyntax into container scope...");
      const htmlSyntax = new syntax.AreSyntaxContext({
        rootTag: "are-root",
        standardTags: [
          "html",
          "head",
          "body",
          "div",
          "span",
          "p",
          "a",
          "ul",
          "ol",
          "li",
          "table",
          "thead",
          "tbody",
          "tr",
          "td",
          "th",
          "form",
          "input",
          "button",
          "select",
          "option",
          "textarea",
          "label",
          "img",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "script",
          "style",
          "link",
          "meta",
          "nav",
          "footer",
          "header",
          "section",
          "article",
          "aside",
          "main",
          "canvas",
          "video",
          "audio",
          "br",
          "hr",
          "strong",
          "em",
          "small",
          "pre",
          "code",
          "iframe",
          "details",
          "summary",
          "svg",
          "path",
          "circle",
          "rect",
          "polygon",
          "g",
          "defs"
        ],
        debugMode: true,
        interpolationDelimiters: ["{{", "}}"],
        bindingDelimiter: ":",
        listenerDelimiter: "@",
        directiveDelimiter: "$"
      });
      container.scope.register(htmlSyntax);
    }
    if (!compiler) {
      logger?.info("cyan", "Injecting AreHTMLCompiler into container scope...");
      container.scope.register(AreHTML_compiler.AreHTMLCompiler);
    }
  }
};
__decorateClass([
  aConcept.A_Feature.Extend({
    name: aService.A_ServiceFeatures.onBeforeLoad,
    before: /.*/
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(syntax.AreSyntaxContext)),
  __decorateParam(2, aConcept.A_Inject(AreHTML_compiler.AreHTMLCompiler)),
  __decorateParam(3, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreHTMLEngine.prototype, "injectSyntax", 1);
exports.AreHTMLEngine = __decorateClass([
  aFrame.A_Frame.Component({
    namespace: "A-ARE",
    name: "AreHTMLEngine",
    description: "HTML Rendering Engine for A-Concept Rendering Engine (ARE), responsible for processing and rendering HTML templates within the ARE framework."
  })
], exports.AreHTMLEngine);
//# sourceMappingURL=AreHTML.engine.js.map
//# sourceMappingURL=AreHTML.engine.js.map