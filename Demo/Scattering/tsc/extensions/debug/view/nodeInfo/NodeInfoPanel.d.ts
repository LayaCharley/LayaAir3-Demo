import { Sprite } from "laya/display/Sprite";
export declare class NodeInfoPanel extends Sprite {
    static I: NodeInfoPanel;
    static init(): void;
    constructor();
    private _stateDic;
    isWorkState: boolean;
    showDisInfo(node: Sprite): void;
    showOnly(node: Sprite): void;
    recoverNodes(): void;
    hideOtherChain(node: Sprite): void;
    hideChilds(node: Sprite): void;
    hideBrothers(node: Sprite): void;
    saveNodeInfo(node: Sprite): void;
    recoverNodeInfo(node: Sprite): void;
}
