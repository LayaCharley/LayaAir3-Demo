import { Sprite } from "../display/Sprite";
import { Text } from "../display/Text";
import { HtmlElement } from "./HtmlElement";
import { IHtmlObject } from "./IHtmlObject";
export declare class HtmlImage implements IHtmlObject {
    readonly obj: Sprite;
    private _owner;
    private _element;
    constructor();
    get element(): HtmlElement;
    get width(): number;
    get height(): number;
    create(owner: Text, element: HtmlElement): void;
    protected loadTexture(src: string): void;
    pos(x: number, y: number): void;
    release(): void;
    destroy(): void;
}
