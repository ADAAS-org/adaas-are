import { d as AreSceneInstruction, b as AreNode } from '../../../index-DMXWCL7R.mjs';
import { AreInterpolation } from '../../AreSyntax/AreSyntax.types.mjs';
import '../../AreEvent/AreEvent.types.mjs';
import '@adaas/a-concept';
import '../../AreNode/AreNode.types.mjs';
import '../../AreScene/AreScene.types.mjs';
import '../../AreProps/AreProps.context.mjs';
import '@adaas/a-utils/a-execution';
import '../../AreStore/AreStore.context.mjs';

declare class ReplaceInterpolationInstruction extends AreSceneInstruction<{
    interpolation: AreInterpolation;
    value: string;
    prevValue?: string;
}> {
    get placement(): string;
    get position(): number;
    get interpolation(): AreInterpolation;
    get value(): string;
    constructor(node: AreNode, interpolation: AreInterpolation, value: string, prevValue?: string);
}

export { ReplaceInterpolationInstruction };
