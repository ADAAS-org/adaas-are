import { A_Caller, A_Component, A_Container, A_Feature, A_Inject } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame";
import { AreSyntaxContext } from "@adaas/are/syntax";
import { AreHTMLCompiler } from "./AreHTML.compiler";
import { A_ServiceFeatures } from "@adaas/a-utils/a-service";
import { A_Logger } from "@adaas/a-utils/a-logger";



@A_Frame.Component({
    namespace: 'A-ARE',
    name: 'AreHTMLEngine',
    description: 'HTML Rendering Engine for A-Concept Rendering Engine (ARE), responsible for processing and rendering HTML templates within the ARE framework.'
})
export class AreHTMLEngine extends A_Component {

    /**
     * Inject AreHTMLSyntax into the container scope before loading
     * 
     * @param container 
     */
    @A_Feature.Extend({
        name: A_ServiceFeatures.onBeforeLoad,
        before: /.*/
    })
    async injectSyntax(
        @A_Inject(A_Caller) container: A_Container,
        @A_Inject(AreSyntaxContext) syntax?: AreSyntaxContext,
        @A_Inject(AreHTMLCompiler) compiler?: AreHTMLCompiler,
        @A_Inject(A_Logger) logger?: A_Logger,
    ) {
        if (!syntax) {
            logger?.info('cyan', 'Injecting AreHTMLSyntax into container scope...');

            const htmlSyntax = new AreSyntaxContext({
                rootTag: 'are-root',
                standardTags: [
                    "html", "head", "body", "div", "span", "p", "a", "ul", "ol", "li",
                    "table", "thead", "tbody", "tr", "td", "th", "form", "input", "button",
                    "select", "option", "textarea", "label", "img", "h1", "h2", "h3", "h4",
                    "h5", "h6", "script", "style", "link", "meta", "nav", "footer", "header",
                    "section", "article", "aside", "main", "canvas", "video", "audio", "br",
                    "hr", "strong", "em", "small", "pre", "code", "iframe", "details",
                    "summary", "svg", "path", "circle", "rect", "polygon", "g", "defs"
                ],
                interpolationDelimiters: ['{{', '}}'],
                tagDelimiters: ['<', '>'],
                bindingDelimiter: ':',
                eventDelimiter: '@',
                directiveDelimiter: '$',
            });

            container.scope.register(htmlSyntax);
        }

        if (!compiler) {
            logger?.info('cyan', 'Injecting AreHTMLCompiler into container scope...');
            container.scope.register(AreHTMLCompiler);
        }
    }

}