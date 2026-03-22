import { A_Caller, A_Feature, A_Inject } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame";
import { AreHost } from "@adaas/are/host";
import { ARE_CONSTANTS__DEFAULT_SCENE_INSTRUCTIONS, AreDeclarationInstruction, AreMutationInstruction, AreSceneInstruction } from "@adaas/are/scene-instruction";
import { AreHTMLEngineContext } from "./AreHTML.context";
import { AreComponentNode } from "@adaas/are/node";


@A_Frame.Component({
    namespace: 'A-ARE',
    name: 'AreHTMLHost',
    description: 'AreHTMLHost is a component that serves as a host for rendering AreNodes into HTML. It provides the necessary context and environment for AreNodes to be rendered and interact with the DOM.'
})
export class AreHTMLHost extends AreHost {


    @A_Frame.Method({
        description: 'Create an HTML element based on the provided instruction. This method is responsible for rendering the AreNode into the DOM and applying any necessary updates or changes based on the instruction.'
    })
    @AreHost.Apply(ARE_CONSTANTS__DEFAULT_SCENE_INSTRUCTIONS.AddElement)
    addElement(
        @A_Inject(A_Caller) declaration: AreDeclarationInstruction,
        // @A_Inject(AreSyntax) syntax: AreSyntax,
        @A_Inject(AreHTMLEngineContext) context: AreHTMLEngineContext
    ) {
        const node = declaration.owner;

        const parent = declaration.owner.parent


        if (parent) {
            const parents = context.getNodeElements(node);

            for (let i = 0; i < parents.length; i++) {
                const parentElement = parents[i];

                if (!node) {
                    throw new Error('Instruction does not have a node to render.');
                }

                let element: HTMLElement;

                if (node instanceof AreComponentNode) {
                    element = document.createElement('div'); // Create a wrapper div for component nodes
                    element.setAttribute('aseid', node.aseid.toString()); // Add a data attribute to identify the component

                } else {
                    element = document.createElement(node.type);
                }

                parentElement.appendChild(element);


                // Append the element to the parent element in the DOM based on the instruction's context

                context.setGroupElement(node, declaration, element);
            }
        } else {
            // If there's no parent, append to the root of the document or a specific container

            let element: HTMLElement;

            if (node instanceof AreComponentNode) {
                element = document.createElement('div'); // Create a wrapper div for component nodes
                element.setAttribute('a-id', declaration.id); // Add a data attribute to identify the component

            } else {
                element = document.createElement(node.type);
            }


            document.body.appendChild(element);
        }
    }


    @A_Frame.Method({
        description: 'Remove an HTML element based on the provided instruction. This method is responsible for removing the rendered AreNode from the DOM and performing any necessary cleanup.'
    })
    @AreHost.Revert(ARE_CONSTANTS__DEFAULT_SCENE_INSTRUCTIONS.AddElement)
    removeElement(
        @A_Inject(A_Caller) declaration: AreDeclarationInstruction,
        @A_Inject(AreHTMLEngineContext) context: AreHTMLEngineContext
    ) {
        const node = declaration.owner;

        if (!node) {
            throw new Error('Instruction does not have a node to remove.');
        }

        const element = context.getElementByGroup(declaration);

        if (element && element.parentElement) {
            element.parentElement.removeChild(element);
            context.removeGroupElement(node, declaration);
        }
    }


    @A_Frame.Method({
        description: 'Add an attribute to an HTML element based on the provided instruction. This method is responsible for applying attributes to the rendered AreNode in the DOM and updating the element accordingly.'
    })
    @AreHost.Apply(ARE_CONSTANTS__DEFAULT_SCENE_INSTRUCTIONS.AddAttribute)
    addAttribute(
        @A_Inject(A_Caller) mutation: AreMutationInstruction<{ name: string, value: string }>,
        @A_Inject(AreHTMLEngineContext) context: AreHTMLEngineContext
    ): void {
        const node = mutation.owner;

        if (!node) {
            throw new Error('Instruction does not have a node to add attribute to.');
        }

        const element = context.getElementByGroup(mutation);

        if (!element) {
            throw new Error('Element for the given node not found in the DOM.');
        }

        const attributeName = mutation.payload.name;
        const attributeValue = mutation.payload.value;

        if (attributeName) {
            (element as HTMLElement).setAttribute(attributeName, attributeValue);
        }
    }



    @A_Frame.Method({
        description: 'Add an event listener to an HTML element based on the provided instruction. This method is responsible for attaching event listeners to the rendered AreNode in the DOM and handling any interactions or events that occur.'
    })
    @AreHost.Apply(ARE_CONSTANTS__DEFAULT_SCENE_INSTRUCTIONS.addEventListener)
    addEventListener(
        @A_Inject(A_Caller) mutation: AreMutationInstruction<{ name: string, callback: EventListener }>,
        @A_Inject(AreHTMLEngineContext) context: AreHTMLEngineContext
    ) {
        const node = mutation.owner;

        if (!node) {
            throw new Error('Instruction does not have a node to add event listener to.');
        }

        const element = context.getElementByGroup(mutation);

        if (!element) {
            throw new Error('Element for the given node not found in the DOM.');
        }
        const eventName = mutation.payload.name;
        const callback = mutation.payload.callback;

        if (eventName && callback) {
            element.addEventListener(eventName, callback);
        }
    }


    @A_Frame.Method({
        description: 'Remove an event listener from an HTML element based on the provided instruction. This method is responsible for detaching event listeners from the rendered AreNode in the DOM and performing any necessary cleanup.'
    })
    @AreHost.Revert(ARE_CONSTANTS__DEFAULT_SCENE_INSTRUCTIONS.addEventListener)
    removeEventListener(
        @A_Inject(A_Caller) mutation: AreMutationInstruction<{ name: string, callback: EventListener }>,
        @A_Inject(AreHTMLEngineContext) context: AreHTMLEngineContext
    ) {
        const node = mutation.owner;

        if (!node) {
            throw new Error('Instruction does not have a node to remove event listener from.');
        }

        const element = context.getElementByGroup(mutation);

        if (!element) {
            throw new Error('Element for the given node not found in the DOM.');
        }
        const eventName = mutation.payload.name;
        const callback = mutation.payload.callback;

        if (eventName && callback) {
            element.removeEventListener(eventName, callback);
        }
    }





}