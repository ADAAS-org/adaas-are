import { A_Context, A_Entity, A_Feature } from "@adaas/a-concept";
import { AreAttribute_Init, AreAttribute_Serialized } from "./AreAttribute.types";
import type { AreNode } from "../AreNode";
import { AreCacheHelper } from "@adaas/are/helpers/AreChache.helper";
import { A_Frame } from "@adaas/a-frame";
import { AreAttributeFeatures } from "./AreAttribute.constants";



export class AreAttribute extends A_Entity<AreAttribute_Init, AreAttribute_Serialized> {

    /**
     * Property name (e.g. "label")
     */
    name!: string;
    /**
     * Full raw attribute (e.g. ' :label="buttonLabel" ')
     */
    raw!: string;
    /**
     * Attribute content (e.g. "buttonLabel")
     * Example: For a directive like `v-if="condition"`, the raw value is "condition", but the content would be "condition" without the quotes, and the value would be the result of evaluating "condition" in the current scope.
     */
    content!: string;
    /**
     * The evaluated value of the attribute, which can be different from the raw value depending on the context and type of the attribute. For example, for a directive like `v-if="condition"`, the raw value is "condition", but the evaluated value would be the result of evaluating "condition" in the current scope.
     */
    value!: any;
    /**
     * The prefix of the attribute, for example for ':label' it would be ':', for 'v-if' it would be 'v-'. This can be used to determine the type of the attribute and how to process it.
     */
    prefix!: string;


    get scope() {
        return A_Context.scope(this);
    }

    get owner() {
        return this.scope.issuer() as AreNode;
    }


    fromNew(newEntity: AreAttribute_Init): void {
        const identity = {
            name: newEntity.name,
            prefix: newEntity.prefix,
            content: newEntity.content,
        };

        const id = AreCacheHelper.createHash(identity);

        this.aseid = this.generateASEID({
            entity: newEntity.name,
            id: id,
        });

        this.name = newEntity.name;
        this.prefix = newEntity.prefix;
        this.raw = newEntity.raw;
        this.content = newEntity.content;
    }


    init() {
        this.call('_AreAttribute_init');
    }

    @A_Frame.Method({
        description: "Compile the attribute. This method should transform attribute details into a set of SceneInstructions. It may also modify attribute value, since this field is editable during runtime.",
    })
    compile() {
        this.call(AreAttributeFeatures.COMPILE);
    }


    update() {
        this.call(AreAttributeFeatures.UPDATE);
    }


    validate(): void {
        this.call(AreAttributeFeatures.VALIDATE);
    }

}