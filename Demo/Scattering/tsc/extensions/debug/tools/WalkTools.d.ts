import { Node } from "laya/display/Node";
export declare class WalkTools {
    constructor();
    static walkTarget(target: Node, fun: Function, _this?: any): void;
    static walkTargetEX(target: Node, fun: Function, _this?: any, filterFun?: Function): void;
    static walkChildren(target: Node, fun: Function, _this?: any): void;
    static walkArr(arr: ReadonlyArray<any>, fun: Function, _this?: any): void;
}
