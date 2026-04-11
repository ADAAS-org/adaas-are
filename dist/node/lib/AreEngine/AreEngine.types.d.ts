import { A_TYPES__Component_Constructor } from '@adaas/a-concept';
import { AreCompiler } from '@adaas/are/compiler/AreCompiler.component';
import { AreContext } from '@adaas/are/component/Are.context';
import { AreLoader } from '@adaas/are/loader/AreLoader.component';
import { AreSyntax } from '@adaas/are/syntax/AreSyntax.context';
import { AreTokenizer } from '@adaas/are/tokenizer/AreTokenizer.component';
import { AreTransformer } from '@adaas/are/transformer/AreTransformer.component';
import { AreInterpreter } from '@adaas/are/interpreter/AreInterpreter.component';
import { AreLifecycle } from '@adaas/are/lifecycle/AreLifecycle.component';
import { AreSignals } from '@adaas/are/signals/AreSignals.component';

type AreEngineDependencies = {
    context: AreContext;
    syntax: AreSyntax;
    loader: A_TYPES__Component_Constructor<AreLoader>;
    tokenizer: A_TYPES__Component_Constructor<AreTokenizer>;
    compiler: A_TYPES__Component_Constructor<AreCompiler>;
    transformer: A_TYPES__Component_Constructor<AreTransformer>;
    interpreter: A_TYPES__Component_Constructor<AreInterpreter>;
    lifecycle: A_TYPES__Component_Constructor<AreLifecycle>;
    signals: A_TYPES__Component_Constructor<AreSignals>;
};

export type { AreEngineDependencies };
