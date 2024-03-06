import { ISaveData } from "./ISaveData";
import { Matrix } from "../../../maths/Matrix";
import { Rectangle } from "../../../maths/Rectangle";
import { Context } from "../../../resource/Context";
export declare class SaveClipRect implements ISaveData {
    private static POOL;
    _globalClipMatrix: Matrix;
    _clipInfoID: number;
    _clipRect: Rectangle;
    incache: boolean;
    isSaveMark(): boolean;
    restore(context: Context): void;
    static save(context: Context): void;
}
