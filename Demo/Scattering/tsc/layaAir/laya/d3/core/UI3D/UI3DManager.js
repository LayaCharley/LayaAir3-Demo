import { SingletonList } from "../../../utils/SingletonList";
export class UI3DManager {
    constructor() {
        this._UI3Dlist = new SingletonList();
    }
    add(value) {
        this._UI3Dlist.add(value);
    }
    remove(value) {
        this._UI3Dlist.remove(value);
    }
    update() {
        let elements = this._UI3Dlist.elements;
        for (var i = 0, n = this._UI3Dlist.length; i < n; i++) {
            elements[i]._submitRT();
        }
    }
    rayCast(ray) {
        let rayOri = ray.origin;
        this._UI3Dlist.clean();
        this._UI3Dlist.elements.sort((a, b) => {
            return a._getCameraDistance(rayOri) - b._getCameraDistance(rayOri);
        });
        let elements = this._UI3Dlist.elements;
        for (var i = 0, n = this._UI3Dlist.length; i < n; i++) {
            let hit = elements[i]._checkUIPos(ray);
            if (hit) {
                return hit;
            }
        }
        return null;
    }
    destory() {
        this._UI3Dlist.destroy();
    }
}

//# sourceMappingURL=UI3DManager.js.map
