import { AreSyntaxTokenMatch } from "@adaas/are/syntax/AreSyntax.types";
import { AreNodeFeatures, AreNodeStatuses } from "./AreNode.constants";


export type AreNodeNewProps = AreSyntaxTokenMatch;


export type AreNodeFeatureNames = typeof AreNodeFeatures[keyof typeof AreNodeFeatures];


export type AreNodeStatusNames = typeof AreNodeStatuses[keyof typeof AreNodeStatuses];