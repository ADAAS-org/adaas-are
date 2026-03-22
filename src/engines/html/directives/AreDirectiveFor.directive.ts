import { A_Caller, A_Dependency, A_Inject } from "@adaas/a-concept";
import { A_ExecutionContext } from "@adaas/a-utils/a-execution";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { AreDirective, AreDirectiveAttribute } from "@adaas/are/directive";
import { AreScene } from "@adaas/are/scene";
import { ARE_CONSTANTS__DEFAULT_SCENE_INSTRUCTIONS, AreDeclarationInstruction } from "@adaas/are/scene-instruction";
import { AreStore } from "@adaas/are/store";




@AreDirective.Order(1)
export class AreDirectiveFor extends AreDirective {

    @AreDirective.Compile
    compile(
        @A_Inject(A_Caller) attribute: AreDirectiveAttribute,

        @A_Dependency.All()
        @A_Dependency.Flat()
        @A_Inject(AreDeclarationInstruction) declarations: AreDeclarationInstruction[],

        @A_Inject(AreStore) store: AreStore,
        /**
         * We always use parent store, to keep proper tree inheritance
         */
        @A_Dependency.Parent()
        @A_Inject(AreStore) parentStore: AreStore,
        @A_Inject(AreScene) scene: AreScene,
        @A_Inject(A_Logger) logger: A_Logger,
        ...args: any[]
    ): void {
        /***
         * 1. Extract the array from the store based on the attribute content
         * 
         * Example of the directive usage in the template:
         * 
         *  <custom $for="item, index in items"></custom>
         * 
         */
        const [keyAndIndex, arrayPath] = attribute.content.split(' in ').map(part => part.trim());
        const [key, index] = keyAndIndex.split(',').map(part => part.trim());

        attribute.value = parentStore.get(arrayPath);

        /**
         * 2. Then check the value to ensure it's an array
         */
        if (!Array.isArray(attribute.value)) {
            logger.warning(`The value of the "for" directive should be an array. Received: ${attribute.value}`);
            return;
        }

        /**
         * 3. Deregister all CreateElement instructions related to the node 
         *    That's needed to ensure we have create instructions of each element in the array
         */
        for (let i = 0; i < declarations.length; i++) {
            const declaration = declarations[i];
            scene.deregister(declaration);
        }


        for (let i = 0; i < attribute.value.length; i++) {
            const value = attribute.value[i];
            /**
             * 4. For each element in the array we need to create a CreateElement instruction with the same template and styles as the original one, but with the value of the current element in the array, so we can use it in the template of the node.
             */
            const instruction = new AreDeclarationInstruction(
                ARE_CONSTANTS__DEFAULT_SCENE_INSTRUCTIONS.CreateElement,
                {
                    index: i,
                    tag: attribute.owner.type,
                }
            );

            /**
             * 5. Set runtime data for the instruction in the compiler context, so we can access it later in the update method to update the value of the directive based on changes in the store or other dependencies. We need to store the key and index to be able to update the correct instruction with the new value when the array changes.
             */
            parentStore.set(instruction.group, {
                [key]: value,
                [index]: i,
            });
        }
    }



    @AreDirective.Update
    update(
        @A_Inject(AreDirectiveAttribute) attribute: AreDirectiveAttribute,
        ...args: any[]
    ): void {

    }
}