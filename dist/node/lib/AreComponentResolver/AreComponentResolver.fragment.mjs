import { __decorateClass } from '../../chunk-EQQGB2QZ.mjs';
import { A_Fragment } from '@adaas/a-concept';
import { A_Frame } from '@adaas/a-frame/core';

let AreComponentResolver = class extends A_Fragment {
};
AreComponentResolver = __decorateClass([
  A_Frame.Define({
    namespace: "A-ARE",
    description: "Pluggable async resolver the engine consults when a node tag does not match a registered component, enabling runtime/lazy component loading. Implementations fetch the component class (network, dynamic import, manifest) and memoize it; the engine registers the returned class so the tag resolves thereafter."
  })
], AreComponentResolver);

export { AreComponentResolver };
//# sourceMappingURL=AreComponentResolver.fragment.mjs.map
//# sourceMappingURL=AreComponentResolver.fragment.mjs.map