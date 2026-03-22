import { A_Context, A_Entity } from "@adaas/a-concept";
import { AreInterpolation_Init, AreInterpolation_Serialized } from "./AreInterpolation.types";
import type { AreNode } from "@adaas/are/node";
import { AreCacheHelper } from "@adaas/are/helpers/AreChache.helper";
import { AreInterpolationFeatures } from "./AreInterpolation.constants";
import { A_Frame } from "@adaas/a-frame";


export class AreInterpolation extends A_Entity<AreInterpolation_Init, AreInterpolation_Serialized> {

    /**
     * The key inside the interpolation (e.g. "user.name" for {{ user.name }})
     */
    key!: string;
    /**
     * Full raw interpolation (e.g. ' {{ userName }} ')
     */
    raw!: string;
    /**
     * Position in the template where this interpolation was found
     */
    position!: number;
    /**
     * The evaluated value of the attribute, which can be different from the raw value depending on the context and type of the attribute. For example, for a directive like `v-if="condition"`, the raw value is "condition", but the evaluated value would be the result of evaluating "condition" in the current scope.
     */
    value!: any;

    get id(): string {
        return this.aseid.id;
    }

    get scope() {
        return A_Context.scope(this);
    }
    get owner() {
        return this.scope.issuer() as AreNode;
    }

    fromNew(newEntity: AreInterpolation_Init): void {
        const identity = {
            key: newEntity.key,
        };

        const id = AreCacheHelper.createHash(identity);

        this.aseid = this.generateASEID({
            entity: newEntity.key,
            id: id,
        });

        this.key = newEntity.key;
        this.raw = newEntity.raw;
        this.position = newEntity.position;
    }

    @A_Frame.Method({
        description: 'This method should convert the interpolation to set of AreInstructions to prepare for further rendering'
    })
    compile() {
        return this.call(AreInterpolationFeatures.COMPILE)
    }

    update() {
        this.call(AreInterpolationFeatures.UPDATE);
    }

    validate() {
        this.call(AreInterpolationFeatures.VALIDATE);
    }
}
