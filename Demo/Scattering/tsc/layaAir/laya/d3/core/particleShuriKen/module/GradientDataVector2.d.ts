import { Vector2 } from "../../../../maths/Vector2";
import { IClone } from "../../../../utils/IClone";
export declare class GradientDataVector2 implements IClone {
    private _currentLength;
    get gradientCount(): number;
    constructor();
    add(key: number, value: Vector2): void;
    cloneTo(destObject: any): void;
    clone(): any;
}
