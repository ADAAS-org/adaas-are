import { A_TYPES__Component_Constructor, A_TYPES__Fragment_Constructor } from "@adaas/a-concept"
import type { AreCompiler } from "@adaas/are/compiler/AreCompiler.component"
import type { AreContext } from "@adaas/are/component/Are.context"
import type { AreLoader } from "@adaas/are/loader/AreLoader.component"
import type { AreSyntax } from "@adaas/are/syntax/AreSyntax.context"
import type { AreTokenizer } from "@adaas/are/tokenizer/AreTokenizer.component"
import type { AreTransformer } from "@adaas/are/transformer/AreTransformer.component"
import type { AreInterpreter } from "@adaas/are/interpreter/AreInterpreter.component"
import type { AreLifecycle } from "@adaas/are/lifecycle/AreLifecycle.component"
import { AreSignals } from "@adaas/are/signals/AreSignals.component"



export type AreEngineDependencies = {
    context: AreContext,
    syntax: AreSyntax,
    loader: A_TYPES__Component_Constructor<AreLoader>,
    tokenizer: A_TYPES__Component_Constructor<AreTokenizer>,
    compiler: A_TYPES__Component_Constructor<AreCompiler>,
    transformer: A_TYPES__Component_Constructor<AreTransformer>,
    interpreter: A_TYPES__Component_Constructor<AreInterpreter>,
    lifecycle: A_TYPES__Component_Constructor<AreLifecycle>,
    signals: A_TYPES__Component_Constructor<AreSignals>
}