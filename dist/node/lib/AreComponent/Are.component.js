'use strict';

var aConcept = require('@adaas/a-concept');
var Are_constants = require('./Are.constants');
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
exports.Are = class Are extends aConcept.A_Component {
  //==================================================================================
  //======================== LIFECYCLE DECORATORS ====================================
  //==================================================================================
  static get EventHandler() {
    return (target, propertyKey, descriptor) => {
      return aConcept.A_Feature.Extend({
        name: propertyKey,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onBeforeLoad() {
    return (target, propertyKey, descriptor) => {
      return aConcept.A_Feature.Extend({
        name: Are_constants.AreFeatures.onBeforeLoad,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onAfterLoad() {
    return (target, propertyKey, descriptor) => {
      return aConcept.A_Feature.Extend({
        name: Are_constants.AreFeatures.onAfterLoad,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onBeforeCompile() {
    return (target, propertyKey, descriptor) => {
      return aConcept.A_Feature.Extend({
        name: Are_constants.AreFeatures.onBeforeCompile,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onAfterCompile() {
    return (target, propertyKey, descriptor) => {
      return aConcept.A_Feature.Extend({
        name: Are_constants.AreFeatures.onAfterCompile,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onBeforeMount() {
    return (target, propertyKey, descriptor) => {
      return aConcept.A_Feature.Extend({
        name: Are_constants.AreFeatures.onBeforeMount,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onAfterMount() {
    return (target, propertyKey, descriptor) => {
      return aConcept.A_Feature.Extend({
        name: Are_constants.AreFeatures.onAfterMount,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onBeforeUnmount() {
    return (target, propertyKey, descriptor) => {
      return aConcept.A_Feature.Extend({
        name: Are_constants.AreFeatures.onBeforeUnmount,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onAfterUnmount() {
    return (target, propertyKey, descriptor) => {
      return aConcept.A_Feature.Extend({
        name: Are_constants.AreFeatures.onAfterUnmount,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onBeforeUpdate() {
    return (target, propertyKey, descriptor) => {
      return aConcept.A_Feature.Extend({
        name: Are_constants.AreFeatures.onBeforeUpdate,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onAfterUpdate() {
    return (target, propertyKey, descriptor) => {
      return aConcept.A_Feature.Extend({
        name: Are_constants.AreFeatures.onAfterUpdate,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get Template() {
    return (target, propertyKey, descriptor) => {
      return aConcept.A_Feature.Extend({
        name: Are_constants.AreFeatures.onTemplate,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get Styles() {
    return (target, propertyKey, descriptor) => {
      return aConcept.A_Feature.Extend({
        name: Are_constants.AreFeatures.onStyles,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get Data() {
    return (target, propertyKey, descriptor) => {
      return aConcept.A_Feature.Extend({
        name: Are_constants.AreFeatures.onData,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get Signal() {
    return (target, propertyKey, descriptor) => {
      return aConcept.A_Feature.Extend({
        name: Are_constants.AreFeatures.onSignal,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  async template(...args) {
  }
  async styles(...args) {
  }
  async data(...args) {
  }
};
__decorateClass([
  exports.Are.Template
], exports.Are.prototype, "template", 1);
__decorateClass([
  exports.Are.Styles
], exports.Are.prototype, "styles", 1);
__decorateClass([
  exports.Are.Data
], exports.Are.prototype, "data", 1);
exports.Are = __decorateClass([
  aFrame.A_Frame.Component({
    namespace: "A-ARE",
    name: "Are",
    description: "Base component class for A-Concept Rendering Engine (ARE) components. It provides lifecycle decorators and methods for defining templates, styles, and data, facilitating the creation of dynamic and interactive UI components within the ARE framework."
  })
], exports.Are);
//# sourceMappingURL=Are.component.js.map
//# sourceMappingURL=Are.component.js.map