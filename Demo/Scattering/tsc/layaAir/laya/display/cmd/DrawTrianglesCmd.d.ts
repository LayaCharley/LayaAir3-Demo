import { Matrix } from "../../maths/Matrix";
import { Context } from "../../resource/Context";
import { Texture } from "../../resource/Texture";
export declare class DrawTrianglesCmd {
    static ID: string;
    texture: Texture | null;
    x: number;
    y: number;
    vertices: Float32Array;
    uvs: Float32Array;
    indices: Uint16Array;
    matrix: Matrix | null;
    alpha: number;
    blendMode: string | null;
    color: number | null;
    static create(texture: Texture, x: number, y: number, vertices: Float32Array, uvs: Float32Array, indices: Uint16Array, matrix: Matrix | null, alpha: number, color: string | number, blendMode: string | null): DrawTrianglesCmd;
    recover(): void;
    run(context: Context, gx: number, gy: number): void;
    get cmdID(): string;
    getBoundPoints(sp?: {
        width: number;
        height?: number;
    }): number[];
}
