import { d as AreSceneInstruction, b as AreNode } from '../../../index-DMXWCL7R.mjs';
import '../../AreEvent/AreEvent.types.mjs';
import '@adaas/a-concept';
import '../../AreNode/AreNode.types.mjs';
import '../../AreScene/AreScene.types.mjs';
import '../../AreProps/AreProps.context.mjs';
import '@adaas/a-utils/a-execution';
import '../../AreStore/AreStore.context.mjs';

declare class AddStylePropertyInstruction extends AreSceneInstruction<{
    property: string;
    value: string;
}> {
    get styles(): string;
    get value(): string;
    constructor(node: AreNode, property: string, value: string);
}

export { AddStylePropertyInstruction };
