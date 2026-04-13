import { __decorateClass } from '../../chunk-EQQGB2QZ.mjs';
import { A_Concept, A_Component } from '@adaas/a-concept';
import { A_Frame } from '@adaas/a-frame';

let AreWatcher = class extends A_Component {
  /**
   * Initialize the watcher. This method is called once when the watcher is first created. Use this to set up any necessary state or start observing changes.
   */
  init() {
  }
  /**
   * Start watching for changes. This method is called after the engine has executed. Use this to set up any necessary event listeners or intervals to observe changes and produce signals.
   */
  watch() {
  }
  destroy() {
  }
};
__decorateClass([
  A_Concept.Stop()
], AreWatcher.prototype, "destroy", 1);
AreWatcher = __decorateClass([
  A_Frame.Component({
    namespace: "A-ARE",
    name: "AreWatcher",
    description: "AreWatcher is a component that observes changes and produces A_Signals Depending on the actual handlers"
  })
], AreWatcher);

export { AreWatcher };
//# sourceMappingURL=AreWatcher.component.mjs.map
//# sourceMappingURL=AreWatcher.component.mjs.map