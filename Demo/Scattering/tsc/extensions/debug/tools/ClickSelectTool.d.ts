import { Handler } from "laya/utils/Handler";
export declare class ClickSelectTool {
    private static _I;
    static get I(): ClickSelectTool;
    constructor();
    static isClickSelectState: boolean;
    private completeHandler;
    beginClickSelect(complete?: Handler): void;
    private clickSelectChange;
    private clearSelectTip;
    private _selectTip;
    private tSelectTar;
    private updateSelectTar;
    static ignoreDebugTool: boolean;
    private itemClicked;
}
