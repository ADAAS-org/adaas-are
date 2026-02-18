import '../../../chunk-EQQGB2QZ.mjs';
import { AreSceneInstruction } from '../AreSceneInstruction.entity';
import { AreEvent } from '@adaas/are/event';

class AttachListenerInstruction extends AreSceneInstruction {
  get listener() {
    return this.params.listener;
  }
  get event() {
    return this.params.listener.handler;
  }
  get target() {
    return this.params.target;
  }
  get callback() {
    return this._callback;
  }
  constructor(node, target, listener) {
    super({
      id: [node, listener.name],
      action: "listener",
      node,
      params: {
        target,
        listener
      }
    });
    this._callback = async (e) => {
      const newEvent = new AreEvent(listener.handler, {
        event: listener.name,
        data: e
      });
      await this.target.emit(newEvent);
    };
  }
}

export { AttachListenerInstruction };
//# sourceMappingURL=AttachListener.instruction.mjs.map
//# sourceMappingURL=AttachListener.instruction.mjs.map