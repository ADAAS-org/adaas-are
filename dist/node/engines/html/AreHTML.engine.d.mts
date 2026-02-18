import { AreHTMLCompiler } from './AreHTML.compiler.mjs';
import { A_Component, A_Container } from '@adaas/a-concept';
import { AreSyntaxContext } from '../../lib/AreSyntax/AreSyntax.context.mjs';
import { A_Logger } from '@adaas/a-utils/a-logger';
import '../../lib/AreCompiler/AreCompiler.component.mjs';
import '../../index-DMXWCL7R.mjs';
import '../../lib/AreEvent/AreEvent.types.mjs';
import '../../lib/AreNode/AreNode.types.mjs';
import '../../lib/AreScene/AreScene.types.mjs';
import '../../lib/AreProps/AreProps.context.mjs';
import '@adaas/a-utils/a-execution';
import '../../lib/AreStore/AreStore.context.mjs';
import '../../lib/AreSyntax/AreSyntax.component.mjs';
import '../../lib/AreSyntax/AreSyntax.types.mjs';
import '@adaas/a-utils/a-signal';
import '../../lib/AreComponent/Are.component.mjs';
import '../../lib/AreComponent/Are.context.mjs';
import '../../lib/AreSceneInstruction/types/AddAttribute.instruction.mjs';
import '../../lib/AreSceneInstruction/types/AddDirective.instruction.mjs';
import '../../lib/AreSceneInstruction/types/AddStyle.instruction.mjs';
import '../../lib/AreSceneInstruction/types/AttachListener.instruction.mjs';
import '../../lib/AreSceneInstruction/types/AttachRootNode.instruction.mjs';
import '../../lib/AreSceneInstruction/types/MountNode.instruction.mjs';
import '../../lib/AreSceneInstruction/types/ReplaceInterpolation.instruction.mjs';
import '../../lib/AreSceneInstruction/types/UnmountNode.instruction.mjs';

declare class AreHTMLEngine extends A_Component {
    /**
     * Inject AreHTMLSyntax into the container scope before loading
     *
     * @param container
     */
    injectSyntax(container: A_Container, syntax?: AreSyntaxContext, compiler?: AreHTMLCompiler, logger?: A_Logger): Promise<void>;
}

export { AreHTMLEngine };
