# Known issues & wanted features — @adaas/are

Found while building apps on the framework. Each entry: what happens, and the workaround apps currently use.

## Bugs

### ARE-5. Published 0.0.28 breaks on the published a-concept 0.3.31
- What happens:
  - The npm build of `are@0.0.28` uses the raw attribute name as the ASEID entity.
  - The npm build of `a-concept@0.3.31` rejects anything outside `[a-zA-Z0-9_.-]`.
  - As a result, `@a-input:submit` and similar bindings throw `Invalid ASEID entity provided` during tokenize, and the page renders black (hit a-os/ui after `npm install`).
- Already fixed in the local source (`AreAttribute.fromNew` sanitizes the name). It needs publishing.
- Workaround: apps use the local builds.

ARE-3 and ARE-4 are listed under Fixed, but still need confirming in a-automation before their workarounds are dropped.

## Fixed

### ARE-F1. Tag resolution broke when a component had a static referencing its own class (was ARE-1)
- esbuild renames such classes to `_Foo`, so `<foo>` stopped resolving and rendered empty.
- Fixed:
  - New `src/lib/AreComponent/Are.tag.ts` (`AreComponentTag`), exposed as `Are.tagOf(ctor)` and `Are.resolveByTag(scope, tag)`.
  - A component's tag is its own `static tag` if declared. Otherwise it is the kebab-cased class name with leading `_` stripped.
  - Resolution tries the class name first. It then falls back to matching the tag of every allowed component up the scope chain. Results are memoized per scope fingerprint.
  - `AreNode.component` uses it, and are-html's `AreComponent`, `AreRoot` and `AreRoot.component` do too.
- Class-referencing statics are fine now. For fully minified builds (mangled class names), declare `static tag = 'my-tag'`.
- Test: `tests/AreComponentTag.test.ts`.

### ARE-F2. `AreStore.set(key, undefined)` threw (was ARE-2)
- `set(key, undefined)` now removes the key, and watchers are notified as for any other change. The `?? null` / `?? ""` coalescing is no longer needed.
- Test: `tests/AreStore.test.ts`.

### ARE-F3. `@Are.EventHandler` didn't wire across packages (was ARE-3) — detection only
- Root cause: the shared package was running its own copy of `@adaas/are` / `@adaas/a-concept`. Event handlers and templates use the same `A_Feature.Extend` mechanism, so with a single framework copy they wire the same way. Handlers registered against a second copy are invisible to the host runtime.
  - `@adaas/ui-components`' tsup config already externalizes `@adaas/*`. The duplicate most likely comes from a nested `node_modules` (a version mismatch between the app and the package).
- Added: `Are` sets a `globalThis[Symbol.for('adaas.are.runtime')]` marker and warns (`[are] Multiple copies of @adaas/are are loaded...`) when a second copy loads. a-concept does the same (C-F3).
- Fix in the app: make sure there is one copy (`npm ls @adaas/are @adaas/a-concept`, align versions or use `overrides`, and keep `@adaas/*` external when bundling libraries).
  - Once the warning is gone, the `document.addEventListener` delegation workaround can be removed.

### ARE-F4. `node.clear()` left the first-paint subtree (was ARE-4) — not reproducible
- Not reproducible on the current code: render/clear idempotency and the `$for` fixes changed this path.
  - `render()` replaces the template's first paint.
  - Re-rendering from `onAfterMount` replaces it.
  - `clear()` alone empties it.
- Regression tests: `adaas-are-html/tests/FirstPaintClear.test.ts`.
- The `.x-boot:not(:only-child)` workaround can be removed once confirmed in a-automation.

### ARE-F5. Loop-variable bindings needed `eval` and failed silently under a strict CSP (was ARE-5)
- The fast path now walks dotted paths (`t.label`) from the directive scope, then falls back to the store.
- New CSP-safe evaluator, `src/lib/AreSyntax/AreSyntax.evaluator.ts`. It evaluates common expressions without `eval` / `new Function`:
  - paths, literals and template strings
  - `!`, `?:`, comparisons, arithmetic, `&& || ??`
  - calls such as `$pick(t.id)`
  - arrow functions with an expression body, and array literals
- Only expressions outside that subset fall back to `new Function`. Object literals `{...}` are still rejected by the syntax guard, by design.
- The interpreter now logs evaluation errors (`logger.error`) instead of silently rendering empty values.
- `'unsafe-eval'` is no longer needed in `script-src` for the common template shapes.
- Tests: `tests/AreSyntax.test.ts`.

### ARE-F6. Event/binding attributes with `:` crashed the whole UI under a-concept 0.3.31
- a-concept 0.3.31 validates ASEID parts strictly (entity `[a-zA-Z0-9_.-]`). `AreAttribute.fromNew` used the raw attribute name as the entity, so `@a-button:click` threw `Invalid ASEID entity provided` during tokenize and the page rendered blank.
- Fixed: the entity is the name with every other char replaced by `-` (`a-button-click`). `attr.name` keeps the real name; nothing reads `aseid.entity` of an attribute.
- Test: `tests/AreSerialization.test.ts`.
- Needs a release (0.0.29). Until then the dist is copied by hand into the composer-new `node_modules`.
- Note: `AreNode` still uses the HTML `id="…"` as the ASEID id (it must match the DOM id for roots), so an element id outside `[a-zA-Z0-9_-]` would still throw.

### ARE-F7. A store change that both hid a `$if` and changed a binding inside it threw "Element Not Found"
- `store.set({ isNote: false, note: '' })` with `{{note}}` inside `$if="isNote"`. `AreStore.notify` walked a snapshot of the affected watchers. The `$if` update unmounted its subtree first, which reverted and unregistered the `{{note}}` instruction. The snapshot still updated it, so AddText targeted a removed element. Every later update of that subtree logged A_ERROR, and later `$if` siblings could stop re-appearing (seen in a-folder's details pane).
- Fixed: `notify` skips watchers unregistered during the flush. `unregister` also clears the parent store, since reads can be delegated there.
- Tests: `tests/AreStore.test.ts` here, and `tests/ForInsideIf.test.ts` in are-html.
- Needs a release (with ARE-F6). Until then the dist is copied by hand.
