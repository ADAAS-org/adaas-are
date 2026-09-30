import { A_Fragment } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame/core";
import { AreSyntaxCompiledExpression, AreSyntaxInitOptions, AreSyntaxTokenRules } from "./AreSyntax.types";
import { AreStore } from "@adaas/are/store/AreStore.context";
import { AreExprContext, AreExprNode, evaluateAreExpression, parseAreExpression } from "./AreSyntax.evaluator";

/** Returned by `resolveSimplePath` when the fast path could not resolve the value. */
const NOT_FOUND = Symbol('not-found')

/** Max number of distinct expressions kept in the validate+parse cache. */
const EXPRESSION_CACHE_LIMIT = 5000

@A_Frame.Define({
    namespace: 'A-ARE',
    description: 'Context that defines the syntax rules and structures for the A-Concept Rendering Engine (ARE). It provides mechanisms for parsing and interpreting templates, attributes, directives, interpolations, and event listeners, enabling dynamic and interactive UI rendering within the ARE framework.'
})
export class AreSyntax extends A_Fragment {
    /**
     * Max allowed length of an expression string to prevent excessively long inputs that could lead to performance issues or abuse.
     */
    private readonly MAX_LENGTH = 500
    /**
     * Max allowed nesting depth of parentheses, brackets, and braces in expressions to prevent excessively complex inputs that could lead to performance issues or abuse. Default is 5 levels of nesting.
     */
    private readonly MAX_DEPTH = 5
    /**
     * List of regex patterns that are blocked in expressions to prevent access to unsafe or sensitive features. This includes patterns for global objects, functions, and syntax that could be used for malicious purposes (e.g. "eval", "Function", "fetch", "XMLHttpRequest", "import", "require", "document", "window", "globalThis", "global", "process", "__proto__", "constructor", "prototype"). Expressions containing any of these patterns will be rejected during validation.
     */
    private readonly BLOCKED_PATTERNS: RegExp[] = [
        /\beval\b/,
        /\bFunction\b/,
        /\bfetch\b/,
        /\bXMLHttpRequest\b/,
        /\bimport\b/,
        /\brequire\b/,
        /\bdocument\b/,
        /\bwindow\b/,
        /\bglobalThis\b/,
        /\bglobal\b/,
        /\bprocess\b/,
        /\b__proto__\b/,
        /\bprototype\b/,
        /\bconstructor\b/,
        /\bObject\s*\.\s*assign\b/,
        /\bObject\s*\.\s*defineProperty\b/,
        /\bsetTimeout\b/,
        /\bsetInterval\b/,
        /\blocalStorage\b/,
        /\bsessionStorage\b/,
        /\bcookie\b/,
        /\bWebSocket\b/,
        /\bWorker\b/,
    ]
    /**
     * Set of global identifiers that are blocked in expressions to prevent access to unsafe or sensitive features. This includes global objects and functions that could be used for malicious purposes (e.g. "eval", "Function", "fetch", "XMLHttpRequest", "document", "window", "globalThis", "global", "process", "setTimeout", "setInterval", "localStorage", "sessionStorage", "indexedDB", "WebSocket", "Worker"). Accessing any of these identifiers in an expression will be rejected during validation.
     */
    private readonly BLOCKED_GLOBALS = new Set([
        'eval', 'Function', 'fetch', 'XMLHttpRequest',
        'document', 'window', 'globalThis', 'global', 'process',
        'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval',
        'localStorage', 'sessionStorage', 'indexedDB',
        'WebSocket', 'Worker', 'Blob', 'File',
        'require', 'module', 'exports',
        'alert', 'confirm', 'prompt',
    ])
    /**
     * Regex pattern that defines the allowed characters in expressions. This pattern allows ASCII
     * operator/punctuation characters used in JavaScript expressions, plus any Unicode letter,
     * number, mark, symbol or emoji that can legitimately appear inside a string literal.
     * Dangerous constructs are caught by BLOCKED_PATTERNS; this guard exists only to reject
     * clearly-invalid byte sequences (e.g. raw null bytes, control characters).
     */
    private readonly ALLOWED_CHARS = /^[\w\s\d\.\[\]()=><|&!+\-*/%?:,'"`;~^$\p{L}\p{N}\p{M}\p{S}\p{Emoji}]+$/u
    /**
     * Simple dot-path identifier pattern (e.g. "name", "user.name", "user.profile.name").
     * Matches strings that consist solely of identifier characters separated by dots.
     */
    private readonly SIMPLE_PATH = /^[a-zA-Z_$][\w$]*(?:\.[a-zA-Z_$][\w$]*)*$/
    /**
     * String literals ('...', "...", `...`) — their content is exempt from the ALLOWED_CHARS guard.
     */
    private readonly STRING_LITERALS = /'(?:[^'\\]|\\[\s\S])*'|"(?:[^"\\]|\\[\s\S])*"|`(?:[^`\\]|\\[\s\S])*`/g
    /**
     * Validated expressions → parsed AST, or `null` when the expression uses syntax
     * outside the CSP-safe subset (then the legacy `new Function` path is used).
     */
    private readonly _expressions = new Map<string, AreExprNode | null>()
    /**
     * Compiled expression — a pre-parsed function ready for repeated execution.
     * Created once via compile(), reused on every apply/click.
     */

    private readonly _rules: AreSyntaxTokenRules[]
    private readonly _trimWhitespace: boolean
    private readonly _strictMode: boolean

    constructor(config?: Partial<AreSyntaxInitOptions>) {
        super({ name: 'AreSyntax' })

        this._trimWhitespace = config?.trimWhitespace !== false
        this._strictMode = config?.strictMode !== false
        this._rules = [...(config?.rules ?? [])].sort((a, b) =>
            (b.priority ?? 0) - (a.priority ?? 0)
        )
    }
    /**
     * Get the array of token rules that define the syntax for parsing templates. Each rule specifies how to identify and process a particular type of token (e.g. interpolation, directive, comment) within templates. The rules are checked in order of priority, allowing for flexible and customizable parsing behavior.
     */
    get rules() {
        return this._rules
    }
    /**
     * Indicates whether leading and trailing whitespace should be trimmed from token content. When enabled, any whitespace at the start or end of the content captured by a token will be removed before further processing. This can help prevent issues with unintended spaces affecting rendering or logic, especially in cases like interpolations or directives where extra whitespace may be common. Default is true.
     */
    get trimWhitespace() {
        return this._trimWhitespace
    }
    /**
     * Indicates whether the parser should throw an error when it encounters unclosed tokens. When enabled, if the parser finds an opening delimiter without a corresponding closing delimiter (e.g. an unclosed interpolation or directive), it will throw an error instead of silently ignoring it. This can help catch syntax errors and ensure that templates are well-formed. Default is true.
     */
    get strictMode() {
        return this._strictMode
    }



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
    compile(expr: string): AreSyntaxCompiledExpression {
        const trimmed = expr.trim()

        // validate + parse once — throws if expression is unsafe or malformed
        const ast = this.prepare(trimmed)

        const isCallable = this.isCallableExpression(trimmed)
        const isSimplePath = this.SIMPLE_PATH.test(trimmed)

        // Only expressions outside the CSP-safe subset need a Function
        let compiled: Function | null = null

        if (!ast) {
            try {
                compiled = new Function('scope', `"use strict"; with(scope) { return (${trimmed}) }`)
            } catch (e) {
                throw new Error(`Expression syntax error in "${trimmed}": ${(e as Error).message}`)
            }
        }

        const self = this

        return {
            isCallable,

            execute(store: AreStore, scope?: Record<string, any>): any {
                // fast path — simple property path, no sandbox needed
                if (isSimplePath) {
                    const value = self.resolveSimplePath(trimmed, store, scope)
                    if (value !== NOT_FOUND) return value
                }

                let result: any
                try {
                    result = ast
                        ? evaluateAreExpression(ast, self.createContext(store, scope))
                        : compiled!(self.createSandbox(store, scope))
                } catch (e) {
                    throw new Error(`Expression evaluation error in "${trimmed}": ${(e as Error).message}`)
                }

                if (isCallable && typeof result !== 'function') {
                    throw new Error(
                        `Expression "${trimmed}" was expected to be callable — got ${result === null ? 'null' : typeof result}`
                    )
                }

                return result
            }
        }
    }
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
    evaluate(expr: string, store: AreStore, scope?: Record<string, any>): any {
        const trimmed = expr.trim()

        const ast = this.prepare(trimmed)

        /**
         * Fast path: if the expression is a simple property path (e.g. "name", "user.name", "t.label"),
         * resolve it directly — first from scope (walking the dotted path), then from the store.
         */
        if (this.SIMPLE_PATH.test(trimmed)) {
            const value = this.resolveSimplePath(trimmed, store, scope)
            if (value !== NOT_FOUND) return value
        }

        let result: any
        if (ast) {
            try {
                result = evaluateAreExpression(ast, this.createContext(store, scope))
            } catch (e) {
                throw new Error(`Expression evaluation error in "${trimmed}": ${(e as Error).message}`)
            }
        } else {
            result = this.execute(trimmed, this.createSandbox(store, scope))
        }

        if (this.isCallableExpression(trimmed)) {
            if (typeof result !== 'function') {
                throw new Error(
                    `Expression "${trimmed}" was expected to be callable — got ${result === null ? 'null' : typeof result}`
                )
            }
        }

        return result
    }

    /**
     * Extracts $-prefixed handler names from an expression.
     * These represent event emission targets, not store references.
     *
     * Examples:
     *   "$handleClick"                                     → Set(["handleClick"])
     *   "$handleClick(user.name)"                           → Set(["handleClick"])
     *   "(e) => isValid(user.name) ? $handleClick(e) : null" → Set(["handleClick"])
     */
    extractEmitHandlers(expr: string): Set<string> {
        const stripped = expr.trim().replace(/'[^']*'|"[^"]*"|`[^`]*`/g, '""')
        const handlers = new Set<string>()
        const pattern = /\$([a-zA-Z_][\w$]*)/g
        let match: RegExpExecArray | null

        while ((match = pattern.exec(stripped)) !== null) {
            handlers.add(match[1])
        }

        return handlers
    }

    // ── Classification ────────────────────────────────────────────────────────

    private isCallableExpression(expr: string): boolean {
        // arrow function:  () => ...  or  x => ...
        if (/^\(?[\w\s,]*\)?\s*=>/.test(expr)) return true

        // function keyword:  function(...) { }
        if (/^function\s*\(/.test(expr)) return true

        // plain identifier with no operators — could be a function ref
        // but only if it resolves to a function — we let the guard handle it
        // so we don't classify this as callable upfront
        return false
    }

    // ── Validation ────────────────────────────────────────────────────────────
    /**
     * Validates and parses an expression once; later calls with the same string
     * reuse the cached result (validation is deterministic per string).
     */
    private prepare(expr: string): AreExprNode | null {
        const cached = this._expressions.get(expr)
        if (cached !== undefined) return cached
        if (this._expressions.has(expr)) return null

        this.validate(expr)
        const ast = parseAreExpression(expr)

        if (this._expressions.size >= EXPRESSION_CACHE_LIMIT) this._expressions.clear()
        this._expressions.set(expr, ast)

        return ast
    }
    private validate(expr: string): void {
        if (expr.length > this.MAX_LENGTH) {
            throw new Error(
                `Expression exceeds maximum length of ${this.MAX_LENGTH} characters`
            )
        }

        for (const pattern of this.BLOCKED_PATTERNS) {
            if (pattern.test(expr)) {
                throw new Error(`Expression contains blocked pattern: ${pattern.source}`)
            }
        }

        // Characters inside string literals are not restricted (e.g. '…', '·', '•')
        if (!this.ALLOWED_CHARS.test(expr.replace(this.STRING_LITERALS, '""'))) {
            throw new Error(`Expression contains disallowed characters`)
        }

        this.checkDepth(expr)
    }

    private checkDepth(expr: string): void {
        let depth = 0
        let max = 0
        for (const ch of expr) {
            if (ch === '(' || ch === '[' || ch === '{') { depth++; max = Math.max(max, depth) }
            if (ch === ')' || ch === ']' || ch === '}') depth--
        }
        if (max > this.MAX_DEPTH) {
            throw new Error(`Expression exceeds maximum nesting depth of ${this.MAX_DEPTH}`)
        }
    }

    // ── Sandbox ───────────────────────────────────────────────────────────────
    /**
     * Resolves a simple dotted path (`name`, `user.name`, `t.label`) without the
     * evaluator: the whole path or its first segment from `scope`, otherwise the store.
     * Returns NOT_FOUND when the path should go through the full evaluator.
     */
    private resolveSimplePath(path: string, store: AreStore | undefined, scope?: Record<string, any>): any {
        if (scope) {
            if (path in scope) return scope[path]

            const dot = path.indexOf('.')
            if (dot > 0) {
                const head = path.slice(0, dot)
                if (head in scope) {
                    let value = scope[head]
                    for (const segment of path.slice(dot + 1).split('.')) {
                        // let the evaluator raise the proper error
                        if (value === null || value === undefined) return NOT_FOUND
                        value = value[segment]
                    }
                    return value
                }
            }
        }

        const value = store?.get(path)
        return value !== undefined ? value : NOT_FOUND
    }

    private createContext(store: AreStore | undefined, scope?: Record<string, any>): AreExprContext {
        return {
            scope,
            storeGet: (path: string) => store?.get(path),
            storeThis: store,
            assertIdentifier: (name: string) => {
                if (this.BLOCKED_GLOBALS.has(name)) {
                    throw new Error(`Access to "${name}" is not allowed in expressions`)
                }
            },
        }
    }
    private createSandbox(store: AreStore, scope?: Record<string, any>): object {
        return new Proxy({}, {
            has: (_, key) => {
                if (typeof key === 'string' && this.BLOCKED_GLOBALS.has(key)) return false
                return true
            },
            get: (_, key) => {
                if (typeof key !== 'string') return undefined

                // Scope bindings take priority over the store
                if (scope && key in scope) return scope[key]

                this.assertSafeKey(key)

                const value = store.get(key)
                if (typeof value === 'function') return value.bind(store)
                if (value !== null && typeof value === 'object' && value !== undefined) {
                    return new Proxy(value as object, this.nestedHandler(key, store))
                }
                return value
            },
            set: () => { throw new Error('Expression scope is read-only') },
        })
    }

    private nestedHandler(prefix: string, store: AreStore): ProxyHandler<object> {
        return {
            has: () => true,
            get: (target, key) => {
                if (typeof key !== 'string') return undefined
                this.assertSafeKey(key)

                const fullKey = `${prefix}.${key}`
                const value = store.get(fullKey)

                if (value === undefined) return (target as any)[key]
                if (typeof value === 'function') return value.bind(store)
                if (value !== null && typeof value === 'object') {
                    return new Proxy(value as object, this.nestedHandler(fullKey, store))
                }
                return value
            },
            set: () => { throw new Error('Expression scope is read-only') },
        }
    }

    private assertSafeKey(key: string): void {
        if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
            throw new Error(`Access to "${key}" is not allowed in expressions`)
        }
        if (this.BLOCKED_GLOBALS.has(key)) {
            throw new Error(`Access to "${key}" is not allowed in expressions`)
        }
    }

    // ── Execution ─────────────────────────────────────────────────────────────

    private execute(expr: string, sandbox: object): any {
        let fn: Function
        try {
            fn = new Function('scope', `with(scope) { return (${expr}) }`)
        } catch (e) {
            throw new Error(`Expression syntax error in "${expr}": ${(e as Error).message}`)
        }

        try {
            return fn(sandbox)
        } catch (e) {
            throw new Error(`Expression evaluation error in "${expr}": ${(e as Error).message}`)
        }
    }
}