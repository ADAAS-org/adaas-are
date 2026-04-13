import { A_Dependency, A_Feature, A_Inject } from "@adaas/a-concept";
import { A_Service, A_ServiceFeatures } from "@adaas/a-utils/a-service";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { AreContext } from "@adaas/are/component/Are.context";
import { AreEngine } from "@adaas/are/engine/AreEngine.component";
import { AreWatcher } from "@adaas/are/watcher/AreWatcher.component";



export class AreApp extends A_Service {

    @A_Feature.Extend()
    protected async [A_ServiceFeatures.onStart](
        @A_Dependency.Required()
        @A_Inject(AreEngine) engine: AreEngine,

        @A_Dependency.Required()
        @A_Inject(AreContext) context: AreContext,

        @A_Dependency.All()
        @A_Dependency.Flat()
        @A_Inject(AreWatcher) watchers: AreWatcher[],

        @A_Inject(A_Logger) logger?: A_Logger,
    ): Promise<void> {
        try {

            for (const watcher of watchers) {
                await watcher.init();
            }

            await engine.load();
            await engine.build();
            await engine.execute();

            for (const watcher of watchers) {
                await watcher.watch();
            }

            logger?.info('cyan', `UI Application started at <${context.roots.map(root => root.aseid.id).join(', ')}> with ${context.roots.length} root nodes.`);

            logger?.debug('cyan',
                'Performance:',
                '------------------------------ \n',
                ...context.performance,
                '------------------------------ \n',
                'Stats:',
                '------------------------------ \n',
                ...context.stats
            );

        } catch (error) {
            logger?.error(error);
        }
    }
}