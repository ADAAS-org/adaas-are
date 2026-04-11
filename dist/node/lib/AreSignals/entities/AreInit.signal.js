'use strict';

var AreSignal_entity = require('@adaas/are/signals/AreSignal.entity');

class AreInit extends AreSignal_entity.AreSignal {
  static default() {
    return new AreInit({ data: { ready: false } });
  }
}

exports.AreInit = AreInit;
//# sourceMappingURL=AreInit.signal.js.map
//# sourceMappingURL=AreInit.signal.js.map