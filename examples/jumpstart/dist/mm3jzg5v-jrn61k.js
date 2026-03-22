var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);

// node_modules/@adaas/a-concept/dist/browser/index.mjs
var _a;
var R = (_a = class {
  constructor(e = {}) {
    this._name = e.name || this.constructor.name;
  }
  get name() {
    return this._name;
  }
  toJSON() {
    return { name: this.name };
  }
}, __name(_a, "R"), _a);
var be = ((i) => (i.INITIALIZED = "INITIALIZED", i.PROCESSING = "PROCESSING", i.COMPLETED = "COMPLETED", i.INTERRUPTED = "INTERRUPTED", i.FAILED = "FAILED", i))(be || {});
var _a2;
var g = (_a2 = class {
  static toUpperSnakeCase(e) {
    return e.trim().replace(/([a-z])([A-Z])/g, "$1_$2").replace(/[^a-zA-Z0-9]+/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "").toUpperCase();
  }
  static toCamelCase(e) {
    return e.trim().replace(/[^a-zA-Z0-9]+/g, " ").split(" ").filter(Boolean).map((t, r2) => r2 === 0 ? t.toLowerCase() : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()).join("");
  }
  static toPascalCase(e) {
    return e.trim().replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[^a-zA-Z0-9]+/g, " ").split(" ").filter(Boolean).map((t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()).join("");
  }
  static toKebabCase(e) {
    return e.replace(/[^a-zA-Z0-9]+/g, " ").replace(/([a-z0-9])([A-Z])/g, "$1 $2").trim().replace(/\s+/g, "-").toLowerCase();
  }
}, __name(_a2, "g"), _a2);
var _a3;
var k = (_a3 = class {
  static generateTimeId(e = { timestamp: /* @__PURE__ */ new Date(), random: Math.random().toString(36).slice(2, 8) }) {
    let t = e.timestamp.getTime().toString(36), r2 = e.random;
    return `${t}-${r2}`;
  }
  static parseTimeId(e) {
    let [t, r2] = e.split("-");
    return { timestamp: new Date(parseInt(t, 36)), random: r2 };
  }
  static formatWithLeadingZeros(e, t = 10) {
    return String(e).padStart(t + 1, "0").slice(-t);
  }
  static removeLeadingZeros(e) {
    return String(Number(e));
  }
  static hashString(e) {
    let t = 0, r2, n;
    if (e.length === 0) return t.toString();
    for (r2 = 0; r2 < e.length; r2++) n = e.charCodeAt(r2), t = (t << 5) - t + n, t |= 0;
    return t.toString();
  }
}, __name(_a3, "k"), _a3);
var _a4;
var S = (_a4 = class {
  static isString(e) {
    return typeof e == "string" || e instanceof String;
  }
  static isNumber(e) {
    return typeof e == "number" && isFinite(e);
  }
  static isBoolean(e) {
    return typeof e == "boolean";
  }
  static isObject(e) {
    return e !== null && typeof e == "object" && !Array.isArray(e);
  }
  static isArray(e) {
    return Array.isArray(e);
  }
  static isErrorConstructorType(e) {
    return !!e && _a4.isObject(e) && !(e instanceof Error) && "title" in e;
  }
  static isErrorSerializedType(e) {
    return !!e && _a4.isObject(e) && !(e instanceof Error) && "aseid" in e && _a4.isString(e.aseid);
  }
  static isScopeInstance(e) {
    return !!e && typeof e == "object" && "name" in e && "aseid" in e;
  }
}, __name(_a4, "o"), _a4);
var _a5;
var F = (_a5 = class {
  static isASEID(e) {
    return this.regexp.test(e);
  }
  static compare(e, t) {
    if (!e || !t) return false;
    if (S.isString(e) && this.isASEID(e) === false) throw new Error(`Invalid ASEID format provided: ${e}`);
    if (S.isString(t) && this.isASEID(t) === false) throw new Error(`Invalid ASEID format provided: ${t}`);
    let r2 = e instanceof _a5 ? e : new _a5(e), n = t instanceof _a5 ? t : new _a5(t);
    return r2.toString() === n.toString();
  }
  constructor(e) {
    this.verifyInput(e), this.getInitializer(e).call(this, e);
  }
  get concept() {
    return this._concept || c.concept;
  }
  get scope() {
    return this._scope || c.root.name;
  }
  get entity() {
    return this._entity;
  }
  get id() {
    return this._id;
  }
  get version() {
    return this._version;
  }
  get shard() {
    return this._shard;
  }
  get hash() {
    return k.hashString(this.toString());
  }
  getInitializer(e) {
    switch (true) {
      case S.isString(e):
        return this.fromString;
      case S.isObject(e):
        return this.fromObject;
      default:
        throw new Error("Invalid parameters provided to ASEID constructor");
    }
  }
  fromString(e) {
    let [t, r2, n] = e.split("@"), [i, a, _] = r2.split(":"), l2 = _.includes(".") ? _.split(".")[0] : void 0, A = _.includes(".") ? _.split(".")[1] : _;
    this._concept = t || c.root.name, this._scope = i || c.root.name, this._entity = a, this._id = A, this._version = n, this._shard = l2;
  }
  fromObject(e) {
    this._concept = e.concept ? _a5.isASEID(e.concept) ? new _a5(e.concept).id : e.concept : c.concept, this._scope = e.scope ? S.isNumber(e.scope) ? k.formatWithLeadingZeros(e.scope) : _a5.isASEID(e.scope) ? new _a5(e.scope).id : e.scope : c.root.name, this._entity = e.entity, this._id = S.isNumber(e.id) ? k.formatWithLeadingZeros(e.id) : e.id, this._version = e.version, this._shard = e.shard;
  }
  toString() {
    return `${this.concept}@${this.scope}:${this.entity}:${this.shard ? this.shard + "." + this.id : this.id}${this.version ? "@" + this.version : ""}`;
  }
  toJSON() {
    return { concept: this._concept, scope: this._scope, entity: this._entity, id: this._id, version: this._version, shard: this._shard };
  }
  verifyInput(e) {
    switch (true) {
      case (S.isString(e) && !_a5.isASEID(e)):
        throw new Error("Invalid ASEID format provided");
      case (S.isObject(e) && !e.id):
        throw new Error("ASEID id is required");
      case (S.isObject(e) && !e.entity):
        throw new Error("ASEID entity is required");
    }
  }
}, __name(_a5, "F"), _a5);
F.regexp = new RegExp("^[a-z|A-Z|0-9|-]+@[a-z|A-Z|0-9|-]+:[a-z|A-Z|0-9|-]+:[a-z|A-Z|0-9|\\.|-]+(@v[0-9|\\.]+|@lts)?$");
var C = F;
var H = { UNEXPECTED_ERROR: "A-Error Unexpected Error", VALIDATION_ERROR: "A-Error Validation Error" };
var ge = "If you see this error please let us know.";
var _a6;
var re = (_a6 = class {
  static get A_CONCEPT_NAME() {
    return "a-concept";
  }
  static get A_CONCEPT_ROOT_SCOPE() {
    return "root";
  }
  static get A_CONCEPT_ENVIRONMENT() {
    return "development";
  }
  static get A_CONCEPT_RUNTIME_ENVIRONMENT() {
    return "unknown";
  }
  static get A_CONCEPT_ROOT_FOLDER() {
    return "/app";
  }
  static get A_ERROR_DEFAULT_DESCRIPTION() {
    return "If you see this error please let us know.";
  }
  static get(e) {
    return this[e];
  }
  static set(e, t) {
    this[e] = t;
  }
  static getAll() {
    return {};
  }
  static getAllKeys() {
    return [];
  }
}, __name(_a6, "re"), _a6);
var Z = { A_CONCEPT_NAME: "A_CONCEPT_NAME", A_CONCEPT_ROOT_SCOPE: "A_CONCEPT_ROOT_SCOPE", A_CONCEPT_ENVIRONMENT: "A_CONCEPT_ENVIRONMENT", A_CONCEPT_RUNTIME_ENVIRONMENT: "A_CONCEPT_RUNTIME_ENVIRONMENT", A_CONCEPT_ROOT_FOLDER: "A_CONCEPT_ROOT_FOLDER", A_ERROR_DEFAULT_DESCRIPTION: "A_ERROR_DEFAULT_DESCRIPTION" };
var ne = [Z.A_CONCEPT_NAME, Z.A_CONCEPT_ROOT_SCOPE, Z.A_CONCEPT_ENVIRONMENT, Z.A_CONCEPT_RUNTIME_ENVIRONMENT, Z.A_CONCEPT_ROOT_FOLDER, Z.A_ERROR_DEFAULT_DESCRIPTION];
var _a7;
var O = (_a7 = class extends re {
  static get A_CONCEPT_ENVIRONMENT() {
    return window.__A_CONCEPT_ENVIRONMENT_ENV__?.A_CONCEPT_ENVIRONMENT || super.A_CONCEPT_ENVIRONMENT;
  }
  static get A_CONCEPT_RUNTIME_ENVIRONMENT() {
    return "browser";
  }
  static get A_CONCEPT_NAME() {
    return window.__A_CONCEPT_ENVIRONMENT_ENV__?.A_CONCEPT_NAME || super.A_CONCEPT_NAME;
  }
  static get A_CONCEPT_ROOT_FOLDER() {
    return window.__A_CONCEPT_ENVIRONMENT_ENV__?.A_CONCEPT_ROOT_FOLDER || super.A_CONCEPT_ROOT_FOLDER;
  }
  static get A_CONCEPT_ROOT_SCOPE() {
    return window.__A_CONCEPT_ENVIRONMENT_ENV__?.A_CONCEPT_ROOT_SCOPE || super.A_CONCEPT_ROOT_SCOPE;
  }
  static get A_ERROR_DEFAULT_DESCRIPTION() {
    return window.__A_CONCEPT_ENVIRONMENT_ENV__?.A_ERROR_DEFAULT_DESCRIPTION || super.A_ERROR_DEFAULT_DESCRIPTION;
  }
  static get(e) {
    return window.__A_CONCEPT_ENVIRONMENT_ENV__?.[e] || this[e];
  }
  static set(e, t) {
    window.__A_CONCEPT_ENVIRONMENT_ENV__ || (window.__A_CONCEPT_ENVIRONMENT_ENV__ = {}), window.__A_CONCEPT_ENVIRONMENT_ENV__[e] = t;
  }
  static getAll() {
    let e = {};
    return window.__A_CONCEPT_ENVIRONMENT_ENV__ && Object.keys(window.__A_CONCEPT_ENVIRONMENT_ENV__).forEach((t) => {
      e[t] = window.__A_CONCEPT_ENVIRONMENT_ENV__[t];
    }), ne.forEach((t) => {
      e[t] = this.get(t);
    }), e;
  }
  static getAllKeys() {
    let e = /* @__PURE__ */ new Set();
    return window.__A_CONCEPT_ENVIRONMENT_ENV__ && Object.keys(window.__A_CONCEPT_ENVIRONMENT_ENV__).forEach((t) => {
      e.add(t);
    }), ne.forEach((t) => {
      e.add(t);
    }), Array.from(e);
  }
}, __name(_a7, "O"), _a7);
var _a8;
var y = (_a8 = class extends Error {
  static get entity() {
    return g.toKebabCase(this.name);
  }
  static get concept() {
    return c.concept;
  }
  static get scope() {
    return c.root.name;
  }
  constructor(e, t) {
    switch (true) {
      case e instanceof _a8:
        return e;
      case e instanceof Error:
        super(e.message);
        break;
      case S.isErrorSerializedType(e):
        super(e.message);
        break;
      case (S.isErrorConstructorType(e) && "description" in e):
        super(`[${e.title}]: ${e.description}`);
        break;
      case (S.isErrorConstructorType(e) && !("description" in e)):
        super(e.title);
        break;
      case (S.isString(e) && !t):
        super(e);
        break;
      case (S.isString(e) && !!t):
        super(`[${e}]: ${t}`);
        break;
      default:
        super("An unknown error occurred.");
    }
    this.getInitializer(e, t).call(this, e, t);
  }
  get aseid() {
    return this._aseid;
  }
  get title() {
    return this._title;
  }
  get message() {
    return super.message;
  }
  get code() {
    return this._code || g.toKebabCase(this.title);
  }
  get type() {
    return this.constructor.entity;
  }
  get link() {
    return this._link ? this._link : new URL(`https://adaas.support/a-concept/errors/${this.aseid.toString()}`).toString();
  }
  get scope() {
    return this._aseid.scope;
  }
  get description() {
    return this._description || String(O.A_ERROR_DEFAULT_DESCRIPTION) || ge;
  }
  get originalError() {
    return this._originalError;
  }
  getInitializer(e, t) {
    switch (true) {
      case (S.isString(e) && !t):
        return this.fromMessage;
      case (S.isString(e) && !!t):
        return this.fromTitle;
      case e instanceof Error:
        return this.fromError;
      case S.isErrorSerializedType(e):
        return this.fromJSON;
      case S.isErrorConstructorType(e):
        return this.fromConstructor;
      default:
        throw new _a8(H.VALIDATION_ERROR, "Invalid parameters provided to A_Error constructor");
    }
  }
  fromError(e) {
    this._title = H.UNEXPECTED_ERROR, this._aseid = new C({ concept: this.constructor.concept, scope: this.constructor.scope, entity: this.constructor.entity, id: this.code }), this._originalError = e;
  }
  fromMessage(e) {
    this._title = H.UNEXPECTED_ERROR, this._aseid = new C({ concept: this.constructor.concept, scope: this._scope || this.constructor.scope, entity: this.constructor.entity, id: this.code }), this._link = void 0, this._originalError = void 0;
  }
  fromJSON(e) {
    this._aseid = new C(e.aseid), super.message = e.message, this._title = e.title, this._code = e.code, this._scope = e.scope, this._description = e.description, this._originalError = e.originalError ? new _a8(e.originalError) : void 0, this._link = e.link;
  }
  fromTitle(e, t) {
    this.validateTitle(e), this._title = e, this._description = t, this._aseid = new C({ concept: this.constructor.concept, scope: this._scope || this.constructor.scope, entity: this.constructor.entity, id: this.code }), this._link = void 0, this._originalError = void 0;
  }
  fromConstructor(e) {
    if (this.validateTitle(e.title), this._title = e.title, this._code = e.code, this._scope = e.scope ? S.isScopeInstance(e.scope) ? e.scope.name : e.scope : void 0, this._aseid = new C({ concept: this.constructor.concept, scope: this._scope || this.constructor.scope, entity: this.constructor.entity, id: this.code }), this._description = e.description, this._link = e.link, e.originalError instanceof _a8) {
      let t = e.originalError;
      for (; t.originalError instanceof _a8; ) t = t.originalError;
      this._originalError = t.originalError || t;
    } else this._originalError = e.originalError;
  }
  toJSON() {
    return { aseid: this.aseid.toString(), title: this.title, code: this.code, type: this.type, message: this.message, link: this.link, scope: this.scope, description: this.description, originalError: this.originalError?.message };
  }
  validateTitle(e) {
    if (e.length > 60) throw new _a8(H.VALIDATION_ERROR, "A-Error title exceeds 60 characters limit.");
    if (e.length === 0) throw new _a8(H.VALIDATION_ERROR, "A-Error title cannot be empty.");
  }
}, __name(_a8, "o"), _a8);
var _a9;
var K = (_a9 = class extends y {
}, __name(_a9, "K"), _a9);
K.ValidationError = "A-Entity Validation Error";
var _a10;
var v = (_a10 = class {
  static get entity() {
    return g.toKebabCase(this.name);
  }
  static get concept() {
    return c.concept;
  }
  static get scope() {
    return c.root.name;
  }
  constructor(e) {
    this.getInitializer(e).call(this, e);
  }
  get id() {
    return this.aseid.id;
  }
  isStringASEID(e) {
    return typeof e == "string" && C.isASEID(e);
  }
  isASEIDInstance(e) {
    return e instanceof C;
  }
  isSerializedObject(e) {
    return !!e && typeof e == "object" && "aseid" in e;
  }
  isConstructorProps(e) {
    return !!e && typeof e == "object" && !("aseid" in e);
  }
  getInitializer(e) {
    if (!e) return this.fromUndefined;
    if (this.isStringASEID(e)) return this.fromASEID;
    if (this.isASEIDInstance(e)) return this.fromASEID;
    if (this.isSerializedObject(e)) return this.fromJSON;
    if (this.isConstructorProps(e)) return this.fromNew;
    throw new K(K.ValidationError, "Unable to determine A-Entity constructor initialization method. Please check the provided parameters.");
  }
  generateASEID(e) {
    return new C({ concept: e?.concept || this.constructor.concept, scope: e?.scope || this.constructor.scope, entity: e?.entity || this.constructor.entity, id: e?.id || k.generateTimeId() });
  }
  async call(e, t) {
    return await new I({ name: e, component: this, scope: t }).process(t);
  }
  async load(e) {
    return this.call("load", e);
  }
  async destroy(e) {
    return this.call("destroy", e);
  }
  async save(e) {
    return this.call("save", e);
  }
  fromASEID(e) {
    e instanceof C ? this.aseid = e : this.aseid = new C(e);
  }
  fromUndefined() {
    this.aseid = this.generateASEID();
  }
  fromNew(e) {
    this.aseid = this.generateASEID();
  }
  fromJSON(e) {
    this.aseid = new C(e.aseid);
  }
  toJSON() {
    return { aseid: this.aseid.toString() };
  }
  toString() {
    return this.aseid ? this.aseid.toString() : this.constructor.name;
  }
}, __name(_a10, "v"), _a10);
function oe(o) {
  return function(e) {
    return c.setMeta(e, new o()), e;
  };
}
__name(oe, "oe");
var _a11;
var d = (_a11 = class {
  constructor() {
    this.meta = /* @__PURE__ */ new Map();
  }
  static Define(e) {
    return oe(e);
  }
  [Symbol.iterator]() {
    let e = this.meta.entries();
    return { next: /* @__PURE__ */ __name(() => e.next(), "next") };
  }
  from(e) {
    return this.meta = new Map(e.meta), this;
  }
  set(e, t) {
    let r2 = this.meta.get(e) || Array.isArray(t) ? [] : t instanceof Map ? /* @__PURE__ */ new Map() : {};
    this.meta.get(e) || Array.isArray(t) ? [...r2] : t instanceof Map ? new Map(r2) : { ...r2 };
    this.meta.set(e, t);
  }
  get(e) {
    return this.meta.get(e);
  }
  delete(e) {
    return this.meta.delete(e);
  }
  size() {
    return this.meta.size;
  }
  convertToRegExp(e) {
    return e instanceof RegExp ? e : new RegExp(e);
  }
  find(e) {
    let t = [];
    for (let [r2, n] of this.meta.entries()) this.convertToRegExp(String(r2)).test(e) && t.push([r2, n]);
    return t;
  }
  findByRegex(e) {
    let t = [];
    for (let [r2, n] of this.meta.entries()) e.test(String(r2)) && t.push([r2, n]);
    return t;
  }
  has(e) {
    return this.meta.has(e);
  }
  entries() {
    return this.meta.entries();
  }
  clear() {
    this.meta.clear();
  }
  toArray() {
    return Array.from(this.meta.entries());
  }
  recursiveToJSON(e) {
    switch (true) {
      case e instanceof _a11:
        return e.toJSON();
      case e instanceof Map:
        let t = {};
        for (let [n, i] of e.entries()) t[String(n)] = this.recursiveToJSON(i);
        return t;
      case Array.isArray(e):
        return e.map((n) => this.recursiveToJSON(n));
      case (!!e && typeof e == "object"):
        let r2 = {};
        for (let [n, i] of Object.entries(e)) r2[n] = this.recursiveToJSON(i);
        return r2;
      default:
        return e;
    }
  }
  toJSON() {
    let e = {};
    for (let [t, r2] of this.meta.entries()) e[String(t)] = this.recursiveToJSON(r2);
    return e;
  }
}, __name(_a11, "o"), _a11);
var Ce = ((n) => (n.EXTENSIONS = "a-component-extensions", n.FEATURES = "a-component-features", n.ABSTRACTIONS = "a-component-abstractions", n.INJECTIONS = "a-component-injections", n))(Ce || {});
var Ye = ((r2) => (r2.SAVE = "save", r2.DESTROY = "destroy", r2.LOAD = "load", r2))(Ye || {});
var _a12;
var z = (_a12 = class extends d {
  features() {
    return this.get("a-component-features")?.toArray().map(([, t]) => t) || [];
  }
  injections(e) {
    return this.get("a-component-injections")?.get(e) || [];
  }
}, __name(_a12, "z"), _a12);
var _a13;
var j = (_a13 = class {
  get name() {
    return this.config?.name || this.constructor.name;
  }
  get scope() {
    return c.scope(this);
  }
  constructor(e = {}) {
    this.config = e, c.allocate(this, this.config);
  }
  async call(e, t) {
    return await new I({ name: e, component: this }).process(t);
  }
}, __name(_a13, "j"), _a13);
var Pe = ((n) => (n.FEATURES = "a-container-features", n.INJECTIONS = "a-container-injections", n.ABSTRACTIONS = "a-container-abstractions", n.EXTENSIONS = "a-container-extensions", n))(Pe || {});
var _a14;
var U = (_a14 = class extends d {
  injections(e) {
    return this.get("a-container-injections")?.get(e) || [];
  }
  features() {
    return this.get("a-container-features")?.toArray().map(([, t]) => t) || [];
  }
  abstractions(e) {
    let t = [], r2 = this.get("a-container-abstractions"), n = this.get("a-container-injections");
    return r2?.find(`CONCEPT_ABSTRACTION::${e}`).forEach(([i, a]) => {
      a.forEach((_) => {
        let l2 = n?.get(_.handler) || [];
        t.push({ ..._, args: l2 });
      });
    }), t;
  }
  extensions(e) {
    let t = [];
    return this.get("a-container-extensions")?.find(e).forEach(([n, i]) => {
      i.forEach((a) => {
        t.push({ name: a.name, handler: a.handler, behavior: a.behavior, before: a.before || "", after: a.after || "", throwOnError: a.throwOnError || true, override: "" });
      });
    }), t;
  }
}, __name(_a14, "U"), _a14);
var _a15;
var m = (_a15 = class extends y {
  fromConstructor(e) {
    super.fromConstructor(e), this.stage = e.stage;
  }
}, __name(_a15, "m"), _a15);
m.Interruption = "Feature Interrupted", m.FeatureInitializationError = "Unable to initialize A-Feature", m.FeatureProcessingError = "Error occurred during A-Feature processing", m.FeatureDefinitionError = "Unable to define A-Feature", m.FeatureExtensionError = "Unable to extend A-Feature";
var _a16;
var u = (_a16 = class {
  static resolve() {
    return new Promise((e) => e());
  }
  static isInheritedFrom(e, t) {
    let r2 = e;
    for (; r2; ) {
      if (r2 === t) return true;
      r2 = Object.getPrototypeOf(r2);
    }
    return false;
  }
  static getParentClasses(e) {
    let t = Object.getPrototypeOf(typeof e == "function" ? e : e.constructor), r2 = [];
    for (; t && t !== Function.prototype; ) r2.push(t), t = Object.getPrototypeOf(t);
    return r2;
  }
  static getClassInheritanceChain(e) {
    let t = Object.getPrototypeOf(typeof e == "function" ? e : e.constructor), r2 = typeof e == "function" ? [e] : [e.constructor];
    for (; t && t !== Function.prototype; ) r2.push(t), t = Object.getPrototypeOf(t);
    return r2;
  }
  static getParentClass(e) {
    return Object.getPrototypeOf(e);
  }
  static omitProperties(e, t) {
    let r2 = JSON.parse(JSON.stringify(e));
    function n(i, a) {
      let _ = a[0];
      a.length === 1 ? delete i[_] : i[_] !== void 0 && typeof i[_] == "object" && n(i[_], a.slice(1));
    }
    __name(n, "n");
    return t.forEach((i) => {
      let a = i.split(".");
      n(r2, a);
    }), r2;
  }
  static isObject(e) {
    return e !== null && typeof e == "object" && !Array.isArray(e);
  }
  static deepMerge(e, t, r2 = /* @__PURE__ */ new Map()) {
    if (this.isObject(e) && this.isObject(t)) for (let n in t) this.isObject(t[n]) ? (e[n] || (e[n] = {}), r2.has(t[n]) ? e[n] = r2.get(t[n]) : (r2.set(t[n], {}), this.deepMerge(e[n], t[n], r2))) : e[n] = t[n];
    return e;
  }
  static deepClone(e) {
    if (e == null || typeof e != "object") return e;
    if (e instanceof Date) return new Date(e.getTime());
    if (Array.isArray(e)) return e.map((t) => this.deepClone(t));
    if (typeof e == "function") return e;
    if (e instanceof Object) {
      let t = {};
      for (let r2 in e) e.hasOwnProperty(r2) && (t[r2] = this.deepClone(e[r2]));
      return t;
    }
    throw new Error("Unable to clone the object. Unsupported type.");
  }
  static deepCloneAndMerge(e, t) {
    if (t == null && e == null) return e;
    if (e == null && t) return this.deepClone(t);
    if (typeof e != "object") return e;
    if (e instanceof Date) return new Date(e.getTime());
    if (Array.isArray(e)) return e.map((r2) => this.deepCloneAndMerge(r2, t));
    if (typeof e == "function") return e;
    if (e instanceof Object) {
      let r2 = {};
      for (let n in e) t[n] !== null && t[n] !== void 0 ? r2[n] = this.deepCloneAndMerge(e[n], t[n]) : r2[n] = this.deepClone(e[n]);
      for (let n in t) e[n] !== void 0 && e[n] !== null ? r2[n] = this.deepCloneAndMerge(e[n], t[n]) : r2[n] = this.deepClone(t[n]);
      return r2;
    }
    throw new Error("Unable to clone the object. Unsupported type.");
  }
  static getComponentName(e) {
    let t = "Unknown", r2 = "Anonymous";
    if (e == null) return t;
    if (typeof e == "string") return e || t;
    if (typeof e == "symbol") try {
      return e.toString();
    } catch {
      return t;
    }
    if (Array.isArray(e)) return e.length === 0 ? t : this.getComponentName(e[0]);
    if (typeof e == "function") {
      let n = e;
      if (n.displayName) return String(n.displayName);
      if (n.name) return String(n.name);
      if (n.constructor && n.constructor.name) return String(n.constructor.name);
      try {
        let a = Function.prototype.toString.call(e).match(/^(?:class\s+([A-Za-z0-9_$]+)|function\s+([A-Za-z0-9_$]+)|([A-Za-z0-9_$]+)\s*=>)/);
        if (a) return a[1] || a[2] || a[3] || r2;
      } catch {
      }
      return r2;
    }
    if (typeof e == "object") {
      let n = e;
      if (n.type) return this.getComponentName(n.type);
      if (n.displayName) return String(n.displayName);
      if (n.name) return String(n.name);
      if (n.constructor && n.constructor.name && n.constructor.name !== "Object") return String(n.constructor.name);
      try {
        let i = n.toString();
        if (typeof i == "string" && i !== "[object Object]") return i;
      } catch {
      }
      return r2;
    }
    try {
      return String(e);
    } catch {
      return t;
    }
  }
}, __name(_a16, "u"), _a16);
var _a17;
var q = (_a17 = class extends Error {
}, __name(_a17, "q"), _a17);
q.CallerInitializationError = "Unable to initialize A-Caller";
var _a18;
var V = (_a18 = class {
  constructor(e) {
    this.validateParams(e), this._component = e;
  }
  get component() {
    return this._component;
  }
  validateParams(e) {
    if (!s.isAllowedForFeatureCall(e)) throw new q(`[${q.CallerInitializationError}]: Invalid A-Caller component provided of type: ${typeof e} with value: ${JSON.stringify(e).slice(0, 100)}...`);
  }
}, __name(_a18, "V"), _a18);
var _a19;
var f = (_a19 = class extends y {
}, __name(_a19, "f"), _a19);
f.InvalidDependencyTarget = "Invalid Dependency Target", f.InvalidLoadTarget = "Invalid Load Target", f.InvalidLoadPath = "Invalid Load Path", f.InvalidDefaultTarget = "Invalid Default Target", f.ResolutionParametersError = "Dependency Resolution Parameters Error";
function ie(...o) {
  return function(e, t, r2) {
    let n = u.getComponentName(e);
    if (!s.isTargetAvailableForInjection(e)) throw new f(f.InvalidDefaultTarget, `A-Default cannot be used on the target of type ${typeof e} (${n})`);
    let i = t ? String(t) : "constructor", a;
    switch (true) {
      case (s.isComponentConstructor(e) || s.isComponentInstance(e)):
        a = "a-component-injections";
        break;
      case s.isContainerInstance(e):
        a = "a-container-injections";
        break;
      case s.isEntityInstance(e):
        a = "a-component-injections";
        break;
    }
    let _ = c.meta(e).get(a) || new d(), l2 = _.get(i) || [];
    l2[r2].resolutionStrategy = { create: true, args: o }, _.set(i, l2), c.meta(e).set(a, _);
  };
}
__name(ie, "ie");
function se() {
  return function(o, e, t) {
    let r2 = u.getComponentName(o);
    if (!s.isTargetAvailableForInjection(o)) throw new f(f.InvalidDependencyTarget, `A-Dependency cannot be used on the target of type ${typeof o} (${r2})`);
    let n = e ? String(e) : "constructor", i;
    switch (true) {
      case (s.isComponentConstructor(o) || s.isComponentInstance(o)):
        i = "a-component-injections";
        break;
      case s.isContainerInstance(o):
        i = "a-container-injections";
        break;
      case s.isEntityInstance(o):
        i = "a-component-injections";
        break;
    }
    let a = c.meta(o).get(i) || new d(), _ = a.get(n) || [];
    _[t].resolutionStrategy = { flat: true }, a.set(n, _), c.meta(o).set(i, a);
  };
}
__name(se, "se");
function ae() {
  return function(o, e, t) {
    let r2 = u.getComponentName(o);
    if (!s.isTargetAvailableForInjection(o)) throw new f(f.InvalidLoadTarget, `A-Load cannot be used on the target of type ${typeof o} (${r2})`);
    let n = e ? String(e) : "constructor", i;
    switch (true) {
      case (s.isComponentConstructor(o) || s.isComponentInstance(o)):
        i = "a-component-injections";
        break;
      case s.isContainerInstance(o):
        i = "a-container-injections";
        break;
      case s.isEntityInstance(o):
        i = "a-component-injections";
        break;
    }
    let a = c.meta(o).get(i) || new d(), _ = a.get(n) || [];
    _[t].resolutionStrategy = { load: true }, a.set(n, _), c.meta(o).set(i, a);
  };
}
__name(ae, "ae");
function _e(o = -1) {
  return function(e, t, r2) {
    let n = u.getComponentName(e);
    if (!s.isTargetAvailableForInjection(e)) throw new f(f.InvalidDependencyTarget, `A-Dependency cannot be used on the target of type ${typeof e} (${n})`);
    let i = t ? String(t) : "constructor", a;
    switch (true) {
      case (s.isComponentConstructor(e) || s.isComponentInstance(e)):
        a = "a-component-injections";
        break;
      case s.isContainerInstance(e):
        a = "a-container-injections";
        break;
      case s.isEntityInstance(e):
        a = "a-component-injections";
        break;
    }
    let _ = c.meta(e).get(a) || new d(), l2 = _.get(i) || [];
    l2[r2].resolutionStrategy = { parent: o }, _.set(i, l2), c.meta(e).set(a, _);
  };
}
__name(_e, "_e");
function ce() {
  return function(o, e, t) {
    let r2 = u.getComponentName(o);
    if (!s.isTargetAvailableForInjection(o)) throw new f(f.InvalidDependencyTarget, `A-Dependency cannot be used on the target of type ${typeof o} (${r2})`);
    let n = e ? String(e) : "constructor", i;
    switch (true) {
      case (s.isComponentConstructor(o) || s.isComponentInstance(o)):
        i = "a-component-injections";
        break;
      case s.isContainerInstance(o):
        i = "a-container-injections";
        break;
      case s.isEntityInstance(o):
        i = "a-component-injections";
        break;
    }
    let a = c.meta(o).get(i) || new d(), _ = a.get(n) || [];
    _[t].resolutionStrategy = { require: true }, a.set(n, _), c.meta(o).set(i, a);
  };
}
__name(ce, "ce");
function pe() {
  return function(o, e, t) {
    let r2 = u.getComponentName(o);
    if (!s.isTargetAvailableForInjection(o)) throw new f(f.InvalidDependencyTarget, `A-All cannot be used on the target of type ${typeof o} (${r2})`);
    let n = e ? String(e) : "constructor", i;
    switch (true) {
      case (s.isComponentConstructor(o) || s.isComponentInstance(o)):
        i = "a-component-injections";
        break;
      case s.isContainerInstance(o):
        i = "a-container-injections";
        break;
      case s.isEntityInstance(o):
        i = "a-component-injections";
        break;
    }
    let a = c.meta(o).get(i) || new d(), _ = a.get(n) || [];
    _[t].resolutionStrategy = { pagination: { ..._[t].resolutionStrategy.pagination, count: -1 } }, a.set(n, _), c.meta(o).set(i, a);
  };
}
__name(pe, "pe");
function ue(o, e) {
  return function(t, r2, n) {
    let i = u.getComponentName(t);
    if (!s.isTargetAvailableForInjection(t)) throw new f(f.InvalidDependencyTarget, `A-All cannot be used on the target of type ${typeof t} (${i})`);
    let a = r2 ? String(r2) : "constructor", _;
    switch (true) {
      case (s.isComponentConstructor(t) || s.isComponentInstance(t)):
        _ = "a-component-injections";
        break;
      case s.isContainerInstance(t):
        _ = "a-container-injections";
        break;
      case s.isEntityInstance(t):
        _ = "a-component-injections";
        break;
    }
    let l2 = c.meta(t).get(_) || new d(), A = l2.get(a) || [];
    A[n].resolutionStrategy = { query: { ...A[n].resolutionStrategy.query, ...o }, pagination: { ...A[n].resolutionStrategy.pagination, ...e } }, l2.set(a, A), c.meta(t).set(_, l2);
  };
}
__name(ue, "ue");
var _a20;
var Y = (_a20 = class {
  constructor(e, t) {
    this._defaultPagination = { count: 1, from: "start" };
    this._defaultResolutionStrategy = { require: false, load: false, parent: 0, flat: false, create: false, args: [], query: {}, pagination: this._defaultPagination };
    this._name = typeof e == "string" ? e : u.getComponentName(e), this._target = typeof e == "string" ? void 0 : e, this.resolutionStrategy = t || {}, this.initCheck();
  }
  static get Required() {
    return ce;
  }
  static get Loaded() {
    return ae;
  }
  static get Default() {
    return ie;
  }
  static get Parent() {
    return _e;
  }
  static get Flat() {
    return se;
  }
  static get All() {
    return pe;
  }
  static get Query() {
    return ue;
  }
  get flat() {
    return this._resolutionStrategy.flat;
  }
  get require() {
    return this._resolutionStrategy.require;
  }
  get load() {
    return this._resolutionStrategy.load;
  }
  get all() {
    return this._resolutionStrategy.pagination.count !== 1 || Object.keys(this._resolutionStrategy.query).length > 0;
  }
  get parent() {
    return this._resolutionStrategy.parent;
  }
  get create() {
    return this._resolutionStrategy.create;
  }
  get args() {
    return this._resolutionStrategy.args;
  }
  get query() {
    return this._resolutionStrategy.query;
  }
  get pagination() {
    return this._resolutionStrategy.pagination;
  }
  get name() {
    return this._name;
  }
  get target() {
    return this._target;
  }
  get resolutionStrategy() {
    return this._resolutionStrategy;
  }
  set resolutionStrategy(e) {
    this._resolutionStrategy = { ...this._defaultResolutionStrategy, ...this._resolutionStrategy, ...e, pagination: { ...this._defaultPagination, ...(this._resolutionStrategy || {}).pagination, ...e.pagination || {} } };
  }
  initCheck() {
    if (!this._resolutionStrategy) throw new f(f.ResolutionParametersError, `Resolution strategy parameters are not provided for dependency: ${this._name}`);
    return this;
  }
  toJSON() {
    return { name: this._name, all: this.all, require: this.require, load: this.load, parent: this.parent, flat: this.flat, create: this.create, args: this.args, query: this.query, pagination: this.pagination };
  }
}, __name(_a20, "Y"), _a20);
var _a21;
var s = (_a21 = class {
  static isString(e) {
    return typeof e == "string" || e instanceof String;
  }
  static isNumber(e) {
    return typeof e == "number" && isFinite(e);
  }
  static isBoolean(e) {
    return typeof e == "boolean";
  }
  static isArray(e) {
    return Array.isArray(e);
  }
  static isObject(e) {
    return e && typeof e == "object" && !Array.isArray(e);
  }
  static isFunction(e) {
    return typeof e == "function";
  }
  static isUndefined(e) {
    return typeof e > "u";
  }
  static isRegExp(e) {
    return e instanceof RegExp;
  }
  static isContainerConstructor(e) {
    return typeof e == "function" && u.isInheritedFrom(e, j);
  }
  static isComponentConstructor(e) {
    return typeof e == "function" && u.isInheritedFrom(e, w);
  }
  static isFragmentConstructor(e) {
    return typeof e == "function" && u.isInheritedFrom(e, R);
  }
  static isEntityConstructor(e) {
    return typeof e == "function" && u.isInheritedFrom(e, v);
  }
  static isScopeConstructor(e) {
    return typeof e == "function" && u.isInheritedFrom(e, x);
  }
  static isErrorConstructor(e) {
    return typeof e == "function" && u.isInheritedFrom(e, Error);
  }
  static isFeatureConstructor(e) {
    return typeof e == "function" && u.isInheritedFrom(e, I);
  }
  static isCallerConstructor(e) {
    return typeof e == "function" && u.isInheritedFrom(e, V);
  }
  static isDependencyConstructor(e) {
    return typeof e == "function" && u.isInheritedFrom(e, Y);
  }
  static isDependencyInstance(e) {
    return e instanceof Y;
  }
  static isContainerInstance(e) {
    return e instanceof j;
  }
  static isComponentInstance(e) {
    return e instanceof w;
  }
  static isFeatureInstance(e) {
    return e instanceof I;
  }
  static isFragmentInstance(e) {
    return e instanceof R;
  }
  static isEntityInstance(e) {
    return e instanceof v;
  }
  static isScopeInstance(e) {
    return e instanceof x;
  }
  static isErrorInstance(e) {
    return e instanceof Error;
  }
  static isComponentMetaInstance(e) {
    return e instanceof N;
  }
  static isContainerMetaInstance(e) {
    return e instanceof U;
  }
  static isEntityMetaInstance(e) {
    return e instanceof z;
  }
  static hasASEID(e) {
    return e && typeof e == "object" && "aseid" in e && (_a21.isEntityInstance(e) || _a21.isErrorInstance(e));
  }
  static isConstructorAllowedForScopeAllocation(e) {
    return _a21.isContainerConstructor(e) || _a21.isFeatureConstructor(e);
  }
  static isInstanceAllowedForScopeAllocation(e) {
    return _a21.isContainerInstance(e) || _a21.isFeatureInstance(e);
  }
  static isConstructorAvailableForAbstraction(e) {
    return _a21.isContainerInstance(e) || _a21.isComponentInstance(e);
  }
  static isTargetAvailableForInjection(e) {
    return _a21.isComponentConstructor(e) || _a21.isComponentInstance(e) || _a21.isContainerInstance(e) || _a21.isEntityInstance(e);
  }
  static isAllowedForFeatureCall(e) {
    return _a21.isContainerInstance(e) || _a21.isComponentInstance(e) || _a21.isEntityInstance(e);
  }
  static isAllowedForFeatureDefinition(e) {
    return _a21.isContainerInstance(e) || _a21.isComponentInstance(e) || _a21.isEntityInstance(e);
  }
  static isAllowedForFeatureExtension(e) {
    return _a21.isComponentInstance(e) || _a21.isContainerInstance(e) || _a21.isEntityInstance(e);
  }
  static isAllowedForAbstractionDefinition(e) {
    return _a21.isContainerInstance(e) || _a21.isComponentInstance(e);
  }
  static isAllowedForDependencyDefaultCreation(e) {
    return _a21.isFragmentConstructor(e) || u.isInheritedFrom(e, R) || _a21.isEntityConstructor(e) || u.isInheritedFrom(e, v);
  }
  static isErrorConstructorType(e) {
    return !!e && _a21.isObject(e) && !(e instanceof Error) && "title" in e;
  }
  static isErrorSerializedType(e) {
    return !!e && _a21.isObject(e) && !(e instanceof Error) && "aseid" in e && C.isASEID(e.aseid);
  }
  static isPromiseInstance(e) {
    return e instanceof Promise;
  }
}, __name(_a21, "o"), _a21);
function le(o = {}) {
  return function(e, t, r2) {
    let n = u.getComponentName(e);
    if (!s.isAllowedForFeatureDefinition(e)) throw new m(m.FeatureDefinitionError, `A-Feature cannot be defined on the ${n} level`);
    let i = c.meta(e.constructor), a;
    switch (true) {
      case s.isEntityInstance(e):
        a = "a-component-features";
        break;
      case s.isContainerInstance(e):
        a = "a-container-features";
        break;
      case s.isComponentInstance(e):
        a = "a-component-features";
        break;
    }
    let _ = i.get(a) || new d(), l2 = o.name || t, A = o.invoke || false;
    _.set(t, { name: `${e.constructor.name}.${l2}`, handler: t, invoke: A, template: o.template && o.template.length ? o.template.map((h2) => ({ ...h2, before: h2.before || "", after: h2.after || "", behavior: h2.behavior || "sync", throwOnError: true, override: h2.override || "" })) : [] }), c.meta(e.constructor).set(a, _);
    let T2 = r2.value;
    return r2.value = function(...h2) {
      if (A) T2.apply(this, h2);
      else return T2.apply(this, h2);
      if (typeof this.call == "function" && A) return this.call(l2);
    }, r2;
  };
}
__name(le, "le");
function Ae(o) {
  return function(e, t, r2) {
    let n = u.getComponentName(e);
    if (!s.isAllowedForFeatureExtension(e)) throw new m(m.FeatureExtensionError, `A-Feature-Extend cannot be applied on the ${n} level`);
    let i, a = "sync", _ = "", l2 = "", A = "", T2 = [], h2 = [], b = true, D2;
    switch (true) {
      case s.isEntityInstance(e):
        D2 = "a-component-extensions";
        break;
      case s.isContainerInstance(e):
        D2 = "a-container-extensions";
        break;
      case s.isComponentInstance(e):
        D2 = "a-component-extensions";
        break;
    }
    switch (true) {
      case s.isRegExp(o):
        i = o;
        break;
      case (!!o && typeof o == "object"):
        Array.isArray(o.scope) ? T2 = o.scope : o.scope && typeof o.scope == "object" && (Array.isArray(o.scope.include) && (T2 = o.scope.include), Array.isArray(o.scope.exclude) && (h2 = o.scope.exclude)), i = we(o, T2, h2, t), a = o.behavior || a, b = o.throwOnError !== void 0 ? o.throwOnError : b, _ = s.isArray(o.before) ? new RegExp(`^${o.before.join("|").replace(/\./g, "\\.")}$`).source : o.before instanceof RegExp ? o.before.source : "", l2 = s.isArray(o.after) ? new RegExp(`^${o.after.join("|").replace(/\./g, "\\.")}$`).source : o.after instanceof RegExp ? o.after.source : "", A = s.isArray(o.override) ? new RegExp(`^${o.override.join("|").replace(/\./g, "\\.")}$`).source : o.override instanceof RegExp ? o.override.source : "";
        break;
      default:
        i = new RegExp(`^.*${t.replace(/\./g, "\\.")}$`);
        break;
    }
    let J = c.meta(e).get(D2), Te = c.meta(e), G = Te.get(D2) ? new d().from(Te.get(D2)) : new d();
    if (J && J.size() && J.has(t) && J.get(t).invoke) throw new m(m.FeatureExtensionError, `A-Feature-Extend cannot be used on the method "${t}" because it is already defined as a Feature with "invoke" set to true. Please remove the A-Feature-Extend decorator or set "invoke" to false in the A-Feature decorator.`);
    let ee = [...G.get(i.source) || []];
    for (let [Q, te] of G.entries()) {
      let he = te.findIndex((Ie) => Ie.handler === t);
      Q !== i.source && he !== -1 && (te.splice(he, 1), te.length === 0 ? G.delete(Q) : G.set(Q, te));
    }
    let Se = ee.findIndex((Q) => Q.handler === t), ye = { name: i.source, handler: t, behavior: a, before: _, after: l2, throwOnError: b, override: A };
    Se !== -1 ? ee[Se] = ye : ee.push(ye), G.set(i.source, ee), c.meta(e).set(D2, G);
  };
}
__name(Ae, "Ae");
function we(o, e, t, r2) {
  let n = e.length ? `(${e.map((_) => _.name).join("|")})` : ".*", i = t.length ? `(?!${t.map((_) => _.name).join("|")})` : "", a = o.scope ? `^${i}${n}\\.${o.name || r2}$` : `.*\\.${o.name || r2}$`;
  return new RegExp(a);
}
__name(we, "we");
var xe = ((a) => (a.PROCESSING = "PROCESSING", a.COMPLETED = "COMPLETED", a.FAILED = "FAILED", a.SKIPPED = "SKIPPED", a.INITIALIZED = "INITIALIZED", a.ABORTED = "ABORTED", a))(xe || {});
var _a22;
var $ = (_a22 = class extends y {
  static get CompileError() {
    return "Unable to compile A-Stage";
  }
}, __name(_a22, "$"), _a22);
$.ArgumentsResolutionError = "A-Stage Arguments Resolution Error";
var _a23;
var X = (_a23 = class {
  constructor(e, t) {
    this._status = "INITIALIZED";
    this._feature = e, this._definition = t;
  }
  get name() {
    return this.toString();
  }
  get definition() {
    return this._definition;
  }
  get status() {
    return this._status;
  }
  get feature() {
    return this._feature;
  }
  get isProcessed() {
    return this._status === "COMPLETED" || this._status === "FAILED" || this._status === "SKIPPED";
  }
  get error() {
    return this._error;
  }
  getStepArgs(e, t) {
    let r2 = t.dependency.target || e.resolveConstructor(t.dependency.name);
    return c.meta(r2).injections(t.handler).map((n) => {
      switch (true) {
        case s.isCallerConstructor(n.target):
          return this._feature.caller.component;
        case s.isFeatureConstructor(n.target):
          return this._feature;
        default:
          return e.resolve(n);
      }
    });
  }
  getStepComponent(e, t) {
    let { dependency: r2, handler: n } = t, i = e.resolve(r2) || this.feature.scope.resolve(r2);
    if (!i) throw new $($.CompileError, `Unable to resolve component ${r2.name} from scope ${e.name}`);
    if (!i[n]) throw new $($.CompileError, `Handler ${n} not found in ${i.constructor.name}`);
    return i;
  }
  callStepHandler(e, t) {
    let r2 = this.getStepComponent(t, e), n = this.getStepArgs(t, e);
    return { handler: r2[e.handler].bind(r2), params: n };
  }
  skip() {
    this._status = "SKIPPED";
  }
  process(e) {
    let t = s.isScopeInstance(e) ? e : this._feature.scope;
    if (!this.isProcessed) {
      this._status = "PROCESSING";
      let { handler: r2, params: n } = this.callStepHandler(this._definition, t), i = r2(...n);
      if (s.isPromiseInstance(i)) return new Promise(async (a, _) => {
        try {
          return await i, this.completed(), a();
        } catch (l2) {
          let A = new y(l2);
          return this.failed(A), this._definition.throwOnError ? a() : _(A);
        }
      });
      this.completed();
    }
  }
  completed() {
    this._status = "COMPLETED";
  }
  failed(e) {
    this._error = new y(e), this._status = "FAILED";
  }
  toJSON() {
    return { name: this.name, status: this.status };
  }
  toString() {
    return `A-Stage(${this._feature.name}::${this._definition.behavior}@${this._definition.handler})`;
  }
}, __name(_a23, "X"), _a23);
var _a24;
var B = (_a24 = class extends y {
}, __name(_a24, "B"), _a24);
B.CircularDependencyError = "A-StepManager Circular Dependency Error";
var _a25;
var W = (_a25 = class {
  constructor(e) {
    this._isBuilt = false;
    this.entities = this.prepareSteps(e), this.graph = /* @__PURE__ */ new Map(), this.visited = /* @__PURE__ */ new Set(), this.tempMark = /* @__PURE__ */ new Set(), this.sortedEntities = [];
  }
  prepareSteps(e) {
    return e.map((t) => ({ ...t, behavior: t.behavior || "sync", before: t.before || "", after: t.after || "", override: t.override || "", throwOnError: false }));
  }
  ID(e) {
    return `${e.dependency.name}.${e.handler}`;
  }
  buildGraph() {
    this._isBuilt || (this._isBuilt = true, this.entities = this.entities.filter((e, t, r2) => !r2.some((n) => n.override ? new RegExp(n.override).test(this.ID(e)) : false)), this.entities.forEach((e) => this.graph.set(this.ID(e), /* @__PURE__ */ new Set())), this.entities.forEach((e) => {
      let t = this.ID(e);
      e.before && this.matchEntities(t, e.before).forEach((n) => {
        this.graph.has(n) || this.graph.set(n, /* @__PURE__ */ new Set()), this.graph.get(n).add(t);
      }), e.after && this.matchEntities(t, e.after).forEach((n) => {
        this.graph.has(t) || this.graph.set(t, /* @__PURE__ */ new Set()), this.graph.get(t).add(n);
      });
    }));
  }
  matchEntities(e, t) {
    let r2 = new RegExp(t);
    return this.entities.filter((n) => r2.test(this.ID(n)) && this.ID(n) !== e).map((n) => this.ID(n));
  }
  visit(e) {
    this.tempMark.has(e) || this.visited.has(e) || (this.tempMark.add(e), (this.graph.get(e) || []).forEach((t) => this.visit(t)), this.tempMark.delete(e), this.visited.add(e), this.sortedEntities.push(e));
  }
  toSortedArray() {
    return this.buildGraph(), this.entities.forEach((e) => {
      this.visited.has(this.ID(e)) || this.visit(this.ID(e));
    }), this.sortedEntities;
  }
  toStages(e) {
    return this.toSortedArray().map((r2) => {
      let n = this.entities.find((i) => this.ID(i) === r2);
      return new X(e, n);
    });
  }
}, __name(_a25, "W"), _a25);
var _a26;
var I = (_a26 = class {
  constructor(e) {
    this._stages = [];
    this._index = 0;
    this._state = "INITIALIZED";
    this.validateParams(e), this.getInitializer(e).call(this, e);
  }
  static get Define() {
    return le;
  }
  static get Extend() {
    return Ae;
  }
  get name() {
    return this._name;
  }
  get error() {
    return this._error;
  }
  get state() {
    return this._state;
  }
  get index() {
    return this._index;
  }
  get stage() {
    return this._current;
  }
  get caller() {
    return this._caller;
  }
  get scope() {
    return c.scope(this);
  }
  get size() {
    return this._stages.length;
  }
  get isDone() {
    return !this.stage || this._index >= this._stages.length;
  }
  get isProcessed() {
    return this.state === "COMPLETED" || this.state === "FAILED" || this.state === "INTERRUPTED";
  }
  [Symbol.iterator]() {
    return { next: /* @__PURE__ */ __name(() => this.isDone ? (this._current = void 0, { value: void 0, done: true }) : (this._current = this._stages[this._index], this._index++, { value: this._current, done: false }), "next") };
  }
  validateParams(e) {
    if (!e || typeof e != "object") throw new m(m.FeatureInitializationError, `Invalid A-Feature initialization parameters of type: ${typeof e} with value: ${JSON.stringify(e).slice(0, 100)}...`);
  }
  getInitializer(e) {
    switch (true) {
      case !("template" in e):
        return this.fromComponent;
      case "template" in e:
        return this.fromTemplate;
      default:
        throw new m(m.FeatureInitializationError, `Invalid A-Feature initialization parameters of type: ${typeof e} with value: ${JSON.stringify(e).slice(0, 100)}...`);
    }
  }
  fromTemplate(e) {
    if (!e.template || !Array.isArray(e.template)) throw new m(m.FeatureInitializationError, `Invalid A-Feature template provided of type: ${typeof e.template} with value: ${JSON.stringify(e.template).slice(0, 100)}...`);
    if (!e.component && (!e.scope || !(e.scope instanceof x))) throw new m(m.FeatureInitializationError, `Invalid A-Feature scope provided of type: ${typeof e.scope} with value: ${JSON.stringify(e.scope).slice(0, 100)}...`);
    this._name = e.name;
    let t, r2 = e.scope;
    try {
      e.component && (t = c.scope(e.component));
    } catch (i) {
      if (!r2) throw i;
    }
    t && r2 && !r2.isInheritedFrom(t) && r2.inherit(t), this._caller = new V(e.component || new w()), c.allocate(this).inherit(t || r2), this._SM = new W(e.template), this._stages = this._SM.toStages(this), this._current = this._stages[0];
  }
  fromComponent(e) {
    if (!e.component || !s.isAllowedForFeatureDefinition(e.component)) throw new m(m.FeatureInitializationError, `Invalid A-Feature component provided of type: ${typeof e.component} with value: ${JSON.stringify(e.component).slice(0, 100)}...`);
    this._name = e.name;
    let t, r2 = e.scope;
    try {
      t = c.scope(e.component);
    } catch (a) {
      if (!r2) throw a;
    }
    t && r2 && !r2.isInheritedFrom(t) && r2.inherit(t), this._caller = new V(e.component);
    let n = c.allocate(this);
    n.inherit(t || r2);
    let i = c.featureTemplate(this._name, this._caller.component, n);
    this._SM = new W(i), this._stages = this._SM.toStages(this), this._current = this._stages[0];
  }
  process(e) {
    try {
      if (this.isProcessed) return;
      this._state = "PROCESSING";
      let t = Array.from(this);
      return this.processStagesSequentially(t, e, 0);
    } catch (t) {
      throw this.failed(new m({ title: m.FeatureProcessingError, description: `An error occurred while processing the A-Feature: ${this.name}. Failed at stage: ${this.stage?.name || "N/A"}.`, stage: this.stage, originalError: t }));
    }
  }
  processStagesSequentially(e, t, r2) {
    try {
      if (this.state === "INTERRUPTED") return;
      if (r2 >= e.length) {
        this.completed();
        return;
      }
      let n = e[r2], i = n.process(t);
      return s.isPromiseInstance(i) ? i.then(() => {
        if (this.state !== "INTERRUPTED") return this.processStagesSequentially(e, t, r2 + 1);
      }).catch((a) => {
        throw this.failed(new m({ title: m.FeatureProcessingError, description: `An error occurred while processing the A-Feature: ${this.name}. Failed at stage: ${n.name}.`, stage: n, originalError: a }));
      }) : this.processStagesSequentially(e, t, r2 + 1);
    } catch (n) {
      throw this.failed(new m({ title: m.FeatureProcessingError, description: `An error occurred while processing the A-Feature: ${this.name}. Failed at stage: ${this.stage?.name || "N/A"}.`, stage: this.stage, originalError: n }));
    }
  }
  next(e) {
    let t = this._stages.indexOf(e);
    this._index = t + 1, this._index >= this._stages.length && this.completed();
  }
  completed() {
    this.isProcessed || this.state !== "INTERRUPTED" && (this._state = "COMPLETED", this.scope.destroy());
  }
  failed(e) {
    return this.isProcessed ? this._error : (this._state = "FAILED", this._error = e, this.scope.destroy(), this._error);
  }
  interrupt(e) {
    if (this.isProcessed) return this._error;
    switch (this._state = "INTERRUPTED", true) {
      case s.isString(e):
        this._error = new m(m.Interruption, e);
        break;
      case s.isErrorInstance(e):
        this._error = new m({ code: m.Interruption, title: e.title || "Feature Interrupted", description: e.description || e.message, stage: this.stage, originalError: e });
        break;
      default:
        this._error = new m(m.Interruption, "Feature was interrupted");
        break;
    }
    return this.scope.destroy(), this._error;
  }
  chain(e, t, r2) {
    let n, i;
    e instanceof _a26 ? (n = e, i = t instanceof x ? t : void 0) : (n = new _a26({ name: t, component: e }), i = r2 instanceof x ? r2 : void 0);
    let a = i || this.scope;
    n._caller = this._caller;
    let _ = n.process(a);
    return s.isPromiseInstance(_) ? _.catch((l2) => {
      throw l2;
    }) : _;
  }
  toString() {
    return `A-Feature(${this.caller.component?.constructor?.name || "Unknown"}::${this.name})`;
  }
}, __name(_a26, "o"), _a26);
var _a27;
var w = (_a27 = class {
  call(e, t) {
    return new I({ name: e, component: this }).process(t);
  }
}, __name(_a27, "w"), _a27);
var de = ((n) => (n.EXTENSIONS = "a-component-extensions", n.FEATURES = "a-component-features", n.INJECTIONS = "a-component-injections", n.ABSTRACTIONS = "a-component-abstractions", n))(de || {});
var _a28;
var N = (_a28 = class extends d {
  injections(e) {
    return this.get("a-component-injections")?.get(e) || [];
  }
  extensions(e) {
    let t = [];
    return this.get("a-component-extensions")?.find(e).forEach(([n, i]) => {
      i.forEach((a) => {
        t.push({ name: a.name, handler: a.handler, behavior: a.behavior, before: a.before || "", after: a.after || "", throwOnError: a.throwOnError || true, override: "" });
      });
    }), t;
  }
  features() {
    return this.get("a-component-features")?.toArray().map(([, t]) => t) || [];
  }
  abstractions(e) {
    let t = [], r2 = this.get("a-component-abstractions"), n = this.get("a-component-injections");
    return r2?.find(`CONCEPT_ABSTRACTION::${e}`).forEach(([i, a]) => {
      a.forEach((_) => {
        let l2 = n?.get(_.handler) || [];
        t.push({ ..._, args: l2 });
      });
    }), t;
  }
}, __name(_a28, "N"), _a28);
var _a29;
var x = (_a29 = class {
  constructor(e, t) {
    this._meta = new d();
    this._allowedComponents = /* @__PURE__ */ new Set();
    this._allowedErrors = /* @__PURE__ */ new Set();
    this._allowedEntities = /* @__PURE__ */ new Set();
    this._allowedFragments = /* @__PURE__ */ new Set();
    this._components = /* @__PURE__ */ new Map();
    this._errors = /* @__PURE__ */ new Map();
    this._entities = /* @__PURE__ */ new Map();
    this._fragments = /* @__PURE__ */ new Map();
    this._imports = /* @__PURE__ */ new Set();
    this.getInitializer(e).call(this, e, t);
  }
  get name() {
    return this._name;
  }
  get meta() {
    return this._meta;
  }
  get allowedComponents() {
    return this._allowedComponents;
  }
  get allowedEntities() {
    return this._allowedEntities;
  }
  get allowedFragments() {
    return this._allowedFragments;
  }
  get allowedErrors() {
    return this._allowedErrors;
  }
  get entities() {
    return Array.from(this._entities.values());
  }
  get fragments() {
    return Array.from(this._fragments.values());
  }
  get components() {
    return Array.from(this._components.values());
  }
  get errors() {
    return Array.from(this._errors.values());
  }
  get imports() {
    return Array.from(this._imports.values());
  }
  get parent() {
    return this._parent;
  }
  *parents() {
    let e = this._parent;
    for (; e; ) yield e, e = e._parent;
  }
  parentOffset(e) {
    let t = this;
    for (; e <= -1 && t; ) t = t.parent, e++;
    return t;
  }
  getInitializer(e, t) {
    switch (true) {
      case (!e && !t):
        return this.defaultInitialized;
      case !!e:
        return this.defaultInitialized;
      default:
        throw new E(E.ConstructorError, "Invalid parameters provided to A_Scope constructor");
    }
  }
  defaultInitialized(e = {}, t = {}) {
    this._name = e.name || this.constructor.name, this.initComponents(e.components), this.initErrors(e.errors), this.initFragments(e.fragments), this.initEntities(e.entities), this.initMeta(e.meta), t.parent && (this._parent = t.parent);
  }
  initComponents(e) {
    e?.forEach(this.register.bind(this));
  }
  initErrors(e) {
    e?.forEach(this.register.bind(this));
  }
  initEntities(e) {
    e?.forEach((t) => this.register(t));
  }
  initFragments(e) {
    e?.forEach(this.register.bind(this));
  }
  initMeta(e) {
    e && Object.entries(e).forEach(([t, r2]) => {
      this._meta.set(t, r2);
    });
  }
  destroy() {
    this._components.forEach((e) => c.deregister(e)), this._fragments.forEach((e) => c.deregister(e)), this._entities.forEach((e) => c.deregister(e)), this._components.clear(), this._errors.clear(), this._fragments.clear(), this._entities.clear(), this._imports.clear(), this.issuer() && c.deallocate(this);
  }
  get(e) {
    return this._meta.get(e);
  }
  set(e, t) {
    this._meta.set(e, t);
  }
  issuer() {
    return c.issuer(this);
  }
  inherit(e) {
    if (!e) throw new E(E.InitializationError, "Invalid parent scope provided");
    if (e === this) throw new E(E.CircularInheritanceError, `Unable to inherit scope ${this.name} from itself`);
    if (e === this._parent) return this;
    let t = this.checkCircularInheritance(e);
    if (t) throw new E(E.CircularInheritanceError, `Circular inheritance detected: ${[...t, e.name].join(" -> ")}`);
    return this._parent = e, this;
  }
  import(...e) {
    return e.forEach((t) => {
      if (t === this) throw new E(E.CircularImportError, `Unable to import scope ${this.name} into itself`);
      this._imports.has(t) || this._imports.add(t);
    }), this;
  }
  deimport(...e) {
    return e.forEach((t) => {
      this._imports.has(t) && this._imports.delete(t);
    }), this;
  }
  has(e) {
    let t = this.hasFlat(e);
    if (!t && this._parent) try {
      return this._parent.has(e);
    } catch {
      return false;
    }
    return t;
  }
  hasFlat(e) {
    let t = false;
    switch (true) {
      case s.isScopeConstructor(e):
        return true;
      case s.isString(e): {
        Array.from(this.allowedComponents).find((_) => _.name === e) && (t = true), Array.from(this.allowedFragments).find((_) => _.name === e) && (t = true), Array.from(this.allowedEntities).find((_) => _.name === e) && (t = true), Array.from(this.allowedErrors).find((_) => _.name === e) && (t = true);
        break;
      }
      case s.isComponentConstructor(e): {
        t = this.isAllowedComponent(e) || !![...this.allowedComponents].find((r2) => u.isInheritedFrom(r2, e));
        break;
      }
      case s.isEntityConstructor(e): {
        t = this.isAllowedEntity(e) || !![...this.allowedEntities].find((r2) => u.isInheritedFrom(r2, e));
        break;
      }
      case s.isFragmentConstructor(e): {
        t = this.isAllowedFragment(e) || !![...this.allowedFragments].find((r2) => u.isInheritedFrom(r2, e));
        break;
      }
      case s.isErrorConstructor(e): {
        t = this.isAllowedError(e) || !![...this.allowedErrors].find((r2) => u.isInheritedFrom(r2, e));
        break;
      }
      case (this.issuer() && (this.issuer().constructor === e || u.isInheritedFrom(this.issuer().constructor, e))): {
        t = true;
        break;
      }
    }
    return t;
  }
  resolveDependency(e) {
    let t = [], r2 = this.parentOffset(e.parent) || this;
    switch (true) {
      case (e.flat && !e.all): {
        let A = r2.resolveFlatOnce(e.target || e.name);
        A && (t = [A]);
        break;
      }
      case (e.flat && e.all): {
        t = r2.resolveFlatAll(e.target || e.name);
        break;
      }
      case (!e.flat && !e.all): {
        let A = r2.resolveOnce(e.target || e.name);
        A && (t = [A]);
        break;
      }
      case (!e.flat && e.all): {
        t = r2.resolveAll(e.target || e.name);
        break;
      }
      default:
        t = [];
    }
    if (e.create && !t.length && s.isAllowedForDependencyDefaultCreation(e.target)) {
      let A = new e.target(...e.args);
      r2.register(A), t.push(A);
    }
    if (e.require && !t.length) throw new E(E.ResolutionError, `Dependency ${e.name} is required but could not be resolved in scope ${r2.name}`);
    e.query.aseid ? t = t.filter((A) => s.hasASEID(A) && C.compare(A.aseid, e.query.aseid)) : Object.keys(e.query).length > 0 && (t = t.filter((A) => {
      let T2 = e.query;
      return T2 ? Object.entries(T2).every(([h2, b]) => A[h2] === b) : true;
    }));
    let n = e.pagination.count, i = e.pagination.from, a = i === "end" ? n === -1 ? 0 : Math.max(t.length - n, 0) : 0, _ = i === "end" || n === -1 ? t.length : Math.min(n, t.length), l2 = t.slice(a, _);
    return l2.length === 1 && n !== -1 ? l2[0] : l2.length ? l2 : void 0;
  }
  resolveConstructor(e) {
    let t = Array.from(this.allowedComponents).find((i) => i.name === e || i.name === g.toPascalCase(e));
    if (t) return t;
    {
      let i = Array.from(this.allowedComponents).find((a) => {
        let _ = a;
        for (; _; ) {
          if (_.name === e || _.name === g.toPascalCase(e)) return true;
          _ = Object.getPrototypeOf(_);
        }
        return false;
      });
      if (i) return i;
    }
    let r2 = Array.from(this.allowedEntities).find((i) => i.name === e || i.name === g.toPascalCase(e) || i.entity === e || i.entity === g.toKebabCase(e));
    if (r2) return r2;
    {
      let i = Array.from(this.allowedEntities).find((a) => u.isInheritedFrom(a, e));
      if (i) return i;
    }
    let n = Array.from(this.allowedFragments).find((i) => i.name === e || i.name === g.toPascalCase(e));
    if (n) return n;
    {
      let i = Array.from(this.allowedFragments).find((a) => u.isInheritedFrom(a, e));
      if (i) return i;
    }
    for (let i of this._imports) {
      let a = i.resolveConstructor(e);
      if (a) return a;
    }
    if (this._parent) return this._parent.resolveConstructor(e);
  }
  resolveAll(e) {
    let t = /* @__PURE__ */ new Set();
    this.resolveFlatAll(e).forEach((i) => t.add(i)), this._imports.forEach((i) => {
      i.has(e) && i.resolveFlatAll(e).forEach((_) => t.add(_));
    });
    let n = this._parent;
    for (; n && n.has(e); ) n.resolveAll(e).forEach((a) => t.add(a)), n = n._parent;
    return Array.from(t);
  }
  resolveFlatAll(e) {
    let t = [];
    switch (true) {
      case s.isComponentConstructor(e): {
        this.allowedComponents.forEach((r2) => {
          if (u.isInheritedFrom(r2, e)) {
            let n = this.resolveOnce(r2);
            n && t.push(n);
          }
        });
        break;
      }
      case s.isFragmentConstructor(e): {
        this.allowedFragments.forEach((r2) => {
          if (u.isInheritedFrom(r2, e)) {
            let n = this.resolveOnce(r2);
            n && t.push(n);
          }
        });
        break;
      }
      case s.isEntityConstructor(e): {
        this.entities.forEach((r2) => {
          u.isInheritedFrom(r2.constructor, e) && t.push(r2);
        });
        break;
      }
      case s.isString(e): {
        let r2 = this.resolveConstructor(e);
        if (!s.isComponentConstructor(r2) && !s.isEntityConstructor(r2) && !s.isFragmentConstructor(r2)) throw new E(E.ResolutionError, `Unable to resolve all instances for name: ${e} in scope ${this.name} as no matching component, entity or fragment constructor found`);
        if (r2) {
          let n = this.resolveAll(r2);
          n && t.push(...n);
        }
        break;
      }
      default:
        throw new E(E.ResolutionError, `Invalid parameter provided to resolveAll method: ${e} in scope ${this.name}`);
    }
    return t;
  }
  resolve(e) {
    let t = s.isDependencyInstance(e) ? e : new Y(e);
    return this.resolveDependency(t);
  }
  resolveOnce(e) {
    let t = this.resolveFlatOnce(e);
    if (!t) {
      for (let r2 of this._imports) if (r2.has(e)) {
        let n = r2.resolveFlatOnce(e);
        if (n) return n;
      }
    }
    return !t && this.parent ? this.parent.resolveOnce(e) : t;
  }
  resolveFlat(e) {
    return this.resolveFlatOnce(e);
  }
  resolveFlatOnce(e) {
    let t, r2 = u.getComponentName(e);
    if (!(!e || !this.has(e))) {
      switch (true) {
        case s.isString(e): {
          t = this.resolveByName(e);
          break;
        }
        case s.isConstructorAllowedForScopeAllocation(e): {
          t = this.resolveIssuer(e);
          break;
        }
        case s.isScopeConstructor(e): {
          t = this.resolveScope(e);
          break;
        }
        case s.isEntityConstructor(e): {
          t = this.resolveEntity(e);
          break;
        }
        case s.isFragmentConstructor(e): {
          t = this.resolveFragment(e);
          break;
        }
        case s.isComponentConstructor(e): {
          t = this.resolveComponent(e);
          break;
        }
        case s.isErrorConstructor(e): {
          t = this.resolveError(e);
          break;
        }
        default:
          throw new E(E.ResolutionError, `Injected Component ${r2} not found in the scope`);
      }
      return t;
    }
  }
  resolveByName(e) {
    let t = Array.from(this.allowedComponents).find((a) => a.name === e || a.name === g.toPascalCase(e));
    if (t) return this.resolveOnce(t);
    let r2 = Array.from(this.allowedEntities).find((a) => a.name === e || a.name === g.toPascalCase(e) || a.entity === e || a.entity === g.toKebabCase(e));
    if (r2) return this.resolveOnce(r2);
    let n = Array.from(this.allowedFragments).find((a) => a.name === e || a.name === g.toPascalCase(e));
    if (n) return this.resolveOnce(n);
    let i = Array.from(this.allowedErrors).find((a) => a.name === e || a.name === g.toPascalCase(e) || a.code === e || a.code === g.toKebabCase(e));
    if (i) return this.resolveOnce(i);
  }
  resolveIssuer(e) {
    let t = this.issuer();
    if (t && (t.constructor === e || u.isInheritedFrom(t?.constructor, e))) return t;
  }
  resolveEntity(e) {
    return this.entities.find((t) => t instanceof e);
  }
  resolveError(e) {
    return this.errors.find((t) => t instanceof e);
  }
  resolveFragment(e) {
    let t = this._fragments.get(e);
    switch (true) {
      case (t && this._fragments.has(e)):
        return t;
      case (!t && Array.from(this._allowedFragments).some((r2) => u.isInheritedFrom(r2, e))): {
        let r2 = Array.from(this._allowedFragments).find((n) => u.isInheritedFrom(n, e));
        return this.resolveFragment(r2);
      }
      default:
        return;
    }
  }
  resolveScope(e) {
    return this;
  }
  resolveComponent(e) {
    switch (true) {
      case (this.allowedComponents.has(e) && this._components.has(e)):
        return this._components.get(e);
      case (this.allowedComponents.has(e) && !this._components.has(e)): {
        let n = (c.meta(e).get("a-component-injections")?.get("constructor") || []).map((a) => this.resolve(a)), i = new e(...n);
        return this.register(i), this._components.get(e);
      }
      case (!this.allowedComponents.has(e) && Array.from(this.allowedComponents).some((t) => u.isInheritedFrom(t, e))): {
        let t = Array.from(this.allowedComponents).find((r2) => u.isInheritedFrom(r2, e));
        return this.resolveComponent(t);
      }
      default:
        return;
    }
  }
  register(e) {
    switch (true) {
      case e instanceof w: {
        this.allowedComponents.has(e.constructor) || this.allowedComponents.add(e.constructor), this._components.set(e.constructor, e), c.register(this, e);
        break;
      }
      case (s.isEntityInstance(e) && !this._entities.has(e.aseid.toString())): {
        this.allowedEntities.has(e.constructor) || this.allowedEntities.add(e.constructor), this._entities.set(e.aseid.toString(), e), c.register(this, e);
        break;
      }
      case s.isFragmentInstance(e): {
        this.allowedFragments.has(e.constructor) || this.allowedFragments.add(e.constructor), this._fragments.set(e.constructor, e), c.register(this, e);
        break;
      }
      case s.isErrorInstance(e): {
        this.allowedErrors.has(e.constructor) || this.allowedErrors.add(e.constructor), this._errors.set(e.code, e), c.register(this, e);
        break;
      }
      case s.isComponentConstructor(e): {
        this.allowedComponents.has(e) || this.allowedComponents.add(e);
        break;
      }
      case s.isFragmentConstructor(e): {
        this.allowedFragments.has(e) || this.allowedFragments.add(e);
        break;
      }
      case s.isEntityConstructor(e): {
        this.allowedEntities.has(e) || this.allowedEntities.add(e);
        break;
      }
      case s.isErrorConstructor(e): {
        this.allowedErrors.has(e) || this.allowedErrors.add(e);
        break;
      }
      default:
        if (e instanceof v) throw new E(E.RegistrationError, `Entity with ASEID ${e.aseid.toString()} is already registered in the scope ${this.name}`);
        if (e instanceof R) throw new E(E.RegistrationError, `Fragment ${e.constructor.name} is already registered in the scope ${this.name}`);
        {
          let t = u.getComponentName(e);
          throw new E(E.RegistrationError, `Cannot register ${t} in the scope ${this.name}`);
        }
    }
  }
  deregister(e) {
    switch (true) {
      case e instanceof w: {
        this._components.delete(e.constructor), c.deregister(e);
        let r2 = e.constructor;
        this._components.has(r2) || this.allowedComponents.delete(r2);
        break;
      }
      case s.isEntityInstance(e): {
        this._entities.delete(e.aseid.toString()), c.deregister(e);
        let r2 = e.constructor;
        Array.from(this._entities.values()).some((i) => i instanceof r2) || this.allowedEntities.delete(r2);
        break;
      }
      case s.isFragmentInstance(e): {
        this._fragments.delete(e.constructor), c.deregister(e);
        let r2 = e.constructor;
        Array.from(this._fragments.values()).some((i) => i instanceof r2) || this.allowedFragments.delete(r2);
        break;
      }
      case s.isErrorInstance(e): {
        this._errors.delete(e.code), c.deregister(e);
        let r2 = e.constructor;
        Array.from(this._errors.values()).some((i) => i instanceof r2) || this.allowedErrors.delete(r2);
        break;
      }
      case s.isComponentConstructor(e): {
        this.allowedComponents.delete(e);
        break;
      }
      case s.isFragmentConstructor(e): {
        this.allowedFragments.delete(e), Array.from(this._fragments.entries()).forEach(([r2, n]) => {
          u.isInheritedFrom(r2, e) && (this._fragments.delete(r2), c.deregister(n));
        });
        break;
      }
      case s.isEntityConstructor(e): {
        this.allowedEntities.delete(e), Array.from(this._entities.entries()).forEach(([r2, n]) => {
          u.isInheritedFrom(n.constructor, e) && (this._entities.delete(r2), c.deregister(n));
        });
        break;
      }
      case s.isErrorConstructor(e): {
        this.allowedErrors.delete(e), Array.from(this._errors.entries()).forEach(([r2, n]) => {
          u.isInheritedFrom(n.constructor, e) && (this._errors.delete(r2), c.deregister(n));
        });
        break;
      }
      default:
        let t = u.getComponentName(e);
        throw new E(E.DeregistrationError, `Cannot deregister ${t} from the scope ${this.name}`);
    }
  }
  toJSON() {
    return this.fragments.reduce((e, t) => {
      let r2 = t.toJSON();
      return { ...e, [r2.name]: r2 };
    }, {});
  }
  isAllowedComponent(e) {
    return s.isComponentConstructor(e) && this.allowedComponents.has(e);
  }
  isAllowedEntity(e) {
    return s.isEntityConstructor(e) && this.allowedEntities.has(e);
  }
  isAllowedFragment(e) {
    return s.isFragmentConstructor(e) && this.allowedFragments.has(e);
  }
  isAllowedError(e) {
    return s.isErrorConstructor(e) && this.allowedErrors.has(e);
  }
  isInheritedFrom(e) {
    let t = this;
    for (; t; ) {
      if (t === e) return true;
      t = t._parent;
    }
    return false;
  }
  checkCircularInheritance(e) {
    let t = [], r2 = this._parent;
    for (; r2; ) {
      if (t.push(r2.name), r2 === e) return t;
      r2 = r2._parent;
    }
    return false;
  }
  printInheritanceChain() {
    let e = [], t = this;
    for (; t; ) e.push(t.name), t = t._parent;
    console.log(e.join(" -> "));
  }
}, __name(_a29, "x"), _a29);
var _a30;
var E = (_a30 = class extends y {
}, __name(_a30, "E"), _a30);
E.InitializationError = "A-Scope Initialization Error", E.ConstructorError = "Unable to construct A-Scope instance", E.ResolutionError = "A-Scope Resolution Error", E.RegistrationError = "A-Scope Registration Error", E.CircularInheritanceError = "A-Scope Circular Inheritance Error", E.CircularImportError = "A-Scope Circular Import Error", E.DeregistrationError = "A-Scope Deregistration Error";
var _a31;
var p = (_a31 = class extends y {
}, __name(_a31, "p"), _a31);
p.NotAllowedForScopeAllocationError = "Component is not allowed for scope allocation", p.ComponentAlreadyHasScopeAllocatedError = "Component already has scope allocated", p.InvalidMetaParameterError = "Invalid parameter provided to get meta", p.InvalidScopeParameterError = "Invalid parameter provided to get scope", p.ScopeNotFoundError = "Scope not found", p.InvalidFeatureParameterError = "Invalid parameter provided to get feature", p.InvalidFeatureDefinitionParameterError = "Invalid parameter provided to define feature", p.InvalidFeatureTemplateParameterError = "Invalid parameter provided to get feature template", p.InvalidFeatureExtensionParameterError = "Invalid parameter provided to extend feature", p.InvalidAbstractionParameterError = "Invalid parameter provided to get abstraction", p.InvalidAbstractionDefinitionParameterError = "Invalid parameter provided to define abstraction", p.InvalidAbstractionTemplateParameterError = "Invalid parameter provided to get abstraction template", p.InvalidAbstractionExtensionParameterError = "Invalid parameter provided to extend abstraction", p.InvalidInjectionParameterError = "Invalid parameter provided to get injections", p.InvalidExtensionParameterError = "Invalid parameter provided to get extensions", p.InvalidRegisterParameterError = "Invalid parameter provided to register component", p.InvalidComponentParameterError = "Invalid component provided", p.ComponentNotRegisteredError = "Component not registered in the context", p.InvalidDeregisterParameterError = "Invalid parameter provided to deregister component";
var _a32;
var c = (_a32 = class {
  constructor() {
    this._registry = /* @__PURE__ */ new WeakMap();
    this._scopeIssuers = /* @__PURE__ */ new WeakMap();
    this._scopeStorage = /* @__PURE__ */ new WeakMap();
    this._metaStorage = /* @__PURE__ */ new Map();
    this._globals = /* @__PURE__ */ new Map();
    let e = String(O.A_CONCEPT_ROOT_SCOPE) || "root";
    this._root = new x({ name: e });
  }
  static get concept() {
    return O.A_CONCEPT_NAME || "a-concept";
  }
  static get root() {
    return this.getInstance()._root;
  }
  static get environment() {
    return O.A_CONCEPT_RUNTIME_ENVIRONMENT;
  }
  static getInstance() {
    return _a32._instance || (_a32._instance = new _a32()), _a32._instance;
  }
  static register(e, t) {
    let r2 = u.getComponentName(t), n = this.getInstance();
    if (!t) throw new p(p.InvalidRegisterParameterError, "Unable to register component. Component cannot be null or undefined.");
    if (!e) throw new p(p.InvalidRegisterParameterError, "Unable to register component. Scope cannot be null or undefined.");
    if (!this.isAllowedToBeRegistered(t)) throw new p(p.NotAllowedForScopeAllocationError, `Component ${r2} is not allowed for scope allocation.`);
    return n._scopeStorage.set(t, e), e;
  }
  static deregister(e) {
    let t = u.getComponentName(e), r2 = this.getInstance();
    if (!e) throw new p(p.InvalidDeregisterParameterError, "Unable to deregister component. Component cannot be null or undefined.");
    if (!r2._scopeStorage.has(e)) throw new p(p.ComponentNotRegisteredError, `Unable to deregister component. Component ${t} is not registered.`);
    r2._scopeStorage.delete(e);
  }
  static allocate(e, t) {
    let r2 = u.getComponentName(e);
    if (!this.isAllowedForScopeAllocation(e)) throw new p(p.NotAllowedForScopeAllocationError, `Component of type ${r2} is not allowed for scope allocation. Only A_Container, A_Feature are allowed.`);
    let n = this.getInstance();
    if (n._registry.has(e)) throw new p(p.ComponentAlreadyHasScopeAllocatedError, `Component ${r2} already has a scope allocated.`);
    let i = s.isScopeInstance(t) ? t : new x(t || { name: r2 + "-scope" }, t);
    return i.isInheritedFrom(_a32.root) || i.inherit(_a32.root), n._registry.set(e, i), n._scopeIssuers.set(i, e), i;
  }
  static deallocate(e) {
    let t = this.getInstance(), r2 = s.isScopeInstance(e) ? e : t._registry.get(e);
    if (!r2) return;
    let n = s.isComponentInstance(e) ? e : this.issuer(r2);
    n && t._registry.delete(n), r2 && t._scopeIssuers.delete(r2);
  }
  static meta(e) {
    let t = u.getComponentName(e), r2 = this.getInstance();
    if (!e) throw new p(p.InvalidMetaParameterError, "Invalid parameter provided to get meta. Parameter cannot be null or undefined.");
    if (!(this.isAllowedForMeta(e) || this.isAllowedForMetaConstructor(e) || s.isString(e) || s.isFunction(e))) throw new p(p.InvalidMetaParameterError, `Invalid parameter provided to get meta. Component of type ${t} is not allowed for meta storage. Only A_Container, A_Component and A_Entity are allowed.`);
    let n, i;
    switch (true) {
      case s.isContainerInstance(e): {
        n = e.constructor, i = U;
        break;
      }
      case s.isContainerConstructor(e): {
        n = e, i = U;
        break;
      }
      case s.isComponentInstance(e): {
        n = e.constructor, i = N;
        break;
      }
      case s.isComponentConstructor(e): {
        n = e, i = N;
        break;
      }
      case s.isEntityInstance(e): {
        n = e.constructor, i = N;
        break;
      }
      case s.isEntityConstructor(e): {
        n = e, i = z;
        break;
      }
      case s.isFragmentInstance(e): {
        n = e.constructor, i = N;
        break;
      }
      case s.isFragmentConstructor(e): {
        n = e, i = z;
        break;
      }
      case typeof e == "string": {
        let a = Array.from(r2._metaStorage).find(([_]) => _.name === e || _.name === g.toKebabCase(e) || _.name === g.toPascalCase(e));
        if (!(a && a.length)) throw new p(p.InvalidMetaParameterError, `Invalid parameter provided to get meta. Component with name ${e} not found in the meta storage.`);
        n = a[0], i = N;
        break;
      }
      default: {
        n = e, i = d;
        break;
      }
    }
    if (!r2._metaStorage.has(n)) {
      let a, _ = n;
      for (; !a; ) {
        let l2 = Object.getPrototypeOf(_);
        if (!l2) break;
        a = r2._metaStorage.get(l2), _ = l2;
      }
      a || (a = new i()), r2._metaStorage.set(n, new i().from(a));
    }
    return r2._metaStorage.get(n);
  }
  static setMeta(e, t) {
    let r2 = _a32.getInstance(), n = _a32.meta(e), i = typeof e == "function" ? e : e.constructor;
    r2._metaStorage.set(i, n ? t.from(n) : t);
  }
  static issuer(e) {
    let t = this.getInstance();
    if (!e) throw new p(p.InvalidComponentParameterError, "Invalid parameter provided to get scope issuer. Parameter cannot be null or undefined.");
    return t._scopeIssuers.get(e);
  }
  static scope(e) {
    let t = e?.constructor?.name || String(e), r2 = this.getInstance();
    if (!e) throw new p(p.InvalidScopeParameterError, "Invalid parameter provided to get scope. Parameter cannot be null or undefined.");
    if (!this.isAllowedForScopeAllocation(e) && !this.isAllowedToBeRegistered(e)) throw new p(p.InvalidScopeParameterError, `Invalid parameter provided to get scope. Component of type ${t} is not allowed for scope allocation.`);
    switch (true) {
      case this.isAllowedToBeRegistered(e):
        if (!r2._scopeStorage.has(e)) throw new p(p.ScopeNotFoundError, `Invalid parameter provided to get scope. Component of type ${t} does not have a scope registered. Make sure to register the component using A_Context.register() method before trying to get the scope.`);
        return r2._scopeStorage.get(e);
      case this.isAllowedForScopeAllocation(e):
        if (!r2._registry.has(e)) throw new p(p.ScopeNotFoundError, `Invalid parameter provided to get scope. Component of type ${t} does not have a scope allocated. Make sure to allocate a scope using A_Context.allocate() method before trying to get the scope.`);
        return r2._registry.get(e);
      default:
        throw new p(p.InvalidScopeParameterError, `Invalid parameter provided to get scope. Component of type ${t} is not allowed to be registered.`);
    }
  }
  static featureTemplate(e, t, r2 = this.scope(t)) {
    let n = u.getComponentName(t);
    if (!t) throw new p(p.InvalidFeatureTemplateParameterError, "Unable to get feature template. Component cannot be null or undefined.");
    if (!e) throw new p(p.InvalidFeatureTemplateParameterError, "Unable to get feature template. Feature name cannot be null or undefined.");
    if (!s.isAllowedForFeatureDefinition(t)) throw new p(p.InvalidFeatureTemplateParameterError, `Unable to get feature template. Component of type ${n} is not allowed for feature definition.`);
    return [...this.featureDefinition(e, t), ...this.featureExtensions(e, t, r2)];
  }
  static featureExtensions(e, t, r2) {
    let n = this.getInstance(), i = u.getComponentName(t);
    if (!t) throw new p(p.InvalidFeatureExtensionParameterError, "Unable to get feature template. Component cannot be null or undefined.");
    if (!e) throw new p(p.InvalidFeatureExtensionParameterError, "Unable to get feature template. Feature name cannot be null or undefined.");
    if (!s.isAllowedForFeatureDefinition(t)) throw new p(p.InvalidFeatureExtensionParameterError, `Unable to get feature template. Component of type ${i} is not allowed for feature definition.`);
    let a = u.getClassInheritanceChain(t).filter((A) => A !== w && A !== j && A !== v).map((A) => `${A.name}.${e}`), _ = /* @__PURE__ */ new Map(), l2 = /* @__PURE__ */ new Set();
    for (let A of a) for (let [T2, h2] of n._metaStorage) r2.has(T2) && (s.isComponentMetaInstance(h2) || s.isContainerMetaInstance(h2)) && (l2.add(T2), h2.extensions(A).forEach((b) => {
      let D2 = Array.from(l2).reverse().find((J) => u.isInheritedFrom(T2, J) && J !== T2);
      D2 && _.delete(`${u.getComponentName(D2)}.${b.handler}`), _.set(`${u.getComponentName(T2)}.${b.handler}`, { dependency: new Y(T2), ...b });
    }));
    return n.filterToMostDerived(r2, Array.from(_.values()));
  }
  filterToMostDerived(e, t) {
    return t.filter((r2) => {
      let n = e.resolveConstructor(r2.dependency.name);
      return !t.some((a) => {
        if (a === r2) return false;
        let _ = e.resolveConstructor(a.dependency.name);
        return !n || !_ ? false : n.prototype.isPrototypeOf(_.prototype);
      });
    });
  }
  static featureDefinition(e, t) {
    let r2;
    if (!e) throw new p(p.InvalidFeatureTemplateParameterError, "Unable to get feature template. Feature name cannot be null or undefined.");
    if (!t) throw new p(p.InvalidFeatureTemplateParameterError, "Unable to get feature template. Component cannot be null or undefined.");
    switch (true) {
      case t instanceof v:
        r2 = "a-component-features";
        break;
      case t instanceof j:
        r2 = "a-container-features";
        break;
      case t instanceof w:
        r2 = "a-component-features";
        break;
      default:
        throw new p(p.InvalidFeatureTemplateParameterError, `A-Feature cannot be defined on the ${t} level`);
    }
    return [...this.meta(t)?.get(r2)?.get(e)?.template || []];
  }
  static abstractionTemplate(e, t) {
    let r2 = u.getComponentName(t);
    if (!t) throw new p(p.InvalidAbstractionTemplateParameterError, "Unable to get feature template. Component cannot be null or undefined.");
    if (!e) throw new p(p.InvalidAbstractionTemplateParameterError, "Unable to get feature template. Abstraction stage cannot be null or undefined.");
    if (!s.isAllowedForAbstractionDefinition(t)) throw new p(p.InvalidAbstractionTemplateParameterError, `Unable to get feature template. Component of type ${r2} is not allowed for feature definition.`);
    return [...this.abstractionExtensions(e, t)];
  }
  static abstractionExtensions(e, t) {
    let r2 = this.getInstance(), n = u.getComponentName(t);
    if (!t) throw new p(p.InvalidAbstractionExtensionParameterError, "Unable to get feature template. Component cannot be null or undefined.");
    if (!e) throw new p(p.InvalidAbstractionExtensionParameterError, "Unable to get feature template. Abstraction stage cannot be null or undefined.");
    if (!s.isAllowedForAbstractionDefinition(t)) throw new p(p.InvalidAbstractionExtensionParameterError, `Unable to get feature template. Component of type ${n} is not allowed for feature definition.`);
    let i = /* @__PURE__ */ new Map(), a = this.scope(t), _ = /* @__PURE__ */ new Set();
    for (let [l2, A] of r2._metaStorage) a.has(l2) && (s.isComponentMetaInstance(A) || s.isContainerMetaInstance(A)) && (_.add(l2), A.abstractions(e).forEach((T2) => {
      let h2 = Array.from(_).reverse().find((b) => u.isInheritedFrom(l2, b) && b !== l2);
      h2 && i.delete(`${u.getComponentName(h2)}.${T2.handler}`), i.set(`${u.getComponentName(l2)}.${T2.handler}`, { dependency: new Y(l2), ...T2 });
    }));
    return r2.filterToMostDerived(a, Array.from(i.values()));
  }
  static reset() {
    let e = _a32.getInstance();
    e._registry = /* @__PURE__ */ new WeakMap();
    let t = String(O.A_CONCEPT_ROOT_SCOPE) || "root";
    e._root = new x({ name: t });
  }
  static isAllowedForScopeAllocation(e) {
    return s.isContainerInstance(e) || s.isFeatureInstance(e) || s.isEntityInstance(e);
  }
  static isAllowedToBeRegistered(e) {
    return s.isEntityInstance(e) || s.isComponentInstance(e) || s.isFragmentInstance(e) || s.isErrorInstance(e);
  }
  static isAllowedForMeta(e) {
    return s.isContainerInstance(e) || s.isComponentInstance(e) || s.isEntityInstance(e);
  }
  static isAllowedForMetaConstructor(e) {
    return s.isContainerConstructor(e) || s.isComponentConstructor(e) || s.isEntityConstructor(e);
  }
}, __name(_a32, "o"), _a32);
var _a33;
var L = (_a33 = class extends y {
}, __name(_a33, "L"), _a33);
L.AbstractionExtensionError = "Unable to extend abstraction execution";
function me(o, e = {}) {
  return function(t, r2, n) {
    let i = u.getComponentName(t);
    if (!o) throw new L(L.AbstractionExtensionError, `Abstraction name must be provided to extend abstraction for '${i}'.`);
    if (!s.isConstructorAvailableForAbstraction(t)) throw new L(L.AbstractionExtensionError, `Unable to extend Abstraction '${o}' for '${i}'. Only A-Containers and A-Components can extend Abstractions.`);
    let a, _ = c.meta(t);
    switch (true) {
      case (s.isContainerConstructor(t) || s.isContainerInstance(t)):
        a = "a-container-abstractions";
        break;
      case (s.isComponentConstructor(t) || s.isComponentInstance(t)):
        a = "a-component-abstractions";
        break;
    }
    let l2 = `CONCEPT_ABSTRACTION::${o}`, A = _.get(a) ? new d().from(_.get(a)) : new d(), T2 = [...A.get(l2) || []], h2 = T2.findIndex((D2) => D2.handler === r2), b = { name: l2, handler: r2, behavior: e.behavior || "sync", throwOnError: e.throwOnError !== void 0 ? e.throwOnError : true, before: s.isArray(e.before) ? new RegExp(`^${e.before.join("|").replace(/\./g, "\\.")}$`).source : e.before instanceof RegExp ? e.before.source : "", after: s.isArray(e.after) ? new RegExp(`^${e.after.join("|").replace(/\./g, "\\.")}$`).source : e.after instanceof RegExp ? e.after.source : "", override: s.isArray(e.override) ? new RegExp(`^${e.override.join("|").replace(/\./g, "\\.")}$`).source : e.after instanceof RegExp ? e.after.source : "" };
    h2 !== -1 ? T2[h2] = b : T2.push(b), A.set(l2, T2), c.meta(t).set(a, A);
  };
}
__name(me, "me");
var _a34;
var P = (_a34 = class {
  constructor(e) {
    this._features = [];
    this._index = 0;
    this._name = e.name, this._features = e.containers.map((t) => {
      let r2 = c.abstractionTemplate(this._name, t);
      return new I({ name: this._name, component: t, template: r2 });
    }), this._current = this._features[0];
  }
  static get Extend() {
    return me;
  }
  get name() {
    return this._name;
  }
  get feature() {
    return this._current;
  }
  get isDone() {
    return !this.feature || this._index >= this._features.length;
  }
  [Symbol.iterator]() {
    return { next: /* @__PURE__ */ __name(() => this.isDone ? (this._current = void 0, { value: void 0, done: true }) : (this._current = this._features[this._index], { value: this._current, done: false }), "next") };
  }
  next(e) {
    if (this._index >= this._features.length) return;
    let t = this._features.indexOf(e);
    this._index = t + 1;
  }
  async process(e) {
    if (!this.isDone) for (let t of this._features) await t.process(e);
  }
}, __name(_a34, "P"), _a34);
var De = ((_) => (_.Run = "run", _.Build = "build", _.Publish = "publish", _.Deploy = "deploy", _.Load = "load", _.Start = "start", _.Stop = "stop", _))(De || {});
var Fe = ((e) => (e.LIFECYCLE = "a-component-extensions", e))(Fe || {});
var _a35;
var Ee = (_a35 = class {
  constructor(e) {
    this.props = e;
    this._name = e.name || c.root.name, e.components && e.components.length && e.components.forEach((t) => this.scope.register(t)), e.fragments && e.fragments.length && e.fragments.forEach((t) => this.scope.register(t)), e.entities && e.entities.length && e.entities.forEach((t) => this.scope.register(t)), this._containers = e.containers || [];
  }
  static Load(e) {
    return P.Extend("load", e);
  }
  static Publish(e) {
    return P.Extend("publish");
  }
  static Deploy(e) {
    return P.Extend("deploy", e);
  }
  static Build(e) {
    return P.Extend("build", e);
  }
  static Run(e) {
    return P.Extend("run", e);
  }
  static Start(e) {
    return P.Extend("start", e);
  }
  static Stop(e) {
    return P.Extend("stop", e);
  }
  get name() {
    return c.root.name;
  }
  get scope() {
    return c.root;
  }
  get register() {
    return this.scope.register.bind(this.scope);
  }
  get resolve() {
    return this.scope.resolve.bind(this.scope);
  }
  async load(e) {
    await new P({ name: "load", containers: this._containers }).process(e);
  }
  async run(e) {
    await new P({ name: "run", containers: this._containers }).process(e);
  }
  async start(e) {
    await new P({ name: "start", containers: this._containers }).process(e);
  }
  async stop(e) {
    await new P({ name: "stop", containers: this._containers }).process(e);
  }
  async build(e) {
    await new P({ name: "build", containers: this._containers }).process(e);
  }
  async deploy(e) {
    await new P({ name: "deploy", containers: this._containers }).process(e);
  }
  async publish(e) {
    await new P({ name: "publish", containers: this._containers }).process(e);
  }
  async call(e, t) {
    return await new I({ name: e, component: t }).process();
  }
}, __name(_a35, "Ee"), _a35);
var _a36;
var M = (_a36 = class extends y {
}, __name(_a36, "M"), _a36);
M.InvalidInjectionTarget = "Invalid target for A-Inject decorator", M.MissingInjectionTarget = "Missing target for A-Inject decorator";
function ve(o, e) {
  if (!o) throw new M(M.MissingInjectionTarget, "A-Inject decorator is missing the target to inject");
  return function(t, r2, n) {
    let i = u.getComponentName(t);
    if (!s.isTargetAvailableForInjection(t)) throw new M(M.InvalidInjectionTarget, `A-Inject cannot be used on the target of type ${typeof t} (${i})`);
    let a = r2 ? String(r2) : "constructor", _;
    switch (true) {
      case (s.isComponentConstructor(t) || s.isComponentInstance(t)):
        _ = "a-component-injections";
        break;
      case s.isContainerInstance(t):
        _ = "a-container-injections";
        break;
      case s.isEntityInstance(t):
        _ = "a-component-injections";
        break;
    }
    let l2 = c.meta(t).get(_) || new d(), A = l2.get(a) || [];
    A[n] = o instanceof Y ? o : new Y(o, e), l2.set(a, A), c.meta(t).set(_, l2);
  };
}
__name(ve, "ve");

