import { d as AreSceneInstruction, b as AreNode } from '../../../index-DMXWCL7R.mjs';
import { AreListener } from '../../AreSyntax/AreSyntax.types.mjs';
import '../../AreEvent/AreEvent.types.mjs';
import '@adaas/a-concept';
import '../../AreNode/AreNode.types.mjs';
import '../../AreScene/AreScene.types.mjs';
import '../../AreProps/AreProps.context.mjs';
import '@adaas/a-utils/a-execution';
import '../../AreStore/AreStore.context.mjs';

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
