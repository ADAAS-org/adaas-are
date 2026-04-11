'use strict';

var aConcept = require('@adaas/a-concept');
var aFrame = require('@adaas/a-frame');
var aExecution = require('@adaas/a-utils/a-execution');

var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(result)) || result;
  return result;
};
exports.AreContext = class AreContext extends aExecution.A_ExecutionContext {
  constructor(source = "") {
    super("AreContext");
    /**
     * The roots array holds references to the root nodes of the ARE scene, allowing for easy access and management of the top-level components in the rendering hierarchy. The signalsMap is a mapping between root nodes and their associated signal vectors, enabling efficient management of reactive updates and interactions within the ARE framework based on changes in the application state or user input.
     */
    this._roots = [];
    /**
     * This property stores a map between root node and conditions that should be met to render particular component inside the root node. This can be used to manage complex rendering logic and to optimize performance by ensuring that components are only rendered when necessary based on the defined conditions.
     */
    this._signalsMap = /* @__PURE__ */ new Map();
    this._performance = /* @__PURE__ */ new Map();
    this._performanceStart = /* @__PURE__ */ new Map();
    this._performanceDepth = /* @__PURE__ */ new Map();
    this._source = source;
  }
  /**
   * The global object can be used to store any global data or configurations that need to be accessed across different components and entities within the ARE framework. This can include things like theme settings, user preferences, or any other shared data that is relevant to the entire scene or application. By centralizing this information in the context, it allows for easier management and access to global state without needing to pass it through multiple layers of components or entities.
   */
  get globals() {
    return this.get("globals") || {};
  }
  /**
   * The scope of the context, which can be used to access other entities and features within the same scope. This is particularly useful for components that need to interact with other parts of the scene or component, as it allows them to access shared data and functionality without needing to pass it explicitly through parameters.
   */
  get scope() {
    return aConcept.A_Context.scope(this);
  }
  /**
   * The roots array holds references to the root nodes of the ARE scene, allowing for easy access and management of the top-level components in the rendering hierarchy. The signalsMap is a mapping between root nodes and their associated signal vectors, enabling efficient management of reactive updates and interactions within the ARE framework based on changes in the application state or user input.
   */
  get roots() {
    return this._roots;
  }
  /**
   * This property stores a map between root node and conditions that should be met to render particular component inside the root node. This can be used to manage complex rendering logic and to optimize performance by ensuring that components are only rendered when necessary based on the defined conditions.
   */
  get source() {
    return this._source;
  }
  get performance() {
    const perfObj = [];
    this._performance.forEach((value, key) => {
      perfObj.push(`${key}: ${value} ms`);
    });
    return perfObj;
  }
  get stats() {
    return [
      `- Total Roots: ${this._roots.length}`,
      `- Total Nodes in Scene: ${this._roots.reduce((acc, root) => acc + this.countNodes(root), 0)}`,
      `- Total Instructions: ${this._roots.reduce((acc, root) => acc + this.countInstructions(root), 0)}`
    ];
  }
  countInstructions(node) {
    let count = 0;
    if (node.scene) {
      count += node.scene.instructions.length;
    }
    for (const child of node.children) {
      count += this.countInstructions(child);
    }
    return count;
  }
  countNodes(node) {
    let count = 1;
    for (const child of node.children) {
      count += this.countNodes(child);
    }
    return count;
  }
  /**
   * This property stores a map between root node and conditions that should be met to render particular component inside the root node. This can be used to manage complex rendering logic and to optimize performance by ensuring that components are only rendered when necessary based on the defined conditions.
   * 
   * @param node 
   */
  addRoot(node) {
    this._roots.push(node);
    this.scope.register(node);
  }
  /**
   * This property stores a map between root node and conditions that should be met to render particular component inside the root node. This can be used to manage complex rendering logic and to optimize performance by ensuring that components are only rendered when necessary based on the defined conditions.
   * 
   * @param node 
   */
  removeRoot(node) {
    this._roots = this._roots.filter((r) => r.aseid.toString() !== node.aseid.toString());
  }
  startPerformance(label = "default") {
    const depth = this._performanceDepth.get(label) || 0;
    this._performanceDepth.set(label, depth + 1);
    if (depth === 0) {
      this._performanceStart.set(label, Date.now());
    }
  }
  endPerformance(label) {
    const depth = this._performanceDepth.get(label) || 0;
    if (depth <= 1) {
      const startTime = this._performanceStart.get(label) || this._performanceStart.get("default");
      if (startTime) {
        const duration = Date.now() - startTime;
        const accumulated = this._performance.get(label) || 0;
        this._performance.set(label, accumulated + duration);
        this._performanceStart.delete(label);
      }
      this._performanceDepth.delete(label);
    } else {
      this._performanceDepth.set(label, depth - 1);
    }
  }
};
exports.AreContext = __decorateClass([
  aFrame.A_Frame.Fragment({
    namespace: "A-ARE",
    name: "AreContext",
    description: "Context fragment for the A-Concept Rendering Engine (ARE) framework, serving as a foundational component for managing shared state and configurations within the ARE environment. This Context uses to encapsulate global settings, resources, and utilities that can be accessed by various ARE components and entities during the rendering and interaction processes."
  })
], exports.AreContext);
//# sourceMappingURL=Are.context.js.map
//# sourceMappingURL=Are.context.js.map