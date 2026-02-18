import { d as AreSceneInstruction, b as AreNode } from '../../../index-DMXWCL7R.mjs';
import { AreDirective } from '../../AreSyntax/AreSyntax.types.mjs';
import '../../AreEvent/AreEvent.types.mjs';
import '@adaas/a-concept';
import '../../AreNode/AreNode.types.mjs';
import '../../AreScene/AreScene.types.mjs';
import '../../AreProps/AreProps.context.mjs';
import '@adaas/a-utils/a-execution';
import '../../AreStore/AreStore.context.mjs';

declare class AddDirectiveInstruction extends AreSceneInstruction<{
    directive: AreDirective;
    value: any;
}> {
    get directive(): AreDirective;
    get value(): any;
    constructor(node: AreNode, directive: AreDirective, value: any);
}

export { AddDirectiveInstruction };
