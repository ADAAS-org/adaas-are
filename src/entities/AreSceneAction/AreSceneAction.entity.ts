
import { A_Entity, A_FormatterHelper } from "@adaas/a-concept";
import { AreSceneActionNewProps } from "./AreSceneAction.types";
import { AreNode } from "../AreNode/AreNode.entity";



export class AreSceneAction<T extends any = Record<string, any>> extends A_Entity<AreSceneActionNewProps<T>> {

    name!: string
    node!: AreNode

    params?: T


    hashSource!: string

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

    fromNew(newEntity: AreSceneActionNewProps<T>): void {
        const identity = newEntity.id || {
            name: newEntity.action,
            node: newEntity.node.aseid.toString(),
        };

        const id = this.createHash(identity);


        this.aseid = this.generateASEID({
            entity: A_FormatterHelper.toKebabCase(newEntity.action),
            id: id,
        });

        this.name = newEntity.action;
        this.node = newEntity.node;
        this.params = newEntity.params;

    }
}




export class AreMountSceneAction extends AreSceneAction { }


export class AreListenerSceneAction extends AreSceneAction<{
    event: string;
    handler: Function;
}> {


    get event(): string {
        return this.params!.event;
    }

    get handler(): Function {
        return this.params!.handler;
    }
}

