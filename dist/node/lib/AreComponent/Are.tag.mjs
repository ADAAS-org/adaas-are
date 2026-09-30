import '../../chunk-EQQGB2QZ.mjs';
import { A_FormatterHelper } from '@adaas/a-concept';

const TAG_MATCH_CACHE_LIMIT = 5e3;
const _tagOfCache = /* @__PURE__ */ new WeakMap();
const _pascalCache = /* @__PURE__ */ new Map();
const _tagMatchCache = /* @__PURE__ */ new Map();
class AreComponentTag {
  /**
   * Returns the tag a component class is rendered under: its OWN static
   * `tag` when defined, otherwise the kebab-cased class name with any
   * bundler-added leading underscores stripped (`_Foo` → `foo`).
   */
  static of(ctor) {
    let tag = _tagOfCache.get(ctor);
    if (tag === void 0) {
      const own = Object.prototype.hasOwnProperty.call(ctor, "tag") ? ctor.tag : void 0;
      tag = typeof own === "string" && own ? own : A_FormatterHelper.toKebabCase(ctor.name.replace(/^_+/, ""));
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
  static resolve(scope, entity) {
    let name = _pascalCache.get(entity);
    if (name === void 0) {
      name = A_FormatterHelper.toPascalCase(entity);
      _pascalCache.set(entity, name);
    }
    const byName = scope.resolve(name);
    if (byName) return byName;
    const key = scope.fingerprint + "|" + entity;
    let ctor = _tagMatchCache.get(key);
    if (ctor === void 0) {
      ctor = null;
      for (let current = scope; current && !ctor; current = current.parent) {
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
    return ctor ? scope.resolve(ctor) : void 0;
  }
}

export { AreComponentTag };
//# sourceMappingURL=Are.tag.mjs.map
//# sourceMappingURL=Are.tag.mjs.map