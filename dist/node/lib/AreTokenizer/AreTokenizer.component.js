'use strict';

var aConcept = require('@adaas/a-concept');
var aFrame = require('@adaas/a-frame');
var AreNode_entity = require('@adaas/are/node/AreNode.entity');
var AreSyntax_context = require('@adaas/are/syntax/AreSyntax.context');
var Are_context = require('@adaas/are/component/Are.context');
var AreEngine_constants = require('@adaas/are/engine/AreEngine.constants');
var AreTokenizer_error = require('./AreTokenizer.error');
var AreNode_constants = require('@adaas/are/node/AreNode.constants');
var aLogger = require('@adaas/a-utils/a-logger');

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);
exports.AreTokenizer = class AreTokenizer extends aConcept.A_Component {
  /**
   * Get the AreSyntax from the current scope. The AreSyntax defines the syntax rules and structures for tokenizing templates. It provides mechanisms for parsing and interpreting templates, attributes, directives, interpolations, and event listeners, enabling dynamic and interactive UI rendering within the ARE framework. If no AreSyntax is found in the scope, an error is thrown indicating that AreTokenizer requires an AreSyntax to function properly.
   */
  get config() {
    const syntax = aConcept.A_Context.scope(this).resolve(AreSyntax_context.AreSyntax);
    if (!syntax) throw new AreTokenizer_error.AreTokenizerError({
      title: "Syntax Context Not Found",
      description: "AreTokenizer requires an AreSyntax to be present in the same scope. Ensure that an AreSyntax fragment is included in the concept and is accessible from the scope where AreTokenizer is used."
    });
    return syntax;
  }
  instantiate(context) {
    context.startPerformance("Tokenizer Instantiate");
    const source = context.source;
    const nodes = this.scan(source, 0, source.length, context).map((match) => {
      const rule = this.findRuleForMatch(match);
      if (!rule) throw new Error(`No rule found for match at position ${match.position}`);
      return new rule.component(match);
    });
    for (const node of nodes) {
      context.addRoot(node);
    }
    context.endPerformance("Tokenizer Instantiate");
  }
  tokenize(node, context, logger) {
    context.startPerformance(`Tokenize method`);
    const source = node.content;
    const content = this.scan(source, 0, source.length, context).map((match) => {
      const rule = this.findRuleForMatch(match);
      if (!rule) throw new Error(`No rule found for match at position ${match.position}`);
      return new rule.component(match);
    });
    logger?.debug("red", `Tokenized node <${node.aseid.toString()}> with content:`, content.length);
    context.endPerformance(`Tokenize method`);
    context.startPerformance(`Tokenize node Create Children`);
    for (const child of content) {
      node.addChild(child);
      context.startPerformance("AreTokenizer.tokenize child init");
      child.init();
      context.endPerformance("AreTokenizer.tokenize child init");
    }
    context.endPerformance(`Tokenize node Create Children`);
  }
  scan(source, from, to, context) {
    context.startPerformance("Tokenizer Scan");
    const tokens = [];
    let index = from;
    let hasMatchBefore = false;
    while (index < to) {
      const match = this.findNextMatch(source, index, to);
      if (!match) {
        const rest = source.slice(index, to);
        const t = this.tryPlainText(rest, index);
        if (t && !(this.config.trimWhitespace && !rest.trim())) tokens.push(t);
        break;
      }
      if (match.position > index) {
        const plain = source.slice(index, match.position);
        const t = this.tryPlainText(plain, index);
        if (t) {
          if (this.config.trimWhitespace && !plain.trim()) {
            if (hasMatchBefore) {
              t.content = " ";
              tokens.push(t);
            }
          } else {
            tokens.push(t);
          }
        }
      }
      tokens.push(match);
      hasMatchBefore = true;
      index = match.position + match.raw.length;
    }
    context.endPerformance("Tokenizer Scan");
    return tokens;
  }
  findNextMatch(source, from, to) {
    let earliest = null;
    for (const rule of this.config.rules) {
      if (!rule.opening && !rule.closing && !rule.pattern && !rule.matcher) continue;
      const match = this.matchRule(source, rule, from, to);
      if (!match) continue;
      if (!earliest || match.position < earliest.position) earliest = match;
    }
    return earliest;
  }
  matchRule(source, rule, from, to) {
    if (rule.matcher) {
      return rule.matcher(
        source,
        from,
        to,
        (raw, content, position, closing) => this.buildMatch(rule, raw, content, position, closing)
      );
    }
    if (rule.pattern) {
      const slice = source.slice(from, to);
      rule.pattern.lastIndex = 0;
      const m = rule.pattern.exec(slice);
      if (!m) return null;
      return this.buildMatch(rule, m[0], m[0], from + m.index, "");
    }
    if (!rule.opening || !rule.closing) return null;
    if (rule.prefix) return this.matchPrefixedRule(source, rule, from, to);
    return this.matchStandardRule(source, rule, from, to);
  }
  matchStandardRule(source, rule, from, to) {
    const opening = rule.opening;
    const closing = rule.closing;
    const openPos = source.indexOf(opening, from);
    if (openPos === -1 || openPos >= to) return null;
    const contentStart = openPos + opening.length;
    if (rule.selfClosing) {
      const selfClosePos = source.indexOf(rule.selfClosing, contentStart);
      const normalClosePos = source.indexOf(closing, contentStart);
      if (selfClosePos !== -1 && (normalClosePos === -1 || selfClosePos < normalClosePos)) {
        const closeEnd = selfClosePos + rule.selfClosing.length;
        return this.buildMatch(rule, source.slice(openPos, closeEnd), source.slice(contentStart, selfClosePos), openPos, rule.selfClosing);
      }
    }
    const closePos = rule.nested !== false ? this.findMatchingClose(source, opening, closing, contentStart, to) : source.indexOf(closing, contentStart);
    if (closePos === -1) {
      if (this.config.strictMode) throw new Error(`Unclosed token '${opening}' at position ${openPos}`);
      return null;
    }
    return this.buildMatch(rule, source.slice(openPos, closePos + closing.length), source.slice(contentStart, closePos), openPos, closing);
  }
  matchPrefixedRule(source, rule, from, to) {
    const opening = rule.opening;
    const closing = rule.closing;
    let searchFrom = from;
    while (searchFrom < to) {
      const openPos = source.indexOf(opening, searchFrom);
      if (openPos === -1 || openPos >= to) return null;
      const before = source.slice(from, openPos);
      const prefixRe = new RegExp(rule.prefix.source + "$");
      const prefixM = prefixRe.exec(before);
      if (prefixM) {
        const actualStart = openPos - prefixM[0].length;
        const contentStart = openPos + opening.length;
        const closePos = rule.nested !== false ? this.findMatchingClose(source, opening, closing, contentStart, to) : source.indexOf(closing, contentStart);
        if (closePos === -1) {
          if (this.config.strictMode) throw new Error(`Unclosed token '${opening}' at position ${openPos}`);
          return null;
        }
        return this.buildMatch(rule, source.slice(actualStart, closePos + closing.length), source.slice(contentStart, closePos), actualStart, closing);
      }
      searchFrom = openPos + 1;
    }
    return null;
  }
  findMatchingClose(source, opening, closing, from, to) {
    let level = 1;
    let index = from;
    while (index < to) {
      const nextOpen = source.indexOf(opening, index);
      const nextClose = source.indexOf(closing, index);
      if (nextClose === -1) return -1;
      if (nextOpen !== -1 && nextOpen < nextClose) {
        level++;
        index = nextOpen + opening.length;
        continue;
      }
      level--;
      if (level === 0) return nextClose;
      index = nextClose + closing.length;
    }
    return -1;
  }
  buildMatch(rule, raw, content, position, closingUsed) {
    const trimmed = this.config.trimWhitespace ? content.trim() : content;
    const match = { raw, content: trimmed, opening: rule.opening ?? "", closing: closingUsed, position, payload: {}, _rule: rule };
    if (rule.extract) match.payload = rule.extract(raw, match);
    return match;
  }
  tryPlainText(raw, position) {
    if (!raw) return null;
    const rule = this.config.rules.find((r) => !r.opening && !r.closing && !r.pattern && !r.matcher);
    if (!rule) return null;
    const match = this.buildMatch(rule, raw, raw, position, "");
    match._rule = rule;
    return match;
  }
  findRuleForMatch(match) {
    if (match._rule) return match._rule;
    return this.config.rules.find((r) => (r.opening ?? "") === match.opening && (r.closing ?? "") === match.closing);
  }
};
__decorateClass([
  aConcept.A_Feature.Extend({
    name: AreEngine_constants.AreEngineFeatures.Load
    // scope: [AreEngine]
  }),
  __decorateParam(0, aConcept.A_Inject(Are_context.AreContext))
], exports.AreTokenizer.prototype, "instantiate", 1);
__decorateClass([
  aConcept.A_Feature.Extend({
    name: AreNode_constants.AreNodeFeatures.onTokenize,
    scope: [AreNode_entity.AreNode]
  }),
  __decorateParam(0, aConcept.A_Inject(aConcept.A_Caller)),
  __decorateParam(1, aConcept.A_Inject(Are_context.AreContext)),
  __decorateParam(2, aConcept.A_Inject(aLogger.A_Logger))
], exports.AreTokenizer.prototype, "tokenize", 1);
exports.AreTokenizer = __decorateClass([
  aFrame.A_Frame.Component({
    namespace: "A-ARE",
    name: "AreTokenizer",
    description: "AreTokenizer is responsible for scanning and tokenizing template source strings using the syntax rules defined in AreSyntax. It converts raw template strings into AreNode instances that represent the structured AST of the template, enabling downstream compilation and rendering within the ARE framework."
  })
], exports.AreTokenizer);
//# sourceMappingURL=AreTokenizer.component.js.map
//# sourceMappingURL=AreTokenizer.component.js.map