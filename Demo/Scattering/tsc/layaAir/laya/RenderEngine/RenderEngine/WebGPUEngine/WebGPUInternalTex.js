import { FilterMode } from "../../RenderEnum/FilterMode";
import { TextureCompareMode } from "../../RenderEnum/TextureCompareMode";
import { WrapMode } from "../../RenderEnum/WrapMode";
import { WebGPUObject } from "./WebGPUObject";
export class WebGPUInternalTex extends WebGPUObject {
    constructor(engine, width, height, dimension, mipmap) {
        super(engine);
        this.width = width;
        this.height = height;
        this.mipmap = mipmap;
        this.webGPUSamplerParams = {
            comparedMode: TextureCompareMode.None,
            wrapU: WrapMode.Repeat,
            warpV: WrapMode.Repeat,
            warpW: WrapMode.Repeat,
            mipmapFilter: FilterMode.Bilinear,
            filterMode: FilterMode.Bilinear,
            anisoLevel: 1
        };
        this.webgpuSampler = this._engine._samplerContext.getcacheSampler(this.webGPUSamplerParams);
    }
    get textureView() {
        let des = {
            mipLevelCount: 0,
        };
        if (!this.view) {
            this.view = this.resource.createView();
        }
        return this.view;
    }
    releaseTexture(texture) {
    }
    get filterMode() {
        return this._filterMode;
    }
    set filterMode(value) {
        if (this._filterMode != value && this.resource) {
            switch (value) {
                case FilterMode.Point:
                    this.webGPUSamplerParams.filterMode = FilterMode.Point;
                    this.webGPUSamplerParams.mipmapFilter = FilterMode.Point;
                    break;
                case FilterMode.Bilinear:
                    this.webGPUSamplerParams.filterMode = FilterMode.Bilinear;
                    this.webGPUSamplerParams.mipmapFilter = FilterMode.Point;
                    break;
                case FilterMode.Trilinear:
                    this.webGPUSamplerParams.filterMode = FilterMode.Bilinear;
                    this.webGPUSamplerParams.mipmapFilter = FilterMode.Bilinear;
                    break;
            }
            this.webgpuSampler = this._engine._samplerContext.getcacheSampler(this.webGPUSamplerParams);
            this._filterMode = value;
        }
    }
    get wrapU() {
        return this._warpU;
    }
    set wrapU(value) {
        if (this._warpU != value && this.resource) {
            this.webGPUSamplerParams.wrapU = value;
            this.webgpuSampler = this._engine._samplerContext.getcacheSampler(this.webGPUSamplerParams);
            this._warpU = value;
        }
    }
    get wrapV() {
        return this._warpV;
    }
    set wrapV(value) {
        if (this._warpV != value && this.resource) {
            this.webGPUSamplerParams.warpV = value;
            this.webgpuSampler = this._engine._samplerContext.getcacheSampler(this.webGPUSamplerParams);
            this._warpV = value;
        }
    }
    get wrapW() {
        return this._warpW;
    }
    set wrapW(value) {
        if (this._warpW != value && this.resource) {
            this.webGPUSamplerParams.warpW = value;
            this.webgpuSampler = this._engine._samplerContext.getcacheSampler(this.webGPUSamplerParams);
            this._warpW = value;
        }
    }
    get anisoLevel() {
        return this._anisoLevel;
    }
    set anisoLevel(value) {
        if (this._anisoLevel != value) {
            this.webGPUSamplerParams.anisoLevel = value;
        }
        this._anisoLevel = value;
    }
    get compareMode() {
        return this._compareMode;
    }
    set compareMode(value) {
        if (this._compareMode != value) {
            this.webGPUSamplerParams.comparedMode = value;
            this.webgpuSampler = this._engine._samplerContext.getcacheSampler(this.webGPUSamplerParams);
            this._compareMode = value;
        }
    }
    dispose() {
        let defferdArray = this._engine._deferredDestroyTextures;
        if (defferdArray.indexOf(this) == -1)
            defferdArray.push(this);
    }
    disposDerredDispose() {
        if (!this.destroyed)
            this.resource.destroy();
    }
}

//# sourceMappingURL=WebGPUInternalTex.js.map
