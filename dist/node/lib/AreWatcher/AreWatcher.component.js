'use strict';

var aConcept = require('@adaas/a-concept');
var aFrame = require('@adaas/a-frame');

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
  aFrame.A_Frame.Component({
    namespace: "A-ARE",
    name: "AreWatcher",
    description: "AreWatcher is a component that observes changes and produces A_Signals Depending on the actual handlers"
  })
], exports.AreWatcher);
//# sourceMappingURL=AreWatcher.component.js.map
//# sourceMappingURL=AreWatcher.component.js.map