import { AnimatorState2D } from "./AnimatorState2D";
export declare class AnimatorPlayState2D {
    _finish: boolean;
    _playAllTime: number;
    _frontPlay: boolean;
    get duration(): number;
    get animatorState(): AnimatorState2D;
    constructor();
}
