'use strict';

var aConcept = require('@adaas/a-concept');
var core = require('@adaas/a-frame/core');

var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(result)) || result;
  return result;
};
exports.AreComponentResolver = class AreComponentResolver extends aConcept.A_Fragment {
};
exports.AreComponentResolver = __decorateClass([
  core.A_Frame.Define({
    namespace: "A-ARE",
    description: "Pluggable async resolver the engine consults when a node tag does not match a registered component, enabling runtime/lazy component loading. Implementations fetch the component class (network, dynamic import, manifest) and memoize it; the engine registers the returned class so the tag resolves thereafter."
  })
], exports.AreComponentResolver);
//# sourceMappingURL=AreComponentResolver.fragment.js.map
//# sourceMappingURL=AreComponentResolver.fragment.js.map