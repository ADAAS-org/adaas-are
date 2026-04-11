import { A_Scope } from '@adaas/a-concept';
import { AreNode } from '@adaas/are/node/AreNode.entity';
import { AreSyntax } from '@adaas/are/syntax/AreSyntax.context';
import { AreSyntaxInitOptions, AreSyntaxTokenMatch } from '@adaas/are/syntax/AreSyntax.types';
import { AreTokenizer } from '@adaas/are/tokenizer/AreTokenizer.component';
import { AreContext } from '@adaas/are/component/Are.context';

jest.retryTimes(0);


function htmlElementMatcher(
    source: string,
    from: number,
    to: number,
    build: (raw: string, content: string, position: number, closing: string) => AreSyntaxTokenMatch
): AreSyntaxTokenMatch | null {
    let index = from

    while (index < to) {
        const tagStart = source.indexOf('<', index)
        if (tagStart === -1 || tagStart >= to) return null

        // skip comments, closing tags, doctype, processing instructions
        if (source.startsWith('<!--', tagStart)) { index = tagStart + 1; continue }
        if (source[tagStart + 1] === '/') { index = tagStart + 1; continue }
        if (source[tagStart + 1] === '!' || source[tagStart + 1] === '?') { index = tagStart + 1; continue }

        const tagNameMatch = source.slice(tagStart).match(/^<([a-zA-Z][a-zA-Z0-9-]*)/)
        if (!tagNameMatch) { index = tagStart + 1; continue }

        const tagName = tagNameMatch[1]
        const openingTagEnd = source.indexOf('>', tagStart)
        if (openingTagEnd === -1) return null

        // self-closing: <br/> or <input/>
        if (source[openingTagEnd - 1] === '/') {
            const raw = source.slice(tagStart, openingTagEnd + 1)
            const content = source.slice(tagStart + tagNameMatch[0].length, openingTagEnd - 1)
            const match = build(raw, content, tagStart, '/>')
            match.payload = { tagName, selfClose: true }
            return match
        }

        // find matching closing tag respecting nesting
        const closingTag = `</${tagName}>`
        let level = 0
        let searchIndex = openingTagEnd + 1
        let closingStart = -1

        while (searchIndex < to) {
            const nextOpen = source.indexOf(`<${tagName}`, searchIndex)
            const nextClose = source.indexOf(closingTag, searchIndex)
            if (nextClose === -1) break

            if (nextOpen !== -1 && nextOpen < nextClose) {
                const charAfter = source[nextOpen + tagName.length + 1]
                if (charAfter === ' ' || charAfter === '>' || charAfter === '/') {
                    level++
                    searchIndex = nextOpen + tagName.length + 1
                    continue
                }
            }

            if (level === 0) { closingStart = nextClose; break }
            level--
            searchIndex = nextClose + closingTag.length
        }

        if (closingStart === -1) return null

        const fullTag = source.slice(tagStart, closingStart + closingTag.length)
        const content = source.slice(openingTagEnd + 1, closingStart)
        const match = build(fullTag, content, tagStart, closingTag)
        match.payload = { tagName, selfClose: false }
        return match
    }
    return null
}

// ── HTML Config ───────────────────────────────────────────────────────────────

class TextNode extends AreNode {}

class InterpolationNode extends AreNode {}

const HTML_CONFIG: AreSyntaxInitOptions = {
    trimWhitespace: true,
    strictMode: true,
    rules: [
        // HTML comments <!-- ... --> — priority 10, not nested
        {
            opening: '<!--',
            closing: '-->',
            component: AreNode,
            priority: 10,
            nested: false,
            extract: (raw) => ({ content: raw.slice(4, -3).trim() }),
        },
        // interpolations {{ expr }} — priority 9, not nested
        {
            opening: '{{',
            closing: '}}',
            component: InterpolationNode,
            priority: 9,
            nested: false,
            extract: (_, match) => ({ key: match.content }),
        },
        // HTML elements — custom matcher handles tag-aware open/close detection
        {
            matcher: htmlElementMatcher,
            component: AreNode,
            priority: 4,
        },
        // plain text fallback
        {
            component: TextNode,
            priority: 0,
        },
    ],
}

