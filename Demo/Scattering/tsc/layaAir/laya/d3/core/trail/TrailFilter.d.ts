import { FloatKeyframe } from "../FloatKeyframe";
import { Gradient } from "../Gradient";
import { TrailRenderer } from "./TrailRenderer";
import { TrailAlignment } from "./TrailAlignment";
import { TrailTextureMode } from "../TrailTextureMode";
import { Vector3 } from "../../../maths/Vector3";
export declare class TrailFilter {
    static CURTIME: number;
    static LIFETIME: number;
    static WIDTHCURVE: number;
    static WIDTHCURVEKEYLENGTH: number;
    static __init__(): void;
    _ownerRender: TrailRenderer;
    _lastPosition: Vector3;
    _curtime: number;
    alignment: TrailAlignment;
    get time(): number;
    set time(value: number);
    get minVertexDistance(): number;
    set minVertexDistance(value: number);
    get widthMultiplier(): number;
    set widthMultiplier(value: number);
    get widthCurve(): FloatKeyframe[];
    set widthCurve(value: FloatKeyframe[]);
    get colorGradient(): Gradient;
    set colorGradient(value: Gradient);
    get textureMode(): TrailTextureMode;
    set textureMode(value: TrailTextureMode);
    constructor(owner: TrailRenderer);
    clear(): void;
}