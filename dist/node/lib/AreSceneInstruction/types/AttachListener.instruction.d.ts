import { d as AreSceneInstruction, b as AreNode } from '../../../index-BD-6iOuR.js';
import { AreListener } from '../../AreSyntax/AreSyntax.types.js';
import '../../AreEvent/AreEvent.types.js';
import '@adaas/a-concept';
import '../../AreNode/AreNode.types.js';
import '../../AreScene/AreScene.types.js';
import '../../AreProps/AreProps.context.js';
import '@adaas/a-utils/a-execution';
import '../../AreStore/AreStore.context.js';

declare class AttachListenerInstruction extends AreSceneInstruction<{
    target: AreNode;
    listener: AreListener;
}> {
    private _callback;
    get listener(): AreListener;
    get event(): string;
    get target(): AreNode;
    get callback(): (e: any) => Promise<void>;
    constructor(node: AreNode, target: AreNode, listener: AreListener);
}

export { AttachListenerInstruction };
