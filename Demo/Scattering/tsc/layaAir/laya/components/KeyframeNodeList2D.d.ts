import { KeyframeNode2D } from "./KeyframeNode2D";
export declare class KeyframeNodeList2D {
    private _nodes;
    get count(): number;
    set count(value: number);
    getNodeByIndex(index: number): KeyframeNode2D;
    setNodeByIndex(index: number, node: KeyframeNode2D): void;
}
