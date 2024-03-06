import { ShaderDefines2D } from "../ShaderDefines2D";
import { Value2D } from "../value/Value2D";
import { LayaGL } from "../../../../layagl/LayaGL";
import { RenderParams } from "../../../../RenderEngine/RenderEnum/RenderParams";
import { Const } from "../../../../Const";
export class SkinSV extends Value2D {
    constructor(type) {
        super(ShaderDefines2D.SKINMESH, 0);
        this.offsetX = 300;
        this.offsetY = 0;
        var _vlen = 8 * Const.BYTES_PE;
        const glfloat = LayaGL.renderEngine.getParams(RenderParams.FLOAT);
        this.position = [2, glfloat, false, _vlen, 0];
        this.texcoord = [2, glfloat, false, _vlen, 2 * Const.BYTES_PE];
        this.color = [4, glfloat, false, _vlen, 4 * Const.BYTES_PE];
    }
}

//# sourceMappingURL=SkinSV.js.map
