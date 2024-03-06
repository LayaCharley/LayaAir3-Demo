import { UIComponent } from "./UIComponent";
import { Image } from "./Image";
import { Handler } from "../utils/Handler";
export declare class ProgressBar extends UIComponent {
    changeHandler: Handler;
    protected _bg: Image;
    protected _bar: Image;
    protected _skin: string;
    protected _value: number;
    constructor(skin?: string);
    destroy(destroyChild?: boolean): void;
    protected createChildren(): void;
    get skin(): string;
    set skin(value: string);
    _setSkin(url: string): Promise<void>;
    protected _skinLoaded(): void;
    protected measureWidth(): number;
    protected measureHeight(): number;
    get value(): number;
    set value(num: number);
    protected changeValue(): void;
    get bar(): Image;
    get bg(): Image;
    get sizeGrid(): string;
    set sizeGrid(value: string);
    set_width(value: number): void;
    set_dataSource(value: any): void;
}
