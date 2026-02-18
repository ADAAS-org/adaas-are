import { A_Component, A_Scope } from '@adaas/a-concept';
import { A_Config } from '@adaas/a-utils/a-config';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { A_ServiceFeatures } from '@adaas/a-utils/a-service';
import { c as AreScene } from '../../index-BD-6iOuR.js';
import '../AreEvent/AreEvent.types.js';
import '../AreNode/AreNode.types.js';
import '../AreScene/AreScene.types.js';
import '../AreProps/AreProps.context.js';
import '@adaas/a-utils/a-execution';
import '../AreStore/AreStore.context.js';

declare class AreRouter extends A_Component {
    protected [A_ServiceFeatures.onBeforeLoad](scope: A_Scope, root?: AreScene, config?: A_Config<any>, logger?: A_Logger): Promise<void>;
}

export { AreRouter };
