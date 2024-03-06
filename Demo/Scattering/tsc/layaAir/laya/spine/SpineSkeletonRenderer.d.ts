import { Graphics } from "../display/Graphics";
import { SpineTemplet } from "./SpineTemplet";
export declare class SpineSkeletonRenderer {
    premultipliedAlpha: boolean;
    vertexEffect: spine.VertexEffect;
    templet: SpineTemplet;
    private tempColor;
    private tempColor2;
    private vertices;
    private vertexSize;
    private twoColorTint;
    private renderable;
    private clipper;
    private temp;
    private temp2;
    private temp3;
    private temp4;
    constructor(templet: SpineTemplet, twoColorTint?: boolean);
    draw(skeleton: spine.Skeleton, graphics: Graphics, slotRangeStart?: number, slotRangeEnd?: number): void;
}
