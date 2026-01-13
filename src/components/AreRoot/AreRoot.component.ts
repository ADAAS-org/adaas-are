import { A_Component } from "@adaas/a-concept";
import { Are } from "../AreComponent/Are.component";



export class AreRoot extends Are{


    async template(): Promise<string> {
        return `<div> Are Root Component</div>`;
    }

}