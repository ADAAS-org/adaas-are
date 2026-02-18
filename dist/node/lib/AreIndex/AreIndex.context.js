'use strict';

var aConcept = require('@adaas/a-concept');

class AreIndex extends aConcept.A_Fragment {
  constructor(aseid) {
    super({
      name: aseid instanceof aConcept.ASEID ? aseid.toString() : aseid
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
    return aConcept.A_Context.scope(this);
  }
  get parent() {
    return aConcept.A_Context.scope(this).parent?.resolve(AreIndex);
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
}

exports.AreIndex = AreIndex;
//# sourceMappingURL=AreIndex.context.js.map
//# sourceMappingURL=AreIndex.context.js.map