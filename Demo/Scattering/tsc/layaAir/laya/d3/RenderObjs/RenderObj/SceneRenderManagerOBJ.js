import { SingletonList } from "../../../utils/SingletonList";
export class SceneRenderManagerOBJ {
    constructor() {
        this._renders = new SingletonList();
        this._motionRenders = new SingletonList();
    }
    get list() {
        return this._renders;
    }
    set list(value) {
        this._renders = value;
    }
    addRenderObject(object) {
        this._renders.add(object);
    }
    removeRenderObject(object) {
        this._renders.remove(object);
        this.removeMotionObject(object);
    }
    removeMotionObject(object) {
        let index = object._motionIndexList;
        if (index != -1) {
            let elements = this._motionRenders.elements;
            this._motionRenders.length -= 1;
            elements[length]._motionIndexList = index;
            elements[index] = elements[length];
        }
    }
    updateMotionObjects() {
        for (let i = 0; i < this._motionRenders.length; i++) {
            this._motionRenders.elements[i].bounds;
            this._motionRenders.elements[i]._motionIndexList = -1;
        }
        this._motionRenders.length = 0;
    }
    addMotionObject(object) {
        if (object._motionIndexList == -1) {
            object._motionIndexList = this._motionRenders.length;
            this._motionRenders.add(object);
        }
    }
    destroy() {
        this._renders.destroy();
    }
}

//# sourceMappingURL=SceneRenderManagerOBJ.js.map
