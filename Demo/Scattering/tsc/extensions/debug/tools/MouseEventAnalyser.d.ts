import { Sprite } from "laya/display/Sprite";
export declare class MouseEventAnalyser {
    constructor();
    static infoO: any;
    static nodeO: any;
    static hitO: any;
    static analyseNode(node: Sprite): void;
    private static _matrix;
    private static _point;
    private static _rect;
    static check(sp: Sprite, mouseX: number, mouseY: number, callBack: Function): boolean;
    private static hitTest;
}
