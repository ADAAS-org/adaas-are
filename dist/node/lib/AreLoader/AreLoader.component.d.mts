import { A_Component, A_Scope, A_Feature } from '@adaas/a-concept';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { g as AreNode, a as AreContext } from '../../Are.context-CGuVNQ-q.mjs';
import '@adaas/a-utils/a-signal';
import '../AreComponent/Are.component.mjs';
import '../AreComponent/Are.types.mjs';
import '../AreComponent/Are.constants.mjs';
import '../AreSignals/AreSignals.types.mjs';
import '../AreSignals/AreSignals.meta.mjs';
import '../AreEvent/AreEvent.context.mjs';
import '@adaas/a-utils/a-execution';
import '../AreStore/AreStore.types.mjs';
import '../AreStore/AreStore.constants.mjs';
import '../AreScene/AreScene.constants.mjs';
import '../AreAttribute/AreAttribute.types.mjs';
import '../AreAttribute/AreAttribute.constants.mjs';
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
    /**
     * Catch a lazily-resolved node up on the component-specific part of `init`.
     *
     * `AreLifecycle.init` ran BEFORE the resolver supplied the class, so it saw
     * no component: the node got no store of its own and its component init
     * hooks never fired. Without its own store the node's reads/writes (data,
     * props injected by the compiler) land in the PARENT's store — so props
     * bound on a lazy tag were lost and its data leaked into the host.
     */
    protected initResolvedComponent(node: AreNode, scope: A_Scope, feature: A_Feature): void;
}

export { AreLoader };
