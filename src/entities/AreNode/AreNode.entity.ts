import { A_Context, A_Entity, A_Error, A_FormatterHelper, A_IdentityHelper, A_Scope, ASEID } from "@adaas/a-concept";
import { AreNodeNewProps } from "./AreNode.types";
import { AreStore } from "@adaas/are/context/AreStore/AreStore.context";
import { AreProps } from "@adaas/are/context/AreProps/AreProps.context";
import { AreEvent } from "@adaas/are/context/AreEvent/AreEvent.context";
import { AreNodeFeatures } from "./AreNode.constants";
import { AreIndex } from "@adaas/are/context/AreIndex/AreIndex.context";

export class AreNode extends A_Entity<AreNodeNewProps> {


    template!: string
    markup!: string
    styles!: string

    /**
     * The scope associated with this node
     * uses to store all nested fragments and entities like other AreNodes and Scene
     */
    protected _scope!: A_Scope

    get scope(): A_Scope {
        if (!this._scope) {
            this._scope = new A_Scope({
                name: `${this.aseid.id}`,
            });
        }

        return this._scope;
    }

    fromNew(newEntity: AreNodeNewProps): void {
        this.aseid = new ASEID({
            id: A_IdentityHelper.generateTimeId(),
            entity: newEntity.component,
            scope: newEntity.scope,
        });

        this.template = newEntity.template || '';
        this.markup = newEntity.markup || '';
        this.styles = newEntity.styles || '';
    }


    fromASEID(aseid: string | ASEID): void {
        super.fromASEID(aseid);

        this.template = '';
        this.markup = '';
        this.styles = '';
    }







    async emit(
        event: AreEvent,
    ) {
        this.checkScopeInheritance();

        /**
         * isolated event scope to avoid polluting the node scope
         */
        const eventScope = new A_Scope({
            name: `${event.name}-scope`,
            fragments: [event]
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

    async compile(): Promise<void> {

        this.checkScopeInheritance();

        try {

            await this.call(AreNodeFeatures.onCompile, this.scope);

        } catch (error) {
            throw error;
        }
    }

    async render(): Promise<void> {

        this.checkScopeInheritance();

        try {

            await this.call(AreNodeFeatures.onRender, this.scope);

        } catch (error) {
            throw error;
        }
    }

    async load(): Promise<any> {
        return await super.load(this._scope);
    }

    async destroy(scope?: A_Scope): Promise<any> {

        this.checkScopeInheritance();

        try {

            await super.destroy(scope);

            this._scope.destroy();

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