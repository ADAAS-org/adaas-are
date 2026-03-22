import { A_TYPES__Fragment_Serialized } from "@adaas/a-concept";
import type { AreSceneInstruction } from "../AreSceneInstruction";



export type AreSceneChanges = {
    toApply: AreSceneInstruction[];
    toRevert: AreSceneInstruction[];
}


export type AreSCene_Serialized = {
    children: { [id: string]: AreSCene_Serialized }
} & A_TYPES__Fragment_Serialized;