import { AlphaCmd } from "./cmd/AlphaCmd";
import { DrawCircleCmd } from "./cmd/DrawCircleCmd";
import { DrawCurvesCmd } from "./cmd/DrawCurvesCmd";
import { DrawImageCmd } from "./cmd/DrawImageCmd";
import { DrawLineCmd } from "./cmd/DrawLineCmd";
import { DrawLinesCmd } from "./cmd/DrawLinesCmd";
import { DrawPathCmd } from "./cmd/DrawPathCmd";
import { DrawPieCmd } from "./cmd/DrawPieCmd";
import { DrawPolyCmd } from "./cmd/DrawPolyCmd";
import { DrawRectCmd } from "./cmd/DrawRectCmd";
import { DrawTextureCmd } from "./cmd/DrawTextureCmd";
import { FillTextureCmd } from "./cmd/FillTextureCmd";
import { RestoreCmd } from "./cmd/RestoreCmd";
import { RotateCmd } from "./cmd/RotateCmd";
import { ScaleCmd } from "./cmd/ScaleCmd";
import { TransformCmd } from "./cmd/TransformCmd";
import { TranslateCmd } from "./cmd/TranslateCmd";
import { GrahamScan } from "../maths/GrahamScan";
import { Matrix } from "../maths/Matrix";
import { Point } from "../maths/Point";
import { Rectangle } from "../maths/Rectangle";
import { Pool } from "../utils/Pool";
import { Utils } from "../utils/Utils";
import { DrawTrianglesCmd } from "./cmd/DrawTrianglesCmd";
import { Draw9GridTextureCmd } from "./cmd/Draw9GridTextureCmd";
import { SaveCmd } from "./cmd/SaveCmd";
const _tempMatrix = new Matrix();
const _initMatrix = new Matrix();
const _tempMatrixArrays = [];
export class GraphicsBounds {
    constructor() {
        this._cacheBoundsType = false;
    }
    destroy() {
        this._graphics = null;
        this._cacheBoundsType = false;
        if (this._temp)
            this._temp.length = 0;
        if (this._rstBoundPoints)
            this._rstBoundPoints.length = 0;
        if (this._bounds)
            this._bounds.recover();
        this._bounds = null;
        Pool.recover("GraphicsBounds", this);
    }
    static create() {
        return Pool.getItemByClass("GraphicsBounds", GraphicsBounds);
    }
    reset() {
        this._temp && (this._temp.length = 0);
    }
    getBounds(realSize = false) {
        if (!this._bounds || !this._temp || this._temp.length < 1 || realSize != this._cacheBoundsType) {
            this._bounds = Rectangle._getWrapRec(this.getBoundPoints(realSize), this._bounds);
        }
        this._cacheBoundsType = realSize;
        return this._bounds;
    }
    getBoundPoints(realSize = false) {
        if (!this._temp || this._temp.length < 1 || realSize != this._cacheBoundsType)
            this._temp = this._getCmdPoints(realSize);
        this._cacheBoundsType = realSize;
        return this._rstBoundPoints = Utils.copyArray(this._rstBoundPoints, this._temp);
    }
    _getCmdPoints(realSize = false) {
        let cmds = this._graphics.cmds;
        let sp = this._graphics._sp;
        this._affectBySize = false;
        let rst = this._temp || (this._temp = []);
        rst.length = 0;
        if (cmds.length == 0)
            return rst;
        let matrixs = _tempMatrixArrays;
        matrixs.length = 0;
        let tMatrix = _initMatrix;
        tMatrix.identity();
        let tempMatrix = _tempMatrix;
        for (let i = 0, n = cmds.length; i < n; i++) {
            let cmd = cmds[i];
            if (cmd.percent)
                this._affectBySize = true;
            switch (cmd.cmdID) {
                case AlphaCmd.ID:
                case SaveCmd.ID:
                    matrixs.push(tMatrix);
                    tMatrix = tMatrix.clone();
                    break;
                case RestoreCmd.ID:
                    tMatrix = matrixs.pop();
                    break;
                case ScaleCmd.ID:
                    tempMatrix.identity();
                    tempMatrix.translate(-cmd.pivotX, -cmd.pivotY);
                    tempMatrix.scale(cmd.scaleX, cmd.scaleY);
                    tempMatrix.translate(cmd.pivotX, cmd.pivotY);
                    this._switchMatrix(tMatrix, tempMatrix);
                    break;
                case RotateCmd.ID:
                    tempMatrix.identity();
                    tempMatrix.translate(-cmd.pivotX, -cmd.pivotY);
                    tempMatrix.rotate(cmd.angle);
                    tempMatrix.translate(cmd.pivotX, cmd.pivotY);
                    this._switchMatrix(tMatrix, tempMatrix);
                    break;
                case TranslateCmd.ID:
                    tempMatrix.identity();
                    tempMatrix.translate(cmd.tx, cmd.ty);
                    this._switchMatrix(tMatrix, tempMatrix);
                    break;
                case TransformCmd.ID:
                    tempMatrix.identity();
                    tempMatrix.translate(-cmd.pivotX, -cmd.pivotY);
                    tempMatrix.concat(cmd.matrix);
                    tempMatrix.translate(cmd.pivotX, cmd.pivotY);
                    this._switchMatrix(tMatrix, tempMatrix);
                    break;
                case DrawImageCmd.ID:
                case FillTextureCmd.ID:
                    addPointArrToRst(rst, Rectangle._getBoundPointS(cmd.x, cmd.y, cmd.width, cmd.height), tMatrix);
                    break;
                case DrawTextureCmd.ID:
                    tMatrix.copyTo(tempMatrix);
                    if (cmd.matrix)
                        tempMatrix.concat(cmd.matrix);
                    addPointArrToRst(rst, Rectangle._getBoundPointS(cmd.x, cmd.y, cmd.width, cmd.height), tempMatrix);
                    break;
                case DrawRectCmd.ID:
                    addPointArrToRst(rst, cmd.getBoundPoints(sp), tMatrix);
                    break;
                case DrawCircleCmd.ID:
                    addPointArrToRst(rst, cmd.getBoundPoints(sp), tMatrix);
                    break;
                case DrawLineCmd.ID:
                    addPointArrToRst(rst, cmd.getBoundPoints(sp), tMatrix);
                    break;
                case DrawCurvesCmd.ID:
                    addPointArrToRst(rst, cmd.getBoundPoints(sp), tMatrix, cmd.x, cmd.y);
                    break;
                case DrawLinesCmd.ID:
                case DrawPolyCmd.ID:
                    addPointArrToRst(rst, cmd.points, tMatrix, cmd.x, cmd.y);
                    break;
                case DrawPathCmd.ID:
                    addPointArrToRst(rst, cmd.getBoundPoints(sp), tMatrix, cmd.x, cmd.y);
                    break;
                case DrawPieCmd.ID:
                    addPointArrToRst(rst, cmd.getBoundPoints(sp), tMatrix);
                    break;
                case DrawTrianglesCmd.ID:
                    addPointArrToRst(rst, cmd.getBoundPoints(sp), tMatrix);
                    break;
                case Draw9GridTextureCmd.ID:
                    addPointArrToRst(rst, cmd.getBoundPoints(sp), tMatrix);
                    break;
            }
        }
        if (rst.length > 200) {
            rst = Utils.copyArray(rst, Rectangle._getWrapRec(rst)._getBoundPoints());
        }
        else if (rst.length > 8)
            rst = GrahamScan.scanPList(rst);
        return rst;
    }
    _switchMatrix(tMatix, tempMatrix) {
        tempMatrix.concat(tMatix);
        tempMatrix.copyTo(tMatix);
    }
}
function addPointArrToRst(rst, points, matrix, dx = 0, dy = 0) {
    let len = points.length;
    for (let i = 0; i < len; i += 2) {
        addPointToRst(rst, points[i] + dx, points[i + 1] + dy, matrix);
    }
}
function addPointToRst(rst, x, y, matrix) {
    var _tempPoint = Point.TEMP;
    _tempPoint.setTo(x ? x : 0, y ? y : 0);
    matrix.transformPoint(_tempPoint);
    rst.push(_tempPoint.x, _tempPoint.y);
}

//# sourceMappingURL=GraphicsBounds.js.map
