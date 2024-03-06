import { VertexBuffer3D } from "../../../graphics/VertexBuffer3D";
import { Mesh } from "../../../resource/models/Mesh";
import { Material } from "../../material/Material";
import { Command } from "./Command";
import { Matrix4x4 } from "../../../../maths/Matrix4x4";
export declare class DrawMeshInstancedCMD extends Command {
    static maxInstanceCount: number;
    constructor();
    set material(value: Material);
    get bufferState(): VertexBuffer3D;
    set mesh(value: Mesh);
    get mesh(): Mesh;
    setWorldMatrix(worldMatrixArray: Matrix4x4[]): void;
    setDrawNums(drawNums: number): void;
    run(): void;
    recover(): void;
    destroy(): void;
}
