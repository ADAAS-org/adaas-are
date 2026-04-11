import { __decorateClass, __decorateParam } from '../../chunk-EQQGB2QZ.mjs';
import { A_Feature, A_Dependency, A_Inject, A_Scope, A_Component, A_Context, A_CommonHelper } from '@adaas/a-concept';
import { AreSyntax } from '@adaas/are/syntax/AreSyntax.context';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { AreCompiler } from '@adaas/are/compiler/AreCompiler.component';
import { AreTransformer } from '@adaas/are/transformer/AreTransformer.component';
import { AreLoader } from '@adaas/are/loader/AreLoader.component';
import { AreInterpreter } from '@adaas/are/interpreter/AreInterpreter.component';
import { AreEngineError } from './AreEngine.error';
import { AreLifecycle } from '@adaas/are/lifecycle/AreLifecycle.component';
import { AreEngineFeatures } from './AreEngine.constants';
import { AreContext } from '@adaas/are/component/Are.context';
import { A_Frame } from '@adaas/a-frame';
import { AreTokenizer } from '@adaas/are/tokenizer/AreTokenizer.component';
import { AreSignals } from '@adaas/are/signals/AreSignals.component';
import { AreInit } from '@adaas/are/signals/entities/AreInit.signal';
import { A_SignalBus } from '@adaas/a-utils/a-signal';

