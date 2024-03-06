import { Sprite } from "laya/display/Sprite";
export declare class ObjTimeCountTool {
    constructor();
    timeDic: any;
    resultDic: any;
    countDic: any;
    resultCountDic: any;
    nodeDic: any;
    resultNodeDic: any;
    addTime(sprite: Sprite, time: number): void;
    getTime(sprite: Sprite): number;
    getCount(sprite: Sprite): number;
    reset(): void;
    updates(): void;
}
