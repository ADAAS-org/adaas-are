import { __decorateClass } from '../../chunk-EQQGB2QZ.mjs';
import { A_Context } from '@adaas/a-concept';
import { A_Frame } from '@adaas/a-frame';
import { A_ExecutionContext } from '@adaas/a-utils/a-execution';
import { AreStoreAreComponentMetaKeys } from './AreStore.constants';
import { AreContext } from '@adaas/are/component/Are.context';
import { A_UtilsHelper } from '@adaas/a-utils/helpers';

let AreStore = class extends A_ExecutionContext {
  constructor(aseid) {
    super(aseid.toString());
    this.dependencies = /* @__PURE__ */ new Map();
    this._keys = /* @__PURE__ */ new Set();
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
  watch(instruction) {
    const watchers = this.context.get("watchers") || /* @__PURE__ */ new Set();
    watchers.add(instruction);
    this.context.set("watchers", watchers);
  }
  unwatch(instruction) {
    const watchers = this.context.get("watchers") || /* @__PURE__ */ new Set();
    watchers.delete(instruction);
    this.context.set("watchers", watchers);
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
        this.watchers.forEach((watcher) => this.dependencies.get(normAncestor).add(watcher));
      }
    }
    const primaryObject = super.get(firstPart);
    const value = A_UtilsHelper.getByPath(primaryObject, pathPart.join("."));
    return value;
  }
  setAsObject(values) {
    const entires = Object.entries(values);
    for (const [key, value] of entires) {
      this._keys.add(key);
      super.set(key, value);
      const normChanged = this.normalizePath(String(key));
      const prefix = normChanged + ".";
      for (const [normRegistered, instructions] of this.dependencies) {
        if (normRegistered === normChanged || // exact
        normRegistered.startsWith(prefix) || // descendant
        normChanged.startsWith(normRegistered + ".")) {
          this.notify(instructions);
        }
      }
    }
    return this;
  }
  setAsKeyValue(key, value) {
    const [firstPart, ...pathPart] = String(key).split(".");
    this._keys.add(firstPart);
    const primaryObject = super.get(firstPart);
    const result = A_UtilsHelper.setBypath(primaryObject, pathPart.join("."), value);
    super.set(firstPart, result ? result[firstPart] : value);
    const normChanged = this.normalizePath(String(key));
    const prefix = normChanged + ".";
    for (const [normRegistered, instructions] of this.dependencies) {
      if (normRegistered === normChanged || // exact
      normRegistered.startsWith(prefix) || // descendant
      normChanged.startsWith(normRegistered + ".")) {
        this.notify(instructions);
      }
    }
    return this;
  }
  /**
   * Notifies instructions — immediately or deferred if inside a batch.
   */
  notify(instructions) {
    for (const instruction of instructions) {
      try {
        instruction.update();
      } catch (error) {
      }
    }
  }
  /**
   * Removes an instruction from all dependency sets.
   * Called when an instruction is reverted/destroyed.
   */
  unregister(instruction) {
    for (const instructions of this.dependencies.values()) {
      instructions.delete(instruction);
    }
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
  A_Frame.Fragment({
    description: "Are Store uses to keep AreNode related information for interpolations, runtime data, etc. This object can be injected to manipulate with data at runtime."
  })
], AreStore);

export { AreStore };
//# sourceMappingURL=AreStore.context.mjs.map
//# sourceMappingURL=AreStore.context.mjs.map