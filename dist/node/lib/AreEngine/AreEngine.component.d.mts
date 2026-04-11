import { A_Component, A_Scope, A_TYPES__A_DependencyInjectable, A_TYPES__Ctor } from '@adaas/a-concept';
import { AreSyntax } from '@adaas/are/syntax/AreSyntax.context';
import { A_Logger } from '@adaas/a-utils/a-logger';
import { AreCompiler } from '@adaas/are/compiler/AreCompiler.component';
import { AreTransformer } from '@adaas/are/transformer/AreTransformer.component';
import { AreLoader } from '@adaas/are/loader/AreLoader.component';
import { AreInterpreter } from '@adaas/are/interpreter/AreInterpreter.component';
import { AreLifecycle } from '@adaas/are/lifecycle/AreLifecycle.component';
import { AreContext } from '@adaas/are/component/Are.context';
import { AreEngineDependencies } from './AreEngine.types.mjs';
import { A_SignalBus } from '@adaas/a-utils/a-signal';
import '@adaas/are/tokenizer/AreTokenizer.component';
import '@adaas/are/signals/AreSignals.component';

declare class AreEngine extends A_Component {
    /**
     * Feature decorator for the load method, which is responsible for the initial loading phase of the engine. This method is where the engine reads the source template, tokenizes it, and prepares the initial context for building the scene. The decorator allows for extending or overriding the default loading behavior by attaching additional functionality before or after the load process.
     */
    static get Load(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    /**
     * Feature decorator for the build method, which is responsible for constructing the scene based on the loaded context. This method typically involves initializing root nodes, applying transformations, and compiling the scene into a format that can be executed by the interpreter. The decorator allows for customizing the build process by adding additional steps or modifying the existing behavior.
     */
    static get Build(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    /**
     * Feature decorator for the execute method, which is responsible for the final execution phase of the engine. This method typically involves mounting the root nodes to the DOM and starting the reactive update cycle based on signals and state changes. The decorator allows for customizing the execution process by adding additional steps or modifying the existing behavior.
     */
    static get Execute(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
    /**
     * Method to start the engine, which involves loading necessary resources, building the scene, and executing the rendering process. It accepts an optional scope parameter that can be used to provide a custom scope for the engine's operations, allowing for greater flexibility in how dependencies are managed and accessed during the rendering lifecycle.
     *
     * @param scope
     * @returns
     */
    load(scope?: A_Scope): Promise<void>;
    /**
     * Method responsible for building the scene, which includes initializing root nodes, loading necessary data, applying transformations, and compiling the scene into a format that can be executed by the interpreter.
     *
     * @param context
     * @param logger
     */
    build(scope?: A_Scope): Promise<void>;
    /**
     * Method responsible for executing the rendering process, which involves mounting the root nodes to the DOM and starting the reactive update cycle based on signals and state changes.
     *
     * @param context
     * @param logger
     */
    execute(scope?: A_Scope): Promise<void>;
    protected defaultBuild(context: AreContext, logger?: A_Logger): Promise<void>;
    protected defaultExecute(context: AreContext, bus?: A_SignalBus, logger?: A_Logger): Promise<void>;
    init(scope: A_Scope): Promise<void>;
    verify(scope: A_Scope, syntax?: AreSyntax, syntaxContext?: AreSyntax, transformer?: AreTransformer, loader?: AreLoader, compiler?: AreCompiler, interpreter?: AreInterpreter, lifecycle?: AreLifecycle, logger?: A_Logger): Promise<void>;
    /**
     * Method to pack all necessary dependencies for the engine. This method is called during the initialization phase of the engine and ensures that all required components are registered in the container scope, allowing for proper dependency injection and management throughout the engine's lifecycle.
     *
     * @param scope
     * @param dependencies
     */
    protected package(scope: A_Scope, dependencies?: Partial<AreEngineDependencies>): void;
    protected packDependency<T extends A_TYPES__A_DependencyInjectable>(scope: A_Scope, dependency: T | A_TYPES__Ctor<T>, existed?: A_TYPES__Ctor<T>): T | A_TYPES__Ctor<T>;
}

export { AreEngine };
