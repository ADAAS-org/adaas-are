import '../../../chunk-EQQGB2QZ.mjs';
import { AreSceneInstruction } from '../AreSceneInstruction.entity';

class AddStylePropertyInstruction extends AreSceneInstruction {
  get styles() {
    return this.params.property;
  }
  get value() {
    return this.params.value;
  }
  constructor(node, property, value) {
    super({
      id: [property, node],
      action: "add-style",
      node,
      params: {
        property,
        value
      }
    });
  }
}

export { AddStylePropertyInstruction };
//# sourceMappingURL=AddStyleProperty.instruction.mjs.map
//# sourceMappingURL=AddStyleProperty.instruction.mjs.map