import { A_Scope } from '@adaas/a-concept';
import { AreStore } from '@adaas/are/store/AreStore.context';
import { AreContext } from '@adaas/are/component/Are.context';
import { AreSyntax } from '@adaas/are/syntax/AreSyntax.context';

jest.retryTimes(0);


function makeStore(values: Record<string, any> = {}) {
    const scope = new A_Scope({ name: `syntax-test-${Math.random().toString(36).slice(2)}` });
    scope.register(new AreContext(''));
    const store = new AreStore(`store-${Math.random().toString(36).slice(2)}`);
    scope.register(store);
    if (Object.keys(values).length) store.set(values);
    return store;
}

/**
 * Simulates a page CSP without 'unsafe-eval': any `new Function(...)` throws.
 */
function withoutEval<T>(fn: () => T): T {
    const original = global.Function;
    (global as any).Function = function () {
        throw new EvalError('Refused to evaluate a string as JavaScript (CSP)');
    };
    try {
        return fn();
    } finally {
        (global as any).Function = original;
    }
}


describe('AreSyntax — CSP-safe evaluation (no eval)', () => {
    const syntax = new AreSyntax();

    it('resolves loop-variable paths from the directive scope', () => {
        const store = makeStore();
        const t = { label: 'Tab 1', id: 't1', meta: { cls: 'active' } };

        withoutEval(() => {
            expect(syntax.evaluate('t.label', store, { t })).toBe('Tab 1');
            expect(syntax.evaluate('t.meta.cls', store, { t })).toBe('active');
            expect(syntax.evaluate("t.meta['cls']", store, { t })).toBe('active');
        });
    });

    it('evaluates handler calls with arguments', () => {
        const store = makeStore();
        const pick = jest.fn((id: string) => `picked:${id}`);

        const result = withoutEval(() =>
            syntax.evaluate('$pick(t.id)', store, { $pick: pick, t: { id: 't7' } })
        );

        expect(pick).toHaveBeenCalledWith('t7');
        expect(result).toBe('picked:t7');
    });

    it('evaluates arrow handlers, conditionals, logical and arithmetic operators', () => {
        const store = makeStore({ count: 2, pageTitle: 'Home', user: { name: 'Ann' }, items: [1, 2, 3] });
        const handler = jest.fn();

        withoutEval(() => {
            const fn = syntax.evaluate('(e) => !!pageTitle ? $h(e, count) : null', store, { $h: handler });
            expect(typeof fn).toBe('function');
            fn('evt');
            expect(handler).toHaveBeenCalledWith('evt', 2);

            expect(syntax.evaluate('count + 1', store)).toBe(3);
            expect(syntax.evaluate('count * 3 - 1 === 5', store)).toBe(true);
            expect(syntax.evaluate('count > 1 && count <= 2', store)).toBe(true);
            expect(syntax.evaluate('items.length', store)).toBe(3);
            expect(syntax.evaluate('items.includes(2)', store)).toBe(true);
            expect(syntax.evaluate('items.map(x => x * 2).join(",")', store)).toBe('2,4,6');
            expect(syntax.evaluate('user.name', store)).toBe('Ann');
            expect(syntax.evaluate("missing?.name ?? 'anon'", store)).toBe('anon');
            expect(syntax.evaluate('`${user.name}: ${count}`', store)).toBe('Ann: 2');
            expect(syntax.evaluate('[count, -count, typeof user]', store)).toEqual([2, -2, 'object']);
        });
    });

    it('compile().execute works without eval', () => {
        const store = makeStore({ count: 4 });

        withoutEval(() => {
            const compiled = syntax.compile('count % 3 === 1 ? "yes" : "no"');
            expect(compiled.execute(store)).toBe('yes');

            const handler = syntax.compile('(e) => $h(e)');
            const h = jest.fn();
            handler.execute(store, { $h: h })('x');
            expect(h).toHaveBeenCalledWith('x');
        });
    });

    it('scope bindings take priority over the store for dotted paths', () => {
        const store = makeStore({ t: { label: 'from-store' } });
        expect(syntax.evaluate('t.label', store, { t: { label: 'from-scope' } })).toBe('from-scope');
        expect(syntax.evaluate('t.label', store)).toBe('from-store');
    });

    it('blocks unsafe access', () => {
        const store = makeStore({ obj: {} });

        withoutEval(() => {
            expect(() => syntax.evaluate("alert('x')", store)).toThrow();
            expect(() => syntax.evaluate("obj['constr' + 'uctor']", store)).toThrow(/not allowed/);
            expect(() => syntax.evaluate("obj['__pro' + 'to__']", store)).toThrow(/not allowed/);
            expect(() => syntax.evaluate('obj.constructor', store)).toThrow();
        });
    });

    it('falls back to the Function evaluator for syntax outside the safe subset', () => {
        const store = makeStore();
        expect(syntax.evaluate('(1, 2)', store)).toBe(2);
    });
});


describe('AreSyntax — Unicode punctuation inside string literals (AH-1)', () => {
    const syntax = new AreSyntax();

    it('accepts Unicode punctuation inside string literals', () => {
        const store = makeStore({ loading: true });

        expect(syntax.evaluate("'Loading…'", store)).toBe('Loading…');
        expect(syntax.evaluate('"a · b • c ❯"', store)).toBe('a · b • c ❯');
        expect(syntax.evaluate("loading ? 'Loading…' : 'Done'", store)).toBe('Loading…');
        expect(syntax.evaluate('`… ${loading}`', store)).toBe('… true');
    });
});
