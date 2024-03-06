import { Context } from "../../resource/Context";
import { Texture } from "../../resource/Texture";
export declare class DrawImageCmd {
    static ID: string;
    texture: Texture | null;
    x: number;
    y: number;
    width: number;
    height: number;
    color: number;
    static create(texture: Texture, x: number, y: number, width: number, height: number, color: string): DrawImageCmd;
    recover(): void;
    run(context: Context, gx: number, gy: number): void;
    get cmdID(): string;
}
