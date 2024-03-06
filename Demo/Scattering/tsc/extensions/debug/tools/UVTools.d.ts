import { Rectangle } from "laya/maths/Rectangle";
import { Texture } from "laya/resource/Texture";
export declare class UVTools {
    constructor();
    static getUVByRec(x: number, y: number, width: number, height: number): any[];
    static getRecFromUV(uv: any[]): Rectangle;
    static isUVRight(uv: any[]): boolean;
    static getTextureRec(texture: Texture): Rectangle;
}
