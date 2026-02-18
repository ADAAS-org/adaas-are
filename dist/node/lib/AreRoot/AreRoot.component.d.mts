import { Are } from '../AreComponent/Are.component.mjs';
import { b as AreNode, c as AreScene, A as AreEvent } from '../../index-DMXWCL7R.mjs';
import { AreStore } from '../AreStore/AreStore.context.mjs';
import { A_SignalVector } from '@adaas/a-utils/a-signal';
import '@adaas/a-concept';
import '../AreEvent/AreEvent.types.mjs';
import '../AreNode/AreNode.types.mjs';
import '../AreScene/AreScene.types.mjs';
import '../AreProps/AreProps.context.mjs';
import '@adaas/a-utils/a-execution';

declare class AreRoot extends Are {
    attachListeners(): Promise<void>;
    template(node: AreNode, store: AreStore): Promise<void>;
    onSignal(node: AreNode, store: AreStore, scene: AreScene, vector: A_SignalVector, event: AreEvent): Promise<void>;
}

export { AreRoot };
