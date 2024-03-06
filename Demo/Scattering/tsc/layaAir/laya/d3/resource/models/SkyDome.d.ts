import { GeometryElement } from "../../core/GeometryElement";
export declare class SkyDome extends GeometryElement {
    static instance: SkyDome;
    get stacks(): number;
    get slices(): number;
    constructor(stacks?: number, slices?: number);
}
