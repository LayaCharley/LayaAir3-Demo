import { RenderCapable } from "../../RenderEnum/RenderCapable";
import { WebGLExtension } from "./GLEnum/WebGLExtension";
import { VertexArrayObject } from "./VertexArrayObject";
export class GlCapable {
    constructor(glEngine) {
        this._extentionVendorPrefixes = ["", "WEBKIT_", "MOZ_"];
        this._gl = glEngine.gl;
        this.initExtension(glEngine.isWebGL2);
        this.initCapable(glEngine.isWebGL2);
    }
    initCapable(isWebgl2) {
        this._capabilityMap = new Map();
        let value = isWebgl2 || !!(this.getExtension(WebGLExtension.OES_element_index_uint));
        this._capabilityMap.set(RenderCapable.Element_Index_Uint32, value);
        value = isWebgl2 || !!(this.getExtension(WebGLExtension.OES_texture_float));
        this._capabilityMap.set(RenderCapable.TextureFormat_R32G32B32A32, value);
        value = isWebgl2 || !!(this.getExtension(WebGLExtension.OES_texture_half_float));
        this._capabilityMap.set(RenderCapable.TextureFormat_R16G16B16A16, value);
        value = !!(this.getExtension(WebGLExtension.EXT_texture_filter_anisotropic));
        this._capabilityMap.set(RenderCapable.Texture_anisotropic, value);
        if (isWebgl2) {
            value = !!this.getExtension(WebGLExtension.EXT_color_buffer_float);
        }
        else {
            value = (!!this.getExtension(WebGLExtension.OES_texture_half_float)) && (!!this.getExtension(WebGLExtension.OES_texture_half_float_linear));
        }
        this._capabilityMap.set(RenderCapable.RenderTextureFormat_R16G16B16A16, value);
        value = isWebgl2 || (!!this.getExtension(WebGLExtension.WEBGL_depth_texture));
        this._capabilityMap.set(RenderCapable.RenderTextureFormat_Depth, value);
        value = isWebgl2;
        this._capabilityMap.set(RenderCapable.RenderTextureFormat_ShadowMap, value);
        value = isWebgl2 || (!!this.getExtension(WebGLExtension.OES_vertex_array_object));
        this._capabilityMap.set(RenderCapable.Vertex_VAO, value);
        value = (isWebgl2 || (!!this.getExtension(WebGLExtension.ANGLE_instanced_arrays)));
        this._capabilityMap.set(RenderCapable.DrawElement_Instance, value);
        value = (isWebgl2) || (!!this.getExtension(WebGLExtension.EXT_shader_texture_lod));
        this._capabilityMap.set(RenderCapable.Shader_TextureLod, value);
        value = (!!this.getExtension(WebGLExtension.WEBGL_compressed_texture_s3tc));
        this._capabilityMap.set(RenderCapable.COMPRESS_TEXTURE_S3TC, value);
        value = (!!this.getExtension(WebGLExtension.WEBGL_compressed_texture_s3tc_srgb));
        this._capabilityMap.set(RenderCapable.COMPRESS_TEXTURE_S3TC_SRGB, value);
        value = (!!this.getExtension(WebGLExtension.WEBGL_compressed_texture_pvrtc));
        this._capabilityMap.set(RenderCapable.COMPRESS_TEXTURE_PVRTC, value);
        value = (!!this.getExtension(WebGLExtension.WEBGL_compressed_texture_etc1));
        this._capabilityMap.set(RenderCapable.COMPRESS_TEXTURE_ETC1, value);
        value = (!!this.getExtension(WebGLExtension.WEBGL_compressed_texture_etc));
        this._capabilityMap.set(RenderCapable.COMPRESS_TEXTURE_ETC, value);
        value = (!!this.getExtension(WebGLExtension.WEBGL_compressed_texture_astc));
        this._capabilityMap.set(RenderCapable.COMPRESS_TEXTURE_ASTC, value);
        value = (isWebgl2) || (!!this.getExtension(WebGLExtension.EXT_sRGB));
        this._capabilityMap.set(RenderCapable.Texture_SRGB, value);
        value = (!!this.getExtension(WebGLExtension.OES_texture_float_linear));
        this._capabilityMap.set(RenderCapable.Texture_FloatLinearFiltering, value);
        value = (!!this.getExtension(WebGLExtension.OES_texture_half_float_linear));
        this._capabilityMap.set(RenderCapable.Texture_HalfFloatLinearFiltering, value);
        value = isWebgl2;
        this._capabilityMap.set(RenderCapable.MSAA, value);
        this._capabilityMap.set(RenderCapable.UnifromBufferObject, value);
        this._capabilityMap.set(RenderCapable.Texture3D, value);
    }
    initExtension(isWebgl2) {
        this._extensionMap = new Map();
        const setExtensionMap = (extension, value, map) => {
            value && map.set(extension, value);
        };
        const _extTextureFilterAnisotropic = this._getExtension("EXT_texture_filter_anisotropic");
        setExtensionMap(WebGLExtension.EXT_texture_filter_anisotropic, _extTextureFilterAnisotropic, this._extensionMap);
        const _compressedTextureS3tc = this._getExtension("WEBGL_compressed_texture_s3tc");
        setExtensionMap(WebGLExtension.WEBGL_compressed_texture_s3tc, _compressedTextureS3tc, this._extensionMap);
        const _compressdTextureS3tc_srgb = this._getExtension("WEBGL_compressed_texture_s3tc_srgb");
        setExtensionMap(WebGLExtension.WEBGL_compressed_texture_s3tc_srgb, _compressdTextureS3tc_srgb, this._extensionMap);
        const _compressedTexturePvrtc = this._getExtension("WEBGL_compressed_texture_pvrtc");
        setExtensionMap(WebGLExtension.WEBGL_compressed_texture_pvrtc, _compressedTexturePvrtc, this._extensionMap);
        const _compressedTextureEtc1 = this._getExtension("WEBGL_compressed_texture_etc1");
        setExtensionMap(WebGLExtension.WEBGL_compressed_texture_etc1, _compressedTextureEtc1, this._extensionMap);
        const _compressedTextureETC = this._getExtension("WEBGL_compressed_texture_etc");
        setExtensionMap(WebGLExtension.WEBGL_compressed_texture_etc, _compressedTextureETC, this._extensionMap);
        const _compressedTextureASTC = this._getExtension("WEBGL_compressed_texture_astc");
        setExtensionMap(WebGLExtension.WEBGL_compressed_texture_astc, _compressedTextureASTC, this._extensionMap);
        const _oesTextureFloatLinear = this._getExtension("OES_texture_float_linear");
        setExtensionMap(WebGLExtension.OES_texture_float_linear, _oesTextureFloatLinear, this._extensionMap);
        if (isWebgl2) {
            const _extColorBufferFloat = this._getExtension("EXT_color_buffer_float");
            setExtensionMap(WebGLExtension.EXT_color_buffer_float, _extColorBufferFloat, this._extensionMap);
            const _extColorBufferHalfFloat = this._getExtension("EXT_color_buffer_half_float");
            setExtensionMap(WebGLExtension.EXT_color_buffer_half_float, _extColorBufferHalfFloat, this._extensionMap);
        }
        else {
            VertexArrayObject;
            if (window._setupVertexArrayObject)
                window._setupVertexArrayObject(this._gl);
            const _vaoExt = this._getExtension("OES_vertex_array_object");
            setExtensionMap(WebGLExtension.OES_vertex_array_object, _vaoExt, this._extensionMap);
            const _angleInstancedArrays = this._getExtension("ANGLE_instanced_arrays");
            setExtensionMap(WebGLExtension.ANGLE_instanced_arrays, _angleInstancedArrays, this._extensionMap);
            const _oesTextureHalfFloat = this._getExtension("OES_texture_half_float");
            setExtensionMap(WebGLExtension.OES_texture_half_float, _oesTextureHalfFloat, this._extensionMap);
            const _oesTextureHalfFloatLinear = this._getExtension("OES_texture_half_float_linear");
            setExtensionMap(WebGLExtension.OES_texture_half_float_linear, _oesTextureHalfFloatLinear, this._extensionMap);
            const _oesTextureFloat = this._getExtension("OES_texture_float");
            setExtensionMap(WebGLExtension.OES_texture_float, _oesTextureFloat, this._extensionMap);
            const _oes_element_index_uint = this._getExtension("OES_element_index_uint");
            setExtensionMap(WebGLExtension.OES_element_index_uint, _oes_element_index_uint, this._extensionMap);
            const _extShaderTextureLod = this._getExtension("EXT_shader_texture_lod");
            setExtensionMap(WebGLExtension.EXT_shader_texture_lod, _extShaderTextureLod, this._extensionMap);
            const _webgl_depth_texture = this._getExtension("WEBGL_depth_texture");
            setExtensionMap(WebGLExtension.WEBGL_depth_texture, _webgl_depth_texture, this._extensionMap);
            const _sRGB = this._getExtension("EXT_sRGB");
            setExtensionMap(WebGLExtension.EXT_sRGB, _sRGB, this._extensionMap);
            const OES_standard_derivatives = this._getExtension("OES_standard_derivatives");
            setExtensionMap(WebGLExtension.OES_standard_derivatives, OES_standard_derivatives, this._extensionMap);
        }
    }
    getCapable(type) {
        return this._capabilityMap.get(type);
    }
    getExtension(type) {
        if (this._extensionMap.has(type))
            return this._extensionMap.get(type);
        else
            return null;
    }
    _getExtension(name) {
        const prefixes = this._extentionVendorPrefixes;
        for (const k in prefixes) {
            var ext = this._gl.getExtension(prefixes[k] + name);
            if (ext)
                return ext;
        }
        return null;
    }
}

//# sourceMappingURL=GlCapable.js.map
