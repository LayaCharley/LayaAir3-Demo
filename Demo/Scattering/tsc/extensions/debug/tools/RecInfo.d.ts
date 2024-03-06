import { Sprite } from "laya/display/Sprite";
import { Point } from "laya/maths/Point";
export declare class RecInfo {
    constructor();
    oX: number;
    oY: number;
    hX: number;
    hY: number;
    vX: number;
    vY: number;
    get x(): number;
    get y(): number;
    get width(): number;
    get height(): number;
    get rotation(): number;
    get rotationRad(): number;
    get rotationV(): number;
    get rotationRadV(): number;
    initByPoints(oPoint: Point, ePoint: Point, vPoint: Point): void;
    static createByPoints(oPoint: Point, ePoint: Point, vPoint: Point): RecInfo;
    static getGlobalPoints(sprite: Sprite, x: number, y: number): Point;
    static getGlobalRecInfo(sprite: Sprite, x0?: number, y0?: number, x1?: number, y1?: number, x2?: number, y2?: number): RecInfo;
}
