import { Vector3 } from "../../../../maths/Vector3";
import { Bounds } from "../../../math/Bounds";
import { CollisionUtils } from "../../../math/CollisionUtils";
import { ContainmentType } from "../../../math/ContainmentType";
import { Plane } from "../../../math/Plane";
export class BVHSpatialBox {
    constructor(bvhmanager, config) {
        this._bounds = new Bounds(new Vector3(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), new Vector3(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE));
        this._cellList = [];
        this._cellCount = 0;
        this._bvhmanager = bvhmanager;
        this._config = config;
    }
    static sciContainsBox(box, cullInfo) {
        const p = BVHSpatialBox._tempV3;
        const n = BVHSpatialBox._tempV3_2;
        const boxMin = box.min;
        const boxMax = box.max;
        let result = ContainmentType.Contains;
        for (let i = 0, nn = cullInfo.cullPlaneCount; i < nn; i++) {
            const plane = cullInfo.cullPlanes[i];
            const planeNor = plane.normal;
            if (planeNor.x >= 0) {
                p.x = boxMax.x;
                n.x = boxMin.x;
            }
            else {
                p.x = boxMin.x;
                n.x = boxMax.x;
            }
            if (planeNor.y >= 0) {
                p.y = boxMax.y;
                n.y = boxMin.y;
            }
            else {
                p.y = boxMin.y;
                n.y = boxMax.y;
            }
            if (planeNor.z >= 0) {
                p.z = boxMax.z;
                n.z = boxMin.z;
            }
            else {
                p.z = boxMin.z;
                n.z = boxMax.z;
            }
            if (CollisionUtils.intersectsPlaneAndPoint(plane, p) === Plane.PlaneIntersectionType_Back)
                return ContainmentType.Disjoint;
            if (CollisionUtils.intersectsPlaneAndPoint(plane, n) === Plane.PlaneIntersectionType_Back)
                result = ContainmentType.Intersects;
        }
        return result;
    }
    static sciIntersectsBox(box, cullInfo) {
        const cullPlaneCount = cullInfo.cullPlaneCount;
        const cullPlanes = cullInfo.cullPlanes;
        const min = box.min;
        const max = box.max;
        const minX = min.x;
        const minY = min.y;
        const minZ = min.z;
        const maxX = max.x;
        const maxY = max.y;
        const maxZ = max.z;
        let pass = true;
        for (let j = 0; j < cullPlaneCount; j++) {
            const plane = cullPlanes[j];
            const normal = plane.normal;
            if (plane.distance + (normal.x * (normal.x < 0.0 ? minX : maxX)) + (normal.y * (normal.y < 0.0 ? minY : maxY)) + (normal.z * (normal.z < 0.0 ? minZ : maxZ)) < 0.0) {
                pass = false;
                break;
            }
        }
        return pass;
    }
    set parent(value) {
        this._parent = value;
    }
    get parent() {
        return this._parent;
    }
    _isRepeat(cell) {
        return (this._cellList.indexOf(cell) != -1);
    }
    _addOneCell(cell) {
        this._cellList.push(cell);
        this._cellCount++;
        this._bvhmanager.bvhManager.set(cell.id, this);
        this._bvhmanager.cellCount++;
    }
    _removeOneCell(cell) {
        let index = this._cellList.indexOf(cell);
        if (index == -1)
            return false;
        this._cellCount--;
        this._cellList.splice(index, 1);
        this._bvhmanager.bvhManager.delete(cell.id);
        this._bvhmanager.cellCount--;
        return true;
    }
    _clearList() {
        this._bvhmanager.cellCount -= this._cellCount;
        this._cellCount = 0;
        this._cellList = null;
    }
    _isFloatMax(x, y) {
        return x - y > 0.0001;
    }
    _isBoundsContainedBySpatialBox(cell) {
        let cellMin = cell.bounds.getMin();
        let cellMax = cell.bounds.getMax();
        let boxMin = this._bounds.getMin();
        let boxMax = this._bounds.getMax();
        if (this._isFloatMax(cellMin.x, boxMin.x) && this._isFloatMax(cellMin.y, boxMin.y) && this._isFloatMax(cellMin.z, boxMin.z) &&
            this._isFloatMax(boxMax.x, cellMax.x) && this._isFloatMax(boxMax.y, cellMax.y) && this._isFloatMax(boxMax.z, cellMax.z)) {
            return false;
        }
        return true;
    }
    _addBounds(cell) {
        this._boundchanged = this._isBoundsContainedBySpatialBox(cell);
    }
    _removeBounds(cell) {
        this._boundchanged = this._isBoundsContainedBySpatialBox(cell);
    }
    getList() {
        return this._cellList;
    }
    getchild0() {
        return this._children0;
    }
    getchild1() {
        return this._children1;
    }
    fillCell(cell) {
        if (this._isRepeat(cell)) {
            return;
        }
        this._addOneCell(cell);
        this._boundchanged = true;
        this._bvhmanager.updateBVHBoxList.add(this);
    }
    fillRemove(cell) {
        if (!this._isRepeat(cell)) {
            return;
        }
        this._removeOneCell(cell);
        this._boundchanged = true;
        this._bvhmanager.updateBVHBoxList.add(this);
    }
    addCell(cell) {
        if (this._isRepeat(cell)) {
            return;
        }
        this._addOneCell(cell);
        this._addBounds(cell);
    }
    removeCell(cell) {
        if (this._removeOneCell(cell)) {
            this._removeBounds(cell);
        }
    }
    splitBox() {
        if (!this.isContentBox()) {
            this._children0 && this._children0.splitBox();
            this._children1 && this._children1.splitBox();
            return;
        }
        let v1 = this._bounds.getExtent();
        if ((this._config.max_SpatialCount > this._cellCount && this._config.limit_size >= 2 * Math.max(v1.x, v1.y, v1.z)) || this._cellCount <= 1)
            return;
        if (v1.x > v1.y && v1.x > v1.z)
            this._cellList.sort((a, b) => {
                if (a && b)
                    return a.bounds.getCenter().x - b.bounds.getCenter().x;
                else
                    return 0;
            });
        else if (v1.y > v1.x && v1.y > v1.z)
            this._cellList.sort((a, b) => {
                if (a && b)
                    return a.bounds.getCenter().y - b.bounds.getCenter().y;
                else
                    return 0;
            });
        else if (v1.z > v1.x && v1.z > v1.y)
            this._cellList.sort((a, b) => {
                if (a && b)
                    return a.bounds.getCenter().z - b.bounds.getCenter().z;
                else
                    return 0;
            });
        const mid = this._cellCount / 2 | 0;
        this._children0 = this._creatChildNode();
        this._children0.parent = this;
        for (let i = 0; i < mid; i++) {
            const cell = this._cellList[i];
            this._children0.fillCell(cell);
            Bounds.merge(this._children0._bounds, cell.bounds, this._children0._bounds);
        }
        this._children0._boundchanged = false;
        this._children0.splitBox();
        this._children1 = this._creatChildNode();
        this._children1.parent = this;
        for (let i = mid; i < this._cellCount; i++) {
            const cell = this._cellList[i];
            this._children1.fillCell(cell);
            Bounds.merge(this._children1._bounds, cell.bounds, this._children1._bounds);
        }
        this._children1._boundchanged = false;
        this._children1.splitBox();
        this._clearList();
    }
    getNearlist(checkPos) {
        if (this.isContentBox())
            return this;
        else {
            let v1 = this._children0._bounds.getCenter();
            let v2 = this._children1._bounds.getCenter();
            return Vector3.distanceSquared(v1, checkPos) < Vector3.distanceSquared(v2, checkPos) ? this._children0.getNearlist(checkPos) : this._children1.getNearlist(checkPos);
        }
    }
    traverseBoundsCell(out, conditionalFun = null) {
        if (this.isContentBox()) {
            if (!conditionalFun)
                for (var i = 0; i < this._cellCount; i++) {
                    out.add(this._cellList[i]);
                }
            else
                for (var i = 0; i < this._cellCount; i++) {
                    var node = this._cellList[i];
                    conditionalFun(node) && out.add(node);
                }
        }
        else {
            this._children0 && this._children0.traverseBoundsCell(out, conditionalFun);
            this._children1 && this._children1.traverseBoundsCell(out, conditionalFun);
        }
    }
    _creatChildNode() {
        return new BVHSpatialBox(this._bvhmanager, this._config);
    }
    getItemByCameraCullInfo(cameraCullInfo, out) {
        var frustum = cameraCullInfo.boundFrustum;
        const result = frustum.containsBoundBox(this._bounds);
        if (result == 1)
            this.traverseBoundsCell(out);
        else if (result == 2) {
            if (this.isContentBox()) {
                for (let i = 0; i < this._cellList.length; i++) {
                    if (frustum.intersects(this._cellList[i].bounds))
                        out.add(this._cellList[i]);
                }
            }
            else {
                this._children0.getItemByCameraCullInfo(cameraCullInfo, out);
                this._children1.getItemByCameraCullInfo(cameraCullInfo, out);
            }
        }
    }
    getItemByFrustum(frustum, out) {
        const result = frustum.containsBoundBox(this._bounds);
        if (result == 1)
            this.traverseBoundsCell(out);
        else if (result == 2) {
            if (this.isContentBox()) {
                for (let i = 0; i < this._cellList.length; i++) {
                    if (frustum.intersects(this._cellList[i].bounds))
                        out.add(this._cellList[i]);
                }
            }
            else {
                this._children0.getItemByFrustum(frustum, out);
                this._children1.getItemByFrustum(frustum, out);
            }
        }
    }
    getItemBySCI(sci, out) {
        const result = BVHSpatialBox.sciContainsBox(this._bounds, sci);
        if (result == 1) {
            let fn = (data) => { return data.shadowCullPass(); };
            this.traverseBoundsCell(out, fn);
        }
        else if (result == 2) {
            if (this.isContentBox()) {
                for (let i = 0; i < this._cellList.length; i++) {
                    let render = this._cellList[i];
                    let pass = render.shadowCullPass();
                    if (pass && BVHSpatialBox.sciIntersectsBox(this._cellList[i].bounds, sci))
                        out.add(this._cellList[i]);
                }
            }
            else {
                this._children0.getItemBySCI(sci, out);
                this._children1.getItemBySCI(sci, out);
            }
        }
    }
    recaculateBox() {
        if (!!this._children0 && !!this._children1) {
            Bounds.merge(this._children0._bounds, this._children1._bounds, this._bounds);
        }
        else if (this._cellList && this._cellList.length >= 1) {
            this._cellList[0].bounds.cloneTo(this._bounds);
            for (var i = 0, n = this._cellList.length; i < n; i++) {
                Bounds.merge(this._cellList[i].bounds, this._bounds, this._bounds);
            }
        }
        else {
            console.error("BVHSpatialBox is illegal");
        }
        this.parent && this.parent.recaculateBox();
        this._boundchanged = false;
    }
    isRoot() {
        return !this._parent;
    }
    isContentBox() {
        return this._cellCount != 0;
    }
    destroy() {
        if (this.isContentBox()) {
            this._cellList = null;
        }
        else {
            this._children0 && this._children0.destroy();
            this._children1 && this._children1.destroy();
            this._children0 = null;
            this._children1 = null;
        }
        this._bounds = null;
        this._config = null;
        this._bvhmanager = null;
    }
}
BVHSpatialBox._tempV3 = new Vector3();
BVHSpatialBox._tempV3_2 = new Vector3();

//# sourceMappingURL=BVHSpatialBox.js.map
