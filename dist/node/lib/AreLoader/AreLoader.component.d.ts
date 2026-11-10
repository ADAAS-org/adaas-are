import { A_Component, A_Scope, A_Feature } from '@adaas/a-concept';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { g as AreNode, a as AreContext } from '../../Are.context-BX9KwdNy.js';
import '@adaas/a-utils/a-signal';
import '../AreComponent/Are.component.js';
import '../AreComponent/Are.types.js';
import '../AreComponent/Are.constants.js';
import '../AreSignals/AreSignals.types.js';
import '../AreSignals/AreSignals.meta.js';
import '../AreEvent/AreEvent.context.js';
import '@adaas/a-utils/a-execution';
import '../AreStore/AreStore.types.js';
import '../AreStore/AreStore.constants.js';
import '../AreScene/AreScene.constants.js';
import '../AreAttribute/AreAttribute.types.js';
import '../AreAttribute/AreAttribute.constants.js';
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
