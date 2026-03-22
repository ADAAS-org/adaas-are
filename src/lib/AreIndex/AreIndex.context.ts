import { A_Context, A_Fragment, A_Scope, ASEID } from "@adaas/a-concept";
import { AreNode } from "@adaas/are/node";



export class AreIndex<
    _PathType = any
> extends A_Fragment {

    constructor(aseid: string | ASEID) {
        super({
            name: aseid instanceof ASEID ? aseid.toString() : aseid
        });
    }

    /**
     * Platform-agnostic element index with linked list functionality
     * Element can be DOM Element, PDF element, DOCX element, etc.
     * The actual type depends on the compiler being used
     */
    protected _index: {
        // Linked list navigation
        Node_to_Next: Map<AreNode, AreNode | null>,
        Node_to_Previous: Map<AreNode, AreNode | null>,
        
        // Track first and last nodes for easy traversal
        FirstNode: AreNode | null,
        LastNode: AreNode | null,
        
        // Keep track of all nodes in the index
        Nodes: Set<AreNode>,
    } = {
            Node_to_Next: new Map(),
            Node_to_Previous: new Map(),
            FirstNode: null,
            LastNode: null,
            Nodes: new Set(),
        }


    /**
     * Unique hash representing the current state of the index
     * Can be used to identify changes in the index
     */
    get state(): string {
        const nodeIds = Array.from(this._index.Nodes)
            .map(node => node.aseid.toString())
            .sort()
            .join('|');
        return nodeIds;
    }

    get scope(): A_Scope {
        return A_Context.scope(this);
    }

    get parent() {
        return A_Context.scope(this).parent?.resolve<AreIndex>(AreIndex);
    }

    get size(): number {
        return this._index.Nodes.size;
    }

    get nodes(): Array<AreNode> {
        return Array.from(this._index.Nodes);
    }


    /**
     * Adds a node to the linked list
     * @param newNode - AreNode to add to the index
     * @param position - Where to add the node: 'start', 'end', or { after: AreNode } or { before: AreNode }
     */
    add(newNode: AreNode, position: 'start' | 'end' | { after: AreNode } | { before: AreNode } = 'end') {
        this._index.Nodes.add(newNode);
        
        if (typeof position === 'string') {
            if (position === 'start') {
                this.addToStart(newNode);
            } else {
                this.addToEnd(newNode);
            }
        } else if ('after' in position) {
            this.insertAfterInternal(position.after, newNode);
        } else if ('before' in position) {
            this.insertBeforeInternal(position.before, newNode);
        }
    }

    /**
     * Removes a node from the linked list
     * @param node - AreNode to remove from index
     */
    remove(node: AreNode) {
        if (this._index.Nodes.has(node)) {
            this._index.Nodes.delete(node);
            this.removeFromLinkedList(node);
        }
    }
    
    /**
     * Remove node from linked list while maintaining integrity
     */
    private removeFromLinkedList(node: AreNode) {
        const prevNode = this._index.Node_to_Previous.get(node);
        const nextNode = this._index.Node_to_Next.get(node);
        
        if (prevNode) {
            this._index.Node_to_Next.set(prevNode, nextNode!);
        } else {
            // node was first
            this._index.FirstNode = nextNode!;
        }
        
        if (nextNode) {
            this._index.Node_to_Previous.set(nextNode, prevNode!);
        } else {
            // node was last
            this._index.LastNode = prevNode!;
        }
        
        // Clean up references
        this._index.Node_to_Next.delete(node);
        this._index.Node_to_Previous.delete(node);
    }


    /**
     * Add node to the start of the linked list
     */
    private addToStart(node: AreNode) {
        if (this._index.FirstNode === null) {
            // First node in the list
            this._index.FirstNode = node;
            this._index.LastNode = node;
            this._index.Node_to_Next.set(node, null);
            this._index.Node_to_Previous.set(node, null);
        } else {
            // Add to the start
            const firstNode = this._index.FirstNode;
            this._index.Node_to_Previous.set(firstNode, node);
            this._index.Node_to_Next.set(node, firstNode);
            this._index.Node_to_Previous.set(node, null);
            this._index.FirstNode = node;
        }
    }
    
    /**
     * Add node to the end of the linked list
     */
    private addToEnd(node: AreNode) {
        if (this._index.FirstNode === null) {
            // First node in the list
            this._index.FirstNode = node;
            this._index.LastNode = node;
            this._index.Node_to_Next.set(node, null);
            this._index.Node_to_Previous.set(node, null);
        } else {
            // Add to the end
            const lastNode = this._index.LastNode!;
            this._index.Node_to_Next.set(lastNode, node);
            this._index.Node_to_Previous.set(node, lastNode);
            this._index.Node_to_Next.set(node, null);
            this._index.LastNode = node;
        }
    }
    
    /**
     * Internal method to insert node after the specified target node
     */
    private insertAfterInternal(targetNode: AreNode, newNode: AreNode) {
        const nextNode = this._index.Node_to_Next.get(targetNode);
        
        // Update linked list pointers
        this._index.Node_to_Next.set(targetNode, newNode);
        this._index.Node_to_Previous.set(newNode, targetNode);
        this._index.Node_to_Next.set(newNode, nextNode!);
        
        if (nextNode) {
            this._index.Node_to_Previous.set(nextNode, newNode);
        } else {
            // newNode becomes the last node
            this._index.LastNode = newNode;
        }
    }
    
    /**
     * Internal method to insert node before the specified target node
     */
    private insertBeforeInternal(targetNode: AreNode, newNode: AreNode) {
        const prevNode = this._index.Node_to_Previous.get(targetNode);
        
        // Update linked list pointers
        this._index.Node_to_Previous.set(targetNode, newNode);
        this._index.Node_to_Next.set(newNode, targetNode);
        this._index.Node_to_Previous.set(newNode, prevNode!);
        
        if (prevNode) {
            this._index.Node_to_Next.set(prevNode, newNode);
        } else {
            // newNode becomes the first node
            this._index.FirstNode = newNode;
        }
    }
    
    /**
     * Get the node that comes after the specified node
     * @param node - Node to find the successor of
     * @returns Next node or null if node is last or not found
     */
    nodeAfter(node: AreNode): AreNode | null {
        return this._index.Node_to_Next.get(node) || null;
    }
    
    /**
     * Get the node that comes before the specified node
     * @param node - Node to find the predecessor of
     * @returns Previous node or null if node is first or not found
     */
    nodeBefore(node: AreNode): AreNode | null {
        return this._index.Node_to_Previous.get(node) || null;
    }
    
    /**
     * Get the first node in the linked list
     * @returns First node or null if list is empty
     */
    get firstNode(): AreNode | null {
        return this._index.FirstNode;
    }
    
    /**
     * Get the last node in the linked list
     * @returns Last node or null if list is empty
     */
    get lastNode(): AreNode | null {
        return this._index.LastNode;
    }
    
    /**
     * Iterate through all nodes in linked list order
     * @returns Generator that yields nodes in order
     */
    *iterateNodes(): Generator<AreNode, void, unknown> {
        let current = this._index.FirstNode;
        while (current) {
            yield current;
            current = this._index.Node_to_Next.get(current) || null;
        }
    }
    
    /**
     * Iterate through all nodes in reverse linked list order
     * @returns Generator that yields nodes in reverse order
     */
    *iterateNodesReverse(): Generator<AreNode, void, unknown> {
        let current = this._index.LastNode;
        while (current) {
            yield current;
            current = this._index.Node_to_Previous.get(current) || null;
        }
    }

    clear() {
        this._index.Node_to_Next.clear();
        this._index.Node_to_Previous.clear();
        this._index.FirstNode = null;
        this._index.LastNode = null;
        this._index.Nodes.clear();
    }
}