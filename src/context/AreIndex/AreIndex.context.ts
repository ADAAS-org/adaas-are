import { A_Context, A_Fragment, A_Scope, ASEID } from "@adaas/a-concept";
import { AreNode } from "@adaas/are/entities/AreNode/AreNode.entity";



export class AreIndex<
    _MappingType = any
> extends A_Fragment {

    constructor(aseid: string | ASEID) {
        super({
            name: aseid instanceof ASEID ? aseid.toString() : aseid
        });
    }

    /**
     * Platform-agnostic element index
     * Element can be DOM Element, PDF element, DOCX element, etc.
     * The actual type depends on the compiler being used
     */
    protected _index: {
        ASEID_to_Element: Map<string, _MappingType>,
        Element_to_ASEID: Map<_MappingType, string>,
        Node_to_Element: Map<AreNode, _MappingType>,
        Element_to_Node: Map<_MappingType, AreNode>,
    } = {
            ASEID_to_Element: new Map(),
            Element_to_ASEID: new Map(),
            Node_to_Element: new Map(),
            Element_to_Node: new Map(),
        }



    get scope(): A_Scope {
        return A_Context.scope(this);
    }

    get parent() {
        return A_Context.scope(this).parent?.resolve<AreIndex>(AreIndex);
    }

    get size(): number {
        return this._index.ASEID_to_Element.size;
    }

    protected get depth(): number {
        let depth = 0;
        let currentScope: A_Scope | undefined = this.scope;

        while (currentScope) {
            depth++;
            currentScope = currentScope.parent;
        }

        return depth;
    }

    /**
     * Adds a platform-agnostic element to the index
     * @param node - AreNode to index
     * @param element - Platform-specific element (DOM, PDF, DOCX, etc.)
     */
    add(node: AreNode, element: _MappingType) {
        this._index.ASEID_to_Element.set(node.aseid.toString(), element);
        this._index.Element_to_ASEID.set(element, node.aseid.toString());
        this._index.Node_to_Element.set(node, element);
        this._index.Element_to_Node.set(element, node);
    }

    /**
     * Retrieves platform-specific element by AreNode
     * @param node - AreNode to look up
     * @returns Platform-specific element or undefined
     */
    getByNode(node: AreNode): _MappingType | undefined {
        return this._index.Node_to_Element.get(node);
    }

    /**
     * Retrieves AreNode by platform-specific element
     * @param element - Platform-specific element to look up
     * @returns AreNode or undefined
     */
    getByElement(element: _MappingType): AreNode | undefined {
        return this._index.Element_to_Node.get(element);
    }

    /**
     * Removes index entry by AreNode
     * @param node - AreNode to remove from index
     */
    removeByNode(node: AreNode) {
        const element = this._index.Node_to_Element.get(node);
        if (element) {
            this._index.ASEID_to_Element.delete(node.aseid.toString());
            this._index.Element_to_ASEID.delete(element);
            this._index.Node_to_Element.delete(node);
            this._index.Element_to_Node.delete(element);
        }
    }

    /**
     * Removes index entry by platform-specific element
     * @param element - Platform-specific element to remove from index
     */
    removeByElement(element: _MappingType) {
        const aseid = this._index.Element_to_ASEID.get(element);
        if (aseid) {
            const node = this._index.Element_to_Node.get(element);
            if (node) {
                this._index.ASEID_to_Element.delete(aseid);
                this._index.Element_to_ASEID.delete(element);
                this._index.Node_to_Element.delete(node);
                this._index.Element_to_Node.delete(element);
            }
        }
    }

    clear() {
        this._index.ASEID_to_Element.clear();
        this._index.Element_to_ASEID.clear();
        this._index.Node_to_Element.clear();
        this._index.Element_to_Node.clear();
    }
}