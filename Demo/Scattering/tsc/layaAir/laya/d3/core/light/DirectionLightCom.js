import { ShadowCascadesMode } from "./ShadowCascadesMode";
import { Light, LightType } from "./Light";
import { Vector3 } from "../../../maths/Vector3";
export class DirectionLightCom extends Light {
    constructor() {
        super();
        this._direction = new Vector3();
        this._shadowCascadesMode = ShadowCascadesMode.NoCascades;
        this._shadowTwoCascadeSplits = 1.0 / 3.0;
        this._shadowFourCascadeSplits = new Vector3(1.0 / 15, 3.0 / 15.0, 7.0 / 15.0);
        this._lightType = LightType.Directional;
    }
    get shadowCascadesMode() {
        return this._shadowCascadesMode;
    }
    set shadowCascadesMode(value) {
        this._shadowCascadesMode = value;
    }
    get shadowTwoCascadeSplits() {
        return this._shadowTwoCascadeSplits;
    }
    set shadowTwoCascadeSplits(value) {
        this._shadowTwoCascadeSplits = value;
    }
    get shadowFourCascadeSplits() {
        return this._shadowFourCascadeSplits;
    }
    set shadowFourCascadeSplits(value) {
        if (value.x > value.y || value.y > value.z || value.z > 1.0)
            throw "DiretionLight:Invalid value.";
        value.cloneTo(this._shadowFourCascadeSplits);
    }
    _addToLightQueue() {
        this.owner.scene._directionLights.add(this);
    }
    _removeFromLightQueue() {
        this.owner.scene._directionLights.remove(this);
    }
    _create() {
        return new DirectionLightCom();
    }
}

//# sourceMappingURL=DirectionLightCom.js.map
