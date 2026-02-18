import '../../chunk-EQQGB2QZ.mjs';
import { A_Entity, A_Context, A_FormatterHelper } from '@adaas/a-concept';
import { AreSceneInstructionFeatures } from './AreSceneInstruction.constants';
import { AreScene } from '@adaas/are/scene';

class AreSceneInstruction extends A_Entity {
  get scene() {
    return A_Context.scope(this).resolve(AreScene);
  }
  createHash(str) {
    let hashSource;
    if (str instanceof Map) {
      hashSource = JSON.stringify(Array.from(str.entries()));
    } else if (str instanceof Set) {
      hashSource = JSON.stringify(Array.from(str.values()));
    } else {
      switch (typeof str) {
        case "string":
          hashSource = str;
          break;
        case "undefined":
          hashSource = "undefined";
          break;
        case "object":
          if ("toJSON" in str)
            hashSource = JSON.stringify(str.toJSON());
          else
            hashSource = JSON.stringify(str);
          break;
        case "number":
          hashSource = str.toString();
          break;
        case "boolean":
          hashSource = str ? "true" : "false";
          break;
        case "function":
          hashSource = str.toString();
          break;
        default:
          hashSource = String(str);
      }
    }
    let hash = 0, i, chr;
    for (i = 0; i < hashSource.length; i++) {
      chr = hashSource.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    const hashString = hash.toString();
    return hashString;
  }
  fromNew(newEntity) {
    const identity = newEntity.id || {
      name: newEntity.action,
      node: newEntity.node.aseid.toString()
    };
    const id = this.createHash(identity);
    this.aseid = this.generateASEID({
      entity: A_FormatterHelper.toKebabCase(newEntity.action),
      id
    });
    this.action = newEntity.action;
    this.node = newEntity.node;
    this.params = newEntity.params;
  }
  update(params) {
    this.params = {
      ...this.params,
      ...params
    };
  }
  init(scope) {
    try {
      this.call(AreSceneInstructionFeatures.Init, scope);
    } catch (error) {
    }
  }
  apply(scope) {
    try {
      return this.call(AreSceneInstructionFeatures.Apply, scope);
    } catch (error) {
    }
  }
  revert(scope) {
    try {
      this.call(AreSceneInstructionFeatures.Revert, scope);
    } catch (error) {
    }
  }
}

export { AreSceneInstruction };
//# sourceMappingURL=AreSceneInstruction.entity.mjs.map
//# sourceMappingURL=AreSceneInstruction.entity.mjs.map