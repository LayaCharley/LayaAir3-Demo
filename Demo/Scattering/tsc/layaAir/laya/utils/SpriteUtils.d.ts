import { Sprite } from "../display/Sprite";
import { Rectangle } from "../maths/Rectangle";
export declare class SpriteUtils {
    static getGlobalRecByPoints(sprite: Sprite, x0: number, y0: number, x1: number, y1: number): Rectangle;
    static getGlobalPosAndScale(sprite: Sprite): Rectangle;
    static getTransformRelativeToWindow(coordinateSpace: Sprite, x: number, y: number): any;
    static fitDOMElementInArea(dom: any, coordinateSpace: Sprite, x: number, y: number, width: number, height: number): void;
    static updateOrder(array: any[]): boolean;
}
