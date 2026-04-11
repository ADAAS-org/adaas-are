'use strict';

var aConcept = require('@adaas/a-concept');
var AreSyntax_context = require('@adaas/are/syntax/AreSyntax.context');
var aLogger = require('@adaas/a-utils/a-logger');
var AreCompiler_component = require('@adaas/are/compiler/AreCompiler.component');
var AreTransformer_component = require('@adaas/are/transformer/AreTransformer.component');
var AreLoader_component = require('@adaas/are/loader/AreLoader.component');
var AreInterpreter_component = require('@adaas/are/interpreter/AreInterpreter.component');
var AreEngine_error = require('./AreEngine.error');
var AreLifecycle_component = require('@adaas/are/lifecycle/AreLifecycle.component');
var AreEngine_constants = require('./AreEngine.constants');
var Are_context = require('@adaas/are/component/Are.context');
var aFrame = require('@adaas/a-frame');
var AreTokenizer_component = require('@adaas/are/tokenizer/AreTokenizer.component');
var AreSignals_component = require('@adaas/are/signals/AreSignals.component');
var AreInit_signal = require('@adaas/are/signals/entities/AreInit.signal');
var aSignal = require('@adaas/a-utils/a-signal');

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
exports.AreEngine = class AreEngine extends aConcept.A_Component {
  /**
   * Feature decorator for the load method, which is responsible for the initial loading phase of the engine. This method is where the engine reads the source template, tokenizes it, and prepares the initial context for building the scene. The decorator allows for extending or overriding the default loading behavior by attaching additional functionality before or after the load process.
   */
  static get Load() {
    return (target, propertyKey, descriptor) => {
      return aConcept.A_Feature.Extend({
        name: AreEngine_constants.AreEngineFeatures.Load,
        scope: [target.constructor],
        override: ["defaultLoad"]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Feature decorator for the build method, which is responsible for constructing the scene based on the loaded context. This method typically involves initializing root nodes, applying transformations, and compiling the scene into a format that can be executed by the interpreter. The decorator allows for customizing the build process by adding additional steps or modifying the existing behavior.
   */
  static get Build() {
    return (target, propertyKey, descriptor) => {
      return aConcept.A_Feature.Extend({
        name: AreEngine_constants.AreEngineFeatures.Build,
        scope: [target.constructor],
        override: ["defaultBuild"]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Feature decorator for the execute method, which is responsible for the final execution phase of the engine. This method typically involves mounting the root nodes to the DOM and starting the reactive update cycle based on signals and state changes. The decorator allows for customizing the execution process by adding additional steps or modifying the existing behavior.
   */
  static get Execute() {
    return (target, propertyKey, descriptor) => {
      return aConcept.A_Feature.Extend({
        name: AreEngine_constants.AreEngineFeatures.Execute,
        scope: [target.constructor],
        override: ["defaultExecute"]
      })(target, propertyKey, descriptor);
    };
  }
  async load(scope) {
    const context = scope?.resolve(Are_context.AreContext) || aConcept.A_Context.scope(this).resolve(Are_context.AreContext);
    context?.startPerformance();
    await this.call(AreEngine_constants.AreEngineFeatures.Load, scope || aConcept.A_Context.scope(this));
  }
  async build(scope) {
    const context = scope?.resolve(Are_context.AreContext) || aConcept.A_Context.scope(this).resolve(Are_context.AreContext);
    context?.startPerformance("Build Total");
    await this.call(AreEngine_constants.AreEngineFeatures.Build, scope || aConcept.A_Context.scope(this));
    context?.endPerformance("Build Total");
  }
  async execute(scope) {
    const context = scope?.resolve(Are_context.AreContext) || aConcept.A_Context.scope(this).resolve(Are_context.AreContext);
    context?.startPerformance("Execute Total");
    await this.call(AreEngine_constants.AreEngineFeatures.Execute, scope || aConcept.A_Context.scope(this));
    context?.endPerformance("Execute Total");
    context?.endPerformance("Total");
  }
  async defaultBuild(context, logger) {
    logger?.debug("cyan", "Starting to build the scene...");
    for (const root of context.roots) {
      context.startPerformance(`Init root <${root.aseid.id}>`);
      root.init();
      context.endPerformance(`Init root <${root.aseid.id}>`);
      context.startPerformance(`Load root <${root.aseid.id}>`);
      await root.load();
      context.endPerformance(`Load root <${root.aseid.id}>`);
      context.startPerformance(`Transform root <${root.aseid.id}>`);
      root.transform();
      context.endPerformance(`Transform root <${root.aseid.id}>`);
      context.startPerformance(`Compile root <${root.aseid.id}>`);
      root.compile();
      context.endPerformance(`Compile root <${root.aseid.id}>`);
      context.endPerformance(`Root <${root.aseid.id}> Total`);
    }
  }
  async defaultExecute(context, bus, logger) {
    logger?.debug("cyan", "Starting to execute the scene and mount root nodes...");
    for (const root of context.roots) {
      context.startPerformance(`Mount root <${root.aseid.id}>`);
      root.mount();
      context.endPerformance(`Mount root <${root.aseid.id}>`);
    }
    logger?.debug("cyan", "Emitting AreInit signal to start the reactive update cycle...");
    await bus?.next(new AreInit_signal.AreInit());
  }
  async init(scope) {
    this.package(scope);
  }
  async verify(scope, syntax, syntaxContext, transformer, loader, compiler, interpreter, lifecycle, logger) {
    if (!syntax)
      throw new AreEngine_error.AreEngineError({
        title: AreEngine_error.AreEngineError.MissedRequiredDependency,
        description: `AreSyntax or its inherited variation is a required dependency for ${this.constructor.name}. Please ensure that it is registered in the container scope before starting the engine.`
      });
    if (!syntaxContext)
      throw new AreEngine_error.AreEngineError({
        title: AreEngine_error.AreEngineError.MissedRequiredDependency,
        description: `AreSyntax or its inherited variation is a required dependency for ${this.constructor.name}. Please ensure that it is registered in the container scope before starting the engine.`
      });
    if (!loader)
      throw new AreEngine_error.AreEngineError({
        title: AreEngine_error.AreEngineError.MissedRequiredDependency,
        description: `AreLoader or its inherited variation is a required dependency for ${this.constructor.name}. Please ensure that it is registered in the container scope before starting the engine.`
      });
    if (!transformer)
      throw new AreEngine_error.AreEngineError({
        title: AreEngine_error.AreEngineError.MissedRequiredDependency,
        description: `AreTransformer or its inherited variation is a required dependency for ${this.constructor.name}. Please ensure that it is registered in the container scope before starting the engine.`
      });
    if (!compiler)
      throw new AreEngine_error.AreEngineError({
        title: AreEngine_error.AreEngineError.MissedRequiredDependency,
        description: `AreCompiler or its inherited variation is a required dependency for ${this.constructor.name}. Please ensure that it is registered in the container scope before starting the engine.`
      });
    if (!interpreter)
      throw new AreEngine_error.AreEngineError({
        title: AreEngine_error.AreEngineError.MissedRequiredDependency,
        description: `AreInterpreter or its inherited variation is a required dependency for ${this.constructor.name}. Please ensure that it is registered in the container scope before starting the engine.`
      });
    if (!lifecycle)
      throw new AreEngine_error.AreEngineError({
        title: AreEngine_error.AreEngineError.MissedRequiredDependency,
        description: `AreLifecycle or its inherited variation is a required dependency for ${this.constructor.name}. Please ensure that it is registered in the container scope before starting the engine.`
      });
  }
  package(scope, dependencies) {
    const { context, syntax, loader, tokenizer, compiler, transformer, interpreter, lifecycle, signals } = dependencies || {};
    const existedContext = scope.resolveConstructor(Are_context.AreContext);
    const existedSyntax = scope.resolveConstructor(AreSyntax_context.AreSyntax);
    const existedLoader = scope.resolveConstructor(AreLoader_component.AreLoader);
    const existedTokenizer = scope.resolveConstructor(AreTokenizer_component.AreTokenizer);
    const existedCompiler = scope.resolveConstructor(AreCompiler_component.AreCompiler);
    const existedInterpreter = scope.resolveConstructor(AreInterpreter_component.AreInterpreter);
    const existedLifecycle = scope.resolveConstructor(AreLifecycle_component.AreLifecycle);
    const existedTransformer = scope.resolveConstructor(AreTransformer_component.AreTransformer);
    const existedSignals = scope.resolveConstructor(AreSignals_component.AreSignals);
    this.packDependency(scope, context || Are_context.AreContext, existedContext);
    this.packDependency(scope, syntax || AreSyntax_context.AreSyntax, existedSyntax);
    this.packDependency(scope, tokenizer || AreTokenizer_component.AreTokenizer, existedTokenizer);
    this.packDependency(scope, loader || AreLoader_component.AreLoader, existedLoader);
    this.packDependency(scope, compiler || AreCompiler_component.AreCompiler, existedCompiler);
    this.packDependency(scope, transformer || AreTransformer_component.AreTransformer, existedTransformer);
    this.packDependency(scope, interpreter || AreInterpreter_component.AreInterpreter, existedInterpreter);
    this.packDependency(scope, lifecycle || AreLifecycle_component.AreLifecycle, existedLifecycle);
    this.packDependency(scope, signals || AreSignals_component.AreSignals, existedSignals);
  }
  packDependency(scope, dependency, existed) {
    const logger = scope.resolve(aLogger.A_Logger);
    const thisName = aConcept.A_CommonHelper.getComponentName(this);
    const scopeIssuerName = aConcept.A_CommonHelper.getComponentName(scope.issuer());
    const dependencyName = aConcept.A_CommonHelper.getComponentName(dependency);
    if (existed) {
      logger?.debug("cyan", `Dependency ${dependencyName} already exists in ${scopeIssuerName} scope. Skipping injection.`);
      return existed;
    } else {
      logger?.debug("cyan", `Injecting ${dependencyName} into ${scopeIssuerName} scope for ${thisName}...`);
      scope.register(dependency);
      return dependency;
    }
  }
};
__decorateClass([
  aFrame.A_Frame.Method({
    description: "Method does engine loading, first read of the source and tokenization."
  })
], exports.AreEngine.prototype, "load", 1);
__decorateClass([
  aFrame.A_Frame.Method({
    description: "Method responsible for building the scene, which includes initializing root nodes, loading necessary data, applying transformations, and compiling the scene into a format that can be executed by the interpreter."
  })
], exports.AreEngine.prototype, "build", 1);
__decorateClass([
  aFrame.A_Frame.Method({
    description: "Method responsible for executing the rendering process, which involves mounting the root nodes to the DOM and starting the reactive update cycle based on signals and state changes."
  })
], exports.AreEngine.prototype, "execute", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: AreEngine_constants.AreEngineFeatures.Build,
    before: /.*/
  }),
  __decorateParam(0, aConcept.A_Dependency.Required()),
  __decorateParam(0, aConcept.A_Inject(Are_context.AreContext)),
  __decorateParam(1, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreEngine.prototype, "defaultBuild", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: AreEngine_constants.AreEngineFeatures.Execute,
    before: /.*/
  }),
  __decorateParam(0, aConcept.A_Dependency.Required()),
  __decorateParam(0, aConcept.A_Inject(Are_context.AreContext)),
  __decorateParam(1, aConcept.A_Inject(aSignal.A_SignalBus)),
  __decorateParam(2, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreEngine.prototype, "defaultExecute", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: AreEngine_constants.AreEngineFeatures.Load,
    before: /.*/
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Scope))
], exports.AreEngine.prototype, "init", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: AreEngine_constants.AreEngineFeatures.Load,
    before: /.*/
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Scope)),
  __decorateParam(1, aConcept.A_Inject(AreSyntax_context.AreSyntax)),
  __decorateParam(2, aConcept.A_Inject(AreSyntax_context.AreSyntax)),
  __decorateParam(3, aConcept.A_Inject(AreTransformer_component.AreTransformer)),
  __decorateParam(4, aConcept.A_Inject(AreLoader_component.AreLoader)),
  __decorateParam(5, aConcept.A_Inject(AreCompiler_component.AreCompiler)),
  __decorateParam(6, aConcept.A_Inject(AreInterpreter_component.AreInterpreter)),
  __decorateParam(7, aConcept.A_Inject(AreLifecycle_component.AreLifecycle)),
  __decorateParam(8, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreEngine.prototype, "verify", 1);
__decorateClass([
  aFrame.A_Frame.Method({
    description: "Method to pack all necessary dependencies for the engine. This method is called during the initialization phase of the engine and ensures that all required components are registered in the container scope, allowing for proper dependency injection and management throughout the engine's lifecycle."
  })
], exports.AreEngine.prototype, "package", 1);
exports.AreEngine = __decorateClass([
  aFrame.A_Frame.Component({
    namespace: "A-ARE",
    name: "AreEngine",
    description: "Core rendering engine for A-Concept Rendering Engine (ARE), responsible for orchestrating the loading, building, and execution of the rendering process. It manages the lifecycle of root nodes, coordinates the interactions between syntax, transformer, loader, compiler, and interpreter components, and ensures the proper initialization and mounting of the UI application."
  })
], exports.AreEngine);
//# sourceMappingURL=AreEngine.component.js.map
//# sourceMappingURL=AreEngine.component.js.map