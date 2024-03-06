import { SingletonList } from "../../../utils/SingletonList";
export class WGPURenderElementObJ {
    constructor() {
        this._shaderInstances = new SingletonList();
    }
    _render(context) {
        var forceInvertFace = context.invertY;
        var updateMark = context.cameraUpdateMark;
        var sceneID = context.sceneID;
        var renderEncoder = context.commandEncoder;
        var sceneShaderData = context.sceneShaderData;
        var cameraShaderData = context.cameraShaderData;
        if (this._isRender) {
            var passes = this._shaderInstances.elements;
            for (var j = 0, m = this._shaderInstances.length; j < m; j++) {
                const shaderIns = passes[j];
                if (!shaderIns.complete)
                    continue;
                let targets = context.internalRT;
                let blendState = shaderIns.getBlendState(this._materialShaderData);
                let depthStencilState = shaderIns.getDepthStencilState(this._materialShaderData, targets);
                let primitiveState = shaderIns.getPrimitiveState(this._materialShaderData, forceInvertFace, this._invertFront, this._geometry.mode, this._geometry.indexFormat);
                let val = shaderIns.getVertexAttributeLayout(this._geometry.bufferState.vertexlayout);
                let pipeline = shaderIns.getGPURenderPipeline(blendState, depthStencilState, primitiveState, val, targets);
                renderEncoder.setPipeline(pipeline);
                var switchUpdateMark = (updateMark !== shaderIns._uploadMark);
                var uploadScene = (shaderIns._uploadScene !== sceneID) || switchUpdateMark;
                if (uploadScene) {
                    sceneShaderData && shaderIns.uploadUniforms(shaderIns._sceneUniformParamsMap, sceneShaderData, renderEncoder);
                    shaderIns._uploadScene = sceneID;
                }
                if (this._renderShaderData) {
                    var uploadSprite3D = (shaderIns._uploadRender !== this._renderShaderData) || switchUpdateMark;
                    if (uploadSprite3D) {
                        shaderIns.uploadUniforms(shaderIns._spriteUniformParamsMap, this._renderShaderData, renderEncoder);
                        shaderIns._uploadRender = this._renderShaderData;
                    }
                }
                var uploadCamera = shaderIns._uploadCameraShaderValue !== cameraShaderData || switchUpdateMark;
                if (uploadCamera) {
                    cameraShaderData && shaderIns.uploadUniforms(shaderIns._cameraUniformParamsMap, cameraShaderData, renderEncoder);
                    shaderIns._uploadCameraShaderValue = cameraShaderData;
                }
                var uploadMaterial = (shaderIns._uploadMaterial !== this._materialShaderData) || switchUpdateMark;
                if (uploadMaterial) {
                    shaderIns.uploadUniforms(shaderIns._materialUniformParamsMap, this._materialShaderData, renderEncoder);
                    shaderIns._uploadMaterial = this._materialShaderData;
                    context.globalShaderData && shaderIns.uploadUniforms(shaderIns._materialUniformParamsMap, context.globalShaderData, renderEncoder);
                }
                renderEncoder.applyGeometry(this._geometry);
            }
        }
    }
    _addShaderInstance(shader) {
        this._shaderInstances.add(shader);
    }
    _clearShaderInstance() {
        this._shaderInstances.length = 0;
    }
    _destroy() {
        throw new Error("Method not implemented.");
    }
}

//# sourceMappingURL=WGPURenderElementObJ.js.map
