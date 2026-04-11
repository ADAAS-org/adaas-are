import { A_Component, A_Scope } from '@adaas/a-concept';
import { AreNode } from '@adaas/are/node/AreNode.entity';
import { AreScene } from '@adaas/are/scene/AreScene.context';

declare class AreTransformer extends A_Component {
    transform(node: AreNode, scope: A_Scope, scene: AreScene, ...args: any[]): void;
}

export { AreTransformer };
