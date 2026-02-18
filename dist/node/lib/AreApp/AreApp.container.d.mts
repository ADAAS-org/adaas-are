import { AreContext } from '../AreComponent/Are.context.mjs';
import { AreSyntax } from '../AreSyntax/AreSyntax.component.mjs';
import { A_Service, A_ServiceFeatures } from '@adaas/a-utils/a-service';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { A_SignalBus } from '@adaas/a-utils/a-signal';
import '@adaas/a-concept';
import '../../index-DMXWCL7R.mjs';
import '../AreEvent/AreEvent.types.mjs';
import '../AreNode/AreNode.types.mjs';
import '../AreScene/AreScene.types.mjs';
import '../AreProps/AreProps.context.mjs';
import '@adaas/a-utils/a-execution';
import '../AreStore/AreStore.context.mjs';
import '../AreSyntax/AreSyntax.types.mjs';
import '../AreSyntax/AreSyntax.context.mjs';

declare class AreApp extends A_Service {
    protected [A_ServiceFeatures.onAfterLoad](context: AreContext, logger?: A_Logger): Promise<void>;
    protected [A_ServiceFeatures.onStart](context: AreContext, syntax: AreSyntax, bus: A_SignalBus, logger?: A_Logger): Promise<void>;
}

export { AreApp };
