import { A_Caller, A_Component, A_Context, A_Feature, A_Inject, A_Meta, A_TYPES__Ctor } from "@adaas/a-concept";
import { AreDirectiveFeatures } from "./AreDirective.constants";
import { AreAttribute, AreDirectiveAttribute } from "../AreAttribute";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { AreDirectiveMeta } from "./AreDirective.meta";
import { AreDirectiveOrderDecoratorParameters } from "./AreDirective.types";


@A_Meta.Define(AreDirectiveMeta)
export class AreDirective extends A_Component {

    //==================================================================================
    //======================== LIFECYCLE DECORATORS ====================================
    //==================================================================================

    static Order(priority: number) {
        return function <TTarget extends A_TYPES__Ctor<AreDirective>>(
            target: TTarget
        ): TTarget {
            // Store meta info on the target class itself for the Meta decorator to pick up
            const meta = A_Context.meta<AreDirectiveMeta>(target);

            meta.priority = priority;

            return target;
        };
    }


    /**
     * Allows to define a custom method for compiling a directive attribute into a set of SceneInstructions. 
     * Can be used at any component to extend this logic not only for a AreDirective inherited.
     */
    static get Compile() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreDirectiveFeatures.Compile,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }

    /**
     * Allows to define a custom method for updating a directive attribute based on changes in the store or other dependencies.
     * Can be used at any component to extend this logic not only for a AreDirective inherited.
     */
    static get Update() {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            return A_Feature.Extend({
                name: AreDirectiveFeatures.Update,
                scope: [target.constructor],
            })(target, propertyKey, descriptor);
        }
    }

    /**
     * Default compile method for directives, which can be overridden by specific directive implementations.
     * 
     * @param attribute The directive attribute to compile, which contains all the information about the directive as defined in the template (e.g. name, raw content, evaluated value, etc.)
     * @param args Additional arguments that may be required for the compilation process.
     */
    @A_Feature.Extend({
        name: AreDirectiveFeatures.Compile,
        scope: [AreDirective],
    })
    compile(
        @A_Inject(A_Caller) attribute: AreDirectiveAttribute,
        ...args: any[]
    ) {
        const logger = A_Context.scope(this).resolve(A_Logger) as A_Logger | undefined
        if (logger) {
            logger.warning(`No compiling logic defined for directive: ${attribute.name} with content: ${attribute.content}`);
        }
    }

    /**
     * Default update method for directives, which can be overridden by specific directive implementations. This method is called when there are changes in the store or other dependencies that may affect the directive's behavior or appearance. The method should contain logic to update the directive accordingly, such as re-evaluating its value, modifying the DOM, or triggering re-rendering of the affected nodes.
     * 
     * @param attribute 
     * @param args 
     */
    @A_Feature.Extend({
        name: AreDirectiveFeatures.Update,
        scope: [AreDirective],
    })
    update(
        @A_Inject(A_Caller) attribute: AreDirectiveAttribute,
        ...args: any[]
    ) {
        const logger = A_Context.scope(this).resolve(A_Logger) as A_Logger | undefined
        if (logger) {
            logger.warning(`No update logic defined for directive: ${attribute.name} with content: ${attribute.content}`);
        }
    }
}