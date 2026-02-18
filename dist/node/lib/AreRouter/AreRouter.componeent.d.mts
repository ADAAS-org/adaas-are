import { A_Component, A_Scope } from '@adaas/a-concept';
import { A_Config } from '@adaas/a-utils/a-config';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { A_ServiceFeatures } from '@adaas/a-utils/a-service';
import { c as AreScene } from '../../index-DMXWCL7R.mjs';
import '../AreEvent/AreEvent.types.mjs';
import '../AreNode/AreNode.types.mjs';
import '../AreScene/AreScene.types.mjs';
import '../AreProps/AreProps.context.mjs';
import '@adaas/a-utils/a-execution';
import '../AreStore/AreStore.context.mjs';

declare class AreRouter extends A_Component {
    protected [A_ServiceFeatures.onBeforeLoad](scope: A_Scope, root?: AreScene, config?: A_Config<any>, logger?: A_Logger): Promise<void>;
}

export { AreRouter };
