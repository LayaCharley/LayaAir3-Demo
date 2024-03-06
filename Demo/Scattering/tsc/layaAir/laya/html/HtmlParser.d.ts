import { TextStyle } from "../display/css/TextStyle";
import { HtmlElement } from "./HtmlElement";
import { HtmlParseOptions } from "./HtmlParseOptions";
import { IHtmlObject } from "./IHtmlObject";
export declare class HtmlParser {
    static defaultParser: HtmlParser;
    static classMap: Record<number, new () => IHtmlObject>;
    protected _styleStack: Array<TextStyle>;
    protected _styleStackTop: number;
    protected _style: TextStyle;
    protected _elements: Array<HtmlElement>;
    protected _options: HtmlParseOptions;
    constructor();
    parse(aSource: string, style: TextStyle, out: Array<HtmlElement>, options?: HtmlParseOptions): void;
    protected pushStyle(): void;
    protected popStyle(): void;
    protected isNewLine(): boolean;
    protected appendText(text: string): void;
}
