import { AreSyntaxTokenMatch, AreSyntaxTokenPayload } from "@adaas/are/syntax/AreSyntax.types";
import { AreNodeFeatures, AreNodeStatuses } from "./AreNode.constants";
import { A_TYPES__Entity_Serialized } from "@adaas/a-concept";
import { AreAttribute_Serialized } from "@adaas/are/attribute/AreAttribute.types";
import { AreScene_Serialized } from "@adaas/are/scene/AreScene.types";


export type AreNodeNewProps = AreSyntaxTokenMatch;


export type AreNodeFeatureNames = typeof AreNodeFeatures[keyof typeof AreNodeFeatures];


export type AreNodeStatusNames = typeof AreNodeStatuses[keyof typeof AreNodeStatuses];


/**
 * The structural (runtime-free) serialized form of an AreNode. It captures the full static description of a node — its identity, source delimiters, content/markup, tokenization payload, attributes, nested children and (for root nodes) the compiled instruction plan — so a prebuilt tree can be reconstructed and interpreted without re-scanning the source.
 *
 * [!] Note, runtime-only state is intentionally dropped: the live scope, resolved component, evaluated attribute values and the node `status` are NOT serialized and must be re-established when the tree is reconstructed.
 */
export type AreNode_Serialized = {
    /**
     * The concrete node class discriminator (the runtime constructor name). Used to map a serialized node back to the correct node class during deserialization.
     */
    type: string;
    /**
     * The node type / tag name (the entity part of the ASEID).
     */
    entity: string;
    /**
     * The opening delimiter string that defines the start of the node in the source.
     */
    opening: string;
    /**
     * The closing delimiter string that defines the end of the node in the source.
     */
    closing: string;
    /**
     * The character position of the node within the original source string.
     */
    position: number;
    /**
     * The inner content of the node — the text/markup between the opening and closing delimiters.
     */
    content: string;
    /**
     * The full raw markup string of the node, including delimiters.
     */
    markup: string;
    /**
     * The tokenization payload extracted for the node (id/entity/scope overrides plus any custom data).
     */
    payload?: AreSyntaxTokenPayload;
    /**
     * The structural attributes declared on the node.
     */
    attributes: AreAttribute_Serialized[];
    /**
     * The nested child nodes, serialized recursively.
     */
    children: AreNode_Serialized[];
    /**
     * The compiled instruction plan owned by the node. Present only for nodes that own a scene (root nodes) and only after compilation; otherwise omitted.
     */
    scene?: AreScene_Serialized;
} & A_TYPES__Entity_Serialized;