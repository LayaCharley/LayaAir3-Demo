var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Config } from "../../../../Config";
import { CommandUniformMap } from "../../../RenderEngine/CommandUniformMap";
import { WebGPUConfig } from "../../../RenderEngine/RenderEngine/WebGPUEngine/WebGPUConfig";
import { WebGPUEngine } from "../../../RenderEngine/RenderEngine/WebGPUEngine/WebGPUEngine";
import { BufferUsage } from "../../../RenderEngine/RenderEnum/BufferTargetType";
import { RenderState } from "../../../RenderEngine/RenderShader/RenderState";
import { RenderStateCommand } from "../../../RenderEngine/RenderStateCommand";
import { UniformBufferObject } from "../../../RenderEngine/UniformBufferObject";
import { LayaGL } from "../../../layagl/LayaGL";
import { Transform3D } from "../../core/Transform3D";
import { IndexBuffer3D } from "../../graphics/IndexBuffer3D";
import { VertexBuffer3D } from "../../graphics/VertexBuffer3D";
import { BoundsImpl } from "../../math/BoundsImpl";
import { BaseRenderNode } from "../RenderObj/BaseRenderNode";
import { BaseRenderQueue } from "../RenderObj/BaseRenderQueue";
import { CameraCullInfo } from "../RenderObj/CameraCullInfo";
import { CullPassBase } from "../RenderObj/CullPass";
import { InstanceRenderElementOBJ } from "../RenderObj/InstanceRenderElementOBJ";
import { QuickSort } from "../RenderObj/QuickSort";
import { RenderGeometryElementOBJ } from "../RenderObj/RenderGeometryElementOBJ";
import { SceneRenderManagerOBJ } from "../RenderObj/SceneRenderManagerOBJ";
import { ShadowCullInfo } from "../RenderObj/ShadowCullInfo";
import { SkinRenderElementOBJ } from "../RenderObj/SkinRenderElementOBJ";
import { WGPURenderContext3D } from "./WGPURenderContext3D";
import { WGPURenderElementObJ } from "./WGPURenderElementObJ";
import { WGPURenderPipelineInstance } from "./WGPURenderPipelineInstance";
import { WGPUShaderData } from "./WGPUShaderData";
export class WGPURenderOBJCreateUtil {
    constructor() {
        this.globalBlockMap = {};
    }
    createTransform(owner) {
        return new Transform3D(owner);
    }
    createBounds(min, max) {
        return new BoundsImpl(min, max);
    }
    createShaderData() {
        return new WGPUShaderData();
    }
    createRenderElement() {
        return new WGPURenderElementObJ();
    }
    createSkinRenderElement() {
        return new SkinRenderElementOBJ();
    }
    createInstanceRenderElement() {
        return new InstanceRenderElementOBJ();
    }
    createBaseRenderQueue(isTransparent) {
        var queue = new BaseRenderQueue(isTransparent);
        queue.sortPass = this.createSortPass();
        return queue;
    }
    createRenderGeometry(mode, drayType) {
        return new RenderGeometryElementOBJ(mode, drayType);
    }
    createVertexBuffer3D(byteLength, bufferUsage, canRead = false) {
        return new VertexBuffer3D(byteLength, bufferUsage, canRead);
    }
    createIndexBuffer3D(indexType, indexCount, bufferUsage = BufferUsage.Static, canRead = false) {
        return new IndexBuffer3D(indexType, indexCount, bufferUsage, canRead);
    }
    createShaderInstance(shaderProcessInfo, shaderPass) {
        return new WGPURenderPipelineInstance(shaderProcessInfo, shaderPass);
    }
    createBaseRenderNode() {
        return new BaseRenderNode();
    }
    createRenderContext3D() {
        return new WGPURenderContext3D();
    }
    createSceneRenderManager() {
        return new SceneRenderManagerOBJ();
    }
    createCullPass() {
        return new CullPassBase();
    }
    createSortPass() {
        return new QuickSort();
    }
    createShadowCullInfo() {
        return new ShadowCullInfo();
    }
    createCameraCullInfo() {
        return new CameraCullInfo();
    }
    createRenderStateComand() {
        return new RenderStateCommand();
    }
    createRenderState() {
        return new RenderState();
    }
    createUniformBufferObject(glPointer, name, bufferUsage, byteLength, isSingle) {
        return new UniformBufferObject(glPointer, name, bufferUsage, byteLength, isSingle);
    }
    createGlobalUniformMap(blockName) {
        let comMap = this.globalBlockMap[blockName];
        if (!comMap)
            comMap = this.globalBlockMap[blockName] = new CommandUniformMap(blockName);
        ;
        return comMap;
    }
    createEngine(config, canvas) {
        return __awaiter(this, void 0, void 0, function* () {
            let gpuConfig = new WebGPUConfig();
            gpuConfig.alphaMode = Config.premultipliedAlpha ? "premultiplied" : "opaque";
            gpuConfig.colorSpace = "srgb";
            switch (Config.powerPreference) {
                case "default":
                    gpuConfig.powerPreference = undefined;
                    break;
                default:
                    gpuConfig.powerPreference = Config.powerPreference;
                    break;
            }
            let engine = new WebGPUEngine(gpuConfig, canvas._source);
            LayaGL.renderEngine = engine;
            yield engine.initRenderEngine();
            LayaGL.textureContext = engine.getTextureContext();
            return Promise.resolve();
        });
    }
}

//# sourceMappingURL=WGPURenderOBJCreateUtil.js.map
