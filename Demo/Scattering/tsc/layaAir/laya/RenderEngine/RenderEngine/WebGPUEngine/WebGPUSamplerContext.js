import { FilterMode } from "../../RenderEnum/FilterMode";
import { TextureCompareMode } from "../../RenderEnum/TextureCompareMode";
import { WrapMode } from "../../RenderEnum/WrapMode";
import { WebGPUObject } from "./WebGPUObject";
var GPUAddressMode;
(function (GPUAddressMode) {
    GPUAddressMode["Clamp"] = "clamp-to-edge";
    GPUAddressMode["repeat"] = "repeat";
    GPUAddressMode["mirror"] = "mirror-repeat";
})(GPUAddressMode || (GPUAddressMode = {}));
;
var GPUFilterMode;
(function (GPUFilterMode) {
    GPUFilterMode["Nearest"] = "nearest";
    GPUFilterMode["Linear"] = "linear";
})(GPUFilterMode || (GPUFilterMode = {}));
;
var GPUCompareFunction;
(function (GPUCompareFunction) {
    GPUCompareFunction["never"] = "never";
    GPUCompareFunction["less"] = "less";
    GPUCompareFunction["equal"] = "equal";
    GPUCompareFunction["less_equal"] = "less-equal";
    GPUCompareFunction["greater"] = "greater";
    GPUCompareFunction["not_equal"] = "not-equal";
    GPUCompareFunction["greater_equal"] = "greater-equal";
    GPUCompareFunction["always"] = "always";
})(GPUCompareFunction || (GPUCompareFunction = {}));
;
export class WebGPUSamplerContext extends WebGPUObject {
    constructor() {
        super(...arguments);
        this._cacheMap = {};
    }
    createGPUSampler(params) {
        let descriptor = this._getSamplerDescriptor(params);
        return this._engine._device.createSampler(descriptor);
    }
    getcacheSampler(params) {
        let key = this._getCatchWrapKey(params);
        let cachmap = this._cacheMap[key] || (this._cacheMap[key] = {});
        key = params.anisoLevel;
        cachmap = cachmap[key] || (cachmap[key] = {});
        key = params.comparedMode;
        return cachmap[key] || (cachmap[key] = this.createGPUSampler(params));
    }
    _getCatchWrapKey(params) {
        return params.wrapU + (params.warpV << 2) + (params.warpW << 4) + (params.filterMode << 7) + (params.mipmapFilter << 9);
    }
    _anisoLevel() {
    }
    _getSamplerDescriptor(params) {
        let CompareSamplerFun = this._getGPUCompareFunction(params.comparedMode);
        if (CompareSamplerFun)
            return {
                addressModeU: this._getSamplerAddressMode(params.wrapU),
                addressModeV: this._getSamplerAddressMode(params.wrapU),
                addressModeW: this._getSamplerAddressMode(params.warpW),
                magFilter: this._getFilterMode(params.filterMode),
                minFilter: this._getFilterMode(params.filterMode),
                mipmapFilter: this._getFilterMode(params.mipmapFilter),
                compare: CompareSamplerFun,
                maxAnisotropy: params.anisoLevel
            };
        else
            return {
                addressModeU: this._getSamplerAddressMode(params.wrapU),
                addressModeV: this._getSamplerAddressMode(params.wrapU),
                addressModeW: this._getSamplerAddressMode(params.warpW),
                magFilter: this._getFilterMode(params.filterMode),
                minFilter: this._getFilterMode(params.filterMode),
                mipmapFilter: this._getFilterMode(params.mipmapFilter),
                maxAnisotropy: params.anisoLevel
            };
    }
    _getSamplerAddressMode(warpmode) {
        let mode = GPUAddressMode.Clamp;
        switch (warpmode) {
            case WrapMode.Repeat:
                mode = GPUAddressMode.repeat;
                break;
            case WrapMode.Clamp:
                mode = GPUAddressMode.Clamp;
                break;
            case WrapMode.Mirrored:
                mode = GPUAddressMode.mirror;
                break;
        }
        return mode;
    }
    _getFilterMode(mode) {
        switch (mode) {
            case FilterMode.Point:
                return GPUFilterMode.Nearest;
            case FilterMode.Bilinear:
                return GPUFilterMode.Linear;
            default:
                return GPUFilterMode.Nearest;
        }
    }
    _getGPUCompareFunction(comparedMode) {
        switch (comparedMode) {
            case TextureCompareMode.ALWAYS:
                return GPUCompareFunction.always;
            case TextureCompareMode.EQUAL:
                return GPUCompareFunction.equal;
            case TextureCompareMode.GREATER:
                return GPUCompareFunction.greater;
            case TextureCompareMode.GEQUAL:
                return GPUCompareFunction.greater_equal;
            case TextureCompareMode.LESS:
                return GPUCompareFunction.less;
            case TextureCompareMode.LEQUAL:
                return GPUCompareFunction.less_equal;
            case TextureCompareMode.NEVER:
                return GPUCompareFunction.never;
            case TextureCompareMode.NOTEQUAL:
                return GPUCompareFunction.not_equal;
            default:
                return null;
        }
    }
}

//# sourceMappingURL=WebGPUSamplerContext.js.map
