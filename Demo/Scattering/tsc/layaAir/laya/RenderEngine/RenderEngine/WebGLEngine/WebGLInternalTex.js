import { FilterMode } from "../../RenderEnum/FilterMode";
import { RenderCapable } from "../../RenderEnum/RenderCapable";
import { RenderParams } from "../../RenderEnum/RenderParams";
import { RenderStatisticsInfo } from "../../RenderEnum/RenderStatInfo";
import { TextureCompareMode } from "../../RenderEnum/TextureCompareMode";
import { WrapMode } from "../../RenderEnum/WrapMode";
import { WebGLExtension } from "./GLEnum/WebGLExtension";
import { GLObject } from "./GLObject";
export class WebGLInternalTex extends GLObject {
    constructor(engine, target, width, height, dimension, mipmap, useSRGBLoader, gammaCorrection) {
        super(engine);
        this._gpuMemory = 0;
        this._baseMipmapLevel = 0;
        this._maxMipmapLevel = 0;
        this.resource = this._gl.createTexture();
        this.width = width;
        this.height = height;
        const isPot = (value) => {
            return (value & (value - 1)) === 0;
        };
        this.isPotSize = isPot(width) && isPot(height);
        this._mipmap = mipmap && this.isPotSize;
        this._mipmapCount = this._mipmap ? Math.max(Math.ceil(Math.log2(width)) + 1, Math.ceil(Math.log2(height)) + 1) : 1;
        this._maxMipmapLevel = this._mipmapCount - 1;
        this._baseMipmapLevel = 0;
        this.useSRGBLoad = useSRGBLoader;
        this.gammaCorrection = gammaCorrection;
        this.target = target;
        this.filterMode = FilterMode.Bilinear;
        this.wrapU = WrapMode.Repeat;
        this.wrapV = WrapMode.Repeat;
        this.wrapW = WrapMode.Repeat;
        this.anisoLevel = 4;
        this.compareMode = TextureCompareMode.None;
    }
    get mipmap() {
        return this._mipmap;
    }
    get mipmapCount() {
        return this._mipmapCount;
    }
    get gpuMemory() {
        return this._gpuMemory;
    }
    set gpuMemory(value) {
        this._engine._addStatisticsInfo(RenderStatisticsInfo.GPUMemory, -this._gpuMemory);
        this._engine._addStatisticsInfo(RenderStatisticsInfo.TextureMemeory, -this._gpuMemory);
        this._gpuMemory = value;
        this._engine._addStatisticsInfo(RenderStatisticsInfo.GPUMemory, this._gpuMemory);
        this._engine._addStatisticsInfo(RenderStatisticsInfo.TextureMemeory, this._gpuMemory);
    }
    get filterMode() {
        return this._filterMode;
    }
    set filterMode(value) {
        if (this._filterMode != value && this.resource) {
            let gl = this._gl;
            let mipmap = this.mipmap;
            let min = this.getFilteMinrParam(value, mipmap);
            this._setTexParameteri(gl.TEXTURE_MIN_FILTER, min);
            let mag = this.getFilterMagParam(value);
            this._setTexParameteri(gl.TEXTURE_MAG_FILTER, mag);
            this._filterMode = value;
        }
    }
    get wrapU() {
        return this._warpU;
    }
    set wrapU(value) {
        if (this._warpU != value && this.resource) {
            let gl = this._gl;
            let warpParam = this.getWrapParam(value);
            this._setWrapMode(gl.TEXTURE_WRAP_S, warpParam);
            this._warpU = value;
        }
    }
    get wrapV() {
        return this._warpV;
    }
    set wrapV(value) {
        if (this._warpV != value && this.resource) {
            let gl = this._gl;
            let warpParam = this.getWrapParam(value);
            this._setWrapMode(gl.TEXTURE_WRAP_T, warpParam);
            this._warpV = value;
        }
    }
    get wrapW() {
        return this._warpW;
    }
    set wrapW(value) {
        if (this._warpW != value && this.resource) {
            if (this._engine.getCapable(RenderCapable.Texture3D)) {
                let gl = this._gl;
                let warpParam = this.getWrapParam(value);
                this._setWrapMode(gl.TEXTURE_WRAP_R, warpParam);
            }
            this._warpW = value;
        }
    }
    get anisoLevel() {
        return this._anisoLevel;
    }
    set anisoLevel(value) {
        let anisoExt = this._engine._supportCapatable.getExtension(WebGLExtension.EXT_texture_filter_anisotropic);
        if (anisoExt) {
            let gl = this._gl;
            let maxAnisoLevel = this._engine.getParams(RenderParams.Max_AnisoLevel_Count);
            let level = Math.max(1, Math.min(maxAnisoLevel, value));
            this._setTexParametexf(anisoExt.TEXTURE_MAX_ANISOTROPY_EXT, level);
            this._anisoLevel = level;
        }
        else {
            this._anisoLevel = 1;
        }
    }
    set baseMipmapLevel(value) {
        if (this._engine.isWebGL2) {
            this._setTexParameteri(this._gl.TEXTURE_BASE_LEVEL, value);
        }
        this._baseMipmapLevel = value;
    }
    get baseMipmapLevel() {
        return this._baseMipmapLevel;
    }
    set maxMipmapLevel(value) {
        if (this._engine.isWebGL2) {
            this._setTexParameteri(this._gl.TEXTURE_MAX_LEVEL, value);
        }
        this._maxMipmapLevel = value;
    }
    get maxMipmapLevel() {
        return this._maxMipmapLevel;
    }
    get compareMode() {
        return this._compareMode;
    }
    set compareMode(value) {
        this._compareMode = value;
    }
    _setTexParameteri(pname, param) {
        let gl = this._gl;
        let target = this.target;
        this._engine._bindTexture(target, this.resource);
        gl.texParameteri(target, pname, param);
        this._engine._bindTexture(target, null);
    }
    _setTexParametexf(pname, param) {
        let gl = this._gl;
        let target = this.target;
        this._engine._bindTexture(target, this.resource);
        gl.texParameterf(target, pname, param);
        this._engine._bindTexture(target, null);
    }
    getFilteMinrParam(filterMode, mipmap) {
        let gl = this._gl;
        switch (filterMode) {
            case FilterMode.Point:
                return mipmap ? gl.NEAREST_MIPMAP_NEAREST : gl.NEAREST;
            case FilterMode.Bilinear:
                return mipmap ? gl.LINEAR_MIPMAP_NEAREST : gl.LINEAR;
            case FilterMode.Trilinear:
                return mipmap ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR;
            default:
                return mipmap ? gl.LINEAR_MIPMAP_NEAREST : gl.LINEAR;
        }
    }
    getFilterMagParam(filterMode) {
        let gl = this._gl;
        switch (filterMode) {
            case FilterMode.Point:
                return gl.NEAREST;
            case FilterMode.Bilinear:
                return gl.LINEAR;
            case FilterMode.Trilinear:
                return gl.LINEAR;
            default:
                return gl.LINEAR;
        }
    }
    getWrapParam(wrapMode) {
        let gl = this._gl;
        switch (wrapMode) {
            case WrapMode.Repeat:
                return gl.REPEAT;
            case WrapMode.Clamp:
                return gl.CLAMP_TO_EDGE;
            case WrapMode.Mirrored:
                return gl.MIRRORED_REPEAT;
            default:
                return gl.REPEAT;
        }
    }
    _setWrapMode(pname, param) {
        let gl = this._gl;
        if (!this.isPotSize) {
            param = gl.CLAMP_TO_EDGE;
        }
        this._setTexParameteri(pname, param);
    }
    dispose() {
        let gl = this._gl;
        gl.deleteTexture(this.resource);
        this._engine._addStatisticsInfo(RenderStatisticsInfo.GPUMemory, -this._gpuMemory);
        this._engine._addStatisticsInfo(RenderStatisticsInfo.TextureMemeory, -this._gpuMemory);
        this._gpuMemory = 0;
    }
}

//# sourceMappingURL=WebGLInternalTex.js.map
