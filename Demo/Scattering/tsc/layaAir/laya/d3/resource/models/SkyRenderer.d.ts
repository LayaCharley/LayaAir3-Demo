import { GeometryElement } from "../../core/GeometryElement";
import { Material } from "../../core/material/Material";
export declare class SkyRenderer {
    private _renderData;
    static SUNLIGHTDIRECTION: number;
    static SUNLIGHTDIRCOLOR: number;
    static __init__(): void;
    get material(): Material;
    set material(value: Material);
    get mesh(): GeometryElement;
    set mesh(value: GeometryElement);
    constructor();
}
