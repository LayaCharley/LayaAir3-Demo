var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Vector4 } from "../../../maths/Vector4";
import { BufferTargetType } from "../../RenderEnum/BufferTargetType";
import { RenderClearFlag } from "../../RenderEnum/RenderClearFlag";
import { WebGPUBuffer } from "./WebGPUBuffer";
import { WebGPUInternalRT } from "./WebGPUInternalRT";
import { WebGPUInternalTex } from "./WebGPUInternalTex";
import { WebGPUSamplerContext } from "./WebGPUSamplerContext";
import { WebGPUTextureContext } from "./WebGPUTextureContext";
import { GPUBUfferUsage } from "./WebGPUBuffer";
import { WebGPUCapable } from "./WebGPUCapable";
import { RenderTargetFormat } from "../../RenderEnum/RenderTargetFormat";
import { TextureDimension } from "../../RenderEnum/TextureDimension";
import { WGPUBindGroupHelper } from "./WGPUBindGroupHelper";
import { WGPURenderPipeline } from "../../../d3/RenderObjs/WebGPUOBJ/WebGPURenderPipelineHelper";
export class WebGPUEngine {
    constructor(config, canvas) {
        this._IDCounter = 0;
        this._GLStatisticsInfo = new Map();
        this._deferredDestroyBuffers = [];
        this._deferredDestroyTextures = [];
        this._propertyNameMap = {};
        this._propertyNameCounter = 0;
        this._canvas = canvas;
        this._config = config;
        this._lastViewport = new Vector4(0, 0, 0, 0);
        this._lastScissor = new Vector4(0, 0, 0, 0);
        if (!navigator.gpu) {
            console.error("WebGPU is not supported by your browser.");
            return;
        }
    }
    _getAdapter() {
        return navigator.gpu.requestAdapter({ powerPreference: this._config.powerPreference });
    }
    _initAdapter(adapter) {
        var _a;
        if (!adapter) {
            throw "Could not retrieve a WebGPU adapter (adapter is null).";
        }
        else {
            this._adapter = adapter;
            const deviceDescriptor = this._config.deviceDescriptor;
            this._adapterSupportedExtensions = [];
            (_a = this._adapter.features) === null || _a === void 0 ? void 0 : _a.forEach((feature) => this._adapterSupportedExtensions.push(feature));
            if (deviceDescriptor === null || deviceDescriptor === void 0 ? void 0 : deviceDescriptor.requiredFeatures) {
                const requestedExtensions = deviceDescriptor.requiredFeatures;
                const validExtensions = [];
                for (const extension of requestedExtensions) {
                    if (this._adapterSupportedExtensions.indexOf(extension) !== -1) {
                        validExtensions.push(extension);
                    }
                }
                deviceDescriptor.requiredFeatures = validExtensions;
            }
        }
    }
    _getGPUdevice(deviceDescriptor) {
        return this._adapter.requestDevice(deviceDescriptor);
    }
    _initGPUDevice(device) {
        this._device = device;
        this._deviceEnabledExtensions = [];
        this._device.features.forEach(element => {
            this._deviceEnabledExtensions.push(element);
        });
        this._device.addEventListener("uncapturederror", this._uncapturederrorCall);
        this._device.lost.then(this._deviceLostCall);
    }
    _uncapturederrorCall(event) {
        console.warn("WebGPU uncaptured error: " + event.error);
        console.warn("WebGPU uncaptured error message: " + event.error.message);
    }
    _deviceLostCall(info) {
        console.error("WebGPU context lost. " + info);
    }
    _initAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._getAdapter().
                then((adapter) => {
                this._initAdapter(adapter);
                return this._getGPUdevice(this._config.deviceDescriptor);
            })
                .then((device) => {
                this._initGPUDevice(device);
                return Promise.resolve();
            }, (e) => {
                console.log(e);
                throw "couldnt get WebGPU Device";
            });
        });
    }
    _initContext() {
        var _a;
        this._context = this._canvas.getContext("webgpu");
        if (!this._context) {
            throw "context cound not get ";
        }
        let swapformat = this._config.swapChainFormat || navigator.gpu.getPreferredCanvasFormat();
        let usages = (_a = this._config.usage) !== null && _a !== void 0 ? _a : GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC;
        this._context.configure({
            device: this._device,
            format: swapformat,
            usage: usages,
            alphaMode: this._config.alphaMode
        });
        WGPURenderPipeline.offscreenFormat = swapformat;
    }
    initRenderEngine() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._initAsync();
            this._initContext();
            this._samplerContext = new WebGPUSamplerContext(this);
            this._webGPUTextureContext = new WebGPUTextureContext(this);
            this._supportCapatable = new WebGPUCapable(this);
            this._cavansRT = new WebGPUInternalRT(this, RenderTargetFormat.R8G8B8A8, RenderTargetFormat.DEPTHSTENCIL_24_Plus, false, false, 1);
            let _offscreenTex = new WebGPUInternalTex(this, 0, 0, TextureDimension.Tex2D, false);
            this._cavansRT.isOffscreenRT = true;
            _offscreenTex.resource = this._context.getCurrentTexture();
            this._cavansRT._textures.push(_offscreenTex);
            this._cavansRT._depthTexture = this._webGPUTextureContext.createRenderTextureInternal(TextureDimension.Tex2D, this._canvas.width, this._canvas.height, RenderTargetFormat.DEPTHSTENCIL_24_Plus, false, false);
            WGPUBindGroupHelper.device = this._device;
        });
    }
    applyRenderStateCMD(cmd) {
    }
    viewport(x, y, width, height) {
        const lv = this._lastViewport;
        if (x !== lv.x || y !== lv.y || width !== lv.z || height !== lv.w) {
            lv.setValue(x, y, width, height);
        }
    }
    scissor(x, y, width, height) {
        const lv = this._lastScissor;
        if (x !== lv.x || y !== lv.y || width !== lv.z || height !== lv.w) {
            lv.setValue(x, y, width, height);
        }
    }
    scissorTest(value) {
        this._enableScissor = value;
    }
    clearRenderTexture(clearFlag, clearcolor, clearDepth) {
        var _a;
        let rt = (_a = this._webGPUTextureContext.curBindWGPURT) !== null && _a !== void 0 ? _a : this._cavansRT;
        rt.loadClear = true;
        rt.clearDes = {
            clearFlag: clearFlag,
            clearColor: clearcolor,
            clearDepth: clearDepth
        };
    }
    colorMask(r, g, b, a) {
    }
    copySubFrameBuffertoTex(texture, level, xoffset, yoffset, x, y, width, height) {
    }
    bindTexture(texture) {
    }
    propertyNameToID(name) {
        if (this._propertyNameMap[name] != null) {
            return this._propertyNameMap[name];
        }
        else {
            var id = this._propertyNameCounter++;
            this._propertyNameMap[name] = id;
            this._propertyNameMap[id] = name;
            return id;
        }
    }
    propertyIDToName(id) {
        return this._propertyNameMap[id];
    }
    getParams(params) {
        return 0;
    }
    getCapable(capatableType) {
        return this._supportCapatable.getCapable(capatableType);
    }
    getTextureContext() {
        return this._webGPUTextureContext;
    }
    getDrawContext() {
        throw new Error("Method not implemented.");
    }
    get2DRenderContext() {
        throw new Error("Method not implemented.");
    }
    getCreateRenderOBJContext() {
        return null;
    }
    uploadUniforms(shader, commandEncoder, shaderData, uploadUnTexture) {
        return 0;
    }
    uploadCustomUniforms(shader, custom, index, data) {
        throw new Error("Method not implemented.");
    }
    createRenderStateComand() {
        return null;
    }
    createShaderInstance(vs, ps, attributeMap) {
        throw new Error("Method not implemented.");
    }
    createBuffer(targetType, bufferUsageType) {
        let usage = GPUBUfferUsage.COPY_DST;
        switch (targetType) {
            case BufferTargetType.ARRAY_BUFFER:
                usage = GPUBUfferUsage.VERTEX | GPUBUfferUsage.COPY_DST;
                break;
            case BufferTargetType.ELEMENT_ARRAY_BUFFER:
                usage = GPUBUfferUsage.INDEX | GPUBUfferUsage.COPY_DST;
                break;
            case BufferTargetType.UNIFORM_BUFFER:
                usage = GPUBUfferUsage.UNIFORM | GPUBUfferUsage.COPY_DST;
                break;
            default:
                break;
        }
        return new WebGPUBuffer(this, usage, 0);
    }
    createVertexState() {
        return null;
    }
    getUBOPointer(name) {
        throw new Error("Method not implemented.");
    }
    clearStatisticsInfo(info) {
        throw new Error("Method not implemented.");
    }
    getStatisticsInfo(info) {
        throw new Error("Method not implemented.");
    }
    unbindVertexState() {
        throw new Error("Method not implemented.");
    }
    getCurCommandEncoder() {
        return null;
    }
    _destroyDeferredBuffer() {
        for (let i = 0; i < this._deferredDestroyBuffers.length; ++i) {
            this._deferredDestroyBuffers[i].release();
        }
        this._deferredDestroyBuffers.length = 0;
    }
    _destroyDefferedTexture() {
        for (let i = 0; i < this._deferredDestroyBuffers.length; ++i) {
            this._deferredDestroyTextures[i].disposDerredDispose();
        }
        this._deferredDestroyTextures.length = 0;
    }
    resizeCavansRT() {
        if (this._cavansRT._depthTexture.width != this._canvas.width || this._cavansRT._depthTexture.height != this._canvas.height) {
            this._cavansRT._depthTexture.resource.destroy();
            this._cavansRT._depthTexture = this._webGPUTextureContext.createRenderTextureInternal(TextureDimension.Tex2D, this._canvas.width, this._canvas.height, RenderTargetFormat.DEPTHSTENCIL_24_Plus, false, false);
        }
    }
    setRenderPassDescriptor(rt, renderPassDec) {
        this.resizeCavansRT();
        let gpurt;
        if (rt) {
            gpurt = rt;
        }
        else {
            gpurt = this._cavansRT;
        }
        if (gpurt.loadClear) {
            let clearflag = gpurt.clearDes.clearFlag;
            renderPassDec.setColorAttachments(gpurt._textures, !!(clearflag & RenderClearFlag.Color), gpurt.clearDes.clearColor);
            renderPassDec.setDepthAttachments(gpurt._depthTexture, !!(clearflag & RenderClearFlag.Depth), gpurt.clearDes.clearDepth);
        }
        else {
            renderPassDec.setColorAttachments(gpurt._textures, false);
            renderPassDec.setDepthAttachments(gpurt._depthTexture, false);
        }
        this._cavansRT._textures[0].resource = this._context.getCurrentTexture();
        if (rt.isOffscreenRT)
            renderPassDec.des.colorAttachments[0].view = this._context.getCurrentTexture().createView();
    }
    createUniformBuffer(bufferSize) {
        let usage = GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST;
        return new WebGPUBuffer(this, usage, bufferSize);
    }
    endframe() {
        this._destroyDeferredBuffer();
        this._destroyDefferedTexture();
    }
}

//# sourceMappingURL=WebGPUEngine.js.map
