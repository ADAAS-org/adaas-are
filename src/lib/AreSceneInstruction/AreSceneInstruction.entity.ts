
import { A_Caller, A_Context, A_Entity, A_Error, A_Feature, A_FormatterHelper, A_Inject, A_Scope } from "@adaas/a-concept";
import { AreSceneInstructionNewProps } from "./AreSceneInstruction.types";
import { AreSceneInstructionFeatures } from "./AreSceneInstruction.constants";
import { AreCacheHelper } from "@adaas/are/helpers/AreChache.helper";
import type { AreNode } from "../AreNode";
import { AreHost } from "../AreHost";



export class AreSceneInstruction<T extends Record<string, any> = Record<string, any>> extends A_Entity<AreSceneInstructionNewProps<T>> {

    name!: string

    protected _payload?: T


    protected _group: string | undefined

    get payload(): T {
        return this._payload || {} as T;
    }

    /**
     * By default all instructions are independent, but if group is provided, it will be used to group instructions together, so they will be applied and reverted together. For example, if we have a CreateElement instruction with group "create-element-1", and we have an AddAttribute instruction with the same group "create-element-1", when we apply the CreateElement instruction, the AddAttribute instruction will be applied as well, and when we revert the CreateElement instruction, the AddAttribute instruction will be reverted as well.
     */
    get group(): string {
        return this.aseid.id
    }


    get id(): string {
        return this.aseid.id;
    }

    get owner(): AreNode {
        return A_Context.scope(this).issuer<AreNode>()!;
    }


    fromNew(newEntity: AreSceneInstructionNewProps<T>): void {

        const identity = newEntity.id || {
            name: newEntity.name,
        };

        const id = AreCacheHelper.createHash(identity);

        this.aseid = this.generateASEID({
            entity: A_FormatterHelper.toKebabCase(newEntity.name),
            id: id,
        });

        this.name = newEntity.name;
        this._payload = newEntity.payload
        this._group = newEntity.group;
    }


    fromUndefined(): void {
        throw new A_Error({
            title: "Cannot create an instruction without properties",
            description: "AreSceneInstruction cannot be created without properties. Please provide the necessary properties to create an instruction.",
        })
    }


    apply(
        scope?: A_Scope
    ): void {
        this.call(AreSceneInstructionFeatures.Apply, scope);
    }

    revert(
        scope?: A_Scope
    ): void {
        this.call(AreSceneInstructionFeatures.Revert, scope);
    }

    // -----------------------------------------------------------------------------------------
    // ----------------------------Are-Instruction Section----------------------------------------
    // -----------------------------------------------------------------------------------------

    @A_Feature.Extend({
        name: AreSceneInstructionFeatures.Apply,
    })
    protected applyInstruction(
        @A_Inject(A_Caller) instruction: AreSceneInstruction,
        @A_Inject(AreHost) host: AreHost,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(A_Feature) feature: A_Feature,
        ...args: any[]
    ) {
        /**
         * So we're looking for any instruction name in the host to be executed.
         */
        feature.chain(host, instruction.name + AreSceneInstructionFeatures.Apply, scope);
    }


    @A_Feature.Extend({
        name: AreSceneInstructionFeatures.Revert,
    })
    protected revertInstruction(
        @A_Inject(A_Caller) instruction: AreSceneInstruction,
        @A_Inject(AreHost) host: AreHost,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(A_Feature) feature: A_Feature,
        ...args: any[]
    ) {
        /**
         * So we're looking for any instruction name in the host to be executed.
         */
        feature.chain(host, instruction.name + AreSceneInstructionFeatures.Revert, scope);
    }

}








