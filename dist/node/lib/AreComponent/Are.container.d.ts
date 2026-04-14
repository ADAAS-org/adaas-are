import { A_Service, A_ServiceFeatures } from '@adaas/a-utils/a-service';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { a as AreContext } from '../../Are.context-9Ija_fdC.js';
import { AreEngine } from '../AreEngine/AreEngine.component.js';
import { AreWatcher } from '../AreWatcher/AreWatcher.component.js';
import '@adaas/a-concept';
import '@adaas/a-utils/a-signal';
import '../AreEvent/AreEvent.context.js';
import '@adaas/a-utils/a-execution';
import '../AreStore/AreStore.types.js';
import '../AreStore/AreStore.constants.js';
import '../AreScene/AreScene.constants.js';
import '../AreAttribute/AreAttribute.types.js';
import '../AreAttribute/AreAttribute.constants.js';
import './Are.component.js';
import './Are.types.js';
import './Are.constants.js';
import '../AreNode/AreNode.constants.js';
import '../AreSyntax/AreSyntax.context.js';
import '../AreCompiler/AreCompiler.component.js';
import '../AreTransformer/AreTransformer.component.js';
import '../AreLoader/AreLoader.component.js';
import '../AreInterpreter/AreInterpreter.component.js';
import '../AreLifecycle/AreLifecycle.component.js';
import '../AreEngine/AreEngine.types.js';
import '../AreTokenizer/AreTokenizer.component.js';
import '../AreSignals/AreSignals.component.js';
import '../AreSignals/AreSignals.context.js';
import '../AreSignals/AreSignals.types.js';
import '../AreSignals/AreSignals.meta.js';

declare class AreContainer extends A_Service {
    protected [A_ServiceFeatures.onStart](engine: AreEngine, context: AreContext, watchers?: AreWatcher[], logger?: A_Logger): Promise<void>;
}

export { AreContainer };
