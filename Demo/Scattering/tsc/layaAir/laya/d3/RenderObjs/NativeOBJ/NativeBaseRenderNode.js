export class NativeBaseRenderNode {
    constructor() {
        this._bounds = null;
        this._geometryBounds = null;
        this._transform = null;
        this._nativeObj = new window.conchRenderNode();
    }
    set boundsChange(value) {
        this._nativeObj.boundsChange = value;
    }
    get boundsChange() {
        return this._nativeObj.boundsChange;
    }
    set layer(value) {
        this._nativeObj.layer = value;
    }
    get layer() {
        return this._nativeObj.layer;
    }
    get renderId() {
        return this._nativeObj.renderId;
    }
    set renderId(value) {
        this._nativeObj.renderId = value;
    }
    get receiveShadow() {
        return this._nativeObj.receiveShadow;
    }
    set receiveShadow(value) {
        this._nativeObj.receiveShadow = value;
    }
    get castShadow() {
        return this._nativeObj.castShadow;
    }
    set castShadow(value) {
        this._nativeObj.castShadow = value;
    }
    get bounds() {
        return this._bounds;
    }
    set bounds(value) {
        this._bounds = value;
        this._nativeObj.bounds = value._imp._nativeObj;
    }
    get distanceForSort() {
        return this._nativeObj.distanceForSort;
    }
    set distanceForSort(value) {
        this._nativeObj.distanceForSort = value;
    }
    get transform() {
        return this._transform;
    }
    set transform(value) {
        this._transform = value;
        this._nativeObj.transform = value ? value._nativeObj : null;
    }
    get owner() {
        return this._nativeObj.owner;
    }
    set owner(value) {
        this._nativeObj.owner = value;
    }
    get geometryBounds() {
        return this._geometryBounds;
    }
    set geometryBounds(value) {
        this._geometryBounds = value;
        this._nativeObj.geometryBounds = value._imp._nativeObj;
    }
    get renderbitFlag() {
        return this._nativeObj.renderbitFlag;
    }
    set renderbitFlag(value) {
        this._nativeObj.renderbitFlag = value;
    }
    get staticMask() {
        return this._nativeObj.staticMask;
    }
    set staticMask(value) {
        this._nativeObj.staticMask = value;
    }
}

//# sourceMappingURL=NativeBaseRenderNode.js.map
