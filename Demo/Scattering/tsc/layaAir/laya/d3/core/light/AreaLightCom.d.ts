import { Vector2 } from "../../../maths/Vector2";
import { Light, LightMode } from "./Light";
export declare enum AreaShape {
    rectangle = 0,
    ellipse = 1
}
export declare class AreaLightCom extends Light {
    constructor();
    get lightmapBakedType(): LightMode;
    set lightmapBakedType(value: LightMode);
    get shape(): AreaShape;
    set shape(value: AreaShape);
    set power(value: number);
    get power(): number;
    set size(value: Vector2);
    get size(): Vector2;
    set spread(value: number);
    get spread(): number;
    set maxBounces(value: number);
    get maxBounces(): number;
}
