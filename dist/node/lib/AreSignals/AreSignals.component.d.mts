import { A_Component, A_Scope, A_Feature } from '@adaas/a-concept';
import { A_SignalVector, A_SignalState } from '@adaas/a-utils/a-signal';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { g as AreNode } from '../../Are.context-D7w32H1G.mjs';
import { AreEvent } from '../AreEvent/AreEvent.context.mjs';
import { AreSignalsContext } from './AreSignals.context.mjs';
import '../AreStore/AreStore.types.mjs';
import '../AreStore/AreStore.constants.mjs';
import '../AreScene/AreScene.constants.mjs';
import '../AreAttribute/AreAttribute.types.mjs';
import '../AreAttribute/AreAttribute.constants.mjs';
import '../AreComponent/Are.component.mjs';
import '../AreComponent/Are.types.mjs';
import '../AreComponent/Are.constants.mjs';
import '@adaas/a-utils/a-execution';
import '../AreNode/AreNode.constants.mjs';
import './AreSignals.types.mjs';
import './AreSignals.meta.mjs';

declare class AreSignals extends A_Component {
    handleSignalVector(vector: A_SignalVector, context: AreSignalsContext, state: A_SignalState, scope: A_Scope, logger?: A_Logger): Promise<void>;
    /**
     * Handles events triggered on the AreNode
     *
     * @param node
     * @param scope
     * @param event
     * @param scene
     * @param feature
     * @param args
     */
    propagateEvent(node: AreNode, scope: A_Scope, event: AreEvent, feature: A_Feature, logger?: A_Logger, ...args: any[]): Promise<void>;
}

export { AreSignals };
