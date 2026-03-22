import { A_Caller, A_Container, A_Error, A_Feature, A_Inject, A_Scope, ASEID } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame";
import { AreCompiler } from "@adaas/are/compiler";
import { AreIndex } from "@adaas/are/index";
import { AreScene } from "@adaas/are/scene";
import { AreNode } from "@adaas/are/node";




@A_Frame.Component({
    namespace: 'A-ARE',
    name: 'AreHTMLCompiler',
    description: 'HTML-specific compiler for A-Concept Rendering Engine (ARE) components, extending the base AreCompiler to handle HTML templates, styles, and rendering logic tailored for web environments.'
})
export class AreHTMLCompiler extends AreCompiler {


}