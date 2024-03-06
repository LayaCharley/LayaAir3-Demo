import { LayaGL } from "../../../layagl/LayaGL";
import { UploadMemoryManager } from "../../../RenderEngine/RenderEngine/NativeGLEngine/CommonMemory/UploadMemoryManager";
import { SingletonList } from "../../../utils/SingletonList";
export var RenderElementType;
(function (RenderElementType) {
    RenderElementType[RenderElementType["Base"] = 0] = "Base";
    RenderElementType[RenderElementType["Skin"] = 1] = "Skin";
    RenderElementType[RenderElementType["Instance"] = 2] = "Instance";
})(RenderElementType || (RenderElementType = {}));
export class NativeRenderElementOBJ {
    constructor() {
        this._shaderInstances = new SingletonList();
        this.init();
    }
    set _geometry(data) {
        this.geometry = data;
        this._nativeObj._geometry = data._nativeObj;
    }
    get _geometry() {
        return this.geometry;
    }
    set _materialShaderData(data) {
        this.materialShaderData = data;
        this._nativeObj._materialShaderData = data ? data._nativeObj : null;
    }
    get _materialShaderData() {
        return this.materialShaderData;
    }
    set _renderShaderData(data) {
        this.renderShaderData = data;
        this._nativeObj._renderShaderData = data ? data._nativeObj : null;
    }
    get _renderShaderData() {
        return this.renderShaderData;
    }
    set _transform(data) {
        this.transform = data;
        this._nativeObj._transform = data ? data._nativeObj : null;
    }
    get _transform() {
        return this.transform;
    }
    get _isRender() {
        return this._nativeObj._isRender;
    }
    set _isRender(data) {
        this._nativeObj._isRender = data;
    }
    get _invertFront() {
        return this._nativeObj._invertFront;
    }
    set _invertFront(data) {
        this._nativeObj._invertFront = data;
    }
    init() {
        this._nativeObj = new window.conchRenderElement(RenderElementType.Base, LayaGL.renderEngine._nativeObj);
    }
    _addShaderInstance(shader) {
        this._shaderInstances.add(shader);
        this._nativeObj._addShaderInstance(shader._nativeObj);
    }
    _clearShaderInstance() {
        this._shaderInstances.length = 0;
        this._nativeObj._clearShaderInstance();
    }
    _render(context) {
        UploadMemoryManager.syncRenderMemory();
        this._nativeObj._render(context._nativeObj);
    }
    _destroy() {
        this._nativeObj._destroy();
        this.geometry = null;
        this._shaderInstances = null;
        this.materialShaderData = null;
        this.renderShaderData = null;
        this.transform = null;
    }
}

//# sourceMappingURL=NativeRenderElementOBJ.js.map
