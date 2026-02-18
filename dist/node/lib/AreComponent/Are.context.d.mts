import * as _adaas_a_concept from '@adaas/a-concept';
import { A_Fragment } from '@adaas/a-concept';
import { b as AreNode } from '../../index-DMXWCL7R.mjs';
import '../AreEvent/AreEvent.types.mjs';
import '../AreNode/AreNode.types.mjs';
import '../AreScene/AreScene.types.mjs';
import '../AreProps/AreProps.context.mjs';
import '@adaas/a-utils/a-execution';
import '../AreStore/AreStore.context.mjs';

declare class AreContext extends A_Fragment {
    protected _source: string;
    protected _roots: Array<AreNode>;
    constructor(source?: string);
    get scope(): _adaas_a_concept.A_Scope<any, _adaas_a_concept.A_TYPES__Component_Constructor<_adaas_a_concept.A_Component>[], _adaas_a_concept.A_TYPES__Error_Constructor<_adaas_a_concept.A_Error<_adaas_a_concept.A_TYPES__Error_Init, _adaas_a_concept.A_TYPES__Error_Serialized>>[], _adaas_a_concept.A_TYPES__Entity_Constructor<_adaas_a_concept.A_Entity<any, _adaas_a_concept.A_TYPES__Entity_Serialized>>[], A_Fragment<_adaas_a_concept.A_TYPES__Fragment_Serialized>[]>;
    get roots(): Array<AreNode>;
    get source(): string;
    addRoot(node: AreNode): void;
    removeRoot(node: AreNode): void;
}

export { AreContext };
