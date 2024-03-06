import { AnimatorStateScript } from "../d3/animation/AnimatorStateScript";
import { EventDispatcher } from "../events/EventDispatcher";
import { IClone } from "../utils/IClone";
import { AnimationClip2D } from "./AnimationClip2D";
export declare class AnimatorState2D extends EventDispatcher implements IClone {
    cycleOffset: number;
    name: string;
    speed: number;
    clipStart: number;
    clipEnd: number;
    loop: number;
    yoyo: boolean;
    get clip(): AnimationClip2D | null;
    set clip(value: AnimationClip2D | null);
    addScript(type: typeof AnimatorStateScript): AnimatorStateScript;
    getScript(type: typeof AnimatorStateScript): AnimatorStateScript | null;
    getScripts(type: typeof AnimatorStateScript): AnimatorStateScript[] | null;
    clone(): AnimatorState2D;
    cloneTo(destObject: any): void;
    destroy(): void;
}
