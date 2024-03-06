import { SingletonList } from "../../../utils/SingletonList";
export class NativeSceneRenderManager {
    constructor() {
        this._renders = new SingletonList();
        this._customUpdateList = new SingletonList();
        this._customCullList = new SingletonList();
        this._nativeObj = new window.conchSceneCullManger();
    }
    get list() {
        return this._renders;
    }
    set list(value) {
        this._customCullList.elements = [];
        this._customCullList.length = 0;
        this._nativeObj.clear();
        this._renders.clear();
        for (let i = 0, len = value.length; i < len; i++) {
            this.addRenderObject(value.elements[i]);
        }
    }
    addRenderObject(object) {
        this._renders.add(object);
        if (!object._customCull && object.renderNode.geometryBounds) {
            this._nativeObj.addRenderObject(object.renderNode._nativeObj);
        }
        else {
            this._customCullList.add(object);
        }
    }
    removeRenderObject(object) {
        if (!object._customCull && object.renderNode.geometryBounds) {
            this._nativeObj.removeRenderObject(object.renderNode._nativeObj);
        }
        else {
            let elements = this._customCullList.elements;
            let index = elements.indexOf(object);
            if (index < this._customCullList.length) {
                this._customCullList.length -= 1;
                elements[index] = elements[this._customCullList.length];
            }
        }
        this._renders.remove(object);
        this.removeMotionObject(object);
    }
    removeMotionObject(object) {
        if (object.renderNode.geometryBounds) {
            this._nativeObj.removeMotionObject(object.renderNode._nativeObj);
        }
        else {
            let index = object._motionIndexList;
            if (index != -1) {
                let elements = this._customUpdateList.elements;
                this._customUpdateList.length -= 1;
                elements[length]._motionIndexList = index;
                elements[index] = elements[length];
            }
        }
    }
    updateMotionObjects() {
        this._nativeObj.updateMotionObjects();
        for (let i = 0; i < this._customUpdateList.length; i++) {
            this._customUpdateList.elements[i].bounds;
            this._customUpdateList.elements[i]._motionIndexList = -1;
        }
        this._customUpdateList.length = 0;
    }
    addMotionObject(object) {
        if (object.renderNode.geometryBounds) {
            this._nativeObj.addMotionObject(object.renderNode._nativeObj);
        }
        else {
            if (object._motionIndexList == -1) {
                object._motionIndexList = this._customUpdateList.length;
                this._customUpdateList.add(object);
            }
        }
    }
    destroy() {
        this._nativeObj.destroy();
        this._renders.destroy();
        this._customUpdateList.destroy();
        this._customCullList.destroy();
    }
}

//# sourceMappingURL=NativeSceneRenderManager.js.map
