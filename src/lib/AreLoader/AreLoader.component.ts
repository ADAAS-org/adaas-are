import { A_Caller, A_Component, A_Context, A_Dependency, A_Feature, A_FormatterHelper, A_Inject, A_Scope, A_TYPES__ComponentMeta, A_TYPES__Ctor, A_TYPES__EntityFeatures } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame/core";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { AreNode } from "@adaas/are/node/AreNode.entity";
import { AreFeatures } from "@adaas/are/component/Are.constants";
import { AreContext } from "@adaas/are/component/Are.context";
import { AreComponentResolver } from "@adaas/are/resolver/AreComponentResolver.fragment";



@A_Frame.Define({
    namespace: 'A-ARE',
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
         * If the tag does not resolve to a registered component, give an
         * (optional) AreComponentResolver a chance to supply it asynchronously
         * — the engine's runtime / lazy component-loading hook.
         *
         * This is strictly opt-in and guarded: it only runs for an unresolved
         * custom-element tag (must contain a hyphen, per the spec) AND only
         * when a resolver fragment is registered in the scope. With no resolver
         * present the load path is byte-for-byte unchanged. A returned class is
         * registered into the node's scope so `node.component` resolves it from
         * here on (scope.register bumps the resolution version).
         */
        if (!node.component && node.aseid.entity.includes('-')) {
            const resolver = scope.resolve(AreComponentResolver as A_TYPES__Ctor<AreComponentResolver>);

            if (resolver) {
                const Component = await resolver.resolve(node.aseid.entity);

                if (Component) {
                    node.registerComponent(Component);
                }
            }
        }

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
         *
         * Siblings are independent, so their loads run concurrently: any async
         * `data()` resolution overlaps instead of serializing one child after
         * another. `Promise.all` transparently handles children whose `load()`
         * returns synchronously (non-thenables resolve immediately).
         */
        await Promise.all(node.children.map(childNode => childNode.load()));
    }
}