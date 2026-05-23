import { A_Signal } from "@adaas/a-utils/a-signal";
import { A_Frame } from "@adaas/a-frame/core";



@A_Frame.Define({
    namespace: 'A-ARE',
    description: 'AreSignal is the base class for all signals used within the ARE framework. It extends A_Signal to provide a typed signal entity that components can subscribe to and emit, enabling reactive communication between ARE components and driving lifecycle and rendering updates.'
})
export class AreSignal<
    _TSignalDataType extends Record<string, any> = Record<string, any>
> extends A_Signal<_TSignalDataType> {

    static get concept(): string {
        return 'are';
    }

}