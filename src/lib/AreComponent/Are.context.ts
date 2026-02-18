import { A_Context, A_Fragment } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame";
import { AreNode } from "@adaas/are/node";



@A_Frame.Fragment({
    namespace: 'A-ARE',
    name: 'AreContext',
    description: 'Context fragment for the A-Concept Rendering Engine (ARE) framework, serving as a foundational component for managing shared state and configurations within the ARE environment. This Context uses to encapsulate global settings, resources, and utilities that can be accessed by various ARE components and entities during the rendering and interaction processes.'
})
export class AreContext extends A_Fragment {

    protected _source: string;
    protected _roots: Array<AreNode> = [];

    constructor(source: string = '') {
        super({ name: 'AreContext' });
        this._source = source;
    }

    get scope() {
        return A_Context.scope(this);
    }

    get roots(): Array<AreNode> {
        return this._roots;
    }

    get source(): string {
        return this._source;
    }

    addRoot(node: AreNode) {
        this._roots.push(node);
        this.scope.register(node);
    }

    removeRoot(node: AreNode) {
        this._roots = this._roots.filter(r => r.aseid.toString() !== node.aseid.toString());
    }

}
