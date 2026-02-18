import '../../../chunk-EQQGB2QZ.mjs';
import { AreSceneInstruction } from '../AreSceneInstruction.entity';

class AddDirectiveInstruction extends AreSceneInstruction {
  get directive() {
    return this.params.directive;
  }
  get value() {
    return this.params.value;
  }
  constructor(node, directive, value) {
    super({
      id: [directive, node],
      action: "directive",
      node,
      params: {
        directive,
        value
      }
    });
  }
}

export { AddDirectiveInstruction };
//# sourceMappingURL=AddDirective.instruction.mjs.map
//# sourceMappingURL=AddDirective.instruction.mjs.map