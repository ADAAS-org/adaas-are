import { __decorateClass } from '../../chunk-EQQGB2QZ.mjs';
import { A_Context } from '@adaas/a-concept';
import { A_Frame } from '@adaas/a-frame/core';
import { A_ExecutionContext } from '@adaas/a-utils/a-execution';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { AreStoreAreComponentMetaKeys } from './AreStore.constants';
import { AreContext } from '@adaas/are/component/Are.context';
import { A_UtilsHelper } from '@adaas/a-utils/helpers';

let AreStore = class extends A_ExecutionContext {
  constructor(aseid) {
    super(aseid.toString());
    this.dependencies = /* @__PURE__ */ new Map();
    /**
     * Reverse index of `dependencies`: for every watcher, the set of
     * normalized paths it is currently registered against on THIS store.
     * Maintained alongside `dependencies` so a watcher's stale subscriptions
     * can be pruned in O(deps) when it re-evaluates (see {@link pruneWatcher}).
     */
    this.watcherPaths = /* @__PURE__ */ new Map();
    this._keys = /* @__PURE__ */ new Set();
    /**
     * Re-entrant batch depth. While > 0, `dispatch()` accumulates affected
     * watchers into `_pendingNotify` instead of notifying synchronously; the
     * outermost `batch()` flushes them exactly once.
     */
    this._batchDepth = 0;
    this._pendingNotify = /* @__PURE__ */ new Set();
  }
  /**
   * Allows to define a pure function that will be executed in the context of the store, so it can access the store's data and methods, but it won't have access to the component's scope or other features. This can be useful for example for defining a function that will update the store's data based on some logic, without having access to the component's scope or other features, so we can keep the store's logic separate from the component's logic.
   */
  static get Function() {
    return (target, propertyKey, descriptor) => {
      const targetMeta = A_Context.meta(target.constructor);
      const originalMethod = descriptor.value;
      const allExtensions = targetMeta.get(AreStoreAreComponentMetaKeys.StoreExtensions) || {};
      allExtensions[propertyKey] = originalMethod;
      targetMeta.set(AreStoreAreComponentMetaKeys.StoreExtensions, allExtensions);
      return descriptor;
    };
  }
  get owner() {
    return A_Context.scope(this).issuer();
  }
  get parent() {
    return this.owner.parent?.scope.resolve(AreStore);
  }
  get context() {
    return A_Context.scope(this).resolve(AreContext);
  }
  get watchers() {
    return this.context.get("watchers") || /* @__PURE__ */ new Set();
  }
  get keys() {
    return this._keys;
  }
  watch(instruction, reevaluate = false) {
    if (reevaluate) {
      this.pruneWatcher(instruction);
    }
    const watchers = this.context.get("watchers") || /* @__PURE__ */ new Set();
    watchers.add(instruction);
    this.context.set("watchers", watchers);
  }
  unwatch(instruction) {
    const watchers = this.context.get("watchers") || /* @__PURE__ */ new Set();
    watchers.delete(instruction);
    this.context.set("watchers", watchers);
  }
  /**
   * Remove a key (or nested path) from the store and notify every watcher
   * registered against that path — same ancestor/descendant matching rules
   * as {@link set}. Falls through to `A_ExecutionContext.drop()` for the
   * underlying meta cleanup so dependent renders re-evaluate against the
   * now-missing value.
   */
  drop(key) {
    const [firstPart, ...pathPart] = String(key).split(".");
    if (pathPart.length === 0) {
      this._keys.delete(firstPart);
      super.drop(firstPart);
    } else {
      const primaryObject = super.get(firstPart);
      if (primaryObject && typeof primaryObject === "object") {
        const result = A_UtilsHelper.setBypath(primaryObject, pathPart.join("."), void 0);
        super.set(firstPart, result ? result[firstPart] : primaryObject);
      }
    }
    this.dispatch(this.collectAffected(String(key)));
  }
  set(param1, param2) {
    if (typeof param1 === "string" && param2 !== void 0) {
      this.setAsKeyValue(param1, param2);
    } else if (typeof param1 === "object") {
      this.setAsObject(param1);
    } else {
      throw new Error("Invalid parameters for set method. Expected either (key: string, value: any) or (values: object).");
    }
    return this;
  }
  get(key) {
    const [firstPart, ...pathPart] = String(key).split(".");
    if (!this._keys.has(firstPart)) {
      return this.parent?.get(key);
    }
    if (this.watchers.size > 0) {
      const ancestors = this.extractPathSegments(String(key));
      for (const ancestor of ancestors) {
        const normAncestor = this.normalizePath(ancestor);
        if (!this.dependencies.has(normAncestor)) {
          this.dependencies.set(normAncestor, /* @__PURE__ */ new Set());
        }
        this.watchers.forEach((watcher) => {
          this.dependencies.get(normAncestor).add(watcher);
          let paths = this.watcherPaths.get(watcher);
          if (!paths) {
            paths = /* @__PURE__ */ new Set();
            this.watcherPaths.set(watcher, paths);
          }
          paths.add(normAncestor);
        });
      }
    }
    const primaryObject = super.get(firstPart);
    const value = A_UtilsHelper.getByPath(primaryObject, pathPart.join("."));
    return value;
  }
  setAsObject(values) {
    const entires = Object.entries(values);
    const affected = /* @__PURE__ */ new Set();
    for (const [key, value] of entires) {
      this._keys.add(key);
      super.set(key, value);
      for (const watcher of this.collectAffected(String(key))) {
        affected.add(watcher);
      }
    }
    this.dispatch(affected);
    return this;
  }
  setAsKeyValue(key, value) {
    const [firstPart, ...pathPart] = String(key).split(".");
    this._keys.add(firstPart);
    const primaryObject = super.get(firstPart);
    const result = A_UtilsHelper.setBypath(primaryObject, pathPart.join("."), value);
    super.set(firstPart, result ? result[firstPart] : value);
    this.dispatch(this.collectAffected(String(key)));
    return this;
  }
  /**
   * Force a re-notification of every registered watcher, bypassing the
   * usual key/path dependency tracking. Useful when external state
   * (entities, lists, services) has mutated in place and the store
   * has no way to detect the change through `set()`.
   *
   * If `key` is provided, only watchers registered against that key
   * (or any of its ancestor/descendant paths — same rules as `set()`)
   * are notified.
   */
  forceUpdate(key) {
    if (key === void 0) {
      const all = /* @__PURE__ */ new Set();
      for (const instructions of this.dependencies.values()) {
        for (const watcher of instructions) all.add(watcher);
      }
      this.dispatch(all);
      return this;
    }
    this.dispatch(this.collectAffected(String(key)));
    return this;
  }
  /**
   * Runs `fn` with notifications deferred: every watcher affected by writes
   * performed inside `fn` is collected and notified exactly once when the
   * outermost batch completes. Nested `batch()` calls are coalesced into the
   * outermost flush. Use this to wrap a burst of `set()`/`drop()` calls that
   * logically belong together so each dependent renders only once (#4).
   */
  batch(fn) {
    this._batchDepth++;
    try {
      fn();
    } finally {
      this._batchDepth--;
      if (this._batchDepth === 0 && this._pendingNotify.size > 0) {
        const pending = this._pendingNotify;
        this._pendingNotify = /* @__PURE__ */ new Set();
        this.notify(pending);
      }
    }
    return this;
  }
  /**
   * Builds the deduplicated set of watchers affected by a change to
   * `changedKey`, using the same exact/descendant/ancestor path matching as
   * `set()`. Returning a single union Set guarantees each watcher appears at
   * most once regardless of how many of its registered paths matched (#3).
   */
  collectAffected(changedKey) {
    const normChanged = this.normalizePath(String(changedKey));
    const prefix = normChanged + ".";
    const affected = /* @__PURE__ */ new Set();
    for (const [normRegistered, instructions] of this.dependencies) {
      if (normRegistered === normChanged || // exact
      normRegistered.startsWith(prefix) || // descendant
      normChanged.startsWith(normRegistered + ".")) {
        for (const instruction of instructions) affected.add(instruction);
      }
    }
    return affected;
  }
  /**
   * Notifies the given watchers now, or defers them to the batch flush when a
   * `batch()` is active. The incoming set is already deduplicated by
   * {@link collectAffected}.
   */
  dispatch(affected) {
    if (affected.size === 0) return;
    if (this._batchDepth > 0) {
      for (const watcher of affected) this._pendingNotify.add(watcher);
      return;
    }
    this.notify(affected);
  }
  /**
   * Removes a watcher from every dependency set it holds on THIS store (and,
   * best-effort, on ancestor stores reached via parent delegation in
   * `get()`), clearing the matching reverse-index entries. Called at the
   * start of each tracking window so a re-evaluating watcher does not keep
   * stale subscriptions (#5).
   */
  pruneWatcher(instruction) {
    const paths = this.watcherPaths.get(instruction);
    if (paths) {
      for (const path of paths) {
        const set = this.dependencies.get(path);
        if (set) {
          set.delete(instruction);
          if (set.size === 0) this.dependencies.delete(path);
        }
      }
      this.watcherPaths.delete(instruction);
    }
    try {
      this.parent?.pruneWatcher(instruction);
    } catch {
    }
  }
  /**
   * Notifies instructions — immediately or deferred if inside a batch.
   *
   * A failing watcher is isolated so one bad `update()` cannot abort the rest
   * of the flush, but the error is surfaced (no longer swallowed silently) so
   * render-time failures are diagnosable. Logger resolution is best-effort and
   * confined to this cold error path.
   */
  notify(instructions) {
    for (const instruction of instructions) {
      try {
        instruction.update();
      } catch (error) {
        try {
          const logger = A_Context.scope(this).resolve(A_Logger);
          logger?.error(error);
        } catch {
          console.error("[AreStore] watcher update failed:", error);
        }
      }
    }
  }
  /**
   * Removes an instruction from all dependency sets on this store, clearing
   * its reverse-index entry and any pending batched notification. Called when
   * an instruction is reverted/destroyed so a torn-down node's watcher can
   * never be re-notified by a later `set()` (#1).
   */
  unregister(instruction) {
    for (const [path, instructions] of this.dependencies) {
      instructions.delete(instruction);
      if (instructions.size === 0) this.dependencies.delete(path);
    }
    this.watcherPaths.delete(instruction);
    this._pendingNotify.delete(instruction);
  }
  /**
   * Normalizes a path once — reused in both get and set.
   */
  normalizePath(path) {
    return path.replace(/\[(\d+)\]/g, ".$1");
  }
  /**
   * Extracts direct children of the current markup level into typed instances.
   * No tree walking, recursion, or nested parsing — just direct children.
   */
  extractPathSegments(path) {
    const normalized = path.replace(/\[(\d+)\]/g, ".$1");
    const parts = normalized.split(".").filter(Boolean);
    const ancestors = [];
    let current = "";
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isIndex = /^\d+$/.test(part);
      if (i === 0) {
        current = part;
      } else if (isIndex) {
        current = `${current}[${part}]`;
      } else {
        current = `${current}.${part}`;
      }
      ancestors.push(current);
    }
    return ancestors;
  }
  /**
   * Method allows to initialize all extensions defined in the component with @AreStore.Function decorator, so we can use them in the store's context. This method should be called in the component's constructor after super() call, so the store will have access to the component's instance and its properties.
   * 
   * @param component 
   */
  loadExtensions(component) {
    const targetMeta = A_Context.meta(component);
    const allExtensions = targetMeta.get(AreStoreAreComponentMetaKeys.StoreExtensions) || {};
    this.set(allExtensions);
  }
};
AreStore = __decorateClass([
  A_Frame.Define({
    namespace: "A-ARE",
    description: "Runtime data store scoped to an AreNode. Holds interpolation values, dynamic data bindings, and any per-node state that components need to read or write during rendering. Can be injected into directives, attributes, and lifecycle handlers to share mutable data across the render pipeline without exposing it globally."
  })
], AreStore);

export { AreStore };
//# sourceMappingURL=AreStore.context.mjs.map
//# sourceMappingURL=AreStore.context.mjs.map