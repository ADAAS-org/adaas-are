import { A_Caller, A_Component, A_Context, A_Feature, A_Inject, A_Scope } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame";
import { AreNode } from "@adaas/are/node/AreNode.entity";
import { AreSyntaxTokenMatch, AreSyntaxTokenRules } from "@adaas/are/syntax/AreSyntax.types";
import { AreSyntax } from "@adaas/are/syntax/AreSyntax.context";
import { AreContext } from "@adaas/are/component/Are.context";
// import { AreEngine } from "@adaas/are/engine/AreEngine.component";
import { AreEngineFeatures } from "@adaas/are/engine/AreEngine.constants";
import { AreTokenizerError } from "./AreTokenizer.error";
import { AreNodeFeatures } from "@adaas/are/node/AreNode.constants";
import { A_Logger } from "@adaas/a-utils/a-logger";


@A_Frame.Component({
    namespace: 'A-ARE',
    name: 'AreTokenizer',
    description: 'AreTokenizer is responsible for scanning and tokenizing template source strings using the syntax rules defined in AreSyntax. It converts raw template strings into AreNode instances that represent the structured AST of the template, enabling downstream compilation and rendering within the ARE framework.'
})
export class AreTokenizer extends A_Component {

    /**
     * Get the AreSyntax from the current scope. The AreSyntax defines the syntax rules and structures for tokenizing templates. It provides mechanisms for parsing and interpreting templates, attributes, directives, interpolations, and event listeners, enabling dynamic and interactive UI rendering within the ARE framework. If no AreSyntax is found in the scope, an error is thrown indicating that AreTokenizer requires an AreSyntax to function properly.
     */
    protected get config(): AreSyntax {
        const syntax = A_Context.scope(this).resolve(AreSyntax);

        if (!syntax) throw new AreTokenizerError({
            title: 'Syntax Context Not Found',
            description: 'AreTokenizer requires an AreSyntax to be present in the same scope. Ensure that an AreSyntax fragment is included in the concept and is accessible from the scope where AreTokenizer is used.'
        });

        return syntax
    }

    /**
     * Instantiate AreNodes based on the token matches obtained from scanning the source template. This method takes the raw source string from the context, scans it for tokens using the defined syntax rules, and creates corresponding AreNode instances for each matched token. The resulting array of AreNodes represents the structured representation of the template, which can then be used for further processing, such as rendering or applying scene instructions.
     * 
     * 
     * @param context 
     * @returns 
     */
    @A_Feature.Extend({
        name: AreEngineFeatures.Load,
        // scope: [AreEngine]
    })
    instantiate<T extends AreNode>(
        @A_Inject(AreContext) context: AreContext,
    ): void {
        context.startPerformance('Tokenizer Instantiate');

        const source = context.source;

        const nodes = this
            .scan(source, 0, source.length, context)
            .map(match => {
                const rule = this.findRuleForMatch(match)
                if (!rule) throw new Error(`No rule found for match at position ${match.position}`)
                return new (rule.component as typeof AreNode)(match)
            })

        for (const node of nodes) {
            context.addRoot(node)
        }

        context.endPerformance('Tokenizer Instantiate');
    }


