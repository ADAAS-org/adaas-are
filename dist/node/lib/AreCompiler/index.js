'use strict';

var AreCompiler_component = require('./AreCompiler.component');
var AreCompiler_error = require('./AreCompiler.error');
var AreCompiler_types = require('./AreCompiler.types');



Object.defineProperty(exports, "AreCompiler", {
  enumerable: true,
  get: function () { return AreCompiler_component.AreCompiler; }
});
Object.defineProperty(exports, "AreCompilerError", {
  enumerable: true,
  get: function () { return AreCompiler_error.AreCompilerError; }
});
Object.keys(AreCompiler_types).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return AreCompiler_types[k]; }
  });
});
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map