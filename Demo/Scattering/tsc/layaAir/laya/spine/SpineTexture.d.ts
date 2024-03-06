import { WrapMode } from "../RenderEngine/RenderEnum/WrapMode";
import { Texture } from "../resource/Texture";
export declare class SpineTexture {
    realTexture: Texture;
    constructor(tex: Texture);
    getImage(): Object;
    setFilters(minFilter: spine.TextureFilter, magFilter: spine.TextureFilter): void;
    convertWrapMode(mode: spine.TextureWrap): WrapMode;
    setWraps(uWrap: spine.TextureWrap, vWrap: spine.TextureWrap): void;
}
