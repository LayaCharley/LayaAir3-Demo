import { GradientColor } from "./GradientColor";
export declare class ColorOverLifetime {
    private _color;
    enable: boolean;
    get color(): GradientColor;
    constructor(color: GradientColor);
    cloneTo(destObject: any): void;
    clone(): any;
}
