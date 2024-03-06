import { Layouter } from "./Layouter";
import { Sprite } from "laya/display/Sprite";
export declare class LayoutFuns {
    constructor();
    static sameWidth(totalWidth: number, items: any[], data?: any, sX?: number): void;
    static getSameWidthLayout(items: any[], dWidth: number): Layouter;
    static getLayouter(items: any[], data: any, fun: Function): Layouter;
    static sameDis(totalWidth: number, items: any[], data?: any, sX?: number): void;
    static getSameDisLayout(items: any[], rateSame?: boolean): Layouter;
    static fullFill(totalWidth: number, items: any[], data?: any, sX?: number): void;
    static getFullFillLayout(items: any[], dL?: number, dR?: number): Layouter;
    static fixPos(totalWidth: number, items: any[], data?: any, sX?: number): void;
    static getFixPos(items: any[], dLen?: number, isRate?: boolean, poss?: any[]): Layouter;
    static clearItemsRelativeInfo(items: any[]): void;
    static clearItemRelativeInfo(item: any): void;
    static RateSign: string;
    static prepareForLayoutWidth(totalWidth: number, items: any[]): void;
    static getSumWidth(items: any[]): number;
    static prepareItemForLayoutWidth(totalWidth: number, item: any): void;
    static setItemRate(item: any, rate: number): void;
    static getItemRate(item: any): number;
    static FreeSizeSign: string;
    static setItemFreeSize(item: any, free?: boolean): void;
    static isItemFreeSize(item: any): boolean;
    static lockedDis(totalWidth: number, items: any[], data?: any, sX?: number): void;
    static getFreeItem(items: any[]): Sprite;
    static getLockedDis(items: any[]): Layouter;
}
