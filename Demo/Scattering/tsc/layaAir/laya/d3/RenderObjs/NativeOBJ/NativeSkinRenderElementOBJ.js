import { LayaGL } from "../../../layagl/LayaGL";
import { NativeRenderElementOBJ, RenderElementType } from "./NativeRenderElementOBJ";
export class NativeSkinRenderElementOBJ extends NativeRenderElementOBJ {
    constructor() {
        super();
    }
    get skinnedData() {
        return this._skinnedData;
    }
    set skinnedData(data) {
        this._skinnedData = data;
        this._nativeObj._skinnedData = data;
    }
    init() {
        this._nativeObj = new window.conchRenderElement(RenderElementType.Skin, LayaGL.renderEngine._nativeObj);
    }
}

//# sourceMappingURL=NativeSkinRenderElementOBJ.js.map
