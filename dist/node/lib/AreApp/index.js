'use strict';

var AreApp_container = require('./AreApp.container');
var AreApp_error = require('./AreApp.error');
var AreApp_types = require('./AreApp.types');



Object.defineProperty(exports, "AreApp", {
  enumerable: true,
  get: function () { return AreApp_container.AreApp; }
});
Object.defineProperty(exports, "AreAppError", {
  enumerable: true,
  get: function () { return AreApp_error.AreAppError; }
});
Object.keys(AreApp_types).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return AreApp_types[k]; }
  });
});
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map