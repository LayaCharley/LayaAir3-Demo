import { Point } from "../../maths/Point";
import { Context } from "../../resource/Context";
import { Texture } from "../../resource/Texture";
export declare class FillTextureCmd {
    static ID: string;
    texture: Texture;
    x: number;
    y: number;
    width: number;
    height: number;
    type?: string;
    offset?: Point;
    percent: boolean;
    color: number;
    static create(texture: Texture, x: number, y: number, width: number, height: number, type: string, offset: Point, color: string): FillTextureCmd;
    recover(): void;
    run(context: Context, gx: number, gy: number): void;
    get cmdID(): string;
    getBoundPoints(sp?: {
        width: number;
        height?: number;
    }): number[];
}
