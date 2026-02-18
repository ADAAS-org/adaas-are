import type { AreNode } from "@adaas/are/node";

export type AreSceneInstructionNewProps<T extends any = Record<string, any>> = {
    id?: Array<any>;
    action: string;
    node: AreNode,
    params?: T;
};