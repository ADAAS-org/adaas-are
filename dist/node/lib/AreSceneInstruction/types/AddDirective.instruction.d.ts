import { d as AreSceneInstruction, b as AreNode } from '../../../index-BD-6iOuR.js';
import { AreDirective } from '../../AreSyntax/AreSyntax.types.js';
import '../../AreEvent/AreEvent.types.js';
import '@adaas/a-concept';
import '../../AreNode/AreNode.types.js';
import '../../AreScene/AreScene.types.js';
import '../../AreProps/AreProps.context.js';
import '@adaas/a-utils/a-execution';
import '../../AreStore/AreStore.context.js';

declare class AddDirectiveInstruction extends AreSceneInstruction<{
    directive: AreDirective;
    value: any;
}> {
    get directive(): AreDirective;
    get value(): any;
    constructor(node: AreNode, directive: AreDirective, value: any);
}

export { AddDirectiveInstruction };
