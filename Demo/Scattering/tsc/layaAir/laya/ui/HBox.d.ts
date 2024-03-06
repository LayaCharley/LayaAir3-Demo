import { LayoutBox } from "./LayoutBox";
export declare class HBox extends LayoutBox {
    static NONE: string;
    static TOP: string;
    static MIDDLE: string;
    static BOTTOM: string;
    protected sortItem(items: any[]): void;
    _setHeight(value: number): void;
    protected changeItems(): void;
}
