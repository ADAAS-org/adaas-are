import { A_Component } from '@adaas/a-concept';
import { g as AreNode, a as AreContext, r as AreSyntaxTokenMatch, t as AreSyntaxTokenRules } from '../../Are.context-D7w32H1G.mjs';
import { AreSyntax } from '../AreSyntax/AreSyntax.context.mjs';
import { A_Logger } from '@adaas/a-utils/a-logger';
import '@adaas/a-utils/a-signal';
import '../AreEvent/AreEvent.context.mjs';
import '@adaas/a-utils/a-execution';
import '../AreStore/AreStore.types.mjs';
import '../AreStore/AreStore.constants.mjs';
import '../AreScene/AreScene.constants.mjs';
import '../AreAttribute/AreAttribute.types.mjs';
import '../AreAttribute/AreAttribute.constants.mjs';
import '../AreComponent/Are.component.mjs';
import '../AreComponent/Are.types.mjs';
import '../AreComponent/Are.constants.mjs';
import '../AreNode/AreNode.constants.mjs';

declare class AreTokenizer extends A_Component {
    /**
     * Get the AreSyntax from the current scope. The AreSyntax defines the syntax rules and structures for tokenizing templates. It provides mechanisms for parsing and interpreting templates, attributes, directives, interpolations, and event listeners, enabling dynamic and interactive UI rendering within the ARE framework. If no AreSyntax is found in the scope, an error is thrown indicating that AreTokenizer requires an AreSyntax to function properly.
     */
    protected get config(): AreSyntax;
    /**
     * Instantiate AreNodes based on the token matches obtained from scanning the source template. This method takes the raw source string from the context, scans it for tokens using the defined syntax rules, and creates corresponding AreNode instances for each matched token. The resulting array of AreNodes represents the structured representation of the template, which can then be used for further processing, such as rendering or applying scene instructions.
     *
     *
     * @param context
     * @returns
     */
    instantiate<T extends AreNode>(context: AreContext): void;
    tokenize(node: AreNode, context: AreContext, logger?: A_Logger): void;
    protected scan(source: string, from: number, to: number, context: AreContext): AreSyntaxTokenMatch[];
    protected findNextMatch(source: string, from: number, to: number): AreSyntaxTokenMatch | null;
    protected matchRule(source: string, rule: AreSyntaxTokenRules, from: number, to: number): AreSyntaxTokenMatch | null;
    protected matchStandardRule(source: string, rule: AreSyntaxTokenRules, from: number, to: number): AreSyntaxTokenMatch | null;
    protected matchPrefixedRule(source: string, rule: AreSyntaxTokenRules, from: number, to: number): AreSyntaxTokenMatch | null;
    protected findMatchingClose(source: string, opening: string, closing: string, from: number, to: number): number;
    protected buildMatch(rule: AreSyntaxTokenRules, raw: string, content: string, position: number, closingUsed: string): AreSyntaxTokenMatch;
    protected tryPlainText(raw: string, position: number): AreSyntaxTokenMatch | null;
    protected findRuleForMatch(match: AreSyntaxTokenMatch): AreSyntaxTokenRules | undefined;
}

export { AreTokenizer };
