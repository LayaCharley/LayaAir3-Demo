import { Light, LightType } from "./Light";
import { Vector3 } from "../../../maths/Vector3";
export class SpotLightCom extends Light {
    constructor() {
        super();
        this._spotAngle = 30.0;
        this._range = 10.0;
        this._direction = new Vector3();
        this._lightType = LightType.Spot;
    }
    get spotAngle() {
        return this._spotAngle;
    }
    set spotAngle(value) {
        this._spotAngle = Math.max(Math.min(value, 179), 0);
    }
    get range() {
        return this._range;
    }
    set range(value) {
        this._range = value;
    }
    _addToLightQueue() {
        this.owner.scene._spotLights.add(this);
    }
    _removeFromLightQueue() {
        this.owner.scene._spotLights.remove(this);
    }
    _parse(data, spriteMap) {
        super._parse(data, spriteMap);
        this.range = data.range;
        this.spotAngle = data.spotAngle;
    }
    _cloneTo(dest) {
        super._cloneTo(dest);
        var spotLight = dest;
        spotLight.range = this.range;
        spotLight.spotAngle = this.spotAngle;
    }
    _create() {
        return new SpotLightCom();
    }
}

//# sourceMappingURL=SpotLightCom.js.map
