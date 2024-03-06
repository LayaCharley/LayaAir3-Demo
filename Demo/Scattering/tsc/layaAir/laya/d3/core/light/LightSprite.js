import { Sprite3D } from "../Sprite3D";
export class LightSprite extends Sprite3D {
    constructor() {
        super();
    }
    get color() {
        return this._light.color;
    }
    set color(value) {
        this._light.color = value;
    }
    get mode() {
        return this._light.lightmapBakedType;
    }
    set mode(value) {
        this._light.lightmapBakedType = value;
    }
    get intensity() {
        return this._light.intensity;
    }
    set intensity(value) {
        this._light.intensity = value;
    }
    get shadowMode() {
        return this._light.shadowMode;
    }
    set shadowMode(value) {
        this._light.shadowMode = value;
    }
    get shadowDistance() {
        return this._light.shadowDistance;
    }
    set shadowDistance(value) {
        this._light.shadowDistance = value;
    }
    get shadowResolution() {
        return this._light.shadowResolution;
    }
    set shadowResolution(value) {
        this._light.shadowResolution = value;
    }
    get shadowDepthBias() {
        return this._light.shadowDepthBias;
    }
    set shadowDepthBias(value) {
        this._light.shadowDepthBias = value;
    }
    get shadowNormalBias() {
        return this._light.shadowNormalBias;
    }
    set shadowNormalBias(value) {
        this._light.shadowNormalBias = value;
    }
    get shadowStrength() {
        return this._light.shadowStrength;
    }
    set shadowStrength(value) {
        this._light.shadowStrength = value;
    }
    get shadowNearPlane() {
        return this._light.shadowNearPlane;
    }
    set shadowNearPlane(value) {
        this._light.shadowNearPlane = value;
    }
    get lightmapBakedType() {
        return this._light.lightmapBakedType;
    }
    set lightmapBakedType(value) {
        this._light.lightmapBakedType = value;
    }
    get lightWorldMatrix() {
        return this._light.lightWorldMatrix;
    }
    _parse(data, spriteMap) {
        super._parse(data, spriteMap);
        var colorData = data.color;
        this.color.r = colorData[0];
        this.color.g = colorData[1];
        this.color.b = colorData[2];
        this.intensity = data.intensity;
        this.lightmapBakedType = data.lightmapBakedType;
    }
    _cloneTo(destObject, rootSprite, dstSprite) {
        super._cloneTo(destObject, rootSprite, dstSprite);
        var spriteLight = destObject;
        spriteLight.color = this.color.clone();
        spriteLight.intensity = this.intensity;
        spriteLight.lightmapBakedType = this.lightmapBakedType;
    }
    _addToLightQueue() {
    }
    _removeFromLightQueue() {
    }
    _create() {
        return new Sprite3D();
    }
}

//# sourceMappingURL=LightSprite.js.map
