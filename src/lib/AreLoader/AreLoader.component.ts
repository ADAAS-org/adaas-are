import { A_Caller, A_Component, A_Context, A_Dependency, A_Feature, A_FormatterHelper, A_Inject, A_Scope, A_TYPES__ComponentMeta, A_TYPES__EntityFeatures } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { AreNode } from "@adaas/are/node/AreNode.entity";
import { AreFeatures } from "@adaas/are/component/Are.constants";
import { AreContext } from "@adaas/are/component/Are.context";



@A_Frame.Component({
    description: 'Entry point of the pipeline. Accepts a raw template string and orchestrates the initial processing by delegating to Syntax. Returns a structured AreNode tree ready for transformation. Knows nothing about the template content or grammar rules.'
})
export class AreLoader extends A_Component {


    // -----------------------------------------------------------------------------------------
    // ----------------------------Are-Node Load Section----------------------------------------
    // -----------------------------------------------------------------------------------------
    /**
     * Loads the AreNode 
     * 
     * @param node 
     * @param scope 
     * @param syntax 
     * @param feature 
     * @param logger 
     * @param args 
     */
    @A_Feature.Extend({
        name: A_TYPES__EntityFeatures.LOAD,
        scope: [AreNode]
    })
    async load(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(A_Feature) feature: A_Feature,

        @A_Inject(A_Logger) logger?: A_Logger,
        @A_Inject(AreContext) context?: AreContext,
        ...args: any[]
    ) {
        logger?.debug('red', `Loading node <${node.aseid.toString()}> with content:`, scope);

        /**
         * If Node has a custom component Defined
         */
        if (node.component) {
            /**
             * Chain all methods to load data from component.
             */
            context?.startPerformance('Total AreFeatures.onData')
            await feature.chain(node.component, AreFeatures.onData, scope);
            context?.endPerformance('Total AreFeatures.onData')

            context?.startPerformance('Total AreFeatures.onLoad')
            await feature.chain(node.component, AreFeatures.onStyles, scope);
            context?.endPerformance('Total AreFeatures.onLoad')

            context?.startPerformance('Total AreFeatures.onTemplate')
            await feature.chain(node.component, AreFeatures.onTemplate, scope);
            context?.endPerformance('Total AreFeatures.onTemplate')
        } 
        // else {
        //     logger?.warning(
        //         'Component Not Found',
        //         `No component registered for entity: ${node.aseid.entity}. Please ensure that the component is registered in the scope before rendering.`
        //     );
        // }

        /**
         * 2. Tokenize Node Content
         */
        context?.startPerformance('Tokenization')
        node.tokenize();
        context?.endPerformance('Tokenization')

        /**
         * 3. We have to extract node content and create child nodes if content exists, since it can impact the rendering and compilation process, for example if we have some directives that are affecting the structure of the node or its children, we need to have them in place before compilation to ensure that they are properly processed and their instructions are added to the render plan.
         */
        for (let i = 0; i < node.children.length; i++) {
            const childNode = node.children[i];

            const res =  childNode.load();
            if(res instanceof Promise) {
                await res;
            }
        }
    }
}