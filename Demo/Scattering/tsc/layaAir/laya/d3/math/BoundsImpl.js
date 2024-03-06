import { Vector3 } from "../../maths/Vector3";
import { BoundBox } from "./BoundBox";
export class BoundsImpl {
    constructor(min, max) {
        this._updateFlag = 0;
        this._center = new Vector3();
        this._extent = new Vector3();
        this._boundBox = new BoundBox(new Vector3(), new Vector3());
        min && min.cloneTo(this._boundBox.min);
        max && max.cloneTo(this._boundBox.max);
        this._setUpdateFlag(BoundsImpl._UPDATE_CENTER | BoundsImpl._UPDATE_EXTENT, true);
    }
    get min() {
        return this.getMin();
    }
    set min(value) {
        this.setMin(value);
    }
    get max() {
        return this.getMax();
    }
    set max(value) {
        this.setMax(value);
    }
    setMin(value) {
        var min = this._boundBox.min;
        if (value !== min)
            value.cloneTo(min);
        this._setUpdateFlag(BoundsImpl._UPDATE_CENTER | BoundsImpl._UPDATE_EXTENT, true);
        this._setUpdateFlag(BoundsImpl._UPDATE_MIN, false);
    }
    getMin() {
        var min = this._boundBox.min;
        if (this._getUpdateFlag(BoundsImpl._UPDATE_MIN)) {
            this._getMin(this.getCenter(), this.getExtent(), min);
            this._setUpdateFlag(BoundsImpl._UPDATE_MIN, false);
        }
        return min;
    }
    setMax(value) {
        var max = this._boundBox.max;
        if (value !== max)
            value.cloneTo(max);
        this._setUpdateFlag(BoundsImpl._UPDATE_CENTER | BoundsImpl._UPDATE_EXTENT, true);
        this._setUpdateFlag(BoundsImpl._UPDATE_MAX, false);
    }
    getMax() {
        var max = this._boundBox.max;
        if (this._getUpdateFlag(BoundsImpl._UPDATE_MAX)) {
            this._getMax(this.getCenter(), this.getExtent(), max);
            this._setUpdateFlag(BoundsImpl._UPDATE_MAX, false);
        }
        return max;
    }
    setCenter(value) {
        if (value !== this._center)
            value.cloneTo(this._center);
        this._setUpdateFlag(BoundsImpl._UPDATE_MIN | BoundsImpl._UPDATE_MAX, true);
        this._setUpdateFlag(BoundsImpl._UPDATE_CENTER, false);
    }
    getCenter() {
        if (this._getUpdateFlag(BoundsImpl._UPDATE_CENTER)) {
            this._getCenter(this.getMin(), this.getMax(), this._center);
            this._setUpdateFlag(BoundsImpl._UPDATE_CENTER, false);
        }
        return this._center;
    }
    setExtent(value) {
        if (value !== this._extent)
            value.cloneTo(this._extent);
        this._setUpdateFlag(BoundsImpl._UPDATE_MIN | BoundsImpl._UPDATE_MAX, true);
        this._setUpdateFlag(BoundsImpl._UPDATE_EXTENT, false);
    }
    getExtent() {
        if (this._getUpdateFlag(BoundsImpl._UPDATE_EXTENT)) {
            this._getExtent(this.getMin(), this.getMax(), this._extent);
            this._setUpdateFlag(BoundsImpl._UPDATE_EXTENT, false);
        }
        return this._extent;
    }
    _getUpdateFlag(type) {
        return (this._updateFlag & type) != 0;
    }
    _setUpdateFlag(type, value) {
        if (value)
            this._updateFlag |= type;
        else
            this._updateFlag &= ~type;
    }
    _getCenter(min, max, out) {
        Vector3.add(min, max, out);
        Vector3.scale(out, 0.5, out);
    }
    _getExtent(min, max, out) {
        Vector3.subtract(max, min, out);
        Vector3.scale(out, 0.5, out);
    }
    _getMin(center, extent, out) {
        Vector3.subtract(center, extent, out);
    }
    _getMax(center, extent, out) {
        Vector3.add(center, extent, out);
    }
    _rotateExtents(extents, rotation, out) {
        var extentsX = extents.x;
        var extentsY = extents.y;
        var extentsZ = extents.z;
        var matE = rotation.elements;
        out.x = Math.abs(matE[0] * extentsX) + Math.abs(matE[4] * extentsY) + Math.abs(matE[8] * extentsZ);
        out.y = Math.abs(matE[1] * extentsX) + Math.abs(matE[5] * extentsY) + Math.abs(matE[9] * extentsZ);
        out.z = Math.abs(matE[2] * extentsX) + Math.abs(matE[6] * extentsY) + Math.abs(matE[10] * extentsZ);
    }
    _tranform(matrix, out) {
        var outCen = out._center;
        var outExt = out._extent;
        Vector3.transformCoordinate(this.getCenter(), matrix, outCen);
        this._rotateExtents(this.getExtent(), matrix, outExt);
        out._boundBox.setCenterAndExtent(outCen, outExt);
        out._updateFlag = 0;
    }
    _getBoundBox() {
        if (this._updateFlag & BoundsImpl._UPDATE_MIN) {
            var min = this._boundBox.min;
            this._getMin(this.getCenter(), this.getExtent(), min);
            this._setUpdateFlag(BoundsImpl._UPDATE_MIN, false);
        }
        if (this._updateFlag & BoundsImpl._UPDATE_MAX) {
            var max = this._boundBox.max;
            this._getMax(this.getCenter(), this.getExtent(), max);
            this._setUpdateFlag(BoundsImpl._UPDATE_MAX, false);
        }
        return this._boundBox;
    }
    calculateBoundsintersection(bounds) {
        var ownMax = this.getMax();
        var ownMin = this.getMin();
        var calMax = bounds.getMax();
        var calMin = bounds.getMin();
        var tempV0 = TEMP_VECTOR3_MAX0;
        var tempV1 = TEMP_VECTOR3_MAX1;
        var thisExtends = this.getExtent();
        var boundExtends = bounds.getExtent();
        tempV0.setValue(Math.max(ownMax.x, calMax.x) - Math.min(ownMin.x, calMin.x), Math.max(ownMax.y, calMax.y) - Math.min(ownMin.y, calMin.y), Math.max(ownMax.z, calMax.z) - Math.min(ownMin.z, calMin.z));
        tempV1.setValue((thisExtends.x + boundExtends.x) * 2.0, (thisExtends.y + boundExtends.y) * 2.0, (thisExtends.z + boundExtends.z) * 2.0);
        if ((tempV0.x) > (tempV1.x))
            return -1;
        if ((tempV0.y) > (tempV1.y))
            return -1;
        if ((tempV0.z) > (tempV1.z))
            return -1;
        return (tempV1.x - tempV0.x) * (tempV1.y - tempV0.y) * (tempV1.z - tempV0.z);
    }
    cloneTo(destObject) {
        var destBounds = destObject;
        this.getMin().cloneTo(destBounds._boundBox.min);
        this.getMax().cloneTo(destBounds._boundBox.max);
        this.getCenter().cloneTo(destBounds._center);
        this.getExtent().cloneTo(destBounds._extent);
        destBounds._updateFlag = 0;
    }
    clone() {
        var dest = new BoundsImpl(new Vector3(), new Vector3());
        this.cloneTo(dest);
        return dest;
    }
}
BoundsImpl._UPDATE_MIN = 0x01;
BoundsImpl._UPDATE_MAX = 0x02;
BoundsImpl._UPDATE_CENTER = 0x04;
BoundsImpl._UPDATE_EXTENT = 0x08;
const TEMP_VECTOR3_MAX0 = new Vector3();
const TEMP_VECTOR3_MAX1 = new Vector3();

//# sourceMappingURL=BoundsImpl.js.map
