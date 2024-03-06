import { Texture } from "../resource/Texture";
import { Handler } from "../utils/Handler";
import { Resource } from "../resource/Resource";
import { XML } from "../html/XML";
export declare class BitmapFont extends Resource {
    texture: Texture;
    dict: Record<string, BMGlyph>;
    padding: any[];
    fontSize: number;
    autoScaleSize: boolean;
    tint: boolean;
    maxWidth: number;
    lineHeight: number;
    letterSpacing: number;
    static loadFont(path: string, complete: Handler): void;
    constructor();
    parseFont(xml: XML, texture: Texture): void;
    protected _disposeResource(): void;
    getTextWidth(text: string, fontSize?: number): number;
    getMaxWidth(fontSize?: number): number;
    getMaxHeight(fontSize?: number): number;
}
export interface BMGlyph {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    advance?: number;
    texture?: Texture;
}
