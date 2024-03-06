import { Vector2 } from "../../../maths/Vector2";
import { Light, LightMode, LightType } from "./Light";
export var AreaShape;
(function (AreaShape) {
    AreaShape[AreaShape["rectangle"] = 0] = "rectangle";
    AreaShape[AreaShape["ellipse"] = 1] = "ellipse";
})(AreaShape || (AreaShape = {}));
export class AreaLightCom extends Light {
    constructor() {
        super();
        this._lightType = LightType.Area;
        this._lightmapBakedType = LightMode.bakeOnly;
        this._spread = 90;
        this._maxBounces = 1024;
        this._size = new Vector2(1, 1);
        this._areaShape = AreaShape.rectangle;
        this._power = 100;
    }
    get lightmapBakedType() {
        return LightMode.bakeOnly;
    }
    set lightmapBakedType(value) {
        this._lightmapBakedType = LightMode.bakeOnly;
    }
    get shape() {
        return this._areaShape;
    }
    set shape(value) {
        this._areaShape = value;
    }
    set power(value) {
        this._power = value;
    }
    get power() {
        return this._power;
    }
    set size(value) {
        value && value.cloneTo(this._size);
    }
    get size() {
        return this._size;
    }
    set spread(value) {
        this._spread = Math.min((Math.max(0, value)), 180);
    }
    get spread() {
        return this._spread;
    }
    set maxBounces(value) {
        this._maxBounces = value;
    }
    get maxBounces() {
        return this._maxBounces;
    }
    _addToLightQueue() {
    }
    _removeFromLightQueue() {
    }
    _parse(data, spriteMap) {
        super._parse(data, spriteMap);
    }
    _cloneTo(dest) {
        super._cloneTo(dest);
    }
    _create() {
        return new AreaLightCom();
    }
}

//# sourceMappingURL=AreaLightCom.js.map
