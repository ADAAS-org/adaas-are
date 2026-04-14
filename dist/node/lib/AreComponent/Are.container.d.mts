import { A_Service, A_ServiceFeatures } from '@adaas/a-utils/a-service';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { a as AreContext } from '../../Are.context-D7w32H1G.mjs';
import { AreEngine } from '../AreEngine/AreEngine.component.mjs';
import { AreWatcher } from '../AreWatcher/AreWatcher.component.mjs';
import '@adaas/a-concept';
import '@adaas/a-utils/a-signal';
import '../AreEvent/AreEvent.context.mjs';
import '@adaas/a-utils/a-execution';
import '../AreStore/AreStore.types.mjs';
import '../AreStore/AreStore.constants.mjs';
import '../AreScene/AreScene.constants.mjs';
import '../AreAttribute/AreAttribute.types.mjs';
import '../AreAttribute/AreAttribute.constants.mjs';
import './Are.component.mjs';
import './Are.types.mjs';
import './Are.constants.mjs';
import '../AreNode/AreNode.constants.mjs';
import '../AreSyntax/AreSyntax.context.mjs';
import '../AreCompiler/AreCompiler.component.mjs';
import '../AreTransformer/AreTransformer.component.mjs';
import '../AreLoader/AreLoader.component.mjs';
import '../AreInterpreter/AreInterpreter.component.mjs';
import '../AreLifecycle/AreLifecycle.component.mjs';
import '../AreEngine/AreEngine.types.mjs';
import '../AreTokenizer/AreTokenizer.component.mjs';
import '../AreSignals/AreSignals.component.mjs';
import '../AreSignals/AreSignals.context.mjs';
import '../AreSignals/AreSignals.types.mjs';
import '../AreSignals/AreSignals.meta.mjs';

declare class AreContainer extends A_Service {
    protected [A_ServiceFeatures.onStart](engine: AreEngine, context: AreContext, watchers?: AreWatcher[], logger?: A_Logger): Promise<void>;
}

export { AreContainer };
