import { Are } from '../AreComponent/Are.component.js';
import { b as AreNode, c as AreScene, A as AreEvent } from '../../index-BD-6iOuR.js';
import { AreStore } from '../AreStore/AreStore.context.js';
import { A_SignalVector } from '@adaas/a-utils/a-signal';
import '@adaas/a-concept';
import '../AreEvent/AreEvent.types.js';
import '../AreNode/AreNode.types.js';
import '../AreScene/AreScene.types.js';
import '../AreProps/AreProps.context.js';
import '@adaas/a-utils/a-execution';

declare class AreRoot extends Are {
    attachListeners(): Promise<void>;
    template(node: AreNode, store: AreStore): Promise<void>;
    onSignal(node: AreNode, store: AreStore, scene: AreScene, vector: A_SignalVector, event: AreEvent): Promise<void>;
}

export { AreRoot };
