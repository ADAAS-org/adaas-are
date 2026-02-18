import { __decorateClass } from '../../chunk-EQQGB2QZ.mjs';
import { A_Component, A_Context, A_Error } from '@adaas/a-concept';
import { A_Frame } from '@adaas/a-frame';
import { AreSyntaxContext } from './AreSyntax.context';
import { AreNode } from '@adaas/are/node';

let AreSyntax = class extends A_Component {
  get config() {
    return A_Context.scope(this).resolveFlat(AreSyntaxContext);
  }
  isRootNode(node) {
    return node.aseid.entity.toLowerCase() === this.config.rootTag;
  }
  isCustomNode(node) {
    return !this.config.standardTags.has(node.aseid.entity.toLowerCase());
  }
  extractRoots(template) {
    const rootTag = this.config.rootTag;
    const rootTagRegex = new RegExp(`<${rootTag}([\\s>])`, "gi");
    let match;
    const nodes = [];
    while ((match = rootTagRegex.exec(template)) !== null) {
      const startIndex = match.index;
      const endTag = `</${rootTag}>`;
      const endIndex = template.indexOf(endTag, startIndex);
      if (endIndex === -1) {
        throw new A_Error(`Missing closing tag for <${rootTag}> starting at index ${startIndex}`);
      }
      const attributes = this.extractAttributes(template.slice(startIndex, endIndex + endTag.length));
      let rootId = `auto-root-${startIndex}`;
      for (let i = 0; i < attributes.length; i++) {
        if (attributes[i].name === "id") {
          rootId = attributes[i].value;
          break;
        }
      }
      const markup = template.slice(startIndex, endIndex + endTag.length);
      const content = markup.slice(rootTag.length + 2, -endTag.length).trim();
      const node = new AreNode({
        id: rootId,
        scope: "are",
        component: "are-root",
        markup,
        template: content
      });
      nodes.push(node);
    }
    return nodes;
  }
  extractInterpolations(template) {
    const interpolationRegex = new RegExp(`${this.config.interpolationDelimiters[0]}\\s*([a-zA-Z0-9_.$]+)\\s*${this.config.interpolationDelimiters[1]}`, "g");
    const interpolations = [];
    let match;
    while ((match = interpolationRegex.exec(template)) !== null) {
      interpolations.push({
        raw: match[0],
        name: match[1],
        position: match.index
      });
    }
    return interpolations;
  }
  extractDirectives(template) {
    const trimmedTemplate = template.trim();
    const firstTagMatch = trimmedTemplate.match(
      /^<([a-zA-Z][^\s/>]*)(\s[^>]*?)?>/
    );
    if (!firstTagMatch) return [];
    const tag = firstTagMatch[1];
    const attributesPart = firstTagMatch[2];
    if (!attributesPart) return [];
    const directiveRegex = new RegExp(
      `\\s+(\\${this.config.directiveDelimiter}[a-zA-Z0-9_-]+)(?:\\s*=\\s*(?:"([^"]*)"|'([^']*)'))?`,
      "g"
    );
    let match;
    const directives = [];
    while ((match = directiveRegex.exec(attributesPart)) !== null) {
      const name = match[1];
      if (this.config.customDirectives && this.config.customDirectives.length > 0 && !this.config.customDirectives.includes(name)) {
        continue;
      }
      const raw = match[0];
      const value = match[2] ?? match[3];
      const tagTemplate = firstTagMatch[0];
      directives.push({
        tag,
        name,
        raw,
        value,
        template: tagTemplate
      });
    }
    return directives;
  }
  /**
   * Extracts component props from the FIRST opening tag.
   *
   * Examples:
   *   label="Click"
   *   :label="'Click Me'"
   *
   * Excludes:
   *   @click
   *   $if
   */
  extractAttributes(template) {
    const firstTagMatch = template.match(
      /^<([a-zA-Z][^\s/>]*)(\s[^>]*?)?>/
    );
    if (!firstTagMatch) return [];
    const tag = firstTagMatch[1];
    const attributesPart = firstTagMatch[2];
    if (!attributesPart) return [];
    const propRegex = new RegExp(
      `\\s+(\\${this.config.bindingDelimiter}?)([a-zA-Z][a-zA-Z0-9._-]*)\\s*=\\s*(?:"([^"]*)"|'([^']*)')`,
      "g"
    );
    let match;
    const attributes = [];
    while ((match = propRegex.exec(attributesPart)) !== null) {
      const isBinding = match[1] === this.config.bindingDelimiter;
      const name = match[2];
      if (name.startsWith(this.config.listenerDelimiter) || name.startsWith(this.config.directiveDelimiter)) {
        continue;
      }
      const raw = match[0];
      const value = match[3] ?? match[4];
      attributes.push({
        tag,
        name,
        raw,
        value: value || "",
        binding: isBinding
      });
    }
    return attributes;
  }
  /**
   * Extracts event listeners from the FIRST/TOP-LEVEL opening tag ONLY in the template.
   * Supports:
   *  - @event="handler"
   *  - @event='handler'
   * 
   * Note: This method intentionally ignores nested elements and only processes
   * the very first opening tag in the provided template string.
   */
  extractListeners(template) {
    const trimmedTemplate = template.trim();
    const firstTagMatch = trimmedTemplate.match(
      /^<([a-zA-Z][^\s/>]*)(\s[^>]*?)?>/
    );
    if (!firstTagMatch) return [];
    const tag = firstTagMatch[1];
    const attributesPart = firstTagMatch[2];
    if (!attributesPart) return [];
    const listenerRegex = new RegExp(
      `\\s+${this.config.listenerDelimiter}([a-zA-Z0-9_:-]+)\\s*=\\s*(?:"([^"]*)"|'([^']*)')`,
      "g"
    );
    let match;
    const listeners = [];
    while ((match = listenerRegex.exec(attributesPart)) !== null) {
      const raw = match[0];
      const name = match[1];
      const handler = match[2] ?? match[3] ?? "";
      listeners.push({
        tag,
        name,
        raw,
        handler
      });
    }
    return listeners;
  }
  isBindingProp(prop) {
    return prop.raw.trim().startsWith(this.config.bindingDelimiter);
  }
  extractPropValue(prop, parentStore) {
    if (prop.value == null) {
      return void 0;
    }
    if (prop.binding) {
      const value = prop.value.trim();
      if (value.startsWith("'") && value.endsWith("'") || value.startsWith('"') && value.endsWith('"')) {
        return value.slice(1, -1);
      }
      return parentStore?.get(value);
    }
    return prop.value;
  }
  replaceInterpolation(template, interpolation, value) {
    const key = typeof interpolation === "string" ? interpolation : interpolation.name;
    return template.replace(new RegExp(`${this.config.interpolationDelimiters[0]}\\s*${key}\\s*${this.config.interpolationDelimiters[1]}`, "g"), value !== void 0 ? String(value) : "");
  }
};
__decorateClass([
  A_Frame.Method({
    description: "Determines if a given AreNode is a root node based on its entity type."
  })
], AreSyntax.prototype, "isRootNode", 1);
__decorateClass([
  A_Frame.Method({
    description: "Determines if a given AreNode represents a custom component as opposed to a standard HTML tag."
  })
], AreSyntax.prototype, "isCustomNode", 1);
__decorateClass([
  A_Frame.Method({
    description: "Extracts root AreNode elements from the document based on the configured root tag."
  })
], AreSyntax.prototype, "extractRoots", 1);
__decorateClass([
  A_Frame.Method({
    description: "Extracts interpolations from a template string based on the configured interpolation delimiters."
  })
], AreSyntax.prototype, "extractInterpolations", 1);
__decorateClass([
  A_Frame.Method({
    description: "Extracts custom directives from the first opening tag of a template string."
  })
], AreSyntax.prototype, "extractDirectives", 1);
AreSyntax = __decorateClass([
  A_Frame.Component({
    namespace: "A-ARE",
    name: "AreSyntax",
    description: "Context component that defines the syntax rules and structures for the A-Concept Rendering Engine (ARE). It provides mechanisms for parsing and interpreting templates, attributes, directives, interpolations, and event listeners, enabling dynamic and interactive UI rendering within the ARE framework."
  })
], AreSyntax);

export { AreSyntax };
//# sourceMappingURL=AreSyntax.component.mjs.map
//# sourceMappingURL=AreSyntax.component.mjs.map