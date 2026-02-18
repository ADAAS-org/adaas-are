'use strict';

var AreSyntax_component = require('./AreSyntax.component');
var AreSyntax_context = require('./AreSyntax.context');
var AreSyntax_error = require('./AreSyntax.error');
var AreSyntax_types = require('./AreSyntax.types');



Object.defineProperty(exports, "AreSyntax", {
  enumerable: true,
  get: function () { return AreSyntax_component.AreSyntax; }
});
Object.defineProperty(exports, "AreSyntaxContext", {
  enumerable: true,
  get: function () { return AreSyntax_context.AreSyntaxContext; }
});
Object.defineProperty(exports, "AreSyntaxError", {
  enumerable: true,
  get: function () { return AreSyntax_error.AreSyntaxError; }
});
Object.keys(AreSyntax_types).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return AreSyntax_types[k]; }
  });
});
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map