import { A_Component, A_Scope, A_Feature } from '@adaas/a-concept';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { g as AreNode, a as AreContext } from '../../Are.context-9Ija_fdC.js';
import '@adaas/a-utils/a-signal';
import '../AreEvent/AreEvent.context.js';
import '@adaas/a-utils/a-execution';
import '../AreStore/AreStore.types.js';
import '../AreStore/AreStore.constants.js';
import '../AreScene/AreScene.constants.js';
import '../AreAttribute/AreAttribute.types.js';
import '../AreAttribute/AreAttribute.constants.js';
import '../AreComponent/Are.component.js';
import '../AreComponent/Are.types.js';
import '../AreComponent/Are.constants.js';
import '../AreNode/AreNode.constants.js';

declare class AreLoader extends A_Component {
    /**
     * Loads the AreNode
     *
     * @param node
     * @param scope
     * @param syntax
     * @param feature
     * @param logger
     * @param args
     */
    load(node: AreNode, scope: A_Scope, feature: A_Feature, logger?: A_Logger, context?: AreContext, ...args: any[]): Promise<void>;
}

export { AreLoader };
