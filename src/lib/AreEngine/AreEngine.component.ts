import { A_CommonHelper, A_Component, A_Context, A_Dependency, A_Feature, A_FormatterHelper, A_Inject, A_Scope, A_TYPES__A_DependencyInjectable, A_TYPES__Ctor } from "@adaas/a-concept";
import { AreSyntax } from "@adaas/are/syntax/AreSyntax.context";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { AreCompiler } from "@adaas/are/compiler/AreCompiler.component";
import { AreTransformer } from "@adaas/are/transformer/AreTransformer.component";
import { AreLoader } from "@adaas/are/loader/AreLoader.component";
import { AreInterpreter } from "@adaas/are/interpreter/AreInterpreter.component";
import { AreEngineError } from "./AreEngine.error";
import { AreLifecycle } from "@adaas/are/lifecycle/AreLifecycle.component";
import { AreEngineFeatures } from "./AreEngine.constants";
import { AreContext } from "@adaas/are/component/Are.context";
import { A_Frame } from "@adaas/a-frame";
import { AreTokenizer } from "@adaas/are/tokenizer/AreTokenizer.component";
import { AreEngineDependencies } from "./AreEngine.types";
import { AreSignals } from "@adaas/are/signals/AreSignals.component";
import { AreInit } from "@adaas/are/signals/entities/AreInit.signal";
import { A_SignalBus } from "@adaas/a-utils/a-signal";




@A_Frame.Component({
    namespace: 'A-ARE',
    name: 'AreEngine',
    description: 'Core rendering engine for A-Concept Rendering Engine (ARE), responsible for orchestrating the loading, building, and execution of the rendering process. It manages the lifecycle of root nodes, coordinates the interactions between syntax, transformer, loader, compiler, and interpreter components, and ensures the proper initialization and mounting of the UI application.'
})
export class AreEngine extends A_Component {

