import { A_Fragment } from "@adaas/a-concept";
import { AreNode } from "@adaas/are/node";
import { AreSceneInstruction } from "@adaas/are/scene-instruction";


export class AreHTMLEngineContext extends A_Fragment {

    /**
     * Index structure mapping:
     * 
     *        Node                ->       Group ID        ->  Element
     * -----------------------------------------------------------------------------------
     *  | - Attribute             |   group: string       |   Node
     *  | - Directive (e.g. for)  |                       |   Node
     */

    protected index = {
        nodeToElements: new Map<string, Node[]>(),           // aseid -> elements
        groupToElement: new Map<string, Node>(),              // instruction.group -> element
        elementToGroup: new Map<Node, string>(),              // element -> group id
    }

    /** Get all elements associated with a node */
    getNodeElements(node: AreNode): Node[] {
        return this.index.nodeToElements.get(node.aseid.toString()) || [];
    }

    /** Get the group ID that created a given element */
    getGroupByElement(element: Node): string | undefined {
        return this.index.elementToGroup.get(element);
    }

    /** Get the element created by a group */
    getElementByGroup(instruction: AreSceneInstruction): Node | undefined {
        return this.index.groupToElement.get(instruction.group!);
    }

    /** Register a new element created by a group */
    setGroupElement(node: AreNode, instruction:AreSceneInstruction, element: Node): void {
        const groupId = instruction.group!;
        const nodeId = node.aseid.toString();

        // Map group -> element (1-to-1)
        this.index.groupToElement.set(groupId, element);

        // Map element -> group
        this.index.elementToGroup.set(element, groupId);

        // Map node -> elements (1-to-many)
        const nodeElements = this.index.nodeToElements.get(nodeId) || [];
        nodeElements.push(element);
        this.index.nodeToElements.set(nodeId, nodeElements);
    }

    /** Remove element created by a group and clean up mappings */
    removeGroupElement(node: AreNode, instruction: AreSceneInstruction): void {
        const groupId = instruction.group!;
        const nodeId = node.aseid.toString();
        const element = this.index.groupToElement.get(groupId);

        if (!element) {
            return;
        }

        // Remove element -> group mapping
        this.index.elementToGroup.delete(element);

        // Remove group -> element mapping
        this.index.groupToElement.delete(groupId);

        // Remove from node -> elements mapping
        const nodeElements = this.index.nodeToElements.get(nodeId);
        if (nodeElements) {
            const updatedNodeElements = nodeElements.filter(el => el !== element);
            if (updatedNodeElements.length > 0) {
                this.index.nodeToElements.set(nodeId, updatedNodeElements);
            } else {
                this.index.nodeToElements.delete(nodeId);
            }
        }
    }

}
