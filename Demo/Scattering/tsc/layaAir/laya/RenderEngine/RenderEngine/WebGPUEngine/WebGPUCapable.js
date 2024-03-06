import { RenderCapable } from "../../RenderEnum/RenderCapable";
import { WebGPUObject } from "./WebGPUObject";
export class WebGPUCapable extends WebGPUObject {
    constructor(gpuEngine) {
        super(gpuEngine);
        this.initCapable();
    }
    initCapable() {
        this._capabilityMap = new Map();
        this._capabilityMap.set(RenderCapable.Element_Index_Uint32, true);
        this._capabilityMap.set(RenderCapable.TextureFormat_R32G32B32A32, true);
        this._capabilityMap.set(RenderCapable.TextureFormat_R16G16B16A16, true);
        this._capabilityMap.set(RenderCapable.Texture_anisotropic, true);
        this._capabilityMap.set(RenderCapable.RenderTextureFormat_R16G16B16A16, true);
        this._capabilityMap.set(RenderCapable.RenderTextureFormat_Depth, true);
        this._capabilityMap.set(RenderCapable.RenderTextureFormat_ShadowMap, true);
        this._capabilityMap.set(RenderCapable.Vertex_VAO, true);
        this._capabilityMap.set(RenderCapable.DrawElement_Instance, true);
        this._capabilityMap.set(RenderCapable.Shader_TextureLod, true);
        this._capabilityMap.set(RenderCapable.COMPRESS_TEXTURE_S3TC, true);
        this._capabilityMap.set(RenderCapable.COMPRESS_TEXTURE_S3TC_SRGB, true);
        this._capabilityMap.set(RenderCapable.COMPRESS_TEXTURE_PVRTC, true);
        this._capabilityMap.set(RenderCapable.COMPRESS_TEXTURE_ETC1, true);
        this._capabilityMap.set(RenderCapable.COMPRESS_TEXTURE_ETC, true);
        this._capabilityMap.set(RenderCapable.COMPRESS_TEXTURE_ASTC, true);
        this._capabilityMap.set(RenderCapable.Texture_SRGB, true);
        this._capabilityMap.set(RenderCapable.MSAA, false);
        this._capabilityMap.set(RenderCapable.UnifromBufferObject, false);
        this._capabilityMap.set(RenderCapable.Texture3D, false);
    }
    getCapable(type) {
        return this._capabilityMap.get(type);
    }
}

//# sourceMappingURL=WebGPUCapable.js.map
