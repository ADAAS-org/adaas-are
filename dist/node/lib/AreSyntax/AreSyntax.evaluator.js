'use strict';

class Unsupported extends Error {
}
const UNSAFE_MEMBERS = /* @__PURE__ */ new Set([
  "__proto__",
  "constructor",
  "prototype",
  "__defineGetter__",
  "__defineSetter__",
  "__lookupGetter__",
  "__lookupSetter__"
]);
const LITERAL_KEYWORDS = {
  true: true,
  false: false,
  null: null,
  undefined: void 0
};
const UNSUPPORTED_KEYWORDS = /* @__PURE__ */ new Set([
  "this",
  "new",
  "function",
  "class",
  "in",
  "instanceof",
  "void",
  "delete",
  "yield",
  "await",
  "async",
  "let",
  "var",
  "const",
  "return",
  "if",
  "else",
  "for",
  "while",
  "do",
  "switch",
  "case",
  "break",
  "continue",
  "throw",
  "try",
  "catch",
  "finally",
  "import",
  "export",
  "super",
  "with",
  "debugger"
]);
const OPERATORS = [
  "===",
  "!==",
  "...",
  "?.",
  "??",
  "==",
  "!=",
  "<=",
  ">=",
  "&&",
  "||",
  "=>",
  "(",
  ")",
  "[",
  "]",
  "{",
  "}",
  ",",
  ".",
  "?",
  ":",
  "+",
  "-",
  "*",
  "/",
  "%",
  "<",
  ">",
  "!"
];
const BINARY_PRECEDENCE = {
  "??": 1,
  "||": 1,
  "&&": 2,
  "==": 3,
  "!=": 3,
  "===": 3,
  "!==": 3,
  "<": 4,
  ">": 4,
  "<=": 4,
  ">=": 4,
  "+": 5,
  "-": 5,
  "*": 6,
  "/": 6,
  "%": 6
};
const IDENT_START = /[\p{L}_$]/u;
const IDENT_PART = /[\p{L}\p{N}_$\u200C\u200D]/u;
function isDigit(ch) {
  return ch !== void 0 && ch >= "0" && ch <= "9";
}
function readEscape(src, i) {
  const ch = src[i];
  switch (ch) {
    case "n":
      return ["\n", i + 1];
    case "t":
      return ["	", i + 1];
    case "r":
      return ["\r", i + 1];
    case "b":
      return ["\b", i + 1];
    case "f":
      return ["\f", i + 1];
    case "v":
      return ["\v", i + 1];
    case "0":
      return ["\0", i + 1];
    case "u": {
      if (src[i + 1] === "{") {
        const end = src.indexOf("}", i + 2);
        if (end < 0) throw new Unsupported("bad unicode escape");
        return [String.fromCodePoint(parseInt(src.slice(i + 2, end), 16)), end + 1];
      }
      const hex = src.slice(i + 1, i + 5);
      if (!/^[0-9a-fA-F]{4}$/.test(hex)) throw new Unsupported("bad unicode escape");
      return [String.fromCharCode(parseInt(hex, 16)), i + 5];
    }
    case "x": {
      const hex = src.slice(i + 1, i + 3);
      if (!/^[0-9a-fA-F]{2}$/.test(hex)) throw new Unsupported("bad hex escape");
      return [String.fromCharCode(parseInt(hex, 16)), i + 3];
    }
    case void 0:
      throw new Unsupported("unterminated escape");
    default:
      return [ch, i + 1];
  }
}
function tokenize(src) {
  const tokens = [];
  const n = src.length;
  let i = 0;
  while (i < n) {
    const ch = src[i];
    if (/\s/.test(ch)) {
      i++;
      continue;
    }
    if (isDigit(ch) || ch === "." && isDigit(src[i + 1])) {
      const m = /^(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/.exec(src.slice(i));
      tokens.push({ type: "num", value: Number(m[0]) });
      i += m[0].length;
      continue;
    }
    if (IDENT_START.test(ch)) {
      let j = i + 1;
      while (j < n && IDENT_PART.test(src[j])) j++;
      tokens.push({ type: "id", value: src.slice(i, j) });
      i = j;
      continue;
    }
    if (ch === "'" || ch === '"') {
      let j = i + 1;
      let out = "";
      while (j < n && src[j] !== ch) {
        if (src[j] === "\\") {
          const [c, next] = readEscape(src, j + 1);
          out += c;
          j = next;
        } else if (src[j] === "\n") {
          throw new Unsupported("unterminated string");
        } else {
          out += src[j++];
        }
      }
      if (j >= n) throw new Unsupported("unterminated string");
      tokens.push({ type: "str", value: out });
      i = j + 1;
      continue;
    }
    if (ch === "`") {
      const quasis = [];
      const exprs = [];
      let j = i + 1;
      let cur = "";
      while (true) {
        if (j >= n) throw new Unsupported("unterminated template");
        const c = src[j];
        if (c === "`") {
          j++;
          break;
        }
        if (c === "\\") {
          const [e, next] = readEscape(src, j + 1);
          cur += e;
          j = next;
          continue;
        }
        if (c === "$" && src[j + 1] === "{") {
          quasis.push(cur);
          cur = "";
          const start = j + 2;
          j = skipBalanced(src, start);
          exprs.push(src.slice(start, j));
          j++;
          continue;
        }
        cur += c;
        j++;
      }
      quasis.push(cur);
      tokens.push({ type: "tpl", value: { quasis, exprs } });
      i = j;
      continue;
    }
    let matched;
    for (const op of OPERATORS) {
      if (src.startsWith(op, i)) {
        matched = op;
        break;
      }
    }
    if (matched === "?." && isDigit(src[i + 2])) matched = "?";
    if (!matched) throw new Unsupported(`unsupported character "${ch}"`);
    tokens.push({ type: "op", value: matched });
    i += matched.length;
  }
  tokens.push({ type: "eof", value: "" });
  return tokens;
}
function skipBalanced(src, start) {
  let depth = 0;
  let j = start;
  while (j < src.length) {
    const c = src[j];
    if (c === "'" || c === '"' || c === "`") {
      const quote = c;
      j++;
      while (j < src.length && src[j] !== quote) {
        if (src[j] === "\\") j++;
        j++;
      }
      j++;
      continue;
    }
    if (c === "{") depth++;
    else if (c === "}") {
      if (depth === 0) return j;
      depth--;
    }
    j++;
  }
  throw new Unsupported("unterminated template expression");
}
class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.pos = 0;
  }
  parseProgram() {
    const expr = this.parseExpression();
    if (this.peek().type !== "eof") throw new Unsupported("unexpected token");
    return expr;
  }
  peek(offset = 0) {
    return this.tokens[Math.min(this.pos + offset, this.tokens.length - 1)];
  }
  next() {
    return this.tokens[this.pos++];
  }
  isOp(value, offset = 0) {
    const t = this.peek(offset);
    return t.type === "op" && t.value === value;
  }
  expectOp(value) {
    if (!this.isOp(value)) throw new Unsupported(`expected "${value}"`);
    this.pos++;
  }
  parseExpression() {
    if (this.isArrowStart()) return this.parseArrow();
    const test = this.parseBinary(1);
    if (this.isOp("?")) {
      this.next();
      const yes = this.parseExpression();
      this.expectOp(":");
      const no = this.parseExpression();
      return { t: "cond", test, yes, no };
    }
    return test;
  }
  isArrowStart() {
    const t = this.peek();
    if (t.type === "id" && this.isOp("=>", 1)) return true;
    if (!this.isOp("(")) return false;
    let k = 1;
    if (this.isOp(")", k)) return this.isOp("=>", k + 1);
    while (true) {
      if (this.peek(k).type !== "id") return false;
      k++;
      if (this.isOp(")", k)) return this.isOp("=>", k + 1);
      if (!this.isOp(",", k)) return false;
      k++;
    }
  }
  parseArrow() {
    const params = [];
    if (this.peek().type === "id") {
      params.push(this.checkBindingName(this.next().value));
    } else {
      this.expectOp("(");
      while (!this.isOp(")")) {
        params.push(this.checkBindingName(this.next().value));
        if (this.isOp(",")) this.next();
      }
      this.expectOp(")");
    }
    this.expectOp("=>");
    if (this.isOp("{")) throw new Unsupported("arrow block body");
    return { t: "arrow", params, body: this.parseExpression() };
  }
  checkBindingName(name) {
    if (name in LITERAL_KEYWORDS || UNSUPPORTED_KEYWORDS.has(name) || name === "typeof")
      throw new Unsupported("invalid parameter name");
    return name;
  }
  parseBinary(minPrec) {
    let left = this.parseUnary();
    while (true) {
      const t = this.peek();
      if (t.type !== "op") break;
      const prec = BINARY_PRECEDENCE[t.value];
      if (prec === void 0 || prec < minPrec) break;
      this.next();
      const right = this.parseBinary(prec + 1);
      left = { t: "bin", op: t.value, l: left, r: right };
    }
    return left;
  }
  parseUnary() {
    const t = this.peek();
    if (t.type === "op" && (t.value === "!" || t.value === "-" || t.value === "+")) {
      this.next();
      return { t: "un", op: t.value, a: this.parseUnary() };
    }
    if (t.type === "id" && t.value === "typeof") {
      this.next();
      return { t: "un", op: "typeof", a: this.parseUnary() };
    }
    return this.parsePostfix();
  }
  parsePostfix() {
    let expr = this.parsePrimary();
    while (true) {
      if (this.isOp(".")) {
        this.next();
        expr = { t: "mem", o: expr, p: { t: "lit", v: this.expectName() }, computed: false, opt: false };
      } else if (this.isOp("?.")) {
        this.next();
        if (this.isOp("(")) {
          this.next();
          expr = { t: "call", c: expr, a: this.parseArguments(), opt: true };
        } else if (this.isOp("[")) {
          this.next();
          const p = this.parseExpression();
          this.expectOp("]");
          expr = { t: "mem", o: expr, p, computed: true, opt: true };
        } else {
          expr = { t: "mem", o: expr, p: { t: "lit", v: this.expectName() }, computed: false, opt: true };
        }
      } else if (this.isOp("[")) {
        this.next();
        const p = this.parseExpression();
        this.expectOp("]");
        expr = { t: "mem", o: expr, p, computed: true, opt: false };
      } else if (this.isOp("(")) {
        this.next();
        expr = { t: "call", c: expr, a: this.parseArguments(), opt: false };
      } else {
        break;
      }
    }
    return expr;
  }
  expectName() {
    const t = this.next();
    if (t.type !== "id") throw new Unsupported("expected property name");
    return t.value;
  }
  parseArguments() {
    const args = [];
    while (!this.isOp(")")) {
      if (this.isOp("...")) throw new Unsupported("spread");
      args.push(this.parseExpression());
      if (this.isOp(",")) this.next();
      else break;
    }
    this.expectOp(")");
    return args;
  }
  parsePrimary() {
    const t = this.next();
    switch (t.type) {
      case "num":
      case "str":
        return { t: "lit", v: t.value };
      case "tpl":
        return {
          t: "tpl",
          quasis: t.value.quasis,
          exprs: t.value.exprs.map((src) => new Parser(tokenize(src)).parseProgram())
        };
      case "id": {
        if (t.value in LITERAL_KEYWORDS) return { t: "lit", v: LITERAL_KEYWORDS[t.value] };
        if (UNSUPPORTED_KEYWORDS.has(t.value)) throw new Unsupported(`keyword "${t.value}"`);
        return { t: "id", n: t.value };
      }
      case "op": {
        if (t.value === "(") {
          const expr = this.parseExpression();
          this.expectOp(")");
          return expr;
        }
        if (t.value === "[") {
          const items = [];
          while (!this.isOp("]")) {
            if (this.isOp(",") || this.isOp("...")) throw new Unsupported("array hole / spread");
            items.push(this.parseExpression());
            if (this.isOp(",")) this.next();
            else break;
          }
          this.expectOp("]");
          return { t: "arr", items };
        }
        if (t.value === "{") {
          const props = [];
          while (!this.isOp("}")) {
            const k = this.next();
            let key;
            if (k.type === "id" || k.type === "str") key = k.value;
            else if (k.type === "num") key = String(k.value);
            else throw new Unsupported("computed / spread object key");
            if (UNSAFE_MEMBERS.has(key)) throw new Unsupported("unsafe object key");
            if (k.type === "id" && (this.isOp(",") || this.isOp("}"))) {
              props.push([key, { t: "id", n: key }]);
            } else {
              this.expectOp(":");
              props.push([key, this.parseExpression()]);
            }
            if (this.isOp(",")) this.next();
            else break;
          }
          this.expectOp("}");
          return { t: "obj", props };
        }
        throw new Unsupported(`unexpected "${t.value}"`);
      }
      default:
        throw new Unsupported("unexpected end of expression");
    }
  }
}
function parseAreExpression(src) {
  try {
    return new Parser(tokenize(src)).parseProgram();
  } catch (e) {
    if (e instanceof Unsupported) return null;
    throw e;
  }
}
const SHORT = /* @__PURE__ */ Symbol("short-circuit");
function assertMember(key) {
  if (typeof key === "string" && UNSAFE_MEMBERS.has(key)) {
    throw new Error(`Access to "${key}" is not allowed in expressions`);
  }
}
function lookupLocal(frame, name) {
  for (let f = frame; f; f = f.parent) {
    if (name in f.vars) return { found: true, value: f.vars[name] };
  }
  return { found: false };
}
function isStoreRoot(name, frame, ctx) {
  if (lookupLocal(frame, name).found) return false;
  return !(ctx.scope && name in ctx.scope);
}
function staticPath(node) {
  if (node.t === "id") return [node.n];
  if (node.t === "mem" && !node.opt && node.p.t === "lit" && (typeof node.p.v === "string" || typeof node.p.v === "number")) {
    const base = staticPath(node.o);
    return base ? [...base, String(node.p.v)] : null;
  }
  return null;
}
function describeCallee(node) {
  const path = staticPath(node);
  return path ? path.join(".") : "expression";
}
function evalIdentifier(name, frame, ctx) {
  assertMember(name);
  const local = lookupLocal(frame, name);
  if (local.found) return local.value;
  if (ctx.scope && name in ctx.scope) return ctx.scope[name];
  ctx.assertIdentifier(name);
  const value = ctx.storeGet(name);
  return typeof value === "function" ? value.bind(ctx.storeThis) : value;
}
function evalChain(node, frame, ctx) {
  if (node.t === "mem") return evalMember(node, frame, ctx);
  if (node.t === "call") return evalCall(node, frame, ctx);
  return evalNode(node, frame, ctx);
}
function evalMember(node, frame, ctx) {
  const path = staticPath(node);
  if (path && isStoreRoot(path[0], frame, ctx)) {
    ctx.assertIdentifier(path[0]);
    for (const seg of path) assertMember(seg);
    const value = ctx.storeGet(path.join("."));
    if (value !== void 0) return value;
    let obj2 = ctx.storeGet(path[0]);
    for (let i = 1; i < path.length; i++) {
      if (obj2 === null || obj2 === void 0) return void 0;
      obj2 = obj2[path[i]];
    }
    return obj2;
  }
  const obj = evalChain(node.o, frame, ctx);
  if (obj === SHORT) return SHORT;
  const key = node.computed ? evalNode(node.p, frame, ctx) : node.p.v;
  assertMember(String(key));
  if (obj === null || obj === void 0) {
    if (node.opt) return SHORT;
    throw new TypeError(`Cannot read properties of ${obj} (reading '${String(key)}')`);
  }
  return obj[key];
}
function evalCall(node, frame, ctx) {
  let fn;
  let thisArg = void 0;
  const callee = node.c;
  if (callee.t === "mem") {
    thisArg = evalChain(callee.o, frame, ctx);
    if (thisArg === SHORT) return SHORT;
    const key = callee.computed ? evalNode(callee.p, frame, ctx) : callee.p.v;
    assertMember(String(key));
    if (thisArg === null || thisArg === void 0) {
      if (callee.opt) return SHORT;
      throw new TypeError(`Cannot read properties of ${thisArg} (reading '${String(key)}')`);
    }
    fn = thisArg[key];
  } else {
    fn = evalChain(callee, frame, ctx);
    if (fn === SHORT) return SHORT;
  }
  if ((fn === null || fn === void 0) && node.opt) return SHORT;
  if (typeof fn !== "function") {
    throw new TypeError(`${describeCallee(callee)} is not a function`);
  }
  const args = node.a.map((arg) => evalNode(arg, frame, ctx));
  return fn.apply(thisArg, args);
}
function evalNode(node, frame, ctx) {
  switch (node.t) {
    case "lit":
      return node.v;
    case "id":
      return evalIdentifier(node.n, frame, ctx);
    case "mem":
    case "call": {
      const value = evalChain(node, frame, ctx);
      return value === SHORT ? void 0 : value;
    }
    case "un": {
      const a = evalNode(node.a, frame, ctx);
      switch (node.op) {
        case "!":
          return !a;
        case "-":
          return -a;
        case "+":
          return +a;
        case "typeof":
          return typeof a;
      }
      throw new Error(`Unknown unary operator ${node.op}`);
    }
    case "bin": {
      switch (node.op) {
        case "&&":
          return evalNode(node.l, frame, ctx) && evalNode(node.r, frame, ctx);
        case "||":
          return evalNode(node.l, frame, ctx) || evalNode(node.r, frame, ctx);
        case "??":
          return evalNode(node.l, frame, ctx) ?? evalNode(node.r, frame, ctx);
      }
      const l = evalNode(node.l, frame, ctx);
      const r = evalNode(node.r, frame, ctx);
      switch (node.op) {
        case "+":
          return l + r;
        case "-":
          return l - r;
        case "*":
          return l * r;
        case "/":
          return l / r;
        case "%":
          return l % r;
        case "==":
          return l == r;
        case "!=":
          return l != r;
        case "===":
          return l === r;
        case "!==":
          return l !== r;
        case "<":
          return l < r;
        case ">":
          return l > r;
        case "<=":
          return l <= r;
        case ">=":
          return l >= r;
      }
      throw new Error(`Unknown binary operator ${node.op}`);
    }
    case "cond":
      return evalNode(node.test, frame, ctx) ? evalNode(node.yes, frame, ctx) : evalNode(node.no, frame, ctx);
    case "arr":
      return node.items.map((item) => evalNode(item, frame, ctx));
    case "obj": {
      const out = {};
      for (const [key, value] of node.props) out[key] = evalNode(value, frame, ctx);
      return out;
    }
    case "tpl": {
      let out = node.quasis[0];
      for (let i = 0; i < node.exprs.length; i++) {
        out += String(evalNode(node.exprs[i], frame, ctx)) + node.quasis[i + 1];
      }
      return out;
    }
    case "arrow": {
      const { params, body } = node;
      return (...args) => {
        const vars = /* @__PURE__ */ Object.create(null);
        for (let i = 0; i < params.length; i++) vars[params[i]] = args[i];
        return evalNode(body, { vars, parent: frame }, ctx);
      };
    }
  }
}
function evaluateAreExpression(node, ctx) {
  return evalNode(node, null, ctx);
}

exports.evaluateAreExpression = evaluateAreExpression;
exports.parseAreExpression = parseAreExpression;
//# sourceMappingURL=AreSyntax.evaluator.js.map
//# sourceMappingURL=AreSyntax.evaluator.js.map