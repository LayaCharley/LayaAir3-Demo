import { Context } from "../../resource/Context";
import { Texture } from "../../resource/Texture";
export declare class DrawTexturesCmd {
    static ID: string;
    texture: Texture;
    pos: ArrayLike<number>;
    colors: number[];
    static create(texture: Texture, pos: any[], colors: number[]): DrawTexturesCmd;
    recover(): void;
    run(context: Context, gx: number, gy: number): void;
    get cmdID(): string;
}
