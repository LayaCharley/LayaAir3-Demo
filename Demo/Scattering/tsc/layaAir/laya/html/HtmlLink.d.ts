import { Text } from "../display/Text";
import { IHitArea } from "../utils/IHitArea";
import { HtmlElement } from "./HtmlElement";
import { IHtmlObject } from "./IHtmlObject";
export declare class HtmlLink implements IHtmlObject, IHitArea {
    private _owner;
    private _element;
    private _shape;
    private _rects;
    private _rectCnt;
    constructor();
    get element(): HtmlElement;
    get width(): number;
    get height(): number;
    create(owner: Text, element: HtmlElement): void;
    resetArea(): void;
    addRect(x: number, y: number, width: number, height: number): void;
    contains(x: number, y: number): boolean;
    pos(x: number, y: number): void;
    release(): void;
    destroy(): void;
}
