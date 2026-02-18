import '../../../chunk-EQQGB2QZ.mjs';
import { AreSceneInstruction } from '../AreSceneInstruction.entity';

class ReplaceInterpolationInstruction extends AreSceneInstruction {
  get placement() {
    return this.params?.prevValue || this.interpolation.raw;
  }
  get position() {
    return this.interpolation.position;
  }
  get interpolation() {
    return this.params.interpolation;
  }
  get value() {
    return this.params?.value || "";
  }
  constructor(node, interpolation, value, prevValue) {
    super({
      id: [node, interpolation],
      action: "replace-interpolation",
      node,
      params: {
        interpolation,
        prevValue,
        value
      }
    });
  }
}

export { ReplaceInterpolationInstruction };
//# sourceMappingURL=ReplaceInterpolation.instruction.mjs.map
//# sourceMappingURL=ReplaceInterpolation.instruction.mjs.map