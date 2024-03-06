import { FilterMode } from "../../RenderEnum/FilterMode";
import { TextureCompareMode } from "../../RenderEnum/TextureCompareMode";
import { WrapMode } from "../../RenderEnum/WrapMode";
import { WebGPUObject } from "./WebGPUObject";
export interface WebGPUSamplerParams {
    comparedMode: TextureCompareMode;
    wrapU: WrapMode;
    warpV: WrapMode;
    warpW: WrapMode;
    mipmapFilter: FilterMode;
    filterMode: FilterMode;
    anisoLevel: number;
}
export declare class WebGPUSamplerContext extends WebGPUObject {
    private _cacheMap;
    createGPUSampler(params: WebGPUSamplerParams): GPUSampler;
    getcacheSampler(params: WebGPUSamplerParams): any;
    private _getCatchWrapKey;
    private _anisoLevel;
    private _getSamplerDescriptor;
    private _getSamplerAddressMode;
    private _getFilterMode;
    private _getGPUCompareFunction;
}
