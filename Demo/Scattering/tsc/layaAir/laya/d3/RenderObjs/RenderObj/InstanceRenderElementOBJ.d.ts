import { ShaderInstance } from "../../../RenderEngine/RenderShader/ShaderInstance";
import { VertexBuffer3D } from "../../graphics/VertexBuffer3D";
import { RenderElementOBJ } from "./RenderElementOBJ";
export declare class InstanceRenderElementOBJ extends RenderElementOBJ {
    private _updateData;
    private _updateDataNum;
    drawCount: number;
    updateNums: number;
    addUpdateBuffer(vb: VertexBuffer3D, length: number): void;
    getUpdateData(index: number, length: number): Float32Array;
    constructor();
    drawGeometry(shaderIns: ShaderInstance): void;
    clear(): void;
}
