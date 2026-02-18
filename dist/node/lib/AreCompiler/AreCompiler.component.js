'use strict';

var aConcept = require('@adaas/a-concept');
var aFrame = require('@adaas/a-frame');
var index = require('@adaas/are/index');
var scene = require('@adaas/are/scene');
var node = require('@adaas/are/node');
var sceneInstruction = require('@adaas/are/scene-instruction');
var syntax = require('@adaas/are/syntax');
var aExecution = require('@adaas/a-utils/a-execution');
var aLogger = require('@adaas/a-utils/a-logger');
var aSignal = require('@adaas/a-utils/a-signal');
var component = require('@adaas/are/component');
var props = require('@adaas/are/props');
var store = require('@adaas/are/store');
var event = require('@adaas/are/event');
var AreCompiler_error = require('./AreCompiler.error');

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
exports.AreCompiler = class AreCompiler extends aConcept.A_Component {
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
      scope = aConcept.A_Context.scope(this);
    }
    return scope.resolve(aConcept.A_FormatterHelper.toPascalCase(node.aseid.entity));
  }
  async beforeLoad(node, scope, feature, ...args) {
    scope.resolve(aLogger.A_Logger);
    const component$1 = scope.resolveOnce(aConcept.A_FormatterHelper.toPascalCase(node.aseid.entity));
    if (component$1)
      await feature.chain(component$1, component.AreFeatures.onBeforeLoad, node.scope);
  }
  async load(node, scope, syntax, feature, logger, ...args) {
    const loadTimerLabel = `Load Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`;
    console.time(loadTimerLabel);
    console.time(`Load: Component Resolution for <${node.aseid.entity}>`);
    const component$1 = this.component(node);
    console.timeEnd(`Load: Component Resolution for <${node.aseid.entity}>`);
    if (!component$1 && syntax.isCustomNode(node)) {
      logger?.warning(
        "Component Not Found",
        `No component registered for entity: ${node.aseid.entity}. Please ensure that the component is registered in the scope before rendering.`
      );
    }
    console.time(`Load: Scene/Store/Props Creation for <${node.aseid.entity}>`);
    const newNodeScene = new scene.AreScene(node.aseid);
    const newNodeIndex = new index.AreIndex(node.aseid);
    const newNodeStore = new store.AreStore(node.aseid);
    const newNodeProps = new props.AreProps(node.aseid);
    scope.register(newNodeScene);
    scope.register(newNodeIndex);
    if (syntax.isCustomNode(node)) {
      scope.register(newNodeStore);
      scope.register(newNodeProps);
    }
    console.timeEnd(`Load: Scene/Store/Props Creation for <${node.aseid.entity}>`);
    if (component$1) {
      console.time(`Load: Component Lifecycle Chains for <${node.aseid.entity}>`);
      await feature.chain(component$1, component.AreFeatures.onData, scope);
      await feature.chain(component$1, component.AreFeatures.onStyles, scope);
      await feature.chain(component$1, component.AreFeatures.onTemplate, scope);
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
    const logger = scope.resolve(aLogger.A_Logger);
    logger?.debug(scene.debugPrefix + `[Load -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    const component$1 = this.component(node);
    if (component$1)
      await feature.chain(component$1, component.AreFeatures.onAfterLoad, node.scope);
  }
  beforeCompile(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(aLogger.A_Logger);
    logger?.debug(scene.debugPrefix + `[Compile -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    const component$1 = scope.resolveOnce(aConcept.A_FormatterHelper.toPascalCase(node.aseid.entity));
    if (component$1)
      feature.chain(component$1, component.AreFeatures.onBeforeCompile, node.scope);
  }
  compile(node$1, scene, parentScene, syntax, props, store, parentStore, logger, scope) {
    const compileTimerLabel = `Compile Node <${node$1.aseid.entity}> ASEID: ${node$1.aseid.toString()}`;
    console.time(compileTimerLabel);
    try {
      if (!syntax.isRootNode(node$1)) {
        logger?.debug("violet", scene.debugPrefix + `Compiling node <${node$1.aseid.entity}> in Scene <${parentScene.name}>`);
        console.time(`Compile: Mount Instruction Planning for <${node$1.aseid.entity}>`);
        const mountInstruction = new sceneInstruction.MountNodeInstruction(node$1, scene.path);
        if (!parentScene.isPlanned(mountInstruction)) {
          logger?.debug("red", scene.debugPrefix + `Planning Node Mount for Node <${node$1.type}> ASEID: <${node$1.aseid.entity}>`);
          parentScene.plan(mountInstruction);
          mountInstruction.init();
        }
        console.timeEnd(`Compile: Mount Instruction Planning for <${node$1.aseid.entity}>`);
        console.time(`Compile: Template Interpolation Processing for <${node$1.aseid.entity}>`);
        if (syntax.isCustomNode(node$1)) {
          const interpolations = syntax.extractInterpolations(node$1.template);
          for (let i = 0; i < interpolations.length; i++) {
            const interpolation = interpolations[i];
            console.time(`Compile: Interpolation [${i}] "${interpolation.name}" for <${node$1.aseid.entity}>`);
            const value = store.get(interpolation.name) || parentStore.get(interpolation.name);
            const instruction = new sceneInstruction.ReplaceInterpolationInstruction(node$1, interpolation, value);
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
            console.timeEnd(`Compile: Interpolation [${i}] "${interpolation.name}" for <${node$1.aseid.entity}>`);
          }
        }
        console.timeEnd(`Compile: Template Interpolation Processing for <${node$1.aseid.entity}>`);
        console.time(`Compile: Attributes Processing for <${node$1.aseid.entity}>`);
        const attributes = syntax.extractAttributes(node$1.markup);
        for (let i = 0; i < attributes.length; i++) {
          const attr = attributes[i];
          console.time(`Compile: Attribute [${i}] "${attr.name}" for <${node$1.aseid.entity}>`);
          const name = attr.name;
          const value = (syntax.isBindingProp(attr) ? store.get(attr.value) || parentStore.get(attr.value) : attr.value) || "";
          props.set(name, value);
          parentScene.plan(new sceneInstruction.AddAttributeInstruction(node$1, name, value));
          console.timeEnd(`Compile: Attribute [${i}] "${attr.name}" for <${node$1.aseid.entity}>`);
        }
        console.timeEnd(`Compile: Attributes Processing for <${node$1.aseid.entity}>`);
        console.time(`Compile: Directives Processing for <${node$1.aseid.entity}>`);
        const directives = syntax.extractDirectives(node$1.markup);
        for (let i = 0; i < directives.length; i++) {
          const directive = directives[i];
          console.time(`Compile: Directive [${i}] "${directive.name}" for <${node$1.aseid.entity}>`);
          let directiveValue;
          if (directive.value) {
            directiveValue = store.get(directive.value) || parentStore.get(directive.value);
          }
          let instruction = new sceneInstruction.AddDirectiveInstruction(node$1, directive, directiveValue);
          const stateInstruction = parentScene.getState(instruction);
          if (!stateInstruction || stateInstruction.value !== directiveValue) {
            parentScene.unPlan(instruction);
            parentScene.plan(instruction);
            instruction.init();
          }
          console.timeEnd(`Compile: Directive [${i}] "${directive.name}" for <${node$1.aseid.entity}>`);
        }
        console.timeEnd(`Compile: Directives Processing for <${node$1.aseid.entity}>`);
        console.time(`Compile: Styles Processing for <${node$1.aseid.entity}>`);
        let styles = node$1.styles || "";
        const styleInterpolations = syntax.extractInterpolations(styles);
        for (let i = 0; i < styleInterpolations.length; i++) {
          const interpolation = styleInterpolations[i];
          console.time(`Compile: Style Interpolation [${i}] "${interpolation.name}" for <${node$1.aseid.entity}>`);
          const value = store.get(interpolation.name);
          styles = syntax.replaceInterpolation(styles, interpolation, value);
          console.timeEnd(`Compile: Style Interpolation [${i}] "${interpolation.name}" for <${node$1.aseid.entity}>`);
        }
        if (styles.trim()) {
          const instruction = new sceneInstruction.AddStyleInstruction(node$1, styles);
          if (!parentScene.isPlanned(instruction)) {
            parentScene.plan(instruction);
            instruction.init();
          }
        }
        console.timeEnd(`Compile: Styles Processing for <${node$1.aseid.entity}>`);
        console.time(`Compile: Listeners Processing for <${node$1.aseid.entity}>`);
        const listeners = syntax.extractListeners(node$1.markup);
        for (let i = 0; i < listeners.length; i++) {
          const listener = listeners[i];
          console.time(`Compile: Listener [${i}] "${listener.name}" for <${node$1.aseid.entity}>`);
          let currentScene = scene;
          let targetNode = node$1;
          while (!syntax.isCustomNode(targetNode) && currentScene.parent) {
            targetNode = currentScene.parent.scope.resolve(new aConcept.A_Dependency(node.AreNode, {
              query: {
                aseid: currentScene.id
              }
            }));
            currentScene = currentScene.parent;
          }
          const instruction = new sceneInstruction.AttachListenerInstruction(node$1, targetNode, listener);
          if (!parentScene.isPlanned(instruction)) {
            parentScene.plan(instruction);
            instruction.init();
          }
          console.timeEnd(`Compile: Listener [${i}] "${listener.name}" for <${node$1.aseid.entity}>`);
        }
        console.timeEnd(`Compile: Listeners Processing for <${node$1.aseid.entity}>`);
      }
      console.time(`Compile: Child Nodes Compilation for <${node$1.aseid.entity}>`);
      const sceneNodes = scene.nodes();
      for (let i = 0; i < sceneNodes.length; i++) {
        const sceneNode = sceneNodes[i];
        const childTimerLabel = `Compile: Child Node [${i}] <${sceneNode.aseid.entity}> for Parent <${node$1.aseid.entity}>`;
        console.time(childTimerLabel);
        sceneNode.compile();
        console.timeEnd(childTimerLabel);
      }
      console.timeEnd(`Compile: Child Nodes Compilation for <${node$1.aseid.entity}>`);
    } catch (error) {
      logger?.error(error);
    }
    console.timeEnd(compileTimerLabel);
  }
  afterCompile(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(aLogger.A_Logger);
    const component$1 = scope.resolveOnce(aConcept.A_FormatterHelper.toPascalCase(node.aseid.entity));
    logger?.debug(scene.debugPrefix + `[Compile -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (component$1)
      feature.chain(component$1, component.AreFeatures.onAfterCompile, node.scope);
  }
  async event(node, scope, event, scene, feature, ...args) {
    const logger = scope.resolve(aLogger.A_Logger);
    logger?.debug(scene.debugPrefix + `Event Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}} for event: ${event.name}`);
    const component = scope.resolveOnce(aConcept.A_FormatterHelper.toPascalCase(node.aseid.entity));
    if (component) {
      try {
        await feature.chain(component, event.name, scope);
      } catch (error) {
        logger?.error(error);
      }
    }
  }
  beforeRender(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(aLogger.A_Logger);
    const component$1 = scope.resolveOnce(aConcept.A_FormatterHelper.toPascalCase(node.aseid.entity));
    logger?.debug(scene.debugPrefix + `[Render -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (component$1)
      feature.chain(component$1, component.AreFeatures.onBeforeRender, node.scope);
  }
  render(node, syntax, scene, parentScene, logger, ...args) {
    const renderTimerLabel = `Render Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`;
    console.time(renderTimerLabel);
    if (syntax.isRootNode(node)) {
      logger?.debug("red", scene.debugPrefix + `Rendering Root Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`);
      console.time(`Render: Root Node Attachment for <${node.aseid.entity}>`);
      new sceneInstruction.AttachRootNodeInstruction(node).apply(node.scope);
      console.timeEnd(`Render: Root Node Attachment for <${node.aseid.entity}>`);
    } else {
      if (!parentScene) {
        throw new AreCompiler_error.AreCompilerError(
          AreCompiler_error.AreCompilerError.RenderError,
          `Parent Scene not found for Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()} during render process.`
        );
      }
      logger?.debug("red", scene.debugPrefix + `Rendering  Child Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`, parentScene);
      console.time(`Render: Mount/Unmount Instructions Processing for <${node.aseid.entity}>`);
      const mountUnmountInstructions = parentScene.renderPlanFor(node, {
        filter: (inst) => inst instanceof sceneInstruction.MountNodeInstruction || inst instanceof sceneInstruction.UnmountNodeInstruction
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
      if (!parentScene.isPlanned(new sceneInstruction.MountNodeInstruction(node, scene.path))) {
        logger?.debug("yellow", scene.debugPrefix + `No Mount Instruction found for Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}. Skipping...`);
        console.timeEnd(renderTimerLabel);
        return;
      }
      console.time(`Render: Other Instructions Processing for <${node.aseid.entity}>`);
      const otherInstructions = parentScene.renderPlanFor(node, {
        order: [
          sceneInstruction.AddStyleInstruction,
          sceneInstruction.AttachListenerInstruction,
          sceneInstruction.AddAttributeInstruction,
          sceneInstruction.ReplaceInterpolationInstruction
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
          const executionContext = new aExecution.A_ExecutionContext("AreBrowserCompiler: Mount Node Instruction");
          executionContext.set("content", scene);
          const applyScope = new aConcept.A_Scope({ fragments: [executionContext] }).inherit(node.scope);
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
    const logger = scope.resolve(aLogger.A_Logger);
    const component$1 = this.component(node);
    logger?.debug(scene.debugPrefix + `[Render -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (component$1)
      feature.chain(component$1, component.AreFeatures.onAfterRender, node.scope);
  }
  beforeUpdate(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(aLogger.A_Logger);
    logger?.debug(scene.debugPrefix + `[Update -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    const component$1 = this.component(node);
    if (component$1)
      feature.chain(component$1, component.AreFeatures.onBeforeUpdate, node.scope);
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
    const logger = scope.resolve(aLogger.A_Logger);
    logger?.debug(scene.debugPrefix + `[Update -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    const component$1 = this.component(node);
    if (component$1)
      feature.chain(component$1, component.AreFeatures.onAfterUpdate, node.scope);
  }
  beforeUnmount(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(aLogger.A_Logger);
    logger?.debug(scene.debugPrefix + `[Unmount -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    const component$1 = this.component(node);
    if (component$1)
      feature.chain(component$1, component.AreFeatures.onBeforeUnmount, node.scope);
  }
  unmount(node, syntax, scene, parentScene, logger) {
    try {
      logger?.debug("red", scene.debugPrefix + `Unmounting Node <${node.aseid.entity}> ASEID: ${node.aseid.toString()}`);
      if (!syntax.isRootNode(node)) {
        if (!parentScene) {
          throw new AreCompiler_error.AreCompilerError(
            AreCompiler_error.AreCompilerError.RenderError,
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
    const logger = scope.resolve(aLogger.A_Logger);
    logger?.debug(scene.debugPrefix + `[Unmount -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    const component$1 = this.component(node);
    if (component$1)
      feature.chain(component$1, component.AreFeatures.onAfterUnmount, node.scope);
  }
  handleSignalVector(vector, context, state, scope, logger) {
    logger?.info(`Handling Signal Vector with ${context.roots.length} root nodes.`);
    try {
      for (const root of context.roots) {
        const callScope = new aConcept.A_Scope({
          fragments: [new event.AreEvent(
            component.AreFeatures.onSignal,
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
  aConcept.A_Feature.Extend({
    name: aConcept.A_TYPES__EntityFeatures.LOAD,
    before: /.*/,
    scope: [node.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(aConcept.A_Feature))
], exports.AreCompiler.prototype, "beforeLoad", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: aConcept.A_TYPES__EntityFeatures.LOAD,
    scope: [node.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(syntax.AreSyntax)),
  __decorateParam(3, aConcept.A_Inject(aConcept.A_Feature)),
  __decorateParam(4, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreCompiler.prototype, "load", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: aConcept.A_TYPES__EntityFeatures.LOAD,
    after: /.*/,
    scope: [node.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(scene.AreScene)),
  __decorateParam(3, aConcept.A_Inject(aConcept.A_Feature))
], exports.AreCompiler.prototype, "afterLoad", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: node.AreNodeFeatures.onCompile,
    before: /.*/,
    scope: [node.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(scene.AreScene)),
  __decorateParam(3, aConcept.A_Inject(aConcept.A_Feature))
], exports.AreCompiler.prototype, "beforeCompile", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: node.AreNodeFeatures.onCompile,
    scope: [node.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Dependency.Flat()),
  __decorateParam(1, aConcept.A_Inject(scene.AreScene)),
  __decorateParam(2, aConcept.A_Dependency.Parent()),
  __decorateParam(2, aConcept.A_Inject(scene.AreScene)),
  __decorateParam(3, aConcept.A_Inject(syntax.AreSyntax)),
  __decorateParam(4, aConcept.A_Inject(props.AreProps)),
  __decorateParam(5, aConcept.A_Inject(store.AreStore)),
  __decorateParam(6, aConcept.A_Dependency.Parent()),
  __decorateParam(6, aConcept.A_Inject(store.AreStore)),
  __decorateParam(7, aConcept.A_Inject(aLogger.A_Logger)),
  __decorateParam(8, aConcept.A_Inject(aConcept.A_Scope))
], exports.AreCompiler.prototype, "compile", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: node.AreNodeFeatures.onCompile,
    after: /.*/,
    scope: [node.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(scene.AreScene)),
  __decorateParam(3, aConcept.A_Inject(aConcept.A_Feature))
], exports.AreCompiler.prototype, "afterCompile", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: node.AreNodeFeatures.onEvent,
    scope: [node.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(event.AreEvent)),
  __decorateParam(3, aConcept.A_Inject(scene.AreScene)),
  __decorateParam(4, aConcept.A_Inject(aConcept.A_Feature))
], exports.AreCompiler.prototype, "event", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: node.AreNodeFeatures.onBeforeRender,
    before: /.*/,
    scope: [node.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(scene.AreScene)),
  __decorateParam(3, aConcept.A_Inject(aConcept.A_Feature))
], exports.AreCompiler.prototype, "beforeRender", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: node.AreNodeFeatures.onRender,
    scope: [node.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(syntax.AreSyntax)),
  __decorateParam(2, aConcept.A_Dependency.Flat()),
  __decorateParam(2, aConcept.A_Inject(scene.AreScene)),
  __decorateParam(3, aConcept.A_Dependency.Parent()),
  __decorateParam(3, aConcept.A_Inject(scene.AreScene)),
  __decorateParam(4, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreCompiler.prototype, "render", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: node.AreNodeFeatures.onAfterRender,
    after: /.*/,
    scope: [node.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(scene.AreScene)),
  __decorateParam(3, aConcept.A_Inject(aConcept.A_Feature))
], exports.AreCompiler.prototype, "afterRender", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: node.AreNodeFeatures.onUpdate,
    before: /.*/,
    scope: [node.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(scene.AreScene)),
  __decorateParam(3, aConcept.A_Inject(aConcept.A_Feature))
], exports.AreCompiler.prototype, "beforeUpdate", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: node.AreNodeFeatures.onUpdate,
    scope: [node.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(scene.AreScene))
], exports.AreCompiler.prototype, "update", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: node.AreNodeFeatures.onUpdate,
    after: /.*/,
    scope: [node.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(scene.AreScene)),
  __decorateParam(3, aConcept.A_Inject(aConcept.A_Feature))
], exports.AreCompiler.prototype, "afterUpdate", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: node.AreNodeFeatures.onUnmount,
    before: /.*/,
    scope: [node.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(scene.AreScene)),
  __decorateParam(3, aConcept.A_Inject(aConcept.A_Feature))
], exports.AreCompiler.prototype, "beforeUnmount", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: node.AreNodeFeatures.onUnmount,
    scope: [node.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(syntax.AreSyntax)),
  __decorateParam(2, aConcept.A_Dependency.Flat()),
  __decorateParam(2, aConcept.A_Inject(scene.AreScene)),
  __decorateParam(3, aConcept.A_Dependency.Parent()),
  __decorateParam(3, aConcept.A_Inject(scene.AreScene)),
  __decorateParam(4, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreCompiler.prototype, "unmount", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: node.AreNodeFeatures.onUnmount,
    after: /.*/,
    scope: [node.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(2, aConcept.A_Inject(scene.AreScene)),
  __decorateParam(3, aConcept.A_Inject(aConcept.A_Feature))
], exports.AreCompiler.prototype, "afterUnmount", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: aSignal.A_SignalBusFeatures.onNext
  }),
  __decorateParam(0, aConcept.A_Inject(aSignal.A_SignalVector)),
  __decorateParam(1, aConcept.A_Inject(component.AreContext)),
  __decorateParam(2, aConcept.A_Inject(aSignal.A_SignalState)),
  __decorateParam(3, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(4, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreCompiler.prototype, "handleSignalVector", 1);
exports.AreCompiler = __decorateClass([
  aFrame.A_Frame.Component({
    namespace: "A-ARE",
    name: "AreCompiler",
    description: "AreCompiler is responsible for compiling AreNodes into their respective components, managing the compilation lifecycle, and ensuring that each node is processed according to its defined behavior within the A-Concept Rendering Engine (ARE) framework."
  })
], exports.AreCompiler);
//# sourceMappingURL=AreCompiler.component.js.map
//# sourceMappingURL=AreCompiler.component.js.map