import { FrameAnimation } from "./FrameAnimation";
export declare class EffectAnimation extends FrameAnimation {
    private static EFFECT_BEGIN;
    set target(v: any);
    get target(): any;
    private _onOtherBegin;
    set playEvent(event: string);
    play(start?: any, loop?: boolean, name?: string): void;
    private _recordInitData;
    set effectClass(classStr: string);
    set effectData(uiData: any);
    protected _displayNodeToFrame(node: any, frame: number, targetDic?: any): void;
}
