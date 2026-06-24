import { A_Component, A_Scope, A_Feature, A_TYPES__Ctor } from '@adaas/a-concept';
import { A_SignalVector, A_SignalState } from '@adaas/a-utils/a-signal';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { g as AreNode } from '../../Are.context-DjbYIes7.js';
import { AreEvent } from '../AreEvent/AreEvent.context.js';
import { AreSignalsContext } from './AreSignals.context.js';
import { Are } from '../AreComponent/Are.component.js';
import '../AreStore/AreStore.types.js';
import '../AreStore/AreStore.constants.js';
import '../AreScene/AreScene.constants.js';
import '../AreAttribute/AreAttribute.types.js';
import '../AreAttribute/AreAttribute.constants.js';
import '@adaas/a-utils/a-execution';
import '../AreNode/AreNode.constants.js';
import './AreSignals.types.js';
import './AreSignals.meta.js';
import '../AreComponent/Are.types.js';
import '../AreComponent/Are.constants.js';

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
