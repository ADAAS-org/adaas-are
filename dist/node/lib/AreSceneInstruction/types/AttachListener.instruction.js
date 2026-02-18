'use strict';

var AreSceneInstruction_entity = require('../AreSceneInstruction.entity');
var event = require('@adaas/are/event');

class AttachListenerInstruction extends AreSceneInstruction_entity.AreSceneInstruction {
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
      const newEvent = new event.AreEvent(listener.handler, {
        event: listener.name,
        data: e
      });
      await this.target.emit(newEvent);
    };
  }
}

exports.AttachListenerInstruction = AttachListenerInstruction;
//# sourceMappingURL=AttachListener.instruction.js.map
//# sourceMappingURL=AttachListener.instruction.js.map