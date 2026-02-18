import { __decorateClass } from '../../chunk-EQQGB2QZ.mjs';
import { A_Fragment, A_Context } from '@adaas/a-concept';
import { A_Frame } from '@adaas/a-frame';

let AreContext = class extends A_Fragment {
  constructor(source = "") {
    super({ name: "AreContext" });
    this._roots = [];
    this._source = source;
  }
  get scope() {
    return A_Context.scope(this);
  }
  get roots() {
    return this._roots;
  }
  get source() {
    return this._source;
  }
  addRoot(node) {
    this._roots.push(node);
    this.scope.register(node);
  }
  removeRoot(node) {
    this._roots = this._roots.filter((r) => r.aseid.toString() !== node.aseid.toString());
  }
};
AreContext = __decorateClass([
  A_Frame.Fragment({
    namespace: "A-ARE",
    name: "AreContext",
    description: "Context fragment for the A-Concept Rendering Engine (ARE) framework, serving as a foundational component for managing shared state and configurations within the ARE environment. This Context uses to encapsulate global settings, resources, and utilities that can be accessed by various ARE components and entities during the rendering and interaction processes."
  })
], AreContext);

export { AreContext };
//# sourceMappingURL=Are.context.mjs.map
//# sourceMappingURL=Are.context.mjs.map