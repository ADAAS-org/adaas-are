import { A_Component, A_Scope, A_Feature } from '@adaas/a-concept';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { AreNode } from '@adaas/are/node/AreNode.entity';
import { AreContext } from '@adaas/are/component/Are.context';

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
