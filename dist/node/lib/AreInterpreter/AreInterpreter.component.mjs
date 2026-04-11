import { __decorateClass, __decorateParam } from '../../chunk-EQQGB2QZ.mjs';
import { A_Feature, A_Inject, A_Caller, A_Scope, A_Component } from '@adaas/a-concept';
import { A_Frame } from '@adaas/a-frame';
import { AreScene } from '@adaas/are/scene/AreScene.context';
import { AreNode } from '@adaas/are/node/AreNode.entity';
import { AreNodeFeatures } from '@adaas/are/node/AreNode.constants';
import { AreInstructionFeatures } from '@adaas/are/instruction/AreInstruction.constants';
import { AreInstruction } from '@adaas/are/instruction/AreInstruction.entity';
import { AreStore } from '@adaas/are/store/AreStore.context';

let AreInterpreter = class extends A_Component {
  /**
   * Decorator to mark a method as an instruction Apply handler for the specific instruction type. The method will be called during the render phase of the ARE component when the corresponding instruction needs to be applied. The method should contain logic to perform the necessary operations on the rendering target based on the instruction's content and context.
   * 
   * @param action 
   * @returns 
   */
  static Apply(action) {
    const name = action + AreInstructionFeatures.Apply;
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
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
    const name = action + AreInstructionFeatures.Update;
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
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
    const name = action + AreInstructionFeatures.Revert;
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
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
      feature.chain(interpreter, instruction.name + AreInstructionFeatures.Apply, scope);
      store.unwatch(instruction);
    } catch (error) {
      store.unwatch(instruction);
      throw error;
    }
  }
  updateInstruction(instruction, interpreter, store, scope, feature, ...args) {
    try {
      store.watch(instruction);
      feature.chain(interpreter, instruction.name + AreInstructionFeatures.Update, scope);
      store.unwatch(instruction);
    } catch (error) {
      store.unwatch(instruction);
      throw error;
    }
  }
  revertInstruction(instruction, interpreter, store, scope, feature, ...args) {
    try {
      feature.chain(interpreter, instruction.name + AreInstructionFeatures.Revert, scope);
    } catch (error) {
      throw error;
    }
  }
};
__decorateClass([
  A_Feature.Extend({
    name: AreNodeFeatures.onInterpret,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(AreScene))
], AreInterpreter.prototype, "interpret", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreInstructionFeatures.Apply,
    scope: [AreInstruction]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreInterpreter)),
  __decorateParam(2, A_Inject(AreStore)),
  __decorateParam(3, A_Inject(A_Scope)),
  __decorateParam(4, A_Inject(A_Feature))
], AreInterpreter.prototype, "applyInstruction", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreInstructionFeatures.Update,
    scope: [AreInstruction]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreInterpreter)),
  __decorateParam(2, A_Inject(AreStore)),
  __decorateParam(3, A_Inject(A_Scope)),
  __decorateParam(4, A_Inject(A_Feature))
], AreInterpreter.prototype, "updateInstruction", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreInstructionFeatures.Revert,
    scope: [AreInstruction]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreInterpreter)),
  __decorateParam(2, A_Inject(AreStore)),
  __decorateParam(3, A_Inject(A_Scope)),
  __decorateParam(4, A_Inject(A_Feature))
], AreInterpreter.prototype, "revertInstruction", 1);
AreInterpreter = __decorateClass([
  A_Frame.Component({
    description: "Stateless executor that reads the Scene and translates its instructions into operations on a rendering target. Computes the diff between applied and planned, calls revert on removed instructions and apply on added ones. Owns no state of its own \u2014 all state lives in the Scene. Can be swapped for any target implementation (DOMInterpreter, SSRInterpreter, CanvasInterpreter) without touching any other part of the pipeline."
  })
], AreInterpreter);

export { AreInterpreter };
//# sourceMappingURL=AreInterpreter.component.mjs.map
//# sourceMappingURL=AreInterpreter.component.mjs.map