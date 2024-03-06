import { Sprite3D } from "../Sprite3D";
import { LightSprite } from "./LightSprite";
import { SpotLightCom } from "./SpotLightCom";
export class SpotLight extends LightSprite {
    constructor() {
        super();
        this._light = this.addComponent(SpotLightCom);
    }
    get spotAngle() {
        return this._light.spotAngle;
    }
    set spotAngle(value) {
        this._light.spotAngle = Math.max(Math.min(value, 179), 0);
    }
    get range() {
        return this._light.range;
    }
    set range(value) {
        this._light.range = value;
    }
    _parse(data, spriteMap) {
        super._parse(data, spriteMap);
        this.range = data.range;
        this.spotAngle = data.spotAngle;
    }
    _cloneTo(destObject, rootSprite, dstSprite) {
        super._cloneTo(destObject, rootSprite, dstSprite);
    }
    _create() {
        return new Sprite3D();
    }
}

//# sourceMappingURL=SpotLight.js.map
