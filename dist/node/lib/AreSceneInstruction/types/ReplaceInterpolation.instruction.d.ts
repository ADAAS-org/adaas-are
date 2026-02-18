import { d as AreSceneInstruction, b as AreNode } from '../../../index-BD-6iOuR.js';
import { AreInterpolation } from '../../AreSyntax/AreSyntax.types.js';
import '../../AreEvent/AreEvent.types.js';
import '@adaas/a-concept';
import '../../AreNode/AreNode.types.js';
import '../../AreScene/AreScene.types.js';
import '../../AreProps/AreProps.context.js';
import '@adaas/a-utils/a-execution';
import '../../AreStore/AreStore.context.js';

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