describe('AreTokenizer Tests', () => {
    it('Should tokenize AreNode Correctly', async () => {
        const node = new AreNode({
            /** Full matched string including delimiters */
            raw: `<custom></custom>`,
            /** Content between delimiters */
            content: '<div> <span>  Hello </span> Test</div>',
            /** The opening delimiter that matched */
            opening: '<',
            /** The closing delimiter that matched */
            closing: '>',
            /** Start position in source string */
            position: 0,
            /** Data extracted via rule.extract */
            payload: {
                entity: 'custom'
            }
        });

        const testCope = new A_Scope({
            name: 'test',
            entities: [node],
            components: [AreTokenizer],
            fragments: [new AreSyntax(HTML_CONFIG), new AreContext('<root><custom> </custom></root>')],
        });

        node.tokenize();

        expect(node.children.length).toBe(1);
        const divNode = node.children[0];
        expect(divNode.content).toBe('<span>  Hello </span> Test');

        divNode.tokenize();

        expect(divNode.children.length).toBe(2);
        const spanNode = divNode.children[0];
        expect(spanNode.content).toBe('Hello');
        const textNode = divNode.children[1];
        expect(textNode.content).toBe('Test');
    });
    it('Should return no children on empty content', async () => {
        const node = new AreNode({
            /** Full matched string including delimiters */
            raw: `<custom></custom>`,
            /** Content between delimiters */
            content: '',
            /** The opening delimiter that matched */
            opening: '<',
            /** The closing delimiter that matched */
            closing: '>',
            /** Start position in source string */
            position: 0,
            /** Data extracted via rule.extract */
            payload: {
                entity: 'custom'
            }
        });

        const testCope = new A_Scope({
            name: 'test',
            entities: [node],
            components: [AreTokenizer],
            fragments: [new AreSyntax(HTML_CONFIG), new AreContext('<root><custom> </custom></root>')],
        });

        node.tokenize();

        expect(node.children.length).toBe(0);
    });
    it('Should return no children on empty content', async () => {
        const node = new AreNode({
            /** Full matched string including delimiters */
            raw: `<custom></custom>`,
            /** Content between delimiters */
            content: '',
            /** The opening delimiter that matched */
            opening: '<',
            /** The closing delimiter that matched */
            closing: '>',
            /** Start position in source string */
            position: 0,
            /** Data extracted via rule.extract */
            payload: {
                entity: 'custom'
            }
        });

        const testCope = new A_Scope({
            name: 'test',
            entities: [node],
            components: [AreTokenizer],
            fragments: [new AreSyntax(HTML_CONFIG), new AreContext('<root><custom> </custom></root>')],
        });

        node.tokenize();

        expect(node.children.length).toBe(0);
    });

    it('Should return nested nodes based on content', async () => {
        const node = new AreNode({
            /** Full matched string including delimiters */
            raw: `<custom></custom>`,
            /** Content between delimiters */
            content: 'Do:  {{btn2}}  </span> Make </span> <div> <span>  Hello </span> Test</div>',
            /** The opening delimiter that matched */
            opening: '<',
            /** The closing delimiter that matched */
            closing: '>',
            /** Start position in source string */
            position: 0,
            /** Data extracted via rule.extract */
            payload: {
                entity: 'custom'
            }
        });

        const testCope = new A_Scope({
            name: 'test',
            entities: [node],
            components: [AreTokenizer],
            fragments: [new AreSyntax(HTML_CONFIG), new AreContext('<root><custom> </custom></root>')],
        });

        node.tokenize();


        expect(node.children.length).toBe(4);
        expect(node.children[0]).toBeInstanceOf(TextNode);
        expect(node.children[1]).toBeInstanceOf(InterpolationNode);

    });
});