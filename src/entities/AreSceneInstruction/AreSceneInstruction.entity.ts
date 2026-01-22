
import { A_Context, A_Entity, A_FormatterHelper, A_Scope } from "@adaas/a-concept";
import { AreSceneInstructionNewProps } from "./AreSceneInstruction.types";
import { AreNode } from "../AreNode/AreNode.entity";
import { AreDirective } from "@adaas/are/context/AreSyntax/AreSyntax.context";
import { AreSceneInstructionFeatures } from "./AreSceneInstruction.constants";
import { AreScene } from "@adaas/are/context/AreScene/AreScene.context";



export class AreSceneInstruction<T extends Record<string, any> = Record<string, any>> extends A_Entity<AreSceneInstructionNewProps<T>> {

    action!: string
    node!: AreNode

    params?: T


    hashSource!: string


    get scene(): AreScene {
        return A_Context.scope(this).resolve(AreScene)!
    }

    /**
     * Generates even hash uses for deduplication
     * 
     * @param str 
     */
    protected createHash(str?: string): string
    protected createHash(str?: undefined): string
    protected createHash(str?: Record<string, any>): string
    protected createHash(str?: Array<any>): string
    protected createHash(str?: number): string
    protected createHash(str?: boolean): string
    protected createHash(str?: null): string
    protected createHash(map?: Map<any, any>): string
    protected createHash(set?: Set<any>): string
    protected createHash(str?: any): string {
        let hashSource: string;

        if (str instanceof Map) {
            hashSource = JSON.stringify(Array.from(str.entries()));
        } else if (str instanceof Set) {
            hashSource = JSON.stringify(Array.from(str.values()));
        } else {
            switch (typeof str) {
                case 'string':
                    hashSource = str;
                    break;
                case 'undefined':
                    hashSource = 'undefined';
                    break;
                case 'object':
                    hashSource = JSON.stringify(str);
                    break;
                case 'number':
                    hashSource = str.toString();
                    break;
                case 'boolean':
                    hashSource = str ? 'true' : 'false';
                    break;
                case 'function':
                    hashSource = str.toString();
                    break;
                default:
                    hashSource = String(str);
            }
        }

        let hash = 0, i, chr;
        for (i = 0; i < hashSource.length; i++) {
            chr = hashSource.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }

        const hashString = hash.toString();

        return hashString;
    }

    fromNew(newEntity: AreSceneInstructionNewProps<T>): void {
        const identity = newEntity.id || {
            name: newEntity.action,
            node: newEntity.node.aseid.toString(),
        };

        const id = this.createHash(identity);


        this.aseid = this.generateASEID({
            entity: A_FormatterHelper.toKebabCase(newEntity.action),
            id: id,
        });

        this.action = newEntity.action;
        this.node = newEntity.node;
        this.params = newEntity.params;

    }


    update(params: Partial<T>): void {
        this.params = {
            ...this.params,
            ...params,
        } as T;
    }


    async init(
        scope?: A_Scope
    ): Promise<void> {
        try {
            await this.call(AreSceneInstructionFeatures.Init, scope);
        } catch (error) {
            
        }
    }

    async apply(
        scope?: A_Scope
    ): Promise<void> {
        try {
            await this.call(AreSceneInstructionFeatures.Apply, scope);
        } catch (error) {

        }
    }

    async revert(
        scope?: A_Scope
    ): Promise<void> {
        try {
            await this.call(AreSceneInstructionFeatures.Revert, scope);
        } catch (error) {

        }
    }


}








