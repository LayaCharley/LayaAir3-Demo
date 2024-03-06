import { Sprite } from "laya/display/Sprite";
export declare class DebugInfoLayer extends Sprite {
    static I: DebugInfoLayer;
    nodeRecInfoLayer: Sprite;
    lineLayer: Sprite;
    txtLayer: Sprite;
    popLayer: Sprite;
    graphicLayer: Sprite;
    cacheViewLayer: Sprite;
    constructor();
    static init(): void;
    setTop(): void;
    isDebugItem(sprite: Sprite): boolean;
}
