import { Component } from "../../../components/Component";
import { Bounds } from "../../math/Bounds";
import { Event } from "../../../events/Event";
export var volumeIntersectType;
(function (volumeIntersectType) {
    volumeIntersectType[volumeIntersectType["contain"] = 0] = "contain";
    volumeIntersectType[volumeIntersectType["intersect"] = 1] = "intersect";
    volumeIntersectType[volumeIntersectType["Disjoint"] = 2] = "Disjoint";
})(volumeIntersectType || (volumeIntersectType = {}));
export class volumeIntersectInfo {
}
export class Volume extends Component {
    constructor() {
        super();
        this._aroundVolumeCacheNum = 0;
        this._bounds = new Bounds();
        this._primitiveBounds = new Bounds();
        this._importance = 0;
        this.runInEditor = true;
    }
    get type() {
        return this._type;
    }
    get bounds() {
        return this._bounds;
    }
    get boundsMax() {
        return this._primitiveBounds.getMax();
    }
    set boundsMax(value) {
        this._primitiveBounds.setMax(value);
        this._reCaculateBoundBox();
    }
    set boundsMin(value) {
        this._primitiveBounds.setMin(value);
        this._reCaculateBoundBox();
    }
    get boundsMin() {
        return this._primitiveBounds.getMin();
    }
    get probePosition() {
        return this.owner.transform.position;
    }
    get importance() {
        return this._importance;
    }
    set importance(value) {
        this._importance = value;
    }
    _onEnable() {
        this.owner.transform.on(Event.TRANSFORM_CHANGED, this, this._VolumeChange);
        this._volumeManager = this.owner.scene._volumeManager;
        this._volumeManager.add(this);
        this._reCaculateBoundBox();
    }
    _onDisable() {
        this.owner.transform.off(Event.TRANSFORM_CHANGED, this, this._VolumeChange);
        this._volumeManager.remove(this);
    }
    _VolumeChange() {
        this._volumeManager._needUpdateAllRender = true;
        this._reCaculateBoundBox();
    }
    _reCaculateBoundBox() {
        this.owner && this._primitiveBounds._tranform(this.owner.transform.worldMatrix, this._bounds);
    }
    _cloneTo(dest) {
    }
}

//# sourceMappingURL=Volume.js.map