    @A_Feature.Extend({
        name: AreNodeFeatures.onTokenize,
        scope: [AreNode]
    })
    tokenize(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreContext) context: AreContext,
        @A_Inject(A_Logger) logger?: A_Logger,
    ) {
        context.startPerformance(`Tokenize method`);

        const source = node.content
        const content = this
            .scan(source, 0, source.length, context)
            .map(match => {
                const rule = this.findRuleForMatch(match)
                if (!rule) throw new Error(`No rule found for match at position ${match.position}`)
                return new (rule.component as typeof AreNode)(match)
            })

        logger?.debug('red', `Tokenized node <${node.aseid.toString()}> with content:`, content.length);

        context.endPerformance(`Tokenize method`);

        context.startPerformance(`Tokenize node Create Children`);
        for (const child of content) {
            node.addChild(child);

            context.startPerformance('AreTokenizer.tokenize child init');
            child.init();
            // child.call(AreNodeFeatures.onInit, child.scope);

            context.endPerformance('AreTokenizer.tokenize child init');
        }

        context.endPerformance(`Tokenize node Create Children`);


    }

    protected scan(source: string, from: number, to: number, context: AreContext): AreSyntaxTokenMatch[] {
        context.startPerformance('Tokenizer Scan');

        const tokens: AreSyntaxTokenMatch[] = []
        let index = from
        let hasMatchBefore = false

        while (index < to) {
            const match = this.findNextMatch(source, index, to)
            if (!match) {
                const rest = source.slice(index, to)
                /**
                 * Trailing text (after the last match). When trimWhitespace is on,
                 * discard it if it is whitespace-only — it is edge indentation/newlines.
                 */
                const t = this.tryPlainText(rest, index)
                if (t && !(this.config.trimWhitespace && !rest.trim())) tokens.push(t)
                break
            }
            if (match.position > index) {
                const plain = source.slice(index, match.position)
                const t = this.tryPlainText(plain, index)
                if (t) {
                    /**
                     * When trimWhitespace is on and the text is whitespace-only:
                     * - Discard if it is leading text (before the first match)
                     * - Preserve (collapse to single space) if it is between two matches
                     */
                    if (this.config.trimWhitespace && !plain.trim()) {
                        if (hasMatchBefore) {
                            t.content = ' '
                            tokens.push(t)
                        }
                        // else: leading whitespace — skip
                    } else {
                        tokens.push(t)
                    }
                }
            }
            tokens.push(match)
            hasMatchBefore = true
            index = match.position + match.raw.length
        }

        context.endPerformance('Tokenizer Scan');


        return tokens
    }

    protected findNextMatch(source: string, from: number, to: number): AreSyntaxTokenMatch | null {
        let earliest: AreSyntaxTokenMatch | null = null
        for (const rule of this.config.rules) {
            if (!rule.opening && !rule.closing && !rule.pattern && !rule.matcher) continue
            const match = this.matchRule(source, rule, from, to)
            if (!match) continue
            if (!earliest || match.position < earliest.position) earliest = match
        }
        return earliest
    }

    protected matchRule(source: string, rule: AreSyntaxTokenRules, from: number, to: number): AreSyntaxTokenMatch | null {
        if (rule.matcher) {
            return rule.matcher(source, from, to, (raw, content, position, closing) =>
                this.buildMatch(rule, raw, content, position, closing)
            )
        }
        if (rule.pattern) {
            const slice = source.slice(from, to)
            rule.pattern.lastIndex = 0
            const m = rule.pattern.exec(slice)
            if (!m) return null
            return this.buildMatch(rule, m[0], m[0], from + m.index, '')
        }
        if (!rule.opening || !rule.closing) return null
        if (rule.prefix) return this.matchPrefixedRule(source, rule, from, to)
        return this.matchStandardRule(source, rule, from, to)
    }

    protected matchStandardRule(source: string, rule: AreSyntaxTokenRules, from: number, to: number): AreSyntaxTokenMatch | null {
        const opening = rule.opening!
        const closing = rule.closing!
        const openPos = source.indexOf(opening, from)
        if (openPos === -1 || openPos >= to) return null
        const contentStart = openPos + opening.length

        if (rule.selfClosing) {
            const selfClosePos = source.indexOf(rule.selfClosing, contentStart)
            const normalClosePos = source.indexOf(closing, contentStart)
            if (selfClosePos !== -1 && (normalClosePos === -1 || selfClosePos < normalClosePos)) {
                const closeEnd = selfClosePos + rule.selfClosing.length
                return this.buildMatch(rule, source.slice(openPos, closeEnd), source.slice(contentStart, selfClosePos), openPos, rule.selfClosing)
            }
        }

        const closePos = rule.nested !== false
            ? this.findMatchingClose(source, opening, closing, contentStart, to)
            : source.indexOf(closing, contentStart)

        if (closePos === -1) {
            if (this.config.strictMode) throw new Error(`Unclosed token '${opening}' at position ${openPos}`)
            return null
        }

        return this.buildMatch(rule, source.slice(openPos, closePos + closing.length), source.slice(contentStart, closePos), openPos, closing)
    }

    protected matchPrefixedRule(source: string, rule: AreSyntaxTokenRules, from: number, to: number): AreSyntaxTokenMatch | null {
        const opening = rule.opening!
        const closing = rule.closing!
        let searchFrom = from

        while (searchFrom < to) {
            const openPos = source.indexOf(opening, searchFrom)
            if (openPos === -1 || openPos >= to) return null

            const before = source.slice(from, openPos)
            const prefixRe = new RegExp(rule.prefix!.source + '$')
            const prefixM = prefixRe.exec(before)

            if (prefixM) {
                const actualStart = openPos - prefixM[0].length
                const contentStart = openPos + opening.length
                const closePos = rule.nested !== false
                    ? this.findMatchingClose(source, opening, closing, contentStart, to)
                    : source.indexOf(closing, contentStart)

                if (closePos === -1) {
                    if (this.config.strictMode) throw new Error(`Unclosed token '${opening}' at position ${openPos}`)
                    return null
                }

                return this.buildMatch(rule, source.slice(actualStart, closePos + closing.length), source.slice(contentStart, closePos), actualStart, closing)
            }
            searchFrom = openPos + 1
        }
        return null
    }

    protected findMatchingClose(source: string, opening: string, closing: string, from: number, to: number): number {
        let level = 1
        let index = from
        while (index < to) {
            const nextOpen = source.indexOf(opening, index)
            const nextClose = source.indexOf(closing, index)
            if (nextClose === -1) return -1
            if (nextOpen !== -1 && nextOpen < nextClose) {
                level++
                index = nextOpen + opening.length
                continue
            }
            level--
            if (level === 0) return nextClose
            index = nextClose + closing.length
        }
        return -1
    }

    protected buildMatch(rule: AreSyntaxTokenRules, raw: string, content: string, position: number, closingUsed: string): AreSyntaxTokenMatch {
        const trimmed = this.config.trimWhitespace ? content.trim() : content
        const match: AreSyntaxTokenMatch = { raw, content: trimmed, opening: rule.opening ?? '', closing: closingUsed, position, payload: {}, _rule: rule }
        if (rule.extract) match.payload = rule.extract(raw, match)
        return match
    }

    protected tryPlainText(raw: string, position: number): AreSyntaxTokenMatch | null {
        if (!raw) return null
        const rule = this.config.rules.find(r => !r.opening && !r.closing && !r.pattern && !r.matcher)
        if (!rule) return null
        const match = this.buildMatch(rule, raw, raw, position, '')
        match._rule = rule
        return match
    }

    protected findRuleForMatch(match: AreSyntaxTokenMatch): AreSyntaxTokenRules | undefined {
        // Fast path: the rule that produced this match is already stored
        if (match._rule) return match._rule
        // Fallback: match by opening/closing (for externally constructed AreSyntaxTokenMatch objects)
        return this.config.rules.find(r => (r.opening ?? '') === match.opening && (r.closing ?? '') === match.closing)
    }
}