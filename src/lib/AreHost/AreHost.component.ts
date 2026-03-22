import { A_Caller, A_Component, A_Feature, A_Inject } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame";
import { ARE_CONSTANTS__DEFAULT_SCENE_INSTRUCTIONS, AreSceneInstruction, AreSceneInstructionFeatures } from "../AreSceneInstruction";


export class AreHost extends A_Component {

    static Apply(action: string) {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: action + AreSceneInstructionFeatures.Apply,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }

    static Revert(action: string) {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: action + AreSceneInstructionFeatures.Revert,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }


    @A_Frame.Method({
        description: 'This method allows to add a new element to the host. It creates a new element and attaches it to a proper place based on the provided parameters. '
    })
    @AreHost.Apply(ARE_CONSTANTS__DEFAULT_SCENE_INSTRUCTIONS.AddElement)
    addElement(
        @A_Inject(A_Caller) instruction: AreSceneInstruction,
        ...args: any[]

    ) {

    }


    @A_Frame.Method({
        description: 'This method allows to remove an element from the host. It detaches the element from its parent and performs necessary cleanup. '
    })
    @AreHost.Revert(ARE_CONSTANTS__DEFAULT_SCENE_INSTRUCTIONS.AddElement)
    removeElement(
        @A_Inject(A_Caller) instruction: AreSceneInstruction,
        ...args: any[]
    ) {

    }



    @A_Frame.Method({
        description: 'This method allows to add a new attribute to the host. It creates a new attribute and attaches it to a proper place based on the provided parameters. '
    })
    @AreHost.Apply(ARE_CONSTANTS__DEFAULT_SCENE_INSTRUCTIONS.AddAttribute)
    addAttribute(
        @A_Inject(A_Caller) instruction: AreSceneInstruction,
        ...args: any[]

    ) {

    }


    @A_Frame.Method({
        description: 'This method allows to remove an attribute from the host. It detaches the attribute from its parent and performs necessary cleanup. '
    })
    @AreHost.Revert(ARE_CONSTANTS__DEFAULT_SCENE_INSTRUCTIONS.AddAttribute)
    removeAttribute(
        @A_Inject(A_Caller) instruction: AreSceneInstruction,
        ...args: any[]

    ) {

    }


    @A_Frame.Method({
        description: 'This method allows to add new styles to the host. It creates new styles and attaches them to a proper place based on the provided parameters. '
    })
    @AreHost.Apply(ARE_CONSTANTS__DEFAULT_SCENE_INSTRUCTIONS.AddStyle)
    addStyles(
        @A_Inject(A_Caller) instruction: AreSceneInstruction,
        ...args: any[]

    ) {

    }

    @A_Frame.Method({
        description: 'This method allows to remove styles from the host. It detaches the styles from their parent and performs necessary cleanup. '
    })
    @AreHost.Revert(ARE_CONSTANTS__DEFAULT_SCENE_INSTRUCTIONS.AddStyle)
    removeStyles(
        @A_Inject(A_Caller) instruction: AreSceneInstruction,
        ...args: any[]

    ) {

    }


    @A_Frame.Method({
        description: 'This method allows to add a new event listener to the host. It creates a new event listener and attaches it to a proper place based on the provided parameters. '
    })
    @AreHost.Apply(ARE_CONSTANTS__DEFAULT_SCENE_INSTRUCTIONS.addEventListener)
    addEventListener(
        @A_Inject(A_Caller) instruction: AreSceneInstruction,
        ...args: any[]

    ) {
    }


    @A_Frame.Method({
        description: 'This method allows to remove an event listener from the host. It detaches the event listener from its parent and performs necessary cleanup. '
    })
    @AreHost.Revert(ARE_CONSTANTS__DEFAULT_SCENE_INSTRUCTIONS.addEventListener)
    removeEventListener(
        @A_Inject(A_Caller) instruction: AreSceneInstruction,
        ...args: any[]

    ) {
    }

}