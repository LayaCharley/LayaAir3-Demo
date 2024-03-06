import { LayaGL } from "../../layagl/LayaGL";
import { Vector3 } from "../../maths/Vector3";
export class Bounds {
    constructor(min, max) {
        this._imp = LayaGL.renderOBJCreate.createBounds(min, max);
    }
    static merge(box1, box2, out) {
        Vector3.min(box1.min, box2.min, out.min);
        Vector3.max(box1.max, box2.max, out.max);
        out.min = out.min;
        out.max = out.max;
    }
    static containPoint(box, point) {
        let max = box.getMax();
        let min = box.getMin();
        if (point.x > max.x || point.x < min.x)
            return false;
        if (point.y > max.y || point.y < min.y)
            return false;
        if (point.z > max.z || point.z < min.z)
            return false;
        return true;
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
        this._imp.setMin(value);
    }
    getMin() {
        return this._imp.getMin();
    }
    setMax(value) {
        this._imp.setMax(value);
    }
    getMax() {
        return this._imp.getMax();
    }
    setCenter(value) {
        this._imp.setCenter(value);
    }
    getCenter() {
        return this._imp.getCenter();
    }
    setExtent(value) {
        this._imp.setExtent(value);
    }
    getExtent() {
        return this._imp.getExtent();
    }
    _getUpdateFlag(type) {
        return this._imp._getUpdateFlag(type);
    }
    _setUpdateFlag(type, value) {
        this._imp._setUpdateFlag(type, value);
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
        this._imp._tranform(matrix, out._imp);
    }
    getCorners(corners) {
        this._imp.getCorners(corners);
    }
    getBoundBox(box) {
        this._imp._getBoundBox().cloneTo(box);
    }
    calculateBoundsintersection(bounds) {
        return this._imp.calculateBoundsintersection(bounds._imp);
    }
    cloneTo(destObject) {
        this._imp.cloneTo(destObject._imp);
    }
    clone() {
        var dest = new Bounds(new Vector3(), new Vector3());
        this.cloneTo(dest);
        return dest;
    }
}
Bounds._UPDATE_MIN = 0x01;
Bounds._UPDATE_MAX = 0x02;
Bounds._UPDATE_CENTER = 0x04;
Bounds._UPDATE_EXTENT = 0x08;
const TEMP_VECTOR3_MAX0 = new Vector3();
const TEMP_VECTOR3_MAX1 = new Vector3();

//# sourceMappingURL=Bounds.js.map
