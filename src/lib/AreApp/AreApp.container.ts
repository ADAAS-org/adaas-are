import { A_Dependency, A_Feature, A_Inject } from "@adaas/a-concept";
import { AreContext } from "@adaas/are/component";
import { AreSyntax } from "@adaas/are/syntax";
import { AreInitSignal } from "@adaas/are/signals";
import { A_Service, A_ServiceFeatures } from "@adaas/a-utils/a-service";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { A_SignalBus } from "@adaas/a-utils/a-signal";



export class AreApp extends A_Service {



    @A_Feature.Extend()
    protected async [A_ServiceFeatures.onAfterLoad](
        @A_Dependency.Required()
        @A_Inject(AreContext) context: AreContext,

        @A_Inject(A_Logger) logger?: A_Logger,
    ): Promise<void> {

    }


    // @A_Feature.Extend()
    // protected async [A_ServiceFeatures.onBeforeLoad](
    //     @A_Inject(AreSyntax) syntax: AreSyntax,
    //     @A_Inject(AreContext) context: AreContext,

    //     @A_Inject(A_Logger) logger?: A_Logger,
    // ): Promise<void> {
    //     logger?.debug('cyan', `Initializing AreScene in AreBrowserCompiler...`);


    // }


    @A_Feature.Extend()
    protected async [A_ServiceFeatures.onStart](
        @A_Dependency.Required()
        @A_Inject(AreContext) context: AreContext,
        @A_Inject(AreSyntax) syntax: AreSyntax,
        @A_Inject(A_SignalBus) bus: A_SignalBus,

        @A_Inject(A_Logger) logger?: A_Logger,
    ): Promise<void> {

        for (const root of syntax.extractRoots(context.source)) {

            context.addRoot(root)

            let startTime = Date.now();

            await root.load();

            logger?.info('red', `Root <${root.aseid.id}> loaded in ${Date.now() - startTime} ms.`);

            startTime = Date.now();

            root.compile();

            logger?.info('red', `Root <${root.aseid.id}> compiled in ${Date.now() - startTime} ms.`);

            startTime = Date.now();

            root.render();

            logger?.info('red', `Root <${root.aseid.id}> rendered in ${Date.now() - startTime} ms.`);
        }

        logger?.debug('cyan', `UI Application started at <${context.roots.map(root => root.aseid.id).join(', ')}> with ${context.roots.length} root nodes.`);

        await bus.next(new AreInitSignal())
    }

}