import { VertexBuffer3D } from "../../graphics/VertexBuffer3D";
import { NativeRenderElementOBJ } from "./NativeRenderElementOBJ";
export declare class NativeInstanceRenderElementOBJ extends NativeRenderElementOBJ {
    private _updateData;
    private _updateNums;
    addUpdateBuffer(vb: VertexBuffer3D, length: number): void;
    getUpdateData(index: number, length: number): Float32Array;
    constructor();
    clear(): void;
    init(): void;
    set drawCount(drawCount: number);
    get drawCount(): number;
}
