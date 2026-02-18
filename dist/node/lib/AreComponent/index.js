'use strict';

var Are_component = require('./Are.component');
var Are_context = require('./Are.context');
var Are_types = require('./Are.types');
var Are_constants = require('./Are.constants');



Object.defineProperty(exports, "Are", {
  enumerable: true,
  get: function () { return Are_component.Are; }
});
Object.defineProperty(exports, "AreContext", {
  enumerable: true,
  get: function () { return Are_context.AreContext; }
});
Object.keys(Are_types).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return Are_types[k]; }
  });
});
Object.keys(Are_constants).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return Are_constants[k]; }
  });
});
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map