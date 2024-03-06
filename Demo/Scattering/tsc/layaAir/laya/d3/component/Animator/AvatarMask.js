export class AvatarMask {
    constructor(data) {
        this._avatarPathMap = (data === null || data === void 0 ? void 0 : data._avatarPathMap) || {};
    }
    getTransformActive(path) {
        return this._avatarPathMap[path];
    }
    setTransformActive(path, value) {
        this._avatarPathMap[path] = value;
    }
    getAllTranfromPath() {
        return this._avatarPathMap;
    }
    clone() {
        var dest = new AvatarMask();
        this.cloneTo(dest);
        return dest;
    }
    cloneTo(destObject) {
        var dest = destObject;
        for (var key in this._avatarPathMap) {
            dest.setTransformActive(key, this._avatarPathMap[key]);
        }
    }
}

//# sourceMappingURL=AvatarMask.js.map
