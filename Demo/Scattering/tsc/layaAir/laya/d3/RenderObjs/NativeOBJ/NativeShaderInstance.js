import { LayaGL } from "../../../layagl/LayaGL";
var UniformParamsMapType;
(function (UniformParamsMapType) {
    UniformParamsMapType[UniformParamsMapType["Scene"] = 0] = "Scene";
    UniformParamsMapType[UniformParamsMapType["Camera"] = 1] = "Camera";
    UniformParamsMapType[UniformParamsMapType["Sprite"] = 2] = "Sprite";
    UniformParamsMapType[UniformParamsMapType["Material"] = 3] = "Material";
})(UniformParamsMapType || (UniformParamsMapType = {}));
export class NativeShaderInstance {
    constructor(vs, ps, attributeMap, shaderPass) {
        this._shaderPass = shaderPass;
        var pConchAttributeMap = new window.conchAttributeMap();
        for (var k in attributeMap) {
            pConchAttributeMap.setAttributeValue(k, attributeMap[k][0]);
        }
        var stateMap = {};
        for (var s in stateMap) {
            pConchAttributeMap.setStateValue(parseInt(s), stateMap[s]);
        }
        pConchAttributeMap.statefirst = this._shaderPass.statefirst;
        var renderState = shaderPass.renderState;
        this._nativeObj = new window.conchShaderInstance(LayaGL.renderEngine._nativeObj, vs, ps, pConchAttributeMap, renderState._nativeObj);
    }
    _disposeResource() {
        this._nativeObj.destroy();
    }
    bind() {
        return this._nativeObj.bind();
    }
    uploadUniforms(shaderUniform, shaderDatas, uploadUnTexture) {
        this._nativeObj.uploadUniforms(shaderUniform, shaderDatas._nativeObj, uploadUnTexture);
    }
    uploadCustomUniform(index, data) {
        this._nativeObj.uploadCustomUniforms(index, data);
    }
    get _sceneUniformParamsMap() {
        return UniformParamsMapType.Scene;
    }
    get _cameraUniformParamsMap() {
        return UniformParamsMapType.Camera;
    }
    get _spriteUniformParamsMap() {
        return UniformParamsMapType.Sprite;
    }
    get _materialUniformParamsMap() {
        return UniformParamsMapType.Material;
    }
    uploadRenderStateBlendDepth(shaderDatas) {
        this._nativeObj.uploadRenderStateBlendDepth(shaderDatas._nativeObj);
    }
    uploadRenderStateFrontFace(shaderDatas, isTarget, invertFront) {
        this._nativeObj.uploadRenderStateFrontFace(shaderDatas._nativeObj, isTarget, invertFront);
    }
}

//# sourceMappingURL=NativeShaderInstance.js.map
