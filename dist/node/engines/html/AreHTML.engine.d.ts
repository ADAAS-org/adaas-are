import { AreHTMLCompiler } from './AreHTML.compiler.js';
import { A_Component, A_Container } from '@adaas/a-concept';
import { AreSyntaxContext } from '../../lib/AreSyntax/AreSyntax.context.js';
import { A_Logger } from '@adaas/a-utils/a-logger';
import '../../lib/AreCompiler/AreCompiler.component.js';
import '../../index-BD-6iOuR.js';
import '../../lib/AreEvent/AreEvent.types.js';
import '../../lib/AreNode/AreNode.types.js';
import '../../lib/AreScene/AreScene.types.js';
import '../../lib/AreProps/AreProps.context.js';
import '@adaas/a-utils/a-execution';
import '../../lib/AreStore/AreStore.context.js';
import '../../lib/AreSyntax/AreSyntax.component.js';
import '../../lib/AreSyntax/AreSyntax.types.js';
import '@adaas/a-utils/a-signal';
import '../../lib/AreComponent/Are.component.js';
import '../../lib/AreComponent/Are.context.js';
import '../../lib/AreSceneInstruction/types/AddAttribute.instruction.js';
import '../../lib/AreSceneInstruction/types/AddDirective.instruction.js';
import '../../lib/AreSceneInstruction/types/AddStyle.instruction.js';
import '../../lib/AreSceneInstruction/types/AttachListener.instruction.js';
import '../../lib/AreSceneInstruction/types/AttachRootNode.instruction.js';
import '../../lib/AreSceneInstruction/types/MountNode.instruction.js';
import '../../lib/AreSceneInstruction/types/ReplaceInterpolation.instruction.js';
import '../../lib/AreSceneInstruction/types/UnmountNode.instruction.js';

declare class AreHTMLEngine extends A_Component {
    /**
     * Inject AreHTMLSyntax into the container scope before loading
     *
     * @param container
     */
    injectSyntax(container: A_Container, syntax?: AreSyntaxContext, compiler?: AreHTMLCompiler, logger?: A_Logger): Promise<void>;
}

export { AreHTMLEngine };
