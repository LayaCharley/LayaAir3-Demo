import { TrailFilter } from "./TrailFilter";
import { TrailRenderer } from "./TrailRenderer";
import { RenderableSprite3D } from "../RenderableSprite3D";
export declare class TrailSprite3D extends RenderableSprite3D {
    get trailFilter(): TrailFilter;
    get trailRenderer(): TrailRenderer;
    constructor(name?: string);
    clear(): void;
}
