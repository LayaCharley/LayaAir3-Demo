import { SingletonList } from "../../../../utils/SingletonList";
import { BVHSpatialBox } from "./BVHSpatialBox";
import { BVHSpatialConfig, BVHSpatialManager } from "./SpatialManager";
export class BVHSpatial {
    constructor(bvhConfig = null, bvhManager = null) {
        this._isBuild = false;
        this._BVHConfig = bvhConfig ? bvhConfig : new BVHSpatialConfig();
        this._BVHManager = bvhManager ? bvhManager : new BVHSpatialManager();
        this._BVHSpatialBox = this._creatChildNode();
    }
    _creatChildNode() {
        return new BVHSpatialBox(this._BVHManager, this._BVHConfig);
    }
    get bvhSpatialBox() {
        return this._BVHSpatialBox;
    }
    cellLegal(cell) {
        let extend = cell.bounds.getExtent();
        return this._BVHConfig.limit_size > (Math.max(extend.x, extend.y, extend.z) * 2);
    }
    addOne(cell) {
        if (!this.cellLegal(cell)) {
            return false;
        }
        if (this._isBuild) {
            let spatial = this._BVHSpatialBox.getNearlist(cell.bounds.getCenter());
            spatial.addCell(cell);
            this._BVHManager.updateBVHBoxList.add(spatial);
        }
        else {
            this._BVHSpatialBox.fillCell(cell);
        }
        return true;
    }
    removeOne(cell) {
        if (!this._BVHManager.bvhManager.has(cell.id)) {
            return false;
        }
        if (this._isBuild) {
            let spatial = this._BVHManager.bvhManager.get(cell.id);
            spatial.removeCell(cell);
            this._BVHManager.updateBVHBoxList.add(spatial);
        }
        else {
            this._BVHSpatialBox.fillRemove(cell);
        }
        return true;
    }
    motionOne(cell) {
        if (this._BVHSpatialBox.getNearlist(cell.bounds.getCenter()) == this._BVHManager.bvhManager.get(cell.id)) {
            return;
        }
        else {
            this.removeOne(cell);
            this.addOne(cell);
        }
    }
    getItemByCameraCullInfo(cameraCullInfo, out) {
        if (this._BVHManager.updateBVHBoxList.length > 0) {
            this.update();
        }
        if (this._isBuild) {
            this._BVHSpatialBox.getItemByCameraCullInfo(cameraCullInfo, out);
        }
        else {
            this._BVHSpatialBox.traverseBoundsCell(out);
        }
    }
    getItemByFrustum(frustum, out) {
        if (this._BVHManager.updateBVHBoxList.length > 0) {
            this.update();
        }
        if (this._isBuild) {
            this._BVHSpatialBox.getItemByFrustum(frustum, out);
        }
        else {
            this._BVHSpatialBox.traverseBoundsCell(out);
        }
    }
    getItemBySCI(sci, out) {
        if (this._BVHManager.updateBVHBoxList.length > 0) {
            this.update();
        }
        if (this._isBuild) {
            this._BVHSpatialBox.getItemBySCI(sci, out);
        }
        else {
            this._BVHSpatialBox.traverseBoundsCell(out, (data) => { return data.shadowCullPass(); });
        }
    }
    update() {
        if (!this._isBuild) {
            if (this._BVHManager.cellCount > this._BVHConfig.Min_BVH_Build_Nums) {
                this._BVHSpatialBox.recaculateBox();
                this._BVHSpatialBox.splitBox();
                this._BVHManager.updateBVHBoxList.remove(this._BVHSpatialBox);
                this._isBuild = true;
            }
            this._BVHManager.updateBVHBoxList.length = 0;
        }
        else {
            let list = this._BVHManager.updateBVHBoxList;
            for (let i = 0, n = list.length; i < n; i++) {
                let spatial = list.elements[i];
                spatial._boundchanged && spatial.recaculateBox();
                spatial.splitBox();
            }
            list.length = 0;
        }
    }
    rebuild() {
        if (this._isBuild) {
            let out = new SingletonList();
            this._BVHSpatialBox.traverseBoundsCell(out);
            this._BVHSpatialBox.destroy();
            this._BVHManager.clear();
            this._isBuild = false;
            this._BVHSpatialBox = this._creatChildNode();
            for (let i = 0, n = out.length; i < n; i++) {
                this.addOne(out.elements[i]);
            }
            this._BVHSpatialBox.recaculateBox();
            this._BVHSpatialBox.splitBox();
        }
    }
    destroy() {
        this._BVHSpatialBox.destroy();
        this._BVHManager.destroy();
    }
}

//# sourceMappingURL=BVHSpatial.js.map
