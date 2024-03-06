import { Color } from "../../../maths/Color";
import { Vector3 } from "../../../maths/Vector3";
export declare class PixelLineData {
    startPosition: Vector3;
    endPosition: Vector3;
    startColor: Color;
    endColor: Color;
    cloneTo(destObject: PixelLineData): void;
}
