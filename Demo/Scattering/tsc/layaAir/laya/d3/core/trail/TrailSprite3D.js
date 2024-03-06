import { TrailRenderer } from "./TrailRenderer";
import { FloatKeyframe } from "../FloatKeyframe";
import { Gradient } from "../Gradient";
import { RenderableSprite3D } from "../RenderableSprite3D";
import { Loader } from "../../../net/Loader";
import { Sprite3D } from "../Sprite3D";
import { Color } from "../../../maths/Color";
export class TrailSprite3D extends RenderableSprite3D {
    constructor(name = null) {
        super(name);
        this._render = this.addComponent(TrailRenderer);
        this._geometryFilter = this._render._trailFilter;
    }
    static __init__() { }
    get trailFilter() {
        return this._geometryFilter;
    }
    get trailRenderer() {
        return this._render;
    }
    _parse(data, spriteMap) {
        super._parse(data, spriteMap);
        var render = this._render;
        var filter = this._geometryFilter;
        var i, j;
        var materials = data.materials;
        if (materials) {
            var sharedMaterials = render.sharedMaterials;
            var materialCount = materials.length;
            sharedMaterials.length = materialCount;
            for (i = 0; i < materialCount; i++)
                sharedMaterials[i] = Loader.getRes(materials[i].path);
            render.sharedMaterials = sharedMaterials;
        }
        filter.time = data.time;
        filter.minVertexDistance = data.minVertexDistance;
        filter.widthMultiplier = data.widthMultiplier;
        filter.textureMode = data.textureMode;
        (data.alignment != null) && (filter.alignment = data.alignment);
        var widthCurve = [];
        var widthCurveData = data.widthCurve;
        for (i = 0, j = widthCurveData.length; i < j; i++) {
            var trailkeyframe = new FloatKeyframe();
            trailkeyframe.time = widthCurveData[i].time;
            trailkeyframe.inTangent = widthCurveData[i].inTangent;
            trailkeyframe.outTangent = widthCurveData[i].outTangent;
            trailkeyframe.value = widthCurveData[i].value;
            widthCurve.push(trailkeyframe);
        }
        filter.widthCurve = widthCurve;
        var colorGradientData = data.colorGradient;
        var colorKeys = colorGradientData.colorKeys;
        var alphaKeys = colorGradientData.alphaKeys;
        var colorGradient = new Gradient(colorKeys.length, alphaKeys.length);
        colorGradient.mode = colorGradientData.mode;
        for (i = 0, j = colorKeys.length; i < j; i++) {
            var colorKey = colorKeys[i];
            colorGradient.addColorRGB(colorKey.time, new Color(colorKey.value[0], colorKey.value[1], colorKey.value[2], 1.0));
        }
        for (i = 0, j = alphaKeys.length; i < j; i++) {
            var alphaKey = alphaKeys[i];
            colorGradient.addColorAlpha(alphaKey.time, alphaKey.value);
        }
        filter.colorGradient = colorGradient;
    }
    _cloneTo(destObject, srcSprite, dstSprite) {
        super._cloneTo(destObject, srcSprite, dstSprite);
    }
    clear() {
        this._render.clear();
    }
    _create() {
        return new Sprite3D();
    }
}

//# sourceMappingURL=TrailSprite3D.js.map
