import { Are } from '../AreComponent/Are.component.js';
import '@adaas/a-concept';

declare class AreSlot extends Are {
    template(): Promise<void>;
}

export { AreSlot };
