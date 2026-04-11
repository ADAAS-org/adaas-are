import { A_Signal } from '@adaas/a-utils/a-signal';

declare class AreSignal<_TSignalDataType extends Record<string, any> = Record<string, any>> extends A_Signal<_TSignalDataType> {
}

export { AreSignal };
