import { ShadowMode } from "./ShadowMode";
import { Component } from "../../../components/Component";
import { Color } from "../../../maths/Color";
import { Matrix4x4 } from "../../../maths/Matrix4x4";
export declare enum LightType {
    Directional = 0,
    Spot = 1,
    Point = 2,
    Area = 3
}
export declare enum LightMode {
    mix = 0,
    realTime = 1,
    bakeOnly = 2
}
export declare class Light extends Component {
    color: Color;
    get intensity(): number;
    set intensity(value: number);
    get shadowMode(): ShadowMode;
    set shadowMode(value: ShadowMode);
    get shadowDistance(): number;
    set shadowDistance(value: number);
    get shadowResolution(): number;
    set shadowResolution(value: number);
    get shadowDepthBias(): number;
    set shadowDepthBias(value: number);
    get shadowNormalBias(): number;
    set shadowNormalBias(value: number);
    get shadowStrength(): number;
    set shadowStrength(value: number);
    get shadowNearPlane(): number;
    set shadowNearPlane(value: number);
    get lightmapBakedType(): LightMode;
    set lightmapBakedType(value: LightMode);
    get lightWorldMatrix(): Matrix4x4;
    get lightType(): LightType;
    constructor();
    protected _onEnable(): void;
    protected _onDisable(): void;
    protected _onDestroy(): void;
}
