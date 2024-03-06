import { SingletonList } from "../../../../utils/SingletonList";
import { SceneRenderManager } from "../SceneRenderManager";
import { BVHRenderSpatial } from "./BVHRenderSpatial";
export class BVHSceneRenderManager extends SceneRenderManager {
    constructor(bvhConfig = null) {
        super();
        this._bvhRenderSpatial = new BVHRenderSpatial(bvhConfig);
        this._allRenderList = new SingletonList();
    }
    get list() {
        return this._allRenderList;
    }
    set list(value) {
        for (let i = 0, n = value.length; i < n; i++) {
            let render = value.elements[i];
            this.addRenderObject(render);
        }
    }
    get bvhSpatial() {
        return this._bvhRenderSpatial;
    }
    get otherList() {
        return this._sceneManagerOBJ.list;
    }
    addRenderObject(object) {
        if (!this._bvhRenderSpatial.addOne(object)) {
            this._sceneManagerOBJ.addRenderObject(object);
        }
        this._allRenderList.add(object);
    }
    removeRenderObject(object) {
        if (!this._bvhRenderSpatial.removeOne(object))
            this._sceneManagerOBJ.removeRenderObject(object);
        this._allRenderList.remove(object);
    }
    removeMotionObject(object) {
        this._sceneManagerOBJ.removeMotionObject(object);
    }
    updateMotionObjects() {
        this._bvhRenderSpatial.update();
        this._sceneManagerOBJ.updateMotionObjects();
    }
    addMotionObject(object) {
        if (this._bvhRenderSpatial.cellLegal(object)) {
            this._bvhRenderSpatial.motionOne(object);
        }
        else {
            this._sceneManagerOBJ.addMotionObject(object);
        }
    }
    destroy() {
        this._sceneManagerOBJ.destroy();
        this._bvhRenderSpatial.destroy();
        this._allRenderList.destroy();
    }
}

//# sourceMappingURL=BVHSceneRenderManager.js.map
