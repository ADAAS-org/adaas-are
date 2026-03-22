import { AreNodeFeatures, AreNodeStatuses } from "./AreNode.constants";


export type AreNodeProps = {
    component: string,
    scope: string,
    markup: string,
}

export type AreNodeOptionalProps = {
    id?: string,
    styles?: string
    template?: string
}

export type AreNodeNewProps = AreNodeProps & AreNodeOptionalProps;


export type AreNodeFeatureNames = typeof AreNodeFeatures[keyof typeof AreNodeFeatures];


export type AreNodeStatusNames = typeof AreNodeStatuses[keyof typeof AreNodeStatuses];