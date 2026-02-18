import { d as AreSceneInstruction, b as AreNode } from '../../../index-BD-6iOuR.js';
import '../../AreEvent/AreEvent.types.js';
import '@adaas/a-concept';
import '../../AreNode/AreNode.types.js';
import '../../AreScene/AreScene.types.js';
import '../../AreProps/AreProps.context.js';
import '@adaas/a-utils/a-execution';
import '../../AreStore/AreStore.context.js';

declare class AddAttributeInstruction extends AreSceneInstruction<{
    name: string;
    value: string;
}> {
    get name(): string;
    get value(): string;
    constructor(node: AreNode, name: string, value: string);
}

export { AddAttributeInstruction };
