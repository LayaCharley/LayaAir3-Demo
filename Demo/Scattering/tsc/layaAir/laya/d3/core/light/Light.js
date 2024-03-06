import { Config3D } from "../../../../Config3D";
import { ShadowMode } from "./ShadowMode";
import { Component } from "../../../components/Component";
import { Color } from "../../../maths/Color";
import { Matrix4x4 } from "../../../maths/Matrix4x4";
import { Vector3 } from "../../../maths/Vector3";
export var LightType;
(function (LightType) {
    LightType[LightType["Directional"] = 0] = "Directional";
    LightType[LightType["Spot"] = 1] = "Spot";
    LightType[LightType["Point"] = 2] = "Point";
    LightType[LightType["Area"] = 3] = "Area";
})(LightType || (LightType = {}));
export var LightMode;
(function (LightMode) {
    LightMode[LightMode["mix"] = 0] = "mix";
    LightMode[LightMode["realTime"] = 1] = "realTime";
    LightMode[LightMode["bakeOnly"] = 2] = "bakeOnly";
})(LightMode || (LightMode = {}));
export class Light extends Component {
    constructor() {
        super();
        this._shadowMode = ShadowMode.None;
        this._isAlternate = false;
        this._shadowResolution = 2048;
        this._shadowDistance = 50.0;
        this._shadowDepthBias = 1.0;
        this._shadowNormalBias = 1.0;
        this._shadowNearPlane = 0.1;
        this._shadowStrength = 1.0;
        this._lightWoldMatrix = new Matrix4x4();
        this.runInEditor = true;
        this._intensity = 1.0;
        this._intensityColor = new Vector3();
        this.color = new Color(1.0, 1.0, 1.0, 1.0);
        this._lightmapBakedType = LightMode.realTime;
    }
    get intensity() {
        return this._intensity;
    }
    set intensity(value) {
        this._intensity = value;
    }
    get shadowMode() {
        return this._shadowMode;
    }
    set shadowMode(value) {
        this._shadowMode = value;
    }
    get shadowDistance() {
        return this._shadowDistance;
    }
    set shadowDistance(value) {
        this._shadowDistance = value;
    }
    get shadowResolution() {
        return this._shadowResolution;
    }
    set shadowResolution(value) {
        this._shadowResolution = value;
    }
    get shadowDepthBias() {
        return this._shadowDepthBias;
    }
    set shadowDepthBias(value) {
        this._shadowDepthBias = value;
    }
    get shadowNormalBias() {
        return this._shadowNormalBias;
    }
    set shadowNormalBias(value) {
        this._shadowNormalBias = value;
    }
    get shadowStrength() {
        return this._shadowStrength;
    }
    set shadowStrength(value) {
        this._shadowStrength = value;
    }
    get shadowNearPlane() {
        return this._shadowNearPlane;
    }
    set shadowNearPlane(value) {
        this._shadowNearPlane = value;
    }
    get lightmapBakedType() {
        return this._lightmapBakedType;
    }
    set lightmapBakedType(value) {
        let premode = this._lightmapBakedType;
        if (this._lightmapBakedType !== value) {
            this._lightmapBakedType = value;
            if (this._enabled) {
                if (value == LightMode.bakeOnly)
                    this._removeFromScene();
                else if (premode == LightMode.bakeOnly)
                    this._addToScene();
            }
        }
    }
    get lightWorldMatrix() {
        var position = this.owner.transform.position;
        var quaterian = this.owner.transform.rotation;
        Matrix4x4.createAffineTransformation(position, quaterian, Vector3.ONE, this._lightWoldMatrix);
        return this._lightWoldMatrix;
    }
    get lightType() {
        return this._lightType;
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
    _cloneTo(dest) {
        super._cloneTo(dest);
        var light = dest;
        light.color = this.color.clone();
        light.intensity = this.intensity;
        light.lightmapBakedType = this.lightmapBakedType;
    }
    _addToScene() {
        var scene = this.owner.scene;
        var maxLightCount = Config3D.maxLightCount;
        if (scene._lightCount < maxLightCount) {
            scene._lightCount++;
            this._addToLightQueue();
            this._isAlternate = false;
        }
        else {
            scene._alternateLights.add(this);
            this._isAlternate = true;
            console.warn("LightSprite:light count has large than maxLightCount,the latest added light will be ignore.");
        }
    }
    _removeFromScene() {
        var scene = this.owner._scene;
        if (!scene)
            return;
        if (this._isAlternate) {
            scene._alternateLights.remove(this);
        }
        else {
            scene._lightCount--;
            this._removeFromLightQueue();
            if (scene._alternateLights._length > 0) {
                var alternateLight = scene._alternateLights.shift();
                alternateLight._addToLightQueue();
                alternateLight._isAlternate = false;
                scene._lightCount++;
            }
        }
    }
    _addToLightQueue() {
    }
    _removeFromLightQueue() {
    }
    _onEnable() {
        (this.lightmapBakedType !== LightMode.bakeOnly) && (this._addToScene());
    }
    _onDisable() {
        (this.lightmapBakedType !== LightMode.bakeOnly) && (this._removeFromScene());
    }
    _onDestroy() {
    }
    _create() {
        return new Light();
    }
}

//# sourceMappingURL=Light.js.map
