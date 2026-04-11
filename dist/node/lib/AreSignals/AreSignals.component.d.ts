import { A_Component, A_Scope, A_Feature } from '@adaas/a-concept';
import { A_SignalVector, A_SignalState } from '@adaas/a-utils/a-signal';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { g as AreNode } from '../../Are.context-9Ija_fdC.js';
import { AreEvent } from '../AreEvent/AreEvent.context.js';
import { AreSignalsContext } from './AreSignals.context.js';
import '../AreStore/AreStore.types.js';
import '../AreStore/AreStore.constants.js';
import '../AreScene/AreScene.constants.js';
import '../AreAttribute/AreAttribute.types.js';
import '../AreAttribute/AreAttribute.constants.js';
import '../AreComponent/Are.component.js';
import '../AreComponent/Are.types.js';
import '../AreComponent/Are.constants.js';
import '@adaas/a-utils/a-execution';
import '../AreNode/AreNode.constants.js';
import './AreSignals.types.js';
import './AreSignals.meta.js';

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
