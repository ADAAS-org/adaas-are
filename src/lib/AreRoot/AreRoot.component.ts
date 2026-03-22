import { A_Caller, A_Context, A_Dependency, A_Dependency_All, A_Feature, A_Inject, A_Scope, A_TYPES__Ctor } from "@adaas/a-concept";
import { Are } from "@adaas/are/component";
import { AreStore } from "@adaas/are/store";
import { AreNode, AreRootNode } from "@adaas/are/node";
import { AreEvent } from "@adaas/are/event";
import { AreScene } from "@adaas/are/scene";
import { A_ServiceFeatures } from "@adaas/a-utils/a-service";
import { A_SignalState, A_SignalVector } from "@adaas/a-utils/a-signal";
import { AreMeta } from "../AreComponent/Are.meta";
import { A_Logger } from "@adaas/a-utils/a-logger";



export class AreRoot extends Are {



    @Are.Signal
    async onSignal(
        @A_Inject(A_Caller) root: AreRootNode,
        @A_Inject(A_SignalVector) vector: A_SignalVector,
        @A_Dependency.All()
        @A_Inject(Are) components: Are[],
        @A_Inject(A_Logger) logger: A_Logger
        // @A_Dependency.All()
        // @A_Inject(A_Signal) signals: A_Signal[],
    ) {

        const renderTarget = this.findNextTarget(vector, components);

        if (renderTarget == root.target)
            return; // If the target component is already rendered, no need to update the template and re-render the same component. This check helps to optimize performance by avoiding unnecessary updates and re-renders when the target component is already being displayed under the root node.

        root.setComponent(renderTarget!);

        for (let i = 0; i < root.children.length; i++) {
            const child = root.children[i];
            child.unmount();
            child.destroy();
        }

        await root.load();
        root.compile();
        root.mount();
    }


    protected findNextTarget(
        vector: A_SignalVector,
        components: Are[]
    ): Are | undefined {
        let renderTarget: Are | undefined = undefined
        const logger = A_Context.scope(this).resolve(A_Logger);

        for (let i = 0; i < components.length; i++) {
            const component = components[i];

            const meta = A_Context.meta<AreMeta>(component);

            if (!meta.vector) continue;


            if (vector.match(meta.vector)) {
                renderTarget = component;
                break;
            }
        }

        if (!renderTarget) {
            logger?.warning('No component matched the current signal state for rendering in AreRoot. Please ensure that at least one component has a signal vector that matches the current state.');
            return;
        }

        return renderTarget;
    }
}
