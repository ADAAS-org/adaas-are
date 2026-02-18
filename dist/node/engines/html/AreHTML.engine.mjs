import { __decorateClass, __decorateParam } from '../../chunk-EQQGB2QZ.mjs';
import { A_Feature, A_Inject, A_Caller, A_Component } from '@adaas/a-concept';
import { A_Frame } from '@adaas/a-frame';
import { AreSyntaxContext } from '@adaas/are/syntax';
import { AreHTMLCompiler } from './AreHTML.compiler';
import { A_ServiceFeatures } from '@adaas/a-utils/a-service';
import { A_Logger } from '@adaas/a-utils/a-logger';

let AreHTMLEngine = class extends A_Component {
  async injectSyntax(container, syntax, compiler, logger) {
    if (!syntax) {
      logger?.info("cyan", "Injecting AreHTMLSyntax into container scope...");
      const htmlSyntax = new AreSyntaxContext({
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
      container.scope.register(AreHTMLCompiler);
    }
  }
};
__decorateClass([
  A_Feature.Extend({
    name: A_ServiceFeatures.onBeforeLoad,
    before: /.*/
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreSyntaxContext)),
  __decorateParam(2, A_Inject(AreHTMLCompiler)),
  __decorateParam(3, A_Inject(A_Logger))
], AreHTMLEngine.prototype, "injectSyntax", 1);
AreHTMLEngine = __decorateClass([
  A_Frame.Component({
    namespace: "A-ARE",
    name: "AreHTMLEngine",
    description: "HTML Rendering Engine for A-Concept Rendering Engine (ARE), responsible for processing and rendering HTML templates within the ARE framework."
  })
], AreHTMLEngine);

export { AreHTMLEngine };
//# sourceMappingURL=AreHTML.engine.mjs.map
//# sourceMappingURL=AreHTML.engine.mjs.map