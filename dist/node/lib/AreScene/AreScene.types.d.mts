import { A_TYPES__Fragment_Serialized } from '@adaas/a-concept';

type AreSCene_Serialized = {
    children: {
        [id: string]: AreSCene_Serialized;
    };
} & A_TYPES__Fragment_Serialized;

export type { AreSCene_Serialized };
