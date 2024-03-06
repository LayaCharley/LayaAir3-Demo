import { Sprite } from "laya/display/Sprite";
import { Text } from "laya/display/Text";
export declare class NodeRecInfo extends Sprite {
    txt: Text;
    constructor();
    setInfo(str: string): void;
    protected _tar: Sprite;
    recColor: string;
    setTarget(tar: Sprite): void;
    private static _disBoundRec;
    showInfo(node: Sprite): void;
    fresh(): void;
    clearMe(): void;
}
