import { CommandUniformMap } from "../../../RenderEngine/CommandUniformMap";
import { BufferUsage } from "../../../RenderEngine/RenderEnum/BufferTargetType";
import { DrawType } from "../../../RenderEngine/RenderEnum/DrawType";
import { IndexFormat } from "../../../RenderEngine/RenderEnum/IndexFormat";
import { MeshTopology } from "../../../RenderEngine/RenderEnum/RenderPologyMode";
import { IRenderOBJCreate } from "../../../RenderEngine/RenderInterface/IRenderOBJCreate";
import { IRenderGeometryElement } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/IRenderGeometryElement";
import { IRenderQueue } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/IRenderQueue";
import { RenderState } from "../../../RenderEngine/RenderShader/RenderState";
import { RenderStateCommand } from "../../../RenderEngine/RenderStateCommand";
import { UniformBufferObject } from "../../../RenderEngine/UniformBufferObject";
import { Vector3 } from "../../../maths/Vector3";
import { ShaderCompileDefineBase, ShaderProcessInfo } from "../../../webgl/utils/ShaderCompileDefineBase";
import { Sprite3D } from "../../core/Sprite3D";
import { Transform3D } from "../../core/Transform3D";
import { IndexBuffer3D } from "../../graphics/IndexBuffer3D";
import { VertexBuffer3D } from "../../graphics/VertexBuffer3D";
import { BaseRenderNode } from "../RenderObj/BaseRenderNode";
import { CameraCullInfo } from "../RenderObj/CameraCullInfo";
import { CullPassBase } from "../RenderObj/CullPass";
import { InstanceRenderElementOBJ } from "../RenderObj/InstanceRenderElementOBJ";
import { QuickSort } from "../RenderObj/QuickSort";
import { SceneRenderManagerOBJ } from "../RenderObj/SceneRenderManagerOBJ";
import { ShadowCullInfo } from "../RenderObj/ShadowCullInfo";
import { SkinRenderElementOBJ } from "../RenderObj/SkinRenderElementOBJ";
import { WGPURenderContext3D } from "./WGPURenderContext3D";
import { WGPURenderElementObJ } from "./WGPURenderElementObJ";
import { WGPURenderPipelineInstance } from "./WGPURenderPipelineInstance";
import { WGPUShaderData } from "./WGPUShaderData";
export declare class WGPURenderOBJCreateUtil implements IRenderOBJCreate {
    createTransform(owner: Sprite3D): Transform3D;
    createBounds(min: Vector3, max: Vector3): any;
    createShaderData(): WGPUShaderData;
    createRenderElement(): WGPURenderElementObJ;
    createSkinRenderElement(): SkinRenderElementOBJ;
    createInstanceRenderElement(): InstanceRenderElementOBJ;
    createBaseRenderQueue(isTransparent: boolean): IRenderQueue;
    createRenderGeometry(mode: MeshTopology, drayType: DrawType): IRenderGeometryElement;
    createVertexBuffer3D(byteLength: number, bufferUsage: BufferUsage, canRead?: boolean): VertexBuffer3D;
    createIndexBuffer3D(indexType: IndexFormat, indexCount: number, bufferUsage?: BufferUsage, canRead?: boolean): IndexBuffer3D;
    createShaderInstance(shaderProcessInfo: ShaderProcessInfo, shaderPass: ShaderCompileDefineBase): WGPURenderPipelineInstance;
    createBaseRenderNode(): BaseRenderNode;
    createRenderContext3D(): WGPURenderContext3D;
    createSceneRenderManager(): SceneRenderManagerOBJ;
    createCullPass(): CullPassBase;
    createSortPass(): QuickSort;
    createShadowCullInfo(): ShadowCullInfo;
    createCameraCullInfo(): CameraCullInfo;
    createRenderStateComand(): RenderStateCommand;
    createRenderState(): RenderState;
    createUniformBufferObject(glPointer: number, name: string, bufferUsage: BufferUsage, byteLength: number, isSingle: boolean): UniformBufferObject;
    createGlobalUniformMap(blockName: string): CommandUniformMap;
    createEngine(config: any, canvas: any): Promise<any>;
}
