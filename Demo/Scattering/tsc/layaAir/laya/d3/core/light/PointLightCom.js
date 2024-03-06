import { Light, LightType } from "./Light";
export class PointLightCom extends Light {
    constructor() {
        super();
        this._range = 6.0;
        this._lightType = LightType.Point;
    }
    get range() {
        return this._range;
    }
    set range(value) {
        this._range = value;
    }
    _addToLightQueue() {
        this.owner.scene._pointLights.add(this);
    }
    _removeFromLightQueue() {
        this.owner.scene._pointLights.remove(this);
    }
    _parse(data, spriteMap) {
        super._parse(data, spriteMap);
        this.range = data.range;
    }
    _cloneTo(dest) {
        super._cloneTo(dest);
        var pointlight = dest;
        pointlight.range = this.range;
        pointlight._lightType = LightType.Point;
    }
    _create() {
        return new PointLightCom();
    }
}

//# sourceMappingURL=PointLightCom.js.map
