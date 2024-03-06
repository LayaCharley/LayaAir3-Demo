import { Vector4 } from "../../../maths/Vector4";
import { Material } from "../material/Material";
export declare class PixelLineMaterial extends Material {
    static defaultMaterial: PixelLineMaterial;
    get color(): Vector4;
    set color(value: Vector4);
    constructor();
}
