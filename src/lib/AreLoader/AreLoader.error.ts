import { A_Error } from "@adaas/a-concept";



export class AreLoaderError extends A_Error {

    static readonly SyntaxError = 'Are Loader Syntax Error';

    static readonly EmptyTemplateError = 'Are Loader Empty Template Error';
}