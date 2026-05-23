import { __decorateClass } from '../../chunk-EQQGB2QZ.mjs';
import { A_Concept, A_Component } from '@adaas/a-concept';
import { A_Frame } from '@adaas/a-frame/core';

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
  A_Frame.Define({
    namespace: "A-ARE",
    description: "Abstract base component that observes external changes and emits A_Signals to drive reactive updates within the ARE pipeline. Subclasses override init() to set up initial state and watch() to begin observing \u2014 for example, polling a data source, listening to DOM events, or subscribing to a store \u2014 and call the appropriate signal methods to notify the engine when a re-render is needed."
  })
], AreWatcher);

export { AreWatcher };
//# sourceMappingURL=AreWatcher.component.mjs.map
//# sourceMappingURL=AreWatcher.component.mjs.map