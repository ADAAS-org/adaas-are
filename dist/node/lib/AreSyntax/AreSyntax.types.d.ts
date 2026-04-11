import { A_TYPES__Entity_Constructor } from '@adaas/a-concept';
import { AreNode } from '@adaas/are/node/AreNode.entity';
import { AreStore } from '@adaas/are/store/AreStore.context';

interface AreSyntaxTokenRules<T extends AreNode = AreNode> {
    /** Opening delimiter e.g. '<', '{{', '<!--', '{' */
    opening?: string;
    /** Closing delimiter e.g. '>', '}}', '-->', '}' */
    closing?: string;
    /** Optional self-closing marker e.g. '/>' */
    selfClosing?: string;
    /** Regex that must match content immediately before the opening delimiter */
    prefix?: RegExp;
    /** Replaces open/close entirely — matches entire pattern via RegExp */
    pattern?: RegExp;
    /**
     * Fully custom matcher — complete control over how a token is found.
     * Receives (source, from, to, build) where build(raw, content, position, closing)
     * constructs the AreSyntaxTokenMatch. Return null if no match found.
     */
    matcher?: (source: string, from: number, to: number, build: (raw: string, content: string, position: number, closing: string) => AreSyntaxTokenMatch) => AreSyntaxTokenMatch | null;
    /** Constructor to instantiate when this rule matches */
    component: A_TYPES__Entity_Constructor<T>;
    /** Higher = checked first. Default: 0 */
    priority?: number;
    /** Whether this token can contain nested tokens of same open/close. Default: true */
    nested?: boolean;
    /** Custom data extractor — called after match, result stored in match.meta */
    extract?: (raw: string, match: AreSyntaxTokenMatch) => Record<string, any>;
}
type AreSyntaxTokenPayload = {
    /**
     * Allows to override ASEID generation for this token match. Useful when the token corresponds to an existing entity or needs a stable ID across parses. If not provided, ASEID will be generated based on position and content.
     */
    id?: string;
    /**
     * Allows to override the entity type for this token match. Useful when the token corresponds to an existing entity or needs a specific entity type across parses. If not provided, the entity type will be inferred from the token.
     */
    entity?: string;
    /**
     * Allows to override the scope for this token match. Useful when the token corresponds to an existing entity or needs a specific scope across parses. If not provided, the scope will be generated based on position and content.
     */
    scope?: string;
    [key: string]: any;
};
interface AreSyntaxTokenMatch {
    /** Full matched string including delimiters */
    raw: string;
    /** Content between delimiters */
    content: string;
    /** The opening delimiter that matched */
    opening: string;
    /** The closing delimiter that matched */
    closing: string;
    /** Start position in source string */
    position: number;
    /** Data extracted via rule.extract */
    payload: AreSyntaxTokenPayload;
    /** @internal – the rule that produced this match (used by instantiate) */
    _rule?: AreSyntaxTokenRules;
}
interface AreSyntaxInitOptions {
    /**
     * Array of token rules defining the syntax to be parsed. Each rule specifies how to identify and process a particular type of token (e.g. interpolation, directive, comment) within templates. The rules are checked in order of priority, allowing for flexible and customizable parsing behavior.
     */
    rules: AreSyntaxTokenRules[];
    /**
     * Whether to trim leading/trailing whitespace from token content. Default: true. When enabled, any whitespace at the start or end of the content captured by a token will be removed before further processing. This can help prevent issues with unintended spaces affecting rendering or logic, especially in cases like interpolations or directives where extra whitespace may be common.
     */
    trimWhitespace?: boolean;
    /** Throw on unclosed tokens. Default: true */
    strictMode?: boolean;
}
type AreSyntaxCompiledExpression = {
    execute: (store: AreStore, scope?: Record<string, any>) => any;
    isCallable: boolean;
};

export type { AreSyntaxCompiledExpression, AreSyntaxInitOptions, AreSyntaxTokenMatch, AreSyntaxTokenPayload, AreSyntaxTokenRules };
