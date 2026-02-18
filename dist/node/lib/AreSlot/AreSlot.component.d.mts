import { Are } from '../AreComponent/Are.component.mjs';
import '@adaas/a-concept';

declare class AreSlot extends Are {
    template(): Promise<void>;
}

export { AreSlot };