// node_modules/@adaas/a-utils/dist/browser/chunk-EQQGB2QZ.mjs
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __decorateClass2 = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc2(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp2(target, key, result);
  return result;
}, "__decorateClass");
var __decorateParam2 = /* @__PURE__ */ __name((index, decorator) => (target, key) => decorator(target, key, index), "__decorateParam");

// node_modules/@adaas/a-frame/dist/browser/index.mjs
var h = Object.defineProperty;
var E2 = Object.getOwnPropertyDescriptor;
var g2 = /* @__PURE__ */ __name((a, e, t, s2) => {
  for (var i = s2 > 1 ? void 0 : s2 ? E2(e, t) : e, o = a.length - 1, n; o >= 0; o--) (n = a[o]) && (i = (s2 ? n(e, t, i) : n(i)) || i);
  return s2 && i && h(e, t, i), i;
}, "g");
var _a37;
var I2 = (_a37 = class extends j {
  async initialize() {
    if (c.environment !== "server") throw new y("A-Frame CLI can only be used in Node.js environment.");
  }
  async readCommandParams() {
    console.log("Reading command parameters from CLI...");
    let e = process.argv.slice(2);
    console.log("Command Line Arguments:", e);
  }
}, __name(_a37, "I"), _a37);
g2([Ee.Load()], I2.prototype, "initialize", 1), g2([Ee.Start()], I2.prototype, "readCommandParams", 1);
var D = ((o) => (o.COMPONENT = "component", o.ENTITY = "entity", o.CONTAINER = "container", o.FRAGMENT = "fragment", o.METHOD = "method", o))(D || {});
var _a38;
var r = (_a38 = class extends y {
}, __name(_a38, "r"), _a38);
r.InvalidTarget = "A-Frame Index Invalid Target Error", r.InvalidConfiguration = "A-Frame Index Invalid Configuration Error", r.IndexDefinitionError = "A-Frame Index Definition Error", r.IndexMetadataError = "A-Frame Index Metadata Error", r.IndexRegistryError = "A-Frame Index Registry Error", r.IndexComponentNotFoundError = "A-Frame Index Component Not Found Error";
var _a39;
var d2 = (_a39 = class {
  static isAllowedTarget(e) {
    return s.isEntityConstructor(e) || s.isComponentConstructor(e) || s.isContainerConstructor(e) || s.isFragmentConstructor(e) || s.isComponentInstance(e) || s.isContainerInstance(e) || s.isEntityInstance(e) || s.isFragmentInstance(e);
  }
  static getTargetName(e) {
    return u.getComponentName(e);
  }
  static getTargetConstructor(e) {
    return typeof e == "function" ? e : e.constructor;
  }
}, __name(_a39, "d"), _a39);
function x2(a, e = {}) {
  return function(t, s2, i) {
    if (s2 && i && a === "method") {
      let n = t.constructor, m2 = String(s2);
      try {
        let _ = c.meta(c2), p2 = _.getMetaFor(n);
        if (e.namespace && p2.namespace && e.namespace !== p2.namespace) throw new r(r.InvalidConfiguration, `Method namespace '${e.namespace}' does not match target class namespace '${p2.namespace}'.`);
        let u2 = { name: e.name || m2, description: e.description, namespace: e.namespace || p2.namespace, methodName: m2 };
        return p2.addMethod(u2), _.seMetaFor(n, p2), i;
      } catch (_) {
        throw new r(r.IndexDefinitionError, `Unable to apply @A_Frame_Index.Method decorator on '${n.name}.${m2}': ${_ instanceof Error ? _.message : "Unknown error"}`);
      }
    }
    if (!d2.isAllowedTarget(t)) throw new r(r.InvalidTarget, `@A_Frame_Index.${a} decorator can only be applied to allowed targets.`);
    let o = u.getComponentName(t);
    try {
      let n = c.meta(c2), m2 = d2.getTargetConstructor(t), _ = n.getMetaFor(m2);
      return _.name = e.name || o, _.description = e.description, _.namespace = e.namespace, _.type = a, n.seMetaFor(m2, _), t;
    } catch (n) {
      throw new r(r.IndexDefinitionError, `Unable to apply @A_Frame_Index.${a} decorator on '${o}': ${n instanceof Error ? n.message : "Unknown error"}`);
    }
  };
}
__name(x2, "x");
function l(a) {
  return function(e, t, s2) {
    let i = u.getComponentName(e);
    if (!d2.isAllowedTarget(e)) throw new r(r.InvalidTarget, `Unable Apply Describe Index Decorator for '${i}': Target type is not allowed.`);
    try {
      let o = c.meta(c2), n = d2.getTargetConstructor(e), m2 = o.getMetaFor(n);
      return t || s2 || (m2.namespace = a, o.seMetaFor(n, m2)), e;
    } catch (o) {
      throw new r(o);
    }
  };
}
__name(l, "l");
function T(a) {
  return function(e, t, s2) {
    let i = u.getComponentName(e);
    if (!d2.isAllowedTarget(e)) throw new r(r.InvalidTarget, `Unable Apply Describe Index Decorator for '${i}': Target type is not allowed.`);
    try {
      let o = c.meta(c2), n = d2.getTargetConstructor(e), m2 = o.getMetaFor(n);
      if (t || s2) {
        let _ = t ? t.toString() : "", p2 = m2.methods.get(_);
        p2 && (p2.description = a, m2.methods.set(_, p2));
      } else m2.description = a, o.seMetaFor(n, m2);
      return e;
    } catch (o) {
      throw new r(o);
    }
  };
}
__name(T, "T");
var _a40;
var C2 = (_a40 = class extends v {
}, __name(_a40, "C"), _a40);
var _a41;
var M2 = (_a41 = class extends d {
  get name() {
    return this.get("name");
  }
  set name(e) {
    e && this.set("name", e);
  }
  get type() {
    return this.get("type");
  }
  set type(e) {
    e && this.set("type", e);
  }
  get namespace() {
    return this.get("namespaces");
  }
  set namespace(e) {
    if (e) {
      let t = e instanceof C2 ? e.aseid.toString() : e;
      this.set("namespaces", t);
    }
  }
  get description() {
    return this.get("descriptions");
  }
  set description(e) {
    e && this.set("descriptions", e);
  }
  get methods() {
    return this.get("methods") || this.set("methods", /* @__PURE__ */ new Map()), this.get("methods");
  }
  clear() {
    this.set("name", void 0), this.set("type", void 0), this.set("namespaces", void 0), this.set("descriptions", void 0), this.set("methods", /* @__PURE__ */ new Map());
  }
  addMethod(e) {
    let t = this.methods;
    t.has(e.name) || (t.set(e.name, e), this.set("methods", t));
  }
}, __name(_a41, "M"), _a41);
var _a42;
var F2 = (_a42 = class extends N {
  getMetaFor(e) {
    let t = this.get("A_FRAME_INDEX_CONFIGURATIONS_META") || /* @__PURE__ */ new Map();
    return t.has(e) || (t.set(e, new M2()), this.set("A_FRAME_INDEX_CONFIGURATIONS_META", t)), t.get(e);
  }
  seMetaFor(e, t) {
    let s2 = this.get("A_FRAME_INDEX_CONFIGURATIONS_META") || /* @__PURE__ */ new Map();
    s2.set(e, t), this.set("A_FRAME_INDEX_CONFIGURATIONS_META", s2);
  }
}, __name(_a42, "F"), _a42);
var _a43;
var c2 = (_a43 = class extends w {
  static Namespace(e) {
    return l(e);
  }
  static Describe(e) {
    return T(e);
  }
  static Component(e = {}) {
    return x2("component", e);
  }
  static Container(e = {}) {
    return x2("container", e);
  }
  static Entity(e = {}) {
    return x2("entity", e);
  }
  static Fragment(e = {}) {
    return x2("fragment", e);
  }
  static Method(e = {}) {
    return x2("method", e);
  }
}, __name(_a43, "c"), _a43);
c2 = g2([d.Define(F2)], c2);

