import { UIComponent } from "./UIComponent";
export declare class OpenDataContextView extends UIComponent {
    private _fps;
    constructor();
    get fps(): number;
    set fps(value: number);
    _onActive(): void;
    _onInActive(): void;
    private _onLoop;
    _setWidth(value: number): void;
    _setHeight(value: number): void;
    set x(value: number);
    get x(): number;
    set y(value: number);
    get y(): number;
    private updateViewPort;
    postMsg(msg: any): void;
}
