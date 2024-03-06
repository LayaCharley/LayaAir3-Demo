import { Vector2 } from "../../../maths/Vector2";
import { Material } from "../../core/material/Material";
import { Lightmap } from "../../core/scene/Lightmap";
import { Bounds } from "../../math/Bounds";
import { HLODBatchMesh } from "./HLODBatchMesh";
export declare class HLODConfig {
    releaseCallTime: number;
    releaseTime: number;
}
export declare class HLODBatchSubMesh {
    bounds: Bounds;
    drawPramas: Vector2;
}
export declare class HLODElement {
    HLODMesh: HLODBatchMesh;
    private _material;
    get material(): Material;
    set material(value: Material);
    private _lightmap;
    get lightmap(): Lightmap;
    set lightmap(value: Lightmap);
    release(): void;
}
export declare class HLODResourceGroup {
    url: string;
    updateMark: number;
    resources: HLODElement[];
    loaded: boolean;
    load(callFun: Function, hlod: any): void;
    release(): void;
}
