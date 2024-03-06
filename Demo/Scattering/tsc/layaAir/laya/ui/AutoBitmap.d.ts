import { Graphics } from "../display/Graphics";
import { Texture } from "../resource/Texture";
export declare class AutoBitmap extends Graphics {
    private _width;
    private _height;
    private _source;
    private _sizeGrid;
    protected _isChanged: boolean;
    protected _stateIndex: number;
    protected _stateNum: number;
    uv: number[];
    _color: string;
    private _drawGridCmd;
    destroy(): void;
    get sizeGrid(): number[];
    set sizeGrid(value: number[]);
    get width(): number;
    set width(value: number);
    get height(): number;
    set height(value: number);
    get source(): Texture;
    set source(value: Texture);
    setState(index: number, numStates: number): void;
    get color(): string;
    set color(value: string);
    protected _setChanged(): void;
    protected changeSource(): void;
    private _setDrawGridCmd;
}
