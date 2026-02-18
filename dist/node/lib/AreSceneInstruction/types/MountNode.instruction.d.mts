import { d as AreSceneInstruction, b as AreNode } from '../../../index-DMXWCL7R.mjs';
import '../../AreEvent/AreEvent.types.mjs';
import '@adaas/a-concept';
import '../../AreNode/AreNode.types.mjs';
import '../../AreScene/AreScene.types.mjs';
import '../../AreProps/AreProps.context.mjs';
import '@adaas/a-utils/a-execution';
import '../../AreStore/AreStore.context.mjs';

declare class MountNodeInstruction extends AreSceneInstruction<{
    path: string;
}> {
    get path(): string;
    constructor(node: AreNode, path: string);
}

export { MountNodeInstruction };
