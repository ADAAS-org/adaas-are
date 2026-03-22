import { A_Caller, A_Dependency, A_Inject } from "@adaas/a-concept";
import { AreDirective, AreDirectiveAttribute } from "@adaas/are/directive";
import { AreScene } from "@adaas/are/scene";
import { AreDeclarationInstruction } from "@adaas/are/scene-instruction";
import { AreStore } from "@adaas/are/store";



@AreDirective.Order(2)
export class AreDirectiveIf extends AreDirective {

    @AreDirective.Compile
    compile(
        @A_Inject(A_Caller) attribute: AreDirectiveAttribute,

        @A_Dependency.All()
        @A_Dependency.Flat()
        @A_Inject(AreDeclarationInstruction) declarations: AreDeclarationInstruction[],

        @A_Dependency.Parent()
        @A_Inject(AreStore) parentStore: AreStore,
        @A_Inject(AreScene) scene: AreScene,
        ...args: any[]
    ): void {
        for (let i = 0; i < declarations.length; i++) {
            const declaration = declarations[i];

            /**
             * 1. Extract the value from the store based on the attribute content 
             *    (which is the path to the value in the store)
             */
            attribute.value = parentStore.get(`${declaration.group}.${attribute.content}`)
                || parentStore.get(attribute.content);

            if (attribute.value) {
                /**
                 * 2. If the value is truthy then we just need to keep the CreateElement instruction as it is, because it is already registered during the compilation of the node and it will be applied during the rendering process to create the element in the DOM.
                 */
            } else {
                /**
                 * 3. If the value is falsy then we need to remove the CreateElement instruction from the render plan, because we don't want to create the element in the DOM if the condition is not met. 
                 */
                scene.deregister(declaration);
            }
        }
    }



    @AreDirective.Update
    update(
        @A_Inject(AreDirectiveAttribute) attribute: AreDirectiveAttribute,
        ...args: any[]
    ): void {

    }

}