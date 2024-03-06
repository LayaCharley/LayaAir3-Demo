import { Sprite } from "laya/display/Sprite";
export declare class DisEditor {
    constructor();
    rec: Sprite;
    rootContainer: Sprite;
    tar: Sprite;
    setTarget(target: Sprite): void;
    createSameDisChain(): void;
}
