import { DirectionLightCom } from "./DirectionLightCom";
import { LightSprite } from "./LightSprite";
import { Sprite3D } from "../Sprite3D";
export class DirectionLight extends LightSprite {
    constructor() {
        super();
        this._light = this.addComponent(DirectionLightCom);
    }
    get shadowCascadesMode() {
        return this._light._shadowCascadesMode;
    }
    set shadowCascadesMode(value) {
        this._light._shadowCascadesMode = value;
    }
    get shadowTwoCascadeSplits() {
        return this._light._shadowTwoCascadeSplits;
    }
    set shadowTwoCascadeSplits(value) {
        this._light._shadowTwoCascadeSplits = value;
    }
    get shadowFourCascadeSplits() {
        return this._light._shadowFourCascadeSplits;
    }
    set shadowFourCascadeSplits(value) {
        if (value.x > value.y || value.y > value.z || value.z > 1.0)
            throw "DiretionLight:Invalid value.";
        value.cloneTo(this._light._shadowFourCascadeSplits);
    }
    _create() {
        return new Sprite3D();
    }
}

//# sourceMappingURL=DirectionLight.js.map
