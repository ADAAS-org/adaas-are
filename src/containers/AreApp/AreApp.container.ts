import { A_Dependency, A_Feature, A_Inject } from "@adaas/a-concept";
import { A_Config, A_Logger, A_Polyfill, A_Service, A_ServiceFeatures, A_Signal } from "@adaas/a-utils";
import { AreCompiler } from "@adaas/are/components/AreCompiler/AreCompiler.component";
import { AreScene } from "@adaas/are/context/AreScene/AreScene.context";
import { AreInitSignal } from "src/signals/AreInit.signal";



export class AreApp extends A_Service {

    get root(): AreScene {
        return this.scope.resolve<AreScene>(AreScene)!;
    }



    @A_Feature.Extend()
    protected async [A_ServiceFeatures.onAfterLoad](
        @A_Inject(A_Logger) logger: A_Logger,
    ): Promise<void> {

        logger.info('cyan', `UI Application mounted at <${this.root.name}>`);
    }


    @A_Feature.Extend()
    protected async [A_ServiceFeatures.onStart](

        @A_Dependency.Required()
        @A_Inject(A_Logger) logger: A_Logger,

        @A_Dependency.Required()
        @A_Inject(AreScene) scene: AreScene,

        @A_Inject(AreCompiler) compiler: AreCompiler,

        @A_Inject(A_Config) config?: A_Config<any>,

    ): Promise<void> {
        const signal = new AreInitSignal({ data: { ready: true } });

        await signal.next(this.scope);
    }

}