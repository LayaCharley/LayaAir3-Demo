import { Sprite } from "laya/display/Sprite";
import { Point } from "laya/maths/Point";
import { Rectangle } from "laya/maths/Rectangle";
export declare class NodeUtils {
    constructor();
    static defaultKeys: any[];
    static getFilterdTree(sprite: Sprite, keys: any[]): any;
    static getNodeValue(node: any, key: string): string;
    static getPropertyDesO(tValue: any, keys: any[]): any;
    static adptShowKeys(keys: any[]): any[];
    static getNodeTreeData(sprite: Sprite, keys: any[]): any[];
    static getTreeArr(treeO: any, arr: any[], add?: boolean): void;
    static traceStage(): void;
    static getNodeCount(node: Sprite, visibleRequire?: boolean): number;
    static getGVisible(node: Sprite): boolean;
    static getGAlpha(node: Sprite): number;
    static getGPos(node: Sprite): Point;
    static getGRec(node: Sprite): Rectangle;
    static getGGraphicRec(node: Sprite): Rectangle;
    static getNodeCmdCount(node: Sprite): number;
    static getNodeCmdTotalCount(node: Sprite): number;
    static getRenderNodeCount(node: Sprite): number;
    static getReFreshRenderNodeCount(node: Sprite): number;
    private static g;
    static showCachedSpriteRecs(): void;
    private static drawCachedBounds;
}
