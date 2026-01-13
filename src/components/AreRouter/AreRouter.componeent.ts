import { A_Component, A_Dependency, A_Feature, A_Inject, A_Scope } from "@adaas/a-concept";
import { A_Config, A_Logger, A_ServiceFeatures } from "@adaas/a-utils";
import { AreScene } from "@adaas/are/context/AreScene/AreScene.context";

export class AreRouter extends A_Component {



    @A_Feature.Extend()
    protected async [A_ServiceFeatures.onBeforeLoad](
        @A_Dependency.Parent()
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreScene) root?: AreScene,
        @A_Inject(A_Config) config?: A_Config<any>,
        @A_Inject(A_Logger) logger?: A_Logger,
    ): Promise<void> {
        // 1) Initialize Scene if not present
        logger?.debug('cyan', `AreRouter initializing  ...`);


    }

}