import { BlendEquationSeparate } from "../../../RenderEngine/RenderEnum/BlendEquationSeparate";
import { BlendFactor } from "../../../RenderEngine/RenderEnum/BlendFactor";
import { BlendType } from "../../../RenderEngine/RenderEnum/BlendType";
import { CompareFunction } from "../../../RenderEngine/RenderEnum/CompareFunction";
import { CullMode } from "../../../RenderEngine/RenderEnum/CullMode";
import { IndexFormat } from "../../../RenderEngine/RenderEnum/IndexFormat";
import { MeshTopology } from "../../../RenderEngine/RenderEnum/RenderPologyMode";
import { RenderTargetFormat } from "../../../RenderEngine/RenderEnum/RenderTargetFormat";
import { VertexElementFormat } from "../../../renders/VertexElementFormat";
export class WGPUBlendState {
    constructor(blend, operationRGB, srcBlendRGB, dstBlendRGB, operationAlpha, srcBlendAlpha, dstBlendAlpha) {
        this.mapId = -1;
        this.mapId = WGPUBlendState.getmapID(blend, operationRGB, srcBlendRGB, dstBlendRGB, operationAlpha, srcBlendAlpha, dstBlendAlpha);
        if (blend == BlendType.BLEND_DISABLE) {
            this.state = null;
        }
        else {
            this.state.color = this.getComponent(operationRGB, srcBlendRGB, dstBlendRGB);
            this.state.alpha = this.getComponent(operationAlpha, srcBlendAlpha, dstBlendAlpha);
        }
        WGPUBlendState.pool[this.mapId] = this;
    }
    static getBlendState(blend, operationRGB = BlendEquationSeparate.ADD, srcBlendRGB = BlendFactor.One, dstBlendRGB = BlendFactor.One, operationAlpha = BlendEquationSeparate.ADD, srcBlendAlpha = BlendFactor.One, dstBlendAlpha = BlendFactor.One) {
        let id = WGPUBlendState.getmapID(blend, operationRGB, srcBlendRGB, dstBlendRGB, operationAlpha, srcBlendAlpha, dstBlendAlpha);
        if (WGPUBlendState.pool[id]) {
            return WGPUBlendState.pool[id];
        }
        else {
            return new WGPUBlendState(blend, operationRGB, srcBlendRGB, dstBlendRGB, operationAlpha, srcBlendAlpha, dstBlendAlpha);
        }
    }
    getComponent(operation, src, dst) {
        let comp = {};
        let getfactor = (factor) => {
            switch (factor) {
                case BlendFactor.Zero:
                    return "zero";
                case BlendFactor.One:
                    return "one";
                case BlendFactor.SourceColor:
                    return "src";
                case BlendFactor.OneMinusSourceColor:
                    return "one-minus-src";
                case BlendFactor.DestinationColor:
                    return "dst";
                case BlendFactor.OneMinusDestinationColor:
                    return "one-minus-dst";
                case BlendFactor.SourceAlpha:
                    return "src-alpha";
                case BlendFactor.OneMinusSourceAlpha:
                    return "one-minus-src-alpha";
                case BlendFactor.DestinationAlpha:
                    return "dst-alpha";
                case BlendFactor.OneMinusDestinationAlpha:
                    return "one-minus-dst-alpha";
                case BlendFactor.SourceAlphaSaturate:
                    return "src-alpha-saturated";
                case BlendFactor.BlendColor:
                    return "constant";
                case BlendFactor.OneMinusBlendColor:
                    return "one-minus-constant";
            }
        };
        switch (operation) {
            case BlendEquationSeparate.ADD:
                comp.operation = "add";
                break;
            case BlendEquationSeparate.SUBTRACT:
                comp.operation = "subtract";
                break;
            case BlendEquationSeparate.MAX:
                comp.operation = "max";
                break;
            case BlendEquationSeparate.MIN:
                comp.operation = "min";
                break;
            case BlendEquationSeparate.REVERSE_SUBTRACT:
                comp.operation = "reverse-subtract";
                break;
        }
        ;
        comp.srcFactor = getfactor(src);
        comp.dstFactor = getfactor(dst);
        return comp;
    }
    static getmapID(blend, operationRGB, srcBlendRGB, dstBlendRGB, operationAlpha, srcBlendAlpha, dstBlendAlpha) {
        if (blend == BlendType.BLEND_DISABLE) {
            return -1;
        }
        else {
            return srcBlendRGB + (dstBlendRGB << 4) + (srcBlendAlpha << 8) + (dstBlendAlpha << 12) + (operationRGB << 16) + (operationAlpha << 19);
        }
    }
}
WGPUBlendState.pool = {};
export class WGPUDepthStencilState {
    constructor(format, depthWriteEnabled, depthCompare, stencilParam = null, depthBiasParam = null) {
        this.mapId = -1;
        this.mapId = WGPUDepthStencilState.getmapID(format, depthWriteEnabled, depthCompare, stencilParam, depthBiasParam);
        this.state = { format: "depth24plus-stencil8" };
        WGPUDepthStencilState.pool[this.mapId] = this;
        switch (format) {
            case RenderTargetFormat.DEPTH_16:
                this.state.format = "depth16unorm";
                break;
            case RenderTargetFormat.DEPTHSTENCIL_24_8:
                this.state.format = "depth24plus-stencil8";
                break;
            case RenderTargetFormat.DEPTH_32:
                this.state.format = "depth32float";
                break;
            case RenderTargetFormat.STENCIL_8:
                this.state.format = "stencil8";
                break;
            case RenderTargetFormat.DEPTHSTENCIL_24_Plus:
                this.state.format = "depth24plus";
                break;
        }
        this.state.depthWriteEnabled = depthWriteEnabled;
        switch (depthCompare) {
            case CompareFunction.Never:
                this.state.depthCompare = "never";
                break;
            case CompareFunction.Less:
                this.state.depthCompare = "greater";
                break;
            case CompareFunction.Equal:
                this.state.depthCompare = "equal";
                break;
            case CompareFunction.LessEqual:
                this.state.depthCompare = "less-equal";
                break;
            case CompareFunction.Greater:
                this.state.depthCompare = "greater";
                break;
            case CompareFunction.NotEqual:
                this.state.depthCompare = "not-equal";
                break;
            case CompareFunction.GreaterEqual:
                this.state.depthCompare = "greater-equal";
                break;
            case CompareFunction.Always:
                this.state.depthCompare = "always";
                break;
        }
    }
    static getmapID(format, depthWriteEnabled, depthCompare, stencilParam = null, depthBiasParam = null) {
        return format + ((depthWriteEnabled ? 0 : 1) << 6) + (depthCompare << 7);
    }
    static getDepthStencilState(format, depthWriteEnabled, depthCompare, stencilParam = null, depthBiasParam = null) {
        let id = WGPUDepthStencilState.getmapID(format, depthWriteEnabled, depthCompare, stencilParam, depthBiasParam);
        if (WGPUDepthStencilState.pool[id]) {
            return WGPUDepthStencilState.pool[id];
        }
        else {
            return new WGPUDepthStencilState(format, depthWriteEnabled, depthCompare, stencilParam, depthBiasParam);
        }
    }
}
WGPUDepthStencilState.pool = {};
export class WGPUPrimitiveState {
    constructor(mode, indexformat, cullMode, unclippedDepth = true) {
        this.mapId = -1;
        this.mapId = WGPUPrimitiveState.getmapID(mode, indexformat, cullMode, unclippedDepth);
        this.state = {};
        WGPUPrimitiveState.pool[this.mapId] = this;
        let stripIndexFormat;
        switch (indexformat) {
            case IndexFormat.UInt16:
                stripIndexFormat = "uint16";
                break;
            case IndexFormat.UInt32:
                stripIndexFormat = "uint32";
                break;
            default:
                stripIndexFormat = "uint16";
                break;
        }
        switch (mode) {
            case MeshTopology.Points:
                this.state.topology = "point-list";
                break;
            case MeshTopology.Lines:
                this.state.topology = "line-list";
                break;
            case MeshTopology.LineStrip:
                this.state.topology = "line-strip";
                this.state.stripIndexFormat = stripIndexFormat;
                break;
            case MeshTopology.Triangles:
                this.state.topology = "triangle-list";
                break;
            case MeshTopology.TriangleStrip:
                this.state.topology = "triangle-strip";
                this.state.stripIndexFormat = stripIndexFormat;
                break;
            default:
                this.state.topology = "triangle-list";
                break;
        }
        switch (cullMode) {
            case CullMode.Off:
                this.state.cullMode = "none";
                break;
            case CullMode.Back:
                this.state.cullMode = "front";
                break;
            case CullMode.Front:
                this.state.cullMode = "back";
                break;
        }
        this.state.unclippedDepth = unclippedDepth;
    }
    static getmapID(mode, indexformat, cullMode, unclippedDepth = true) {
        return (mode) + (indexformat << 3) + (cullMode << 5) + ((unclippedDepth ? 1 : 0) << 7);
    }
    static getPrimitiveState(mode, indexformat, cullMode, unclippedDepth = true) {
        let id = WGPUPrimitiveState.getmapID(mode, indexformat, cullMode, unclippedDepth);
        if (WGPUPrimitiveState.pool[id]) {
            return WGPUPrimitiveState.pool[id];
        }
        else
            return new WGPUPrimitiveState(mode, indexformat, cullMode, unclippedDepth);
    }
}
WGPUPrimitiveState.pool = {};
export class WGPUVertexBufferLayouts {
    constructor(vertexlayout) {
        this.state = [];
        WGPUVertexBufferLayouts.pool[vertexlayout.id] = this;
        this.mapID = vertexlayout.id;
        this.state = new Array();
        let vaeelements = vertexlayout.VAElements;
        for (var i = 0, n = vaeelements.length; i < n; i++) {
            let vaeOneElements = vaeelements[i];
            let stride = vertexlayout.attributeByteSize[i];
            let stepmode = vertexlayout.instanceMode[i] ? "instance" : 'vertex';
            let arrays = new Array();
            for (var j = 0, m = vaeOneElements.length; j < m; j++) {
                let vaee = vaeOneElements[j];
                let ob = {
                    format: this.getvertexAttributeFormat(vaee.format),
                    offset: vaee.stride,
                    shaderLocation: vaee.shaderLocation
                };
                arrays.push(ob);
            }
            let vbl = {
                arrayStride: stride,
                stepMode: stepmode,
                attributes: arrays
            };
            this.state.push(vbl);
        }
    }
    static getVertexBufferLayouts(vetexlayout) {
        if (WGPUVertexBufferLayouts.pool[vetexlayout.id]) {
            return WGPUVertexBufferLayouts.pool[vetexlayout.id];
        }
        else {
            return new WGPUVertexBufferLayouts(vetexlayout);
        }
    }
    getvertexAttributeFormat(data) {
        switch (data) {
            case VertexElementFormat.Single:
                return "float32";
            case VertexElementFormat.Vector2:
                return "float32x2";
            case VertexElementFormat.Vector3:
                return "float32x3";
            case VertexElementFormat.Vector4:
                return "float32x4";
            case VertexElementFormat.Color:
                return "float32x4";
            case VertexElementFormat.Byte4:
                return "uint8x4";
            case VertexElementFormat.Byte2:
                return "uint8x2";
            case VertexElementFormat.Short2:
                return "float16x2";
            case VertexElementFormat.Short4:
                return "float16x4";
            case VertexElementFormat.NormalizedShort2:
                return "unorm16x2";
            case VertexElementFormat.NormalizedShort4:
                return "unorm16x4";
            case VertexElementFormat.NorByte4:
                return "unorm8x4";
            default:
                throw 'no cache has vertex mode';
        }
    }
}
WGPUVertexBufferLayouts.pool = {};
export class WGPURenderPipeline {
    constructor(engine, gpuPipelineLayout, vertexModule, fragModule, vertexBufferLayouts, targets, blendState, depthStencilState, primitiveState) {
        let dest = {
            layout: gpuPipelineLayout,
            vertex: {
                module: vertexModule,
                entryPoint: "main",
                buffers: vertexBufferLayouts.state
            },
            fragment: {
                module: fragModule,
                entryPoint: "main",
                targets: this.getFragmentFormatByRT(targets, blendState),
            },
            primitive: primitiveState.state,
            depthStencil: depthStencilState.state
        };
        this.pipeline = engine._device.createRenderPipeline(dest);
    }
    getFragmentFormatByRT(rt, blendState) {
        let colortargetState = new Array();
        let gpuformat = "rgba8unorm";
        if (!rt.isOffscreenRT) {
            switch (rt.colorFormat) {
                case RenderTargetFormat.None:
                case RenderTargetFormat.R8G8B8A8:
                    gpuformat = rt.isSRGB ? "rgba8unorm-srgb" : "rgba8unorm";
                    break;
                case RenderTargetFormat.R16G16B16A16:
                    gpuformat = "rgba16float";
                    break;
                case RenderTargetFormat.R32G32B32A32:
                    gpuformat = "rgba32float";
                    break;
            }
        }
        else {
            gpuformat = WGPURenderPipeline.offscreenFormat;
        }
        colortargetState.push(blendState.state ? {
            format: gpuformat,
            blend: blendState.state
        } : {
            format: gpuformat
        });
        return colortargetState;
    }
}

//# sourceMappingURL=WebGPURenderPipelineHelper.js.map
