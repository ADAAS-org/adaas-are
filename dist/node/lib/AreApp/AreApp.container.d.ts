import { AreContext } from '../AreComponent/Are.context.js';
import { AreSyntax } from '../AreSyntax/AreSyntax.component.js';
import { A_Service, A_ServiceFeatures } from '@adaas/a-utils/a-service';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { A_SignalBus } from '@adaas/a-utils/a-signal';
import '@adaas/a-concept';
import '../../index-BD-6iOuR.js';
import '../AreEvent/AreEvent.types.js';
import '../AreNode/AreNode.types.js';
import '../AreScene/AreScene.types.js';
import '../AreProps/AreProps.context.js';
import '@adaas/a-utils/a-execution';
import '../AreStore/AreStore.context.js';
import '../AreSyntax/AreSyntax.types.js';
import '../AreSyntax/AreSyntax.context.js';

declare class AreApp extends A_Service {
    protected [A_ServiceFeatures.onAfterLoad](context: AreContext, logger?: A_Logger): Promise<void>;
    protected [A_ServiceFeatures.onStart](context: AreContext, syntax: AreSyntax, bus: A_SignalBus, logger?: A_Logger): Promise<void>;
}

export { AreApp };
