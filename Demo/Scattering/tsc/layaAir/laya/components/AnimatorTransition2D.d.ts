import { Animation2DParm } from "./Animation2DParm";
import { AnimatorState2D } from "./AnimatorState2D";
import { AnimatorStateCondition } from "./AnimatorStateCondition";
export declare class AnimatorTransition2D {
    mute: boolean;
    exitTime: number;
    exitByTime: boolean;
    transstartoffset: number;
    transduration: number;
    conditions: AnimatorStateCondition[];
    destState: AnimatorState2D;
    constructor();
    addCondition(condition: AnimatorStateCondition): void;
    removeCondition(condition: AnimatorStateCondition): void;
    check(normalizeTime: number, paramsMap: Record<string, Animation2DParm>, isReplay: boolean): boolean;
}
