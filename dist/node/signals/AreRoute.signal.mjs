import '../chunk-EQQGB2QZ.mjs';
import { A_Route } from '@adaas/a-utils/a-route';
import { A_Signal } from '@adaas/a-utils/a-signal';

class AreRouteSignal extends A_Signal {
  constructor(path) {
    super({
      data: {
        route: new A_Route(path)
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

export { AreRouteSignal };
//# sourceMappingURL=AreRoute.signal.mjs.map
//# sourceMappingURL=AreRoute.signal.mjs.map