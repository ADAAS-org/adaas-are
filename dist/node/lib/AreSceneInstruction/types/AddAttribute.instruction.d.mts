import { d as AreSceneInstruction, b as AreNode } from '../../../index-DMXWCL7R.mjs';
import '../../AreEvent/AreEvent.types.mjs';
import '@adaas/a-concept';
import '../../AreNode/AreNode.types.mjs';
import '../../AreScene/AreScene.types.mjs';
import '../../AreProps/AreProps.context.mjs';
import '@adaas/a-utils/a-execution';
import '../../AreStore/AreStore.context.mjs';

declare class AddAttributeInstruction extends AreSceneInstruction<{
    name: string;
    value: string;
}> {
    get name(): string;
    get value(): string;
    constructor(node: AreNode, name: string, value: string);
}

export { AddAttributeInstruction };
