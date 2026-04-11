'use strict';

var aConcept = require('@adaas/a-concept');
var aFrame = require('@adaas/a-frame');
var AreScene_context = require('@adaas/are/scene/AreScene.context');
var AreNode_entity = require('@adaas/are/node/AreNode.entity');
var AreNode_constants = require('@adaas/are/node/AreNode.constants');
var aLogger = require('@adaas/a-utils/a-logger');
var Are_constants = require('@adaas/are/component/Are.constants');
var AreStore_context = require('@adaas/are/store/AreStore.context');
var AreAttribute_constants = require('@adaas/are/attribute/AreAttribute.constants');
var Are_context = require('@adaas/are/component/Are.context');

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
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);
exports.AreLifecycle = class AreLifecycle extends aConcept.A_Component {
  static Init(param1) {
    return (target, propertyKey, descriptor) => {
      return aConcept.A_Feature.Extend({
        name: param1.prototype instanceof AreNode_entity.AreNode ? AreNode_constants.AreNodeFeatures.onInit : AreAttribute_constants.AreAttributeFeatures.Init,
        scope: [param1],
        override: ["init"]
      })(target, propertyKey, descriptor);
    };
  }
  beforeInit(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(aLogger.A_Logger);
    logger?.debug(`[Init -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, Are_constants.AreFeatures.onBeforeInit, node.scope);
  }
  init(node, scope, context, logger, ...args) {
    context.startPerformance("AreLifecycle.init");
    const newNodeScene = new AreScene_context.AreScene(node.aseid);
    scope.register(newNodeScene);
    if (node.component) {
      const newNodeStore = new AreStore_context.AreStore(node.aseid);
      scope.register(newNodeStore);
      newNodeStore.loadExtensions(node.component);
    }
    context.endPerformance("AreLifecycle.init");
  }
  afterInit(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(aLogger.A_Logger);
    logger?.debug(`[Init -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, Are_constants.AreFeatures.onAfterInit, node.scope);
  }
  beforeMount(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(aLogger.A_Logger);
    logger?.debug(`[Mount -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, Are_constants.AreFeatures.onBeforeMount, node.scope);
  }
  mount(node, scene, logger, ...args) {
    logger?.debug(`[Mount] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    const queue = [node];
    while (queue.length > 0) {
      const current = queue.shift();
      const scene2 = current.scene;
      if (scene2.isInactive)
        continue;
      const { toApply, toRevert } = scene2.changes;
      for (const instruction of toRevert) {
        try {
          instruction.revert();
          scene2.unApply(instruction);
        } catch (error) {
          instruction.apply();
          scene2.apply(instruction);
        }
      }
      for (const instruction of toApply) {
        try {
          instruction.apply();
          scene2.apply(instruction);
        } catch (error) {
          instruction.revert();
          scene2.unApply(instruction);
        }
      }
      queue.push(...current.children);
    }
  }
  afterMount(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(aLogger.A_Logger);
    logger?.debug(`[Mount -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, Are_constants.AreFeatures.onAfterMount, node.scope);
  }
  beforeUpdate(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(aLogger.A_Logger);
    logger?.debug(`[Update -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, Are_constants.AreFeatures.onBeforeUpdate, node.scope);
  }
  update(node, context, logger, ...args) {
    logger?.debug(`[Update] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    const queue = [node];
    while (queue.length > 0) {
      const current = queue.shift();
      const scene = current.scene;
      if (scene.isInactive)
        continue;
      const { toApply, toRevert } = scene.changes;
      console.log(" -- Scene Changes -- ");
      console.log("To Apply: ", toApply);
      console.log("To Revert: ", toRevert);
      for (const instruction of toRevert) {
        try {
          instruction.revert();
          scene.unApply(instruction);
        } catch (error) {
          instruction.apply();
          scene.apply(instruction);
        }
      }
      for (const instruction of toApply) {
        try {
          instruction.apply();
          scene.apply(instruction);
        } catch (error) {
          console.log("WTF?? ", error);
          instruction.revert();
          scene.unApply(instruction);
        }
      }
      queue.push(...current.children);
    }
  }
  afterUpdate(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(aLogger.A_Logger);
    logger?.debug(`[Update -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, Are_constants.AreFeatures.onAfterUpdate, node.scope);
  }
  beforeUnmount(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(aLogger.A_Logger);
    logger?.debug(`[Unmount -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, Are_constants.AreFeatures.onBeforeUnmount, node.scope);
  }
  unmount(node, scene, ...args) {
    const queue = [node];
    while (queue.length > 0) {
      const current = queue.shift();
      const scene2 = current.scene;
      const applied = [...scene2.applied];
      for (let i = applied.length - 1; i >= 0; i--) {
        const instruction = applied[i];
        try {
          instruction.revert();
          scene2.unApply(instruction);
        } catch (error) {
          scene2.unApply(instruction);
        }
      }
      queue.push(...current.children);
    }
  }
  afterUnmount(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(aLogger.A_Logger);
    logger?.debug(`[Unmount -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, Are_constants.AreFeatures.onAfterUnmount, node.scope);
  }
  beforeDestroy(node, scope, feature, ...args) {
    const logger = scope.resolve(aLogger.A_Logger);
    logger?.debug(`[Destroy -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, Are_constants.AreFeatures.onBeforeDestroy, node.scope);
  }
  destroy(node, scene, ...args) {
  }
  afterDestroy(node, scope, feature, ...args) {
    const logger = scope.resolve(aLogger.A_Logger);
    logger?.debug(`[Destroy -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, Are_constants.AreFeatures.onAfterDestroy, node.scope);
  }
};
__decorateClass([
  aConcept.A_Feature.Extend({
    name: AreNode_constants.AreNodeFeatures.onBeforeInit,
    before: /.*/,
    scope: [AreNode_entity.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(AreScene_context.AreScene)),
  __decorateParam(3, aConcept.A_Inject(aConcept.A_Feature))
], exports.AreLifecycle.prototype, "beforeInit", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: AreNode_constants.AreNodeFeatures.onInit,
    scope: [AreNode_entity.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(Are_context.AreContext)),
  __decorateParam(3, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreLifecycle.prototype, "init", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: AreNode_constants.AreNodeFeatures.onAfterInit,
    after: /.*/,
    scope: [AreNode_entity.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(AreScene_context.AreScene)),
  __decorateParam(3, aConcept.A_Inject(aConcept.A_Feature))
], exports.AreLifecycle.prototype, "afterInit", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: AreNode_constants.AreNodeFeatures.onBeforeMount,
    before: /.*/,
    scope: [AreNode_entity.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(AreScene_context.AreScene)),
  __decorateParam(3, aConcept.A_Inject(aConcept.A_Feature))
], exports.AreLifecycle.prototype, "beforeMount", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: AreNode_constants.AreNodeFeatures.onMount,
    scope: [AreNode_entity.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(AreScene_context.AreScene)),
  __decorateParam(2, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreLifecycle.prototype, "mount", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: AreNode_constants.AreNodeFeatures.onAfterMount,
    after: /.*/,
    scope: [AreNode_entity.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(AreScene_context.AreScene)),
  __decorateParam(3, aConcept.A_Inject(aConcept.A_Feature))
], exports.AreLifecycle.prototype, "afterMount", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: AreNode_constants.AreNodeFeatures.onUpdate,
    before: /.*/,
    scope: [AreNode_entity.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(AreScene_context.AreScene)),
  __decorateParam(3, aConcept.A_Inject(aConcept.A_Feature))
], exports.AreLifecycle.prototype, "beforeUpdate", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: AreNode_constants.AreNodeFeatures.onUpdate,
    scope: [AreNode_entity.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(Are_context.AreContext)),
  __decorateParam(2, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreLifecycle.prototype, "update", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: AreNode_constants.AreNodeFeatures.onUpdate,
    after: /.*/,
    scope: [AreNode_entity.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(AreScene_context.AreScene)),
  __decorateParam(3, aConcept.A_Inject(aConcept.A_Feature))
], exports.AreLifecycle.prototype, "afterUpdate", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: AreNode_constants.AreNodeFeatures.onBeforeUnmount,
    before: /.*/,
    scope: [AreNode_entity.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(AreScene_context.AreScene)),
  __decorateParam(3, aConcept.A_Inject(aConcept.A_Feature))
], exports.AreLifecycle.prototype, "beforeUnmount", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: AreNode_constants.AreNodeFeatures.onUnmount,
    scope: [AreNode_entity.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(AreScene_context.AreScene))
], exports.AreLifecycle.prototype, "unmount", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: AreNode_constants.AreNodeFeatures.onAfterUnmount,
    after: /.*/,
    scope: [AreNode_entity.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(AreScene_context.AreScene)),
  __decorateParam(3, aConcept.A_Inject(aConcept.A_Feature))
], exports.AreLifecycle.prototype, "afterUnmount", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: AreNode_constants.AreNodeFeatures.onBeforeDestroy,
    before: /.*/,
    scope: [AreNode_entity.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(aConcept.A_Feature))
], exports.AreLifecycle.prototype, "beforeDestroy", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: aConcept.A_TYPES__EntityFeatures.DESTROY,
    scope: [AreNode_entity.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(AreScene_context.AreScene))
], exports.AreLifecycle.prototype, "destroy", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: AreNode_constants.AreNodeFeatures.onAfterDestroy,
    after: /.*/,
    scope: [AreNode_entity.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(aConcept.A_Feature))
], exports.AreLifecycle.prototype, "afterDestroy", 1);
exports.AreLifecycle = __decorateClass([
  aFrame.A_Frame.Component({
    description: "Handles the lifecycle of the AreNode and related entities such as interpolations, directives, attributes, and so on. It provides lifecycle hooks for initialization, mounting, updating, and unmounting of the nodes, allowing to manage the state and behavior of the nodes throughout their lifecycle in a structured and consistent way."
  })
], exports.AreLifecycle);
//# sourceMappingURL=AreLifecycle.component.js.map
//# sourceMappingURL=AreLifecycle.component.js.map