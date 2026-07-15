import { A_Component, A_Scope, A_Feature, A_TYPES__Ctor } from '@adaas/a-concept';
import { A_SignalVector, A_SignalState } from '@adaas/a-utils/a-signal';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { g as AreNode } from '../../Are.context-DfIfWCiL.mjs';
import { AreEvent } from '../AreEvent/AreEvent.context.mjs';
import { AreSignalsContext } from './AreSignals.context.mjs';
import { Are } from '../AreComponent/Are.component.mjs';
import '../AreStore/AreStore.types.mjs';
import '../AreStore/AreStore.constants.mjs';
import '../AreScene/AreScene.constants.mjs';
import '../AreAttribute/AreAttribute.types.mjs';
import '../AreAttribute/AreAttribute.constants.mjs';
import '@adaas/a-utils/a-execution';
import '../AreNode/AreNode.constants.mjs';
import './AreSignals.types.mjs';
import './AreSignals.meta.mjs';
import '../AreComponent/Are.types.mjs';
import '../AreComponent/Are.constants.mjs';

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
    /**
     * Notifies all mounted nodes whose component is exactly the specified constructor
     * (strict match — subclasses are excluded).
     *
     * @param ctor  - The Are component constructor to target
     * @param event - The event to emit to all matching nodes
     */
    notifyExact<T extends Are>(ctor: A_TYPES__Ctor<T>, event: AreEvent): Promise<void>;
    /**
     * Notifies all mounted nodes whose component is an instance of the specified
     * constructor, including nodes backed by subclasses (polymorphic match).
     *
     * @param ctor  - The Are component constructor to target
     * @param event - The event to emit to all matching nodes
     */
    notifyAll<T extends Are>(ctor: A_TYPES__Ctor<T>, event: AreEvent): Promise<void>;
    /**
     * Notifies all mounted nodes whose component matches the specified constructor.
     *
     * By default uses polymorphic matching (includes subclasses). Pass `{ exact: true }`
     * to restrict to the exact constructor only.
     *
     * @param ctor    - The Are component constructor to target
     * @param event   - The event to emit to all matching nodes
     * @param options - `exact`: when true, subclasses are excluded (defaults to false)
     */
    notify<T extends Are>(ctor: A_TYPES__Ctor<T>, event: AreEvent, options?: {
        exact?: boolean;
    }): Promise<void>;
    protected traverseAndNotify(node: AreNode, event: AreEvent, match: (component: Are) => boolean): Promise<void>;
}

export { AreSignals };
