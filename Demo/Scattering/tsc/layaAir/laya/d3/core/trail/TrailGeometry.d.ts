import { GeometryElement } from "../GeometryElement";
import { TrailFilter } from "./TrailFilter";
export declare class TrailGeometry extends GeometryElement {
    static ALIGNMENT_VIEW: number;
    static ALIGNMENT_TRANSFORM_Z: number;
    private tmpColor;
    private _disappearBoundsMode;
    constructor(owner: TrailFilter);
    _getType(): number;
    destroy(): void;
    clear(): void;
}
