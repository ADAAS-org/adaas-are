import { A_TYPES__Ctor, A_Scope } from '@adaas/a-concept';

/**
 * Tag ↔ component resolution, kept free of runtime imports of `Are` so that
 * `AreNode` can use it without an import cycle (Are → AreSignals → AreNode).
 */
declare class AreComponentTag {
    /**
     * Returns the tag a component class is rendered under: its OWN static
     * `tag` when defined, otherwise the kebab-cased class name with any
     * bundler-added leading underscores stripped (`_Foo` → `foo`).
     */
    static of(ctor: A_TYPES__Ctor<any>): string;
    /**
     * Resolves the component registered for a tag in the given scope chain.
     *
     * The class-name lookup is tried first (fast and cached by the scope). On a
     * miss, components visible from the scope are matched by {@link of}, which
     * covers explicit `static tag` values and bundler-renamed classes. The
     * fallback result is memoized per scope fingerprint, so repeated misses for
     * plain elements stay cheap.
     */
    static resolve<T = any>(scope: A_Scope, entity: string): T | undefined;
}

export { AreComponentTag };
