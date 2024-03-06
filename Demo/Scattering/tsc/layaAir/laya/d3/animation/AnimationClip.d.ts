import { AnimationEvent } from "./AnimationEvent";
import { Resource } from "../../resource/Resource";
import { Handler } from "../../utils/Handler";
export declare class AnimationClip extends Resource {
    static load(url: string, complete: Handler): void;
    islooping: boolean;
    duration(): number;
    constructor();
    private _weightModeHermite;
    private _hermiteInterpolateVector4;
    private _hermiteInterpolateVector2;
    private _hermiteCurveSplineWeight;
    private _curveInterpolate;
    private _evaluateFrameNodeVector3DatasRealTime;
    private _evaluateFrameNodeVector2DatasRealTime;
    private _evaluateFrameNodeVector4DatasRealTime;
    private _evaluateFrameNodeQuaternionDatasRealTime;
    private _binarySearchEventIndex;
    addEvent(event: AnimationEvent): void;
    protected _disposeResource(): void;
}
