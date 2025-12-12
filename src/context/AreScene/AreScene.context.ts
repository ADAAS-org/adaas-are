import { A_Context, A_Error, A_FormatterHelper, A_Fragment, A_IdentityHelper, A_Scope, ASEID } from "@adaas/a-concept";
import { A_Logger } from "@adaas/a-utils";
import { AreIndex } from "../AreIndex/AreIndex.context";
import { AreNode } from "@adaas/are/entities/AreNode/AreNode.entity";

export class AreScene<
    _IndexType = any,
> extends A_Fragment {

    constructor(
        name?: string,
        template?: string
    ) {
        super({ name: name || 'are-app' });
    }

    get scope(): A_Scope {
        return A_Context.scope(this);
    }

    get index(): AreIndex<_IndexType> {
        return A_Context.scope(this).resolve<AreIndex<_IndexType>>(AreIndex)!;
    }

    get parent() {
        return A_Context.scope(this).parent?.resolve<AreScene>(AreScene);
    }

    get template(): string {
        return '';
    }

    get mountPoint(): HTMLElement | null {
        return document.getElementById(this.name)
    }

    set template(value: string) {
        return;
    }


    get depth(): number {
        let depth = 0;
        let currentScope: A_Scope | undefined = this.scope;

        while (currentScope) {
            if (currentScope.parent && currentScope.parent.resolve<AreScene>(AreScene)) {
                depth++;
            }
            currentScope = currentScope.parent;
        }

        return depth;
    }


    [Symbol.iterator](): Iterator<AreNode> {

        return {
            next: (): IteratorResult<AreNode> => {
                return {
                    done: true,
                    value: null
                };
            }
        };
    }

    attach(node: AreNode): void {

        this.scope.register(node);
        node.scope.inherit(this.scope)
    }



    async mount(
        node: AreNode,
    ) {

    }


    async update(
        node: AreNode,
    ) {

    }


    async unmount(
        node: AreNode,
    ) {

    }


    async addListener(event: string, handler: string, owner: AreNode, node: AreNode) {

    }


    async render() {

    }


    async parentOf(node: AreNode): Promise<AreNode | null> {


        return null;
    }


    async childrenOf(node: AreNode): Promise<AreNode[]> {
        const children: AreNode[] = [];

        return children;
    }


    async clear() {


        this.index.clear();
    }


    async reset(template: string) {
        this.index.clear();
    }


    async addStyles(node: AreNode, styles: string) {
    }
}