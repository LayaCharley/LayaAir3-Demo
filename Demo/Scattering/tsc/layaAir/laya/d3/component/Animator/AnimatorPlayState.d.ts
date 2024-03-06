import { AnimatorState } from "./AnimatorState";
export declare class AnimatorPlayState {
    get currentState(): AnimatorState | null;
    set currentState(value: AnimatorState | null);
    get normalizedTime(): number;
    get duration(): number;
    get animatorState(): AnimatorState;
    constructor();
}
