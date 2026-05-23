'use strict';

var aConcept = require('@adaas/a-concept');
var core = require('@adaas/a-frame/core');

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
exports.AreWatcher = class AreWatcher extends aConcept.A_Component {
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
  aConcept.A_Concept.Stop()
], exports.AreWatcher.prototype, "destroy", 1);
exports.AreWatcher = __decorateClass([
  core.A_Frame.Define({
    namespace: "A-ARE",
    description: "Abstract base component that observes external changes and emits A_Signals to drive reactive updates within the ARE pipeline. Subclasses override init() to set up initial state and watch() to begin observing \u2014 for example, polling a data source, listening to DOM events, or subscribing to a store \u2014 and call the appropriate signal methods to notify the engine when a re-render is needed."
  })
], exports.AreWatcher);
//# sourceMappingURL=AreWatcher.component.js.map
//# sourceMappingURL=AreWatcher.component.js.map