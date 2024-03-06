import { Scene } from "../display/Scene";
import { UIComponent } from "./UIComponent";
import { ILaya } from "../../ILaya";
export class View extends Scene {
    constructor() {
        super(false);
        this._watchMap = {};
        this._scene = null;
        this.createChildren();
    }
    static regUI(url, json) {
        ILaya.loader.cacheRes(url, json);
    }
    changeData(key) {
        let arr = this._watchMap[key];
        if (!arr)
            return;
        for (let i = 0, n = arr.length; i < n; i++) {
            let watcher = arr[i];
            watcher.exe(this);
        }
    }
    set_dataSource(value) {
        this._dataSource = value;
        for (let name in value) {
            let comp = this.getChildByName(name);
            if (comp instanceof UIComponent)
                comp.dataSource = value[name];
            else if (name in this && !(this[name] instanceof Function))
                this[name] = value[name];
        }
    }
}
View.uiMap = {};

//# sourceMappingURL=View.js.map
