import { SingletonList } from "../../../../utils/SingletonList";
export class BVHSpatialManager {
    constructor() {
        this.cellCount = 0;
        this.bvhManager = new Map();
        this.updateBVHBoxList = new SingletonList();
    }
    clear() {
        this.cellCount = 0;
        this.updateBVHBoxList.clear();
    }
    destroy() {
        this.bvhManager = null;
        this.updateBVHBoxList.destroy();
    }
}
export class BVHSpatialConfig {
    constructor() {
        this.max_SpatialCount = 7;
        this.limit_size = 32;
        this.Min_BVH_Build_Nums = 10;
    }
}

//# sourceMappingURL=SpatialManager.js.map
