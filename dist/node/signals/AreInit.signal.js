'use strict';

var aSignal = require('@adaas/a-utils/a-signal');

class AreInitSignal extends aSignal.A_Signal {
  static async default() {
    return new AreInitSignal({ data: { ready: false } });
  }
}

exports.AreInitSignal = AreInitSignal;
//# sourceMappingURL=AreInit.signal.js.map
//# sourceMappingURL=AreInit.signal.js.map