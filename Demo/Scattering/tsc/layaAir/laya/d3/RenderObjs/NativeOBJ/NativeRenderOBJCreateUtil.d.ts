import { Vector3 } from "../../../maths/Vector3";
import { NativeRenderStateCommand } from "../../../RenderEngine/RenderEngine/NativeGLEngine/NativeRenderStateCommand";
import { BufferUsage } from "../../../RenderEngine/RenderEnum/BufferTargetType";
import { DrawType } from "../../../RenderEngine/RenderEnum/DrawType";
import { IndexFormat } from "../../../RenderEngine/RenderEnum/IndexFormat";
import { MeshTopology } from "../../../RenderEngine/RenderEnum/RenderPologyMode";
import { IRenderEngine } from "../../../RenderEngine/RenderInterface/IRenderEngine";
import { IRenderOBJCreate } from "../../../RenderEngine/RenderInterface/IRenderOBJCreate";
import { IBaseRenderNode } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/IBaseRenderNode";
import { ICameraCullInfo } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/ICameraCullInfo";
import { ICullPass } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/ICullPass";
import { IRenderContext3D } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/IRenderContext3D";
import { IRenderElement } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/IRenderElement";
import { IRenderGeometryElement } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/IRenderGeometryElement";
import { IRenderQueue } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/IRenderQueue";
import { ISceneRenderManager } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/ISceneRenderManager";
import { IShadowCullInfo } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/IShadowCullInfo";
import { ISortPass } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/ISortPass";
import { RenderState } from "../../../RenderEngine/RenderShader/RenderState";
import { ShaderData } from "../../../RenderEngine/RenderShader/ShaderData";
import { ShaderInstance } from "../../../RenderEngine/RenderShader/ShaderInstance";
import { UniformBufferObject } from "../../../RenderEngine/UniformBufferObject";
import { ShaderCompileDefineBase, ShaderProcessInfo } from "../../../webgl/utils/ShaderCompileDefineBase";
import { Sprite3D } from "../../core/Sprite3D";
import { Transform3D } from "../../core/Transform3D";
import { IndexBuffer3D } from "../../graphics/IndexBuffer3D";
import { NativeCommandUniformMap } from "./NativeCommandUniformMap";
import { NativeVertexBuffer3D } from "./NativeVertexBuffer3D";
export declare class NativeRenderOBJCreateUtil implements IRenderOBJCreate {
    createTransform(owner: Sprite3D): Transform3D;
    createBounds(min: Vector3, max: Vector3): any;
    createShaderData(): ShaderData;
    createRenderElement(): IRenderElement;
    createSkinRenderElement(): IRenderElement;
    createInstanceRenderElement(): IRenderElement;
    createBaseRenderQueue(isTransparent: boolean): IRenderQueue;
    createRenderGeometry(mode: MeshTopology, drayType: DrawType): IRenderGeometryElement;
    createVertexBuffer3D(byteLength: number, bufferUsage: BufferUsage, canRead?: boolean): NativeVertexBuffer3D;
    createIndexBuffer3D(indexType: IndexFormat, indexCount: number, bufferUsage?: BufferUsage, canRead?: boolean): IndexBuffer3D;
    createShaderInstance(shaderProcessInfo: ShaderProcessInfo, shaderPass: ShaderCompileDefineBase): ShaderInstance;
    createBaseRenderNode(): IBaseRenderNode;
    createRenderContext3D(): IRenderContext3D;
    createSceneRenderManager(): ISceneRenderManager;
    createCullPass(): ICullPass;
    createSortPass(): ISortPass;
    createShadowCullInfo(): IShadowCullInfo;
    createCameraCullInfo(): ICameraCullInfo;
    createRenderStateComand(): NativeRenderStateCommand;
    createRenderState(): RenderState;
    createUniformBufferObject(glPointer: number, name: string, bufferUsage: BufferUsage, byteLength: number, isSingle: boolean): UniformBufferObject;
    createGlobalUniformMap(blockName: string): NativeCommandUniformMap;
    createEngine(config: any, canvas: any): IRenderEngine;
}
