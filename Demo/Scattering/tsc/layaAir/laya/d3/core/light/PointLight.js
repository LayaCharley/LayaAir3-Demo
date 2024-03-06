import { PointLightCom } from "./PointLightCom";
import { LightSprite } from "./LightSprite";
import { Sprite3D } from "../Sprite3D";
export class PointLight extends LightSprite {
    constructor() {
        super();
        this._light = this.addComponent(PointLightCom);
        this._light.range = 6.0;
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
    }
    _cloneTo(destObject, rootSprite, dstSprite) {
        super._cloneTo(destObject, rootSprite, dstSprite);
    }
    _create() {
        return new Sprite3D();
    }
}

//# sourceMappingURL=PointLight.js.map
