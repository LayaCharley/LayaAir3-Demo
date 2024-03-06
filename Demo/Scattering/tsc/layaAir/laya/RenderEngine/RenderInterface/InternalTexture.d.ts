import { FilterMode } from "../RenderEnum/FilterMode";
import { TextureCompareMode } from "../RenderEnum/TextureCompareMode";
import { WrapMode } from "../RenderEnum/WrapMode";
export interface InternalTexture {
    resource: any;
    target: number;
    width: number;
    height: number;
    isPotSize: boolean;
    mipmap: boolean;
    mipmapCount: number;
    filterMode: FilterMode;
    wrapU: WrapMode;
    wrapV: WrapMode;
    wrapW: WrapMode;
    anisoLevel: number;
    baseMipmapLevel: number;
    maxMipmapLevel: number;
    compareMode: TextureCompareMode;
    gpuMemory: number;
    useSRGBLoad: boolean;
    gammaCorrection: number;
    dispose(): void;
}
