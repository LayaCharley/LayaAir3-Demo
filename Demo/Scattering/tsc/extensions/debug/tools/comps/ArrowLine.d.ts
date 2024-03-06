import { Rect } from "./Rect";
import { Sprite } from "laya/display/Sprite";
import { ValueChanger } from "../ValueChanger";
export declare class ArrowLine extends Sprite {
    constructor(sign?: string);
    lineLen: number;
    arrowLen: number;
    lenControl: Rect;
    rotationControl: Rect;
    sign: string;
    drawMe(): void;
    private lenChanger;
    private lenControlXChanger;
    _targetChanger: ValueChanger;
    set targetChanger(changer: ValueChanger);
    get targetChanger(): ValueChanger;
    private clearMoveEvents;
    private _isMoving;
    private controlMouseDown;
    private stageMouseMove;
    private stageMouseUp;
    private noticeChange;
}