let AreEngine = class extends A_Component {
  /**
   * Feature decorator for the load method, which is responsible for the initial loading phase of the engine. This method is where the engine reads the source template, tokenizes it, and prepares the initial context for building the scene. The decorator allows for extending or overriding the default loading behavior by attaching additional functionality before or after the load process.
   */
  static get Load() {
    return (target, propertyKey, descriptor) => {
      return A_Feature.Extend({
        name: AreEngineFeatures.Load,
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
      return A_Feature.Extend({
        name: AreEngineFeatures.Build,
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
      return A_Feature.Extend({
        name: AreEngineFeatures.Execute,
        scope: [target.constructor],
        override: ["defaultExecute"]
      })(target, propertyKey, descriptor);
    };
  }
  async load(scope) {
    const context = scope?.resolve(AreContext) || A_Context.scope(this).resolve(AreContext);
    context?.startPerformance();
    await this.call(AreEngineFeatures.Load, scope || A_Context.scope(this));
  }
  async build(scope) {
    const context = scope?.resolve(AreContext) || A_Context.scope(this).resolve(AreContext);
    context?.startPerformance("Build Total");
    await this.call(AreEngineFeatures.Build, scope || A_Context.scope(this));
    context?.endPerformance("Build Total");
  }
  async execute(scope) {
    const context = scope?.resolve(AreContext) || A_Context.scope(this).resolve(AreContext);
    context?.startPerformance("Execute Total");
    await this.call(AreEngineFeatures.Execute, scope || A_Context.scope(this));
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
    await bus?.next(new AreInit());
  }
  async init(scope) {
    this.package(scope);
  }
  async verify(scope, syntax, syntaxContext, transformer, loader, compiler, interpreter, lifecycle, logger) {
    if (!syntax)
      throw new AreEngineError({
        title: AreEngineError.MissedRequiredDependency,
        description: `AreSyntax or its inherited variation is a required dependency for ${this.constructor.name}. Please ensure that it is registered in the container scope before starting the engine.`
      });
    if (!syntaxContext)
      throw new AreEngineError({
        title: AreEngineError.MissedRequiredDependency,
        description: `AreSyntax or its inherited variation is a required dependency for ${this.constructor.name}. Please ensure that it is registered in the container scope before starting the engine.`
      });
    if (!loader)
      throw new AreEngineError({
        title: AreEngineError.MissedRequiredDependency,
        description: `AreLoader or its inherited variation is a required dependency for ${this.constructor.name}. Please ensure that it is registered in the container scope before starting the engine.`
      });
    if (!transformer)
      throw new AreEngineError({
        title: AreEngineError.MissedRequiredDependency,
        description: `AreTransformer or its inherited variation is a required dependency for ${this.constructor.name}. Please ensure that it is registered in the container scope before starting the engine.`
      });
    if (!compiler)
      throw new AreEngineError({
        title: AreEngineError.MissedRequiredDependency,
        description: `AreCompiler or its inherited variation is a required dependency for ${this.constructor.name}. Please ensure that it is registered in the container scope before starting the engine.`
      });
    if (!interpreter)
      throw new AreEngineError({
        title: AreEngineError.MissedRequiredDependency,
        description: `AreInterpreter or its inherited variation is a required dependency for ${this.constructor.name}. Please ensure that it is registered in the container scope before starting the engine.`
      });
    if (!lifecycle)
      throw new AreEngineError({
        title: AreEngineError.MissedRequiredDependency,
        description: `AreLifecycle or its inherited variation is a required dependency for ${this.constructor.name}. Please ensure that it is registered in the container scope before starting the engine.`
      });
  }
  package(scope, dependencies) {
    const { context, syntax, loader, tokenizer, compiler, transformer, interpreter, lifecycle, signals } = dependencies || {};
    const existedContext = scope.resolveConstructor(AreContext);
    const existedSyntax = scope.resolveConstructor(AreSyntax);
    const existedLoader = scope.resolveConstructor(AreLoader);
    const existedTokenizer = scope.resolveConstructor(AreTokenizer);
    const existedCompiler = scope.resolveConstructor(AreCompiler);
    const existedInterpreter = scope.resolveConstructor(AreInterpreter);
    const existedLifecycle = scope.resolveConstructor(AreLifecycle);
    const existedTransformer = scope.resolveConstructor(AreTransformer);
    const existedSignals = scope.resolveConstructor(AreSignals);
    this.packDependency(scope, context || AreContext, existedContext);
    this.packDependency(scope, syntax || AreSyntax, existedSyntax);
    this.packDependency(scope, tokenizer || AreTokenizer, existedTokenizer);
    this.packDependency(scope, loader || AreLoader, existedLoader);
    this.packDependency(scope, compiler || AreCompiler, existedCompiler);
    this.packDependency(scope, transformer || AreTransformer, existedTransformer);
    this.packDependency(scope, interpreter || AreInterpreter, existedInterpreter);
    this.packDependency(scope, lifecycle || AreLifecycle, existedLifecycle);
    this.packDependency(scope, signals || AreSignals, existedSignals);
  }
  packDependency(scope, dependency, existed) {
    const logger = scope.resolve(A_Logger);
    const thisName = A_CommonHelper.getComponentName(this);
    const scopeIssuerName = A_CommonHelper.getComponentName(scope.issuer());
    const dependencyName = A_CommonHelper.getComponentName(dependency);
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
  A_Frame.Method({
    description: "Method does engine loading, first read of the source and tokenization."
  })
], AreEngine.prototype, "load", 1);
__decorateClass([
  A_Frame.Method({
    description: "Method responsible for building the scene, which includes initializing root nodes, loading necessary data, applying transformations, and compiling the scene into a format that can be executed by the interpreter."
  })
], AreEngine.prototype, "build", 1);
__decorateClass([
  A_Frame.Method({
    description: "Method responsible for executing the rendering process, which involves mounting the root nodes to the DOM and starting the reactive update cycle based on signals and state changes."
  })
], AreEngine.prototype, "execute", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreEngineFeatures.Build,
    before: /.*/
  }),
  __decorateParam(0, A_Dependency.Required()),
  __decorateParam(0, A_Inject(AreContext)),
  __decorateParam(1, A_Inject(A_Logger))
], AreEngine.prototype, "defaultBuild", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreEngineFeatures.Execute,
    before: /.*/
  }),
  __decorateParam(0, A_Dependency.Required()),
  __decorateParam(0, A_Inject(AreContext)),
  __decorateParam(1, A_Inject(A_SignalBus)),
  __decorateParam(2, A_Inject(A_Logger))
], AreEngine.prototype, "defaultExecute", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreEngineFeatures.Load,
    before: /.*/
  }),
  __decorateParam(0, A_Inject(A_Scope))
], AreEngine.prototype, "init", 1);
__decorateClass([
  A_Feature.Extend({
    name: AreEngineFeatures.Load,
    before: /.*/
  }),
  __decorateParam(0, A_Inject(A_Scope)),
  __decorateParam(1, A_Inject(AreSyntax)),
  __decorateParam(2, A_Inject(AreSyntax)),
  __decorateParam(3, A_Inject(AreTransformer)),
  __decorateParam(4, A_Inject(AreLoader)),
  __decorateParam(5, A_Inject(AreCompiler)),
  __decorateParam(6, A_Inject(AreInterpreter)),
  __decorateParam(7, A_Inject(AreLifecycle)),
  __decorateParam(8, A_Inject(A_Logger))
], AreEngine.prototype, "verify", 1);
__decorateClass([
  A_Frame.Method({
    description: "Method to pack all necessary dependencies for the engine. This method is called during the initialization phase of the engine and ensures that all required components are registered in the container scope, allowing for proper dependency injection and management throughout the engine's lifecycle."
  })
], AreEngine.prototype, "package", 1);
AreEngine = __decorateClass([
  A_Frame.Component({
    namespace: "A-ARE",
    name: "AreEngine",
    description: "Core rendering engine for A-Concept Rendering Engine (ARE), responsible for orchestrating the loading, building, and execution of the rendering process. It manages the lifecycle of root nodes, coordinates the interactions between syntax, transformer, loader, compiler, and interpreter components, and ensures the proper initialization and mounting of the UI application."
  })
], AreEngine);

export { AreEngine };
//# sourceMappingURL=AreEngine.component.mjs.map
//# sourceMappingURL=AreEngine.component.mjs.map