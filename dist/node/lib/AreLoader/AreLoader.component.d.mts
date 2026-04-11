import { A_Component, A_Scope, A_Feature } from '@adaas/a-concept';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { g as AreNode, a as AreContext } from '../../Are.context-D7w32H1G.mjs';
import '@adaas/a-utils/a-signal';
import '../AreEvent/AreEvent.context.mjs';
import '@adaas/a-utils/a-execution';
import '../AreStore/AreStore.types.mjs';
import '../AreStore/AreStore.constants.mjs';
import '../AreScene/AreScene.constants.mjs';
import '../AreAttribute/AreAttribute.types.mjs';
import '../AreAttribute/AreAttribute.constants.mjs';
import '../AreComponent/Are.component.mjs';
import '../AreComponent/Are.types.mjs';
import '../AreComponent/Are.constants.mjs';
import '../AreNode/AreNode.constants.mjs';

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
