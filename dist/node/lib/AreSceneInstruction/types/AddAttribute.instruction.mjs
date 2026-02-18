import '../../../chunk-EQQGB2QZ.mjs';
import { AreSceneInstruction } from '../AreSceneInstruction.entity';

class AddAttributeInstruction extends AreSceneInstruction {
  get name() {
    return this.params.name;
  }
  get value() {
    return this.params.value;
  }
  constructor(node, name, value) {
    super({
      id: [name, node],
      action: "add-attribute",
      node,
      params: {
        name,
        value
      }
    });
  }
}

export { AddAttributeInstruction };
//# sourceMappingURL=AddAttribute.instruction.mjs.map
//# sourceMappingURL=AddAttribute.instruction.mjs.map