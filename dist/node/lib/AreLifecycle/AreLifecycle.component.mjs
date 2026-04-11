import { __decorateClass, __decorateParam } from '../../chunk-EQQGB2QZ.mjs';
import { A_Feature, A_Inject, A_Caller, A_Scope, A_TYPES__EntityFeatures, A_Component } from '@adaas/a-concept';
import { A_Frame } from '@adaas/a-frame';
import { AreScene } from '@adaas/are/scene/AreScene.context';
import { AreNode } from '@adaas/are/node/AreNode.entity';
import { AreNodeFeatures } from '@adaas/are/node/AreNode.constants';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { AreFeatures } from '@adaas/are/component/Are.constants';
import { AreStore } from '@adaas/are/store/AreStore.context';
import { AreAttributeFeatures } from '@adaas/are/attribute/AreAttribute.constants';
import { AreContext } from '@adaas/are/component/Are.context';

let AreLifecycle = class extends A_Component {
  static Init(param1) {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: param1.prototype instanceof AreNode ? AreNodeFeatures.onInit : AreAttributeFeatures.Init,
        scope: [param1],
        override: ["init"]
      })(target, propertyKey, descriptor);
    };
  }
  beforeInit(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(`[Init -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, AreFeatures.onBeforeInit, node.scope);
  }
  init(node, scope, context, logger, ...args) {
    context.startPerformance("AreLifecycle.init");
    const newNodeScene = new AreScene(node.aseid);
    scope.register(newNodeScene);
    if (node.component) {
      const newNodeStore = new AreStore(node.aseid);
      scope.register(newNodeStore);
      newNodeStore.loadExtensions(node.component);
    }
    context.endPerformance("AreLifecycle.init");
  }
  afterInit(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(`[Init -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, AreFeatures.onAfterInit, node.scope);
  }
  beforeMount(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(`[Mount -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, AreFeatures.onBeforeMount, node.scope);
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
    const logger = scope.resolve(A_Logger);
    logger?.debug(`[Mount -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, AreFeatures.onAfterMount, node.scope);
  }
  beforeUpdate(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(`[Update -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, AreFeatures.onBeforeUpdate, node.scope);
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
    const logger = scope.resolve(A_Logger);
    logger?.debug(`[Update -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, AreFeatures.onAfterUpdate, node.scope);
  }
  beforeUnmount(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(`[Unmount -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, AreFeatures.onBeforeUnmount, node.scope);
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
    const logger = scope.resolve(A_Logger);
    logger?.debug(`[Unmount -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, AreFeatures.onAfterUnmount, node.scope);
  }
  beforeDestroy(node, scope, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(`[Destroy -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, AreFeatures.onBeforeDestroy, node.scope);
  }
  destroy(node, scene, ...args) {
  }
  afterDestroy(node, scope, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(`[Destroy -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, AreFeatures.onAfterDestroy, node.scope);
  }
};
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onBeforeInit,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Inject(A_Feature))
], AreLifecycle.prototype, "beforeInit", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onInit,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreContext)),
  __decorateParam(3, A_Inject(A_Logger))
], AreLifecycle.prototype, "init", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onAfterInit,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Inject(A_Feature))
], AreLifecycle.prototype, "afterInit", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onBeforeMount,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Inject(A_Feature))
], AreLifecycle.prototype, "beforeMount", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onMount,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreScene)),
  __decorateParam(2, A_Inject(A_Logger))
], AreLifecycle.prototype, "mount", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onAfterMount,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Inject(A_Feature))
], AreLifecycle.prototype, "afterMount", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onUpdate,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Inject(A_Feature))
], AreLifecycle.prototype, "beforeUpdate", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onUpdate,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreContext)),
  __decorateParam(2, A_Inject(A_Logger))
], AreLifecycle.prototype, "update", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onUpdate,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Inject(A_Feature))
], AreLifecycle.prototype, "afterUpdate", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onBeforeUnmount,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Inject(A_Feature))
], AreLifecycle.prototype, "beforeUnmount", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onUnmount,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreScene))
], AreLifecycle.prototype, "unmount", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onAfterUnmount,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Inject(A_Feature))
], AreLifecycle.prototype, "afterUnmount", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onBeforeDestroy,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(A_Feature))
], AreLifecycle.prototype, "beforeDestroy", 1);
__decorateClass([
  A_Feature.Extend({
    name: A_TYPES__EntityFeatures.DESTROY,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreScene))
], AreLifecycle.prototype, "destroy", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onAfterDestroy,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(A_Feature))
], AreLifecycle.prototype, "afterDestroy", 1);
AreLifecycle = __decorateClass([
  A_Frame.Component({
    description: "Handles the lifecycle of the AreNode and related entities such as interpolations, directives, attributes, and so on. It provides lifecycle hooks for initialization, mounting, updating, and unmounting of the nodes, allowing to manage the state and behavior of the nodes throughout their lifecycle in a structured and consistent way."
  })
], AreLifecycle);

export { AreLifecycle };
//# sourceMappingURL=AreLifecycle.component.mjs.map
//# sourceMappingURL=AreLifecycle.component.mjs.map