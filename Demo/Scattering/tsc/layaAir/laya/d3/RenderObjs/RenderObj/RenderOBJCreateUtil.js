import { Config } from "../../../../Config";
import { LayaGL } from "../../../layagl/LayaGL";
import { CommandUniformMap } from "../../../RenderEngine/CommandUniformMap";
import { WebGLMode } from "../../../RenderEngine/RenderEngine/WebGLEngine/GLEnum/WebGLMode";
import { WebGLEngine } from "../../../RenderEngine/RenderEngine/WebGLEngine/WebGLEngine";
import { BufferUsage } from "../../../RenderEngine/RenderEnum/BufferTargetType";
import { RenderState } from "../../../RenderEngine/RenderShader/RenderState";
import { ShaderData } from "../../../RenderEngine/RenderShader/ShaderData";
import { ShaderInstance } from "../../../RenderEngine/RenderShader/ShaderInstance";
import { RenderStateCommand } from "../../../RenderEngine/RenderStateCommand";
import { UniformBufferObject } from "../../../RenderEngine/UniformBufferObject";
import { Transform3D } from "../../core/Transform3D";
import { IndexBuffer3D } from "../../graphics/IndexBuffer3D";
import { VertexBuffer3D } from "../../graphics/VertexBuffer3D";
import { BoundsImpl } from "../../math/BoundsImpl";
import { BaseRenderNode } from "./BaseRenderNode";
import { BaseRenderQueue } from "./BaseRenderQueue";
import { CameraCullInfo } from "./CameraCullInfo";
import { CullPassBase } from "./CullPass";
import { InstanceRenderElementOBJ } from "./InstanceRenderElementOBJ";
import { QuickSort } from "./QuickSort";
import { RenderContext3DOBJ } from "./RenderContext3DOBJ";
import { RenderElementOBJ } from "./RenderElementOBJ";
import { RenderGeometryElementOBJ } from "./RenderGeometryElementOBJ";
import { SceneRenderManagerOBJ } from "./SceneRenderManagerOBJ";
import { ShadowCullInfo } from "./ShadowCullInfo";
import { SkinRenderElementOBJ } from "./SkinRenderElementOBJ";
export class RenderOBJCreateUtil {
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
        return new ShaderData();
    }
    createRenderElement() {
        return new RenderElementOBJ();
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
        return new ShaderInstance(shaderProcessInfo, shaderPass);
    }
    createBaseRenderNode() {
        return new BaseRenderNode();
    }
    createRenderContext3D() {
        return new RenderContext3DOBJ();
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
        let engine;
        let glConfig = { stencil: Config.isStencil, alpha: Config.isAlpha, antialias: Config.isAntialias, premultipliedAlpha: Config.premultipliedAlpha, preserveDrawingBuffer: Config.preserveDrawingBuffer, depth: Config.isDepth, failIfMajorPerformanceCaveat: Config.isfailIfMajorPerformanceCaveat, powerPreference: Config.powerPreference };
        const webglMode = Config.useWebGL2 ? WebGLMode.Auto : WebGLMode.WebGL1;
        engine = new WebGLEngine(glConfig, webglMode);
        engine.initRenderEngine(canvas._source);
        var gl = engine._context;
        if (Config.printWebglOrder)
            this._replaceWebglcall(gl);
        if (gl) {
            new LayaGL();
        }
        LayaGL.renderEngine = engine;
        LayaGL.textureContext = engine.getTextureContext();
        LayaGL.renderDrawContext = engine.getDrawContext();
        LayaGL.render2DContext = engine.get2DRenderContext();
        return Promise.resolve();
    }
    _replaceWebglcall(gl) {
        var tempgl = {};
        for (const key in gl) {
            if (typeof gl[key] == "function" && key != "getError" && key != "__SPECTOR_Origin_getError" && key != "__proto__") {
                tempgl[key] = gl[key];
                gl[key] = function () {
                    let arr = [];
                    for (let i = 0; i < arguments.length; i++) {
                        arr.push(arguments[i]);
                    }
                    let result = tempgl[key].apply(gl, arr);
                    let err = gl.getError();
                    if (err) {
                        debugger;
                    }
                    return result;
                };
            }
        }
    }
}

//# sourceMappingURL=RenderOBJCreateUtil.js.map
