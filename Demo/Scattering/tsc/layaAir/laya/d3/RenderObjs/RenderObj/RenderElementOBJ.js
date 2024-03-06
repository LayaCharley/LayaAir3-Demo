import { LayaGL } from "../../../layagl/LayaGL";
import { SingletonList } from "../../../utils/SingletonList";
export class RenderElementOBJ {
    constructor() {
        this._shaderInstances = new SingletonList();
    }
    _addShaderInstance(shader) {
        this._shaderInstances.add(shader);
    }
    _clearShaderInstance() {
        this._shaderInstances.length = 0;
    }
    _render(context) {
        var forceInvertFace = context.invertY;
        var updateMark = context.cameraUpdateMark;
        var sceneID = context.sceneID;
        var sceneShaderData = context.sceneShaderData;
        var cameraShaderData = context.cameraShaderData;
        if (this._isRender) {
            var passes = this._shaderInstances.elements;
            for (var j = 0, m = this._shaderInstances.length; j < m; j++) {
                const shaderIns = passes[j];
                if (!shaderIns.complete)
                    continue;
                var switchShader = shaderIns.bind();
                var switchUpdateMark = (updateMark !== shaderIns._uploadMark);
                var uploadScene = (shaderIns._uploadScene !== sceneID) || switchUpdateMark;
                if (uploadScene || switchShader) {
                    sceneShaderData && shaderIns.uploadUniforms(shaderIns._sceneUniformParamsMap, sceneShaderData, uploadScene);
                    shaderIns._uploadScene = sceneID;
                }
                if (this._renderShaderData) {
                    var uploadSprite3D = (shaderIns._uploadRender !== this._renderShaderData) || switchUpdateMark;
                    if (uploadSprite3D || switchShader) {
                        shaderIns.uploadUniforms(shaderIns._spriteUniformParamsMap, this._renderShaderData, uploadSprite3D);
                        shaderIns._uploadRender = this._renderShaderData;
                    }
                }
                var uploadCamera = shaderIns._uploadCameraShaderValue !== cameraShaderData || switchUpdateMark;
                if (uploadCamera || switchShader) {
                    cameraShaderData && shaderIns.uploadUniforms(shaderIns._cameraUniformParamsMap, cameraShaderData, uploadCamera);
                    shaderIns._uploadCameraShaderValue = cameraShaderData;
                }
                var uploadMaterial = (shaderIns._uploadMaterial !== this._materialShaderData) || switchUpdateMark;
                if (uploadMaterial || switchShader) {
                    shaderIns.uploadUniforms(shaderIns._materialUniformParamsMap, this._materialShaderData, uploadMaterial);
                    shaderIns._uploadMaterial = this._materialShaderData;
                    context.globalShaderData && shaderIns.uploadUniforms(shaderIns._materialUniformParamsMap, context.globalShaderData, uploadMaterial);
                }
                shaderIns.uploadRenderStateBlendDepth(this._materialShaderData);
                shaderIns.uploadRenderStateFrontFace(this._materialShaderData, forceInvertFace, this._invertFront);
                this.drawGeometry(shaderIns);
            }
        }
    }
    drawGeometry(shaderIns) {
        LayaGL.renderDrawContext.drawGeometryElement(this._geometry);
    }
    _destroy() {
        this._geometry = null;
        this._shaderInstances = null;
        this._materialShaderData = null;
        this._renderShaderData = null;
        this._transform = null;
        this._isRender = null;
    }
}

//# sourceMappingURL=RenderElementOBJ.js.map
