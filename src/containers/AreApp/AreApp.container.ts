import { A_Dependency, A_Feature, A_Inject } from "@adaas/a-concept";
import { A_Config, A_Logger, A_Polyfill, A_Service, A_ServiceFeatures, A_Signal } from "@adaas/a-utils";
import { AreCompiler } from "@adaas/are/components/AreCompiler/AreCompiler.component";
import { AreScene } from "@adaas/are/context/AreScene/AreScene.context";
import { AreNode } from "@adaas/are/entities/AreNode/AreNode.entity";
import { AreInitSignal } from "src/signals/AreInit.signal";



export class AreApp extends A_Service {

    get roots(): AreNode[] {
        return this.scope.resolveFlatAll<AreNode>(AreNode)!;
    }

    addRoot(
        node: AreNode
    ) {
        this.scope.register(node);
    }

    @A_Feature.Extend()
    protected async [A_ServiceFeatures.onAfterLoad](
        @A_Inject(A_Logger) logger: A_Logger,
    ): Promise<void> {
        logger.info('cyan', `UI Application mounted at <${this.roots.map(root => root.aseid.scope).join(', ')}> with ${this.roots.length} root nodes.`);
    }


    @A_Feature.Extend()
    protected async [A_ServiceFeatures.onStart](

        @A_Dependency.Required()
        @A_Inject(A_Logger) logger: A_Logger,


    ): Promise<void> {

        for(const root of this.roots) {
            logger.info('cyan', `Compiling root node... : <${root.aseid.entity}> : `, root.aseid.toString());

           await root.load();

           await root.compile();

           await root.render();
        }

        // const signal = new AreInitSignal({ data: { ready: true } });

        // await signal.next(this.scope);
    }

}