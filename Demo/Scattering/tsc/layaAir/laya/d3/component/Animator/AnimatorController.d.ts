import { TypeAnimatorControllerData } from "../../../components/AnimatorControllerParse";
import { Resource } from "../../../resource/Resource";
import { Animator } from "./Animator";
export declare class AnimatorController extends Resource {
    data: TypeAnimatorControllerData;
    clipsID: string[];
    constructor(data: any);
    private getLayers;
    updateTo(a: Animator): void;
    private createState;
    private setExitTransition;
    private setTransitions;
    private getState;
    private addConditions;
}
