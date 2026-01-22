import { AreScene } from "@adaas/are/context/AreScene/AreScene.context";
import { AreNode } from "../AreNode/AreNode.entity";
import { A_TYPES__DeepPartial } from "@adaas/a-concept";



export type AreSceneInstructionNewProps<T extends any = Record<string, any>> = {
    id?: Array<any>;
    action: string;
    node: AreNode,
    params?: T; 
};