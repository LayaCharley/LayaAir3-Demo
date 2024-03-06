import { Context } from "../resource/Context";
import { HTMLCanvas } from "../resource/HTMLCanvas";
import { IRenderEngine } from "../RenderEngine/RenderInterface/IRenderEngine";
export declare class Render {
    static is3DMode: boolean;
    static _customRequestAnimationFrame: any;
    static _loopFunction: any;
    private static lastFrm;
    private _first;
    private _startTm;
    static _Render: Render;
    static customRequestAnimationFrame(value: any, loopFun: any): void;
    private static _customEngine;
    static set customRenderEngine(engine: IRenderEngine);
    static get customRenderEngine(): IRenderEngine;
    constructor(width: number, height: number, mainCanv: HTMLCanvas);
    private _timeId;
    private _onVisibilitychange;
    static vsyncTime(): number;
    initRender(canvas: HTMLCanvas, w: number, h: number): boolean;
    private _enterFrame;
    static get context(): Context;
    static get canvas(): any;
}
