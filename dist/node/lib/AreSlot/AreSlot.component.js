'use strict';

var Are_component = require('../AreComponent/Are.component');

class AreSlot extends Are_component.Are {
  async template() {
  }
  // @A_Feature.Extend()
  // async [A_SignalVectorFeatures.Next](
  //     @A_Inject(A_SignalVector) vector: A_SignalVector
  // ) {
  //     // Emit signals if needed
  //     console.log('AreSlot Signal Vector Emitted:', vector);
  // }
  // @A_Feature.Extend({
  //     name: AreNodeFeatures.onCompile,
  //     scope: [AreNode]
  // })
  // async compile(
  //     @A_Inject(A_Caller) node: AreNode,
  //     @A_Inject(AreScene) scene: AreScene,
  //     @A_Inject(A_Logger) logger: A_Logger,
  //     @A_Inject(A_SignalState) signalState?: A_SignalState,
  // ) {
  //     const vector = await signalState?.toVector().toDataVector()
  //     logger.debug('red',
  //         '================================================================',
  //         `Compiling AreSlot Component at Scene: <${scene.name}>`,
  //         '================================================================',
  //         vector
  //     )
  // }
}

exports.AreSlot = AreSlot;
//# sourceMappingURL=AreSlot.component.js.map
//# sourceMappingURL=AreSlot.component.js.map