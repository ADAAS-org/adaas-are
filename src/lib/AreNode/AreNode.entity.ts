import { A_Context, A_Entity, A_Error, A_FormatterHelper, A_IdentityHelper, A_Scope, A_TypeGuards, ASEID } from "@adaas/a-concept";
import { AreNodeNewProps } from "./AreNode.types";
import { AreEvent } from "@adaas/are/event";
import { AreNodeFeatures } from "./AreNode.constants";
import { AreScene } from "@adaas/are/scene";
import { A_Frame } from "@adaas/a-frame";



@A_Frame.Entity({
    namespace: 'A-ARE',
    name: 'AreNode',
    description: 'An AreNode entity represents a node within the A-Concept Rendering Engine (ARE) framework. It encapsulates template, markup, and styles, and manages its own scope for nested fragments and entities. AreNodes are responsible for handling events, compiling, rendering, updating, and lifecycle management within the ARE context.'
})
export class AreNode extends A_Entity<AreNodeNewProps> {
    /**
     * Template string defined for the node
     * Example: `<div>{{name}}</div>`
     */
    _template!: string
    /**
     * Markup string defined for the node
     * Example: `<custom-component :prop="value"> <div>Inner Content</div> </custom-component>`
     */
    _markup!: string
    /**
     * Styles string defined for the node
     */
    _styles!: string
    /**
     * The scope associated with this node
     * uses to store all nested fragments and entities like other AreNodes and Scene
     */
    protected _scope!: A_Scope

    get id(): string {
        return this.aseid.id;
    }

    get scope(): A_Scope {
        if (!this._scope) {
            this._scope = new A_Scope({
                name: `${this.aseid.id}`,
            });
        }

        return this._scope;
    }

    get content(): AreScene {
        return this.scope.resolveFlat<AreScene>(AreScene)!;
    }

    get type(): string {
        return this.aseid.entity;
    }

    get template(): string {
        return this._template;
    }


    get markup(): string {
        return this._markup;
    }

    get styles(): string {
        return this._styles;
    }


    fromNew(newEntity: AreNodeNewProps): void {
        this.aseid = this.generateASEID({
            id: newEntity.id,
            entity: newEntity.component,
            scope: newEntity.scope,
        });

        this._template = newEntity.template || '';
        this._markup = newEntity.markup || '';
        this._styles = newEntity.styles || '';
    }


    fromASEID(aseid: string | ASEID): void {
        super.fromASEID(aseid);

        this._template = '';
        this._markup = '';
        this._styles = '';
    }


    setTemplate(template: string): void {
        this._template = template;
    }

    setMarkup(markup: string): void {
        this._markup = markup;
    }

    setStyles(styles: string): void {
        this._styles = styles;
    }



    async emit(
        scope: A_Scope,
    )
    async emit(
        event: AreEvent,
    )
    async emit(
        eventOrScope: AreEvent | A_Scope,
    ) {
        this.checkScopeInheritance();

        /**
         * isolated event scope to avoid polluting the node scope
         */
        const eventScope = A_TypeGuards.isScopeInstance(eventOrScope)
            ? eventOrScope
                .inherit(this.scope)
            : new A_Scope({
                name: `${eventOrScope.name}-scope`,
                fragments: [eventOrScope]
            })
                .inherit(this.scope)

        try {

            await this.call(AreNodeFeatures.onEvent, eventScope)

            eventScope.destroy()

        } catch (error) {

            eventScope.destroy();

            throw error;
        }

    }

    compile(): void {

        this.checkScopeInheritance();

        try {

             this.call(AreNodeFeatures.onCompile, this.scope);

        } catch (error) {
            throw error;
        }
    }

    render(): void {
        this.checkScopeInheritance();

        try {

            return this.call(AreNodeFeatures.onRender, this.scope);

        } catch (error) {
            throw error;
        }
    }


    async update(): Promise<void> {

        this.checkScopeInheritance();

        try {
            await this.call(AreNodeFeatures.onUpdate, this.scope);

        } catch (error) {
            throw error;
        }
    }


    async reset(): Promise<void> {
        this.scope.destroy();

        this._template = '';
        this._styles = '';

        this._scope = new A_Scope({
            name: `${this.aseid.id}`,
        });
    }

    unmount(): void {
        this.checkScopeInheritance();

        try {
            this.call(AreNodeFeatures.onUnmount, this.scope);
        } catch (error) {
            throw error;
        }
    }


    async load(): Promise<any> {
        return await super.load(this.scope);
    }

    async destroy(): Promise<any> {
        this.checkScopeInheritance();
        try {

            await super.destroy(this.scope);

            this.scope.destroy();

        } catch (error) {

            this._scope.destroy();

            throw error;
        }
    }


    //============================================================================================
    //                                Helpers Methods
    //============================================================================================
    /**
     * Method to ensure that the current scope is inherited from the context scope
     * 
     * @throws A_Error if the scope is not inherited from the context scope
     */
    protected checkScopeInheritance(): void {
        let attachedScope: A_Scope;

        try {
            attachedScope = A_Context.scope(this);
        } catch (error) {
            throw new A_Error({
                title: `A_UI_Node Scope Inheritance Error`,
                description: `The A_UI_Node entity with ASEID '${this.aseid.toString()}' is not bound to any context scope. Please ensure that the entity is created within a valid context.`,
                originalError: error
            });
        }
    }
}