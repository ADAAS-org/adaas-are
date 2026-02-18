import { A_Frame } from "@adaas/a-frame";
import { AreCompiler } from "@adaas/are/compiler";


@A_Frame.Component({
    namespace: 'A-ARE',
    name: 'AreJSONCompiler',
    description: 'JSON-specific compiler for A-Concept Rendering Engine (ARE) components, extending the base AreCompiler to handle JSON templates and data structures for headless or API-based rendering environments.'
})
export class AreJSONCompiler extends AreCompiler {


}