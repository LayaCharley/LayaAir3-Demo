import { LayaEnv } from "../../LayaEnv";
import { LegacyUIParser } from "../loaders/LegacyUIParser";
import { Resource } from "./Resource";
export class Prefab extends Resource {
    constructor(version) {
        super();
        this.version = version;
        this._deps = [];
    }
    create(options, errors) {
        if (this.json)
            return LegacyUIParser.createByData(null, this.json);
        else
            return null;
    }
    get deps() {
        return this._deps;
    }
    addDep(res) {
        if (res instanceof Resource) {
            res._addReference();
            this._deps.push(res);
            if (!LayaEnv.isPlaying && (res instanceof Prefab))
                res.on("obsolute", this, this.onDepObsolute);
        }
    }
    addDeps(resArr) {
        for (let res of resArr) {
            if (res instanceof Resource) {
                res._addReference();
                this._deps.push(res);
                if (!LayaEnv.isPlaying && (res instanceof Prefab))
                    res.on("obsolute", this, this.onDepObsolute);
            }
        }
    }
    _disposeResource() {
        for (let res of this._deps) {
            res._removeReference();
            if (!LayaEnv.isPlaying && (res instanceof Prefab))
                res.off("obsolute", this, this.onDepObsolute);
        }
    }
    get obsolute() {
        return this._obsolute;
    }
    set obsolute(value) {
        if (this._obsolute != value) {
            this._obsolute = value;
            if (value && !LayaEnv.isPlaying)
                this.event("obsolute");
        }
    }
    onDepObsolute() {
        this.obsolute = true;
    }
}
export var HierarchyResource = Prefab;

//# sourceMappingURL=HierarchyResource.js.map
