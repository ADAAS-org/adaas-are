'use strict';

var aConcept = require('@adaas/a-concept');
var aFrame = require('@adaas/a-frame');
var AreScene_context = require('@adaas/are/scene/AreScene.context');
var AreNode_entity = require('@adaas/are/node/AreNode.entity');
var AreNode_constants = require('@adaas/are/node/AreNode.constants');
var AreInstruction_constants = require('@adaas/are/instruction/AreInstruction.constants');
var AreInstruction_entity = require('@adaas/are/instruction/AreInstruction.entity');
var AreStore_context = require('@adaas/are/store/AreStore.context');

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
exports.AreInterpreter = class AreInterpreter extends aConcept.A_Component {
  /**
   * Decorator to mark a method as an instruction Apply handler for the specific instruction type. The method will be called during the render phase of the ARE component when the corresponding instruction needs to be applied. The method should contain logic to perform the necessary operations on the rendering target based on the instruction's content and context.
   * 
   * @param action 
   * @returns 
   */
  static Apply(action) {
    const name = action + AreInstruction_constants.AreInstructionFeatures.Apply;
    return (target, propertyKey, descriptor) => {
      return aConcept.A_Feature.Extend({
        name,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Decorator to mark a method as an instruction Update handler for the specific instruction type. The method will be called during the render phase of the ARE component when the corresponding instruction has been updated. The method should contain logic to perform the necessary operations on the rendering target to update the effects of the instruction based on its new content and context.
   * 
   * @param action 
   * @returns 
   */
  static Update(action) {
    const name = action + AreInstruction_constants.AreInstructionFeatures.Update;
    return (target, propertyKey, descriptor) => {
      return aConcept.A_Feature.Extend({
        name,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Decorator to mark a method as an instruction Revert handler for the specific instruction type. The method will be called during the render phase of the ARE component when the corresponding instruction needs to be reverted. The method should contain logic to perform the necessary operations on the rendering target to undo the effects of the instruction based on its content and context.
   * 
   * @param action 
   * @returns 
   */
  static Revert(action) {
    const name = action + AreInstruction_constants.AreInstructionFeatures.Revert;
    return (target, propertyKey, descriptor) => {
      return aConcept.A_Feature.Extend({
        name,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  interpret(scene) {
    const { toApply, toRevert } = scene.changes;
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
        instruction.revert();
        scene.unApply(instruction);
      }
    }
  }
  applyInstruction(instruction, interpreter, store, scope, feature, ...args) {
    try {
      store.watch(instruction);
      feature.chain(interpreter, instruction.name + AreInstruction_constants.AreInstructionFeatures.Apply, scope);
      store.unwatch(instruction);
    } catch (error) {
      store.unwatch(instruction);
      throw error;
    }
  }
  updateInstruction(instruction, interpreter, store, scope, feature, ...args) {
    try {
      store.watch(instruction);
      feature.chain(interpreter, instruction.name + AreInstruction_constants.AreInstructionFeatures.Update, scope);
      store.unwatch(instruction);
    } catch (error) {
      store.unwatch(instruction);
      throw error;
    }
  }
  revertInstruction(instruction, interpreter, store, scope, feature, ...args) {
    try {
      feature.chain(interpreter, instruction.name + AreInstruction_constants.AreInstructionFeatures.Revert, scope);
    } catch (error) {
      throw error;
    }
  }
};
__decorateClass([
  aConcept.A_Feature.Extend({
    name: AreNode_constants.AreNodeFeatures.onInterpret,
    scope: [AreNode_entity.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(AreScene_context.AreScene))
], exports.AreInterpreter.prototype, "interpret", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: AreInstruction_constants.AreInstructionFeatures.Apply,
    scope: [AreInstruction_entity.AreInstruction]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(exports.AreInterpreter)),
  __decorateParam(2, aConcept.A_Inject(AreStore_context.AreStore)),
  __decorateParam(3, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(4, aConcept.A_Inject(aConcept.A_Feature))
], exports.AreInterpreter.prototype, "applyInstruction", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: AreInstruction_constants.AreInstructionFeatures.Update,
    scope: [AreInstruction_entity.AreInstruction]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(exports.AreInterpreter)),
  __decorateParam(2, aConcept.A_Inject(AreStore_context.AreStore)),
  __decorateParam(3, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(4, aConcept.A_Inject(aConcept.A_Feature))
], exports.AreInterpreter.prototype, "updateInstruction", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: AreInstruction_constants.AreInstructionFeatures.Revert,
    scope: [AreInstruction_entity.AreInstruction]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(exports.AreInterpreter)),
  __decorateParam(2, aConcept.A_Inject(AreStore_context.AreStore)),
  __decorateParam(3, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(4, aConcept.A_Inject(aConcept.A_Feature))
], exports.AreInterpreter.prototype, "revertInstruction", 1);
exports.AreInterpreter = __decorateClass([
  aFrame.A_Frame.Component({
    description: "Stateless executor that reads the Scene and translates its instructions into operations on a rendering target. Computes the diff between applied and planned, calls revert on removed instructions and apply on added ones. Owns no state of its own \u2014 all state lives in the Scene. Can be swapped for any target implementation (DOMInterpreter, SSRInterpreter, CanvasInterpreter) without touching any other part of the pipeline."
  })
], exports.AreInterpreter);
//# sourceMappingURL=AreInterpreter.component.js.map
//# sourceMappingURL=AreInterpreter.component.js.map