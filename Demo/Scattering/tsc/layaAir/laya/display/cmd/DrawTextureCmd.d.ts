import { Matrix } from "../../maths/Matrix";
import { Context } from "../../resource/Context";
import { Texture } from "../../resource/Texture";
export declare class DrawTextureCmd {
    static ID: string;
    texture: Texture | null;
    x: number;
    y: number;
    width: number;
    height: number;
    matrix: Matrix | null;
    alpha: number;
    color: number;
    blendMode: string | null;
    uv: number[] | null;
    static create(texture: Texture, x: number, y: number, width: number, height: number, matrix: Matrix | null, alpha: number, color: string | null, blendMode: string | null, uv?: number[]): DrawTextureCmd;
    recover(): void;
    run(context: Context, gx: number, gy: number): void;
    get cmdID(): string;
}
