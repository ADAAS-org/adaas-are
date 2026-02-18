'use strict';

var aConcept = require('@adaas/a-concept');
var AreIndex_context = require('../AreIndex/AreIndex.context');
var node = require('@adaas/are/node');
var props = require('@adaas/are/props');
var store = require('@adaas/are/store');
var sceneInstruction = require('@adaas/are/scene-instruction');

class AreScene extends aConcept.A_Fragment {
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
    return aConcept.A_Context.scope(this);
  }
  get index() {
    return aConcept.A_Context.scope(this).resolveFlat(AreIndex_context.AreIndex);
  }
  get parent() {
    return aConcept.A_Context.scope(this).parent?.resolveFlat(AreScene);
  }
  get children() {
    return this.scope.resolveFlatAll(node.AreNode).map((n) => n.scope.resolveFlat(AreScene)).filter((s) => !!s);
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
    return this.scope.resolveFlatAll(sceneInstruction.AreSceneInstruction) || [];
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
      const ownerNode = this.parent.scope.resolve(new aConcept.A_Dependency(node.AreNode, {
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
  isAttached(node$1) {
    return !!this.scope.resolve(new aConcept.A_Dependency(node.AreNode, {
      flat: true,
      query: {
        aseid: node$1.aseid
      }
    }));
  }
  attach(node) {
    this.scope.register(node);
    node.scope.inherit(this.scope);
  }
  sceneOf(node) {
    return node.scope.resolveFlat(AreScene);
  }
  propsOf(node) {
    return node.scope.resolveFlat(props.AreProps);
  }
  storeOf(node) {
    return node.scope.resolveFlat(store.AreStore);
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
    const planned = this.scope.resolve(new aConcept.A_Dependency(sceneInstruction.AreSceneInstruction, {
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
}

exports.AreScene = AreScene;
//# sourceMappingURL=AreScene.context.js.map
//# sourceMappingURL=AreScene.context.js.map