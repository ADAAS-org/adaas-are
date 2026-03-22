import {  A_TYPES__Entity_Serialized } from "@adaas/a-concept";



export type AreInterpolation_Init = {
    /**
     * Tag name where the interpolation was found
     */
    raw: string;
    /**
     * The key inside the interpolation (e.g. "user.name" for {{ user.name }})
     */
    key: string;
    /**
     * Position in the template where this interpolation was found 
     */
    position: number;
} 



export type AreInterpolation_Serialized = {

} & A_TYPES__Entity_Serialized