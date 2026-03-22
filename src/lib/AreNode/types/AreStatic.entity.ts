import { A_Context, A_Entity, A_Error, A_Scope, A_TypeGuards, ASEID } from "@adaas/a-concept";
import { AreNodeNewProps } from "../AreNode.types";
import { AreEvent } from "@adaas/are/event";
import { AreNodeFeatures } from "../AreNode.constants";
import { AreScene } from "@adaas/are/scene";
import { A_Frame } from "@adaas/a-frame";
import { AreStore } from "@adaas/are/store";
import { AreProps } from "@adaas/are/props";
import { AreAttribute } from "@adaas/are/attribute";
import { AreInterpolation } from "@adaas/are/interpolation";
import { AreNode } from "../AreNode.entity";


@A_Frame.Entity({
    namespace: 'A-ARE',
    name: 'AreNode',
    description: 'An AreStaticNode entity represents a static node within the A-Concept Rendering Engine (ARE) framework. This node does not have '
})
export class AreStaticNode extends AreNode {
}