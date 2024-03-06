import { AnimatorStateCondition } from "../../../components/AnimatorStateCondition";
import { AnimatorState } from "./AnimatorState";
export declare class AnimatorTransition {
    constructor();
    get name(): string;
    set name(value: string);
    get mute(): boolean;
    set mute(value: boolean);
    get destState(): AnimatorState;
    set destState(value: AnimatorState);
    get conditions(): AnimatorStateCondition[];
    set conditions(value: AnimatorStateCondition[]);
    get exitByTime(): boolean;
    set exitByTime(value: boolean);
    set transduration(value: number);
    get transduration(): number;
    set transstartoffset(value: number);
    get transstartoffset(): number;
    set exitTime(value: number);
    get exitTime(): number;
    addCondition(condition: AnimatorStateCondition): void;
    removeCondition(condition: AnimatorStateCondition): void;
    check(normalizeTime: number, paramsMap: {
        [key: number]: number | boolean;
    }): boolean;
}
