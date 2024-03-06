import { LayoutBox } from "./LayoutBox";
export declare class VBox extends LayoutBox {
    static NONE: string;
    static LEFT: string;
    static CENTER: string;
    static RIGHT: string;
    isSortItem: boolean;
    _setWidth(value: number): void;
    protected changeItems(): void;
}
