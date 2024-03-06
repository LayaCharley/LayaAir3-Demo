import { Context } from "../../resource/Context";
import { WordText } from "../../utils/WordText";
export declare class FillTextCmd {
    static ID: string;
    x: number;
    y: number;
    private _text;
    private _wordText;
    private _font;
    private _color;
    private _borderColor;
    private _lineWidth;
    private _textAlign;
    private _fontObj;
    static create(text: string | WordText | null, x: number, y: number, font: string, color: string | null, textAlign: string, lineWidth: number, borderColor: string | null): FillTextCmd;
    recover(): void;
    run(context: Context, gx: number, gy: number): void;
    get cmdID(): string;
    get font(): string;
    set font(value: string);
    get color(): string;
    set color(value: string);
}
