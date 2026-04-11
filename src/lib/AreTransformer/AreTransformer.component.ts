import { A_Caller, A_Component, A_Feature, A_FormatterHelper, A_Inject, A_Scope } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { AreNode } from "@adaas/are/node/AreNode.entity";
import { AreNodeFeatures } from "@adaas/are/node/AreNode.constants";
import { AreScene } from "@adaas/are/scene/AreScene.context";



@A_Frame.Component({
    description: 'Reshapes the AreNode tree before compilation without changing its abstraction level. Responsible for structural rewrites that would complicate the compiler if left unhandled — converting $for nodes into AreGroupNode, extracting AreText and AreInterpolation from raw text, sorting directives via TopologicalSorter, and flagging static nodes.'
})
export class AreTransformer extends A_Component {

    @A_Feature.Extend({
        name: AreNodeFeatures.onTransform,
        scope: [AreNode]
    })
    transform(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreScene) scene: AreScene,
        ...args: any[]
    ) {
         // walk entire tree inside one feature — no recursive feature calls
        const queue = [node]
        while (queue.length > 0) {
            const current = queue.shift()!
            // const scene = current.scene;
            // if (scene.isInactive)
            //     continue;

            /**
             * 2. Prepare Instructions for directives and add then to render plan.
             */
            for (let i = 0; i < current.attributes.length; i++) {

                const attribute = current.attributes[i];
                attribute.transform();
            }
            
            queue.push(...current.children)
        }

    }
}