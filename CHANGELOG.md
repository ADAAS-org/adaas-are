# Changelog

All notable changes to `@adaas/are` will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- `@A_Frame.Component` decorator to `AreTokenizer` and `AreSignals`
- `@A_Frame.Entity` decorator to `AreInstruction`, `AreSignal`, `AreMutation`, and `AreDeclaration`
- Full barrel exports in `src/index.ts`
- HTML engine re-exported from package root
- `external` field in `tsup.config.ts` to exclude `@adaas/*` peer dependencies from bundles

### Changed
- All `../../` relative imports in `src/lib/` replaced with `@adaas/are/*` tsconfig path aliases
- tsconfig path aliases in `.conf/tsconfig.base.json`, `.conf/tsconfig.browser.json`, and `.conf/tsconfig.node.json` updated to match actual library structure
- Fixed `outDir` paths in browser and node tsconfig files
- Release script now runs `npm test` before building, uses `npm version` lifecycle hooks properly, and publishes in `postversion`
- Removed `@A_Frame.Method` decorators from `AreTokenizer` methods (class-level decorators only)

---

## [0.0.2] - 2024-06-01

### Added
- Initial release of the A-Concept Rendering Engine
- Full rendering pipeline: `AreLoader` → `AreTokenizer` → `AreCompiler` → `AreTransformer` → `AreInterpreter`
- Signal sub-system: `AreSignals`, `AreInit`, `AreRoute`
- `AreScene` and `AreStore` for reactive state management
- `AreInstruction`, `AreDeclaration`, `AreMutation` for deterministic DOM updates
- `AreLifecycle` and `AreWatcher` for component lifecycle management
- HTML engine (`engines/html`) with DOM interpreter and HTML-specific tokenizer/compiler
- `AreSyntax` for defining custom template syntax rules
- `AreNode` and `AreAttribute` as the base AST entities
- `tsup` dual build (browser ESM + node CJS/ESM)
