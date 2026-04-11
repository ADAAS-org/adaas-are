import { A_TYPES__Fragment_Serialized } from '@adaas/a-concept';
import { AreInstruction } from '@adaas/are/instruction/AreInstruction.entity';
import { AreInstructionSerialized } from '@adaas/are/instruction/AreInstruction.types';
import { AreSceneStatuses } from './AreScene.constants.js';

type AreSceneChanges = {
    /**
     * An array of instructions that are planned to be applied to the scene. These instructions represent the changes that will be made to the scene when they
     */
    toApply: AreInstruction[];
    /**
     * An array of instructions that are planned to be reverted from the scene. These instructions represent the changes that will be undone from the scene when they are reverted, allowing for a rollback of changes if needed.
     */
    toRevert: AreInstruction[];
};
type AreScene_Serialized = {
    instructions: AreInstructionSerialized[];
} & A_TYPES__Fragment_Serialized;
type AreSceneStatusNames = typeof AreSceneStatuses[keyof typeof AreSceneStatuses];

export type { AreSceneChanges, AreSceneStatusNames, AreScene_Serialized };
