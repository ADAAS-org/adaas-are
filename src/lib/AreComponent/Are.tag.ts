import { A_FormatterHelper, A_Scope, A_TYPES__Ctor } from "@adaas/a-concept";


const TAG_MATCH_CACHE_LIMIT = 5000;
const _tagOfCache = new WeakMap<Function, string>();
const _pascalCache = new Map<string, string>();
const _tagMatchCache = new Map<string, A_TYPES__Ctor<any> | null>();

/**
 * Tag ↔ component resolution, kept free of runtime imports of `Are` so that
 * `AreNode` can use it without an import cycle (Are → AreSignals → AreNode).
 */
export class AreComponentTag {
    /**
     * Returns the tag a component class is rendered under: its OWN static
     * `tag` when defined, otherwise the kebab-cased class name with any
     * bundler-added leading underscores stripped (`_Foo` → `foo`).
     */
    static of(ctor: A_TYPES__Ctor<any>): string {
        let tag = _tagOfCache.get(ctor);
        if (tag === undefined) {
            const own = Object.prototype.hasOwnProperty.call(ctor, 'tag') ? (ctor as any).tag : undefined;
            tag = typeof own === 'string' && own
                ? own
                : A_FormatterHelper.toKebabCase(ctor.name.replace(/^_+/, ''));
            _tagOfCache.set(ctor, tag);
        }
        return tag;
    }

    /**
     * Resolves the component registered for a tag in the given scope chain.
     *
     * The class-name lookup is tried first (fast and cached by the scope). On a
     * miss, components visible from the scope are matched by {@link of}, which
     * covers explicit `static tag` values and bundler-renamed classes. The
     * fallback result is memoized per scope fingerprint, so repeated misses for
     * plain elements stay cheap.
     */
    static resolve<T = any>(scope: A_Scope, entity: string): T | undefined {
        let name = _pascalCache.get(entity);
        if (name === undefined) {
            name = A_FormatterHelper.toPascalCase(entity);
            _pascalCache.set(entity, name);
        }

        const byName = scope.resolve(name) as T | undefined;
        if (byName) return byName;

        const key = scope.fingerprint + '|' + entity;
        let ctor = _tagMatchCache.get(key);

        if (ctor === undefined) {
            ctor = null;
            for (let current: A_Scope | undefined = scope; current && !ctor; current = current.parent) {
                for (const candidate of current.allowedComponents) {
                    if (AreComponentTag.of(candidate) === entity) {
                        ctor = candidate;
                        break;
                    }
                }
            }
            if (_tagMatchCache.size >= TAG_MATCH_CACHE_LIMIT) _tagMatchCache.clear();
            _tagMatchCache.set(key, ctor);
        }

        return ctor ? scope.resolve(ctor) as T | undefined : undefined;
    }
}
