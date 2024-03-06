import { Sprite } from "laya/display/Sprite";
import { Rectangle } from "laya/maths/Rectangle";
import { HTMLCanvas } from "laya/resource/HTMLCanvas";
export declare class VisibleAnalyser {
    constructor();
    static analyseTarget(node: Sprite): void;
    private static showListLater;
    static isCoverByBrother(node: Sprite): void;
    static isNodeWalked: boolean;
    static _analyseTarget: Sprite;
    static tarRec: Rectangle;
    static isTarRecOK: boolean;
    static mainCanvas: HTMLCanvas;
    static preImageData: any;
    static tImageData: any;
    static tarImageData: any;
    static coverRate: number;
    static tColor: number;
    static anlyseRecVisible(node: Sprite): void;
    private static interRec;
    static getRecArea(rec: Rectangle): number;
    private static _coverList;
    static addCoverNode(node: Sprite, coverRate: number): void;
    static resetCoverList(): void;
    private static recVisibleWalker;
    private static filterFun;
}
