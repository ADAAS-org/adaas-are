import { __decorateClass, __decorateParam } from '../../chunk-EQQGB2QZ.mjs';
import { A_Feature, A_Inject, A_Caller, A_Scope, ASEID } from '@adaas/a-concept';
import { A_Frame } from '@adaas/a-frame';
import { AreCompiler } from '@adaas/are/compiler';
import { AreIndex } from '@adaas/are/index';
import { AreScene } from '@adaas/are/scene';
import { AreNode } from '@adaas/are/node';
import { AttachRootNodeInstruction, AreSceneInstructionFeatures, MountNodeInstruction, UnmountNodeInstruction, AddStyleInstruction, AttachListenerInstruction, AddAttributeInstruction, ReplaceInterpolationInstruction, AddDirectiveInstruction } from '@adaas/are/scene-instruction';
import { AreSyntax } from '@adaas/are/syntax';
import { A_ExecutionContext } from '@adaas/a-utils/a-execution';
import { A_Logger } from '@adaas/a-utils/a-logger';

let AreHTMLCompiler = class extends AreCompiler {
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
    name: AreSceneInstructionFeatures.Apply,
    scope: [AttachRootNodeInstruction]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Logger))
], AreHTMLCompiler.prototype, "applyAttachRootNodeInstruction", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreSceneInstructionFeatures.Apply,
    scope: [MountNodeInstruction]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_ExecutionContext)),
  __decorateParam(2, A_Inject(AreSyntax)),
  __decorateParam(3, A_Inject(A_Logger))
], AreHTMLCompiler.prototype, "applyMountNodeInstruction", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreSceneInstructionFeatures.Apply,
    scope: [UnmountNodeInstruction]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_ExecutionContext)),
  __decorateParam(2, A_Inject(A_Logger))
], AreHTMLCompiler.prototype, "applyUnmountNodeInstruction", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreSceneInstructionFeatures.Apply,
    scope: [AddStyleInstruction]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_ExecutionContext)),
  __decorateParam(2, A_Inject(A_Logger))
], AreHTMLCompiler.prototype, "applyAddStyleInstruction", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreSceneInstructionFeatures.Apply,
    scope: [AttachListenerInstruction]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_ExecutionContext)),
  __decorateParam(2, A_Inject(A_Logger))
], AreHTMLCompiler.prototype, "applyAttachListenerInstruction", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreSceneInstructionFeatures.Apply,
    scope: [AddAttributeInstruction]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_ExecutionContext)),
  __decorateParam(2, A_Inject(A_Scope)),
  __decorateParam(3, A_Inject(A_Logger))
], AreHTMLCompiler.prototype, "applyAddAttributeInstruction", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreSceneInstructionFeatures.Revert,
    scope: [ReplaceInterpolationInstruction]
  }),
  __decorateParam(0, A_Inject(A_Caller))
], AreHTMLCompiler.prototype, "revertInstruction", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreSceneInstructionFeatures.Apply,
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
    name: AreSceneInstructionFeatures.Init,
    scope: [AddDirectiveInstruction]
  }),
  __decorateParam(0, A_Inject(A_Caller)),
  __decorateParam(1, A_Inject(A_Scope)),
  __decorateParam(2, A_Inject(A_Logger))
], AreHTMLCompiler.prototype, "initAddDirectiveInstruction", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreSceneInstructionFeatures.Apply,
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

export { AreHTMLCompiler };
//# sourceMappingURL=AreHTML.compiler.mjs.map
//# sourceMappingURL=AreHTML.compiler.mjs.map