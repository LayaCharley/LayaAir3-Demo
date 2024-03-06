import { Utils } from "./Utils";
import { ILaya } from "../../ILaya";
export class WeakObject {
    constructor() {
        this._obj = {};
        WeakObject._maps.push(this);
    }
    static __init__() {
        WeakObject.I = new WeakObject();
        if (!WeakObject.supportWeakMap)
            ILaya.systemTimer.loop(WeakObject.delInterval, null, WeakObject.clearCache);
    }
    static clearCache() {
        for (var i = 0, n = WeakObject._maps.length; i < n; i++) {
            var obj = WeakObject._maps[i];
            obj._obj = {};
        }
    }
    set(key, value) {
        if (key == null)
            return;
        if (WeakObject.supportWeakMap) {
        }
        else {
            if (typeof (key) == 'string' || typeof (key) == 'number') {
                this._obj[key] = value;
            }
            else {
                key.$_GID || (key.$_GID = Utils.getGID());
                this._obj[key.$_GID] = value;
            }
        }
    }
    get(key) {
        if (key == null)
            return null;
        if (WeakObject.supportWeakMap) {
        }
        else {
            if (typeof (key) == 'string' || typeof (key) == 'number')
                return this._obj[key];
            return this._obj[key.$_GID];
        }
    }
    del(key) {
        if (key == null)
            return;
        if (WeakObject.supportWeakMap) {
        }
        else {
            if (typeof (key) == 'string' || typeof (key) == 'number')
                delete this._obj[key];
            else
                delete this._obj[this._obj.$_GID];
        }
    }
    has(key) {
        if (key == null)
            return false;
        if (WeakObject.supportWeakMap) {
            return false;
        }
        else {
            if (typeof (key) == 'string' || typeof (key) == 'number')
                return this._obj[key] != null;
            return this._obj[this._obj.$_GID] != null;
        }
    }
}
WeakObject.supportWeakMap = false;
WeakObject.delInterval = 10 * 60 * 1000;
WeakObject._maps = [];

//# sourceMappingURL=WeakObject.js.map
