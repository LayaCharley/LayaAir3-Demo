import { LayaGL } from "../../../layagl/LayaGL";
import { RenderElement } from "./RenderElement";
export class SkinRenderElement extends RenderElement {
    constructor() {
        super();
    }
    set render(value) {
        this._baseRender = value;
        this._renderElementOBJ._renderShaderData = value._shaderValues;
    }
    get render() {
        return this._baseRender;
    }
    setSkinData(value) {
        this._renderElementOBJ.skinnedData = value;
    }
    _createRenderElementOBJ() {
        this._renderElementOBJ = LayaGL.renderOBJCreate.createSkinRenderElement();
    }
    _render(context) {
        this._renderElementOBJ._render(context);
    }
}

//# sourceMappingURL=SkinRenderElement.js.map
