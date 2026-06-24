import { A_Caller, A_Component, A_Context, A_Feature, A_Inject, A_Meta, A_Scope, A_TYPES__Ctor } from "@adaas/a-concept";
import { A_SignalBusFeatures, A_Signal, A_SignalState, A_SignalVector } from "@adaas/a-utils/a-signal";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { AreContext } from "@adaas/are/component/Are.context";
import { AreFeatures, AreSignalFeatureKey } from "@adaas/are/component/Are.constants";
import { AreNode } from "@adaas/are/node/AreNode.entity";
import { AreNodeFeatures } from "@adaas/are/node/AreNode.constants";
import { AreEvent } from "@adaas/are/event/AreEvent.context";
import { A_Frame } from "@adaas/a-frame/core";
import { AreSignalsMeta } from "./AreSignals.meta";
import { AreSignalsContext } from "./AreSignals.context";
import { Are } from "@adaas/are/component/Are.component";



@A_Frame.Define({
    namespace: 'A-ARE',
    description: 'AreSignals is the central signal bus component within the ARE framework. It listens for incoming signal vectors and dispatches them to all subscribed root nodes, enabling reactive, event-driven rendering and lifecycle management across the component tree.'
})
@A_Meta.Define(AreSignalsMeta)
export class AreSignals extends A_Component {

    @A_Feature.Extend({
        name: A_SignalBusFeatures.onNext,
    })
    async handleSignalVector(
        @A_Inject(A_SignalVector) vector: A_SignalVector,
        @A_Inject(AreSignalsContext) context: AreSignalsContext,
        @A_Inject(A_SignalState) state: A_SignalState,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(A_Logger) logger?: A_Logger,
    ) {
        logger?.debug(`Handling Signal Vector with ${context.subscribers.size} root nodes.`, vector);

        try {
            for (const sub of context.subscribers) {

                // Skip subscriber roots that are not backed by a real Are
                // component. Stray top-level template nodes (whitespace text,
                // HTML comments, a <script> tag, etc.) are tokenized as roots
                // and subscribe to the bus, but they own no signal handlers and
                // no managed outlet — re-emitting to them only triggers a
                // redundant re-interpret that fails its mount-point lookup.
                // Note: `node.component` resolves the PascalCase entity name and
                // for primitive nodes (are-text, are-comment) returns the node's
                // own class instance, which is NOT an `Are` component — so an
                // `instanceof Are` check is required to distinguish real
                // component roots from these. Only `Are`-backed nodes can
                // meaningfully react to signals.
                if (!(sub.component instanceof Are)) continue;

                const callScope = new A_Scope({
                    fragments: [new AreEvent(
                        AreFeatures.onSignal, {
                        vector
                    })]
                })
                    .import(scope, sub.scope);

                logger?.debug('Emitting signal for sub node:', vector);

                await sub.emit(callScope);

                callScope.destroy();

                // ─────────────────────────────────────────────────────────────
                // Typed dispatch
                // ─────────────────────────────────────────────────────────────
                // For each signal that was ACTUALLY dispatched on THIS tick,
                // also emit a per-type event so handlers registered via
                // `@Are.Signal(SignalCtor)` receive only the signals they care
                // about. The composed feature name (`onSignal:<signal-entity>`)
                // is matched on the component's feature registry; components
                // without a typed handler simply see a no-op chain.
                //
                // IMPORTANT: we iterate the freshly-dispatched signals (the
                // ones registered as entities in the bus-next-scope by
                // A_SignalBus.next()), NOT the accumulated `vector` from
                // A_SignalState. The accumulated vector also carries signals
                // from PREVIOUS ticks; firing typed handlers for those would
                // (a) re-invoke the handler on every subsequent tick while the
                // signal lingers in state — breaking the "fires only for its
                // signal type" condition — and (b) fail to resolve
                // `@A_Inject(SignalCtor)` because older signals are no longer
                // registered in this scope. Restricting to the fresh signals
                // keeps both the firing condition and the injection correct.
                const dispatchedSignals = scope.resolveFlatAll<A_Signal>(A_Signal);

                for (const signal of dispatchedSignals) {
                    if (!signal) continue;

                    const ctor = signal.constructor as A_TYPES__Ctor<typeof signal> & { entity?: string; name: string };
                    const typedFeatureName = AreSignalFeatureKey(ctor);

                    const typedScope = new A_Scope({
                        fragments: [new AreEvent(typedFeatureName, {
                            vector,
                            signal,
                        })]
                    })
                        .import(scope, sub.scope);

                    await sub.emit(typedScope);

                    typedScope.destroy();
                }
            }
        } catch (error) {
            logger?.error(error);
        }
    }



