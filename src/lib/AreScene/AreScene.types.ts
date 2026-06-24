import { A_TYPES__Fragment_Serialized } from "@adaas/a-concept";
import type { AreInstruction } from "@adaas/are/instruction/AreInstruction.entity";
import { AreInstructionSerialized } from "@adaas/are/instruction/AreInstruction.types";
import { AreSceneStatuses } from "./AreScene.constants";



export type AreSceneChanges = {
    /**
     * An array of instructions that are planned to be applied to the scene. These instructions represent the changes that will be made to the scene when they
     */
    toApply: AreInstruction[];
    /**
     * An array of instructions that are planned to be reverted from the scene. These instructions represent the changes that will be undone from the scene when they are reverted, allowing for a rollback of changes if needed.
     */
    toRevert: AreInstruction[];
}


export type AreScene_Serialized = {
    /**
     * The host declaration instruction that represents the node itself in the scene (its mount point). Serialized structurally so the scene's anchor can be reconstructed.
     */
    host?: AreInstructionSerialized;
    /**
     * The ordered rendering plan — the full FIFO queue of instructions required to render the node. This is the core "interpret-only" payload of a prebuilt scene.
     *
     * [!] Note, only the planned instructions are serialized. The applied/reverted runtime state is intentionally dropped and must start empty when the scene is reconstructed and re-interpreted.
     */
    plan: AreInstructionSerialized[];
} & A_TYPES__Fragment_Serialized;


export type AreSceneStatusNames = typeof AreSceneStatuses[keyof typeof AreSceneStatuses]