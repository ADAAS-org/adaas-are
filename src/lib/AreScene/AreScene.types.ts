import { A_TYPES__Fragment_Serialized } from "@adaas/a-concept";



export type AreSCene_Serialized = {
    children: { [id: string]: AreSCene_Serialized }
} & A_TYPES__Fragment_Serialized;