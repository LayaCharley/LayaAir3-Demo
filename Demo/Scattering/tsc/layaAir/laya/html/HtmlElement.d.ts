import { IHtmlObject } from "./IHtmlObject";
import { TextStyle } from "../display/css/TextStyle";
export declare enum HtmlElementType {
    Text = 0,
    Link = 1,
    Image = 2,
    Input = 3,
    Select = 4,
    Object = 5,
    LinkEnd = 6
}
export declare class HtmlElement {
    type: HtmlElementType;
    name: string;
    text: string;
    style: TextStyle;
    obj: IHtmlObject;
    space: number;
    _attrs: Record<string, any>;
    constructor();
    getAttr(attrName: string): any;
    setAttr(attrName: string, attrValue: any): void;
    getAttrString(attrName: string, defValue?: string): string;
    getAttrInt(attrName: string, defValue?: number): number;
    getAttrFloat(attrName: string, defValue?: number): number;
    getAttrBool(attrName: string, defValue?: boolean): boolean;
    fetchAttributes(): void;
    reset(): void;
    static pool: Array<HtmlElement>;
    static getFromPool(type: HtmlElementType): HtmlElement;
    static returnToPool(ele: HtmlElement | Array<HtmlElement>): void;
}
