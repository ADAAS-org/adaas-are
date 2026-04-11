import { A_Fragment } from '@adaas/a-concept';
import { AreNode } from '../AreNode/AreNode.entity.js';
import { AreSyntaxInitOptions, AreSyntaxTokenRules, AreSyntaxCompiledExpression } from './AreSyntax.types.js';
import { AreStore } from '@adaas/are/store/AreStore.context';
import '@adaas/are/event/AreEvent.context';
import '@adaas/are/scene/AreScene.context';
import '@adaas/are/attribute/AreAttribute.entity';
import '@adaas/are/component/Are.component';
import '../AreNode/AreNode.types.js';
import '@adaas/are/syntax/AreSyntax.types';
import '../AreNode/AreNode.constants.js';
import '@adaas/are/node/AreNode.entity';

declare class AreSyntax extends A_Fragment {
    /**
     * Max allowed length of an expression string to prevent excessively long inputs that could lead to performance issues or abuse.
     */
    private readonly MAX_LENGTH;
    /**
     * Max allowed nesting depth of parentheses, brackets, and braces in expressions to prevent excessively complex inputs that could lead to performance issues or abuse. Default is 5 levels of nesting.
     */
    private readonly MAX_DEPTH;
    /**
     * List of regex patterns that are blocked in expressions to prevent access to unsafe or sensitive features. This includes patterns for global objects, functions, and syntax that could be used for malicious purposes (e.g. "eval", "Function", "fetch", "XMLHttpRequest", "import", "require", "document", "window", "globalThis", "global", "process", "__proto__", "constructor", "prototype"). Expressions containing any of these patterns will be rejected during validation.
     */
    private readonly BLOCKED_PATTERNS;
    /**
     * Set of global identifiers that are blocked in expressions to prevent access to unsafe or sensitive features. This includes global objects and functions that could be used for malicious purposes (e.g. "eval", "Function", "fetch", "XMLHttpRequest", "document", "window", "globalThis", "global", "process", "setTimeout", "setInterval", "localStorage", "sessionStorage", "indexedDB", "WebSocket", "Worker"). Accessing any of these identifiers in an expression will be rejected during validation.
     */
    private readonly BLOCKED_GLOBALS;
    /**
     * Regex pattern that defines the allowed characters in expressions. This pattern allows letters, digits, whitespace, and common operators and punctuation used in JavaScript expressions. Expressions containing characters that do not match this pattern will be rejected during validation to prevent injection of potentially harmful code.
     */
    private readonly ALLOWED_CHARS;
    /**
     * Simple dot-path identifier pattern (e.g. "name", "user.name", "user.profile.name").
     * Matches strings that consist solely of identifier characters separated by dots.
     */
    private readonly SIMPLE_PATH;
    /**
     * Compiled expression — a pre-parsed function ready for repeated execution.
     * Created once via compile(), reused on every apply/click.
     */
    private readonly _rules;
    private readonly _trimWhitespace;
    private readonly _strictMode;
    constructor(config?: Partial<AreSyntaxInitOptions>);
    /**
     * Get the array of token rules that define the syntax for parsing templates. Each rule specifies how to identify and process a particular type of token (e.g. interpolation, directive, comment) within templates. The rules are checked in order of priority, allowing for flexible and customizable parsing behavior.
     */
    get rules(): AreSyntaxTokenRules<AreNode>[];
    /**
     * Indicates whether leading and trailing whitespace should be trimmed from token content. When enabled, any whitespace at the start or end of the content captured by a token will be removed before further processing. This can help prevent issues with unintended spaces affecting rendering or logic, especially in cases like interpolations or directives where extra whitespace may be common. Default is true.
     */
    get trimWhitespace(): boolean;
    /**
     * Indicates whether the parser should throw an error when it encounters unclosed tokens. When enabled, if the parser finds an opening delimiter without a corresponding closing delimiter (e.g. an unclosed interpolation or directive), it will throw an error instead of silently ignoring it. This can help catch syntax errors and ensure that templates are well-formed. Default is true.
     */
    get strictMode(): boolean;
    /**
     * Compiles an expression string into a reusable executor.
     * Performs validation and Function construction once.
     * Use when the same expression will be evaluated multiple times
     * e.g. event handlers, instructions that re-apply on store changes.
     *
     * @example
     *   // compile once at apply() time
     *   const compiled = AreCommonHelper.compile('(e) => !!pageTitle ? $testHandler(e, item) : null')
     *
     *   // execute on every click — no re-parsing, no re-validation
     *   element.addEventListener('click', (e) => {
     *       const fn = compiled.execute(store, { $testHandler: handler, item })
     *       if (typeof fn === 'function') fn(e)
     *   })
     */
    compile(expr: string): AreSyntaxCompiledExpression;
    /**
     * Evaluates an expression string against the provided store.
     * Automatically determines whether the result should be callable
     * based on the shape of the expression.
     *
     * Returns the raw value for plain expressions (interpolations, bindings).
     * Returns a bound function for callable expressions (event handlers).
     *
     * @param expr  Expression string to evaluate.
     * @param store AreStore used for identifier resolution.
     * @param scope Optional extra bindings checked **before** the store.
     *              Useful for injecting event-specific values (`$event`, `element`)
     *              or emit wrappers (`$handleClick`).
     *
     * @example
     *   // simple value
     *   evaluate('user.name', store)
     *
     *   // with emit wrapper
     *   evaluate('$handleClick($event, user.name)', store, {
     *       $event: domEvent,
     *       $handleClick: (...args) => node.emit(new AreEvent('handleClick', args)),
     *   })
     *
     *   // arrow with conditional
     *   evaluate('(e) => isValid(user.name) ? $handleClick(e) : null', store, {
     *       $handleClick: (...args) => node.emit(new AreEvent('handleClick', args)),
     *   })
     */
    evaluate(expr: string, store: AreStore, scope?: Record<string, any>): any;
    /**
     * Extracts $-prefixed handler names from an expression.
     * These represent event emission targets, not store references.
     *
     * Examples:
     *   "$handleClick"                                     → Set(["handleClick"])
     *   "$handleClick(user.name)"                           → Set(["handleClick"])
     *   "(e) => isValid(user.name) ? $handleClick(e) : null" → Set(["handleClick"])
     */
    extractEmitHandlers(expr: string): Set<string>;
    private isCallableExpression;
    private validate;
    private checkDepth;
    private createSandbox;
    private nestedHandler;
    private assertSafeKey;
    private execute;
}

export { AreSyntax };
