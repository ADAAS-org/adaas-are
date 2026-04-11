'use strict';

var aRoute = require('@adaas/a-utils/a-route');
var AreSignal_entity = require('@adaas/are/signals/AreSignal.entity');

class AreRoute extends AreSignal_entity.AreSignal {
  constructor(path) {
    super({
      data: new aRoute.A_Route(path)
    });
  }
  get route() {
    return this.data;
  }
  static default() {
    return new AreRoute(document.location.pathname || "/");
  }
  compare(other) {
    return this.route.toRegExp().test(other.data.toString());
  }
}

exports.AreRoute = AreRoute;
//# sourceMappingURL=AreRoute.signal.js.map
//# sourceMappingURL=AreRoute.signal.js.map