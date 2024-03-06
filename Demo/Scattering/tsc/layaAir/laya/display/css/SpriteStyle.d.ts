import { Rectangle } from "../../maths/Rectangle";
import { Dragging } from "../../utils/Dragging";
import { IHitArea } from "../../utils/IHitArea";
export declare class SpriteStyle {
    static readonly EMPTY: Readonly<SpriteStyle>;
    scaleX: number;
    scaleY: number;
    skewX: number;
    skewY: number;
    pivotX: number;
    pivotY: number;
    rotation: number;
    alpha: number;
    scrollRect: Rectangle;
    viewport: Rectangle;
    hitArea: IHitArea;
    dragging: Dragging;
    blendMode: string;
    constructor();
    reset(): SpriteStyle;
    recover(): void;
    static create(): SpriteStyle;
}
