'use strict';

var aRoute = require('@adaas/a-utils/a-route');
var aSignal = require('@adaas/a-utils/a-signal');

class AreRouteSignal extends aSignal.A_Signal {
  constructor(path) {
    super({
      data: {
        route: new aRoute.A_Route(path)
      }
    });
  }
  get route() {
    return this.data.route;
  }
  static async default() {
    return new AreRouteSignal(document.location.href);
  }
}

exports.AreRouteSignal = AreRouteSignal;
//# sourceMappingURL=AreRoute.signal.js.map
//# sourceMappingURL=AreRoute.signal.js.map