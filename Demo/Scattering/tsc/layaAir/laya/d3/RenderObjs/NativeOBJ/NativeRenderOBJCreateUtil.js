import { NativeRenderStateCommand } from "../../../RenderEngine/RenderEngine/NativeGLEngine/NativeRenderStateCommand";
import { BufferUsage } from "../../../RenderEngine/RenderEnum/BufferTargetType";
import { NativeBaseRenderNode } from "./NativeBaseRenderNode";
import { NativeBaseRenderQueue } from "./NativeBaseRenderQueue";
import { NativeBounds } from "./NativeBounds";
import { NativeCameraCullInfo } from "./NativeCameraCullInfo";
import { NativeCommandUniformMap } from "./NativeCommandUniformMap";
import { NativeCullPassBase } from "./NativeCullPass";
import { NativeIndexBuffer3D } from "./NativeIndexBuffer3D";
import { NativeInstanceRenderElementOBJ } from "./NativeInstanceRenderElementOBJ";
import { NativeRenderContext3DOBJ } from "./NativeRenderContext3DOBJ";
import { NativeRenderElementOBJ } from "./NativeRenderElementOBJ";
import { NativeRenderGeometryElementOBJ } from "./NativeRenderGeometryElementOBJ";
import { NativeRenderState } from "./NativeRenderState";
import { NativeSceneRenderManager } from "./NativeSceneRenderManager";
import { NativeShaderData } from "./NativeShaderData";
import { NativeShadowCullInfo } from "./NativeShadowCullInfo";
import { NativeSkinRenderElementOBJ } from "./NativeSkinRenderElementOBJ";
import { NativeTransform3D } from "./NativeTransform3D";
import { NativeUniformBufferObject } from "./NativeUniformBufferObject";
import { NativeVertexBuffer3D } from "./NativeVertexBuffer3D";
export class NativeRenderOBJCreateUtil {
    createTransform(owner) {
        return new NativeTransform3D(owner);
    }
    createBounds(min, max) {
        return new NativeBounds(min, max);
    }
    createShaderData() {
        return new NativeShaderData();
    }
    createRenderElement() {
        return new NativeRenderElementOBJ();
    }
    createSkinRenderElement() {
        return new NativeSkinRenderElementOBJ();
    }
    createInstanceRenderElement() {
        return new NativeInstanceRenderElementOBJ();
    }
    createBaseRenderQueue(isTransparent) {
        var queue = new NativeBaseRenderQueue(isTransparent);
        queue.sortPass = this.createSortPass();
        return queue;
    }
    createRenderGeometry(mode, drayType) {
        return new NativeRenderGeometryElementOBJ(mode, drayType);
    }
    createVertexBuffer3D(byteLength, bufferUsage, canRead = false) {
        return new NativeVertexBuffer3D(byteLength, bufferUsage, canRead);
    }
    createIndexBuffer3D(indexType, indexCount, bufferUsage = BufferUsage.Static, canRead = false) {
        return new NativeIndexBuffer3D(indexType, indexCount, bufferUsage, canRead);
    }
    createShaderInstance(shaderProcessInfo, shaderPass) {
        return null;
    }
    createBaseRenderNode() {
        return new NativeBaseRenderNode();
    }
    createRenderContext3D() {
        return new NativeRenderContext3DOBJ();
    }
    createSceneRenderManager() {
        return new NativeSceneRenderManager();
    }
    createCullPass() {
        return new NativeCullPassBase();
    }
    createSortPass() {
        return new window.conchQuickSort();
    }
    createShadowCullInfo() {
        return new NativeShadowCullInfo();
    }
    createCameraCullInfo() {
        return new NativeCameraCullInfo();
    }
    createRenderStateComand() {
        return new NativeRenderStateCommand();
    }
    createRenderState() {
        return new NativeRenderState();
    }
    createUniformBufferObject(glPointer, name, bufferUsage, byteLength, isSingle) {
        return new NativeUniformBufferObject(glPointer, name, bufferUsage, byteLength, isSingle);
    }
    createGlobalUniformMap(blockName) {
        return new NativeCommandUniformMap(window.conchCommandUniformMap.createGlobalUniformMap(blockName), blockName);
    }
    createEngine(config, canvas) {
        return null;
    }
}

//# sourceMappingURL=NativeRenderOBJCreateUtil.js.map