    /**
     * Feature decorator for the load method, which is responsible for the initial loading phase of the engine. This method is where the engine reads the source template, tokenizes it, and prepares the initial context for building the scene. The decorator allows for extending or overriding the default loading behavior by attaching additional functionality before or after the load process.
     */
    static get Load() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreEngineFeatures.Load,
                scope: [target.constructor],
                override: ['defaultLoad']
            })(target, propertyKey, descriptor);
        }
    }
    /**
     * Feature decorator for the build method, which is responsible for constructing the scene based on the loaded context. This method typically involves initializing root nodes, applying transformations, and compiling the scene into a format that can be executed by the interpreter. The decorator allows for customizing the build process by adding additional steps or modifying the existing behavior.
     */
    static get Build() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreEngineFeatures.Build,
                scope: [target.constructor],
                override: ['defaultBuild']
            })(target, propertyKey, descriptor);
        }
    }
    /**
     * Feature decorator for the execute method, which is responsible for the final execution phase of the engine. This method typically involves mounting the root nodes to the DOM and starting the reactive update cycle based on signals and state changes. The decorator allows for customizing the execution process by adding additional steps or modifying the existing behavior.
     */
    static get Execute() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreEngineFeatures.Execute,
                scope: [target.constructor],
                override: ['defaultExecute']
            })(target, propertyKey, descriptor);
        }
    }


    // ==========================================================================================
    // -----------------------------------ARE Engine Features------------------------------------
    // ==========================================================================================

    /**
     * Method to start the engine, which involves loading necessary resources, building the scene, and executing the rendering process. It accepts an optional scope parameter that can be used to provide a custom scope for the engine's operations, allowing for greater flexibility in how dependencies are managed and accessed during the rendering lifecycle.
     * 
     * @param scope 
     * @returns 
     */
    @A_Frame.Method({
        description: 'Method does engine loading, first read of the source and tokenization.'
    })
    async load(scope?: A_Scope) {
        const context = scope?.resolve(AreContext) || A_Context.scope(this).resolve(AreContext);

        context?.startPerformance();

        await this.call(AreEngineFeatures.Load, scope || A_Context.scope(this));
    }

    /**
     * Method responsible for building the scene, which includes initializing root nodes, loading necessary data, applying transformations, and compiling the scene into a format that can be executed by the interpreter.
     * 
     * @param context 
     * @param logger 
     */
    @A_Frame.Method({
        description: 'Method responsible for building the scene, which includes initializing root nodes, loading necessary data, applying transformations, and compiling the scene into a format that can be executed by the interpreter.'
    })
    async build(scope?: A_Scope) {
        const context = scope?.resolve(AreContext) || A_Context.scope(this).resolve(AreContext);
        context?.startPerformance('Build Total');

        await this.call(AreEngineFeatures.Build, scope || A_Context.scope(this));

        context?.endPerformance('Build Total');
    }

    /**
     * Method responsible for executing the rendering process, which involves mounting the root nodes to the DOM and starting the reactive update cycle based on signals and state changes.
     * 
     * @param context 
     * @param logger 
     */
    @A_Frame.Method({
        description: 'Method responsible for executing the rendering process, which involves mounting the root nodes to the DOM and starting the reactive update cycle based on signals and state changes.'
    })
    async execute(scope?: A_Scope) {
        const context = scope?.resolve(AreContext) || A_Context.scope(this).resolve(AreContext);

        context?.startPerformance('Execute Total');

        await this.call(AreEngineFeatures.Execute, scope || A_Context.scope(this));

        context?.endPerformance('Execute Total');
        context?.endPerformance('Total');
    }

    // ==========================================================================================
    // ----------------------------ARE Engine Default Methods------------------------------------
    // ==========================================================================================
    @A_Feature.Extend({
        name: AreEngineFeatures.Build,
        before: /.*/
    })
    protected async defaultBuild(
        @A_Dependency.Required()
        @A_Inject(AreContext) context: AreContext,
        @A_Inject(A_Logger) logger?: A_Logger,
    ) {
        logger?.debug('cyan', 'Starting to build the scene...');

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
    @A_Feature.Extend({
        name: AreEngineFeatures.Execute,
        before: /.*/
    })
    protected async defaultExecute(
        @A_Dependency.Required()
        @A_Inject(AreContext) context: AreContext,
        @A_Inject(A_SignalBus) bus?: A_SignalBus,
        @A_Inject(A_Logger) logger?: A_Logger,
    ) {
        logger?.debug('cyan', 'Starting to execute the scene and mount root nodes...');

        for (const root of context.roots) {

            context.startPerformance(`Mount root <${root.aseid.id}>`);

            root.mount();

            context.endPerformance(`Mount root <${root.aseid.id}>`);
        }

        logger?.debug('cyan', 'Emitting AreInit signal to start the reactive update cycle...');

        await bus?.next(new AreInit())
    }

    @A_Feature.Extend({
        name: AreEngineFeatures.Load,
        before: /.*/
    })
    async init(
        @A_Inject(A_Scope) scope: A_Scope,
    ) {
        this.package(scope);
    }

    @A_Feature.Extend({
        name: AreEngineFeatures.Load,
        before: /.*/
    })
    async verify(
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreSyntax) syntax?: AreSyntax,
        @A_Inject(AreSyntax) syntaxContext?: AreSyntax,
        @A_Inject(AreTransformer) transformer?: AreTransformer,
        @A_Inject(AreLoader) loader?: AreLoader,
        @A_Inject(AreCompiler) compiler?: AreCompiler,
        @A_Inject(AreInterpreter) interpreter?: AreInterpreter,
        @A_Inject(AreLifecycle) lifecycle?: AreLifecycle,
        @A_Inject(A_Logger) logger?: A_Logger,
    ) {
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


    /**
     * Method to pack all necessary dependencies for the engine. This method is called during the initialization phase of the engine and ensures that all required components are registered in the container scope, allowing for proper dependency injection and management throughout the engine's lifecycle.
     * 
     * @param scope 
     * @param dependencies 
     */
    @A_Frame.Method({
        description: 'Method to pack all necessary dependencies for the engine. This method is called during the initialization phase of the engine and ensures that all required components are registered in the container scope, allowing for proper dependency injection and management throughout the engine\'s lifecycle.'
    })
    protected package(
        scope: A_Scope,
        dependencies?: Partial<AreEngineDependencies>
    ) {
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

    protected packDependency<T extends A_TYPES__A_DependencyInjectable>(
        scope: A_Scope,
        dependency: T | A_TYPES__Ctor<T>,
        existed?: A_TYPES__Ctor<T>
    ) {
        const logger = scope.resolve(A_Logger);
        const thisName = A_CommonHelper.getComponentName(this);
        const scopeIssuerName = A_CommonHelper.getComponentName(scope.issuer());
        const dependencyName = A_CommonHelper.getComponentName(dependency);

        if (existed) {
            logger?.debug('cyan', `Dependency ${dependencyName} already exists in ${scopeIssuerName} scope. Skipping injection.`);

            return existed;
        } else {
            logger?.debug('cyan', `Injecting ${dependencyName} into ${scopeIssuerName} scope for ${thisName}...`);
            scope.register(dependency);

            return dependency;
        }
    }

}