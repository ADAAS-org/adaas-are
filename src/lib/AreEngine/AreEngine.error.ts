import { A_Error } from "@adaas/a-concept"



export class AreEngineError extends A_Error{


    static readonly MissedRequiredDependency = 'A Required Dependency is missing in AreEngine';
}