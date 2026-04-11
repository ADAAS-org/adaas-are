import { AreSyntaxTokenMatch } from '@adaas/are/syntax/AreSyntax.types';
import { AreNodeStatuses, AreNodeFeatures } from './AreNode.constants.js';

type AreNodeNewProps = AreSyntaxTokenMatch;
type AreNodeFeatureNames = typeof AreNodeFeatures[keyof typeof AreNodeFeatures];
type AreNodeStatusNames = typeof AreNodeStatuses[keyof typeof AreNodeStatuses];

export type { AreNodeFeatureNames, AreNodeNewProps, AreNodeStatusNames };
