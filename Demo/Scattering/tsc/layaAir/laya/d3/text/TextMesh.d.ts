import { Color } from "../../maths/Color";
export declare class TextMesh {
    private _text;
    private _fontSize;
    private _color;
    get text(): string;
    set text(value: string);
    get fontSize(): number;
    set fontSize(value: number);
    get color(): Color;
    set color(value: Color);
    constructor();
}