// node_modules/@adaas/a-utils/dist/browser/chunk-J6CLHXFQ.mjs
var _a44;
var A_FSPolyfillBase = (_a44 = class {
  constructor(logger) {
    this.logger = logger;
    this._initialized = false;
  }
  get isInitialized() {
    return this._initialized;
  }
  async get() {
    if (!this._initialized) {
      await this.init();
    }
    return this._fs;
  }
  async init() {
    try {
      await this.initImplementation();
      this._initialized = true;
    } catch (error) {
      this.logger.error("Failed to initialize fs polyfill", error);
      throw error;
    }
  }
}, __name(_a44, "A_FSPolyfillBase"), _a44);
var _a45;
var A_FSPolyfill = (_a45 = class extends A_FSPolyfillBase {
  constructor(logger) {
    super(logger);
  }
  async initImplementation() {
    this._fs = {
      readFileSync: /* @__PURE__ */ __name((path, encoding) => {
        this.logger.warning("fs.readFileSync not available in browser environment");
        return "";
      }, "readFileSync"),
      existsSync: /* @__PURE__ */ __name((path) => {
        this.logger.warning("fs.existsSync not available in browser environment");
        return false;
      }, "existsSync"),
      createReadStream: /* @__PURE__ */ __name((path) => {
        this.logger.warning("fs.createReadStream not available in browser environment");
        return null;
      }, "createReadStream")
    };
  }
}, __name(_a45, "A_FSPolyfill"), _a45);
var _a46;
var A_CryptoPolyfillBase = (_a46 = class {
  constructor(logger) {
    this.logger = logger;
    this._initialized = false;
  }
  get isInitialized() {
    return this._initialized;
  }
  async get(fsPolyfill) {
    if (!this._initialized) {
      this._fsPolyfill = fsPolyfill;
      await this.init();
    }
    return this._crypto;
  }
  async init() {
    try {
      await this.initImplementation();
      this._initialized = true;
    } catch (error) {
      this.logger.error("Failed to initialize crypto polyfill", error);
      throw error;
    }
  }
}, __name(_a46, "A_CryptoPolyfillBase"), _a46);
var _a47;
var A_CryptoPolyfill = (_a47 = class extends A_CryptoPolyfillBase {
  constructor(logger) {
    super(logger);
  }
  async initImplementation() {
    this._crypto = {
      createFileHash: /* @__PURE__ */ __name(() => {
        this.logger.warning("File hash not available in browser environment");
        return Promise.resolve("");
      }, "createFileHash"),
      createTextHash: /* @__PURE__ */ __name((text, algorithm = "SHA-384") => new Promise(async (resolve, reject) => {
        try {
          if (!crypto.subtle) {
            throw new Error("SubtleCrypto not available");
          }
          const encoder = new TextEncoder();
          const data = encoder.encode(text);
          const hashBuffer = await crypto.subtle.digest(algorithm, data);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashBase64 = btoa(String.fromCharCode(...hashArray));
          resolve(`${algorithm}-${hashBase64}`);
        } catch (error) {
          reject(error);
        }
      }), "createTextHash")
    };
  }
}, __name(_a47, "A_CryptoPolyfill"), _a47);
var _a48;
var A_HttpPolyfillBase = (_a48 = class {
  constructor(logger) {
    this.logger = logger;
    this._initialized = false;
  }
  get isInitialized() {
    return this._initialized;
  }
  async get() {
    if (!this._initialized) {
      await this.init();
    }
    return this._http;
  }
  async init() {
    try {
      await this.initImplementation();
      this._initialized = true;
    } catch (error) {
      this.logger.error("Failed to initialize http polyfill", error);
      throw error;
    }
  }
}, __name(_a48, "A_HttpPolyfillBase"), _a48);
var _a49;
var A_HttpPolyfill = (_a49 = class extends A_HttpPolyfillBase {
  constructor(logger) {
    super(logger);
  }
  async initImplementation() {
    this._http = {
      request: /* @__PURE__ */ __name((options, callback) => {
        this.logger.warning("http.request not available in browser/test environment, use fetch instead");
        return this.createMockRequest(options, callback, false);
      }, "request"),
      get: /* @__PURE__ */ __name((url, callback) => {
        this.logger.warning("http.get not available in browser/test environment, use fetch instead");
        return this.createMockRequest(typeof url === "string" ? { hostname: url } : url, callback, false);
      }, "get"),
      createServer: /* @__PURE__ */ __name(() => {
        this.logger.error("http.createServer not available in browser/test environment");
        return null;
      }, "createServer")
    };
  }
  createMockRequest(options, callback, isHttps = false) {
    const request = {
      end: /* @__PURE__ */ __name(() => {
        if (callback) {
          const mockResponse = {
            statusCode: 200,
            headers: {},
            on: /* @__PURE__ */ __name((event2, handler) => {
              if (event2 === "data") {
                setTimeout(() => handler("mock data"), 0);
              } else if (event2 === "end") {
                setTimeout(() => handler(), 0);
              }
            }, "on"),
            pipe: /* @__PURE__ */ __name((dest) => {
              if (dest.write) dest.write("mock data");
              if (dest.end) dest.end();
            }, "pipe")
          };
          setTimeout(() => callback(mockResponse), 0);
        }
      }, "end"),
      write: /* @__PURE__ */ __name((data) => {
      }, "write"),
      on: /* @__PURE__ */ __name((event2, handler) => {
      }, "on")
    };
    return request;
  }
}, __name(_a49, "A_HttpPolyfill"), _a49);
var _a50;
var A_HttpsPolyfillBase = (_a50 = class {
  constructor(logger) {
    this.logger = logger;
    this._initialized = false;
  }
  get isInitialized() {
    return this._initialized;
  }
  async get() {
    if (!this._initialized) {
      await this.init();
    }
    return this._https;
  }
  async init() {
    try {
      await this.initImplementation();
      this._initialized = true;
    } catch (error) {
      this.logger.error("Failed to initialize https polyfill", error);
      throw error;
    }
  }
}, __name(_a50, "A_HttpsPolyfillBase"), _a50);
var _a51;
var A_HttpsPolyfill = (_a51 = class extends A_HttpsPolyfillBase {
  constructor(logger) {
    super(logger);
  }
  async initImplementation() {
    this._https = {
      request: /* @__PURE__ */ __name((options, callback) => {
        this.logger.warning("https.request not available in browser/test environment, use fetch instead");
        return this.createMockRequest(options, callback, true);
      }, "request"),
      get: /* @__PURE__ */ __name((url, callback) => {
        this.logger.warning("https.get not available in browser/test environment, use fetch instead");
        return this.createMockRequest(typeof url === "string" ? { hostname: url } : url, callback, true);
      }, "get"),
      createServer: /* @__PURE__ */ __name(() => {
        this.logger.error("https.createServer not available in browser/test environment");
        return null;
      }, "createServer")
    };
  }
  createMockRequest(options, callback, isHttps = true) {
    const request = {
      end: /* @__PURE__ */ __name(() => {
        if (callback) {
          const mockResponse = {
            statusCode: 200,
            headers: {},
            on: /* @__PURE__ */ __name((event2, handler) => {
              if (event2 === "data") {
                setTimeout(() => handler("mock data"), 0);
              } else if (event2 === "end") {
                setTimeout(() => handler(), 0);
              }
            }, "on"),
            pipe: /* @__PURE__ */ __name((dest) => {
              if (dest.write) dest.write("mock data");
              if (dest.end) dest.end();
            }, "pipe")
          };
          setTimeout(() => callback(mockResponse), 0);
        }
      }, "end"),
      write: /* @__PURE__ */ __name((data) => {
      }, "write"),
      on: /* @__PURE__ */ __name((event2, handler) => {
      }, "on")
    };
    return request;
  }
}, __name(_a51, "A_HttpsPolyfill"), _a51);
var _a52;
var A_PathPolyfillBase = (_a52 = class {
  constructor(logger) {
    this.logger = logger;
    this._initialized = false;
  }
  get isInitialized() {
    return this._initialized;
  }
  async get() {
    if (!this._initialized) {
      await this.init();
    }
    return this._path;
  }
  async init() {
    try {
      await this.initImplementation();
      this._initialized = true;
    } catch (error) {
      this.logger.error("Failed to initialize path polyfill", error);
      throw error;
    }
  }
}, __name(_a52, "A_PathPolyfillBase"), _a52);
var _a53;
var A_PathPolyfill = (_a53 = class extends A_PathPolyfillBase {
  constructor(logger) {
    super(logger);
  }
  async initImplementation() {
    this._path = {
      join: /* @__PURE__ */ __name((...paths) => {
        return paths.join("/").replace(/\/+/g, "/");
      }, "join"),
      resolve: /* @__PURE__ */ __name((...paths) => {
        let resolvedPath = "";
        for (const path of paths) {
          if (path.startsWith("/")) {
            resolvedPath = path;
          } else {
            resolvedPath = this._path.join(resolvedPath, path);
          }
        }
        return resolvedPath || "/";
      }, "resolve"),
      dirname: /* @__PURE__ */ __name((path) => {
        const parts = path.split("/");
        return parts.slice(0, -1).join("/") || "/";
      }, "dirname"),
      basename: /* @__PURE__ */ __name((path, ext) => {
        const base = path.split("/").pop() || "";
        return ext && base.endsWith(ext) ? base.slice(0, -ext.length) : base;
      }, "basename"),
      extname: /* @__PURE__ */ __name((path) => {
        const parts = path.split(".");
        return parts.length > 1 ? "." + parts.pop() : "";
      }, "extname"),
      relative: /* @__PURE__ */ __name((from, to) => {
        return to.replace(from, "").replace(/^\//, "");
      }, "relative"),
      normalize: /* @__PURE__ */ __name((path) => {
        return path.replace(/\/+/g, "/").replace(/\/$/, "") || "/";
      }, "normalize"),
      isAbsolute: /* @__PURE__ */ __name((path) => {
        return path.startsWith("/") || /^[a-zA-Z]:/.test(path);
      }, "isAbsolute"),
      parse: /* @__PURE__ */ __name((path) => {
        const ext = this._path.extname(path);
        const base = this._path.basename(path);
        const name = this._path.basename(path, ext);
        const dir = this._path.dirname(path);
        return { root: "/", dir, base, ext, name };
      }, "parse"),
      format: /* @__PURE__ */ __name((pathObject) => {
        return this._path.join(pathObject.dir || "", pathObject.base || "");
      }, "format"),
      sep: "/",
      delimiter: ":"
    };
  }
}, __name(_a53, "A_PathPolyfill"), _a53);
var _a54;
var A_UrlPolyfillBase = (_a54 = class {
  constructor(logger) {
    this.logger = logger;
    this._initialized = false;
  }
  get isInitialized() {
    return this._initialized;
  }
  async get() {
    if (!this._initialized) {
      await this.init();
    }
    return this._url;
  }
  async init() {
    try {
      await this.initImplementation();
      this._initialized = true;
    } catch (error) {
      this.logger.error("Failed to initialize url polyfill", error);
      throw error;
    }
  }
}, __name(_a54, "A_UrlPolyfillBase"), _a54);
var _a55;
var A_UrlPolyfill = (_a55 = class extends A_UrlPolyfillBase {
  constructor(logger) {
    super(logger);
  }
  async initImplementation() {
    this._url = {
      parse: /* @__PURE__ */ __name((urlString) => {
        try {
          const url = new URL(urlString);
          return {
            protocol: url.protocol,
            hostname: url.hostname,
            port: url.port,
            pathname: url.pathname,
            search: url.search,
            hash: url.hash,
            host: url.host,
            href: url.href
          };
        } catch {
          return {};
        }
      }, "parse"),
      format: /* @__PURE__ */ __name((urlObject) => {
        try {
          return new URL("", urlObject.href || `${urlObject.protocol}//${urlObject.host}${urlObject.pathname}${urlObject.search}${urlObject.hash}`).href;
        } catch {
          return "";
        }
      }, "format"),
      resolve: /* @__PURE__ */ __name((from, to) => {
        try {
          return new URL(to, from).href;
        } catch {
          return to;
        }
      }, "resolve"),
      URL: globalThis.URL,
      URLSearchParams: globalThis.URLSearchParams
    };
  }
}, __name(_a55, "A_UrlPolyfill"), _a55);
var _a56;
var A_BufferPolyfillBase = (_a56 = class {
  constructor(logger) {
    this.logger = logger;
    this._initialized = false;
  }
  get isInitialized() {
    return this._initialized;
  }
  async get() {
    if (!this._initialized) {
      await this.init();
    }
    return this._buffer;
  }
  async init() {
    try {
      await this.initImplementation();
      this._initialized = true;
    } catch (error) {
      this.logger.error("Failed to initialize buffer polyfill", error);
      throw error;
    }
  }
}, __name(_a56, "A_BufferPolyfillBase"), _a56);
var _a57;
var A_BufferPolyfill = (_a57 = class extends A_BufferPolyfillBase {
  constructor(logger) {
    super(logger);
  }
  async initImplementation() {
    this._buffer = {
      from: /* @__PURE__ */ __name((data, encoding) => {
        if (typeof data === "string") {
          return new TextEncoder().encode(data);
        }
        return new Uint8Array(data);
      }, "from"),
      alloc: /* @__PURE__ */ __name((size, fill) => {
        const buffer = new Uint8Array(size);
        if (fill !== void 0) {
          buffer.fill(fill);
        }
        return buffer;
      }, "alloc"),
      allocUnsafe: /* @__PURE__ */ __name((size) => {
        return new Uint8Array(size);
      }, "allocUnsafe"),
      isBuffer: /* @__PURE__ */ __name((obj) => {
        return obj instanceof Uint8Array || obj instanceof ArrayBuffer;
      }, "isBuffer"),
      concat: /* @__PURE__ */ __name((list, totalLength) => {
        const length = totalLength || list.reduce((sum, buf) => sum + buf.length, 0);
        const result = new Uint8Array(length);
        let offset = 0;
        for (const buf of list) {
          result.set(buf, offset);
          offset += buf.length;
        }
        return result;
      }, "concat")
    };
  }
}, __name(_a57, "A_BufferPolyfill"), _a57);
var _a58;
var A_ProcessPolyfillBase = (_a58 = class {
  constructor(logger) {
    this.logger = logger;
    this._initialized = false;
  }
  get isInitialized() {
    return this._initialized;
  }
  async get() {
    if (!this._initialized) {
      await this.init();
    }
    return this._process;
  }
  async init() {
    try {
      await this.initImplementation();
      this._initialized = true;
    } catch (error) {
      this.logger.error("Failed to initialize process polyfill", error);
      throw error;
    }
  }
}, __name(_a58, "A_ProcessPolyfillBase"), _a58);
var _a59;
var A_ProcessPolyfill = (_a59 = class extends A_ProcessPolyfillBase {
  constructor(logger) {
    super(logger);
  }
  async initImplementation() {
    this._process = {
      env: {
        NODE_ENV: "browser",
        ...globalThis.process?.env || {}
      },
      argv: ["browser"],
      platform: "browser",
      version: "browser",
      versions: { node: "browser" },
      cwd: /* @__PURE__ */ __name(() => "/", "cwd"),
      exit: /* @__PURE__ */ __name((code) => {
        this.logger.warning("process.exit not available in browser");
        throw new Error(`Process exit with code ${code}`);
      }, "exit"),
      nextTick: /* @__PURE__ */ __name((callback, ...args) => {
        setTimeout(() => callback(...args), 0);
      }, "nextTick")
    };
  }
}, __name(_a59, "A_ProcessPolyfill"), _a59);
var _a60;
var A_Polyfill = (_a60 = class extends w {
  constructor(logger) {
    super();
    this.logger = logger;
    this._initializing = null;
  }
  /**
   * Indicates whether the channel is connected
   */
  get ready() {
    if (!this._initialized) {
      this._initialized = this._loadInternal();
    }
    return this._initialized;
  }
  async load() {
    await this.ready;
  }
  async attachToWindow() {
    if (c.environment !== "browser") return;
    globalThis.A_Polyfill = this;
    globalThis.process = { env: { NODE_ENV: "production" }, cwd: /* @__PURE__ */ __name(() => "/", "cwd") };
    globalThis.__dirname = "/";
  }
  async _loadInternal() {
    this._fsPolyfill = new A_FSPolyfill(this.logger);
    this._cryptoPolyfill = new A_CryptoPolyfill(this.logger);
    this._httpPolyfill = new A_HttpPolyfill(this.logger);
    this._httpsPolyfill = new A_HttpsPolyfill(this.logger);
    this._pathPolyfill = new A_PathPolyfill(this.logger);
    this._urlPolyfill = new A_UrlPolyfill(this.logger);
    this._bufferPolyfill = new A_BufferPolyfill(this.logger);
    this._processPolyfill = new A_ProcessPolyfill(this.logger);
    await this._fsPolyfill.get();
    await this._cryptoPolyfill.get(await this._fsPolyfill.get());
    await this._httpPolyfill.get();
    await this._httpsPolyfill.get();
    await this._pathPolyfill.get();
    await this._urlPolyfill.get();
    await this._bufferPolyfill.get();
    await this._processPolyfill.get();
  }
  /**
   * Allows to use the 'fs' polyfill methods regardless of the environment
   * This method loads the 'fs' polyfill and returns its instance
   * 
   * @returns 
   */
  async fs() {
    await this.ready;
    return await this._fsPolyfill.get();
  }
  /**
   * Allows to use the 'crypto' polyfill methods regardless of the environment
   * This method loads the 'crypto' polyfill and returns its instance
   * 
   * @returns 
   */
  async crypto() {
    await this.ready;
    return await this._cryptoPolyfill.get();
  }
  /**
   * Allows to use the 'http' polyfill methods regardless of the environment
   * This method loads the 'http' polyfill and returns its instance
   * 
   * @returns 
   */
  async http() {
    await this.ready;
    return await this._httpPolyfill.get();
  }
  /**
   * Allows to use the 'https' polyfill methods regardless of the environment
   * This method loads the 'https' polyfill and returns its instance
   * 
   * @returns 
   */
  async https() {
    await this.ready;
    return await this._httpsPolyfill.get();
  }
  /**
   * Allows to use the 'path' polyfill methods regardless of the environment
   * This method loads the 'path' polyfill and returns its instance
   * 
   * @returns 
   */
  async path() {
    await this.ready;
    return await this._pathPolyfill.get();
  }
  /**
   * Allows to use the 'url' polyfill methods regardless of the environment
   * This method loads the 'url' polyfill and returns its instance
   * 
   * @returns 
   */
  async url() {
    await this.ready;
    return await this._urlPolyfill.get();
  }
  /**
   * Allows to use the 'buffer' polyfill methods regardless of the environment
   * This method loads the 'buffer' polyfill and returns its instance
   * 
   * @returns 
   */
  async buffer() {
    await this.ready;
    return await this._bufferPolyfill.get();
  }
  /**
   * Allows to use the 'process' polyfill methods regardless of the environment
   * This method loads the 'process' polyfill and returns its instance
   * 
   * @returns 
   */
  async process() {
    await this.ready;
    return await this._processPolyfill.get();
  }
}, __name(_a60, "A_Polyfill"), _a60);
__decorateClass2([
  Ee.Load()
], A_Polyfill.prototype, "load", 1);
__decorateClass2([
  Ee.Load()
], A_Polyfill.prototype, "attachToWindow", 1);
A_Polyfill = __decorateClass2([
  c2.Component({
    namespace: "A-Utils",
    name: "A-Polyfill",
    description: "Polyfill component that provides cross-environment compatibility for Node.js core modules such as fs, crypto, http, https, path, url, buffer, and process. It dynamically loads appropriate polyfills based on the execution environment (Node.js or browser), enabling seamless usage of these modules in different contexts."
  }),
  __decorateParam2(0, ve("A_Logger"))
], A_Polyfill);

// node_modules/@adaas/a-utils/dist/browser/chunk-TQ5UON22.mjs
var _a61;
var A_ExecutionContext = (_a61 = class extends R {
  constructor(name, defaults) {
    super({ name });
    this._meta = new d();
    for (const key in defaults) {
      this._meta.set(key, defaults[key]);
    }
  }
  [Symbol.iterator]() {
    return this._meta[Symbol.iterator]();
  }
  get meta() {
    return this._meta;
  }
  get(key) {
    return this._meta.get(key);
  }
  set(key, value) {
    this._meta.set(key, value);
    return this;
  }
  has(key) {
    return this._meta.has(key);
  }
  drop(key) {
    this._meta.delete(key);
  }
  clear() {
    this._meta.clear();
    return this;
  }
  toRaw() {
    return this._meta.toJSON();
  }
  toJSON() {
    return {
      name: this.name,
      ...this.meta.toJSON()
    };
  }
}, __name(_a61, "A_ExecutionContext"), _a61);
A_ExecutionContext = __decorateClass2([
  c2.Fragment({
    namespace: "A-Utils",
    name: "A-ExecutionContext",
    description: "Execution context fragment that provides a structured way to manage metadata and serialized data for execution environments. It allows storing and retrieving key-value pairs, facilitating context-aware operations within the application. It useful in cases when it's necessary to share some runtime data across multiple steps of thee features, or components."
  })
], A_ExecutionContext);

// node_modules/@adaas/a-utils/dist/browser/chunk-ECSGFDRQ.mjs
var A_CONSTANTS__CONFIG_ENV_VARIABLES_ARRAY = [];
var _a62;
var A_ConfigError = (_a62 = class extends y {
}, __name(_a62, "A_ConfigError"), _a62);
A_ConfigError.InitializationError = "A-Config Initialization Error";
var _a63;
var A_Config = (_a63 = class extends A_ExecutionContext {
  constructor(config) {
    super("a-config");
    this.DEFAULT_ALLOWED_TO_READ_PROPERTIES = [
      ...ne,
      ...A_CONSTANTS__CONFIG_ENV_VARIABLES_ARRAY
    ];
    this._strict = config.strict ?? false;
    this._configProperties = config.variables ?? [];
    for (const key in config.defaults) {
      this.set(
        g.toUpperSnakeCase(key),
        config.defaults[key]
      );
    }
  }
  get strict() {
    return this._strict;
  }
  /** 
    * This method is used to get the configuration property by name
    * 
    * @param property 
    * @returns 
    */
  get(property) {
    if (this._configProperties.includes(property) || this.DEFAULT_ALLOWED_TO_READ_PROPERTIES.includes(property) || !this._strict)
      return super.get(g.toUpperSnakeCase(property));
    throw new A_ConfigError("Property not exists or not allowed to read");
  }
  set(property, value) {
    const array = Array.isArray(property) ? property : typeof property === "string" ? [{ property, value }] : Object.keys(property).map((key) => ({
      property: key,
      value: property[key]
    }));
    for (const { property: property2, value: value2 } of array) {
      super.set(g.toUpperSnakeCase(property2), value2);
    }
  }
}, __name(_a63, "A_Config"), _a63);
A_Config = __decorateClass2([
  c2.Fragment({
    namespace: "A-Utils",
    name: "A-Config",
    description: "Configuration management context that provides structured access to application configuration variables, supporting defaults and strict mode for enhanced reliability. Default environment variables are included for comprehensive configuration handling."
  })
], A_Config);
var _a64;
var ConfigReader = (_a64 = class extends w {
  constructor(polyfill) {
    super();
    this.polyfill = polyfill;
    this.DEFAULT_ALLOWED_TO_READ_PROPERTIES = [
      ...ne,
      ...A_CONSTANTS__CONFIG_ENV_VARIABLES_ARRAY
    ];
  }
  async attachContext(container, context, config) {
    if (!config) {
      config = new A_Config({
        defaults: {}
      });
      container.scope.register(config);
    }
    config.set("A_CONCEPT_ROOT_FOLDER", O.A_CONCEPT_ROOT_FOLDER);
  }
  async initialize(config) {
    const data = await this.read();
    for (const key in data) {
      config.set(key, data[key]);
    }
  }
  /**
   * Get the configuration property by Name
   * @param property 
   */
  resolve(property) {
    return property;
  }
  /**
   * This method reads the configuration and sets the values to the context
   * 
   * @returns 
   */
  async read(variables = []) {
    return {};
  }
}, __name(_a64, "ConfigReader"), _a64);
__decorateClass2([
  Ee.Load(),
  __decorateParam2(0, ve(j)),
  __decorateParam2(1, ve(x)),
  __decorateParam2(2, ve(A_Config))
], ConfigReader.prototype, "attachContext", 1);
__decorateClass2([
  Ee.Load(),
  __decorateParam2(0, Y.Required()),
  __decorateParam2(0, ve(A_Config))
], ConfigReader.prototype, "initialize", 1);
ConfigReader = __decorateClass2([
  c2.Component({
    namespace: "A-Utils",
    name: "ConfigReader",
    description: "Abstract component for reading configuration data from various sources such as files, environment variables, or remote services. This component can be extended to implement specific configuration reading strategies."
  }),
  __decorateParam2(0, Y.Required()),
  __decorateParam2(0, ve(A_Polyfill))
], ConfigReader);
var _a65;
var FileConfigReader = (_a65 = class extends ConfigReader {
  constructor() {
    super(...arguments);
    this.FileData = /* @__PURE__ */ new Map();
  }
  /**
   * Get the configuration property Name
   * @param property 
   */
  getConfigurationProperty_File_Alias(property) {
    return g.toCamelCase(property);
  }
  resolve(property) {
    return this.FileData.get(this.getConfigurationProperty_File_Alias(property));
  }
  async read(variables) {
    const fs = await this.polyfill.fs();
    try {
      const data = fs.readFileSync(`${c.concept}.conf.json`, "utf8");
      const config = JSON.parse(data);
      this.FileData = new Map(Object.entries(config));
      return config;
    } catch (error) {
      return {};
    }
  }
}, __name(_a65, "FileConfigReader"), _a65);
FileConfigReader = __decorateClass2([
  c2.Component({
    namespace: "A-Utils",
    name: "FileConfigReader",
    description: "Configuration reader that loads configuration data from a JSON file located in the application root directory. It reads the file named after the current concept with a .conf.json extension and parses its contents into the configuration context."
  })
], FileConfigReader);
var _a66;
var ENVConfigReader = (_a66 = class extends ConfigReader {
  async readEnvFile(config, polyfill, feature) {
    const fs = await polyfill.fs();
    if (fs.existsSync(".env"))
      fs.readFileSync(`${config.get("A_CONCEPT_ROOT_FOLDER")}/.env`, "utf-8").split("\n").forEach((line) => {
        const [key, value] = line.split("=");
        if (key && value) {
          O.set(key.trim(), value.trim());
        }
      });
  }
  /**
   * Get the configuration property Name 
   * @param property 
   */
  getConfigurationProperty_ENV_Alias(property) {
    return g.toUpperSnakeCase(property);
  }
  resolve(property) {
    return O.get(this.getConfigurationProperty_ENV_Alias(property));
  }
  async read(variables = []) {
    const allVariables = [
      ...variables,
      ...O.getAllKeys()
    ];
    const config = {};
    allVariables.forEach((variable) => {
      config[variable] = this.resolve(variable);
    });
    return config;
  }
}, __name(_a66, "ENVConfigReader"), _a66);
__decorateClass2([
  Ee.Load({
    before: ["ENVConfigReader.initialize"]
  }),
  __decorateParam2(0, ve(A_Config)),
  __decorateParam2(1, ve(A_Polyfill)),
  __decorateParam2(2, ve(I))
], ENVConfigReader.prototype, "readEnvFile", 1);
ENVConfigReader = __decorateClass2([
  c2.Component({
    namespace: "A-Utils",
    name: "ENVConfigReader",
    description: "Configuration reader that sources configuration data from environment variables. It supports loading variables from a .env file and maps them to the configuration context, making it suitable for applications running in diverse environments such as local development, staging, and production."
  })
], ENVConfigReader);
var _a67;
var A_ConfigLoader = (_a67 = class extends j {
  async prepare(polyfill) {
    if (!this.scope.has(A_Config)) {
      const newConfig = new A_Config({
        variables: [
          ...ne,
          ...A_CONSTANTS__CONFIG_ENV_VARIABLES_ARRAY
        ],
        defaults: {}
      });
      this.scope.register(newConfig);
    }
    const fs = await polyfill.fs();
    try {
      switch (true) {
        case (c.environment === "server" && !!fs.existsSync(`${c.concept}.conf.json`)):
          this.reader = this.scope.resolve(FileConfigReader);
          break;
        case (c.environment === "server" && !fs.existsSync(`${c.concept}.conf.json`)):
          this.reader = this.scope.resolve(ENVConfigReader);
          break;
        case c.environment === "browser":
          this.reader = this.scope.resolve(ENVConfigReader);
          break;
        default:
          throw new A_ConfigError(
            A_ConfigError.InitializationError,
            `Environment ${c.environment} is not supported`
          );
      }
    } catch (error) {
      if (error instanceof E) {
        throw new A_ConfigError({
          title: A_ConfigError.InitializationError,
          description: `Failed to initialize A_ConfigLoader. Reader not found for environment ${c.environment}`,
          originalError: error
        });
      }
    }
  }
}, __name(_a67, "A_ConfigLoader"), _a67);
__decorateClass2([
  Ee.Load({
    before: /.*/
  }),
  __decorateParam2(0, ve(A_Polyfill))
], A_ConfigLoader.prototype, "prepare", 1);
A_ConfigLoader = __decorateClass2([
  c2.Container({
    namespace: "A-Utils",
    name: "A-ConfigLoader",
    description: "Container responsible for loading and initializing the A_Config component based on the environment and available configuration sources. It can be useful for application that need a separated configuration management and sharable across multiple containers."
  })
], A_ConfigLoader);

// node_modules/@adaas/a-utils/dist/browser/chunk-TK5UEYMZ.mjs
var A_LOGGER_DEFAULT_SCOPE_LENGTH = 20;
var A_LOGGER_COLORS = {
  // System colors (reserved for specific purposes)
  red: "31",
  // Errors, critical issues
  yellow: "33",
  // Warnings, caution messages
  green: "32",
  // Success, completion messages
  // Safe palette for random selection (grey-blue-violet theme)
  blue: "34",
  // Info, general messages
  cyan: "36",
  // Headers, titles
  magenta: "35",
  // Special highlighting
  gray: "90",
  // Debug, less important info
  brightBlue: "94",
  // Bright blue variant
  brightCyan: "96",
  // Bright cyan variant
  brightMagenta: "95",
  // Bright magenta variant
  darkGray: "30",
  // Dark gray
  lightGray: "37",
  // Light gray (white)
  // Extended blue-violet palette
  indigo: "38;5;54",
  // Deep indigo
  violet: "38;5;93",
  // Violet
  purple: "38;5;129",
  // Purple
  lavender: "38;5;183",
  // Lavender
  skyBlue: "38;5;117",
  // Sky blue
  steelBlue: "38;5;67",
  // Steel blue
  slateBlue: "38;5;62",
  // Slate blue
  deepBlue: "38;5;18",
  // Deep blue
  lightBlue: "38;5;153",
  // Light blue
  periwinkle: "38;5;111",
  // Periwinkle
  cornflower: "38;5;69",
  // Cornflower blue
  powder: "38;5;152",
  // Powder blue
  // Additional grays for variety
  charcoal: "38;5;236",
  // Charcoal
  silver: "38;5;250",
  // Silver
  smoke: "38;5;244",
  // Smoke gray
  slate: "38;5;240"
  // Slate gray
};
var A_LOGGER_SAFE_RANDOM_COLORS = [
  "blue",
  "cyan",
  "magenta",
  "gray",
  "brightBlue",
  "brightCyan",
  "brightMagenta",
  "darkGray",
  "lightGray",
  "indigo",
  "violet",
  "purple",
  "lavender",
  "skyBlue",
  "steelBlue",
  "slateBlue",
  "deepBlue",
  "lightBlue",
  "periwinkle",
  "cornflower",
  "powder",
  "charcoal",
  "silver",
  "smoke",
  "slate"
];
var A_LOGGER_ANSI = {
  RESET: "\x1B[0m",
  PREFIX: "\x1B[",
  SUFFIX: "m"
};
var A_LOGGER_TIME_FORMAT = {
  MINUTES_PAD: 2,
  SECONDS_PAD: 2,
  MILLISECONDS_PAD: 3,
  SEPARATOR: ":"
};
var A_LOGGER_FORMAT = {
  SCOPE_OPEN: "[",
  SCOPE_CLOSE: "]",
  TIME_OPEN: "|",
  TIME_CLOSE: "|",
  SEPARATOR: "-------------------------------",
  INDENT_BASE: 3,
  PIPE: "| "
};
var A_LOGGER_TERMINAL = {
  DEFAULT_WIDTH: 80,
  // Default terminal width when can't be detected
  MIN_WIDTH: 40,
  // Minimum width for formatted output
  MAX_LINE_LENGTH_RATIO: 0.8,
  // Use 80% of terminal width for content
  BROWSER_DEFAULT_WIDTH: 120
  // Default width for browser console
};
var A_LOGGER_ENV_KEYS = {
  LOG_LEVEL: "A_LOGGER_LEVEL",
  DEFAULT_SCOPE_LENGTH: "A_LOGGER_DEFAULT_SCOPE_LENGTH",
  DEFAULT_SCOPE_COLOR: "A_LOGGER_DEFAULT_SCOPE_COLOR",
  DEFAULT_LOG_COLOR: "A_LOGGER_DEFAULT_LOG_COLOR"
};
var _a68;
var A_Logger = (_a68 = class extends w {
  // =============================================
  // Constructor and Initialization
  // =============================
  /**
   * Initialize A_Logger with dependency injection
   * Colors are configured through A_Config or generated randomly if not provided
   * 
   * @param scope - The current scope context for message prefixing
   * @param config - Optional configuration for log level filtering and color settings
   */
  constructor(scope, config) {
    super();
    this.scope = scope;
    this.config = config;
    this.COLORS = A_LOGGER_COLORS;
    this.STANDARD_SCOPE_LENGTH = config?.get(A_LOGGER_ENV_KEYS.DEFAULT_SCOPE_LENGTH) || A_LOGGER_DEFAULT_SCOPE_LENGTH;
    const configScopeColor = config?.get(A_LOGGER_ENV_KEYS.DEFAULT_SCOPE_COLOR);
    const configLogColor = config?.get(A_LOGGER_ENV_KEYS.DEFAULT_LOG_COLOR);
    if (configScopeColor || configLogColor) {
      this.DEFAULT_SCOPE_COLOR = configScopeColor || this.generateColorFromScopeName(this.scope.name);
      this.DEFAULT_LOG_COLOR = configLogColor || this.generateColorFromScopeName(this.scope.name);
    } else {
      const complementaryColors = this.generateComplementaryColorsFromScope(this.scope.name);
      this.DEFAULT_SCOPE_COLOR = complementaryColors.scopeColor;
      this.DEFAULT_LOG_COLOR = complementaryColors.logColor;
    }
    this.TERMINAL_WIDTH = this.detectTerminalWidth();
    this.MAX_CONTENT_WIDTH = Math.floor(this.TERMINAL_WIDTH * A_LOGGER_TERMINAL.MAX_LINE_LENGTH_RATIO);
  }
  // =============================================
  // Color Generation Utilities
  // =============================================
  /**
   * Generate a simple hash from a string
   * Used to create deterministic color selection based on scope name
   * 
   * @param str - The string to hash
   * @returns A numeric hash value
   */
  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }
  /**
   * Generate a deterministic color based on scope name
   * Same scope names will always get the same color, but uses safe color palette
   * 
   * @param scopeName - The scope name to generate color for
   * @returns A color key from the safe colors palette
   */
  generateColorFromScopeName(scopeName) {
    const safeColors = A_LOGGER_SAFE_RANDOM_COLORS;
    const hash = this.simpleHash(scopeName);
    const colorIndex = hash % safeColors.length;
    return safeColors[colorIndex];
  }
  /**
   * Generate a pair of complementary colors based on scope name
   * Ensures visual harmony between scope and message colors while being deterministic
   * 
   * @param scopeName - The scope name to base colors on
   * @returns Object with scopeColor and logColor that work well together
   */
  generateComplementaryColorsFromScope(scopeName) {
    const colorPairs = [
      { scopeColor: "indigo", logColor: "lightBlue" },
      { scopeColor: "deepBlue", logColor: "cyan" },
      { scopeColor: "purple", logColor: "lavender" },
      { scopeColor: "steelBlue", logColor: "skyBlue" },
      { scopeColor: "slateBlue", logColor: "periwinkle" },
      { scopeColor: "charcoal", logColor: "silver" },
      { scopeColor: "violet", logColor: "brightMagenta" },
      { scopeColor: "darkGray", logColor: "lightGray" },
      { scopeColor: "cornflower", logColor: "powder" },
      { scopeColor: "slate", logColor: "smoke" }
    ];
    const hash = this.simpleHash(scopeName);
    const pairIndex = hash % colorPairs.length;
    return colorPairs[pairIndex];
  }
  // =============================================
  // Terminal Width Detection
  // =============================================
  /**
   * Detect current terminal width based on environment
   * 
   * Returns appropriate width for different environments:
   * - Node.js: Uses process.stdout.columns if available
   * - Browser: Returns browser default width
   * - Fallback: Returns default terminal width
   * 
   * @returns Terminal width in characters
   */
  detectTerminalWidth() {
    try {
      if (c.environment === "browser") {
        return A_LOGGER_TERMINAL.BROWSER_DEFAULT_WIDTH;
      }
      if (typeof process !== "undefined" && process.stdout && process.stdout.columns) {
        const cols = process.stdout.columns;
        return Math.max(cols, A_LOGGER_TERMINAL.MIN_WIDTH);
      }
      return A_LOGGER_TERMINAL.DEFAULT_WIDTH;
    } catch (error) {
      return A_LOGGER_TERMINAL.DEFAULT_WIDTH;
    }
  }
  /**
   * Wrap text to fit within terminal width while preserving formatting
   * 
   * @param text - Text to wrap
   * @param scopePadding - The scope padding string for alignment
   * @param isFirstLine - Whether this is the first line (affects available width calculation)
   * @returns Array of wrapped lines with proper indentation
   */
  wrapText(text, scopePadding, isFirstLine = true) {
    if (c.environment === "browser") {
      return [text];
    }
    const scopeHeaderLength = this.formattedScope.length + 4 + this.getTime().length + 4;
    const continuationIndent = `${scopePadding}${A_LOGGER_FORMAT.PIPE}`;
    const firstLineMaxWidth = Math.max(this.TERMINAL_WIDTH - scopeHeaderLength - 1, 20);
    const continuationMaxWidth = Math.max(this.TERMINAL_WIDTH - continuationIndent.length, 20);
    if (isFirstLine && text.length <= firstLineMaxWidth) {
      return [text];
    }
    const lines = [];
    const words = text.split(" ");
    let currentLine = "";
    let currentMaxWidth = isFirstLine ? firstLineMaxWidth : continuationMaxWidth;
    for (const word of words) {
      const spaceNeeded = currentLine ? 1 : 0;
      const totalLength = currentLine.length + spaceNeeded + word.length;
      if (totalLength > currentMaxWidth) {
        if (currentLine) {
          lines.push(currentLine);
          currentLine = word;
          currentMaxWidth = continuationMaxWidth;
        } else {
          if (word.length > currentMaxWidth) {
            const chunks = this.splitLongWord(word, currentMaxWidth);
            lines.push(...chunks.slice(0, -1));
            currentLine = chunks[chunks.length - 1];
          } else {
            currentLine = word;
          }
          currentMaxWidth = continuationMaxWidth;
        }
      } else {
        currentLine += (currentLine ? " " : "") + word;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
    return lines.length ? lines : [text];
  }
  /**
   * Split a long word that doesn't fit on a single line
   * 
   * @param word - Word to split
   * @param maxLength - Maximum length per chunk
   * @returns Array of word chunks
   */
  splitLongWord(word, maxLength) {
    const chunks = [];
    for (let i = 0; i < word.length; i += maxLength) {
      chunks.push(word.slice(i, i + maxLength));
    }
    return chunks;
  }
  // =============================================
  // Factory Methods
  // =============================
  // =============================================
  // Scope and Formatting Utilities
  // =============================================
  /**
   * Get the formatted scope length for consistent message alignment
   * Uses a standard length to ensure all messages align properly regardless of scope name
   * 
   * @returns The scope length to use for padding calculations
   */
  get scopeLength() {
    return Math.max(this.scope.name.length, this.STANDARD_SCOPE_LENGTH);
  }
  /**
   * Get the formatted scope name with proper padding, centered within the container
   * Ensures consistent width for all scope names in log output with centered alignment
   * 
   * @returns Centered and padded scope name for consistent formatting
   */
  get formattedScope() {
    const scopeName = this.scope.name;
    const totalLength = this.STANDARD_SCOPE_LENGTH;
    if (scopeName.length >= totalLength) {
      return scopeName.substring(0, totalLength);
    }
    const totalPadding = totalLength - scopeName.length;
    const leftPadding = Math.floor(totalPadding / 2);
    const rightPadding = totalPadding - leftPadding;
    return " ".repeat(leftPadding) + scopeName + " ".repeat(rightPadding);
  }
  // =============================================
  // Message Compilation and Formatting
  // =============================================
  /**
   * Compile log arguments into formatted console output with colors and proper alignment
   * 
   * This method handles the core formatting logic for all log messages:
   * - Applies separate colors for scope and message content
   * - Formats scope names with consistent padding
   * - Handles different data types appropriately
   * - Maintains proper indentation for multi-line content
   * 
   * @param messageColor - The color key to apply to the message content
   * @param args - Variable arguments to format and display
   * @returns Array of formatted strings and/or objects ready for console output
   */
  compile(messageColor, ...args) {
    const timeString = this.getTime();
    const scopePadding = " ".repeat(this.STANDARD_SCOPE_LENGTH + 3);
    const isMultiArg = args.length > 1;
    return [
      // Header with separate colors for scope and message content
      `${A_LOGGER_ANSI.PREFIX}${this.COLORS[this.DEFAULT_SCOPE_COLOR]}${A_LOGGER_ANSI.SUFFIX}${A_LOGGER_FORMAT.SCOPE_OPEN}${this.formattedScope}${A_LOGGER_FORMAT.SCOPE_CLOSE}${A_LOGGER_ANSI.RESET} ${A_LOGGER_ANSI.PREFIX}${this.COLORS[messageColor]}${A_LOGGER_ANSI.SUFFIX}${A_LOGGER_FORMAT.TIME_OPEN}${timeString}${A_LOGGER_FORMAT.TIME_CLOSE}`,
      // Top separator for multi-argument messages
      isMultiArg ? `
${scopePadding}${A_LOGGER_FORMAT.TIME_OPEN}${A_LOGGER_FORMAT.SEPARATOR}` : "",
      // Process each argument with appropriate formatting
      ...args.map((arg, i) => {
        const shouldAddNewline = i > 0 || isMultiArg;
        switch (true) {
          case arg instanceof y:
            return this.compile_A_Error(arg);
          case arg instanceof Error:
            return this.compile_Error(arg);
          case (typeof arg === "object" && arg !== null):
            return this.formatObject(arg, shouldAddNewline, scopePadding);
          default:
            return this.formatString(String(arg), shouldAddNewline, scopePadding);
        }
      }),
      // Bottom separator and color reset
      isMultiArg ? `
${scopePadding}${A_LOGGER_FORMAT.TIME_OPEN}${A_LOGGER_FORMAT.SEPARATOR}${A_LOGGER_ANSI.RESET}` : A_LOGGER_ANSI.RESET
    ];
  }
  /**
   * Format an object for display with proper JSON indentation and terminal width awareness
   * 
   * @param obj - The object to format
   * @param shouldAddNewline - Whether to add a newline prefix
   * @param scopePadding - The padding string for consistent alignment
   * @returns Formatted object string or the object itself for browser environments
   */
  formatObject(obj, shouldAddNewline, scopePadding) {
    if (c.environment === "browser") {
      return obj;
    }
    if (obj === null) {
      return shouldAddNewline ? `
${scopePadding}${A_LOGGER_FORMAT.PIPE}null` : "null";
    }
    if (obj === void 0) {
      return shouldAddNewline ? `
${scopePadding}${A_LOGGER_FORMAT.PIPE}undefined` : "undefined";
    }
    let jsonString;
    try {
      jsonString = JSON.stringify(obj, null, 2);
    } catch (error) {
      try {
        const seen = /* @__PURE__ */ new WeakSet();
        jsonString = JSON.stringify(obj, (key, value) => {
          if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
              return "[Circular Reference]";
            }
            seen.add(value);
          }
          return value;
        }, 2);
      } catch (fallbackError) {
        jsonString = String(obj);
      }
    }
    const continuationIndent = `${scopePadding}${A_LOGGER_FORMAT.PIPE}`;
    const maxJsonLineWidth = this.TERMINAL_WIDTH - continuationIndent.length - 4;
    const lines = jsonString.split("\n").map((line) => {
      const stringValueMatch = line.match(/^(\s*"[^"]+":\s*")([^"]+)(".*)?$/);
      if (stringValueMatch && stringValueMatch[2].length > maxJsonLineWidth - stringValueMatch[1].length - (stringValueMatch[3] || "").length) {
        const [, prefix, value, suffix = ""] = stringValueMatch;
        if (value.length > maxJsonLineWidth - prefix.length - suffix.length) {
          const wrappedValue = this.wrapJsonStringValue(value, maxJsonLineWidth - prefix.length - suffix.length);
          return prefix + wrappedValue + suffix;
        }
      }
      return line;
    });
    const formatted = lines.join("\n" + continuationIndent);
    return shouldAddNewline ? "\n" + continuationIndent + formatted : formatted;
  }
  /**
   * Wrap a long JSON string value while preserving readability
   * 
   * @param value - The string value to wrap
   * @param maxWidth - Maximum width for the value
   * @returns Wrapped string value
   */
  wrapJsonStringValue(value, maxWidth) {
    if (value.length <= maxWidth) {
      return value;
    }
    if (maxWidth > 6) {
      return value.substring(0, maxWidth - 3) + "...";
    } else {
      return value.substring(0, Math.max(1, maxWidth));
    }
  }
  /**
   * Format a string for display with proper indentation and terminal width wrapping
   * 
   * @param str - The string to format
   * @param shouldAddNewline - Whether to add a newline prefix
   * @param scopePadding - The padding string for consistent alignment
   * @returns Formatted string
   */
  formatString(str, shouldAddNewline, scopePadding) {
    if (c.environment === "browser") {
      const prefix = shouldAddNewline ? "\n" : "";
      return (prefix + str).replace(/\n/g, `
${scopePadding}${A_LOGGER_FORMAT.PIPE}`);
    }
    const wrappedLines = this.wrapText(str, scopePadding, !shouldAddNewline);
    const continuationIndent = `${scopePadding}${A_LOGGER_FORMAT.PIPE}`;
    const formattedLines = wrappedLines.map((line, index) => {
      if (index === 0 && !shouldAddNewline) {
        return line;
      } else {
        return `${continuationIndent}${line}`;
      }
    });
    if (shouldAddNewline) {
      return "\n" + formattedLines.join("\n");
    } else {
      return formattedLines.join("\n");
    }
  }
  // =============================================
  // Log Level Management
  // =============================================
  /**
   * Determine if a log message should be output based on configured log level
   * 
   * Log level hierarchy:
   * - debug: Shows all messages (debug, info, warning, error)
   * - info: Shows info, warning, and error messages
   * - warn: Shows warning and error messages only
   * - error: Shows error messages only
   * - all: Shows all messages (alias for debug)
   * 
   * @param logMethod - The type of log method being called
   * @returns True if the message should be logged, false otherwise
   */
  shouldLog(logMethod) {
    const shouldLog = this.config?.get(A_LOGGER_ENV_KEYS.LOG_LEVEL) || "info";
    switch (shouldLog) {
      case "debug":
        return true;
      case "info":
        return logMethod === "info" || logMethod === "warning" || logMethod === "error";
      case "warn":
        return logMethod === "warning" || logMethod === "error";
      case "error":
        return logMethod === "error";
      case "all":
        return true;
      default:
        return false;
    }
  }
  debug(param1, ...args) {
    if (!this.shouldLog("debug")) return;
    if (typeof param1 === "string" && this.COLORS[param1]) {
      console.log(...this.compile(param1, ...args));
    } else {
      console.log(...this.compile(this.DEFAULT_LOG_COLOR, param1, ...args));
    }
  }
  info(param1, ...args) {
    if (!this.shouldLog("info")) return;
    if (typeof param1 === "string" && this.COLORS[param1]) {
      console.log(...this.compile(param1, ...args));
    } else {
      console.log(...this.compile(this.DEFAULT_LOG_COLOR, param1, ...args));
    }
  }
  log(param1, ...args) {
    this.info(param1, ...args);
  }
  /**
   * Log warning messages with yellow color coding
   * 
   * Use for non-critical issues that should be brought to attention
   * but don't prevent normal operation
   * 
   * @param args - Arguments to log as warnings
   * 
   * @example
   * ```typescript
   * logger.warning('Deprecated method used');
   * logger.warning('Rate limit approaching:', { current: 95, limit: 100 });
   * ```
   */
  warning(...args) {
    if (!this.shouldLog("warning")) return;
    console.log(...this.compile("yellow", ...args));
  }
  /**
   * Log error messages with red color coding
   * 
   * Use for critical issues, exceptions, and failures that need immediate attention
   * 
   * @param args - Arguments to log as errors
   * @returns void (for compatibility with console.log)
   * 
   * @example
   * ```typescript
   * logger.error('Database connection failed');
   * logger.error(new Error('Validation failed'));
   * logger.error('Critical error:', error, { context: 'user-registration' });
   * ```
   */
  error(...args) {
    if (!this.shouldLog("error")) return;
    console.log(...this.compile("red", ...args));
  }
  // =============================================
  // Specialized Error Formatting
  // =============================================
  /**
   * Legacy method for A_Error logging (kept for backward compatibility)
   * 
   * @deprecated Use error() method instead which handles A_Error automatically
   * @param error - The A_Error instance to log
   */
  log_A_Error(error) {
    const time = this.getTime();
    const scopePadding = " ".repeat(this.STANDARD_SCOPE_LENGTH + 3);
    console.log(`\x1B[31m[${this.formattedScope}] |${time}| ERROR ${error.code}
${scopePadding}| ${error.message}
${scopePadding}| ${error.description} 
${scopePadding}|-------------------------------
${scopePadding}| ${error.stack?.split("\n").map((line, index) => index === 0 ? line : `${scopePadding}| ${line}`).join("\n") || "No stack trace"}
${scopePadding}|-------------------------------
\x1B[0m` + (error.originalError ? `\x1B[31m${scopePadding}| Wrapped From  ${error.originalError.message}
${scopePadding}|-------------------------------
${scopePadding}| ${error.originalError.stack?.split("\n").map((line, index) => index === 0 ? line : `${scopePadding}| ${line}`).join("\n") || "No stack trace"}
${scopePadding}|-------------------------------
\x1B[0m` : "") + (error.link ? `\x1B[31m${scopePadding}| Read in docs: ${error.link}
${scopePadding}|-------------------------------
\x1B[0m` : ""));
  }
  /**
   * Format A_Error instances for inline display within compiled messages
   * 
   * Provides detailed formatting for A_Error objects with:
   * - Error code, message, and description
   * - Original error information FIRST (better UX for debugging)
   * - Stack traces with terminal width awareness
   * - Documentation links (if available)
   * - Consistent formatting with rest of logger
   * 
   * @param error - The A_Error instance to format
   * @returns Formatted string ready for display
   */
  compile_A_Error(error) {
    const continuationIndent = `${" ".repeat(this.STANDARD_SCOPE_LENGTH + 3)}${A_LOGGER_FORMAT.PIPE}`;
    const separator = `${continuationIndent}-------------------------------`;
    const lines = [];
    lines.push("");
    lines.push(separator);
    lines.push(`${continuationIndent}A_ERROR: ${error.code}`);
    lines.push(separator);
    const errorMessage = this.wrapText(`Message: ${error.message}`, continuationIndent, false);
    const errorDescription = this.wrapText(`Description: ${error.description}`, continuationIndent, false);
    lines.push(...errorMessage.map((line) => `${continuationIndent}${line}`));
    lines.push(...errorDescription.map((line) => `${continuationIndent}${line}`));
    if (error.originalError) {
      lines.push(separator);
      lines.push(`${continuationIndent}ORIGINAL ERROR:`);
      lines.push(separator);
      const originalMessage = this.wrapText(`${error.originalError.name}: ${error.originalError.message}`, continuationIndent, false);
      lines.push(...originalMessage.map((line) => `${continuationIndent}${line}`));
      if (error.originalError.stack) {
        lines.push(`${continuationIndent}Stack trace:`);
        const stackLines = this.formatStackTrace(error.originalError.stack, continuationIndent);
        lines.push(...stackLines);
      }
    }
    if (error.stack) {
      lines.push(separator);
      lines.push(`${continuationIndent}A_ERROR STACK:`);
      lines.push(separator);
      const stackLines = this.formatStackTrace(error.stack, continuationIndent);
      lines.push(...stackLines);
    }
    if (error.link) {
      lines.push(separator);
      const linkText = this.wrapText(`Documentation: ${error.link}`, continuationIndent, false);
      lines.push(...linkText.map((line) => `${continuationIndent}${line}`));
    }
    lines.push(separator);
    return lines.join("\n");
  }
  /**
   * Format stack trace with proper terminal width wrapping and indentation
   * 
   * @param stack - The stack trace string
   * @param baseIndent - Base indentation for continuation lines
   * @returns Array of formatted stack trace lines
   */
  formatStackTrace(stack, baseIndent) {
    const stackLines = stack.split("\n");
    const formatted = [];
    stackLines.forEach((line, index) => {
      if (line.trim()) {
        const stackIndent = index === 0 ? baseIndent : `${baseIndent}  `;
        const wrappedLines = this.wrapText(line.trim(), stackIndent, false);
        formatted.push(...wrappedLines.map(
          (wrappedLine) => index === 0 && wrappedLine === wrappedLines[0] ? `${baseIndent}${wrappedLine}` : `${baseIndent}  ${wrappedLine}`
        ));
      }
    });
    return formatted;
  }
  /**
   * Format standard Error instances for inline display within compiled messages
   * 
   * Provides clean, readable formatting for standard JavaScript errors with:
   * - Terminal width aware message wrapping
   * - Properly formatted stack traces
   * - Consistent indentation with rest of logger
   * 
   * @param error - The Error instance to format
   * @returns Formatted string ready for display
   */
  compile_Error(error) {
    const continuationIndent = `${" ".repeat(this.STANDARD_SCOPE_LENGTH + 3)}${A_LOGGER_FORMAT.PIPE}`;
    const separator = `${continuationIndent}-------------------------------`;
    const lines = [];
    lines.push("");
    lines.push(separator);
    lines.push(`${continuationIndent}ERROR: ${error.name}`);
    lines.push(separator);
    const errorMessage = this.wrapText(`Message: ${error.message}`, continuationIndent, false);
    lines.push(...errorMessage.map((line) => `${continuationIndent}${line}`));
    if (error.stack) {
      lines.push(separator);
      lines.push(`${continuationIndent}STACK TRACE:`);
      lines.push(separator);
      const stackLines = this.formatStackTrace(error.stack, continuationIndent);
      lines.push(...stackLines);
    }
    lines.push(separator);
    return lines.join("\n");
  }
  // =============================================
  // Utility Methods
  // =============================================
  /**
   * Generate timestamp string for log messages
   * 
   * Format: MM:SS:mmm (minutes:seconds:milliseconds)
   * This provides sufficient precision for debugging while remaining readable
   * 
   * @returns Formatted timestamp string
   * 
   * @example
   * Returns: "15:42:137" for 3:42:15 PM and 137 milliseconds
   */
  getTime() {
    const now = /* @__PURE__ */ new Date();
    const minutes = String(now.getMinutes()).padStart(A_LOGGER_TIME_FORMAT.MINUTES_PAD, "0");
    const seconds = String(now.getSeconds()).padStart(A_LOGGER_TIME_FORMAT.SECONDS_PAD, "0");
    const milliseconds = String(now.getMilliseconds()).padStart(A_LOGGER_TIME_FORMAT.MILLISECONDS_PAD, "0");
    return `${minutes}${A_LOGGER_TIME_FORMAT.SEPARATOR}${seconds}${A_LOGGER_TIME_FORMAT.SEPARATOR}${milliseconds}`;
  }
}, __name(_a68, "A_Logger"), _a68);
A_Logger = __decorateClass2([
  c2.Component({
    namespace: "A-Utils",
    name: "A_Logger",
    description: "Advanced Logging Component with Scope-based Output Formatting that provides color-coded console output, multi-type support, and configurable log levels for enhanced debugging and monitoring."
  }),
  __decorateParam2(0, ve(x)),
  __decorateParam2(1, ve(A_Config))
], A_Logger);
var A_LoggerEnvVariables = {
  /**
   * Sets the log level for the logger
   * 
   * @example 'debug', 'info', 'warn', 'error'
   */
  A_LOGGER_LEVEL: "A_LOGGER_LEVEL",
  /**     
   * Sets the default scope length for log messages
   * 
   * @example 'A_LOGGER_DEFAULT_SCOPE_LENGTH'
   */
  A_LOGGER_DEFAULT_SCOPE_LENGTH: "A_LOGGER_DEFAULT_SCOPE_LENGTH",
  /**
   * Sets the default color for scope display in log messages
   * 
   * @example 'green', 'blue', 'red', 'yellow', 'gray', 'magenta', 'cyan', 'white', 'pink'
   */
  A_LOGGER_DEFAULT_SCOPE_COLOR: "A_LOGGER_DEFAULT_SCOPE_COLOR",
  /**
   * Sets the default color for log message content
   * 
   * @example 'green', 'blue', 'red', 'yellow', 'gray', 'magenta', 'cyan', 'white', 'pink'
   */
  A_LOGGER_DEFAULT_LOG_COLOR: "A_LOGGER_DEFAULT_LOG_COLOR"
};
var A_LoggerEnvVariablesArray = [
  A_LoggerEnvVariables.A_LOGGER_LEVEL,
  A_LoggerEnvVariables.A_LOGGER_DEFAULT_SCOPE_LENGTH,
  A_LoggerEnvVariables.A_LOGGER_DEFAULT_SCOPE_COLOR,
  A_LoggerEnvVariables.A_LOGGER_DEFAULT_LOG_COLOR
];

