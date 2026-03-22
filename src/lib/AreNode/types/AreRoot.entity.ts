import { AreScene } from "@adaas/are/scene";
import { A_Frame } from "@adaas/a-frame";
import { AreStore } from "@adaas/are/store";
import { AreNode } from "../AreNode.entity";
import { AreNodeFeatures } from "../AreNode.constants";
import { Are } from "@adaas/are/component";


@A_Frame.Entity({
    namespace: 'A-ARE',
    name: 'AreNode',
    description: 'An AreRootNode entity represents the root node within the A-Concept Rendering Engine (ARE) framework. It encapsulates template, markup, and styles, and manages its own scope for nested fragments and entities. AreRootNodes are responsible for handling events, compiling, rendering, updating, and lifecycle management within the ARE context.'
})
export class AreRootNode extends AreNode {

    /**
     * The traget Component to be rendered under this root node
     */
    target?: Are;

    /**
     * Renders the node by calling the onRender feature, which should trigger any associated rendering logic defined for the node. This method is typically called after the node has been compiled and is ready to be rendered in the scene. The onRender feature can be used to execute any necessary rendering instructions or to update the node's appearance based on changes in state or context.
     */
    render() {
        this.call(AreNodeFeatures.onRender);
    }
    /**
     * Sets the component for the root node by defining a template that includes the specified component. This method allows you to dynamically assign a component to the root node, which will then be rendered as part of the node's content. By setting the template to include the component, you can ensure that the component is properly integrated into the node's structure and will be rendered according to the node's rendering logic and lifecycle management.
     * 
     * @param component 
     */
    setComponent(component: Are) {
        this.target = component;
        this.setTemplate(`<${component.constructor.name}></${component.constructor.name}>`)
    }
}