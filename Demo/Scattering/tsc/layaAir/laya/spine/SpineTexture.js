import { FilterMode } from "../RenderEngine/RenderEnum/FilterMode";
import { WrapMode } from "../RenderEngine/RenderEnum/WrapMode";
export class SpineTexture {
    constructor(tex) {
        this.realTexture = tex;
    }
    getImage() {
        var _a, _b, _c, _d;
        return {
            width: (_b = ((_a = this.realTexture) === null || _a === void 0 ? void 0 : _a.sourceWidth)) !== null && _b !== void 0 ? _b : 16,
            height: (_d = ((_c = this.realTexture) === null || _c === void 0 ? void 0 : _c.sourceHeight)) !== null && _d !== void 0 ? _d : 16,
        };
    }
    setFilters(minFilter, magFilter) {
        if (!this.realTexture)
            return;
        let filterMode;
        if (magFilter === spine.TextureFilter.Nearest)
            filterMode = FilterMode.Point;
        else
            filterMode = FilterMode.Bilinear;
        this.realTexture.bitmap.filterMode = filterMode;
    }
    convertWrapMode(mode) {
        return mode == spine.TextureWrap.ClampToEdge ? WrapMode.Clamp : (mode == spine.TextureWrap.MirroredRepeat ? WrapMode.Mirrored : WrapMode.Repeat);
    }
    setWraps(uWrap, vWrap) {
        if (!this.realTexture)
            return;
        let tex2D = this.realTexture.bitmap;
        tex2D.wrapModeU = this.convertWrapMode(uWrap);
        tex2D.wrapModeV = this.convertWrapMode(vWrap);
    }
}

//# sourceMappingURL=SpineTexture.js.map
