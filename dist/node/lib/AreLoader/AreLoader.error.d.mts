import { A_Error } from '@adaas/a-concept';

declare class AreLoaderError extends A_Error {
    static readonly SyntaxError = "Are Loader Syntax Error";
    static readonly EmptyTemplateError = "Are Loader Empty Template Error";
}

export { AreLoaderError };
