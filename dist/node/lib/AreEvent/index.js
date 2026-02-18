'use strict';

var AreEvent_context = require('./AreEvent.context');
var AreEvent_types = require('./AreEvent.types');



Object.defineProperty(exports, "AreEvent", {
  enumerable: true,
  get: function () { return AreEvent_context.AreEvent; }
});
Object.keys(AreEvent_types).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return AreEvent_types[k]; }
  });
});
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map