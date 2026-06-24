import { A_Fragment, A_TYPES__Ctor } from '@adaas/a-concept';
import { Are } from '../AreComponent/Are.component.js';
import '@adaas/a-utils/a-signal';
import '../AreComponent/Are.types.js';
import '../AreComponent/Are.constants.js';

/**
 * Pluggable hook the engine consults when a node's tag does NOT resolve to a
 * registered component.
 *
 * By default the loader treats an unresolved custom tag as a plain element. By
 * registering a concrete `AreComponentResolver` in the container, an app can
 * intercept that miss and supply the component class asynchronously — the
 * canonical mechanism for **runtime / lazy component loading** (fetch a class
 * from a backend, dynamic `import()`, etc.).
 *
 * The engine, on a resolution miss during load:
 *   1. calls {@link resolve} with the node's tag (the ASEID entity, e.g.
 *      `about-page`),
 *   2. if a class comes back, registers it into the node's scope (so the tag
 *      resolves from now on),
 *   3. proceeds to load the node as a component — no different from a
 *      bootstrap-registered one.
 *
 * Implementations are responsible for the transport (network, manifest lookup,
 * bundling) AND for memoizing already-loaded classes so repeated tags don't
 * refetch. Returning `undefined` means "not a component" and the node stays a
 * plain element.
 *
 * Resolution is OPT-IN: when no `AreComponentResolver` is registered the load
 * path is byte-for-byte unchanged.
 */
declare abstract class AreComponentResolver extends A_Fragment {
    /**
     * Resolve a tag to a component constructor, or `undefined` when the tag is
     * not a (loadable) component.
     *
     * @param entity - the node's tag name (kebab-case ASEID entity, e.g.
     *                 `about-page`).
     */
    abstract resolve(entity: string): Promise<A_TYPES__Ctor<Are> | undefined>;
}

export { AreComponentResolver };
