import { StaticFlag } from "../../Sprite3D";
import { BVHSpatial } from "../bvh/BVHSpatial";
import { BVHRenderBox } from "./BVHRenderSpatialBox";
export class BVHRenderSpatial extends BVHSpatial {
    _creatChildNode() {
        return new BVHRenderBox(this._BVHManager, this._BVHConfig);
    }
    cellLegal(cell) {
        if (cell.renderNode.staticMask == StaticFlag.StaticBatch && super.cellLegal(cell))
            return true;
        return false;
    }
}

//# sourceMappingURL=BVHRenderSpatial.js.map
