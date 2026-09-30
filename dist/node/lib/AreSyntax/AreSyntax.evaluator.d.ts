/**
 * CSP-safe expression evaluator for ARE templates.
 *
 * Parses the common template expression shapes into a small AST and evaluates
 * it WITHOUT `eval` / `new Function`, so bindings keep working under a page CSP
 * that forbids `'unsafe-eval'`.
 *
 * Supported:
 *   - literals: numbers, 'strings', "strings", `templates ${expr}`, true/false/null/undefined
 *   - identifiers, member access (`a.b`, `a[b]`, `a?.b`), calls (`f(x)`, `a.b(x)`, `f?.()`)
 *   - unary `! - + typeof`, binary `+ - * / % == != === !== < > <= >=`
 *   - logical `&& || ??`, conditional `a ? b : c`
 *   - arrow functions with an expression body: `x => ...`, `(a, b) => ...`, `() => ...`
 *   - array literals `[a, b]` and object literals `{ a: 1, 'b': x, c }`
 *
 * Anything else (assignments, `new`, `function`, block bodies, spread, regex, ...)
 * makes {@link parseAreExpression} return `null`, and the caller falls back to the
 * legacy `new Function` evaluator.
 */
type AreExprNode = {
    t: 'lit';
    v: any;
} | {
    t: 'id';
    n: string;
} | {
    t: 'mem';
    o: AreExprNode;
    p: AreExprNode;
    computed: boolean;
    opt: boolean;
} | {
    t: 'call';
    c: AreExprNode;
    a: AreExprNode[];
    opt: boolean;
} | {
    t: 'un';
    op: string;
    a: AreExprNode;
} | {
    t: 'bin';
    op: string;
    l: AreExprNode;
    r: AreExprNode;
} | {
    t: 'cond';
    test: AreExprNode;
    yes: AreExprNode;
    no: AreExprNode;
} | {
    t: 'arr';
    items: AreExprNode[];
} | {
    t: 'obj';
    props: Array<[string, AreExprNode]>;
} | {
    t: 'arrow';
    params: string[];
    body: AreExprNode;
} | {
    t: 'tpl';
    quasis: string[];
    exprs: AreExprNode[];
};
interface AreExprContext {
    /** Local bindings (directive / handler scope). Checked before the store. */
    scope?: Record<string, any>;
    /** Reads a (dot) path from the store. Registers store dependencies. */
    storeGet(path: string): any;
    /** `this` for functions that are resolved from the store. */
    storeThis: any;
    /** Throws when the identifier must not be accessed from expressions. */
    assertIdentifier(name: string): void;
}
/**
 * Parses an expression into an AST, or returns `null` when the expression uses
 * syntax outside the CSP-safe subset (the caller should then fall back).
 */
declare function parseAreExpression(src: string): AreExprNode | null;
/**
 * Evaluates a parsed expression against the given context.
 */
declare function evaluateAreExpression(node: AreExprNode, ctx: AreExprContext): any;

export { type AreExprContext, type AreExprNode, evaluateAreExpression, parseAreExpression };
