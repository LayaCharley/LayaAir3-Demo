import { Rectangle } from "../maths/Rectangle";
export declare class GraphicsBounds {
    private _temp;
    private _bounds;
    private _rstBoundPoints;
    private _cacheBoundsType;
    destroy(): void;
    static create(): GraphicsBounds;
    reset(): void;
    getBounds(realSize?: boolean): Rectangle;
    getBoundPoints(realSize?: boolean): any[];
    private _getCmdPoints;
    private _switchMatrix;
}
