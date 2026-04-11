import { A_Component, A_Scope } from '@adaas/a-concept';
import { g as AreNode, k as AreScene } from '../../Are.context-D7w32H1G.mjs';
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

declare class AreTransformer extends A_Component {
    transform(node: AreNode, scope: A_Scope, scene: AreScene, ...args: any[]): void;
}

export { AreTransformer };
