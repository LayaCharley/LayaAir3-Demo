import { AnimatorControllerLayer2D } from "./AnimatorControllerLayer2D";
import { AnimatorState2D } from "./AnimatorState2D";
import { Component } from "./Component";
import { Animation2DParm } from "./Animation2DParm";
import { AnimatorController2D } from "./AnimatorController2D";
export declare class Animator2D extends Component {
    constructor();
    set controller(val: AnimatorController2D);
    get controller(): AnimatorController2D;
    set parameters(val: Record<string, Animation2DParm>);
    get parameters(): Record<string, Animation2DParm>;
    set speed(num: number);
    get speed(): number;
    get isPlaying(): boolean;
    private _setClipDatasToNode;
    play(name?: string, layerIndex?: number, normalizedTime?: number): void;
    stop(): void;
    onUpdate(): void;
    addControllerLayer(controllderLayer: AnimatorControllerLayer2D): void;
    crossFade(name: string, transitionDuration: number, layerIndex?: number, normalizedTime?: number): boolean;
    getDefaultState(layerIndex?: number): AnimatorState2D;
    setParamsTrigger(name: string): void;
    setParamsNumber(name: string, value: number): void;
    setParamsBool(name: string, value: boolean): void;
    getParamsvalue(name: number): number | boolean;
}
