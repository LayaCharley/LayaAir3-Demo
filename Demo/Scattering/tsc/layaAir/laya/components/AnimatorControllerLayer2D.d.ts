import { IClone } from "../utils/IClone";
import { AnimatorPlayState2D } from "./AnimatorPlayState2D";
import { AnimatorState2D } from "./AnimatorState2D";
export declare class AnimatorControllerLayer2D implements IClone {
    static BLENDINGMODE_OVERRIDE: number;
    static BLENDINGMODE_ADDTIVE: number;
    name: string;
    playOnWake: boolean;
    defaultWeight: number;
    blendingMode: number;
    enable: boolean;
    constructor(name: string);
    set states(states: ReadonlyArray<AnimatorState2D>);
    get states(): ReadonlyArray<AnimatorState2D>;
    set defaultStateName(str: string);
    get defaultStateName(): string;
    get defaultState(): AnimatorState2D;
    set defaultState(value: AnimatorState2D);
    private _removeClip;
    getCurrentPlayState(): AnimatorPlayState2D;
    getStateByName(str: string): AnimatorState2D;
    addState(state: AnimatorState2D): void;
    removeState(state: AnimatorState2D): void;
    clone(): AnimatorControllerLayer2D;
    cloneTo(destObject: any): void;
    destroy(): void;
}
