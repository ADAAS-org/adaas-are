import { __decorateClass } from '../../chunk-EQQGB2QZ.mjs';
import { A_Component, A_Feature } from '@adaas/a-concept';
import { AreFeatures } from './Are.constants';
import { A_Frame } from '@adaas/a-frame';

let Are = class extends A_Component {
  //==================================================================================
  //======================== LIFECYCLE DECORATORS ====================================
  //==================================================================================
  static get EventHandler() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: propertyKey,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onBeforeLoad() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: AreFeatures.onBeforeLoad,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onAfterLoad() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: AreFeatures.onAfterLoad,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onBeforeCompile() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: AreFeatures.onBeforeCompile,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onAfterCompile() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: AreFeatures.onAfterCompile,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onBeforeMount() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: AreFeatures.onBeforeMount,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onAfterMount() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: AreFeatures.onAfterMount,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onBeforeUnmount() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: AreFeatures.onBeforeUnmount,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onAfterUnmount() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: AreFeatures.onAfterUnmount,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onBeforeUpdate() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: AreFeatures.onBeforeUpdate,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onAfterUpdate() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: AreFeatures.onAfterUpdate,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get Template() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: AreFeatures.onTemplate,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get Styles() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: AreFeatures.onStyles,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get Data() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: AreFeatures.onData,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get Signal() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: AreFeatures.onSignal,
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
  Are.Template
], Are.prototype, "template", 1);
__decorateClass([
  Are.Styles
], Are.prototype, "styles", 1);
__decorateClass([
  Are.Data
], Are.prototype, "data", 1);
Are = __decorateClass([
  A_Frame.Component({
    namespace: "A-ARE",
    name: "Are",
    description: "Base component class for A-Concept Rendering Engine (ARE) components. It provides lifecycle decorators and methods for defining templates, styles, and data, facilitating the creation of dynamic and interactive UI components within the ARE framework."
  })
], Are);

export { Are };
//# sourceMappingURL=Are.component.mjs.map
//# sourceMappingURL=Are.component.mjs.map