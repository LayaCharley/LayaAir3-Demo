import { Vector3 } from "../../../maths/Vector3";
import { NativeMemory } from "../../../RenderEngine/RenderEngine/NativeGLEngine/CommonMemory/NativeMemory";
import { BoundBox } from "../../math/BoundBox";
export class NativeBounds {
    constructor(min, max) {
        this._center = new Vector3();
        this._extent = new Vector3();
        this._boundBox = new BoundBox(new Vector3(), new Vector3());
        this.nativeMemory = new NativeMemory(NativeBounds.MemoryBlock_size, true);
        this.float32Array = this.nativeMemory.float32Array;
        this.float64Array = this.nativeMemory.float64Array;
        this._nativeObj = new window.conchBounds(this.nativeMemory._buffer);
        min && this.setMin(min);
        max && this.setMax(max);
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
        this.float64Array[0] = value.x;
        this.float64Array[1] = value.y;
        this.float64Array[2] = value.z;
        this._nativeObj.setMin();
    }
    getMin() {
        var min = this._boundBox.min;
        this._nativeObj.getMin();
        min.x = this.float64Array[0];
        min.y = this.float64Array[1];
        min.z = this.float64Array[2];
        return min;
    }
    setMax(value) {
        this.float64Array[0] = value.x;
        this.float64Array[1] = value.y;
        this.float64Array[2] = value.z;
        this._nativeObj.setMax();
    }
    getMax() {
        var max = this._boundBox.max;
        this._nativeObj.getMax();
        max.x = this.float64Array[0];
        max.y = this.float64Array[1];
        max.z = this.float64Array[2];
        return max;
    }
    setCenter(value) {
        this.float64Array[0] = value.x;
        this.float64Array[1] = value.y;
        this.float64Array[2] = value.z;
        this._nativeObj.setCenter();
    }
    getCenter() {
        var center = this._center;
        this._nativeObj.getCenter();
        center.x = this.float64Array[0];
        center.y = this.float64Array[1];
        center.z = this.float64Array[2];
        return center;
    }
    setExtent(value) {
        this.float64Array[0] = value.x;
        this.float64Array[1] = value.y;
        this.float64Array[2] = value.z;
        this._nativeObj.setExtent();
    }
    getExtent() {
        var extent = this._extent;
        this._nativeObj.getExtent();
        extent.x = this.float64Array[0];
        extent.y = this.float64Array[1];
        extent.z = this.float64Array[2];
        return extent;
    }
    _tranform(matrix, out) {
        this.float32Array.set(matrix.elements);
        this._nativeObj._tranform(out._nativeObj);
    }
    _getBoundBox() {
        this._nativeObj._getBoundBox();
        this._boundBox.min.x = this.float64Array[0];
        this._boundBox.min.y = this.float64Array[1];
        this._boundBox.min.z = this.float64Array[2];
        this._boundBox.max.x = this.float64Array[3];
        this._boundBox.max.y = this.float64Array[4];
        this._boundBox.max.z = this.float64Array[5];
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
        this._nativeObj.cloneTo(destBounds._nativeObj);
    }
    clone() {
        var dest = new NativeBounds(new Vector3(), new Vector3());
        this.cloneTo(dest);
        return dest;
    }
}
NativeBounds.MemoryBlock_size = Math.max(6 * 8, 16 * 4);
const TEMP_VECTOR3_MAX0 = new Vector3();
const TEMP_VECTOR3_MAX1 = new Vector3();

//# sourceMappingURL=NativeBounds.js.map
