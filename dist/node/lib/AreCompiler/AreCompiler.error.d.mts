import { A_Error } from '@adaas/a-concept';

declare class AreCompilerError extends A_Error {
    static readonly RenderError = "Are Compiler Render Error";
    static readonly CompilationError = "Are Compiler Compilation Error";
}

export { AreCompilerError };
