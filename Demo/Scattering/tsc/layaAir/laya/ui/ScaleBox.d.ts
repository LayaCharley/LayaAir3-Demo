import { Box } from "./Box";
export declare class ScaleBox extends Box {
    private _oldW;
    private _oldH;
    onEnable(): void;
    onDisable(): void;
    private onResize;
    set_width(value: number): void;
    set_height(value: number): void;
}