    // -----------------------------------------------------------------------------------------
    // ----------------------------Are-Node Event Section----------------------------------------
    // -----------------------------------------------------------------------------------------
    /**
     * Handles events triggered on the AreNode
     * 
     * @param node 
     * @param scope 
     * @param event 
     * @param scene 
     * @param feature 
     * @param args 
     */
    @A_Feature.Extend({
        name: AreNodeFeatures.onEmit,
        scope: [AreNode]
    })
    async propagateEvent(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreEvent) event: AreEvent,
        @A_Inject(A_Feature) feature: A_Feature,
        @A_Inject(A_Logger) logger?: A_Logger,
        ...args: any[]
    ) {
        let currentNode = node;
        let target = node;

        while (currentNode && currentNode.parent) {
            if (currentNode.component) {
                target = currentNode;
                break;
            }
            currentNode = currentNode.parent;
        }

        if (target.component)
            await feature.chain(target.component, event.name, scope);
    }


    // -----------------------------------------------------------------------------------------
    // ----------------------------Are-Component Notify Section---------------------------------
    // -----------------------------------------------------------------------------------------
    /**
     * Notifies all mounted nodes whose component is exactly the specified constructor
     * (strict match — subclasses are excluded).
     *
     * @param ctor  - The Are component constructor to target
     * @param event - The event to emit to all matching nodes
     */
    async notifyExact<T extends Are>(
        ctor: A_TYPES__Ctor<T>,
        event: AreEvent,
    ): Promise<void> {
        const context = A_Context.scope(this).resolve(AreContext);

        if (!context) return;

        for (const root of context.roots) {
            await this.traverseAndNotify(root, event, (component) => component.constructor === ctor);
        }
    }

    /**
     * Notifies all mounted nodes whose component is an instance of the specified
     * constructor, including nodes backed by subclasses (polymorphic match).
     *
     * @param ctor  - The Are component constructor to target
     * @param event - The event to emit to all matching nodes
     */
    async notifyAll<T extends Are>(
        ctor: A_TYPES__Ctor<T>,
        event: AreEvent,
    ): Promise<void> {
        const context = A_Context.scope(this).resolve(AreContext);

        if (!context) return;

        for (const root of context.roots) {
            await this.traverseAndNotify(root, event, (component) => component instanceof ctor);
        }
    }

    /**
     * Notifies all mounted nodes whose component matches the specified constructor.
     * 
     * By default uses polymorphic matching (includes subclasses). Pass `{ exact: true }`
     * to restrict to the exact constructor only.
     *
     * @param ctor    - The Are component constructor to target
     * @param event   - The event to emit to all matching nodes
     * @param options - `exact`: when true, subclasses are excluded (defaults to false)
     */
    async notify<T extends Are>(
        ctor: A_TYPES__Ctor<T>,
        event: AreEvent,
        options?: { exact?: boolean },
    ): Promise<void> {
        if (options?.exact) {
            return this.notifyExact(ctor, event);
        }
        return this.notifyAll(ctor, event);
    }

    protected async traverseAndNotify(
        node: AreNode,
        event: AreEvent,
        match: (component: Are) => boolean,
    ): Promise<void> {
        if (node.component && match(node.component)) {
            await node.emit(event);
        }

        for (const child of node.children) {
            await this.traverseAndNotify(child, event, match);
        }
    }
}