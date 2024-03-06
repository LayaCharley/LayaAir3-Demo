import { Sprite } from "laya/display/Sprite";
import { Rectangle } from "laya/maths/Rectangle";
import { HTMLCanvas } from "laya/resource/HTMLCanvas";
export declare class CanvasTools {
    constructor();
    static createCanvas(width: number, height: number): HTMLCanvas;
    static renderSpriteToCanvas(sprite: Sprite, canvas: HTMLCanvas, offsetX: number, offsetY: number): void;
    static getImageDataFromCanvas(canvas: HTMLCanvas, x?: number, y?: number, width?: number, height?: number): any;
    static getImageDataFromCanvasByRec(canvas: HTMLCanvas, rec: Rectangle): any;
    static getDifferCount(imageData1: any, imageData2: any): number;
    static getDifferRate(imageData1: any, imageData2: any): number;
    static getCanvasDisRec(canvas: HTMLCanvas): Rectangle;
    static fillCanvasRec(canvas: HTMLCanvas, rec: Rectangle, color: string): void;
    static isEmptyPoint(data: any[], pos: number): boolean;
    static isPoinSame(pos: number, data1: any[], data2: any[]): boolean;
    static walkImageData(imgdata: any, walkFun: Function): void;
    static renderSpritesToCanvas(canvas: HTMLCanvas, sprites: any[], offx?: number, offy?: number, startIndex?: number): void;
    static clearCanvas(canvas: HTMLCanvas): void;
    static getImagePixels(x: number, y: number, width: number, data: any[], colorLen?: number): any[];
}
