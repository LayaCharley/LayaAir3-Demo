import { Texture } from "laya/resource/Texture";
export declare class Base64ImageTool {
    constructor();
    static getCanvasPic(img: Texture): any;
    static getBase64Pic(img: Texture): string;
    static getPreloads(base64Data: any): any[];
}
