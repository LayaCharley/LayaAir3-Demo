import { LayaGL } from "../../../layagl/LayaGL";
import { SkinnedMeshSprite3D } from "../../core/SkinnedMeshSprite3D";
import { RenderElementOBJ } from "./RenderElementOBJ";
export class SkinRenderElementOBJ extends RenderElementOBJ {
    constructor() {
        super();
    }
    drawGeometry(shaderIns) {
        let length = this._shaderInstances.length;
        let element = this._geometry.drawParams.elements;
        if (!this.skinnedData)
            return;
        this._geometry.bufferState.bind();
        for (var i = 0, n = length; i < n; i++) {
            for (var j = 0, m = this._geometry.drawParams.length / 2; j < m; j++) {
                var subSkinnedDatas = this.skinnedData[j];
                shaderIns.uploadCustomUniform(SkinnedMeshSprite3D.BONES, subSkinnedDatas);
                var offset = j * 2;
                LayaGL.renderDrawContext.drawElements(this._geometry._glmode, element[offset + 1], this._geometry._glindexFormat, element[offset]);
            }
        }
    }
}

//# sourceMappingURL=SkinRenderElementOBJ.js.map
