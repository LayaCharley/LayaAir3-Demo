import { RenderTargetFormat } from "../../RenderEnum/RenderTargetFormat";
import { TextureDimension } from "../../RenderEnum/TextureDimension";
import { TextureFormat } from "../../RenderEnum/TextureFormat";
import { WebGPUInternalRT } from "./WebGPUInternalRT";
import { WebGPUInternalTex } from "./WebGPUInternalTex";
import { WebGPUObject } from "./WebGPUObject";
var GPUTextureDimension;
(function (GPUTextureDimension) {
    GPUTextureDimension["D1D"] = "1d";
    GPUTextureDimension["D2D"] = "2d";
    GPUTextureDimension["D3D"] = "3d";
})(GPUTextureDimension || (GPUTextureDimension = {}));
;
var GPUTextureViewDimension;
(function (GPUTextureViewDimension) {
    GPUTextureViewDimension["VD1d"] = "1d";
    GPUTextureViewDimension["VD2d"] = "2d";
    GPUTextureViewDimension["VD2d_array"] = "2d-array";
    GPUTextureViewDimension["VDcube"] = "cube";
    GPUTextureViewDimension["VDcube_array"] = "cube-array";
    GPUTextureViewDimension["VD3d"] = "3d";
})(GPUTextureViewDimension || (GPUTextureViewDimension = {}));
export var GPUTextureFormat;
(function (GPUTextureFormat) {
    GPUTextureFormat["r8unorm"] = "r8unorm";
    GPUTextureFormat["r8snorm"] = "r8snorm";
    GPUTextureFormat["r8uint"] = "r8uint";
    GPUTextureFormat["r8sint"] = "r8sint";
    GPUTextureFormat["r16uint"] = "r16uint";
    GPUTextureFormat["r16sint"] = "r16sint";
    GPUTextureFormat["r16float"] = "r16float";
    GPUTextureFormat["rg8unorm"] = "rg8unorm";
    GPUTextureFormat["rg8snorm"] = "rg8snorm";
    GPUTextureFormat["rg8uint"] = "rg8uint";
    GPUTextureFormat["rg8sint"] = "rg8sint";
    GPUTextureFormat["r32uint"] = "r32uint";
    GPUTextureFormat["r32sint"] = "r32sint";
    GPUTextureFormat["r32float"] = "r32float";
    GPUTextureFormat["rg16uint"] = "rg16uint";
    GPUTextureFormat["rg16sint"] = "rg16sint";
    GPUTextureFormat["rg16float"] = "rg16float";
    GPUTextureFormat["rgba8unorm"] = "rgba8unorm";
    GPUTextureFormat["rgba8unorm_srgb"] = "rgba8unorm-srgb";
    GPUTextureFormat["rgba8snorm"] = "rgba8snorm";
    GPUTextureFormat["rgba8uint"] = "rgba8uint";
    GPUTextureFormat["rgba8sint"] = "rgba8sint";
    GPUTextureFormat["bgra8unorm"] = "bgra8unorm";
    GPUTextureFormat["bgra8unorm_srgb"] = "bgra8unorm-srgb";
    GPUTextureFormat["rgb9e5ufloat"] = "rgb9e5ufloat";
    GPUTextureFormat["rgb10a2unorm"] = "rgb10a2unorm";
    GPUTextureFormat["rg11b10ufloat"] = "rg11b10ufloat";
    GPUTextureFormat["rg32uint"] = "rg32uint";
    GPUTextureFormat["rg32sint"] = "rg32sint";
    GPUTextureFormat["rg32float"] = "rg32float";
    GPUTextureFormat["rgba16uint"] = "rgba16uint";
    GPUTextureFormat["rgba16sint"] = "rgba16sint";
    GPUTextureFormat["rgba16float"] = "rgba16float";
    GPUTextureFormat["rgba32uint"] = "rgba32uint";
    GPUTextureFormat["rgba32sint"] = "rgba32sint";
    GPUTextureFormat["rgba32float"] = "rgba32float";
    GPUTextureFormat["stencil8"] = "stencil8";
    GPUTextureFormat["depth16unorm"] = "depth16unorm";
    GPUTextureFormat["depth24plus"] = "depth24plus";
    GPUTextureFormat["depth24plus_stencil8"] = "depth24plus-stencil8";
    GPUTextureFormat["depth32float"] = "depth32float";
    GPUTextureFormat["depth32float_stencil8"] = "depth32float-stencil8";
    GPUTextureFormat["bc1_rgba_unorm"] = "bc1-rgba-unorm";
    GPUTextureFormat["bc1_rgba_unorm_srgb"] = "bc1-rgba-unorm-srgb";
    GPUTextureFormat["bc2_rgba_unorm"] = "bc2-rgba-unorm";
    GPUTextureFormat["bc2_rgba_unorm_srgb"] = "bc2-rgba-unorm-srgb";
    GPUTextureFormat["bc3_rgba_unorm"] = "bc3-rgba-unorm";
    GPUTextureFormat["bc3_rgba_unorm_srgb"] = "bc3-rgba-unorm-srgb";
    GPUTextureFormat["bc4_r_unorm"] = "bc4-r-unorm";
    GPUTextureFormat["bc4_r_snorm"] = "bc4-r-snorm";
    GPUTextureFormat["bc5_rg_unorm"] = "bc5-rg-unorm";
    GPUTextureFormat["bc5_rg_snorm"] = "bc5-rg-snorm";
    GPUTextureFormat["bc6h_rgb_ufloat"] = "bc6h-rgb-ufloat";
    GPUTextureFormat["bc6h_rgb_float"] = "bc6h-rgb-float";
    GPUTextureFormat["bc7_rgba_unorm"] = "bc7-rgba-unorm";
    GPUTextureFormat["bc7_rgba_unorm_srgb"] = "bc7-rgba-unorm-srgb";
    GPUTextureFormat["etc2_rgb8unorm"] = "etc2-rgb8unorm";
    GPUTextureFormat["etc2_rgb8unorm_srgb"] = "etc2-rgb8unorm-srgb";
    GPUTextureFormat["etc2_rgb8a1unorm"] = "etc2-rgb8a1unorm";
    GPUTextureFormat["etc2_rgb8a1unorm_srgb"] = "etc2-rgb8a1unorm-srgb";
    GPUTextureFormat["etc2_rgba8unorm"] = "etc2-rgba8unorm";
    GPUTextureFormat["etc2_rgba8unorm_srgb"] = "etc2-rgba8unorm-srgb";
    GPUTextureFormat["astc_4x4_unorm"] = "astc-4x4-unorm";
    GPUTextureFormat["astc_4x4_unorm_srgb"] = "astc-4x4-unorm-srgb";
    GPUTextureFormat["astc_5x4_unorm"] = "astc-5x4-unorm";
    GPUTextureFormat["astc_5x4_unorm_srgb"] = "astc-5x4-unorm-srgb";
    GPUTextureFormat["astc_5x5_unorm"] = "astc-5x5-unorm";
    GPUTextureFormat["astc_5x5_unorm_srgb"] = "astc-5x5-unorm-srgb";
    GPUTextureFormat["astc_6x5_unorm"] = "astc-6x5-unorm";
    GPUTextureFormat["astc_6x5_unorm_srgb"] = "astc-6x5-unorm-srgb";
    GPUTextureFormat["astc_6x6_unorm"] = "astc-6x6-unorm";
    GPUTextureFormat["astc_6x6_unorm_srgb"] = "astc-6x6-unorm-srgb";
    GPUTextureFormat["astc_8x5_unorm"] = "astc-8x5-unorm";
    GPUTextureFormat["astc_8x5_unorm_srgb"] = "astc-8x5-unorm-srgb";
    GPUTextureFormat["astc_8x6_unorm"] = "astc-8x6-unorm";
    GPUTextureFormat["astc_8x6_unorm_srgb"] = "astc-8x6-unorm-srgb";
    GPUTextureFormat["astc_8x8_unorm"] = "astc-8x8-unorm";
    GPUTextureFormat["astc_8x8_unorm_srgb"] = "astc-8x8-unorm-srgb";
    GPUTextureFormat["astc_10x5_unorm"] = "astc-10x5-unorm";
    GPUTextureFormat["astc_10x5_unorm_srgb"] = "astc-10x5-unorm-srgb";
    GPUTextureFormat["astc_10x6_unorm"] = "astc-10x6-unorm";
    GPUTextureFormat["astc_10x6_unorm_srgb"] = "astc-10x6-unorm-srgb";
    GPUTextureFormat["astc_10x8_unorm"] = "astc-10x8-unorm";
    GPUTextureFormat["astc_10x8_unorm_srgb"] = "astc-10x8-unorm-srgb";
    GPUTextureFormat["astc_10x10_unorm"] = "astc-10x10-unorm";
    GPUTextureFormat["astc_10x10_unorm_srgb"] = "astc-10x10-unorm-srgb";
    GPUTextureFormat["astc_12x10_unorm"] = "astc-12x10-unorm";
    GPUTextureFormat["astc_12x10_unorm_srgb"] = "astc-12x10-unorm-srgb";
    GPUTextureFormat["astc_12x12_unorm"] = "astc-12x12-unorm";
    GPUTextureFormat["astc_12x12_unorm_srgb"] = "astc-12x12-unorm-srgb";
})(GPUTextureFormat || (GPUTextureFormat = {}));
;
export var GPUTextureUsage;
(function (GPUTextureUsage) {
    GPUTextureUsage[GPUTextureUsage["COPY_SRC"] = 1] = "COPY_SRC";
    GPUTextureUsage[GPUTextureUsage["COPY_DST"] = 2] = "COPY_DST";
    GPUTextureUsage[GPUTextureUsage["TEXTURE_BINDING"] = 4] = "TEXTURE_BINDING";
    GPUTextureUsage[GPUTextureUsage["STORAGE_BINDING"] = 8] = "STORAGE_BINDING";
    GPUTextureUsage[GPUTextureUsage["RENDER_ATTACHMENT"] = 16] = "RENDER_ATTACHMENT";
})(GPUTextureUsage || (GPUTextureUsage = {}));
;
export class WebGPUTextureContext extends WebGPUObject {
    constructor(engine) {
        super(engine);
    }
    setTexture3DImageData(texture, source, depth, premultiplyAlpha, invertY) {
        throw new Error("Method not implemented.");
    }
    setTexture3DPixlesData(texture, source, depth, premultiplyAlpha, invertY) {
        throw new Error("Method not implemented.");
    }
    setTexture3DSubPixelsData(texture, source, mipmapLevel, generateMipmap, xOffset, yOffset, zOffset, width, height, depth, premultiplyAlpha, invertY) {
        throw new Error("Method not implemented.");
    }
    getGPUTextureFormat(format, useSRGB) {
        let webgpuTextureFormat = GPUTextureFormat.rgba8uint;
        switch (format) {
            case TextureFormat.R5G6B5:
                return null;
            case TextureFormat.R8G8B8:
            case TextureFormat.R8G8B8A8:
                webgpuTextureFormat = !useSRGB ? GPUTextureFormat.rgba8unorm : GPUTextureFormat.rgba8unorm_srgb;
                break;
            case TextureFormat.R32G32B32:
            case TextureFormat.R32G32B32A32:
                webgpuTextureFormat = GPUTextureFormat.rgba32float;
                break;
            case TextureFormat.R16G16B16:
            case TextureFormat.R16G16B16A16:
                webgpuTextureFormat = GPUTextureFormat.rgba16float;
                break;
            case TextureFormat.DXT1:
                webgpuTextureFormat = !useSRGB ? GPUTextureFormat.bc1_rgba_unorm : GPUTextureFormat.bc1_rgba_unorm_srgb;
                break;
            case TextureFormat.DXT3:
                webgpuTextureFormat = !useSRGB ? GPUTextureFormat.bc2_rgba_unorm : GPUTextureFormat.bc2_rgba_unorm_srgb;
                break;
            case TextureFormat.DXT5:
                webgpuTextureFormat = !useSRGB ? GPUTextureFormat.bc3_rgba_unorm : GPUTextureFormat.bc3_rgba_unorm_srgb;
                break;
            case TextureFormat.ETC2RGBA:
            case TextureFormat.ETC1RGB:
            case TextureFormat.ETC2RGB:
            case TextureFormat.ETC2SRGB:
            case TextureFormat.ETC2SRGB_Alpha8:
                webgpuTextureFormat = !useSRGB ? GPUTextureFormat.etc2_rgba8unorm : GPUTextureFormat.etc2_rgba8unorm_srgb;
                break;
            case TextureFormat.ASTC4x4:
            case TextureFormat.ASTC4x4SRGB:
                webgpuTextureFormat = !useSRGB ? GPUTextureFormat.astc_4x4_unorm : GPUTextureFormat.astc_4x4_unorm_srgb;
                break;
            case TextureFormat.ASTC6x6:
            case TextureFormat.ASTC6x6SRGB:
                webgpuTextureFormat = !useSRGB ? GPUTextureFormat.astc_6x6_unorm : GPUTextureFormat.astc_6x6_unorm_srgb;
                break;
            case TextureFormat.ASTC8x8:
            case TextureFormat.ASTC8x8SRGB:
                webgpuTextureFormat = !useSRGB ? GPUTextureFormat.astc_8x8_unorm : GPUTextureFormat.astc_8x8_unorm_srgb;
                break;
            case TextureFormat.ASTC10x10:
            case TextureFormat.ASTC10x10SRGB:
                webgpuTextureFormat = !useSRGB ? GPUTextureFormat.astc_10x10_unorm : GPUTextureFormat.astc_10x10_unorm_srgb;
                break;
            case TextureFormat.ASTC12x12:
            case TextureFormat.ASTC12x12SRGB:
                webgpuTextureFormat = !useSRGB ? GPUTextureFormat.astc_12x12_unorm : GPUTextureFormat.astc_12x12_unorm_srgb;
                break;
            default:
                throw "unknow TextureFormat";
                break;
        }
        return webgpuTextureFormat;
    }
    isCompressTexture(format) {
        switch (format) {
            case TextureFormat.DXT1:
            case TextureFormat.DXT3:
            case TextureFormat.DXT5:
            case TextureFormat.ETC2RGBA:
            case TextureFormat.ETC1RGB:
            case TextureFormat.ETC2RGB:
            case TextureFormat.ETC2SRGB:
            case TextureFormat.ETC2SRGB_Alpha8:
            case TextureFormat.ASTC4x4:
            case TextureFormat.ASTC4x4SRGB:
            case TextureFormat.ASTC6x6:
            case TextureFormat.ASTC6x6SRGB:
            case TextureFormat.ASTC8x8:
            case TextureFormat.ASTC8x8SRGB:
            case TextureFormat.ASTC10x10:
            case TextureFormat.ASTC10x10SRGB:
            case TextureFormat.ASTC12x12:
            case TextureFormat.ASTC12x12SRGB:
                return true;
            default:
                return false;
        }
    }
    getGPURenderTargetFormat(format, useSRGB) {
        switch (format) {
            case RenderTargetFormat.DEPTH_16:
                return GPUTextureFormat.depth16unorm;
            case RenderTargetFormat.DEPTHSTENCIL_24_Plus:
                return GPUTextureFormat.depth24plus;
            case RenderTargetFormat.DEPTHSTENCIL_24_8:
                return GPUTextureFormat.depth24plus_stencil8;
            case RenderTargetFormat.DEPTH_32:
                return GPUTextureFormat.depth32float;
            case RenderTargetFormat.STENCIL_8:
                return GPUTextureFormat.stencil8;
            case RenderTargetFormat.R8G8B8:
            case RenderTargetFormat.R16G16B16:
            case RenderTargetFormat.R32G32B32:
                return null;
            case RenderTargetFormat.R8G8B8A8:
                return useSRGB ? GPUTextureFormat.rgba8unorm_srgb : GPUTextureFormat.rgba8unorm;
            case RenderTargetFormat.R16G16B16A16:
                return GPUTextureFormat.rgba16float;
            case RenderTargetFormat.R32G32B32A32:
                return GPUTextureFormat.rgba32float;
            default:
                throw "render format.";
        }
    }
    getTextureViewDimension(demension) {
        let gpuDimension = GPUTextureViewDimension.VD2d;
        switch (demension) {
            case TextureDimension.Tex2D:
                gpuDimension = GPUTextureViewDimension.VD2d;
                break;
            case TextureDimension.Texture2DArray:
                gpuDimension = GPUTextureViewDimension.VD2d_array;
                break;
            case TextureDimension.Tex3D:
                gpuDimension = GPUTextureViewDimension.VD3d;
                break;
            case TextureDimension.Cube:
                gpuDimension = GPUTextureViewDimension.VDcube;
                break;
            case TextureDimension.CubeArray:
                gpuDimension = GPUTextureViewDimension.VDcube_array;
                break;
        }
        return gpuDimension;
    }
    getGLtexMemory(tex, depth = 1) {
        return 0;
    }
    _generateMipmaps(texture, format, mipLevelCount, level) {
    }
    createTextureInternal(dimension, width, height, format, generateMipmap, sRGB) {
        let layerCount;
        switch (dimension) {
            case TextureDimension.Tex2D:
                layerCount = 1;
                break;
            case TextureDimension.Cube:
                layerCount = 6;
                break;
        }
        if (dimension == TextureDimension.Tex3D) {
            throw "error";
        }
        const gpuTextureformat = this.getGPUTextureFormat(format, sRGB);
        let textureDescriptor = this.getGPUTextureDescriptor(dimension, width, height, gpuTextureformat, layerCount, this.isCompressTexture(format), generateMipmap);
        const gpuTexture = this._engine._device.createTexture(textureDescriptor);
        let internalTex = new WebGPUInternalTex(this._engine, width, height, dimension, generateMipmap);
        internalTex.resource = gpuTexture;
        internalTex.webGPUFormat = gpuTextureformat;
        return internalTex;
    }
    getGPUTextureDescriptor(dimension, width, height, gouformat, layerCount, isCompressTexture, generateMipmap) {
        const textureSize = {
            width: width,
            height: height,
            depthOrArrayLayers: layerCount,
        };
        const cancopy = !isCompressTexture;
        let usage = GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT;
        let mipmapCount = 1;
        if (cancopy) {
            usage |= GPUTextureUsage.COPY_DST;
        }
        let textureDescriptor = {
            size: textureSize,
            mipLevelCount: mipmapCount,
            sampleCount: 1,
            dimension: GPUTextureDimension.D2D,
            format: gouformat,
            usage: usage,
        };
        return textureDescriptor;
    }
    createRenderTextureInternal(dimension, width, height, format, generateMipmap, sRGB) {
        let viewDimension = this.getTextureViewDimension(dimension);
        let textureDescriptor = this.getGPUTextureDescriptor(dimension, width, height, this.getGPURenderTargetFormat(format, sRGB), 1, generateMipmap, sRGB);
        textureDescriptor.usage |= GPUTextureUsage.RENDER_ATTACHMENT;
        const gpuTexture = this._engine._device.createTexture(textureDescriptor);
        let internalTex = new WebGPUInternalTex(this._engine, width, height, dimension, generateMipmap);
        internalTex.resource = gpuTexture;
        internalTex.webGPUFormat = textureDescriptor.format;
        let descriptor = {
            format: internalTex.webGPUFormat,
            dimension: viewDimension,
            aspect: 'all',
            baseMipLevel: 0,
            baseArrayLayer: 0,
            arrayLayerCount: 1,
            mipLevelCount: internalTex.mipmapCount,
        };
        return internalTex;
    }
    createRenderTargetInternal(width, height, format, depthStencilFormat, generateMipmap, sRGB, multiSamples) {
        let renderTarget = new WebGPUInternalRT(this._engine, format, depthStencilFormat, false, generateMipmap, multiSamples);
        renderTarget.isSRGB = sRGB;
        if (format != RenderTargetFormat.None) {
            renderTarget._textures.push(this.createRenderTextureInternal(TextureDimension.Tex2D, width, height, format, generateMipmap, sRGB));
        }
        if (depthStencilFormat != RenderTargetFormat.None) {
            renderTarget._depthTexture = this.createRenderTextureInternal(TextureDimension.Tex2D, width, height, depthStencilFormat, generateMipmap, sRGB);
        }
        return renderTarget;
    }
    setTextureImageData(texture, source, premultiplyAlpha, invertY) {
        const imageBitmapSource = createImageBitmap(source);
        const image = { source: source, flipY: invertY, origin: [0, 0] };
        const textureCopyView = {
            texture: texture.resource,
            origin: {
                x: 0,
                y: 0,
            },
            mipLevel: 0,
            premultipliedAlpha: premultiplyAlpha,
            colorSpace: texture.useSRGBLoad ? "srgb" : undefined
        };
        let copySize = { width: source.width, height: source.height };
        this._engine._device.queue.copyExternalImageToTexture(image, textureCopyView, copySize);
    }
    setTextureSubImageData(texture, source, x, y, premultiplyAlpha, invertY) {
        const image = { source: source, flipY: invertY, origin: { x: 0, y: 0 } };
        const textureCopyView = {
            texture: texture.resource,
            origin: {
                x: x,
                y: y,
            },
            mipLevel: 0,
            premultipliedAlpha: premultiplyAlpha,
            colorSpace: texture.useSRGBLoad ? "srgb" : undefined
        };
        let copySize = { width: source.width, height: source.height };
        this._engine._device.queue.copyExternalImageToTexture(image, textureCopyView, copySize);
    }
    setTexturePixelsData(texture, source, premultiplyAlpha, invertY) {
        let imageCopy = {
            texture: texture.resource,
            mipLevel: 0,
            premultipliedAlpha: premultiplyAlpha
        };
        let block = this._getBlockInformationFromFormat(texture.webGPUFormat);
        const bytesPerRow = Math.ceil(texture.width / block.width) * block.length;
        const height = texture.height;
        let dataLayout = {
            offset: 0,
            bytesPerRow: bytesPerRow,
            rowsPerImage: height
        };
        let size = {
            width: Math.ceil(texture.width / block.width) * block.width,
            height: Math.ceil(height / block.height) * block.height,
        };
        if (source)
            this._engine._device.queue.writeTexture(imageCopy, source.buffer, dataLayout, size);
    }
    setTextureSubPixelsData(texture, source, mipmapLevel, generateMipmap, xOffset, yOffset, width, height, premultiplyAlpha, invertY) {
        let imageCopy = {
            texture: texture.resource,
            mipLevel: mipmapLevel,
            premultipliedAlpha: premultiplyAlpha,
            origin: {
                x: xOffset,
                y: yOffset,
            },
        };
        let block = this._getBlockInformationFromFormat(texture.webGPUFormat);
        const bytesPerRow = Math.ceil(width / block.width) * block.length;
        let dataLayout = {
            offset: 0,
            bytesPerRow: bytesPerRow,
            rowsPerImage: height
        };
        let size = {
            width: Math.ceil(width / block.width) * block.width,
            height: Math.ceil(height / block.height) * block.height,
        };
        this._engine._device.queue.writeTexture(imageCopy, source.buffer, dataLayout, size);
        if (generateMipmap) {
        }
    }
    initVideoTextureData(texture) {
        throw new Error("Method not implemented.");
    }
    setTextureDDSData(texture, ddsInfo) {
        throw new Error("Method not implemented.");
    }
    setTextureKTXData(texture, ktxInfo) {
        throw new Error("Method not implemented.");
    }
    setTextureHDRData(texture, hdrInfo) {
        let hdrPixelData = hdrInfo.readScanLine();
        this.setTexturePixelsData(texture, hdrPixelData, false, false);
    }
    setCubeImageData(texture, sources, premultiplyAlpha, invertY) {
        for (let index = 0; index < 6; index++) {
            let source = sources[index];
            let image = { source: source, flipY: invertY, origin: { x: 0, y: 0 } };
            let textureCopyView = {
                texture: texture.resource,
                origin: {
                    x: 0,
                    y: 0,
                    z: index
                },
                mipLevel: 0,
                premultipliedAlpha: premultiplyAlpha,
                colorSpace: texture.useSRGBLoad ? "srgb" : undefined
            };
            let copySize = { width: source.width, height: source.height };
            this._engine._device.queue.copyExternalImageToTexture(image, textureCopyView, copySize);
        }
        if (texture.mipmap) {
        }
    }
    setCubePixelsData(texture, source, premultiplyAlpha, invertY) {
        for (let index = 0; index < 6; index++) {
            let sourceData = source[index];
            let imageCopy = {
                texture: texture.resource,
                mipLevel: 0,
                premultipliedAlpha: premultiplyAlpha,
                origin: {
                    x: 0,
                    y: 0,
                    z: Math.max(index, 0),
                }
            };
            let block = this._getBlockInformationFromFormat(texture.webGPUFormat);
            const bytesPerRow = Math.ceil(texture.width / block.width) * block.length;
            const height = texture.height;
            let dataLayout = {
                offset: 0,
                bytesPerRow: bytesPerRow,
                rowsPerImage: height
            };
            let size = {
                width: Math.ceil(texture.width / block.width) * block.width,
                height: Math.ceil(height / block.height) * block.height,
                depthOrArrayLayers: 1
            };
            if (source)
                this._engine._device.queue.writeTexture(imageCopy, sourceData.buffer, dataLayout, size);
        }
    }
    setCubeSubPixelData(texture, source, mipmapLevel, generateMipmap, xOffset, yOffset, width, height, premultiplyAlpha, invertY) {
        generateMipmap = generateMipmap && mipmapLevel == 0;
        for (let index = 0; index < 6; index++) {
            let sourceData = source[index];
            let imageCopy = {
                texture: texture.resource,
                mipLevel: mipmapLevel,
                premultipliedAlpha: premultiplyAlpha,
                origin: {
                    x: xOffset,
                    y: yOffset,
                    z: Math.max(index, 0)
                }
            };
            let block = this._getBlockInformationFromFormat(texture.webGPUFormat);
            const bytesPerRow = Math.ceil(width / block.width) * block.length;
            let dataLayout = {
                offset: 0,
                bytesPerRow: bytesPerRow,
                rowsPerImage: height
            };
            let size = {
                width: Math.ceil(texture.width / block.width) * block.width,
                height: Math.ceil(height / block.height) * block.height,
                depthOrArrayLayers: 1
            };
            if (sourceData)
                this._engine._device.queue.writeTexture(imageCopy, sourceData.buffer, dataLayout, size);
        }
        if (texture.mipmap && generateMipmap) {
        }
    }
    setCubeDDSData(texture, ddsInfo) {
        throw new Error("Method not implemented.");
    }
    setCubeKTXData(texture, ktxInfo) {
        throw new Error("Method not implemented.");
    }
    setTextureCompareMode(texture, compareMode) {
        throw new Error("Method not implemented.");
    }
    createRenderTargetCubeInternal(size, colorFormat, depthStencilFormat, generateMipmap, sRGB, multiSamples) {
        throw new Error("Method not implemented.");
    }
    setupRendertargetTextureAttachment(renderTarget, texture) {
        throw new Error("Method not implemented.");
    }
    bindRenderTarget(renderTarget, faceIndex) {
        this.curBindWGPURT = renderTarget;
    }
    bindoutScreenTarget() {
        throw new Error("Method not implemented.");
    }
    unbindRenderTarget(renderTarget) {
        this.curBindWGPURT = null;
    }
    readRenderTargetPixelData(renderTarget, xOffset, yOffset, width, height, out) {
        throw new Error("Method not implemented.");
    }
    updateVideoTexture(texture, video, premultiplyAlpha, invertY) {
        throw new Error("Method not implemented.");
    }
    getRenderTextureData(internalTex, x, y, width, height) {
        throw new Error("Method not implemented.");
    }
    _getBlockInformationFromFormat(format) {
        switch (format) {
            case GPUTextureFormat.r8unorm:
            case GPUTextureFormat.r8snorm:
            case GPUTextureFormat.r8uint:
            case GPUTextureFormat.r8sint:
                return { width: 1, height: 1, length: 1 };
            case GPUTextureFormat.r16uint:
            case GPUTextureFormat.r16sint:
            case GPUTextureFormat.r16float:
            case GPUTextureFormat.rg8unorm:
            case GPUTextureFormat.rg8snorm:
            case GPUTextureFormat.rg8uint:
            case GPUTextureFormat.rg8sint:
                return { width: 1, height: 1, length: 2 };
            case GPUTextureFormat.r32uint:
            case GPUTextureFormat.r32sint:
            case GPUTextureFormat.r32float:
            case GPUTextureFormat.rg16uint:
            case GPUTextureFormat.rg16sint:
            case GPUTextureFormat.rg16float:
            case GPUTextureFormat.rgba8unorm:
            case GPUTextureFormat.rgba8unorm_srgb:
            case GPUTextureFormat.rgba8snorm:
            case GPUTextureFormat.rgba8uint:
            case GPUTextureFormat.rgba8sint:
            case GPUTextureFormat.bgra8unorm:
            case GPUTextureFormat.bgra8unorm_srgb:
            case GPUTextureFormat.rgb9e5ufloat:
            case GPUTextureFormat.rgb10a2unorm:
            case GPUTextureFormat.rg11b10ufloat:
                return { width: 1, height: 1, length: 4 };
            case GPUTextureFormat.rg32uint:
            case GPUTextureFormat.rg32sint:
            case GPUTextureFormat.rg32float:
            case GPUTextureFormat.rgba16uint:
            case GPUTextureFormat.rgba16sint:
            case GPUTextureFormat.rgba16float:
                return { width: 1, height: 1, length: 8 };
            case GPUTextureFormat.rgba32uint:
            case GPUTextureFormat.rgba32sint:
            case GPUTextureFormat.rgba32float:
                return { width: 1, height: 1, length: 16 };
            case GPUTextureFormat.stencil8:
                throw "No fixed size for Stencil8 format!";
            case GPUTextureFormat.depth16unorm:
                return { width: 1, height: 1, length: 2 };
            case GPUTextureFormat.depth24plus:
                throw "No fixed size for Depth24Plus format!";
            case GPUTextureFormat.depth24plus_stencil8:
                throw "No fixed size for Depth24PlusStencil8 format!";
            case GPUTextureFormat.depth32float:
                return { width: 1, height: 1, length: 4 };
            case GPUTextureFormat.depth32float_stencil8:
                return { width: 1, height: 1, length: 5 };
            case GPUTextureFormat.bc7_rgba_unorm:
            case GPUTextureFormat.bc7_rgba_unorm_srgb:
            case GPUTextureFormat.bc6h_rgb_float:
            case GPUTextureFormat.bc6h_rgb_ufloat:
            case GPUTextureFormat.bc5_rg_unorm:
            case GPUTextureFormat.bc5_rg_snorm:
            case GPUTextureFormat.bc3_rgba_unorm:
            case GPUTextureFormat.bc3_rgba_unorm_srgb:
            case GPUTextureFormat.bc2_rgba_unorm:
            case GPUTextureFormat.bc2_rgba_unorm_srgb:
                return { width: 4, height: 4, length: 16 };
            case GPUTextureFormat.bc4_r_unorm:
            case GPUTextureFormat.bc4_r_snorm:
            case GPUTextureFormat.bc1_rgba_unorm:
            case GPUTextureFormat.bc1_rgba_unorm_srgb:
                return { width: 4, height: 4, length: 8 };
            case GPUTextureFormat.etc2_rgb8unorm:
            case GPUTextureFormat.etc2_rgb8unorm_srgb:
            case GPUTextureFormat.etc2_rgb8a1unorm:
            case GPUTextureFormat.etc2_rgb8a1unorm_srgb:
                return { width: 4, height: 4, length: 8 };
            case GPUTextureFormat.etc2_rgb8unorm:
            case GPUTextureFormat.etc2_rgba8unorm_srgb:
                return { width: 4, height: 4, length: 16 };
            case GPUTextureFormat.astc_4x4_unorm:
            case GPUTextureFormat.astc_4x4_unorm_srgb:
                return { width: 4, height: 4, length: 16 };
            case GPUTextureFormat.astc_5x4_unorm:
            case GPUTextureFormat.astc_5x4_unorm_srgb:
                return { width: 5, height: 4, length: 16 };
            case GPUTextureFormat.astc_5x5_unorm:
            case GPUTextureFormat.astc_5x5_unorm_srgb:
                return { width: 5, height: 5, length: 16 };
            case GPUTextureFormat.astc_6x5_unorm:
            case GPUTextureFormat.astc_6x5_unorm_srgb:
                return { width: 6, height: 5, length: 16 };
            case GPUTextureFormat.astc_6x6_unorm:
            case GPUTextureFormat.astc_6x6_unorm_srgb:
                return { width: 6, height: 6, length: 16 };
            case GPUTextureFormat.astc_8x5_unorm:
            case GPUTextureFormat.astc_8x5_unorm_srgb:
                return { width: 8, height: 5, length: 16 };
            case GPUTextureFormat.astc_8x6_unorm:
            case GPUTextureFormat.astc_8x6_unorm_srgb:
                return { width: 8, height: 6, length: 16 };
            case GPUTextureFormat.astc_8x8_unorm:
            case GPUTextureFormat.astc_8x8_unorm_srgb:
                return { width: 8, height: 8, length: 16 };
            case GPUTextureFormat.astc_10x5_unorm:
            case GPUTextureFormat.astc_10x5_unorm_srgb:
                return { width: 10, height: 5, length: 16 };
            case GPUTextureFormat.astc_10x6_unorm:
            case GPUTextureFormat.astc_10x6_unorm_srgb:
                return { width: 10, height: 6, length: 16 };
            case GPUTextureFormat.astc_10x8_unorm:
            case GPUTextureFormat.astc_10x8_unorm_srgb:
                return { width: 10, height: 8, length: 16 };
            case GPUTextureFormat.astc_10x10_unorm:
            case GPUTextureFormat.astc_10x10_unorm_srgb:
                return { width: 10, height: 10, length: 16 };
            case GPUTextureFormat.astc_12x10_unorm:
            case GPUTextureFormat.astc_12x10_unorm_srgb:
                return { width: 12, height: 10, length: 16 };
            case GPUTextureFormat.astc_12x12_unorm:
            case GPUTextureFormat.astc_12x12_unorm_srgb:
                return { width: 12, height: 12, length: 16 };
        }
        return { width: 1, height: 1, length: 4 };
    }
}

//# sourceMappingURL=WebGPUTextureContext.js.map
