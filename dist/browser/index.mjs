import { A_Feature, A_Dependency, A_Inject, A_TYPES__EntityFeatures, A_Caller, A_Scope, A_Error, A_Fragment, A_Context, A_Component, A_Entity, A_TypeGuards, ASEID, A_FormatterHelper } from '@adaas/a-concept';
import { A_Frame } from '@adaas/a-frame';
import { A_ExecutionContext } from '@adaas/a-utils/a-execution';
import { A_SignalBus, A_SignalBusFeatures, A_SignalVector, A_SignalState, A_Signal } from '@adaas/a-utils/a-signal';
import { A_Route } from '@adaas/a-utils/a-route';
import { A_Service, A_ServiceFeatures } from '@adaas/a-utils/a-service';
import { A_Logger } from '@adaas/a-utils/a-logger';

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);

// src/lib/AreComponent/Are.constants.ts
var AreFeatures = /* @__PURE__ */ ((AreFeatures2) => {
  AreFeatures2["onBeforeLoad"] = "_Are_onBeforeLoad";
  AreFeatures2["onAfterLoad"] = "_Are_onAfterLoad";
  AreFeatures2["onBeforeMount"] = "_Are_onBeforeMount";
  AreFeatures2["onAfterMount"] = "_Are_onAfterMount";
  AreFeatures2["onBeforeUnmount"] = "_Are_onBeforeUnmount";
  AreFeatures2["onAfterUnmount"] = "_Are_onAfterUnmount";
  AreFeatures2["onBeforeUpdate"] = "_Are_onBeforeUpdate";
  AreFeatures2["onAfterUpdate"] = "_Are_onAfterUpdate";
  AreFeatures2["onBeforeDestroy"] = "_Are_onBeforeDestroy";
  AreFeatures2["onAfterDestroy"] = "_Are_onAfterDestroy";
  AreFeatures2["onBeforeCompile"] = "_Are_onBeforeCompile";
  AreFeatures2["onAfterCompile"] = "_Are_onAfterCompile";
  AreFeatures2["onBeforeRender"] = "_Are_onBeforeRender";
  AreFeatures2["onAfterRender"] = "_Are_onAfterRender";
  AreFeatures2["onTemplate"] = "_Are_onTemplate";
  AreFeatures2["onStyles"] = "_Are_onStyles";
  AreFeatures2["onData"] = "_Are_onData";
  AreFeatures2["onSignal"] = "_Are_onSignal";
  return AreFeatures2;
})(AreFeatures || {});
var Are = class extends A_Component {
  //==================================================================================
  //======================== LIFECYCLE DECORATORS ====================================
  //==================================================================================
  static get EventHandler() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: propertyKey,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onBeforeLoad() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: "_Are_onBeforeLoad" /* onBeforeLoad */,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onAfterLoad() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: "_Are_onAfterLoad" /* onAfterLoad */,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onBeforeCompile() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: "_Are_onBeforeCompile" /* onBeforeCompile */,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onAfterCompile() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: "_Are_onAfterCompile" /* onAfterCompile */,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onBeforeMount() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: "_Are_onBeforeMount" /* onBeforeMount */,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onAfterMount() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: "_Are_onAfterMount" /* onAfterMount */,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onBeforeUnmount() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: "_Are_onBeforeUnmount" /* onBeforeUnmount */,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onAfterUnmount() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: "_Are_onAfterUnmount" /* onAfterUnmount */,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onBeforeUpdate() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: "_Are_onBeforeUpdate" /* onBeforeUpdate */,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get onAfterUpdate() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: "_Are_onAfterUpdate" /* onAfterUpdate */,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get Template() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: "_Are_onTemplate" /* onTemplate */,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get Styles() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: "_Are_onStyles" /* onStyles */,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get Data() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: "_Are_onData" /* onData */,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static get Signal() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
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
  A_Frame.Component({
    namespace: "A-ARE",
    name: "Are",
    description: "Base component class for A-Concept Rendering Engine (ARE) components. It provides lifecycle decorators and methods for defining templates, styles, and data, facilitating the creation of dynamic and interactive UI components within the ARE framework."
  })
], Are);
var AreContext = class extends A_Fragment {
  constructor(source = "") {
    super({ name: "AreContext" });
    this._roots = [];
    this._source = source;
  }
  get scope() {
    return A_Context.scope(this);
  }
  get roots() {
    return this._roots;
  }
  get source() {
    return this._source;
  }
  addRoot(node) {
    this._roots.push(node);
    this.scope.register(node);
  }
  removeRoot(node) {
    this._roots = this._roots.filter((r) => r.aseid.toString() !== node.aseid.toString());
  }
};
AreContext = __decorateClass([
  A_Frame.Fragment({
    namespace: "A-ARE",
    name: "AreContext",
    description: "Context fragment for the A-Concept Rendering Engine (ARE) framework, serving as a foundational component for managing shared state and configurations within the ARE environment. This Context uses to encapsulate global settings, resources, and utilities that can be accessed by various ARE components and entities during the rendering and interaction processes."
  })
], AreContext);
var AreSyntaxContext = class extends A_Fragment {
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
AreSyntaxContext = __decorateClass([
  A_Frame.Fragment({
    namespace: "A-ARE",
    name: "AreSyntaxContext",
    description: "Context that defines the syntax rules and structures for the A-Concept Rendering Engine (ARE). It provides mechanisms for parsing and interpreting templates, attributes, directives, interpolations, and event listeners, enabling dynamic and interactive UI rendering within the ARE framework."
  })
], AreSyntaxContext);

// src/lib/AreNode/AreNode.constants.ts
var AreNodeFeatures = /* @__PURE__ */ ((AreNodeFeatures2) => {
  AreNodeFeatures2["onBeforeRender"] = "_AreNode_onBeforeRender";
  AreNodeFeatures2["onRender"] = "_AreNode_onRender";
  AreNodeFeatures2["onAfterRender"] = "_AreNode_onAfterRender";
  AreNodeFeatures2["onCompile"] = "_AreNode_onCompile";
  AreNodeFeatures2["onEvent"] = "_AreNode_onEvent";
  AreNodeFeatures2["onUpdate"] = "_AreNode_onUpdate";
  AreNodeFeatures2["onMount"] = "_AreNode_onMount";
  AreNodeFeatures2["onUnmount"] = "_AreNode_onUnmount";
  return AreNodeFeatures2;
})(AreNodeFeatures || {});
var AreIndex = class _AreIndex extends A_Fragment {
  constructor(aseid) {
    super({
      name: aseid instanceof ASEID ? aseid.toString() : aseid
    });
    /**
     * Platform-agnostic element index
     * Element can be DOM Element, PDF element, DOCX element, etc.
     * The actual type depends on the compiler being used
     */
    this._index = {
      ASEID_to_Path: /* @__PURE__ */ new Map(),
      Path_to_ASEID: /* @__PURE__ */ new Map(),
      Node_to_Path: /* @__PURE__ */ new Map(),
      Path_to_Node: /* @__PURE__ */ new Map()
    };
  }
  /**
   * Unique hash representing the current state of the index
   * Can be used to identify changes in the index
   */
  get state() {
    const entries = Array.from(this._index.ASEID_to_Path.entries()).sort(([aseidA], [aseidB]) => aseidA.localeCompare(aseidB)).map(([aseid, path]) => `${aseid}:${JSON.stringify(path)}`);
    return entries.join("|");
  }
  get scope() {
    return A_Context.scope(this);
  }
  get parent() {
    return A_Context.scope(this).parent?.resolve(_AreIndex);
  }
  get size() {
    return this._index.ASEID_to_Path.size;
  }
  get nodes() {
    return Array.from(this._index.Node_to_Path.keys());
  }
  get paths() {
    return Array.from(this._index.Path_to_Node.keys());
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
   * Adds a platform-agnostic element to the index
   * @param node - AreNode to index
   * @param path - Platform-specific element (DOM, PDF, DOCX, etc.)
   */
  add(node, path) {
    this._index.ASEID_to_Path.set(node.aseid.toString(), path);
    this._index.Path_to_ASEID.set(path, node.aseid.toString());
    this._index.Node_to_Path.set(node, path);
    this._index.Path_to_Node.set(path, node);
  }
  /**
   * Retrieves platform-specific element by AreNode
   * @param node - AreNode to look up
   * @returns Platform-specific element or undefined
   */
  pathOf(node) {
    return this._index.Node_to_Path.get(node);
  }
  /**
   * Retrieves AreNode by platform-specific element
   * @param element - Platform-specific element to look up
   * @returns AreNode or undefined
   */
  nodeOf(path) {
    return this._index.Path_to_Node.get(path);
  }
  /**
   * Removes index entry by AreNode
   * @param node - AreNode to remove from index
   */
  removeByNode(node) {
    const path = this._index.Node_to_Path.get(node);
    if (path) {
      this._index.ASEID_to_Path.delete(node.aseid.toString());
      this._index.Path_to_ASEID.delete(path);
      this._index.Node_to_Path.delete(node);
      this._index.Path_to_Node.delete(path);
    }
  }
  replaceByNode(oldNode, newNode) {
    const path = this._index.Node_to_Path.get(oldNode);
    if (path) {
      this._index.ASEID_to_Path.delete(oldNode.aseid.toString());
      this._index.Path_to_ASEID.set(path, newNode.aseid.toString());
      this._index.Node_to_Path.delete(oldNode);
      this._index.Node_to_Path.set(newNode, path);
      this._index.Path_to_Node.set(path, newNode);
    }
  }
  replacePath(oldPath, newPath) {
    const aseid = this._index.Path_to_ASEID.get(oldPath);
    const node = this._index.Path_to_Node.get(oldPath);
    if (aseid && node) {
      this._index.ASEID_to_Path.set(aseid, newPath);
      this._index.Path_to_ASEID.delete(oldPath);
      this._index.Path_to_ASEID.set(newPath, aseid);
      this._index.Node_to_Path.set(node, newPath);
      this._index.Path_to_Node.delete(oldPath);
      this._index.Path_to_Node.set(newPath, node);
    }
  }
  /**
   * Removes index entry by platform-specific element
   * @param path - Platform-specific element to remove from index
   */
  removeByElement(path) {
    const aseid = this._index.Path_to_ASEID.get(path);
    if (aseid) {
      const node = this._index.Path_to_Node.get(path);
      if (node) {
        this._index.ASEID_to_Path.delete(aseid);
        this._index.Path_to_ASEID.delete(path);
        this._index.Node_to_Path.delete(node);
        this._index.Path_to_Node.delete(path);
      }
    }
  }
  clear() {
    this._index.ASEID_to_Path.clear();
    this._index.Path_to_ASEID.clear();
    this._index.Node_to_Path.clear();
    this._index.Path_to_Node.clear();
  }
};
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
AreProps = __decorateClass([
  A_Frame.Fragment({
    namespace: "A-ARE",
    name: "AreProps",
    description: "Execution context for managing properties within the A-Concept Rendering Engine (ARE) framework, allowing for type-safe storage and retrieval of key-value pairs associated with a specific ASEID."
  })
], AreProps);
var AreStore = class extends A_ExecutionContext {
  constructor(aseid) {
    super(aseid.toString());
  }
  set(param1, param2) {
    if (typeof param1 === "object") {
      Object.entries(param1).forEach(([key, value]) => {
        super.set(key, value);
      });
    } else if (param2 !== void 0) {
      super.set(param1, param2);
    }
    return this;
  }
};
AreStore = __decorateClass([
  A_Frame.Fragment({
    description: "Are Store uses to keep AreNode related information for interpolations, runtime data, etc. This object can be injected to manipulate with data at runtime."
  })
], AreStore);

// src/lib/AreSceneInstruction/AreSceneInstruction.constants.ts
var AreSceneInstructionFeatures = /* @__PURE__ */ ((AreSceneInstructionFeatures3) => {
  AreSceneInstructionFeatures3["Init"] = "_AreSceneInstructionInit";
  AreSceneInstructionFeatures3["Apply"] = "_AreSceneInstructionApply";
  AreSceneInstructionFeatures3["Revert"] = "_AreSceneInstructionRevert";
  return AreSceneInstructionFeatures3;
})(AreSceneInstructionFeatures || {});

// src/lib/AreSceneInstruction/AreSceneInstruction.entity.ts
var AreSceneInstruction = class extends A_Entity {
  get scene() {
    return A_Context.scope(this).resolve(AreScene);
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
  fromNew(newEntity) {
    const identity = newEntity.id || {
      name: newEntity.action,
      node: newEntity.node.aseid.toString()
    };
    const id = this.createHash(identity);
    this.aseid = this.generateASEID({
      entity: A_FormatterHelper.toKebabCase(newEntity.action),
      id
    });
    this.action = newEntity.action;
    this.node = newEntity.node;
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

// src/lib/AreSceneInstruction/types/AddAttribute.instruction.ts
var AddAttributeInstruction = class extends AreSceneInstruction {
  get name() {
    return this.params.name;
  }
  get value() {
    return this.params.value;
  }
  constructor(node, name, value) {
    super({
      id: [name, node],
      action: "add-attribute",
      node,
      params: {
        name,
        value
      }
    });
  }
};

// src/lib/AreSceneInstruction/types/AddDirective.instruction.ts
var AddDirectiveInstruction = class extends AreSceneInstruction {
  get directive() {
    return this.params.directive;
  }
  get value() {
    return this.params.value;
  }
  constructor(node, directive, value) {
    super({
      id: [directive, node],
      action: "directive",
      node,
      params: {
        directive,
        value
      }
    });
  }
};

// src/lib/AreSceneInstruction/types/AddStyle.instruction.ts
var AddStyleInstruction = class extends AreSceneInstruction {
  get styles() {
    return this.params.styles;
  }
  constructor(node, styles) {
    super({
      id: [styles, node],
      action: "add-style",
      node,
      params: {
        styles
      }
    });
  }
};

// src/lib/AreSceneInstruction/types/AddStyleProperty.instruction.ts
var AddStylePropertyInstruction = class extends AreSceneInstruction {
  get styles() {
    return this.params.property;
  }
  get value() {
    return this.params.value;
  }
  constructor(node, property, value) {
    super({
      id: [property, node],
      action: "add-style",
      node,
      params: {
        property,
        value
      }
    });
  }
};
var AreEvent = class extends A_Fragment {
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
AreEvent = __decorateClass([
  A_Frame.Fragment({
    namespace: "A-ARE",
    name: "AreEvent",
    description: "Event context for managing events within the A-Concept Rendering Engine (ARE) framework, encapsulating event data and associated nodes to facilitate event-driven interactions."
  })
], AreEvent);

// src/lib/AreSceneInstruction/types/AttachListener.instruction.ts
var AttachListenerInstruction = class extends AreSceneInstruction {
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
  constructor(node, target, listener) {
    super({
      id: [node, listener.name],
      action: "listener",
      node,
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

// src/lib/AreSceneInstruction/types/AttachRootNode.instruction.ts
var AttachRootNodeInstruction = class extends AreSceneInstruction {
  get id() {
    return this.node.aseid.toString();
  }
  constructor(node) {
    super({
      id: [node],
      action: "attach-root-node",
      node,
      params: {}
    });
  }
};

// src/lib/AreSceneInstruction/types/MountNode.instruction.ts
var MountNodeInstruction = class extends AreSceneInstruction {
  get path() {
    return this.params.path;
  }
  constructor(node, path) {
    super({
      id: [node],
      action: "mount-node",
      node,
      params: {
        path
      }
    });
  }
};

// src/lib/AreSceneInstruction/types/ReplaceInterpolation.instruction.ts
var ReplaceInterpolationInstruction = class extends AreSceneInstruction {
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
  constructor(node, interpolation, value, prevValue) {
    super({
      id: [node, interpolation],
      action: "replace-interpolation",
      node,
      params: {
        interpolation,
        prevValue,
        value
      }
    });
  }
};

// src/lib/AreSceneInstruction/types/UnmountNode.instruction.ts
var UnmountNodeInstruction = class extends AreSceneInstruction {
  constructor(node, path) {
    super({
      id: [node],
      action: "unmount-node",
      node,
      params: {
        path
      }
    });
  }
};

// src/lib/AreScene/AreScene.context.ts
var AreScene = class _AreScene extends A_Fragment {
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
  get scope() {
    return A_Context.scope(this);
  }
  get index() {
    return A_Context.scope(this).resolveFlat(AreIndex);
  }
  get parent() {
    return A_Context.scope(this).parent?.resolveFlat(_AreScene);
  }
  get children() {
    return this.scope.resolveFlatAll(AreNode).map((n) => n.scope.resolveFlat(_AreScene)).filter((s) => !!s);
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
  nodes(filter) {
    const nodes = [];
    for (const path of this.paths()) {
      const node = this.index.nodeOf(path);
      if (!node) {
        continue;
      }
      if (filter && !filter(node)) {
        continue;
      }
      nodes.push(node);
    }
    return nodes;
  }
  renderPlanFor(node, filter) {
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
      if (action.node === node) {
        actions.push(action);
      }
    }
    return actions;
  }
  get debugPrefix() {
    return `${" - ".repeat(this.depth)}`;
  }
  get path() {
    if (!this.parent)
      return "";
    else {
      const ownerNode = this.parent.scope.resolve(new A_Dependency(AreNode, {
        flat: true,
        query: {
          aseid: this.id
        }
      }));
      const NodePath = this.parent.index.pathOf(ownerNode);
      return this.parent.path ? this.parent.path + "." + NodePath : NodePath;
    }
  }
  *paths() {
    let paths = this.index.paths;
    paths.sort((a, b) => {
      const aParsed = a.split(".").map((part) => parseInt(part, 10));
      const bParsed = b.split(".").map((part) => parseInt(part, 10));
      const len = Math.min(aParsed.length, bParsed.length);
      for (let i = 0; i < len; i++) {
        if (aParsed[i] !== bParsed[i]) {
          return aParsed[i] - bParsed[i];
        }
      }
      return aParsed.length - bParsed.length;
    });
    for (const path of paths) {
      yield path;
    }
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
  isAttached(node) {
    return !!this.scope.resolve(new A_Dependency(AreNode, {
      flat: true,
      query: {
        aseid: node.aseid
      }
    }));
  }
  attach(node) {
    this.scope.register(node);
    node.scope.inherit(this.scope);
  }
  sceneOf(node) {
    return node.scope.resolveFlat(_AreScene);
  }
  propsOf(node) {
    return node.scope.resolveFlat(AreProps);
  }
  storeOf(node) {
    return node.scope.resolveFlat(AreStore);
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
    const planned = this.scope.resolve(new A_Dependency(AreSceneInstruction, {
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
  resetPlan(node) {
    for (const instruction of this.renderPlanFor(node)) {
      if (instruction.node === node) {
        this.unPlan(instruction);
      }
    }
  }
  resetState(node) {
    for (const instruction of this.renderPlanFor(node)) {
      if (instruction.node === node) {
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
var AreSceneError = class extends A_Error {
};
AreSceneError.SceneError = "AreSceneError.SceneError";
AreSceneError.RootNotFound = "AreSceneError.RootNotFound";
AreSceneError.UpdateFailed = "AreSceneError.UpdateFailed";
AreSceneError.MountFailed = "AreSceneError.MountFailed";
AreSceneError.UnmountFailed = "AreSceneError.UnmountFailed";
AreSceneError.MountPointNotFound = "AreSceneError.MountPointNotFound";
AreSceneError.InvalidTemplate = "AreSceneError.InvalidTemplate";
AreSceneError.RenderFailed = "AreSceneError.RenderFailed";
var AreNode = class extends A_Entity {
  get id() {
    return this.aseid.id;
  }
  get scope() {
    if (!this._scope) {
      this._scope = new A_Scope({
        name: `${this.aseid.id}`
      });
    }
    return this._scope;
  }
  get content() {
    return this.scope.resolveFlat(AreScene);
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
    const eventScope = A_TypeGuards.isScopeInstance(eventOrScope) ? eventOrScope.inherit(this.scope) : new A_Scope({
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
    this._scope = new A_Scope({
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
      attachedScope = A_Context.scope(this);
    } catch (error) {
      throw new A_Error({
        title: `A_UI_Node Scope Inheritance Error`,
        description: `The A_UI_Node entity with ASEID '${this.aseid.toString()}' is not bound to any context scope. Please ensure that the entity is created within a valid context.`,
        originalError: error
      });
    }
  }
};
AreNode = __decorateClass([
  A_Frame.Entity({
    namespace: "A-ARE",
    name: "AreNode",
    description: "An AreNode entity represents a node within the A-Concept Rendering Engine (ARE) framework. It encapsulates template, markup, and styles, and manages its own scope for nested fragments and entities. AreNodes are responsible for handling events, compiling, rendering, updating, and lifecycle management within the ARE context."
  })
], AreNode);

// src/lib/AreSyntax/AreSyntax.component.ts
var AreSyntax = class extends A_Component {
  get config() {
    return A_Context.scope(this).resolveFlat(AreSyntaxContext);
  }
  isRootNode(node) {
    return node.aseid.entity.toLowerCase() === this.config.rootTag;
  }
  isCustomNode(node) {
    return !this.config.standardTags.has(node.aseid.entity.toLowerCase());
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
        throw new A_Error(`Missing closing tag for <${rootTag}> starting at index ${startIndex}`);
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
      const node = new AreNode({
        id: rootId,
        scope: "are",
        component: "are-root",
        markup,
        template: content
      });
      nodes.push(node);
    }
    return nodes;
  }
  extractInterpolations(template) {
    const interpolationRegex = new RegExp(`${this.config.interpolationDelimiters[0]}\\s*([a-zA-Z0-9_.$]+)\\s*${this.config.interpolationDelimiters[1]}`, "g");
    const interpolations = [];
    let match;
    while ((match = interpolationRegex.exec(template)) !== null) {
      interpolations.push({
        raw: match[0],
        name: match[1],
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
        tag,
        name,
        raw,
        value: value || "",
        binding: isBinding
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
  isBindingProp(prop) {
    return prop.raw.trim().startsWith(this.config.bindingDelimiter);
  }
  extractPropValue(prop, parentStore) {
    if (prop.value == null) {
      return void 0;
    }
    if (prop.binding) {
      const value = prop.value.trim();
      if (value.startsWith("'") && value.endsWith("'") || value.startsWith('"') && value.endsWith('"')) {
        return value.slice(1, -1);
      }
      return parentStore?.get(value);
    }
    return prop.value;
  }
  replaceInterpolation(template, interpolation, value) {
    const key = typeof interpolation === "string" ? interpolation : interpolation.name;
    return template.replace(new RegExp(`${this.config.interpolationDelimiters[0]}\\s*${key}\\s*${this.config.interpolationDelimiters[1]}`, "g"), value !== void 0 ? String(value) : "");
  }
};
__decorateClass([
  A_Frame.Method({
    description: "Determines if a given AreNode is a root node based on its entity type."
  })
], AreSyntax.prototype, "isRootNode", 1);
__decorateClass([
  A_Frame.Method({
    description: "Determines if a given AreNode represents a custom component as opposed to a standard HTML tag."
  })
], AreSyntax.prototype, "isCustomNode", 1);
__decorateClass([
  A_Frame.Method({
    description: "Extracts root AreNode elements from the document based on the configured root tag."
  })
], AreSyntax.prototype, "extractRoots", 1);
__decorateClass([
  A_Frame.Method({
    description: "Extracts interpolations from a template string based on the configured interpolation delimiters."
  })
], AreSyntax.prototype, "extractInterpolations", 1);
__decorateClass([
  A_Frame.Method({
    description: "Extracts custom directives from the first opening tag of a template string."
  })
], AreSyntax.prototype, "extractDirectives", 1);
AreSyntax = __decorateClass([
  A_Frame.Component({
    namespace: "A-ARE",
    name: "AreSyntax",
    description: "Context component that defines the syntax rules and structures for the A-Concept Rendering Engine (ARE). It provides mechanisms for parsing and interpreting templates, attributes, directives, interpolations, and event listeners, enabling dynamic and interactive UI rendering within the ARE framework."
  })
], AreSyntax);
var AreSyntaxError = class extends A_Error {
};
AreSyntaxError.SyntaxParseError = "Are Syntax Parse Error";
AreSyntaxError.SyntaxNotSupportedError = "Are Syntax Not Supported Error";
AreSyntaxError.MethodNotImplementedError = "Are Syntax Method Not Implemented Error";
var AreInitSignal = class _AreInitSignal extends A_Signal {
  static async default() {
    return new _AreInitSignal({ data: { ready: false } });
  }
};
var AreRouteSignal = class _AreRouteSignal extends A_Signal {
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
var _a, _b;
var AreApp = class extends A_Service {
  async [_b = A_ServiceFeatures.onAfterLoad](context, logger) {
  }
  async [_a = A_ServiceFeatures.onStart](context, syntax, bus, logger) {
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
__decorateClass([
  A_Feature.Extend(),
  __decorateParam(0, A_Dependency.Required()),
  __decorateParam(0, A_Inject(AreContext)),
  __decorateParam(1, A_Inject(A_Logger))
], AreApp.prototype, _b, 1);
__decorateClass([
  A_Feature.Extend(),
  __decorateParam(0, A_Dependency.Required()),
  __decorateParam(0, A_Inject(AreContext)),
  __decorateParam(1, A_Inject(AreSyntax)),
  __decorateParam(2, A_Inject(A_SignalBus)),
  __decorateParam(3, A_Inject(A_Logger))
], AreApp.prototype, _a, 1);
var AreAppError = class extends A_Error {
};
var AreCompilerError = class extends A_Error {
};
AreCompilerError.RenderError = "Are Compiler Render Error";
AreCompilerError.CompilationError = "Are Compiler Compilation Error";

// src/lib/AreCompiler/AreCompiler.component.ts
var AreCompiler = class extends A_Component {
  // ==================================================================================
  // ========================= COMPONENT METHODS ======================================
  // ==================================================================================
  index(node) {
  }
  component(node) {
    let scope;
    try {
      scope = node.scope;
    } catch (error) {
      scope = A_Context.scope(this);
    }
    return scope.resolve(A_FormatterHelper.toPascalCase(node.aseid.entity));
  }
  async beforeLoad(node, scope, feature, ...args) {
    scope.resolve(A_Logger);
    const component = scope.resolveOnce(A_FormatterHelper.toPascalCase(node.aseid.entity));
    if (component)
      await feature.chain(component, "_Are_onBeforeLoad" /* onBeforeLoad */, node.scope);
  }
  async load(node, scope, syntax, feature, logger, ...args) {
    const loadTimerLabel = `Load Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`;
    console.time(loadTimerLabel);
    console.time(`Load: Component Resolution for <${node.aseid.entity}>`);
    const component = this.component(node);
    console.timeEnd(`Load: Component Resolution for <${node.aseid.entity}>`);
    if (!component && syntax.isCustomNode(node)) {
      logger?.warning(
        "Component Not Found",
        `No component registered for entity: ${node.aseid.entity}. Please ensure that the component is registered in the scope before rendering.`
      );
    }
    console.time(`Load: Scene/Store/Props Creation for <${node.aseid.entity}>`);
    const newNodeScene = new AreScene(node.aseid);
    const newNodeIndex = new AreIndex(node.aseid);
    const newNodeStore = new AreStore(node.aseid);
    const newNodeProps = new AreProps(node.aseid);
    scope.register(newNodeScene);
    scope.register(newNodeIndex);
    if (syntax.isCustomNode(node)) {
      scope.register(newNodeStore);
      scope.register(newNodeProps);
    }
    console.timeEnd(`Load: Scene/Store/Props Creation for <${node.aseid.entity}>`);
    if (component) {
      console.time(`Load: Component Lifecycle Chains for <${node.aseid.entity}>`);
      await feature.chain(component, "_Are_onData" /* onData */, scope);
      await feature.chain(component, "_Are_onStyles" /* onStyles */, scope);
      await feature.chain(component, "_Are_onTemplate" /* onTemplate */, scope);
      console.timeEnd(`Load: Component Lifecycle Chains for <${node.aseid.entity}>`);
    }
    console.time(`Load: Node Indexing for <${node.aseid.entity}>`);
    this.index(node);
    console.timeEnd(`Load: Node Indexing for <${node.aseid.entity}>`);
    logger?.debug(newNodeScene.debugPrefix + `Loaded component <${node.aseid.entity}> with ${this.constructor.name}`);
    console.time(`Load: Child Nodes Processing for <${node.aseid.entity}>`);
    const sceneNodes = newNodeScene.nodes();
    for (let i = 0; i < sceneNodes.length; i++) {
      const sceneNode = sceneNodes[i];
      const childTimerLabel = `Load: Child Node [${i}] <${sceneNode.aseid.entity}> for Parent <${node.aseid.entity}>`;
      console.time(childTimerLabel);
      if (!newNodeScene.isAttached(sceneNode)) {
        newNodeScene.attach(sceneNode);
        await sceneNode.load();
      }
      console.timeEnd(childTimerLabel);
    }
    console.timeEnd(`Load: Child Nodes Processing for <${node.aseid.entity}>`);
    console.timeEnd(loadTimerLabel);
  }
  async afterLoad(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(scene.debugPrefix + `[Load -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    const component = this.component(node);
    if (component)
      await feature.chain(component, "_Are_onAfterLoad" /* onAfterLoad */, node.scope);
  }
  beforeCompile(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(scene.debugPrefix + `[Compile -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    const component = scope.resolveOnce(A_FormatterHelper.toPascalCase(node.aseid.entity));
    if (component)
      feature.chain(component, "_Are_onBeforeCompile" /* onBeforeCompile */, node.scope);
  }
  compile(node, scene, parentScene, syntax, props, store, parentStore, logger, scope) {
    const compileTimerLabel = `Compile Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`;
    console.time(compileTimerLabel);
    try {
      if (!syntax.isRootNode(node)) {
        logger?.debug("violet", scene.debugPrefix + `Compiling node <${node.aseid.entity}> in Scene <${parentScene.name}>`);
        console.time(`Compile: Mount Instruction Planning for <${node.aseid.entity}>`);
        const mountInstruction = new MountNodeInstruction(node, scene.path);
        if (!parentScene.isPlanned(mountInstruction)) {
          logger?.debug("red", scene.debugPrefix + `Planning Node Mount for Node <${node.type}> ASEID: <${node.aseid.entity}>`);
          parentScene.plan(mountInstruction);
          mountInstruction.init();
        }
        console.timeEnd(`Compile: Mount Instruction Planning for <${node.aseid.entity}>`);
        console.time(`Compile: Template Interpolation Processing for <${node.aseid.entity}>`);
        if (syntax.isCustomNode(node)) {
          const interpolations = syntax.extractInterpolations(node.template);
          for (let i = 0; i < interpolations.length; i++) {
            const interpolation = interpolations[i];
            console.time(`Compile: Interpolation [${i}] "${interpolation.name}" for <${node.aseid.entity}>`);
            const value = store.get(interpolation.name) || parentStore.get(interpolation.name);
            const instruction = new ReplaceInterpolationInstruction(node, interpolation, value);
            const stateInstruction = parentScene.getState(instruction);
            instruction.update({ value, prevValue: stateInstruction?.value });
            if (!parentScene.isPlanned(instruction)) {
              parentScene.plan(instruction);
              instruction.init();
            } else {
              parentScene.dropState(instruction);
              parentScene.unPlan(instruction);
              parentScene.plan(instruction);
            }
            console.timeEnd(`Compile: Interpolation [${i}] "${interpolation.name}" for <${node.aseid.entity}>`);
          }
        }
        console.timeEnd(`Compile: Template Interpolation Processing for <${node.aseid.entity}>`);
        console.time(`Compile: Attributes Processing for <${node.aseid.entity}>`);
        const attributes = syntax.extractAttributes(node.markup);
        for (let i = 0; i < attributes.length; i++) {
          const attr = attributes[i];
          console.time(`Compile: Attribute [${i}] "${attr.name}" for <${node.aseid.entity}>`);
          const name = attr.name;
          const value = (syntax.isBindingProp(attr) ? store.get(attr.value) || parentStore.get(attr.value) : attr.value) || "";
          props.set(name, value);
          parentScene.plan(new AddAttributeInstruction(node, name, value));
          console.timeEnd(`Compile: Attribute [${i}] "${attr.name}" for <${node.aseid.entity}>`);
        }
        console.timeEnd(`Compile: Attributes Processing for <${node.aseid.entity}>`);
        console.time(`Compile: Directives Processing for <${node.aseid.entity}>`);
        const directives = syntax.extractDirectives(node.markup);
        for (let i = 0; i < directives.length; i++) {
          const directive = directives[i];
          console.time(`Compile: Directive [${i}] "${directive.name}" for <${node.aseid.entity}>`);
          let directiveValue;
          if (directive.value) {
            directiveValue = store.get(directive.value) || parentStore.get(directive.value);
          }
          let instruction = new AddDirectiveInstruction(node, directive, directiveValue);
          const stateInstruction = parentScene.getState(instruction);
          if (!stateInstruction || stateInstruction.value !== directiveValue) {
            parentScene.unPlan(instruction);
            parentScene.plan(instruction);
            instruction.init();
          }
          console.timeEnd(`Compile: Directive [${i}] "${directive.name}" for <${node.aseid.entity}>`);
        }
        console.timeEnd(`Compile: Directives Processing for <${node.aseid.entity}>`);
        console.time(`Compile: Styles Processing for <${node.aseid.entity}>`);
        let styles = node.styles || "";
        const styleInterpolations = syntax.extractInterpolations(styles);
        for (let i = 0; i < styleInterpolations.length; i++) {
          const interpolation = styleInterpolations[i];
          console.time(`Compile: Style Interpolation [${i}] "${interpolation.name}" for <${node.aseid.entity}>`);
          const value = store.get(interpolation.name);
          styles = syntax.replaceInterpolation(styles, interpolation, value);
          console.timeEnd(`Compile: Style Interpolation [${i}] "${interpolation.name}" for <${node.aseid.entity}>`);
        }
        if (styles.trim()) {
          const instruction = new AddStyleInstruction(node, styles);
          if (!parentScene.isPlanned(instruction)) {
            parentScene.plan(instruction);
            instruction.init();
          }
        }
        console.timeEnd(`Compile: Styles Processing for <${node.aseid.entity}>`);
        console.time(`Compile: Listeners Processing for <${node.aseid.entity}>`);
        const listeners = syntax.extractListeners(node.markup);
        for (let i = 0; i < listeners.length; i++) {
          const listener = listeners[i];
          console.time(`Compile: Listener [${i}] "${listener.name}" for <${node.aseid.entity}>`);
          let currentScene = scene;
          let targetNode = node;
          while (!syntax.isCustomNode(targetNode) && currentScene.parent) {
            targetNode = currentScene.parent.scope.resolve(new A_Dependency(AreNode, {
              query: {
                aseid: currentScene.id
              }
            }));
            currentScene = currentScene.parent;
          }
          const instruction = new AttachListenerInstruction(node, targetNode, listener);
          if (!parentScene.isPlanned(instruction)) {
            parentScene.plan(instruction);
            instruction.init();
          }
          console.timeEnd(`Compile: Listener [${i}] "${listener.name}" for <${node.aseid.entity}>`);
        }
        console.timeEnd(`Compile: Listeners Processing for <${node.aseid.entity}>`);
      }
      console.time(`Compile: Child Nodes Compilation for <${node.aseid.entity}>`);
      const sceneNodes = scene.nodes();
      for (let i = 0; i < sceneNodes.length; i++) {
        const sceneNode = sceneNodes[i];
        const childTimerLabel = `Compile: Child Node [${i}] <${sceneNode.aseid.entity}> for Parent <${node.aseid.entity}>`;
        console.time(childTimerLabel);
        sceneNode.compile();
        console.timeEnd(childTimerLabel);
      }
      console.timeEnd(`Compile: Child Nodes Compilation for <${node.aseid.entity}>`);
    } catch (error) {
      logger?.error(error);
    }
    console.timeEnd(compileTimerLabel);
  }
  afterCompile(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    const component = scope.resolveOnce(A_FormatterHelper.toPascalCase(node.aseid.entity));
    logger?.debug(scene.debugPrefix + `[Compile -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (component)
      feature.chain(component, "_Are_onAfterCompile" /* onAfterCompile */, node.scope);
  }
  async event(node, scope, event, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(scene.debugPrefix + `Event Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}} for event: ${event.name}`);
    const component = scope.resolveOnce(A_FormatterHelper.toPascalCase(node.aseid.entity));
    if (component) {
      try {
        await feature.chain(component, event.name, scope);
      } catch (error) {
        logger?.error(error);
      }
    }
  }
  beforeRender(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    const component = scope.resolveOnce(A_FormatterHelper.toPascalCase(node.aseid.entity));
    logger?.debug(scene.debugPrefix + `[Render -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (component)
      feature.chain(component, "_Are_onBeforeRender" /* onBeforeRender */, node.scope);
  }
  render(node, syntax, scene, parentScene, logger, ...args) {
    const renderTimerLabel = `Render Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`;
    console.time(renderTimerLabel);
    if (syntax.isRootNode(node)) {
      logger?.debug("red", scene.debugPrefix + `Rendering Root Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`);
      console.time(`Render: Root Node Attachment for <${node.aseid.entity}>`);
      new AttachRootNodeInstruction(node).apply(node.scope);
      console.timeEnd(`Render: Root Node Attachment for <${node.aseid.entity}>`);
    } else {
      if (!parentScene) {
        throw new AreCompilerError(
          AreCompilerError.RenderError,
          `Parent Scene not found for Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()} during render process.`
        );
      }
      logger?.debug("red", scene.debugPrefix + `Rendering  Child Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`, parentScene);
      console.time(`Render: Mount/Unmount Instructions Processing for <${node.aseid.entity}>`);
      const mountUnmountInstructions = parentScene.renderPlanFor(node, {
        filter: (inst) => inst instanceof MountNodeInstruction || inst instanceof UnmountNodeInstruction
      });
      for (let i = 0; i < mountUnmountInstructions.length; i++) {
        const instruction = mountUnmountInstructions[i];
        const instructionTimerLabel = `Render: Mount/Unmount Instruction [${i}] "${instruction.action}" for <${node.aseid.entity}>`;
        console.time(instructionTimerLabel);
        if (parentScene.getState(instruction)) {
          logger?.debug("yellow", scene.debugPrefix + `Skipping Action '${instruction.action}' for Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()} already processed.`);
          console.timeEnd(instructionTimerLabel);
          continue;
        }
        logger?.debug("red", scene.debugPrefix + `Processing ${instruction.action} Instruction for Node <${node.aseid.entity}> `);
        instruction.apply();
        parentScene.setState(instruction);
        console.timeEnd(instructionTimerLabel);
      }
      console.timeEnd(`Render: Mount/Unmount Instructions Processing for <${node.aseid.entity}>`);
      if (!parentScene.isPlanned(new MountNodeInstruction(node, scene.path))) {
        logger?.debug("yellow", scene.debugPrefix + `No Mount Instruction found for Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}. Skipping...`);
        console.timeEnd(renderTimerLabel);
        return;
      }
      console.time(`Render: Other Instructions Processing for <${node.aseid.entity}>`);
      const otherInstructions = parentScene.renderPlanFor(node, {
        order: [
          AddStyleInstruction,
          AttachListenerInstruction,
          AddAttributeInstruction,
          ReplaceInterpolationInstruction
        ]
      });
      for (let i = 0; i < otherInstructions.length; i++) {
        const instruction = otherInstructions[i];
        const instructionTimerLabel = `Render: Instruction [${i}] "${instruction.action}" for <${node.aseid.entity}>`;
        console.time(instructionTimerLabel);
        if (parentScene.getState(instruction)) {
          logger?.debug("yellow", scene.debugPrefix + `Skipping Action '${instruction.action}' for Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()} already processed.`);
          console.timeEnd(instructionTimerLabel);
          continue;
        }
        try {
          console.time(`Render: Execution Context Creation for Instruction [${i}] <${node.aseid.entity}>`);
          const executionContext = new A_ExecutionContext("AreBrowserCompiler: Mount Node Instruction");
          executionContext.set("content", scene);
          const applyScope = new A_Scope({ fragments: [executionContext] }).inherit(node.scope);
          console.timeEnd(`Render: Execution Context Creation for Instruction [${i}] <${node.aseid.entity}>`);
          console.time(`Render: Instruction Apply for [${i}] "${instruction.action}" <${node.aseid.entity}>`);
          instruction.apply(applyScope);
          console.timeEnd(`Render: Instruction Apply for [${i}] "${instruction.action}" <${node.aseid.entity}>`);
          applyScope.destroy();
          parentScene.setState(instruction);
        } catch (error) {
          logger?.error(error);
        }
        console.timeEnd(instructionTimerLabel);
      }
      console.timeEnd(`Render: Other Instructions Processing for <${node.aseid.entity}>`);
    }
    console.time(`Render: Child Nodes Rendering for <${node.aseid.entity}>`);
    const childNodes = scene.nodes();
    for (let i = 0; i < childNodes.length; i++) {
      const child = childNodes[i];
      const childTimerLabel = `Render: Child Node [${i}] <${child.aseid.entity}> for Parent <${node.aseid.entity}>`;
      console.time(childTimerLabel);
      console.log(scene.debugPrefix + `Rendering Child Node <${child.aseid.entity}> ASEID: ${child.aseid.toString()}`);
      child.render();
      console.timeEnd(childTimerLabel);
    }
    console.timeEnd(`Render: Child Nodes Rendering for <${node.aseid.entity}>`);
    console.timeEnd(renderTimerLabel);
  }
  afterRender(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    const component = this.component(node);
    logger?.debug(scene.debugPrefix + `[Render -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (component)
      feature.chain(component, "_Are_onAfterRender" /* onAfterRender */, node.scope);
  }
  beforeUpdate(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(scene.debugPrefix + `[Update -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    const component = this.component(node);
    if (component)
      feature.chain(component, "_Are_onBeforeUpdate" /* onBeforeUpdate */, node.scope);
  }
  update(node, scene, ...args) {
    console.time(scene.debugPrefix + `Updating Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`);
    console.time(`Node Compile Time for <${node.aseid.entity}> ASEID: ${node.aseid.toString()}>`);
    node.compile();
    console.timeEnd(`Node Compile Time for <${node.aseid.entity}> ASEID: ${node.aseid.toString()}>`);
    console.time(`Node Render Time for <${node.aseid.entity}> ASEID: ${node.aseid.toString()}>`);
    node.render();
    console.timeEnd(`Node Render Time for <${node.aseid.entity}> ASEID: ${node.aseid.toString()}>`);
    console.timeEnd(scene.debugPrefix + `Updating Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`);
  }
  afterUpdate(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(scene.debugPrefix + `[Update -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    const component = this.component(node);
    if (component)
      feature.chain(component, "_Are_onAfterUpdate" /* onAfterUpdate */, node.scope);
  }
  beforeUnmount(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(scene.debugPrefix + `[Unmount -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    const component = this.component(node);
    if (component)
      feature.chain(component, "_Are_onBeforeUnmount" /* onBeforeUnmount */, node.scope);
  }
  unmount(node, syntax, scene, parentScene, logger) {
    try {
      logger?.debug("red", scene.debugPrefix + `Unmounting Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`);
      if (!syntax.isRootNode(node)) {
        if (!parentScene) {
          throw new AreCompilerError(
            AreCompilerError.RenderError,
            `Parent Scene not found for Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()} during unmount process.`
          );
        }
        for (const instruction of parentScene.renderPlanFor(node)) {
          if (instruction.node === node) {
            instruction.revert(node.scope);
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
  afterUnmount(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(scene.debugPrefix + `[Unmount -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    const component = this.component(node);
    if (component)
      feature.chain(component, "_Are_onAfterUnmount" /* onAfterUnmount */, node.scope);
  }
  handleSignalVector(vector, context, state, scope, logger) {
    logger?.info(`Handling Signal Vector with ${context.roots.length} root nodes.`);
    try {
      for (const root of context.roots) {
        const callScope = new A_Scope({
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
__decorateClass([
  A_Feature.Extend({
    name: A_TYPES__EntityFeatures.LOAD,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(A_Feature))
], AreCompiler.prototype, "beforeLoad", 1);
__decorateClass([
  A_Feature.Extend({
    name: A_TYPES__EntityFeatures.LOAD,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreSyntax)),
  __decorateParam(3, A_Inject(A_Feature)),
  __decorateParam(4, A_Inject(A_Logger))
], AreCompiler.prototype, "load", 1);
__decorateClass([
  A_Feature.Extend({
    name: A_TYPES__EntityFeatures.LOAD,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Inject(A_Feature))
], AreCompiler.prototype, "afterLoad", 1);
__decorateClass([
  A_Feature.Extend({
    name: "_AreNode_onCompile" /* onCompile */,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Inject(A_Feature))
], AreCompiler.prototype, "beforeCompile", 1);
__decorateClass([
  A_Feature.Extend({
    name: "_AreNode_onCompile" /* onCompile */,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Dependency.Flat()),
  __decorateParam(1, A_Inject(AreScene)),
  __decorateParam(2, A_Dependency.Parent()),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Inject(AreSyntax)),
  __decorateParam(4, A_Inject(AreProps)),
  __decorateParam(5, A_Inject(AreStore)),
  __decorateParam(6, A_Dependency.Parent()),
  __decorateParam(6, A_Inject(AreStore)),
  __decorateParam(7, A_Inject(A_Logger)),
  __decorateParam(8, A_Inject(A_Scope))
], AreCompiler.prototype, "compile", 1);
__decorateClass([
  A_Feature.Extend({
    name: "_AreNode_onCompile" /* onCompile */,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Inject(A_Feature))
], AreCompiler.prototype, "afterCompile", 1);
__decorateClass([
  A_Feature.Extend({
    name: "_AreNode_onEvent" /* onEvent */,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreEvent)),
  __decorateParam(3, A_Inject(AreScene)),
  __decorateParam(4, A_Inject(A_Feature))
], AreCompiler.prototype, "event", 1);
__decorateClass([
  A_Feature.Extend({
    name: "_AreNode_onBeforeRender" /* onBeforeRender */,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Inject(A_Feature))
], AreCompiler.prototype, "beforeRender", 1);
__decorateClass([
  A_Feature.Extend({
    name: "_AreNode_onRender" /* onRender */,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreSyntax)),
  __decorateParam(2, A_Dependency.Flat()),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Dependency.Parent()),
  __decorateParam(3, A_Inject(AreScene)),
  __decorateParam(4, A_Inject(A_Logger))
], AreCompiler.prototype, "render", 1);
__decorateClass([
  A_Feature.Extend({
    name: "_AreNode_onAfterRender" /* onAfterRender */,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Inject(A_Feature))
], AreCompiler.prototype, "afterRender", 1);
__decorateClass([
  A_Feature.Extend({
    name: "_AreNode_onUpdate" /* onUpdate */,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Inject(A_Feature))
], AreCompiler.prototype, "beforeUpdate", 1);
__decorateClass([
  A_Feature.Extend({
    name: "_AreNode_onUpdate" /* onUpdate */,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreScene))
], AreCompiler.prototype, "update", 1);
__decorateClass([
  A_Feature.Extend({
    name: "_AreNode_onUpdate" /* onUpdate */,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Inject(A_Feature))
], AreCompiler.prototype, "afterUpdate", 1);
__decorateClass([
  A_Feature.Extend({
    name: "_AreNode_onUnmount" /* onUnmount */,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Inject(A_Feature))
], AreCompiler.prototype, "beforeUnmount", 1);
__decorateClass([
  A_Feature.Extend({
    name: "_AreNode_onUnmount" /* onUnmount */,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreSyntax)),
  __decorateParam(2, A_Dependency.Flat()),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Dependency.Parent()),
  __decorateParam(3, A_Inject(AreScene)),
  __decorateParam(4, A_Inject(A_Logger))
], AreCompiler.prototype, "unmount", 1);
__decorateClass([
  A_Feature.Extend({
    name: "_AreNode_onUnmount" /* onUnmount */,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Inject(A_Feature))
], AreCompiler.prototype, "afterUnmount", 1);
__decorateClass([
  A_Feature.Extend({
    name: A_SignalBusFeatures.onNext
  }),
  __decorateParam(0, A_Inject(A_SignalVector)),
  __decorateParam(1, A_Inject(AreContext)),
  __decorateParam(2, A_Inject(A_SignalState)),
  __decorateParam(3, A_Inject(A_Scope)),
  __decorateParam(4, A_Inject(A_Logger))
], AreCompiler.prototype, "handleSignalVector", 1);
AreCompiler = __decorateClass([
  A_Frame.Component({
    namespace: "A-ARE",
    name: "AreCompiler",
    description: "AreCompiler is responsible for compiling AreNodes into their respective components, managing the compilation lifecycle, and ensuring that each node is processed according to its defined behavior within the A-Concept Rendering Engine (ARE) framework."
  })
], AreCompiler);
var AreRoot = class extends Are {
  async attachListeners() {
  }
  async template(node, store) {
  }
  async onSignal(node, store, scene, vector, event) {
    console.log("Vector  received :", vector);
    console.log("Node  received   :", node);
  }
};
__decorateClass([
  A_Feature.Extend({
    name: A_ServiceFeatures.onLoad
  })
], AreRoot.prototype, "attachListeners", 1);
__decorateClass([
  Are.Template,
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreStore))
], AreRoot.prototype, "template", 1);
__decorateClass([
  Are.Signal,
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreStore)),
  __decorateParam(2, A_Inject(AreScene)),
  __decorateParam(3, A_Inject(A_SignalVector)),
  __decorateParam(4, A_Inject(AreEvent))
], AreRoot.prototype, "onSignal", 1);
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
  getElementByNode(node) {
    const scene = node.scope.resolveFlat(AreScene);
    const root = document.getElementById(new ASEID(scene.root.id).id);
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
  insertElementByNode(node, element) {
    const scene = node.scope.resolveFlat(AreScene);
    const root = document.getElementById(new ASEID(scene.root.id).id);
    this.insertElementAtPath(root, scene.path, element);
  }
  index(node) {
    const index = node.scope.resolveFlat(AreIndex);
    const scene = node.scope.resolveFlat(AreScene);
    index.clear();
    scene.reset();
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = node.template;
    const markupMap = this.createPositionBasedMarkupMap(node.template);
    this.indexElementsFromDOM(tempDiv, index, [], markupMap);
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
      index.add(areNode, currentPath.join("."));
    }
  }
  applyAttachRootNodeInstruction(instruction, logger) {
    const node = instruction.node;
    const rootElement = document.getElementById(node.id);
    if (!rootElement) {
      logger?.warning(`Root element with id <${node.id}> not found in DOM.`);
      return;
    }
    rootElement.innerHTML = node.template;
    rootElement.setAttribute("aseid", node.aseid.toString());
  }
  applyMountNodeInstruction(instruction, context, syntax, logger) {
    try {
      const node = instruction.node;
      const scene = instruction.scene;
      if (syntax.isCustomNode(node)) {
        logger?.debug("red", scene.debugPrefix + `Mounting Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()} at path `);
        const wrapper = document.createElement("div");
        wrapper.setAttribute("aseid", node.aseid.toString());
        wrapper.innerHTML = node.template;
        const element = this.getElementByNode(node);
        if (!element) {
          this.insertElementByNode(node, wrapper);
        } else {
          element.replaceWith(wrapper);
        }
      }
    } catch (error) {
      logger?.error(error);
    }
  }
  applyUnmountNodeInstruction(instruction, context, logger) {
    const node = instruction.node;
    const scene = instruction.scene;
    const element = this.getElementByNode(node);
    logger?.debug("red", scene.debugPrefix + `Unmounting Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`);
    try {
      element.replaceWith(document.createComment(` Unmounted Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()} `));
      node.unmount();
    } catch (error) {
      logger?.error(error);
    }
  }
  applyAddStyleInstruction(instruction, context, logger) {
    try {
      const node = instruction.node;
      const scene = instruction.scene;
      const styles = instruction.params?.styles || "";
      logger?.debug("green", scene.debugPrefix + `Applying styles for Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`);
      const styleElementId = `a-style-${node.aseid.entity}`;
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
    const node = instruction.node;
    const scene = instruction.scene;
    context.get("content");
    const element = this.getElementByNode(instruction.node);
    context.get("mountPoint");
    logger?.debug("green", scene.debugPrefix + `Attaching listener '${instruction.listener.name}' for target <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`);
    element.addEventListener(instruction.listener.name, instruction.callback);
  }
  applyAddAttributeInstruction(instruction, context, scope, logger) {
    const node = instruction.node;
    const scene = instruction.scene;
    context.get("content");
    const element = this.getElementByNode(node);
    logger?.debug("green", scene.debugPrefix + `Setting attribute '${instruction.name}'='${instruction.value}' for target <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`, element);
    element.setAttribute(instruction.name, instruction.value);
  }
  revertInstruction(instruction) {
    this.interpolationTextNodes.delete(instruction.aseid.toString());
  }
  applyReplaceInterpolationInstruction(instruction, context, scope, syntax, logger) {
    const node = instruction.node;
    const scene = instruction.scene;
    const element = this.getElementByNode(node);
    logger?.debug("magenta", scene.debugPrefix + `Replacing interpolation '${instruction.interpolation.name}' with value '${instruction.value}' for target <${node.aseid.entity}>`, instruction);
    const textNode = this.interpolationTextNodes.get(instruction.aseid.toString());
    if (textNode) {
      textNode.nodeValue = instruction.value;
    } else {
      const treeTextNodesWalker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node2) => {
            if (node2.nodeValue && node2.nodeValue.includes(instruction.interpolation.raw)) {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
          }
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
    const node = instruction.node;
    const scene = node.scope.resolveFlat(AreScene);
    const parentScene = instruction.scene;
    logger?.debug("green", scene.debugPrefix + `Initializing directive '${instruction.directive.name}' for Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`, scene, parentScene);
    switch (instruction.directive.name) {
      case "$if": {
        const mountInstruction = new MountNodeInstruction(node, scene.path);
        const unmountInstruction = new UnmountNodeInstruction(node, scene.path);
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
        logger?.warning(`Unknown directive '${instruction.directive.name}' for Node <${node.type}> ASEID: ${node.aseid.toString()}`);
    }
  }
  applyAddDirectiveInstruction(instruction, context, scope, logger) {
    const node = instruction.node;
    const scene = instruction.scene;
    this.getElementByNode(node);
    try {
      logger?.debug("green", scene.debugPrefix + `Applying directive '${instruction.directive.name}' for Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`, instruction);
    } catch (error) {
      logger?.error(error);
    }
  }
};
__decorateClass([
  A_Frame.Method({
    description: "Get DOM element corresponding to the given path from the root element."
  })
], AreHTMLCompiler.prototype, "getElementByPath", 1);
__decorateClass([
  A_Frame.Method({
    description: "Get DOM element corresponding to the given AreNode based on its scene path."
  })
], AreHTMLCompiler.prototype, "getElementByNode", 1);
__decorateClass([
  A_Frame.Method({
    description: "Insert a DOM element at the specified path within the root element."
  })
], AreHTMLCompiler.prototype, "insertElementAtPath", 1);
__decorateClass([
  A_Frame.Method({
    description: "Insert a DOM element corresponding to the given AreNode at its scene path."
  })
], AreHTMLCompiler.prototype, "insertElementByNode", 1);
__decorateClass([
  A_Frame.Method({
    description: "Indexes the elements of the given AreNode within its scene, preserving the original markup structure."
  })
], AreHTMLCompiler.prototype, "index", 1);
__decorateClass([
  A_Feature.Extend({
    name: "_AreSceneInstructionApply" /* Apply */,
    scope: [AttachRootNodeInstruction]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Logger))
], AreHTMLCompiler.prototype, "applyAttachRootNodeInstruction", 1);
__decorateClass([
  A_Feature.Extend({
    name: "_AreSceneInstructionApply" /* Apply */,
    scope: [MountNodeInstruction]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_ExecutionContext)),
  __decorateParam(2, A_Inject(AreSyntax)),
  __decorateParam(3, A_Inject(A_Logger))
], AreHTMLCompiler.prototype, "applyMountNodeInstruction", 1);
__decorateClass([
  A_Feature.Extend({
    name: "_AreSceneInstructionApply" /* Apply */,
    scope: [UnmountNodeInstruction]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_ExecutionContext)),
  __decorateParam(2, A_Inject(A_Logger))
], AreHTMLCompiler.prototype, "applyUnmountNodeInstruction", 1);
__decorateClass([
  A_Feature.Extend({
    name: "_AreSceneInstructionApply" /* Apply */,
    scope: [AddStyleInstruction]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_ExecutionContext)),
  __decorateParam(2, A_Inject(A_Logger))
], AreHTMLCompiler.prototype, "applyAddStyleInstruction", 1);
__decorateClass([
  A_Feature.Extend({
    name: "_AreSceneInstructionApply" /* Apply */,
    scope: [AttachListenerInstruction]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_ExecutionContext)),
  __decorateParam(2, A_Inject(A_Logger))
], AreHTMLCompiler.prototype, "applyAttachListenerInstruction", 1);
__decorateClass([
  A_Feature.Extend({
    name: "_AreSceneInstructionApply" /* Apply */,
    scope: [AddAttributeInstruction]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_ExecutionContext)),
  __decorateParam(2, A_Inject(A_Scope)),
  __decorateParam(3, A_Inject(A_Logger))
], AreHTMLCompiler.prototype, "applyAddAttributeInstruction", 1);
__decorateClass([
  A_Feature.Extend({
    name: "_AreSceneInstructionRevert" /* Revert */,
    scope: [ReplaceInterpolationInstruction]
  }),
  __decorateParam(0, A_Inject(A_Caller))
], AreHTMLCompiler.prototype, "revertInstruction", 1);
__decorateClass([
  A_Feature.Extend({
    name: "_AreSceneInstructionApply" /* Apply */,
    scope: [ReplaceInterpolationInstruction]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_ExecutionContext)),
  __decorateParam(2, A_Inject(A_Scope)),
  __decorateParam(3, A_Inject(AreSyntax)),
  __decorateParam(4, A_Inject(A_Logger))
], AreHTMLCompiler.prototype, "applyReplaceInterpolationInstruction", 1);
__decorateClass([
  A_Feature.Extend({
    name: "_AreSceneInstructionInit" /* Init */,
    scope: [AddDirectiveInstruction]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(A_Logger))
], AreHTMLCompiler.prototype, "initAddDirectiveInstruction", 1);
__decorateClass([
  A_Feature.Extend({
    name: "_AreSceneInstructionApply" /* Apply */,
    scope: [AddDirectiveInstruction]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_ExecutionContext)),
  __decorateParam(2, A_Inject(A_Scope)),
  __decorateParam(3, A_Inject(A_Logger))
], AreHTMLCompiler.prototype, "applyAddDirectiveInstruction", 1);
AreHTMLCompiler = __decorateClass([
  A_Frame.Component({
    namespace: "A-ARE",
    name: "AreHTMLCompiler",
    description: "HTML-specific compiler for A-Concept Rendering Engine (ARE) components, extending the base AreCompiler to handle HTML templates, styles, and rendering logic tailored for web environments."
  })
], AreHTMLCompiler);
var AreHTMLEngine = class extends A_Component {
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
__decorateClass([
  A_Feature.Extend({
    name: A_ServiceFeatures.onBeforeLoad,
    before: /.*/
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(AreSyntaxContext)),
  __decorateParam(2, A_Inject(AreHTMLCompiler)),
  __decorateParam(3, A_Inject(A_Logger))
], AreHTMLEngine.prototype, "injectSyntax", 1);
AreHTMLEngine = __decorateClass([
  A_Frame.Component({
    namespace: "A-ARE",
    name: "AreHTMLEngine",
    description: "HTML Rendering Engine for A-Concept Rendering Engine (ARE), responsible for processing and rendering HTML templates within the ARE framework."
  })
], AreHTMLEngine);

export { AddAttributeInstruction, AddDirectiveInstruction, AddStyleInstruction, AddStylePropertyInstruction, Are, AreApp, AreAppError, AreCompiler, AreCompilerError, AreContext, AreEvent, AreFeatures, AreHTMLCompiler, AreHTMLEngine, AreIndex, AreInitSignal, AreNode, AreNodeFeatures, AreProps, AreRoot, AreRouteSignal, AreScene, AreSceneError, AreSceneInstruction, AreSceneInstructionFeatures, AreStore, AreSyntax, AreSyntaxContext, AreSyntaxError, AttachListenerInstruction, AttachRootNodeInstruction, MountNodeInstruction, ReplaceInterpolationInstruction, UnmountNodeInstruction };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map