// src/lib/AreComponent/Are.component.ts
var Are = class extends w {
  //==================================================================================
  //======================== LIFECYCLE DECORATORS ====================================
  //==================================================================================
  static get EventHandler() {
    return (target, propertyKey, descriptor) => {
      return I.Extend({
        name: propertyKey,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onBeforeLoad() {
    return (target, propertyKey, descriptor) => {
      return I.Extend({
        name: "_Are_onBeforeLoad" /* onBeforeLoad */,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onAfterLoad() {
    return (target, propertyKey, descriptor) => {
      return I.Extend({
        name: "_Are_onAfterLoad" /* onAfterLoad */,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onBeforeCompile() {
    return (target, propertyKey, descriptor) => {
      return I.Extend({
        name: "_Are_onBeforeCompile" /* onBeforeCompile */,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onAfterCompile() {
    return (target, propertyKey, descriptor) => {
      return I.Extend({
        name: "_Are_onAfterCompile" /* onAfterCompile */,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onBeforeMount() {
    return (target, propertyKey, descriptor) => {
      return I.Extend({
        name: "_Are_onBeforeMount" /* onBeforeMount */,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onAfterMount() {
    return (target, propertyKey, descriptor) => {
      return I.Extend({
        name: "_Are_onAfterMount" /* onAfterMount */,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onBeforeUnmount() {
    return (target, propertyKey, descriptor) => {
      return I.Extend({
        name: "_Are_onBeforeUnmount" /* onBeforeUnmount */,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onAfterUnmount() {
    return (target, propertyKey, descriptor) => {
      return I.Extend({
        name: "_Are_onAfterUnmount" /* onAfterUnmount */,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onBeforeUpdate() {
    return (target, propertyKey, descriptor) => {
      return I.Extend({
        name: "_Are_onBeforeUpdate" /* onBeforeUpdate */,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onAfterUpdate() {
    return (target, propertyKey, descriptor) => {
      return I.Extend({
        name: "_Are_onAfterUpdate" /* onAfterUpdate */,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get Template() {
    return (target, propertyKey, descriptor) => {
      return I.Extend({
        name: "_Are_onTemplate" /* onTemplate */,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get Styles() {
    return (target, propertyKey, descriptor) => {
      return I.Extend({
        name: "_Are_onStyles" /* onStyles */,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get Data() {
    return (target, propertyKey, descriptor) => {
      return I.Extend({
        name: "_Are_onData" /* onData */,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get Signal() {
    return (target, propertyKey, descriptor) => {
      return I.Extend({
        name: "_Are_onSignal" /* onSignal */,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  async template(...args) {
  }
  async styles(...args) {
  }
  async data(...args) {
  }
};
__name(Are, "Are");
__decorateClass([
  Are.Template
], Are.prototype, "template", 1);
__decorateClass([
  Are.Styles
], Are.prototype, "styles", 1);
__decorateClass([
  Are.Data
], Are.prototype, "data", 1);
Are = __decorateClass([
  c2.Component({
    namespace: "A-ARE",
    name: "Are",
    description: "Base component class for A-Concept Rendering Engine (ARE) components. It provides lifecycle decorators and methods for defining templates, styles, and data, facilitating the creation of dynamic and interactive UI components within the ARE framework."
  })
], Are);

// src/lib/AreComponent/Are.context.ts
var AreContext = class extends R {
  constructor(source = "") {
    super({ name: "AreContext" });
    this._roots = [];
    this._source = source;
  }
  get scope() {
    return c.scope(this);
  }
  get roots() {
    return this._roots;
  }
  get source() {
    return this._source;
  }
  addRoot(node2) {
    this._roots.push(node2);
    this.scope.register(node2);
  }
  removeRoot(node2) {
    this._roots = this._roots.filter((r2) => r2.aseid.toString() !== node2.aseid.toString());
  }
};
__name(AreContext, "AreContext");
AreContext = __decorateClass([
  c2.Fragment({
    namespace: "A-ARE",
    name: "AreContext",
    description: "Context fragment for the A-Concept Rendering Engine (ARE) framework, serving as a foundational component for managing shared state and configurations within the ARE environment. This Context uses to encapsulate global settings, resources, and utilities that can be accessed by various ARE components and entities during the rendering and interaction processes."
  })
], AreContext);

// src/lib/AreSyntax/AreSyntax.context.ts
var AreSyntaxContext = class extends R {
  constructor(config = {}) {
    super({ name: "AreSyntaxContext" });
    this.config = config;
  }
  /**
   * identifier of the root tag to use when compiling in browser context.
   * 
   * @return {string} The root tag identifier.
   */
  get rootTag() {
    return this.config.rootTag || "are-root";
  }
  /**
   * List of standard HTML tags to recognize.
   * [!] This is a set of tags that can be ignored when determining if a node is a custom component.
   * 
   * @return {Set<string>} A set of standard HTML tag names.
   */
  get standardTags() {
    return new Set(this.config.standardTags || []);
  }
  /**
   * Enable or disable debug mode for syntax parsing.
   * When enabled, additional debug information will be logged during parsing.
   * 
   * @return {boolean} True if debug mode is enabled, false otherwise.
   */
  get debugMode() {
    return this.config.debugMode || false;
  }
  /**
   * Custom interpolation delimiters for template parsing.
   * Default is ['{{', '}}'].
   * 
   * @return {[string, string]} The opening and closing interpolation delimiters.
   */
  get interpolationDelimiters() {
    return this.config.interpolationDelimiters || ["{{", "}}"];
  }
  /**
   * Custom binding delimiter for data binding parsing.
   * Default is ':'.
   * @return {string} The binding delimiter.
   */
  get bindingDelimiter() {
    return this.config.bindingDelimiter || ":";
  }
  /**
   * Custom listener delimiter for event binding parsing.
   * Default is '@'.
   * 
   * @return {string} The listener delimiter.
   */
  get listenerDelimiter() {
    return this.config.listenerDelimiter || "@";
  }
  /**
   * Enable or disable strict mode for syntax parsing.
   * When enabled, the parser will throw errors for any syntax violations.
   * Default is true.
   * 
   * @return {boolean} True if strict mode is enabled, false otherwise.
   */
  get strictMode() {
    return this.config.strictMode !== false;
  }
  /**
   * Enable or disable whitespace trimming in templates.
   * When enabled, leading and trailing whitespace in template expressions will be trimmed.
   * Default is true.
   * 
   * @return {boolean} True if whitespace trimming is enabled, false otherwise.
   */
  get trimWhitespace() {
    return this.config.trimWhitespace !== false;
  }
  /**
   * Custom directive delimiter for directive parsing.
   * Default is '$'.
   * 
   * @return {string} The directive delimiter.
   */
  get directiveDelimiter() {
    return this.config.directiveDelimiter || "$";
  }
  /*
   * A list of custom directives to be recognized by the syntax parser.
   * Each directive should be a string representing the directive name.
   * Default is an empty array.
   */
  get customDirectives() {
    return this.config.customDirectives || [];
  }
};
__name(AreSyntaxContext, "AreSyntaxContext");
AreSyntaxContext = __decorateClass([
  c2.Fragment({
    namespace: "A-ARE",
    name: "AreSyntaxContext",
    description: "Context that defines the syntax rules and structures for the A-Concept Rendering Engine (ARE). It provides mechanisms for parsing and interpreting templates, attributes, directives, interpolations, and event listeners, enabling dynamic and interactive UI rendering within the ARE framework."
  })
], AreSyntaxContext);

// src/lib/AreIndex/AreIndex.context.ts
var _AreIndex = class _AreIndex extends R {
  constructor(aseid) {
    super({
      name: aseid instanceof C ? aseid.toString() : aseid
    });
    /**
     * Platform-agnostic element index with linked list functionality
     * Element can be DOM Element, PDF element, DOCX element, etc.
     * The actual type depends on the compiler being used
     */
    this._index = {
      Node_to_Next: /* @__PURE__ */ new Map(),
      Node_to_Previous: /* @__PURE__ */ new Map(),
      FirstNode: null,
      LastNode: null,
      Nodes: /* @__PURE__ */ new Set()
    };
  }
  /**
   * Unique hash representing the current state of the index
   * Can be used to identify changes in the index
   */
  get state() {
    const nodeIds = Array.from(this._index.Nodes).map((node2) => node2.aseid.toString()).sort().join("|");
    return nodeIds;
  }
  get scope() {
    return c.scope(this);
  }
  get parent() {
    return c.scope(this).parent?.resolve(_AreIndex);
  }
  get size() {
    return this._index.Nodes.size;
  }
  get nodes() {
    return Array.from(this._index.Nodes);
  }
  get depth() {
    let depth = 0;
    let currentScope = this.scope;
    while (currentScope) {
      depth++;
      currentScope = currentScope.parent;
    }
    return depth;
  }
  /**
   * Adds a node to the linked list
   * @param newNode - AreNode to add to the index
   * @param position - Where to add the node: 'start', 'end', or { after: AreNode } or { before: AreNode }
   */
  add(newNode, position = "end") {
    this._index.Nodes.add(newNode);
    if (typeof position === "string") {
      if (position === "start") {
        this.addToStart(newNode);
      } else {
        this.addToEnd(newNode);
      }
    } else if ("after" in position) {
      this.insertAfterInternal(position.after, newNode);
    } else if ("before" in position) {
      this.insertBeforeInternal(position.before, newNode);
    }
  }
  /**
   * Removes a node from the linked list
   * @param node - AreNode to remove from index
   */
  remove(node2) {
    if (this._index.Nodes.has(node2)) {
      this._index.Nodes.delete(node2);
      this.removeFromLinkedList(node2);
    }
  }
  /**
   * Remove node from linked list while maintaining integrity
   */
  removeFromLinkedList(node2) {
    const prevNode = this._index.Node_to_Previous.get(node2);
    const nextNode = this._index.Node_to_Next.get(node2);
    if (prevNode) {
      this._index.Node_to_Next.set(prevNode, nextNode);
    } else {
      this._index.FirstNode = nextNode;
    }
    if (nextNode) {
      this._index.Node_to_Previous.set(nextNode, prevNode);
    } else {
      this._index.LastNode = prevNode;
    }
    this._index.Node_to_Next.delete(node2);
    this._index.Node_to_Previous.delete(node2);
  }
  /**
   * Add node to the start of the linked list
   */
  addToStart(node2) {
    if (this._index.FirstNode === null) {
      this._index.FirstNode = node2;
      this._index.LastNode = node2;
      this._index.Node_to_Next.set(node2, null);
      this._index.Node_to_Previous.set(node2, null);
    } else {
      const firstNode = this._index.FirstNode;
      this._index.Node_to_Previous.set(firstNode, node2);
      this._index.Node_to_Next.set(node2, firstNode);
      this._index.Node_to_Previous.set(node2, null);
      this._index.FirstNode = node2;
    }
  }
  /**
   * Add node to the end of the linked list
   */
  addToEnd(node2) {
    if (this._index.FirstNode === null) {
      this._index.FirstNode = node2;
      this._index.LastNode = node2;
      this._index.Node_to_Next.set(node2, null);
      this._index.Node_to_Previous.set(node2, null);
    } else {
      const lastNode = this._index.LastNode;
      this._index.Node_to_Next.set(lastNode, node2);
      this._index.Node_to_Previous.set(node2, lastNode);
      this._index.Node_to_Next.set(node2, null);
      this._index.LastNode = node2;
    }
  }
  /**
   * Internal method to insert node after the specified target node
   */
  insertAfterInternal(targetNode, newNode) {
    const nextNode = this._index.Node_to_Next.get(targetNode);
    this._index.Node_to_Next.set(targetNode, newNode);
    this._index.Node_to_Previous.set(newNode, targetNode);
    this._index.Node_to_Next.set(newNode, nextNode);
    if (nextNode) {
      this._index.Node_to_Previous.set(nextNode, newNode);
    } else {
      this._index.LastNode = newNode;
    }
  }
  /**
   * Internal method to insert node before the specified target node
   */
  insertBeforeInternal(targetNode, newNode) {
    const prevNode = this._index.Node_to_Previous.get(targetNode);
    this._index.Node_to_Previous.set(targetNode, newNode);
    this._index.Node_to_Next.set(newNode, targetNode);
    this._index.Node_to_Previous.set(newNode, prevNode);
    if (prevNode) {
      this._index.Node_to_Next.set(prevNode, newNode);
    } else {
      this._index.FirstNode = newNode;
    }
  }
  /**
   * Get the node that comes after the specified node
   * @param node - Node to find the successor of
   * @returns Next node or null if node is last or not found
   */
  nodeAfter(node2) {
    return this._index.Node_to_Next.get(node2) || null;
  }
  /**
   * Get the node that comes before the specified node
   * @param node - Node to find the predecessor of
   * @returns Previous node or null if node is first or not found
   */
  nodeBefore(node2) {
    return this._index.Node_to_Previous.get(node2) || null;
  }
  /**
   * Get the first node in the linked list
   * @returns First node or null if list is empty
   */
  get firstNode() {
    return this._index.FirstNode;
  }
  /**
   * Get the last node in the linked list
   * @returns Last node or null if list is empty
   */
  get lastNode() {
    return this._index.LastNode;
  }
  /**
   * Iterate through all nodes in linked list order
   * @returns Generator that yields nodes in order
   */
  *iterateNodes() {
    let current = this._index.FirstNode;
    while (current) {
      yield current;
      current = this._index.Node_to_Next.get(current) || null;
    }
  }
  /**
   * Iterate through all nodes in reverse linked list order
   * @returns Generator that yields nodes in reverse order
   */
  *iterateNodesReverse() {
    let current = this._index.LastNode;
    while (current) {
      yield current;
      current = this._index.Node_to_Previous.get(current) || null;
    }
  }
  clear() {
    this._index.Node_to_Next.clear();
    this._index.Node_to_Previous.clear();
    this._index.FirstNode = null;
    this._index.LastNode = null;
    this._index.Nodes.clear();
  }
};
__name(_AreIndex, "AreIndex");
var AreIndex = _AreIndex;

// src/lib/AreProps/AreProps.context.ts
var AreProps = class extends A_ExecutionContext {
  constructor(aseid) {
    super(aseid.toString());
  }
  setMultiple(values) {
    Object.entries(values).forEach(([key, value]) => {
      this.set(key, value);
    });
  }
};
__name(AreProps, "AreProps");
AreProps = __decorateClass([
  c2.Fragment({
    namespace: "A-ARE",
    name: "AreProps",
    description: "Execution context for managing properties within the A-Concept Rendering Engine (ARE) framework, allowing for type-safe storage and retrieval of key-value pairs associated with a specific ASEID."
  })
], AreProps);

// src/lib/AreStore/AreStore.context.ts
var AreStore = class extends A_ExecutionContext {
  constructor(aseid) {
    super(aseid.toString());
    this.watchList = /* @__PURE__ */ new Set();
    this.watchPaths = /* @__PURE__ */ new Set();
    this.changes = /* @__PURE__ */ new Map();
  }
  watch(entity) {
    const path = entity.key;
    this.watchList.add(entity);
    const impactedPaths = String(path).split(".").reduce((acc, part, index, arr) => {
      const currentPath = arr.slice(0, index + 1).join(".");
      acc.push(currentPath);
      return acc;
    }, []);
    impactedPaths.forEach((p2) => {
      this.watchPaths.add(p2);
    });
  }
  unwatch(entity) {
    const path = entity.key;
    this.watchList.delete(entity);
    const impactedPaths = String(path).split(".").reduce((acc, part, index, arr) => {
      const currentPath = arr.slice(0, index + 1).join(".");
      acc.push(currentPath);
      return acc;
    }, []);
    impactedPaths.forEach((p2) => {
      this.watchPaths.delete(p2);
    });
  }
  set(param1, param2) {
    if (typeof param1 === "string" && param2 !== void 0) {
      return this.setAsKeyValue(param1, param2);
    } else if (typeof param1 === "object") {
      return this.setAsObject(param1);
    } else {
      throw new Error("Invalid parameters for set method. Expected either (key: string, value: any) or (values: object).");
    }
  }
  setAsObject(values) {
    Object.entries(values).forEach(([key, value]) => {
      super.set(key, value);
    });
    return this;
  }
  setAsKeyValue(key, value) {
    super.set(key, value);
    return this;
  }
};
__name(AreStore, "AreStore");
AreStore = __decorateClass([
  c2.Fragment({
    description: "Are Store uses to keep AreNode related information for interpolations, runtime data, etc. This object can be injected to manipulate with data at runtime."
  })
], AreStore);

// src/helpers/AreChache.helper.ts
var _AreCacheHelper = class _AreCacheHelper {
  static createHash(str) {
    let hashSource;
    if (str instanceof Map) {
      hashSource = JSON.stringify(Array.from(str.entries()));
    } else if (str instanceof Set) {
      hashSource = JSON.stringify(Array.from(str.values()));
    } else {
      switch (typeof str) {
        case "string":
          hashSource = str;
          break;
        case "undefined":
          hashSource = "undefined";
          break;
        case "object":
          if ("toJSON" in str)
            hashSource = JSON.stringify(str.toJSON());
          else
            hashSource = JSON.stringify(str);
          break;
        case "number":
          hashSource = str.toString();
          break;
        case "boolean":
          hashSource = str ? "true" : "false";
          break;
        case "function":
          hashSource = str.toString();
          break;
        default:
          hashSource = String(str);
      }
    }
    let hash = 0, i, chr;
    for (i = 0; i < hashSource.length; i++) {
      chr = hashSource.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    const hashString = hash.toString();
    return hashString;
  }
};
__name(_AreCacheHelper, "AreCacheHelper");
var AreCacheHelper = _AreCacheHelper;

// src/lib/AreSceneInstruction/AreSceneInstruction.entity.ts
var _AreSceneInstruction = class _AreSceneInstruction extends v {
  get node() {
    const node2 = c.scope(this).issuer();
    if (!node2) {
      throw new Error("Node not found for instruction");
    }
    return node2;
  }
  get scene() {
    return c.scope(this).resolve(AreScene);
  }
  fromNew(newEntity) {
    const identity = newEntity.id || {
      name: newEntity.action
    };
    const id = AreCacheHelper.createHash(identity);
    this.aseid = this.generateASEID({
      entity: g.toKebabCase(newEntity.action),
      id
    });
    this.action = newEntity.action;
    this.params = newEntity.params;
  }
  update(params) {
    this.params = {
      ...this.params,
      ...params
    };
  }
  init(scope) {
    try {
      this.call("_AreSceneInstructionInit" /* Init */, scope);
    } catch (error) {
    }
  }
  apply(scope) {
    try {
      return this.call("_AreSceneInstructionApply" /* Apply */, scope);
    } catch (error) {
    }
  }
  revert(scope) {
    try {
      this.call("_AreSceneInstructionRevert" /* Revert */, scope);
    } catch (error) {
    }
  }
};
__name(_AreSceneInstruction, "AreSceneInstruction");
var AreSceneInstruction = _AreSceneInstruction;

// src/lib/AreSceneInstruction/types/AddAttribute.instruction.ts
var _AddAttributeInstruction = class _AddAttributeInstruction extends AreSceneInstruction {
  get name() {
    return this.params.name;
  }
  get value() {
    return this.params.value;
  }
  constructor(attribute) {
    super({
      id: [attribute.name, attribute.node],
      action: "add-attribute"
    });
  }
};
__name(_AddAttributeInstruction, "AddAttributeInstruction");
var AddAttributeInstruction = _AddAttributeInstruction;

// src/lib/AreSceneInstruction/types/AddDirective.instruction.ts
var _AddDirectiveInstruction = class _AddDirectiveInstruction extends AreSceneInstruction {
  get directive() {
    return this.params.directive;
  }
  get value() {
    return this.params.value;
  }
  constructor(directive, value) {
    super({
      id: [directive],
      action: "directive",
      params: {
        directive,
        value
      }
    });
  }
};
__name(_AddDirectiveInstruction, "AddDirectiveInstruction");
var AddDirectiveInstruction = _AddDirectiveInstruction;

// src/lib/AreSceneInstruction/types/AddStyle.instruction.ts
var _AddStyleInstruction = class _AddStyleInstruction extends AreSceneInstruction {
  get styles() {
    return this.params.styles;
  }
  constructor(node2, styles) {
    super({
      id: [styles, node2],
      action: "add-style",
      node: node2,
      params: {
        styles
      }
    });
  }
};
__name(_AddStyleInstruction, "AddStyleInstruction");
var AddStyleInstruction = _AddStyleInstruction;

// src/lib/AreEvent/AreEvent.context.ts
var AreEvent = class extends R {
  constructor(eventName, props) {
    super({ name: eventName });
    this._props = props;
  }
  get data() {
    return this._props.data;
  }
  get event() {
    return this._props.event;
  }
};
__name(AreEvent, "AreEvent");
AreEvent = __decorateClass([
  c2.Fragment({
    namespace: "A-ARE",
    name: "AreEvent",
    description: "Event context for managing events within the A-Concept Rendering Engine (ARE) framework, encapsulating event data and associated nodes to facilitate event-driven interactions."
  })
], AreEvent);

// src/lib/AreSceneInstruction/types/AttachListener.instruction.ts
var _AttachListenerInstruction = class _AttachListenerInstruction extends AreSceneInstruction {
  get listener() {
    return this.params.listener;
  }
  get event() {
    return this.params.listener.handler;
  }
  get target() {
    return this.params.target;
  }
  get callback() {
    return this._callback;
  }
  constructor(node2, target, listener) {
    super({
      id: [node2, listener.name],
      action: "listener",
      node: node2,
      params: {
        target,
        listener
      }
    });
    this._callback = async (e) => {
      const newEvent = new AreEvent(listener.handler, {
        event: listener.name,
        data: e
      });
      await this.target.emit(newEvent);
    };
  }
};
__name(_AttachListenerInstruction, "AttachListenerInstruction");
var AttachListenerInstruction = _AttachListenerInstruction;

// src/lib/AreSceneInstruction/types/AttachRootNode.instruction.ts
var _AttachRootNodeInstruction = class _AttachRootNodeInstruction extends AreSceneInstruction {
  get id() {
    return this.node.aseid.toString();
  }
  constructor() {
    super({
      id: ["attach-root-node"],
      action: "attach-root-node",
      params: {}
    });
  }
};
__name(_AttachRootNodeInstruction, "AttachRootNodeInstruction");
var AttachRootNodeInstruction = _AttachRootNodeInstruction;

// src/lib/AreSceneInstruction/types/MountNode.instruction.ts
var _MountNodeInstruction = class _MountNodeInstruction extends AreSceneInstruction {
  constructor() {
    super({
      id: ["mount-node"],
      action: "mount-node"
    });
  }
};
__name(_MountNodeInstruction, "MountNodeInstruction");
var MountNodeInstruction = _MountNodeInstruction;

// src/lib/AreSceneInstruction/types/ReplaceInterpolation.instruction.ts
var _ReplaceInterpolationInstruction = class _ReplaceInterpolationInstruction extends AreSceneInstruction {
  get placement() {
    return this.params?.prevValue || this.interpolation.raw;
  }
  get position() {
    return this.interpolation.position;
  }
  get interpolation() {
    return this.params.interpolation;
  }
  get value() {
    return this.params?.value || "";
  }
  constructor(interpolation) {
    super({
      id: [interpolation.key],
      action: "replace-interpolation"
    });
  }
};
__name(_ReplaceInterpolationInstruction, "ReplaceInterpolationInstruction");
var ReplaceInterpolationInstruction = _ReplaceInterpolationInstruction;

// src/lib/AreSceneInstruction/types/UnmountNode.instruction.ts
var _UnmountNodeInstruction = class _UnmountNodeInstruction extends AreSceneInstruction {
  constructor(node2, path) {
    super({
      id: [node2],
      action: "unmount-node",
      node: node2,
      params: {
        path
      }
    });
  }
};
__name(_UnmountNodeInstruction, "UnmountNodeInstruction");
var UnmountNodeInstruction = _UnmountNodeInstruction;

// src/lib/AreScene/AreScene.context.ts
var AreScene = class extends R {
  constructor(id) {
    super({ name: id.toString() });
    this._state = /* @__PURE__ */ new Set();
  }
  get id() {
    return this.name;
  }
  /**
   * Get the root scene of the current scene
   */
  get root() {
    let currentScope = this.scope;
    let rootScene = this;
    while (currentScope) {
      const parentScene = currentScope.parent?.resolve(this.constructor);
      if (parentScene) {
        rootScene = parentScene;
      }
      currentScope = currentScope.parent;
    }
    return rootScene;
  }
  /**
   * The scope where scene is registered. This scope is owned by AreNode 
   */
  get scope() {
    return c.scope(this);
  }
  get index() {
    return c.scope(this).resolveFlat(AreIndex);
  }
  get parent() {
    return c.scope(this).parent?.resolveFlat(AreScene);
  }
  get cache() {
    return c.scope(this).resolveFlat(AreIndex);
  }
  get children() {
    return this.scope.resolveFlatAll(AreNode).map((n) => n.scope.resolveFlat(AreScene)).filter((s2) => !!s2);
  }
  get depth() {
    let depth = 0;
    let currentScope = this.scope;
    while (currentScope) {
      if (currentScope.parent && currentScope.parent.resolve(this.constructor)) {
        depth++;
      }
      currentScope = currentScope.parent;
    }
    return depth;
  }
  get instructions() {
    return this.scope.resolveFlatAll(AreSceneInstruction) || [];
  }
  renderPlanFor(node2, filter) {
    const actions = [];
    const order = filter?.order || [];
    const filterFn = filter?.filter;
    let plan = this.instructions;
    plan = plan.sort((a, b) => {
      const aIndex = order.findIndex((instructionType) => a instanceof instructionType);
      const bIndex = order.findIndex((instructionType) => b instanceof instructionType);
      return (aIndex === -1 ? order.length : aIndex) - (bIndex === -1 ? order.length : bIndex);
    });
    if (filterFn) {
      plan = plan.filter(filterFn);
    }
    for (const action of plan) {
      if (action.node === node2) {
        actions.push(action);
      }
    }
    return actions;
  }
  get debugPrefix() {
    return `${" - ".repeat(this.depth)}`;
  }
  plan(instruction) {
    try {
      this.scope.register(instruction);
    } catch (error) {
    }
  }
  unPlan(instruction) {
    const planned = this.getPlanned(instruction);
    try {
      if (planned)
        this.scope.deregister(planned);
    } catch (error) {
    }
  }
  isAttached(node2) {
    return !!this.scope.resolve(new Y(AreNode, {
      flat: true,
      query: {
        aseid: node2.aseid
      }
    }));
  }
  attach(node2) {
    this.scope.register(node2);
    node2.scope.inherit(this.scope);
  }
  sceneOf(node2) {
    return node2.scope.resolveFlat(AreScene);
  }
  propsOf(node2) {
    return node2.scope.resolveFlat(AreProps);
  }
  storeOf(node2) {
    return node2.scope.resolveFlat(AreStore);
  }
  isPlanned(action) {
    return this.getPlanned(action) !== void 0;
  }
  /**
   * It returns planned instruction instance from the scene
   * 
   * [!] Only Planned instructions can be used for state checking
   * 
   * @param instruction 
   * @returns 
   */
  getPlanned(instruction) {
    const planned = this.scope.resolve(new Y(AreSceneInstruction, {
      flat: true,
      query: {
        aseid: instruction.aseid.toString()
      }
    }));
    return planned;
  }
  /**
   * Operation Only applicable from Plan -> State
   * 
   * So only instructions presented in the plan can be moved to state
   * State is a set of instructions that are currently applied to the scene
   * 
   * @param instruction 
   */
  setState(instruction) {
    const planned = this.getPlanned(instruction);
    if (planned) {
      this._state.delete(planned.aseid.toString());
      this._state.add(instruction.aseid.toString());
    }
  }
  dropState(instruction) {
    const planned = this.getPlanned(instruction);
    if (planned) {
      this._state.delete(planned.aseid.toString());
    }
  }
  resetPlan(node2) {
    for (const instruction of this.renderPlanFor(node2)) {
      if (instruction.node === node2) {
        this.unPlan(instruction);
      }
    }
  }
  resetState(node2) {
    for (const instruction of this.renderPlanFor(node2)) {
      if (instruction.node === node2) {
        this._state.delete(instruction.aseid.toString());
      }
    }
  }
  getState(instruction) {
    const planned = this.getPlanned(instruction);
    if (!planned) {
      return void 0;
    }
    if (this._state.has(planned.aseid.toString()))
      return planned;
    else
      return void 0;
  }
  revert(instruction) {
    this._state.delete(instruction.aseid.toString());
  }
  reset() {
    this.index.clear();
    this._state.clear();
  }
  toJSON() {
    return {
      ...super.toJSON(),
      children: Object.fromEntries(
        Array.from(this.children).map((child) => [
          child.id.toString(),
          child.toJSON()
        ])
      )
    };
  }
};
__name(AreScene, "AreScene");
AreScene = __decorateClass([
  c2.Component({
    namespace: "A-ARE",
    name: "AreScene",
    description: "AreScene fragment is keeps only what actually is displayed, while Are Node has everything related to the node like template, markup, styles, etc. Scene is responsible for rendering, managing state and lifecycle of the nodes within the scene."
  })
], AreScene);

// src/lib/AreAttribute/AreAttribute.entity.ts
var _AreAttribute = class _AreAttribute extends v {
  /**
   * The evaluated value of the attribute, which can be different from the raw value depending on the context and type of the attribute. For example, for a directive like `v-if="condition"`, the raw value is "condition", but the evaluated value would be the result of evaluating "condition" in the current scope.
   */
  get value() {
    return this.content;
  }
  fromNew(newEntity) {
    const identity = {
      name: newEntity.name,
      content: newEntity.content,
      node: newEntity.node.aseid.toString()
    };
    const id = AreCacheHelper.createHash(identity);
    this.aseid = this.generateASEID({
      entity: newEntity.name,
      id
    });
    this.name = newEntity.name;
    this.raw = newEntity.raw;
    this.content = newEntity.content;
    this.prefix = newEntity.prefix;
  }
  init() {
    this.call("_AreAttribute_init");
  }
  compile() {
    this.call("_AreAttribute_compile");
  }
  validate() {
    if (!this.name) throw new Error(
      `AreAttribute validation failed: "name" is required. Attribute ASEID: <${this.aseid.entity}> : ${this.aseid.toString()}`
    );
    if (!this.raw) throw new Error(
      `AreAttribute validation failed: "raw" is required. Attribute ASEID: <${this.aseid.entity}> : ${this.aseid.toString()}`
    );
    if (this.value === void 0) throw new Error(
      `AreAttribute validation failed: "value" is required. Attribute ASEID: <${this.aseid.entity}> : ${this.aseid.toString()}`
    );
  }
};
__name(_AreAttribute, "AreAttribute");
var AreAttribute = _AreAttribute;

// src/lib/AreInterpolation/AreInterpolation.entity.ts
var _AreInterpolation = class _AreInterpolation extends v {
  /**
   * The evaluated value of the attribute, which can be different from the raw value depending on the context and type of the attribute. For example, for a directive like `v-if="condition"`, the raw value is "condition", but the evaluated value would be the result of evaluating "condition" in the current scope.
   */
  get value() {
    return this.raw;
  }
  fromNew(newEntity) {
    const identity = {
      key: newEntity.key,
      node: newEntity.node.aseid.toString()
    };
    const id = AreCacheHelper.createHash(identity);
    this.aseid = this.generateASEID({
      entity: newEntity.key,
      id
    });
    this.key = newEntity.key;
    this.raw = newEntity.raw;
    this.position = newEntity.position;
  }
  init() {
    return this.call("_AreInterpolation_init");
  }
  compile() {
    return this.call("_AreInterpolation_compile");
  }
};
__name(_AreInterpolation, "AreInterpolation");
var AreInterpolation = _AreInterpolation;

// src/lib/AreNode/AreNode.entity.ts
var AreNode = class extends v {
  get id() {
    return this.aseid.id;
  }
  get scope() {
    if (!this._scope) {
      this._scope = c.allocate(this, new x({ name: `${this.aseid.id}-scope` }));
    }
    return this._scope;
  }
  get store() {
    return this.scope.resolveFlat(AreStore);
  }
  get props() {
    return this.scope.resolveFlat(AreProps);
  }
  get attributes() {
    return this.scope.resolveFlatAll(AreAttribute);
  }
  get interpolations() {
    return this.scope.resolveFlatAll(AreInterpolation);
  }
  get children() {
    return this.scope.resolveFlatAll(AreNode) || [];
  }
  /**
   * It returns the scene where the node exists, so it should be the scene of the rootNode, 
   * primary parent of this node.
   */
  get scene() {
    return this.scope.resolve(AreScene);
  }
  get type() {
    return this.aseid.entity;
  }
  get template() {
    return this._template;
  }
  get markup() {
    return this._markup;
  }
  get styles() {
    return this._styles;
  }
  fromNew(newEntity) {
    this.aseid = this.generateASEID({
      id: newEntity.id,
      entity: newEntity.component,
      scope: newEntity.scope
    });
    this._template = newEntity.template || "";
    this._markup = newEntity.markup || "";
    this._styles = newEntity.styles || "";
  }
  fromASEID(aseid) {
    super.fromASEID(aseid);
    this._template = "";
    this._markup = "";
    this._styles = "";
  }
  setTemplate(template) {
    this._template = template;
  }
  setMarkup(markup) {
    this._markup = markup;
  }
  setStyles(styles) {
    this._styles = styles;
  }
  async emit(eventOrScope) {
    this.checkScopeInheritance();
    const eventScope = s.isScopeInstance(eventOrScope) ? eventOrScope.inherit(this.scope) : new x({
      name: `${eventOrScope.name}-scope`,
      fragments: [eventOrScope]
    }).inherit(this.scope);
    try {
      await this.call("_AreNode_onEvent" /* onEvent */, eventScope);
      eventScope.destroy();
    } catch (error) {
      eventScope.destroy();
      throw error;
    }
  }
  compile() {
    this.checkScopeInheritance();
    try {
      this.call("_AreNode_onCompile" /* onCompile */, this.scope);
    } catch (error) {
      throw error;
    }
  }
  render() {
    this.checkScopeInheritance();
    try {
      return this.call("_AreNode_onRender" /* onRender */, this.scope);
    } catch (error) {
      throw error;
    }
  }
  async update() {
    this.checkScopeInheritance();
    try {
      await this.call("_AreNode_onUpdate" /* onUpdate */, this.scope);
    } catch (error) {
      throw error;
    }
  }
  async reset() {
    this.scope.destroy();
    this._template = "";
    this._styles = "";
    this._scope = new x({
      name: `${this.aseid.id}`
    });
  }
  unmount() {
    this.checkScopeInheritance();
    try {
      this.call("_AreNode_onUnmount" /* onUnmount */, this.scope);
    } catch (error) {
      throw error;
    }
  }
  async load() {
    return await super.load(this.scope);
  }
  async destroy() {
    this.checkScopeInheritance();
    try {
      await super.destroy(this.scope);
      this.scope.destroy();
    } catch (error) {
      this._scope.destroy();
      throw error;
    }
  }
  //============================================================================================
  //                                Helpers Methods
  //============================================================================================
  /**
   * Method to ensure that the current scope is inherited from the context scope
   * 
   * @throws A_Error if the scope is not inherited from the context scope
   */
  checkScopeInheritance() {
    let attachedScope;
    try {
      attachedScope = c.scope(this);
    } catch (error) {
      throw new y({
        title: `A_UI_Node Scope Inheritance Error`,
        description: `The A_UI_Node entity with ASEID '${this.aseid.toString()}' is not bound to any context scope. Please ensure that the entity is created within a valid context.`,
        originalError: error
      });
    }
  }
};
__name(AreNode, "AreNode");
AreNode = __decorateClass([
  c2.Entity({
    namespace: "A-ARE",
    name: "AreNode",
    description: "An AreNode entity represents a node within the A-Concept Rendering Engine (ARE) framework. It encapsulates template, markup, and styles, and manages its own scope for nested fragments and entities. AreNodes are responsible for handling events, compiling, rendering, updating, and lifecycle management within the ARE context."
  })
], AreNode);

// src/lib/AreSyntax/AreSyntax.component.ts
var AreSyntax = class extends w {
  get config() {
    return c.scope(this).resolveFlat(AreSyntaxContext);
  }
  isRootNode(node2) {
    return node2.aseid.entity.toLowerCase() === this.config.rootTag;
  }
  isStaticNode(node2) {
    return false;
  }
  isCustomNode(node2) {
    return !this.config.standardTags.has(node2.aseid.entity.toLowerCase());
  }
  extractRoots(template) {
    const rootTag = this.config.rootTag;
    const rootTagRegex = new RegExp(`<${rootTag}([\\s>])`, "gi");
    let match;
    const nodes = [];
    while ((match = rootTagRegex.exec(template)) !== null) {
      const startIndex = match.index;
      const endTag = `</${rootTag}>`;
      const endIndex = template.indexOf(endTag, startIndex);
      if (endIndex === -1) {
        throw new y(`Missing closing tag for <${rootTag}> starting at index ${startIndex}`);
      }
      const attributes = this.extractAttributes(template.slice(startIndex, endIndex + endTag.length));
      let rootId = `auto-root-${startIndex}`;
      for (let i = 0; i < attributes.length; i++) {
        if (attributes[i].name === "id") {
          rootId = attributes[i].value;
          break;
        }
      }
      const markup = template.slice(startIndex, endIndex + endTag.length);
      const content = markup.slice(rootTag.length + 2, -endTag.length).trim();
      const node2 = new AreNode({
        id: rootId,
        scope: "are",
        component: "are-root",
        markup,
        template: content
      });
      nodes.push(node2);
    }
    return nodes;
  }
  /**
   * This method should return only children of the current level
   *  
   * No treewalking, recursion, or nested parsing - just direct children of the provided markup.
   * It should be syntax-agnostic and work with any template format.
   * @param markup 
   * @returns 
   */
  extractChildren(markup) {
    const children = [];
    let index = 0;
    while (index < markup.length) {
      const tagStart = markup.indexOf("<", index);
      if (tagStart === -1) break;
      if (markup[tagStart + 1] === "/") {
        index = tagStart + 1;
        continue;
      }
      if (markup[tagStart + 1] === "!" || markup[tagStart + 1] === "?") {
        const commentEnd = markup.indexOf(">", tagStart);
        if (commentEnd === -1) break;
        index = commentEnd + 1;
        continue;
      }
      const tagNameMatch = markup.slice(tagStart).match(/^<([a-zA-Z][^\s/>]*)/);
      if (!tagNameMatch) {
        index = tagStart + 1;
        continue;
      }
      const tagName = tagNameMatch[1];
      const openingTagEnd = markup.indexOf(">", tagStart);
      if (openingTagEnd === -1) break;
      if (markup[openingTagEnd - 1] === "/") {
        const fullTag2 = markup.slice(tagStart, openingTagEnd + 1);
        const childNode2 = new AreNode({
          scope: "are",
          component: tagName,
          markup: fullTag2,
          template: ""
        });
        children.push(childNode2);
        index = openingTagEnd + 1;
        continue;
      }
      const closingTag = `</${tagName}>`;
      let level = 0;
      let searchIndex = openingTagEnd + 1;
      let closingTagStart = -1;
      while (searchIndex < markup.length) {
        const nextOpenTag = markup.indexOf(`<${tagName}`, searchIndex);
        const nextCloseTag = markup.indexOf(closingTag, searchIndex);
        if (nextCloseTag === -1) break;
        if (nextOpenTag !== -1 && nextOpenTag < nextCloseTag) {
          const charAfterTag = markup[nextOpenTag + tagName.length + 1];
          if (charAfterTag === " " || charAfterTag === ">" || charAfterTag === "/") {
            level++;
            searchIndex = nextOpenTag + tagName.length + 1;
            continue;
          }
        }
        if (level === 0) {
          closingTagStart = nextCloseTag;
          break;
        } else {
          level--;
          searchIndex = nextCloseTag + closingTag.length;
        }
      }
      if (closingTagStart === -1) {
        index = openingTagEnd + 1;
        continue;
      }
      const fullTag = markup.slice(tagStart, closingTagStart + closingTag.length);
      const content = markup.slice(openingTagEnd + 1, closingTagStart);
      const childNode = new AreNode({
        scope: "are",
        component: tagName,
        markup: fullTag,
        template: content.trim()
      });
      children.push(childNode);
      index = closingTagStart + closingTag.length;
    }
    return children;
  }
  extractInterpolations(template) {
    const interpolationRegex = new RegExp(`${this.config.interpolationDelimiters[0]}\\s*([a-zA-Z0-9_.$]+)\\s*${this.config.interpolationDelimiters[1]}`, "g");
    const interpolations = [];
    let match;
    while ((match = interpolationRegex.exec(template)) !== null) {
      interpolations.push({
        raw: match[0],
        key: match[1],
        position: match.index
      });
    }
    return interpolations;
  }
  extractDirectives(template) {
    const trimmedTemplate = template.trim();
    const firstTagMatch = trimmedTemplate.match(
      /^<([a-zA-Z][^\s/>]*)(\s[^>]*?)?>/
    );
    if (!firstTagMatch) return [];
    const tag = firstTagMatch[1];
    const attributesPart = firstTagMatch[2];
    if (!attributesPart) return [];
    const directiveRegex = new RegExp(
      `\\s+(\\${this.config.directiveDelimiter}[a-zA-Z0-9_-]+)(?:\\s*=\\s*(?:"([^"]*)"|'([^']*)'))?`,
      "g"
    );
    let match;
    const directives = [];
    while ((match = directiveRegex.exec(attributesPart)) !== null) {
      const name = match[1];
      if (this.config.customDirectives && this.config.customDirectives.length > 0 && !this.config.customDirectives.includes(name)) {
        continue;
      }
      const raw = match[0];
      const value = match[2] ?? match[3];
      const tagTemplate = firstTagMatch[0];
      directives.push({
        tag,
        name,
        raw,
        value,
        template: tagTemplate
      });
    }
    return directives;
  }
  extractAttributesV2(template) {
    const trimmedTemplate = template.trim();
    const firstTagMatch = trimmedTemplate.match(
      /^<([a-zA-Z][^\s/>]*)(\s[^>]*?)?>/
    );
    if (!firstTagMatch) return [];
    const attributesPart = firstTagMatch[2];
    if (!attributesPart) return [];
    const allAttributesRegex = /\s+([@:$]?)([a-zA-Z][a-zA-Z0-9._-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'))?/g;
    let match;
    const attributes = [];
    while ((match = allAttributesRegex.exec(attributesPart)) !== null) {
      const prefix = match[1] || "";
      const name = match[2];
      const value = match[3] ?? match[4] ?? "";
      const raw = match[0];
      attributes.push({
        name,
        value,
        prefix,
        raw
        // type
      });
    }
    return attributes;
  }
  extractInterpolationsV2(template) {
    const interpolationRegex = new RegExp(`${this.config.interpolationDelimiters[0]}\\s*([a-zA-Z0-9_.$]+)\\s*${this.config.interpolationDelimiters[1]}`, "g");
    const interpolations = [];
    let match;
    while ((match = interpolationRegex.exec(template)) !== null) {
      interpolations.push({
        raw: match[0],
        key: match[1],
        position: match.index
      });
    }
    return interpolations;
  }
  /**
   * Extracts component props from the FIRST opening tag.
   *
   * Examples:
   *   label="Click"
   *   :label="'Click Me'"
   *
   * Excludes:
   *   @click
   *   $if
   */
  extractAttributes(template) {
    const firstTagMatch = template.match(
      /^<([a-zA-Z][^\s/>]*)(\s[^>]*?)?>/
    );
    if (!firstTagMatch) return [];
    const tag = firstTagMatch[1];
    const attributesPart = firstTagMatch[2];
    if (!attributesPart) return [];
    const propRegex = new RegExp(
      `\\s+(\\${this.config.bindingDelimiter}?)([a-zA-Z][a-zA-Z0-9._-]*)\\s*=\\s*(?:"([^"]*)"|'([^']*)')`,
      "g"
    );
    let match;
    const attributes = [];
    while ((match = propRegex.exec(attributesPart)) !== null) {
      const isBinding = match[1] === this.config.bindingDelimiter;
      const name = match[2];
      if (name.startsWith(this.config.listenerDelimiter) || name.startsWith(this.config.directiveDelimiter)) {
        continue;
      }
      const raw = match[0];
      const value = match[3] ?? match[4];
      attributes.push({
        // tag,
        name,
        raw,
        value: value || "",
        prefix: isBinding ? this.config.bindingDelimiter : ""
        // binding: isBinding
      });
    }
    return attributes;
  }
  /**
   * Extracts event listeners from the FIRST/TOP-LEVEL opening tag ONLY in the template.
   * Supports:
   *  - @event="handler"
   *  - @event='handler'
   * 
   * Note: This method intentionally ignores nested elements and only processes
   * the very first opening tag in the provided template string.
   */
  extractListeners(template) {
    const trimmedTemplate = template.trim();
    const firstTagMatch = trimmedTemplate.match(
      /^<([a-zA-Z][^\s/>]*)(\s[^>]*?)?>/
    );
    if (!firstTagMatch) return [];
    const tag = firstTagMatch[1];
    const attributesPart = firstTagMatch[2];
    if (!attributesPart) return [];
    const listenerRegex = new RegExp(
      `\\s+${this.config.listenerDelimiter}([a-zA-Z0-9_:-]+)\\s*=\\s*(?:"([^"]*)"|'([^']*)')`,
      "g"
    );
    let match;
    const listeners = [];
    while ((match = listenerRegex.exec(attributesPart)) !== null) {
      const raw = match[0];
      const name = match[1];
      const handler = match[2] ?? match[3] ?? "";
      listeners.push({
        tag,
        name,
        raw,
        handler
      });
    }
    return listeners;
  }
  isBinding(prefix) {
    return prefix === this.config.bindingDelimiter;
  }
  isListener(prefix) {
    return prefix === this.config.listenerDelimiter;
  }
  isDirective(prefix) {
    return prefix === this.config.directiveDelimiter;
  }
  isStatic(prefix) {
    return !prefix || prefix === "";
  }
  getAttributeType(prefix) {
    if (this.isBinding(prefix)) return "binding";
    if (this.isListener(prefix)) return "listener";
    if (this.isDirective(prefix)) return "directive";
    return "static";
  }
  isBindingProp(prop) {
    return prop.raw.trim().startsWith(this.config.bindingDelimiter);
  }
  extractPropValue(prop, parentStore) {
    if (prop.value == null) {
      return void 0;
    }
    if (this.isBindingProp(prop)) {
      const value = prop.value.trim();
      if (value.startsWith("'") && value.endsWith("'") || value.startsWith('"') && value.endsWith('"')) {
        return value.slice(1, -1);
      }
      return parentStore?.get(value);
    }
    return prop.value;
  }
  replaceInterpolation(template, interpolation, value) {
    const key = typeof interpolation === "string" ? interpolation : interpolation.key;
    return template.replace(new RegExp(`${this.config.interpolationDelimiters[0]}\\s*${key}\\s*${this.config.interpolationDelimiters[1]}`, "g"), value !== void 0 ? String(value) : "");
  }
};
__name(AreSyntax, "AreSyntax");
__decorateClass([
  c2.Method({
    description: "Determines if a given AreNode is a root node based on its entity type."
  })
], AreSyntax.prototype, "isRootNode", 1);
__decorateClass([
  c2.Method({
    description: "Determines if a given AreNode represents a custom component as opposed to a standard HTML tag."
  })
], AreSyntax.prototype, "isCustomNode", 1);
__decorateClass([
  c2.Method({
    description: "Extracts root AreNode elements from the document based on the configured root tag."
  })
], AreSyntax.prototype, "extractRoots", 1);
__decorateClass([
  c2.Method({
    description: "Extracts interpolations from a template string based on the configured interpolation delimiters."
  })
], AreSyntax.prototype, "extractInterpolations", 1);
__decorateClass([
  c2.Method({
    description: "Extracts custom directives from the first opening tag of a template string."
  })
], AreSyntax.prototype, "extractDirectives", 1);
__decorateClass([
  c2.Method({
    description: "Extracts all attributes from the first opening tag of a template string, including static, binding, listeners, and directives."
  })
], AreSyntax.prototype, "extractAttributesV2", 1);
__decorateClass([
  c2.Method({
    description: "Extracts interpolations from a template string based on the configured interpolation delimiters."
  })
], AreSyntax.prototype, "extractInterpolationsV2", 1);
__decorateClass([
  c2.Method({
    description: "Determines if an attribute prefix indicates a binding attribute."
  })
], AreSyntax.prototype, "isBinding", 1);
__decorateClass([
  c2.Method({
    description: "Determines if an attribute prefix indicates an event listener."
  })
], AreSyntax.prototype, "isListener", 1);
__decorateClass([
  c2.Method({
    description: "Determines if an attribute prefix indicates a directive."
  })
], AreSyntax.prototype, "isDirective", 1);
__decorateClass([
  c2.Method({
    description: "Determines if an attribute prefix indicates a static attribute."
  })
], AreSyntax.prototype, "isStatic", 1);
__decorateClass([
  c2.Method({
    description: "Gets the attribute type based on its prefix."
  })
], AreSyntax.prototype, "getAttributeType", 1);
AreSyntax = __decorateClass([
  c2.Component({
    namespace: "A-ARE",
    name: "AreSyntax",
    description: "Context component that defines the syntax rules and structures for the A-Concept Rendering Engine (ARE). It provides mechanisms for parsing and interpreting templates, attributes, directives, interpolations, and event listeners, enabling dynamic and interactive UI rendering within the ARE framework."
  })
], AreSyntax);

// node_modules/@adaas/a-utils/dist/browser/a-signal.mjs
var _a69;
var A_Signal = (_a69 = class extends v {
  // ========================================================================
  // ========================== Static Methods ==============================
  // ========================================================================
  /**
   * Allows to define default data for the signal.
   * 
   * If no data is provided during initialization, the default data will be used.
   * 
   * @returns 
   */
  static async default() {
    return void 0;
  }
  createHash(str) {
    let hashSource;
    if (str instanceof Map) {
      hashSource = JSON.stringify(Array.from(str.entries()));
    } else if (str instanceof Set) {
      hashSource = JSON.stringify(Array.from(str.values()));
    } else {
      switch (typeof str) {
        case "string":
          hashSource = str;
          break;
        case "undefined":
          hashSource = "undefined";
          break;
        case "object":
          if ("toJSON" in str)
            hashSource = JSON.stringify(str.toJSON());
          else
            hashSource = JSON.stringify(str);
          break;
        case "number":
          hashSource = str.toString();
          break;
        case "boolean":
          hashSource = str ? "true" : "false";
          break;
        case "function":
          hashSource = str.toString();
          break;
        default:
          hashSource = String(str);
      }
    }
    let hash = 0, i, chr;
    for (i = 0; i < hashSource.length; i++) {
      chr = hashSource.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    const hashString = hash.toString();
    return hashString;
  }
  /**
   * This method compares the current signal with another signal instance by deduplication ID
   * this id can be configured during initialization with the "id" property.
   * 
   * example: 
   * * const signalA = new A_Signal({ id: ['user-status', 'user123'], data: { status: 'online' } });
   * * const signalB = new A_Signal({ id: ['user-status', 'user123'], data: { status: 'offline' } });
   * 
   * signalA.compare(signalB) // true because both signals have the same deduplication ID
   * 
   * @param other 
   * @returns 
   */
  compare(other) {
    if (this.aseid.id !== other.aseid.id) {
      return false;
    }
    return true;
  }
  fromJSON(serializedEntity) {
    super.fromJSON(serializedEntity);
    this.data = serializedEntity.data;
  }
  fromNew(newEntity) {
    this.data = newEntity.data;
    const identity = newEntity.id || {
      name: newEntity.name,
      data: this.data
    };
    const id = this.createHash(identity);
    this.aseid = this.generateASEID({
      entity: newEntity.name,
      id
    });
  }
  toJSON() {
    return {
      ...super.toJSON(),
      data: this.data
    };
  }
}, __name(_a69, "A_Signal"), _a69);
A_Signal = __decorateClass2([
  c2.Entity({
    namespace: "A-Utils",
    name: "A-Signal",
    description: "A Signal Entity represents an individual signal instance that carries data, used for managing state within an application context. Signals are designed to reflect the current state rather than individual events, making them suitable for scenarios where state monitoring and real-time updates are essential."
  })
], A_Signal);
var _a70;
var A_SignalVector = (_a70 = class extends v {
  constructor(param1, param2) {
    if ("aseid" in param1) {
      super(param1);
    } else {
      super({
        structure: param2 ? param2 : param1.map((s2) => s2.constructor),
        values: param1
      });
    }
  }
  fromNew(newEntity) {
    super.fromNew(newEntity);
    this._structure = newEntity.structure;
    this._signals = newEntity.values;
  }
  /**
   * The structure of the signal vector, defining the types of signals it contains.
   * 
   * For example:
   * [UserSignInSignal, UserStatusSignal, UserActivitySignal]
   * 
   */
  get structure() {
    return this._structure || this._signals.map((s2) => s2.constructor);
  }
  get length() {
    return this.structure.length;
  }
  /**
   * Enables iteration over the signals in the vector.
   * 
   * @returns 
   */
  [Symbol.iterator]() {
    let pointer = 0;
    const signals = this.structure.map((signalConstructor) => {
      const signalIndex = this._signals.findIndex((s2) => s2.constructor === signalConstructor);
      return signalIndex !== -1 ? this._signals[signalIndex] : void 0;
    });
    return {
      next() {
        if (pointer < signals.length) {
          return {
            done: false,
            value: signals[pointer++]
          };
        } else {
          return {
            done: true,
            value: void 0
          };
        }
      }
    };
  }
  /**
   * Allows to match the current Signal Vector with another Signal Vector by comparing each signal in the structure.
   * This method returns true if all signals in the vector match the corresponding signals in the other vector.
   * 
   * @param other 
   * @returns 
   */
  match(other) {
    if (this.length !== other.length) {
      return false;
    }
    for (let i = 0; i < this.length; i++) {
      const thisSignalConstructor = this.structure[i];
      const otherSignalConstructor = other.structure[i];
      if (thisSignalConstructor !== otherSignalConstructor) {
        return false;
      }
      const thisSignalIndex = this._signals.findIndex((s2) => s2.constructor === thisSignalConstructor);
      const otherSignalIndex = other._signals.findIndex((s2) => s2.constructor === otherSignalConstructor);
      const thisSignal = thisSignalIndex !== -1 ? this._signals[thisSignalIndex] : void 0;
      const otherSignal = otherSignalIndex !== -1 ? other._signals[otherSignalIndex] : void 0;
      if (thisSignal && otherSignal) {
        if (!thisSignal.compare(otherSignal)) {
          return false;
        }
      } else if (thisSignal || otherSignal) {
        return false;
      }
    }
    return true;
  }
  /**
   * This method should ensure that the current Signal Vector contains all signals from the provided Signal Vector.
   * 
   * @param signal 
   */
  contains(signal) {
    for (const signalConstructor of signal.structure) {
      const signalIndex = this._signals.findIndex((s2) => s2.constructor === signalConstructor);
      if (signalIndex === -1) {
        return false;
      }
    }
    return true;
  }
  has(param1) {
    let signalConstructor;
    if (param1 instanceof v) {
      signalConstructor = param1.constructor;
    } else {
      signalConstructor = param1;
    }
    return this.structure.includes(signalConstructor);
  }
  get(param1) {
    let signalConstructor;
    if (param1 instanceof v) {
      signalConstructor = param1.constructor;
    } else {
      signalConstructor = param1;
    }
    const index = this._signals.findIndex((s2) => s2.constructor === signalConstructor);
    if (index === -1) {
      return void 0;
    }
    return this._signals[index];
  }
  /**
   * Converts to Array of values of signals in the vector
   * Maintains the order specified in the structure/generic type
   * 
   * @param structure - Optional structure to override the default ordering
   * @returns Array of signal instances in the specified order
   */
  async toVector(structure) {
    const usedStructure = structure || this.structure;
    return usedStructure.map((signalConstructor) => {
      const signalIndex = this._signals.findIndex((s2) => s2.constructor === signalConstructor);
      return signalIndex !== -1 ? this._signals[signalIndex] : void 0;
    });
  }
  /**
   * Converts to Array of data of signals in the vector
   * Maintains the order specified in the structure/generic type
   * 
   * @param structure - Optional structure to override the default ordering
   * @returns Array of serialized signal data in the specified order
   */
  async toDataVector(structure) {
    const usedStructure = structure || this.structure;
    const results = [];
    for (const signalConstructor of usedStructure) {
      const signalIndex = this._signals.findIndex((s2) => s2.constructor === signalConstructor);
      let data;
      if (signalIndex === -1) {
        data = await signalConstructor.default();
      } else {
        const signal = this._signals[signalIndex];
        data = signal;
      }
      results.push(data?.toJSON().data);
    }
    return results;
  }
  /**
   * Converts to Object with signal constructor names as keys and their corresponding data values
   * Uses the structure ordering to ensure consistent key ordering
   * 
   * @returns Object with signal constructor names as keys and signal data as values
   */
  async toObject(structure) {
    const usedStructure = structure || this.structure;
    const obj = {};
    usedStructure.forEach((signalConstructor) => {
      const signalName = signalConstructor.name;
      const signalIndex = this._signals.findIndex((s2) => s2.constructor === signalConstructor);
      if (signalIndex !== -1) {
        const signal = this._signals[signalIndex];
        obj[signalName] = signal.toJSON().data;
      } else {
        obj[signalName] = void 0;
      }
    });
    return obj;
  }
  /**
   * Serializes the Signal Vector to a JSON-compatible format.
   * 
   * 
   * @returns 
   */
  toJSON() {
    return {
      ...super.toJSON(),
      structure: this.structure.map((s2) => s2.name),
      values: this._signals.map((s2) => s2.toJSON())
    };
  }
}, __name(_a70, "A_SignalVector"), _a70);
A_SignalVector = __decorateClass2([
  c2.Entity({
    namespace: "A-Utils",
    name: "A-SignalVector",
    description: "A Signal Vector Entity represents a collection of signals structured in a specific way, allowing for batch processing and transmission of related signals as a unified state representation."
  })
], A_SignalVector);
var _a71;
var A_SignalState = (_a71 = class extends R {
  /**
   * Creates a new A_SignalState instance
   * 
   * @param structure - Optional array defining the ordered structure of signal constructors
   *                   This structure is used for vector operations and determines the order
   *                   in which signals are processed and serialized
   */
  constructor(structure) {
    super({ name: "A_SignalState" });
    this._state = /* @__PURE__ */ new Map();
    this._prevState = /* @__PURE__ */ new Map();
    this._structure = structure;
  }
  /**
   * Gets the ordered structure of signal constructors
   * @returns Array of signal constructors in their defined order
   */
  get structure() {
    return this._structure || [];
  }
  set(param1, param2) {
    const signal = param1 instanceof A_Signal ? param1.constructor : param1;
    const value = param1 instanceof A_Signal ? param1 : param2;
    this._prevState.set(signal, this._state.get(signal));
    this._state.set(signal, value);
  }
  get(param) {
    const signal = param instanceof A_Signal ? param.constructor : param;
    return this._state.get(signal);
  }
  getPrev(param) {
    const signal = param instanceof A_Signal ? param.constructor : param;
    return this._prevState.get(signal);
  }
  has(param) {
    const signal = param instanceof A_Signal ? param.constructor : param;
    return this.structure.includes(signal);
  }
  delete(param) {
    const signal = param instanceof A_Signal ? param.constructor : param;
    return this._state.delete(signal);
  }
  /**
   * Converts the current state to a vector (ordered array) format
   * 
   * The order is determined by the structure array provided during construction.
   * Each position in the vector corresponds to a specific signal type's latest value.
   * 
   * @returns Array of signal values in the order defined by the structure
   * @throws Error if structure is not defined or if any signal value is undefined
   */
  toVector() {
    const vector = [];
    this._state.forEach((value, key) => {
      vector.push(value);
    });
    return new A_SignalVector(vector, this.structure);
  }
  /**
   * Converts the current state to an object with signal constructor names as keys
   * 
   * This provides a more readable representation of the state where each signal
   * type is identified by its constructor name.
   * 
   * @returns Object mapping signal constructor names to their latest values
   * @throws Error if any signal value is undefined
   */
  toObject() {
    const obj = {};
    this.structure.forEach((signalConstructor) => {
      const value = this._state.get(signalConstructor);
      if (value === void 0) {
        throw new Error(`Signal ${signalConstructor.name} has no value in state`);
      }
      obj[signalConstructor.name] = value;
    });
    return obj;
  }
}, __name(_a71, "A_SignalState"), _a71);
A_SignalState = __decorateClass2([
  c2.Fragment({
    namespace: "A-Utils",
    name: "A-SignalState",
    description: "Manages the latest state of all signals within a given scope, maintaining a mapping between signal constructors and their most recently emitted values."
  })
], A_SignalState);
var _a72;
var A_SignalConfig = (_a72 = class extends R {
  get structure() {
    if (this._structure) {
      return this._structure;
    }
    const scope = c.scope(this);
    const constructors = [...scope.allowedEntities].filter((e) => u.isInheritedFrom(e, A_Signal)).sort((a, b) => a.constructor.name.localeCompare(b.name)).map((s2) => scope.resolveConstructor(s2.name));
    return constructors.filter((s2) => s2);
  }
  /**
   * Uses for synchronization to ensure the config is initialized.
   * 
   * @returns True if the configuration has been initialized.
   */
  get ready() {
    return this._ready;
  }
  constructor(params) {
    super({ name: "A_SignalConfig" });
    this._config = params;
  }
  /**
   * Initializes the signal configuration if not already initialized.
   * 
   * @returns 
   */
  async initialize() {
    if (!this._ready) {
      this._ready = this._initialize();
    }
    return this._ready;
  }
  /**
   * Initializes the signal configuration by processing the provided structure or string representation.
   * This method sets up the internal structure of signal constructors based on the configuration.
   */
  async _initialize() {
    if (this._config.structure) {
      this._structure = this._config.structure;
    } else if (this._config.stringStructure) {
      const stringStructure = this._config.stringStructure.split(",").map((s2) => s2.trim());
      this._structure = stringStructure.map((name) => c.scope(this).resolveConstructor(name)).filter((s2) => s2);
    }
  }
}, __name(_a72, "A_SignalConfig"), _a72);
A_SignalConfig = __decorateClass2([
  c2.Fragment({
    namespace: "A-Utils",
    name: "A-SignalConfig",
    description: "Signal configuration fragment that defines the structure and types of signals within a given scope. It allows specifying the expected signal constructors and their order, facilitating consistent signal management and processing across components that emit or listen to signals."
  })
], A_SignalConfig);
var A_SignalBusFeatures = /* @__PURE__ */ ((A_SignalBusFeatures2) => {
  A_SignalBusFeatures2["onBeforeNext"] = "_A_SignalBusFeatures_onBeforeNext";
  A_SignalBusFeatures2["onNext"] = "_A_SignalBusFeatures_onNext";
  A_SignalBusFeatures2["onError"] = "_A_SignalBusFeatures_onError";
  return A_SignalBusFeatures2;
})(A_SignalBusFeatures || {});
var _a73;
var A_SignalBusError = (_a73 = class extends y {
}, __name(_a73, "A_SignalBusError"), _a73);
A_SignalBusError.SignalProcessingError = "Signal processing error";
var _a74;
var _b;
var _c;
var _a75;
var A_SignalBus = (_a75 = class extends w {
  async next(...signals) {
    const scope = new x({
      name: `A_SignalBus-Next-Scope`,
      entities: signals
    }).inherit(c.scope(this));
    try {
      await this.call("_A_SignalBusFeatures_onBeforeNext", scope);
      await this.call("_A_SignalBusFeatures_onNext", scope);
      scope.destroy();
    } catch (error) {
      let wrappedError;
      switch (true) {
        case error instanceof A_SignalBusError:
          wrappedError = error;
          break;
        case (error instanceof y && error.originalError instanceof A_SignalBusError):
          wrappedError = error.originalError;
          break;
        default:
          wrappedError = new A_SignalBusError({
            title: A_SignalBusError.SignalProcessingError,
            description: `An error occurred while processing the signal.`,
            originalError: error
          });
          break;
      }
      scope.register(wrappedError);
      await this.call(
        "_A_SignalBusFeatures_onError"
        /* onError */
      );
      scope.destroy();
    }
  }
  async [
    _c = "_A_SignalBusFeatures_onError"
    /* onError */
  ](error, logger, ...args) {
    logger?.error(error);
  }
  async [
    _b = "_A_SignalBusFeatures_onBeforeNext"
    /* onBeforeNext */
  ](scope, globalConfig, state, logger, config) {
    const componentContext = c.scope(this);
    if (!config) {
      config = new A_SignalConfig({
        stringStructure: globalConfig?.get("A_SIGNAL_VECTOR_STRUCTURE") || void 0
      });
      componentContext.register(config);
    }
    if (!config.ready)
      await config.initialize();
    if (!state) {
      state = new A_SignalState(config.structure);
      componentContext.register(state);
    }
  }
  async [
    _a74 = "_A_SignalBusFeatures_onNext"
    /* onNext */
  ](signals, scope, state, globalConfig, logger, config) {
    for (const signal of signals) {
      if (!state.has(signal))
        return;
      logger?.debug(`A_SignalBus: Updating state for signal '${signal.constructor.name}' with data:`, signal.data);
      state.set(signal);
    }
    const vector = state.toVector();
    scope.register(vector);
  }
}, __name(_a75, "A_SignalBus"), _a75);
__decorateClass2([
  c2.Method({
    description: "Emit multiple signals through the signal bus."
  })
], A_SignalBus.prototype, "next", 1);
__decorateClass2([
  I.Extend({
    before: /.*/
  }),
  __decorateParam2(0, ve(y)),
  __decorateParam2(1, ve(A_Logger))
], A_SignalBus.prototype, _c, 1);
__decorateClass2([
  I.Extend({
    scope: [A_SignalBus],
    before: /.*/
  }),
  __decorateParam2(0, ve(x)),
  __decorateParam2(1, ve(A_Config)),
  __decorateParam2(2, ve(A_SignalState)),
  __decorateParam2(3, ve(A_Logger)),
  __decorateParam2(4, ve(A_SignalConfig))
], A_SignalBus.prototype, _b, 1);
__decorateClass2([
  I.Extend({
    scope: [A_SignalBus],
    before: /.*/
  }),
  __decorateParam2(0, Y.Flat()),
  __decorateParam2(0, Y.All()),
  __decorateParam2(0, ve(A_Signal)),
  __decorateParam2(1, ve(x)),
  __decorateParam2(2, Y.Required()),
  __decorateParam2(2, ve(A_SignalState)),
  __decorateParam2(3, ve(A_Config)),
  __decorateParam2(4, ve(A_Logger)),
  __decorateParam2(5, ve(A_SignalConfig))
], A_SignalBus.prototype, _a74, 1);
A_SignalBus = __decorateClass2([
  c2.Component({
    namespace: "A-Utils",
    name: "A-SignalBus",
    description: "Signal bus component that manages the emission and state of signals within a given scope. It listens for emitted signals, updates their state, and forwards them to registered watchers. The bus ensures a consistent signal vector structure based on the defined configuration, facilitating signal management across multiple components."
  })
], A_SignalBus);

// src/signals/AreInit.signal.ts
var _AreInitSignal = class _AreInitSignal extends A_Signal {
  static async default() {
    return new _AreInitSignal({ data: { ready: false } });
  }
};
__name(_AreInitSignal, "AreInitSignal");
var AreInitSignal = _AreInitSignal;

// node_modules/@adaas/a-utils/dist/browser/a-route.mjs
var _a76;
var A_Route = (_a76 = class extends R {
  constructor(url) {
    super();
    this.url = url instanceof RegExp ? url.source : url;
  }
  /**
   * Returns path only without query and hash
   */
  get path() {
    const p2 = this.url.split("?")[0].split("#")[0];
    if (p2.includes("://")) {
      const pathStartIndex = p2.indexOf("/", p2.indexOf("://") + 3);
      if (pathStartIndex === -1) {
        return "/";
      } else {
        const path = p2.slice(pathStartIndex);
        return path.endsWith("/") ? path.slice(0, -1) : path;
      }
    }
    return p2.endsWith("/") ? p2.slice(0, -1) : p2;
  }
  /**
   * Returns array of parameter names in the route path
   */
  get params() {
    return this.path.match(/:([^\/]+)/g)?.map((param) => param.slice(1)) || [];
  }
  /**
   * Returns protocol based on URL scheme
   */
  get protocol() {
    switch (true) {
      case this.url.startsWith("http://"):
        return "http";
      case this.url.startsWith("https://"):
        return "https";
      case this.url.startsWith("ws://"):
        return "ws";
      case this.url.startsWith("wss://"):
        return "wss";
      default:
        return this.url.includes("://") ? this.url.split("://")[0] : "http";
    }
  }
  extractParams(url) {
    const cleanUrl = url.split("?")[0];
    const urlSegments = cleanUrl.split("/").filter(Boolean);
    const maskSegments = this.path.split("/").filter(Boolean);
    const params = {};
    for (let i = 0; i < maskSegments.length; i++) {
      const maskSegment = maskSegments[i];
      const urlSegment = urlSegments[i];
      if (maskSegment.startsWith(":")) {
        const paramName = maskSegment.slice(1);
        params[paramName] = urlSegment;
      } else if (maskSegment !== urlSegment) {
        return {};
      }
    }
    return params;
  }
  extractQuery(url) {
    const query = {};
    const queryString = url.split("?")[1];
    if (!queryString) return query;
    const cleanQuery = queryString.split("#")[0];
    for (const pair of cleanQuery.split("&")) {
      if (!pair) continue;
      const [key, value = ""] = pair.split("=");
      query[decodeURIComponent(key)] = decodeURIComponent(value);
    }
    return query;
  }
  toString() {
    return `${this.path}`;
  }
  toRegExp() {
    return new RegExp(`^${this.path.replace(/\/:([^\/]+)/g, "/([^/]+)")}$`);
  }
  toAFeatureExtension(extensionScope = []) {
    return new RegExp(`^${extensionScope.length ? `(${extensionScope.join("|")})` : ".*"}\\.${this.path.replace(/\/:([^\/]+)/g, "/([^/]+)")}$`);
  }
}, __name(_a76, "A_Route"), _a76);
A_Route = __decorateClass2([
  c2.Fragment({
    namespace: "A-Utils",
    name: "A-Route",
    description: "Route fragment that defines URL patterns for routing purposes. It supports dynamic parameters and query extraction, allowing for flexible route definitions. This fragment can be used in routing systems to match incoming URLs against defined routes and extract relevant parameters and query strings."
  })
], A_Route);

// src/signals/AreRoute.signal.ts
var _AreRouteSignal = class _AreRouteSignal extends A_Signal {
  constructor(path) {
    super({
      data: {
        route: new A_Route(path)
      }
    });
  }
  get route() {
    return this.data.route;
  }
  static async default() {
    return new _AreRouteSignal(document.location.href);
  }
};
__name(_AreRouteSignal, "AreRouteSignal");
var AreRouteSignal = _AreRouteSignal;

// node_modules/@adaas/a-utils/dist/browser/a-service.mjs
var A_ServiceFeatures = /* @__PURE__ */ ((A_ServiceFeatures2) => {
  A_ServiceFeatures2["onBeforeLoad"] = "_A_Service_onBeforeLoad";
  A_ServiceFeatures2["onLoad"] = "_A_Service_onLoad";
  A_ServiceFeatures2["onAfterLoad"] = "_A_Service_onAfterLoad";
  A_ServiceFeatures2["onBeforeStart"] = "_A_Service_onBeforeStart";
  A_ServiceFeatures2["onStart"] = "_A_Service_onStart";
  A_ServiceFeatures2["onAfterStart"] = "_A_Service_onAfterStart";
  A_ServiceFeatures2["onBeforeStop"] = "_A_Service_onBeforeStop";
  A_ServiceFeatures2["onStop"] = "_A_Service_onStop";
  A_ServiceFeatures2["onAfterStop"] = "_A_Service_onAfterStop";
  A_ServiceFeatures2["onError"] = "_A_Service_onError";
  return A_ServiceFeatures2;
})(A_ServiceFeatures || {});
var _a77;
var A_Service_Error = (_a77 = class extends y {
}, __name(_a77, "A_Service_Error"), _a77);
A_Service_Error.ServiceLoadError = "Service load error";
A_Service_Error.ServiceStartError = "Service start error";
A_Service_Error.ServiceStopError = "Service stop error";
var _a78;
var _b2;
var _c2;
var _d;
var _e2;
var _f;
var _g;
var _h;
var _i;
var _j;
var _a79;
var A_Service = (_a79 = class extends j {
  /**
   * Load the service
   */
  async load() {
    try {
      await this.call(
        "_A_Service_onBeforeLoad"
        /* onBeforeLoad */
      );
      await this.call(
        "_A_Service_onLoad"
        /* onLoad */
      );
      await this.call(
        "_A_Service_onAfterLoad"
        /* onAfterLoad */
      );
    } catch (error) {
      let wrappedError;
      switch (true) {
        case error instanceof A_Service_Error:
          wrappedError = error;
          break;
        case (error instanceof y && error.originalError instanceof A_Service_Error):
          wrappedError = error.originalError;
          break;
        default:
          wrappedError = new A_Service_Error({
            title: A_Service_Error.ServiceLoadError,
            description: "An error occurred while processing the request.",
            originalError: error
          });
          break;
      }
      this.scope.register(wrappedError);
      await this.call(
        "_A_Service_onError"
        /* onError */
      );
    }
  }
  /**
   * Start the server
   */
  async start() {
    try {
      await this.call(
        "_A_Service_onBeforeStart"
        /* onBeforeStart */
      );
      await this.call(
        "_A_Service_onStart"
        /* onStart */
      );
      await this.call(
        "_A_Service_onAfterStart"
        /* onAfterStart */
      );
    } catch (error) {
      let wrappedError;
      switch (true) {
        case error instanceof A_Service_Error:
          wrappedError = error;
          break;
        case (error instanceof y && error.originalError instanceof A_Service_Error):
          wrappedError = error.originalError;
          break;
        default:
          wrappedError = new A_Service_Error({
            title: A_Service_Error.ServiceStartError,
            description: "An error occurred while processing the request.",
            originalError: error
          });
          break;
      }
      this.scope.register(wrappedError);
      await this.call(
        "_A_Service_onError"
        /* onError */
      );
    }
  }
  /**
   * Stop the server
   */
  async stop() {
    try {
      await this.call(
        "_A_Service_onBeforeStop"
        /* onBeforeStop */
      );
      await this.call(
        "_A_Service_onStop"
        /* onStop */
      );
      await this.call(
        "_A_Service_onAfterStop"
        /* onAfterStop */
      );
    } catch (error) {
      let wrappedError;
      switch (true) {
        case error instanceof A_Service_Error:
          wrappedError = error;
          break;
        case (error instanceof y && error.originalError instanceof A_Service_Error):
          wrappedError = error.originalError;
          break;
        default:
          wrappedError = new A_Service_Error({
            title: A_Service_Error.ServiceStopError,
            description: "An error occurred while processing the request.",
            originalError: error
          });
          break;
      }
      this.scope.register(wrappedError);
      await this.call(
        "_A_Service_onError"
        /* onError */
      );
    }
  }
  async [
    _j = "_A_Service_onBeforeLoad"
    /* onBeforeLoad */
  ](polyfill, ...args) {
    if (!polyfill) {
      this.scope.register(A_Polyfill);
      polyfill = this.scope.resolve(A_Polyfill);
    }
  }
  async [
    _i = "_A_Service_onLoad"
    /* onLoad */
  ](...args) {
  }
  async [
    _h = "_A_Service_onAfterLoad"
    /* onAfterLoad */
  ](...args) {
  }
  async [
    _g = "_A_Service_onBeforeStart"
    /* onBeforeStart */
  ](...args) {
  }
  async [
    _f = "_A_Service_onStart"
    /* onStart */
  ](...args) {
  }
  async [
    _e2 = "_A_Service_onAfterStart"
    /* onAfterStart */
  ](...args) {
  }
  async [
    _d = "_A_Service_onBeforeStop"
    /* onBeforeStop */
  ](...args) {
  }
  async [
    _c2 = "_A_Service_onStop"
    /* onStop */
  ](...args) {
  }
  async [
    _b2 = "_A_Service_onAfterStop"
    /* onAfterStop */
  ](...args) {
  }
  async [
    _a78 = "_A_Service_onError"
    /* onError */
  ](error, logger, ...args) {
    logger?.error(error);
  }
}, __name(_a79, "A_Service"), _a79);
__decorateClass2([
  Ee.Load()
], A_Service.prototype, "load", 1);
__decorateClass2([
  Ee.Start()
], A_Service.prototype, "start", 1);
__decorateClass2([
  Ee.Stop()
], A_Service.prototype, "stop", 1);
__decorateClass2([
  I.Extend(),
  __decorateParam2(0, ve(A_Polyfill))
], A_Service.prototype, _j, 1);
__decorateClass2([
  I.Extend()
], A_Service.prototype, _i, 1);
__decorateClass2([
  I.Extend()
], A_Service.prototype, _h, 1);
__decorateClass2([
  I.Extend()
], A_Service.prototype, _g, 1);
__decorateClass2([
  I.Extend()
], A_Service.prototype, _f, 1);
__decorateClass2([
  I.Extend()
], A_Service.prototype, _e2, 1);
__decorateClass2([
  I.Extend()
], A_Service.prototype, _d, 1);
__decorateClass2([
  I.Extend()
], A_Service.prototype, _c2, 1);
__decorateClass2([
  I.Extend()
], A_Service.prototype, _b2, 1);
__decorateClass2([
  I.Extend({
    before: /.*/
  }),
  __decorateParam2(0, ve(y)),
  __decorateParam2(1, ve(A_Logger))
], A_Service.prototype, _a78, 1);
A_Service = __decorateClass2([
  c2.Container({
    namespace: "A-Utils",
    name: "A-Service",
    description: "Service container that manages the lifecycle of various types of services, such as HTTP servers and workers or UI loader. It dynamically loads necessary components based on the provided configuration and orchestrates the start and stop processes, ensuring proper error handling and extensibility through feature hooks."
  })
], A_Service);

// src/lib/AreApp/AreApp.container.ts
var _a80, _b3;
var _AreApp = class _AreApp extends A_Service {
  async [_b3 = A_ServiceFeatures.onAfterLoad](context, logger) {
  }
  async [_a80 = A_ServiceFeatures.onStart](context, syntax, bus, logger) {
    for (const root of syntax.extractRoots(context.source)) {
      context.addRoot(root);
      let startTime = Date.now();
      await root.load();
      logger?.info("red", `Root <${root.aseid.id}> loaded in ${Date.now() - startTime} ms.`);
      startTime = Date.now();
      root.compile();
      logger?.info("red", `Root <${root.aseid.id}> compiled in ${Date.now() - startTime} ms.`);
      startTime = Date.now();
      root.render();
      logger?.info("red", `Root <${root.aseid.id}> rendered in ${Date.now() - startTime} ms.`);
    }
    logger?.debug("cyan", `UI Application started at <${context.roots.map((root) => root.aseid.id).join(", ")}> with ${context.roots.length} root nodes.`);
    await bus.next(new AreInitSignal());
  }
};
__name(_AreApp, "AreApp");
__decorateClass([
  I.Extend(),
  __decorateParam(0, Y.Required()),
  __decorateParam(0, ve(AreContext)),
  __decorateParam(1, ve(A_Logger))
], _AreApp.prototype, _b3, 1);
__decorateClass([
  I.Extend(),
  __decorateParam(0, Y.Required()),
  __decorateParam(0, ve(AreContext)),
  __decorateParam(1, ve(AreSyntax)),
  __decorateParam(2, ve(A_SignalBus)),
  __decorateParam(3, ve(A_Logger))
], _AreApp.prototype, _a80, 1);
var AreApp = _AreApp;

// src/lib/AreCompiler/AreCompiler.error.ts
var _AreCompilerError = class _AreCompilerError extends y {
};
__name(_AreCompilerError, "AreCompilerError");
_AreCompilerError.RenderError = "Are Compiler Render Error";
_AreCompilerError.CompilationError = "Are Compiler Compilation Error";
var AreCompilerError = _AreCompilerError;

// src/lib/AreCompiler/AreCompiler.component.ts
var AreCompiler = class extends w {
  // ==================================================================================
  // ========================= COMPONENT METHODS ======================================
  // ==================================================================================
  index(node2) {
  }
  component(node2) {
    let scope;
    try {
      scope = node2.scope;
    } catch (error) {
      scope = c.scope(this);
    }
    return scope.resolve(g.toPascalCase(node2.aseid.entity));
  }
  async beforeLoad(node2, scope, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    const component = scope.resolveOnce(g.toPascalCase(node2.aseid.entity));
    if (component)
      await feature.chain(component, "_Are_onBeforeLoad" /* onBeforeLoad */, node2.scope);
  }
  async load(node2, scope, syntax, feature, logger, parentStore, ...args) {
    const component = this.component(node2);
    if (!component && syntax.isCustomNode(node2)) {
      logger?.warning(
        "Component Not Found",
        `No component registered for entity: ${node2.aseid.entity}. Please ensure that the component is registered in the scope before rendering.`
      );
    }
    if (syntax.isRootNode(node2)) {
      const newNodeScene = new AreScene(node2.aseid);
      scope.register(newNodeScene);
    }
    const newNodeIndex = new AreIndex(node2.aseid);
    const newNodeStore = new AreStore(node2.aseid);
    const newNodeProps = new AreProps(node2.aseid);
    scope.register(newNodeIndex);
    if (syntax.isCustomNode(node2)) {
      scope.register(newNodeStore);
      scope.register(newNodeProps);
    }
    if (component) {
      await feature.chain(component, "_Are_onData" /* onData */, scope);
      await feature.chain(component, "_Are_onStyles" /* onStyles */, scope);
      await feature.chain(component, "_Are_onTemplate" /* onTemplate */, scope);
    }
    logger?.debug(`Loaded component <${node2.aseid.entity}> with ${this.constructor.name}`);
    const attributes = syntax.extractAttributesV2(node2.markup);
    for (let i = 0; i < attributes.length; i++) {
      const attr = new AreAttribute({
        node: node2,
        name: attributes[i].name,
        raw: attributes[i].raw,
        content: attributes[i].value,
        prefix: attributes[i].prefix
      });
      scope.register(attr);
    }
    const interpolations = syntax.extractInterpolationsV2(node2.markup);
    for (let i = 0; i < interpolations.length; i++) {
      const interpolation = new AreInterpolation({
        node: node2,
        key: interpolations[i].key,
        raw: interpolations[i].raw,
        position: interpolations[i].position
      });
      scope.register(interpolation);
    }
    const children = syntax.extractChildren(node2.markup);
    for (let i = 0; i < children.length; i++) {
      const nodeChild = children[i];
      node2.scene.attach(nodeChild);
      await nodeChild.load();
    }
  }
  async afterLoad(node2, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(scene.debugPrefix + `[Load -> After] Component Trigger for <${node2.aseid.entity}>  with aseid :{${node2.aseid.toString()}}`);
    const component = this.component(node2);
    if (component)
      await feature.chain(component, "_Are_onAfterLoad" /* onAfterLoad */, node2.scope);
  }
  beforeCompile(node2, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(scene.debugPrefix + `[Compile -> Before] Component Trigger for <${node2.aseid.entity}>  with aseid :{${node2.aseid.toString()}}`);
    const component = scope.resolveOnce(g.toPascalCase(node2.aseid.entity));
    if (component)
      feature.chain(component, "_Are_onBeforeCompile" /* onBeforeCompile */, node2.scope);
  }
  compile(node2, scene, parentScene, syntax, props, store, parentStore, interpolations = [], attributes = [], logger) {
    try {
      scene.plan(new AreSceneInstruction({
        action: "create-node",
        node: node2
      }));
      for (let i = 0; i < attributes.length; i++) {
        const attribute = attributes[i];
        attribute.compile();
      }
      for (let i = 0; i < interpolations.length; i++) {
        const interpolation = interpolations[i];
        interpolation.compile();
      }
    } catch (error) {
      logger?.error(error);
    }
  }
  compileAttribute(attribute, scope, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    const component = scope.resolveOnce(g.toPascalCase(attribute.aseid.entity));
    if (component) {
      try {
        feature.chain(component, event.name, scope);
      } catch (error) {
        logger?.error(error);
      }
    }
  }
  compileInterpolation(interpolation, scope, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    const component = scope.resolveOnce(g.toPascalCase(node.aseid.entity));
    if (component) {
      try {
        feature.chain(component, event.name, scope);
      } catch (error) {
        logger?.error(error);
      }
    }
  }
  afterCompile(node2, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    const component = scope.resolveOnce(g.toPascalCase(node2.aseid.entity));
    logger?.debug(scene.debugPrefix + `[Compile -> After] Component Trigger for <${node2.aseid.entity}>  with aseid :{${node2.aseid.toString()}}`);
    if (component)
      feature.chain(component, "_Are_onAfterCompile" /* onAfterCompile */, node2.scope);
  }
  beforeRender(node2, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    const component = scope.resolveOnce(g.toPascalCase(node2.aseid.entity));
    logger?.debug(scene.debugPrefix + `[Render -> Before] Component Trigger for <${node2.aseid.entity}>  with aseid :{${node2.aseid.toString()}}`);
    if (component)
      feature.chain(component, "_Are_onBeforeRender" /* onBeforeRender */, node2.scope);
  }
  render(node2, syntax, scene, parentScene, logger, ...args) {
    for (const instruction of scene.renderPlanFor(node2)) {
      instruction.apply();
    }
  }
  afterRender(node2, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    const component = this.component(node2);
    logger?.debug(scene.debugPrefix + `[Render -> After] Component Trigger for <${node2.aseid.entity}>  with aseid :{${node2.aseid.toString()}}`);
    if (component)
      feature.chain(component, "_Are_onAfterRender" /* onAfterRender */, node2.scope);
  }
  beforeUpdate(node2, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(scene.debugPrefix + `[Update -> Before] Component Trigger for <${node2.aseid.entity}>  with aseid :{${node2.aseid.toString()}}`);
    const component = this.component(node2);
    if (component)
      feature.chain(component, "_Are_onBeforeUpdate" /* onBeforeUpdate */, node2.scope);
  }
  update(node2, scene, ...args) {
    console.time(scene.debugPrefix + `Updating Node <${node2.aseid.entity}> ASEID: ${node2.aseid.toString()}`);
    console.time(`Node Compile Time for <${node2.aseid.entity}> ASEID: ${node2.aseid.toString()}>`);
    node2.compile();
    console.timeEnd(`Node Compile Time for <${node2.aseid.entity}> ASEID: ${node2.aseid.toString()}>`);
    console.time(`Node Render Time for <${node2.aseid.entity}> ASEID: ${node2.aseid.toString()}>`);
    node2.render();
    console.timeEnd(`Node Render Time for <${node2.aseid.entity}> ASEID: ${node2.aseid.toString()}>`);
    console.timeEnd(scene.debugPrefix + `Updating Node <${node2.aseid.entity}> ASEID: ${node2.aseid.toString()}`);
  }
  afterUpdate(node2, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(scene.debugPrefix + `[Update -> After] Component Trigger for <${node2.aseid.entity}>  with aseid :{${node2.aseid.toString()}}`);
    const component = this.component(node2);
    if (component)
      feature.chain(component, "_Are_onAfterUpdate" /* onAfterUpdate */, node2.scope);
  }
  beforeUnmount(node2, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(scene.debugPrefix + `[Unmount -> Before] Component Trigger for <${node2.aseid.entity}>  with aseid :{${node2.aseid.toString()}}`);
    const component = this.component(node2);
    if (component)
      feature.chain(component, "_Are_onBeforeUnmount" /* onBeforeUnmount */, node2.scope);
  }
  unmount(node2, syntax, scene, parentScene, logger) {
    try {
      logger?.debug("red", scene.debugPrefix + `Unmounting Node <${node2.aseid.entity}> ASEID: ${node2.aseid.toString()}`);
      if (!syntax.isRootNode(node2)) {
        if (!parentScene) {
          throw new AreCompilerError(
            AreCompilerError.RenderError,
            `Parent Scene not found for Node <${node2.aseid.entity}> ASEID: ${node2.aseid.toString()} during unmount process.`
          );
        }
        for (const instruction of parentScene.renderPlanFor(node2)) {
          if (instruction.node === node2) {
            instruction.revert(node2.scope);
            parentScene.dropState(instruction);
            parentScene.unPlan(instruction);
          }
        }
      }
      for (const child of scene.nodes()) {
        child.unmount();
      }
    } catch (error) {
      logger?.error(error);
    }
  }
  afterUnmount(node2, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(scene.debugPrefix + `[Unmount -> After] Component Trigger for <${node2.aseid.entity}>  with aseid :{${node2.aseid.toString()}}`);
    const component = this.component(node2);
    if (component)
      feature.chain(component, "_Are_onAfterUnmount" /* onAfterUnmount */, node2.scope);
  }
  async event(node2, scope, event2, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(scene.debugPrefix + `Event Trigger for <${node2.aseid.entity}>  with aseid :{${node2.aseid.toString()}} for event: ${event2.name}`);
    const component = scope.resolveOnce(g.toPascalCase(node2.aseid.entity));
    if (component) {
      try {
        await feature.chain(component, event2.name, scope);
      } catch (error) {
        logger?.error(error);
      }
    }
  }
  handleSignalVector(vector, context, state, scope, logger) {
    logger?.info(`Handling Signal Vector with ${context.roots.length} root nodes.`);
    try {
      for (const root of context.roots) {
        const callScope = new x({
          fragments: [new AreEvent(
            "_Are_onSignal" /* onSignal */,
            {
              event: "SignalVectorNext",
              data: { vector }
            }
          )]
        }).import(scope, root.scope);
        console.log("Emitting signal for root node:", vector);
        root.emit(callScope);
        callScope.destroy();
      }
    } catch (error) {
      logger?.error(error);
    }
  }
};
__name(AreCompiler, "AreCompiler");
__decorateClass([
  I.Extend({
    name: Ye.LOAD,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(x)),
  __decorateParam(2, ve(I))
], AreCompiler.prototype, "beforeLoad", 1);
__decorateClass([
  I.Extend({
    name: Ye.LOAD,
    scope: [AreNode]
  }),
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(x)),
  __decorateParam(2, ve(AreSyntax)),
  __decorateParam(3, ve(I)),
  __decorateParam(4, ve(A_Logger)),
  __decorateParam(5, Y.Parent()),
  __decorateParam(5, ve(AreStore))
], AreCompiler.prototype, "load", 1);
__decorateClass([
  I.Extend({
    name: Ye.LOAD,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(x)),
  __decorateParam(2, ve(AreScene)),
  __decorateParam(3, ve(I))
], AreCompiler.prototype, "afterLoad", 1);
__decorateClass([
  I.Extend({
    name: "_AreNode_onCompile" /* onCompile */,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(x)),
  __decorateParam(2, ve(AreScene)),
  __decorateParam(3, ve(I))
], AreCompiler.prototype, "beforeCompile", 1);
__decorateClass([
  I.Extend({
    name: "_AreNode_onCompile" /* onCompile */,
    scope: [AreNode]
  }),
  __decorateParam(0, ve(V)),
  __decorateParam(1, Y.Flat()),
  __decorateParam(1, ve(AreScene)),
  __decorateParam(2, Y.Parent()),
  __decorateParam(2, ve(AreScene)),
  __decorateParam(3, ve(AreSyntax)),
  __decorateParam(4, ve(AreProps)),
  __decorateParam(5, ve(AreStore)),
  __decorateParam(6, Y.Parent()),
  __decorateParam(6, ve(AreStore)),
  __decorateParam(7, Y.All()),
  __decorateParam(7, Y.Flat()),
  __decorateParam(7, ve(AreInterpolation)),
  __decorateParam(8, Y.All()),
  __decorateParam(8, Y.Flat()),
  __decorateParam(8, ve(AreAttribute)),
  __decorateParam(9, ve(A_Logger))
], AreCompiler.prototype, "compile", 1);
__decorateClass([
  I.Extend({}),
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(x)),
  __decorateParam(2, ve(I))
], AreCompiler.prototype, "compileAttribute", 1);
__decorateClass([
  I.Extend({}),
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(x)),
  __decorateParam(2, ve(I))
], AreCompiler.prototype, "compileInterpolation", 1);
__decorateClass([
  I.Extend({
    name: "_AreNode_onCompile" /* onCompile */,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(x)),
  __decorateParam(2, ve(AreScene)),
  __decorateParam(3, ve(I))
], AreCompiler.prototype, "afterCompile", 1);
__decorateClass([
  I.Extend({
    name: "_AreNode_onBeforeRender" /* onBeforeRender */,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(x)),
  __decorateParam(2, ve(AreScene)),
  __decorateParam(3, ve(I))
], AreCompiler.prototype, "beforeRender", 1);
__decorateClass([
  I.Extend({
    name: "_AreNode_onRender" /* onRender */,
    scope: [AreNode]
  }),
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(AreSyntax)),
  __decorateParam(2, Y.Flat()),
  __decorateParam(2, ve(AreScene)),
  __decorateParam(3, Y.Parent()),
  __decorateParam(3, ve(AreScene)),
  __decorateParam(4, ve(A_Logger))
], AreCompiler.prototype, "render", 1);
__decorateClass([
  I.Extend({
    name: "_AreNode_onAfterRender" /* onAfterRender */,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(x)),
  __decorateParam(2, ve(AreScene)),
  __decorateParam(3, ve(I))
], AreCompiler.prototype, "afterRender", 1);
__decorateClass([
  I.Extend({
    name: "_AreNode_onUpdate" /* onUpdate */,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(x)),
  __decorateParam(2, ve(AreScene)),
  __decorateParam(3, ve(I))
], AreCompiler.prototype, "beforeUpdate", 1);
__decorateClass([
  I.Extend({
    name: "_AreNode_onUpdate" /* onUpdate */,
    scope: [AreNode]
  }),
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(AreScene))
], AreCompiler.prototype, "update", 1);
__decorateClass([
  I.Extend({
    name: "_AreNode_onUpdate" /* onUpdate */,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(x)),
  __decorateParam(2, ve(AreScene)),
  __decorateParam(3, ve(I))
], AreCompiler.prototype, "afterUpdate", 1);
__decorateClass([
  I.Extend({
    name: "_AreNode_onUnmount" /* onUnmount */,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(x)),
  __decorateParam(2, ve(AreScene)),
  __decorateParam(3, ve(I))
], AreCompiler.prototype, "beforeUnmount", 1);
__decorateClass([
  I.Extend({
    name: "_AreNode_onUnmount" /* onUnmount */,
    scope: [AreNode]
  }),
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(AreSyntax)),
  __decorateParam(2, Y.Flat()),
  __decorateParam(2, ve(AreScene)),
  __decorateParam(3, Y.Parent()),
  __decorateParam(3, ve(AreScene)),
  __decorateParam(4, ve(A_Logger))
], AreCompiler.prototype, "unmount", 1);
__decorateClass([
  I.Extend({
    name: "_AreNode_onUnmount" /* onUnmount */,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(x)),
  __decorateParam(2, ve(AreScene)),
  __decorateParam(3, ve(I))
], AreCompiler.prototype, "afterUnmount", 1);
__decorateClass([
  I.Extend({
    name: "_AreNode_onEvent" /* onEvent */,
    scope: [AreNode]
  }),
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(x)),
  __decorateParam(2, ve(AreEvent)),
  __decorateParam(3, ve(AreScene)),
  __decorateParam(4, ve(I))
], AreCompiler.prototype, "event", 1);
__decorateClass([
  I.Extend({
    name: A_SignalBusFeatures.onNext
  }),
  __decorateParam(0, ve(A_SignalVector)),
  __decorateParam(1, ve(AreContext)),
  __decorateParam(2, ve(A_SignalState)),
  __decorateParam(3, ve(x)),
  __decorateParam(4, ve(A_Logger))
], AreCompiler.prototype, "handleSignalVector", 1);
AreCompiler = __decorateClass([
  c2.Component({
    namespace: "A-ARE",
    name: "AreCompiler",
    description: "AreCompiler is responsible for compiling AreNodes into their respective components, managing the compilation lifecycle, and ensuring that each node is processed according to its defined behavior within the A-Concept Rendering Engine (ARE) framework."
  })
], AreCompiler);

// src/lib/AreRoot/AreRoot.component.ts
var _AreRoot = class _AreRoot extends Are {
  async attachListeners() {
  }
  async template(node2, store) {
  }
  async onSignal(node2, store, scene, vector, event2) {
    console.log("Vector  received :", vector);
    console.log("Node  received   :", node2);
  }
};
__name(_AreRoot, "AreRoot");
__decorateClass([
  I.Extend({
    name: A_ServiceFeatures.onLoad
  })
], _AreRoot.prototype, "attachListeners", 1);
__decorateClass([
  Are.Template,
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(AreStore))
], _AreRoot.prototype, "template", 1);
__decorateClass([
  Are.Signal,
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(AreStore)),
  __decorateParam(2, ve(AreScene)),
  __decorateParam(3, ve(A_SignalVector)),
  __decorateParam(4, ve(AreEvent))
], _AreRoot.prototype, "onSignal", 1);
var AreRoot = _AreRoot;

// src/engines/html/AreHTML.compiler.ts
var AreHTMLCompiler = class extends AreCompiler {
  constructor() {
    super(...arguments);
    this.interpolationTextNodes = /* @__PURE__ */ new Map();
  }
  getElementByPath(root, path) {
    if (path === void 0 || path.trim() === "") {
      return root;
    }
    const indices = path.split(".").map((index) => parseInt(index, 10));
    let current = root;
    for (const index of indices) {
      if (!current) {
        return void 0;
      }
      const elementChildren = Array.from(current.childNodes).filter(
        (child) => child.nodeType === Node.ELEMENT_NODE || child.nodeType === Node.DOCUMENT_NODE || child.nodeType === Node.COMMENT_NODE
      );
      if (index >= elementChildren.length) {
        return void 0;
      }
      current = elementChildren[index];
    }
    return current;
  }
  getElementByNode(node2) {
    const scene = node2.scope.resolveFlat(AreScene);
    const root = document.getElementById(new C(scene.root.id).id);
    return this.getElementByPath(root, scene.path);
  }
  insertElementAtPath(root, path, element) {
    const parentPath = path.split(".").slice(0, -1).join(".");
    const parentElement = this.getElementByPath(root, parentPath);
    const index = parseInt(path.split(".").slice(-1)[0], 10);
    if (parentElement) {
      const children = Array.from(parentElement.children).filter((child) => child.nodeType === Node.ELEMENT_NODE);
      if (index >= children.length) {
        parentElement.appendChild(element);
      } else {
        parentElement.insertBefore(element, children[index]);
      }
    }
  }
  insertElementByNode(node2, element) {
    const scene = node2.scope.resolveFlat(AreScene);
    const root = document.getElementById(new C(scene.root.id).id);
    this.insertElementAtPath(root, scene.path, element);
  }
  index(node2) {
    const index = node2.scope.resolveFlat(AreIndex);
    const scene = node2.scope.resolveFlat(AreScene);
    index.clear();
    scene.reset();
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = node2.template;
    const markupMap = this.createPositionBasedMarkupMap(node2.template);
    this.indexElementsFromDOMLinked(tempDiv, index, markupMap);
  }
  /**
   * Create a position-based mapping by parsing the original template with DOM
   * This ensures 1:1 correspondence between DOM structure and original markup
   */
  createPositionBasedMarkupMap(template) {
    const markupMap = /* @__PURE__ */ new Map();
    const originalDiv = document.createElement("div");
    originalDiv.innerHTML = template;
    this.mapDOMPositions(originalDiv, [], markupMap);
    return markupMap;
  }
  /**
   * Recursively map DOM positions to their exact original markup
   */
  mapDOMPositions(parentElement, parentPath, markupMap) {
    const children = Array.from(parentElement.children);
    for (let i = 0; i < children.length; i++) {
      const element = children[i];
      const currentPath = [...parentPath, i];
      const pathKey = currentPath.join(".");
      markupMap.set(pathKey, element.outerHTML);
    }
  }
  /**
   * Index elements using actual DOM structure with linked list approach
   */
  indexElementsFromDOMLinked(parentElement, index, markupMap) {
    const walker = document.createTreeWalker(
      parentElement,
      NodeFilter.SHOW_ELEMENT,
      null
    );
    let currentElement;
    while (currentElement = walker.nextNode()) {
      if (currentElement === parentElement) {
        continue;
      }
      const pathKey = this.calculateElementPath(parentElement, currentElement);
      const originalMarkup = markupMap.get(pathKey);
      const areNode = new AreNode({
        scope: index.name,
        component: currentElement.tagName.toLowerCase(),
        markup: originalMarkup || currentElement.outerHTML,
        template: currentElement.innerHTML
      });
      index.add(areNode);
    }
  }
  /**
   * Calculate the position-based path for an element relative to its root
   */
  calculateElementPath(root, target) {
    if (target === root) {
      return "";
    }
    const path = [];
    let current = target;
    while (current && current !== root) {
      const parent = current.parentElement;
      if (!parent) break;
      const siblings = Array.from(parent.children);
      const index = siblings.indexOf(current);
      path.unshift(index);
      current = parent;
    }
    return path.join(".");
  }
  /**
   * Index elements using actual DOM structure with position-based markup mapping
   */
  indexElementsFromDOM(parentElement, index, parentPath, markupMap) {
    const children = Array.from(parentElement.children);
    for (let i = 0; i < children.length; i++) {
      const element = children[i];
      const currentPath = [...parentPath, i];
      const pathKey = currentPath.join(".");
      const originalMarkup = markupMap.get(pathKey);
      const areNode = new AreNode({
        scope: index.name,
        component: element.tagName.toLowerCase(),
        markup: originalMarkup || element.outerHTML,
        template: element.innerHTML
      });
      index.add(areNode);
    }
  }
  applyAttachRootNodeInstruction(instruction, logger) {
    const node2 = instruction.node;
    const rootElement = document.getElementById(node2.id);
    if (!rootElement) {
      logger?.warning(`Root element with id <${node2.id}> not found in DOM.`);
      return;
    }
    rootElement.innerHTML = node2.template;
    rootElement.setAttribute("aseid", node2.aseid.toString());
  }
  applyMountNodeInstruction(instruction, context, syntax, logger) {
    try {
      const node2 = instruction.node;
      const scene = instruction.scene;
      if (syntax.isCustomNode(node2)) {
        logger?.debug("red", scene.debugPrefix + `Mounting Node <${node2.aseid.entity}> ASEID: ${node2.aseid.toString()} at path `);
        const wrapper = document.createElement("div");
        wrapper.setAttribute("aseid", node2.aseid.toString());
        wrapper.innerHTML = node2.template;
        const element = this.getElementByNode(node2);
        if (!element) {
          this.insertElementByNode(node2, wrapper);
        } else {
          element.replaceWith(wrapper);
        }
      }
    } catch (error) {
      logger?.error(error);
    }
  }
  applyUnmountNodeInstruction(instruction, context, logger) {
    const node2 = instruction.node;
    const scene = instruction.scene;
    const element = this.getElementByNode(node2);
    logger?.debug("red", scene.debugPrefix + `Unmounting Node <${node2.aseid.entity}> ASEID: ${node2.aseid.toString()}`);
    try {
      element.replaceWith(document.createComment(` Unmounted Node <${node2.aseid.entity}> ASEID: ${node2.aseid.toString()} `));
      node2.unmount();
    } catch (error) {
      logger?.error(error);
    }
  }
  applyAddStyleInstruction(instruction, context, logger) {
    try {
      const node2 = instruction.node;
      const scene = instruction.scene;
      const styles = instruction.params?.styles || "";
      logger?.debug("green", scene.debugPrefix + `Applying styles for Node <${node2.aseid.entity}> ASEID: ${node2.aseid.toString()}`);
      const styleElementId = `a-style-${node2.aseid.entity}`;
      let styleElement = document.querySelector(`#${styleElementId}`);
      if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = styleElementId;
        document.head.appendChild(styleElement);
      }
      styleElement.innerHTML = styles;
    } catch (error) {
      logger?.error(error);
    }
  }
  applyAttachListenerInstruction(instruction, context, logger) {
    const node2 = instruction.node;
    const scene = instruction.scene;
    const content = context.get("content");
    const element = this.getElementByNode(instruction.node);
    const mountPoint = context.get("mountPoint");
    logger?.debug("green", scene.debugPrefix + `Attaching listener '${instruction.listener.name}' for target <${node2.aseid.entity}> ASEID: ${node2.aseid.toString()}`);
    element.addEventListener(instruction.listener.name, instruction.callback);
  }
  applyAddAttributeInstruction(instruction, context, scope, logger) {
    const node2 = instruction.node;
    const scene = instruction.scene;
    const content = context.get("content");
    const element = this.getElementByNode(node2);
    logger?.debug("green", scene.debugPrefix + `Setting attribute '${instruction.name}'='${instruction.value}' for target <${node2.aseid.entity}> ASEID: ${node2.aseid.toString()}`, element);
    element.setAttribute(instruction.name, instruction.value);
  }
  revertInstruction(instruction) {
    this.interpolationTextNodes.delete(instruction.aseid.toString());
  }
  applyReplaceInterpolationInstruction(instruction, context, scope, syntax, logger) {
    const node2 = instruction.node;
    const scene = instruction.scene;
    const element = this.getElementByNode(node2);
    logger?.debug("magenta", scene.debugPrefix + `Replacing interpolation '${instruction.interpolation.name}' with value '${instruction.value}' for target <${node2.aseid.entity}>`, instruction);
    const textNode = this.interpolationTextNodes.get(instruction.aseid.toString());
    if (textNode) {
      textNode.nodeValue = instruction.value;
    } else {
      const treeTextNodesWalker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: /* @__PURE__ */ __name((node3) => {
            if (node3.nodeValue && node3.nodeValue.includes(instruction.interpolation.raw)) {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
          }, "acceptNode")
        }
      );
      const foundNode = treeTextNodesWalker.nextNode();
      if (foundNode) {
        const parts = foundNode.nodeValue.split(instruction.interpolation.raw);
        const parent = foundNode.parentNode;
        if (parent) {
          for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (part) {
              const textNodePart = document.createTextNode(part);
              parent.insertBefore(textNodePart, foundNode);
            }
            if (i < parts.length - 1) {
              const valueNode = document.createTextNode(instruction.value);
              parent.insertBefore(valueNode, foundNode);
              this.interpolationTextNodes.set(instruction.aseid.toString(), valueNode);
            }
          }
          parent.removeChild(foundNode);
        }
      }
    }
  }
  initAddDirectiveInstruction(instruction, scope, logger) {
    const node2 = instruction.node;
    const scene = node2.scope.resolveFlat(AreScene);
    const parentScene = instruction.scene;
    logger?.debug("green", scene.debugPrefix + `Initializing directive '${instruction.directive.name}' for Node <${node2.aseid.entity}> ASEID: ${node2.aseid.toString()}`, scene, parentScene);
    switch (instruction.directive.name) {
      case "$if": {
        const mountInstruction = new MountNodeInstruction(node2, scene.path);
        const unmountInstruction = new UnmountNodeInstruction(node2, scene.path);
        if (instruction.value) {
          parentScene.unPlan(unmountInstruction);
          parentScene.plan(mountInstruction);
          parentScene.dropState(mountInstruction);
        } else {
          parentScene.unPlan(mountInstruction);
          parentScene.plan(unmountInstruction);
          parentScene.dropState(unmountInstruction);
        }
        break;
      }
      default:
        logger?.warning(`Unknown directive '${instruction.directive.name}' for Node <${node2.type}> ASEID: ${node2.aseid.toString()}`);
    }
  }
  applyAddDirectiveInstruction(instruction, context, scope, logger) {
    const node2 = instruction.node;
    const scene = instruction.scene;
    const element = this.getElementByNode(node2);
    try {
      logger?.debug("green", scene.debugPrefix + `Applying directive '${instruction.directive.name}' for Node <${node2.aseid.entity}> ASEID: ${node2.aseid.toString()}`, instruction);
    } catch (error) {
      logger?.error(error);
    }
  }
};
__name(AreHTMLCompiler, "AreHTMLCompiler");
__decorateClass([
  c2.Method({
    description: "Get DOM element corresponding to the given path from the root element."
  })
], AreHTMLCompiler.prototype, "getElementByPath", 1);
__decorateClass([
  c2.Method({
    description: "Get DOM element corresponding to the given AreNode based on its scene path."
  })
], AreHTMLCompiler.prototype, "getElementByNode", 1);
__decorateClass([
  c2.Method({
    description: "Insert a DOM element at the specified path within the root element."
  })
], AreHTMLCompiler.prototype, "insertElementAtPath", 1);
__decorateClass([
  c2.Method({
    description: "Insert a DOM element corresponding to the given AreNode at its scene path."
  })
], AreHTMLCompiler.prototype, "insertElementByNode", 1);
__decorateClass([
  c2.Method({
    description: "Indexes the elements of the given AreNode within its scene, building a linked list structure for traversal."
  })
], AreHTMLCompiler.prototype, "index", 1);
__decorateClass([
  I.Extend({
    name: "_AreSceneInstructionApply" /* Apply */,
    scope: [AttachRootNodeInstruction]
  }),
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(A_Logger))
], AreHTMLCompiler.prototype, "applyAttachRootNodeInstruction", 1);
__decorateClass([
  I.Extend({
    name: "_AreSceneInstructionApply" /* Apply */,
    scope: [MountNodeInstruction]
  }),
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(A_ExecutionContext)),
  __decorateParam(2, ve(AreSyntax)),
  __decorateParam(3, ve(A_Logger))
], AreHTMLCompiler.prototype, "applyMountNodeInstruction", 1);
__decorateClass([
  I.Extend({
    name: "_AreSceneInstructionApply" /* Apply */,
    scope: [UnmountNodeInstruction]
  }),
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(A_ExecutionContext)),
  __decorateParam(2, ve(A_Logger))
], AreHTMLCompiler.prototype, "applyUnmountNodeInstruction", 1);
__decorateClass([
  I.Extend({
    name: "_AreSceneInstructionApply" /* Apply */,
    scope: [AddStyleInstruction]
  }),
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(A_ExecutionContext)),
  __decorateParam(2, ve(A_Logger))
], AreHTMLCompiler.prototype, "applyAddStyleInstruction", 1);
__decorateClass([
  I.Extend({
    name: "_AreSceneInstructionApply" /* Apply */,
    scope: [AttachListenerInstruction]
  }),
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(A_ExecutionContext)),
  __decorateParam(2, ve(A_Logger))
], AreHTMLCompiler.prototype, "applyAttachListenerInstruction", 1);
__decorateClass([
  I.Extend({
    name: "_AreSceneInstructionApply" /* Apply */,
    scope: [AddAttributeInstruction]
  }),
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(A_ExecutionContext)),
  __decorateParam(2, ve(x)),
  __decorateParam(3, ve(A_Logger))
], AreHTMLCompiler.prototype, "applyAddAttributeInstruction", 1);
__decorateClass([
  I.Extend({
    name: "_AreSceneInstructionRevert" /* Revert */,
    scope: [ReplaceInterpolationInstruction]
  }),
  __decorateParam(0, ve(V))
], AreHTMLCompiler.prototype, "revertInstruction", 1);
__decorateClass([
  I.Extend({
    name: "_AreSceneInstructionApply" /* Apply */,
    scope: [ReplaceInterpolationInstruction]
  }),
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(A_ExecutionContext)),
  __decorateParam(2, ve(x)),
  __decorateParam(3, ve(AreSyntax)),
  __decorateParam(4, ve(A_Logger))
], AreHTMLCompiler.prototype, "applyReplaceInterpolationInstruction", 1);
__decorateClass([
  I.Extend({
    name: "_AreSceneInstructionInit" /* Init */,
    scope: [AddDirectiveInstruction]
  }),
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(x)),
  __decorateParam(2, ve(A_Logger))
], AreHTMLCompiler.prototype, "initAddDirectiveInstruction", 1);
__decorateClass([
  I.Extend({
    name: "_AreSceneInstructionApply" /* Apply */,
    scope: [AddDirectiveInstruction]
  }),
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(A_ExecutionContext)),
  __decorateParam(2, ve(x)),
  __decorateParam(3, ve(A_Logger))
], AreHTMLCompiler.prototype, "applyAddDirectiveInstruction", 1);
AreHTMLCompiler = __decorateClass([
  c2.Component({
    namespace: "A-ARE",
    name: "AreHTMLCompiler",
    description: "HTML-specific compiler for A-Concept Rendering Engine (ARE) components, extending the base AreCompiler to handle HTML templates, styles, and rendering logic tailored for web environments."
  })
], AreHTMLCompiler);

// src/engines/html/AreHTML.engine.ts
var AreHTMLEngine = class extends w {
  async injectSyntax(container, syntax, compiler, logger) {
    if (!syntax) {
      logger?.info("cyan", "Injecting AreHTMLSyntax into container scope...");
      const htmlSyntax = new AreSyntaxContext({
        rootTag: "are-root",
        standardTags: [
          "html",
          "head",
          "body",
          "div",
          "span",
          "p",
          "a",
          "ul",
          "ol",
          "li",
          "table",
          "thead",
          "tbody",
          "tr",
          "td",
          "th",
          "form",
          "input",
          "button",
          "select",
          "option",
          "textarea",
          "label",
          "img",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "script",
          "style",
          "link",
          "meta",
          "nav",
          "footer",
          "header",
          "section",
          "article",
          "aside",
          "main",
          "canvas",
          "video",
          "audio",
          "br",
          "hr",
          "strong",
          "em",
          "small",
          "pre",
          "code",
          "iframe",
          "details",
          "summary",
          "svg",
          "path",
          "circle",
          "rect",
          "polygon",
          "g",
          "defs"
        ],
        debugMode: true,
        interpolationDelimiters: ["{{", "}}"],
        bindingDelimiter: ":",
        listenerDelimiter: "@",
        directiveDelimiter: "$"
      });
      container.scope.register(htmlSyntax);
    }
    if (!compiler) {
      logger?.info("cyan", "Injecting AreHTMLCompiler into container scope...");
      container.scope.register(AreHTMLCompiler);
    }
  }
};
__name(AreHTMLEngine, "AreHTMLEngine");
__decorateClass([
  I.Extend({
    name: A_ServiceFeatures.onBeforeLoad,
    before: /.*/
  }),
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(AreSyntaxContext)),
  __decorateParam(2, ve(AreHTMLCompiler)),
  __decorateParam(3, ve(A_Logger))
], AreHTMLEngine.prototype, "injectSyntax", 1);
AreHTMLEngine = __decorateClass([
  c2.Component({
    namespace: "A-ARE",
    name: "AreHTMLEngine",
    description: "HTML Rendering Engine for A-Concept Rendering Engine (ARE), responsible for processing and rendering HTML templates within the ARE framework."
  })
], AreHTMLEngine);

// examples/jumpstart/src/components/SignInComponent.component.ts
var _SignInComponent = class _SignInComponent extends Are {
  async data(store, logger) {
    store.set({
      btnName: "Sign In"
    });
  }
  async styles(node2) {
    node2.setStyles(` 
        .card {
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            max-width: 300px;
            margin: 0 auto;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            position:absolute;
            top:50%;
            left:50%;
            transform: translate(-50%, -50%);
        }
            `);
  }
  async template(node2, logger) {
    logger.info("blue", `SignInComponent template called... : <${node2.aseid.entity}> : `, node2.aseid.toString());
    node2.setTemplate(`
              <div class="card">
                <h2>Sign In</h2>
                <input type="email" id="email" placeholder="Email" />
                <input type="password" id="password" placeholder="Password" />
                <a-btn  :name="btnName" :style="{ color: 'red' }"></a-btn>
              </div>
            `);
  }
  // @A_Feature.Extend({
  //     scope: [SignInComponent]
  // })
  // async A_UI_NODE_onBeforeLoad(
  //     @A_Inject(AreNode) node: AreNode,
  //     @A_Inject(A_Scope) scope: A_Scope,
  //     @A_Inject(A_UI_NodeStore) store: A_UI_NodeStore,
  //     @A_Inject(A_Logger) logger: A_Logger,
  // ): Promise<void> {
  //     logger.log('green', `SignInComponent is initializing... : <${node.aseid.entity}> : `, node.aseid.toString());
  //     store.data.set('btnName', 'Custom Sign In Button');
  // }
  // private addListeners(): void {
  //     const btn = document.getElementById("signInBtn") as HTMLButtonElement;
  //     btn.addEventListener("click", () => this.signIn());
  // }
  // private async signIn(): Promise<void> {
  //     const email = (document.getElementById("email") as HTMLInputElement).value;
  //     const password = (document.getElementById("password") as HTMLInputElement).value;
  //     const signInCommand = new SignInCommand({
  //         username: email,
  //         password
  //     });
  //     A_Context.scope(this).register(signInCommand);
  //     await signInCommand.execute();
  //     console.log("SignIn Command Result:", signInCommand.toJSON());
  // }
  // @A_Feature.Extend({
  //     name: A_CommandFeatures.onComplete,
  //     scope: {
  //         include: [SignInCommand]
  //     }
  // })
  // async handleSuccessSignIn(
  //     @A_Inject(A_Memory) memory: A_Memory<{ token: SerializedToken }>,
  //     @A_Inject(A_Caller) command: SignInCommand,
  // ) {
  //     console.log("Sign-in completed with result:", command.result);
  //     alert(command.result)
  //     const resultToken = await memory.get('token')
  //     const token = new Token(resultToken);
  //     memory.set('token', token as any);
  // }
};
__name(_SignInComponent, "SignInComponent");
__decorateClass([
  Are.Data,
  __decorateParam(0, ve(AreStore)),
  __decorateParam(1, ve(A_Logger))
], _SignInComponent.prototype, "data", 1);
__decorateClass([
  Are.Styles,
  __decorateParam(0, ve(V))
], _SignInComponent.prototype, "styles", 1);
__decorateClass([
  Are.Template,
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(A_Logger))
], _SignInComponent.prototype, "template", 1);
var SignInComponent = _SignInComponent;

// examples/jumpstart/src/components/A-Btn.component.ts
var _ABtn = class _ABtn extends Are {
  async template(node2, store) {
    node2.setTemplate(`
        <button class="a-btn" @click="handleClick"> Make it:  {{name}} {{number}}</button> 
            <a-input $if="showInput" ></a-input>
        <button class="a-btn" @click="handleClick2"> Do:  {{btn2}}</button> 
            <a-input $if="showInput2" ></a-input>
        `);
  }
  async styles(node2) {
    node2.setStyles(`
            .a-btn {
                padding: 10px 20px;
                background-color: {{bgColor}}!important;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 16px;
            }
        `);
  }
  async data(node2, store) {
    store.set({
      name: "A_Button Element",
      showInput: false,
      bgColor: "#007BFF",
      btn2: "Button 2",
      showInput2: false,
      number: 0
    });
  }
  async handleClick(scope, node2, store, logger, event2, scene) {
    store.set("number", Math.floor(Math.random() * 1e3));
    store.set("name", `Clicked! `);
    console.log("Changing ShowInput from ", store.get("showInput"));
    store.set("showInput", !store.get("showInput"));
    console.log("Changing ShowInput to ", store.get("showInput"), store);
    store.set("bgColor", "#ff5733");
    console.log("event data:", event2);
    await node2.update();
  }
  async handleClick2(scope, node2, store, logger, event2, scene) {
    store.set("btn2", `Button 2 Clicked! `);
    store.set("showInput2", !store.get("showInput2"));
    console.log("event data:", event2);
    await node2.update();
  }
};
__name(_ABtn, "ABtn");
__decorateClass([
  Are.Template,
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(AreStore))
], _ABtn.prototype, "template", 1);
__decorateClass([
  Are.Styles,
  __decorateParam(0, ve(V))
], _ABtn.prototype, "styles", 1);
__decorateClass([
  Are.Data,
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(AreStore))
], _ABtn.prototype, "data", 1);
__decorateClass([
  Are.EventHandler,
  __decorateParam(0, ve(x)),
  __decorateParam(1, ve(V)),
  __decorateParam(2, ve(AreStore)),
  __decorateParam(3, ve(A_Logger)),
  __decorateParam(4, ve(AreEvent)),
  __decorateParam(5, ve(AreScene))
], _ABtn.prototype, "handleClick", 1);
__decorateClass([
  Are.EventHandler,
  __decorateParam(0, ve(x)),
  __decorateParam(1, ve(V)),
  __decorateParam(2, ve(AreStore)),
  __decorateParam(3, ve(A_Logger)),
  __decorateParam(4, ve(AreEvent)),
  __decorateParam(5, ve(AreScene))
], _ABtn.prototype, "handleClick2", 1);
var ABtn = _ABtn;

// examples/jumpstart/src/components/A-Input.component.ts
var _AInput = class _AInput extends Are {
  async template(node2, logger) {
    logger.info("blue", `AInput template called... : <${node2.aseid.entity}> : `, node2.aseid.toString());
    node2.setTemplate(`
            <div><input $no-update @input="onChange" :value="inputValue" type="text" :placeholder="placeholder"> </input>  {{inputValue}}</div>
            `);
  }
  async data(store) {
    store.set({
      placeholder: "A_Input Element",
      inputValue: "Test"
    });
  }
  async A_UI_NODE_onBeforeLoad(node2, scope, store, logger) {
    logger.log("green", `AInput is initializing... : <${node2.aseid.entity}> : `, node2.aseid.toString());
  }
  async onChange(scope, node2, store, logger, event2, scene) {
    if (event2.data.target === null || store.get("inputValue") === event2.data.target.value) return;
    logger.log("green", `AInput onChange event triggered... : <${node2.aseid.entity}> : `, node2.aseid.toString(), event2.data.target.value);
    store.set("inputValue", event2.data.target.value);
    await node2.update();
  }
};
__name(_AInput, "AInput");
__decorateClass([
  Are.Template,
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(A_Logger))
], _AInput.prototype, "template", 1);
__decorateClass([
  Are.Data,
  __decorateParam(0, ve(AreStore))
], _AInput.prototype, "data", 1);
__decorateClass([
  Are.EventHandler,
  __decorateParam(0, ve(AreNode)),
  __decorateParam(1, ve(x)),
  __decorateParam(2, ve(AreStore)),
  __decorateParam(3, ve(A_Logger))
], _AInput.prototype, "A_UI_NODE_onBeforeLoad", 1);
__decorateClass([
  Are.EventHandler,
  __decorateParam(0, ve(x)),
  __decorateParam(1, ve(V)),
  __decorateParam(2, ve(AreStore)),
  __decorateParam(3, ve(A_Logger)),
  __decorateParam(4, ve(AreEvent)),
  __decorateParam(5, ve(AreScene))
], _AInput.prototype, "onChange", 1);
var AInput = _AInput;

// examples/jumpstart/src/components/A-Navigation.component.ts
var _ANavigation = class _ANavigation extends Are {
  async template(node2, store) {
    console.log("ANavigation template called... : ", store.get("items"));
    node2.setTemplate(`
            <div class="a-navigation">
                <h2>{{title}}</h2>

                <span> Navigate to: {{activeId}}</span>
                <ul>
                ${store.get("items").map((item) => `
                        <li @click="navigate" class=${store.get("activeId") == item ? "active" : ""} >
                            <a href="#${item.toLowerCase()}">${item}
                            </a>
                        </li>
                    `).join("")}
                </ul>
            </div>
        `);
  }
  async styles(node2) {
    node2.setStyles(`
            .a-navigation {
                padding: 10px;
                position: absolute;
                top: 0;
                width: 250px;
                left: 0;    
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;


            }

            .a-navigation ul {
                list-style-type: none;
                padding: 0;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
            }

            .a-navigation li {
                padding: 10px 0;
                text-align: center;
                cursor: pointer;
                width: 100%;
            }

            .a-navigation li:hover {
                background-color: red;
            }

            .a-navigation li a {
                text-decoration: none;
                color: #333;
                font-weight: bold;
            }

            .a-navigation li.active a {
                color: #007BFF;
            }
        `);
  }
  async data(node2, store) {
    store.set({
      title: "A_Navigation Component",
      items: ["Home", "About", "Services", "Contact"]
    });
  }
  async navigate(scope, node2, store, logger, event2, scene, index, parentScene, bus, compiler) {
    await bus.next(new AreRouteSignal("/home"));
    const existingItems = store.get("items");
    store.set("activeId", event2.data.target.innerText);
    existingItems.push("New Item " + Math.floor(Math.random() * 100));
    store.set("items", existingItems);
    const newNodeScene = scene;
    await this.template(node2, store);
    compiler.index(node2);
    logger?.debug(newNodeScene.debugPrefix + `Loaded component <${node2.aseid.entity}> with ${this.constructor.name}`);
    for (const sceneNode of newNodeScene.nodes()) {
      if (!newNodeScene.isAttached(sceneNode)) {
        newNodeScene.attach(sceneNode);
        await sceneNode.load();
      }
    }
    console.log("Recompiled node:", node2, node2.scope);
    await node2.update();
  }
};
__name(_ANavigation, "ANavigation");
__decorateClass([
  Are.Template,
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(AreStore))
], _ANavigation.prototype, "template", 1);
__decorateClass([
  Are.Styles,
  __decorateParam(0, ve(V))
], _ANavigation.prototype, "styles", 1);
__decorateClass([
  Are.Data,
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(AreStore))
], _ANavigation.prototype, "data", 1);
__decorateClass([
  Are.EventHandler,
  __decorateParam(0, ve(x)),
  __decorateParam(1, ve(V)),
  __decorateParam(2, ve(AreStore)),
  __decorateParam(3, ve(A_Logger)),
  __decorateParam(4, ve(AreEvent)),
  __decorateParam(5, ve(AreScene)),
  __decorateParam(6, ve(AreIndex)),
  __decorateParam(7, Y.Parent()),
  __decorateParam(7, ve(AreScene)),
  __decorateParam(8, ve(A_SignalBus)),
  __decorateParam(9, ve(AreCompiler))
], _ANavigation.prototype, "navigate", 1);
var ANavigation = _ANavigation;

// src/lib/AreSlot/AreSlot.component.ts
var _AreSlot = class _AreSlot extends Are {
  async template() {
  }
  // @A_Feature.Extend()
  // async [A_SignalVectorFeatures.Next](
  //     @A_Inject(A_SignalVector) vector: A_SignalVector
  // ) {
  //     // Emit signals if needed
  //     console.log('AreSlot Signal Vector Emitted:', vector);
  // }
  // @A_Feature.Extend({
  //     name: AreNodeFeatures.onCompile,
  //     scope: [AreNode]
  // })
  // async compile(
  //     @A_Inject(A_Caller) node: AreNode,
  //     @A_Inject(AreScene) scene: AreScene,
  //     @A_Inject(A_Logger) logger: A_Logger,
  //     @A_Inject(A_SignalState) signalState?: A_SignalState,
  // ) {
  //     const vector = await signalState?.toVector().toDataVector()
  //     logger.debug('red',
  //         '================================================================',
  //         `Compiling AreSlot Component at Scene: <${scene.name}>`,
  //         '================================================================',
  //         vector
  //     )
  // }
};
__name(_AreSlot, "AreSlot");
var AreSlot = _AreSlot;

// examples/jumpstart/src/components/PromptTextArea.component.ts
var _PromptTextArea = class _PromptTextArea extends Are {
  async template(node2, logger) {
    logger.info("blue", `PromptTextArea template called... : <${node2.aseid.entity}> : `, node2.aseid.toString());
    node2.setTemplate(`
            <div class="prompt-textarea-container">
                <div class="textarea-wrapper">
                    <textarea 
                        $no-update 
                        @input="onChange" 
                        :value="textValue" 
                        :placeholder="placeholder"
                        :rows="rows"
                        :maxlength="maxLength"
                        class="prompt-textarea"
                    ></textarea>
                    <div class="character-count">
                        <span class="count">{{textValue.length}}</span>
                        <span class="max-count">/ {{maxLength}}</span>
                    </div>
                </div>
                
                <div class="textarea-actions">
                    <button 
                        @click="onClear" 
                        class="clear-btn"
                        :disabled="textValue.length === 0"
                    >
                        Clear
                    </button>
                    <button 
                        @click="onSubmit" 
                        class="submit-btn"
                        :disabled="textValue.trim().length === 0"
                    >
                        Submit
                    </button>
                </div>
                
                <div class="preview-section" v-if="showPreview && textValue.trim().length > 0">
                    <h4 class="preview-title">Preview:</h4>
                    <div class="preview-content">{{textValue}}</div>
                </div>
            </div>
        `);
  }
  async styles(node2, logger) {
    logger.info("blue", `PromptTextArea styles applied... : <${node2.aseid.entity}> : `, node2.aseid.toString());
    node2.setStyles(`
            .prompt-textarea-container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 16px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }

            .textarea-wrapper {
                position: relative;
                margin-bottom: 16px;
            }

            .prompt-textarea {
                width: 100%;
                min-height: 120px;
                padding: 16px;
                border: 2px solid rgba(255, 255, 255, 0.2);
                border-radius: 12px;
                background: rgba(255, 255, 255, 0.95);
                color: #333;
                font-size: 16px;
                line-height: 1.5;
                resize: vertical;
                outline: none;
                transition: all 0.3s ease;
                box-sizing: border-box;
            }

            .prompt-textarea:focus {
                border-color: #4f46e5;
                box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
                background: rgba(255, 255, 255, 1);
            }

            .prompt-textarea::placeholder {
                color: #888;
                font-style: italic;
            }

            .character-count {
                position: absolute;
                bottom: 8px;
                right: 12px;
                font-size: 12px;
                color: #666;
                background: rgba(255, 255, 255, 0.9);
                padding: 2px 6px;
                border-radius: 4px;
                pointer-events: none;
            }

            .count {
                font-weight: 600;
                color: #4f46e5;
            }

            .max-count {
                color: #888;
            }

            .textarea-actions {
                display: flex;
                gap: 12px;
                justify-content: flex-end;
                margin-bottom: 16px;
            }

            .clear-btn,
            .submit-btn {
                padding: 12px 24px;
                border: none;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }

            .clear-btn {
                background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
                color: white;
                box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
            }

            .clear-btn:hover:not(:disabled) {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
            }

            .clear-btn:active:not(:disabled) {
                transform: translateY(0);
            }

            .submit-btn {
                background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
                color: white;
                box-shadow: 0 4px 15px rgba(74, 222, 128, 0.3);
            }

            .submit-btn:hover:not(:disabled) {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(74, 222, 128, 0.4);
            }

            .submit-btn:active:not(:disabled) {
                transform: translateY(0);
            }

            .clear-btn:disabled,
            .submit-btn:disabled {
                background: #d1d5db;
                color: #9ca3af;
                cursor: not-allowed;
                box-shadow: none;
                transform: none;
            }

            .preview-section {
                background: rgba(255, 255, 255, 0.95);
                border-radius: 12px;
                padding: 16px;
                border: 2px solid rgba(255, 255, 255, 0.2);
            }

            .preview-title {
                margin: 0 0 12px 0;
                color: #4f46e5;
                font-size: 14px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .preview-content {
                color: #333;
                line-height: 1.6;
                white-space: pre-wrap;
                word-wrap: break-word;
                background: #f8fafc;
                padding: 12px;
                border-radius: 8px;
                border-left: 4px solid #4f46e5;
                max-height: 200px;
                overflow-y: auto;
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                .prompt-textarea-container {
                    padding: 16px;
                    margin: 0 16px;
                    max-width: none;
                }

                .textarea-actions {
                    flex-direction: column;
                }

                .clear-btn,
                .submit-btn {
                    width: 100%;
                }
            }

            /* Animation for submit button */
            .submit-btn::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                transition: left 0.5s;
            }

            .submit-btn:hover::before {
                left: 100%;
            }
        `);
  }
  async data(store) {
    store.set({
      placeholder: "Enter your message here...",
      textValue: "",
      rows: 5,
      maxLength: 500,
      showPreview: true,
      lastSubmittedValue: ""
    });
  }
  async A_UI_NODE_onBeforeLoad(node2, scope, store, logger) {
    logger.log("green", `PromptTextArea is initializing... : <${node2.aseid.entity}> : `, node2.aseid.toString());
  }
  async onChange(scope, node2, store, logger, event2, scene) {
    if (event2.data.target === null || store.get("textValue") === event2.data.target.value) return;
    const newValue = event2.data.target.value;
    const maxLength = store.get("maxLength");
    if (newValue.length > maxLength) {
      event2.data.target.value = newValue.substring(0, maxLength);
      return;
    }
    logger.log("green", `PromptTextArea onChange event triggered... : <${node2.aseid.entity}> : `, node2.aseid.toString(), newValue);
    store.set("textValue", newValue);
    await node2.update();
  }
  async onSubmit(scope, node2, store, logger, event2, scene) {
    const textValue = store.get("textValue");
    if (textValue.trim().length === 0) {
      logger.warning("yellow", "Cannot submit empty text");
      return;
    }
    logger.log("green", `PromptTextArea onSubmit event triggered... : <${node2.aseid.entity}> : `, node2.aseid.toString(), textValue);
    store.set("lastSubmittedValue", textValue);
    console.log("Text submitted:", textValue);
  }
  async onClear(scope, node2, store, logger, event2, scene) {
    logger.log("green", `PromptTextArea onClear event triggered... : <${node2.aseid.entity}> : `, node2.aseid.toString());
    store.set("textValue", "");
    await node2.update();
    setTimeout(() => {
      const textarea = event2.data.target?.closest(".prompt-textarea-container")?.querySelector(".prompt-textarea");
      if (textarea) {
        textarea.focus();
      }
    }, 100);
  }
};
__name(_PromptTextArea, "PromptTextArea");
__decorateClass([
  Are.Template,
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(A_Logger))
], _PromptTextArea.prototype, "template", 1);
__decorateClass([
  Are.Styles,
  __decorateParam(0, ve(V)),
  __decorateParam(1, ve(A_Logger))
], _PromptTextArea.prototype, "styles", 1);
__decorateClass([
  Are.Data,
  __decorateParam(0, ve(AreStore))
], _PromptTextArea.prototype, "data", 1);
__decorateClass([
  Are.EventHandler,
  __decorateParam(0, ve(AreNode)),
  __decorateParam(1, ve(x)),
  __decorateParam(2, ve(AreStore)),
  __decorateParam(3, ve(A_Logger))
], _PromptTextArea.prototype, "A_UI_NODE_onBeforeLoad", 1);
__decorateClass([
  Are.EventHandler,
  __decorateParam(0, ve(x)),
  __decorateParam(1, ve(V)),
  __decorateParam(2, ve(AreStore)),
  __decorateParam(3, ve(A_Logger)),
  __decorateParam(4, ve(AreEvent)),
  __decorateParam(5, ve(AreScene))
], _PromptTextArea.prototype, "onChange", 1);
__decorateClass([
  Are.EventHandler,
  __decorateParam(0, ve(x)),
  __decorateParam(1, ve(V)),
  __decorateParam(2, ve(AreStore)),
  __decorateParam(3, ve(A_Logger)),
  __decorateParam(4, ve(AreEvent)),
  __decorateParam(5, ve(AreScene))
], _PromptTextArea.prototype, "onSubmit", 1);
__decorateClass([
  Are.EventHandler,
  __decorateParam(0, ve(x)),
  __decorateParam(1, ve(V)),
  __decorateParam(2, ve(AreStore)),
  __decorateParam(3, ve(A_Logger)),
  __decorateParam(4, ve(AreEvent)),
  __decorateParam(5, ve(AreScene))
], _PromptTextArea.prototype, "onClear", 1);
var PromptTextArea = _PromptTextArea;

// examples/jumpstart/src/concept.ts
(async () => {
  try {
    const container = new AreApp({
      name: "ARE Jumpstart",
      components: [
        // ----------------------------------
        // Allowed Entities 
        // ----------------------------------
        // ............
        // ----------------------------------
        // Allowed Commands 
        // ----------------------------------
        // ............
        // ----------------------------------
        // UI Components 
        // ----------------------------------
        SignInComponent,
        ABtn,
        AInput,
        AreSlot,
        A_SignalBus,
        // ----------------------------------
        // Addons 
        // ----------------------------------
        AreRoot,
        ConfigReader,
        AreHTMLEngine,
        PromptTextArea,
        A_Logger,
        AreSyntax,
        ANavigation
      ],
      entities: [
        // ............
        AreInitSignal,
        AreRouteSignal
      ],
      fragments: [
        new AreContext(document.body.innerHTML),
        new A_Config({
          defaults: {
            [A_LOGGER_ENV_KEYS.LOG_LEVEL]: "info"
          }
        })
      ]
    });
    const concept = new Ee({
      name: "adaas-are-example-jumpstart",
      fragments: [new A_Config({
        variables: ["CONFIG_VERBOSE", "DEV_MODE"],
        defaults: {
          CONFIG_VERBOSE: true,
          DEV_MODE: true
        }
      })],
      components: [A_Logger, ConfigReader, A_Polyfill],
      containers: [container]
    });
    await concept.load();
    await concept.start();
  } catch (error) {
    const logger = c.root.resolve(A_Logger);
    logger.error(error);
  }
})();
