import { LayaGL } from "../../../layagl/LayaGL";
export class SceneRenderManager {
    constructor() {
        this._sceneManagerOBJ = LayaGL.renderOBJCreate.createSceneRenderManager();
    }
    get list() {
        return this._sceneManagerOBJ.list;
    }
    set list(value) {
        this._sceneManagerOBJ.list = value;
    }
    addRenderObject(object) {
        this._sceneManagerOBJ.addRenderObject(object);
    }
    removeRenderObject(object) {
        this._sceneManagerOBJ.removeRenderObject(object);
    }
    removeMotionObject(object) {
        this._sceneManagerOBJ.removeMotionObject(object);
    }
    updateMotionObjects() {
        this._sceneManagerOBJ.updateMotionObjects();
    }
    addMotionObject(object) {
        this._sceneManagerOBJ.addMotionObject(object);
    }
    destroy() {
        this._sceneManagerOBJ.destroy();
    }
}

//# sourceMappingURL=SceneRenderManager.js.map
