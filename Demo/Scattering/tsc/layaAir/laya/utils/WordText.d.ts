import { Context } from "../resource/Context";
export declare class WordText {
    text: string;
    width: number;
    pageChars: any[];
    pagecharsCtx: Context;
    scalex: number;
    scaley: number;
    _nativeObj: any;
    _splitRender: boolean;
    constructor();
    setText(txt: string): void;
    toString(): string;
    get length(): number;
    cleanCache(): void;
    get splitRender(): boolean;
    set splitRender(value: boolean);
}
