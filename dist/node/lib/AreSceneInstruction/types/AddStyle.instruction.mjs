import '../../../chunk-EQQGB2QZ.mjs';
import { AreSceneInstruction } from '../AreSceneInstruction.entity';

class AddStyleInstruction extends AreSceneInstruction {
  get styles() {
    return this.params.styles;
  }
  constructor(node, styles) {
    super({
      id: [styles, node],
      action: "add-style",
      node,
      params: {
        styles
      }
    });
  }
}

export { AddStyleInstruction };
//# sourceMappingURL=AddStyle.instruction.mjs.map
//# sourceMappingURL=AddStyle.instruction.mjs.map