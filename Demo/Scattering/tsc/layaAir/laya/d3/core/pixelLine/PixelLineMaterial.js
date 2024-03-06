import { Vector4 } from "../../../maths/Vector4";
import { Shader3D } from "../../../RenderEngine/RenderShader/Shader3D";
import { Material } from "../material/Material";
export class PixelLineMaterial extends Material {
    constructor() {
        super();
        this.setShaderName("LineShader");
        this._shaderValues.setVector(PixelLineMaterial.COLOR, new Vector4(1.0, 1.0, 1.0, 1.0));
    }
    static __initDefine__() {
        PixelLineMaterial.COLOR = Shader3D.propertyNameToID("u_Color");
    }
    get color() {
        return this._shaderValues.getVector(PixelLineMaterial.COLOR);
    }
    set color(value) {
        this._shaderValues.setVector(PixelLineMaterial.COLOR, value);
    }
    clone() {
        var dest = new PixelLineMaterial();
        this.cloneTo(dest);
        return dest;
    }
}

//# sourceMappingURL=PixelLineMaterial.js.map
