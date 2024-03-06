import { Sprite } from "laya/display/Sprite";
export declare class RenderAnalyser {
    constructor();
    private static _instance;
    static get I(): RenderAnalyser;
    static set I(value: RenderAnalyser);
    render(sprite: Sprite, time: number): void;
    timeDic: any;
    resultDic: any;
    countDic: any;
    resultCountDic: any;
    nodeDic: any;
    addTime(sprite: Sprite, time: number): void;
    getTime(sprite: Sprite): number;
    getCount(sprite: Sprite): number;
    reset(): void;
    isWorking: boolean;
    updates(): void;
    set working(v: boolean);
}
