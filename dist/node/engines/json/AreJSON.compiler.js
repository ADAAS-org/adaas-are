'use strict';

var aFrame = require('@adaas/a-frame');
var compiler = require('@adaas/are/compiler');

var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(result)) || result;
  return result;
};
exports.AreJSONCompiler = class AreJSONCompiler extends compiler.AreCompiler {
};
exports.AreJSONCompiler = __decorateClass([
  aFrame.A_Frame.Component({
    namespace: "A-ARE",
    name: "AreJSONCompiler",
    description: "JSON-specific compiler for A-Concept Rendering Engine (ARE) components, extending the base AreCompiler to handle JSON templates and data structures for headless or API-based rendering environments."
  })
], exports.AreJSONCompiler);
//# sourceMappingURL=AreJSON.compiler.js.map
//# sourceMappingURL=AreJSON.compiler.js.map