import { A_Frame } from "@adaas/a-frame";
import { AreStore } from "@adaas/are/store";
import { AreNode } from "../AreNode.entity";


@A_Frame.Entity({
    namespace: 'A-ARE',
    name: 'AreComponentNode',
    description: 'An AreComponentNode entity represents a component node within the A-Concept Rendering Engine (ARE) framework. It extends a compile logic by provided custom components and their features. In case a custom logic is needed this node should be used.'
})
export class AreComponentNode extends AreNode {

    get store(): AreStore {
        return this.scope.resolveFlat<AreStore>(AreStore)!;
    }

}