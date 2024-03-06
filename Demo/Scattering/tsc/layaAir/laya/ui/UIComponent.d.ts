import { Widget } from "../components/Widget";
import { Node } from "../display/Node";
import { Sprite } from "../display/Sprite";
export declare class UIComponent extends Sprite {
    protected _dataSource: any;
    protected _toolTip: any;
    protected _disabled: boolean;
    protected _gray: boolean;
    protected _widget: Widget;
    constructor(createChildren?: boolean);
    destroy(destroyChild?: boolean): void;
    protected preinitialize(): void;
    protected createChildren(): void;
    protected initialize(): void;
    get_width(): number;
    protected measureWidth(): number;
    protected commitMeasure(): void;
    get_height(): number;
    protected measureHeight(): number;
    get dataSource(): any;
    get_dataSource(): any;
    set dataSource(value: any);
    set_dataSource(value: any): void;
    get top(): number;
    get_top(): number;
    set top(value: number);
    set_top(value: number): void;
    get bottom(): number;
    get_bottom(): number;
    set bottom(value: number);
    set_bottom(value: number): void;
    get left(): number;
    set left(value: number);
    get right(): number;
    set right(value: number);
    get centerX(): number;
    set centerX(value: number);
    get centerY(): number;
    set centerY(value: number);
    protected _shouldRefreshLayout(): void;
    protected _sizeChanged(): void;
    get toolTip(): any;
    set toolTip(value: any);
    private onMouseOver;
    private onMouseOut;
    get gray(): boolean;
    set gray(value: boolean);
    get disabled(): boolean;
    set disabled(value: boolean);
    private _getWidget;
    protected onCompResize(): void;
    protected _childChanged(child?: Node): void;
    freshLayout(): void;
}
