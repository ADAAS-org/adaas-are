import { A_Component, A_Scope } from '@adaas/a-concept';
import { g as AreNode, k as AreScene } from '../../Are.context-9Ija_fdC.js';
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

declare class AreTransformer extends A_Component {
    transform(node: AreNode, scope: A_Scope, scene: AreScene, ...args: any[]): void;
}

export { AreTransformer };
