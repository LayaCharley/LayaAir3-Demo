import { FloatKeyframe } from "../FloatKeyframe";
import { Gradient } from "../Gradient";
import { GradientMode } from "../GradientMode";
import { RenderElement } from "../render/RenderElement";
import { TrailGeometry } from "./TrailGeometry";
import { TrailMaterial } from "./TrailMaterial";
import { Shader3D } from "../../../RenderEngine/RenderShader/Shader3D";
import { LayaGL } from "../../../layagl/LayaGL";
import { TrailAlignment } from "./TrailAlignment";
import { TrailTextureMode } from "../TrailTextureMode";
import { Color } from "../../../maths/Color";
import { Vector3 } from "../../../maths/Vector3";
import { ShaderDataType } from "../../../RenderEngine/RenderShader/ShaderData";
export class TrailFilter {
    constructor(owner) {
        this._textureMode = TrailTextureMode.Stretch;
        this._totalLength = 0;
        this._lastPosition = new Vector3();
        this._curtime = 0;
        this.alignment = TrailAlignment.View;
        this._ownerRender = owner;
        this._initDefaultData();
        this.addRenderElement();
    }
    static __init__() {
        TrailFilter.CURTIME = Shader3D.propertyNameToID("u_CurTime");
        TrailFilter.LIFETIME = Shader3D.propertyNameToID("u_LifeTime");
        TrailFilter.WIDTHCURVE = Shader3D.propertyNameToID("u_WidthCurve");
        TrailFilter.WIDTHCURVEKEYLENGTH = Shader3D.propertyNameToID("u_WidthCurveKeyLength");
        const spriteParms = LayaGL.renderOBJCreate.createGlobalUniformMap("TrailRender");
        spriteParms.addShaderUniform(TrailFilter.CURTIME, "u_CurTime", ShaderDataType.Float);
        spriteParms.addShaderUniform(TrailFilter.LIFETIME, "u_LifeTime", ShaderDataType.Float);
        spriteParms.addShaderUniform(TrailFilter.WIDTHCURVE, "u_WidthCurve", ShaderDataType.Buffer);
        spriteParms.addShaderUniform(TrailFilter.WIDTHCURVEKEYLENGTH, "u_WidthCurveKeyLength", ShaderDataType.Int);
    }
    get time() {
        return this._time;
    }
    set time(value) {
        this._time = value;
        this._ownerRender._shaderValues.setNumber(TrailFilter.LIFETIME, value);
    }
    get minVertexDistance() {
        return this._minVertexDistance;
    }
    set minVertexDistance(value) {
        this._minVertexDistance = value;
    }
    get widthMultiplier() {
        return this._widthMultiplier;
    }
    set widthMultiplier(value) {
        this._widthMultiplier = value;
    }
    get widthCurve() {
        return this._widthCurve;
    }
    set widthCurve(value) {
        this._widthCurve = value;
        var widthCurveFloatArray = new Float32Array(value.length * 4);
        var i, j, index = 0;
        for (i = 0, j = value.length; i < j; i++) {
            widthCurveFloatArray[index++] = value[i].time;
            widthCurveFloatArray[index++] = value[i].inTangent;
            widthCurveFloatArray[index++] = value[i].outTangent;
            widthCurveFloatArray[index++] = value[i].value;
        }
        this._ownerRender._shaderValues.setBuffer(TrailFilter.WIDTHCURVE, widthCurveFloatArray);
        this._ownerRender._shaderValues.setInt(TrailFilter.WIDTHCURVEKEYLENGTH, value.length);
    }
    get colorGradient() {
        return this._colorGradient;
    }
    set colorGradient(value) {
        this._colorGradient = value;
    }
    get textureMode() {
        return this._textureMode;
    }
    set textureMode(value) {
        this._textureMode = value;
    }
    addRenderElement() {
        var render = this._ownerRender;
        var elements = render._renderElements;
        var material = render.sharedMaterials[0];
        (material) || (material = TrailMaterial.defaultMaterial);
        var element = new RenderElement();
        element.setTransform(this._ownerRender.owner._transform);
        element.render = render;
        element.material = material;
        this._trialGeometry = new TrailGeometry(this);
        element.setGeometry(this._trialGeometry);
        elements.push(element);
    }
    _update(state) {
        var render = this._ownerRender;
        const scene = this._ownerRender.owner.scene;
        if (!scene)
            return;
        this._curtime += scene.timer._delta / 1000;
        render._shaderValues.setNumber(TrailFilter.CURTIME, this._curtime);
        var curPos = this._ownerRender.owner.transform.position;
        var element = render._renderElements[0]._geometry;
        element._updateDisappear();
        element._updateTrail(state.camera, this._lastPosition, curPos);
        element._updateVertexBufferUV();
        curPos.cloneTo(this._lastPosition);
    }
    _initDefaultData() {
        this.time = 5.0;
        this.minVertexDistance = 0.1;
        this.widthMultiplier = 1;
        this.textureMode = TrailTextureMode.Stretch;
        var widthKeyFrames = [];
        var widthKeyFrame1 = new FloatKeyframe();
        widthKeyFrame1.time = 0;
        widthKeyFrame1.inTangent = 0;
        widthKeyFrame1.outTangent = 0;
        widthKeyFrame1.value = 1;
        widthKeyFrames.push(widthKeyFrame1);
        var widthKeyFrame2 = new FloatKeyframe();
        widthKeyFrame2.time = 1;
        widthKeyFrame2.inTangent = 0;
        widthKeyFrame2.outTangent = 0;
        widthKeyFrame2.value = 1;
        widthKeyFrames.push(widthKeyFrame2);
        this.widthCurve = widthKeyFrames;
        var gradient = new Gradient(2, 2);
        gradient.mode = GradientMode.Blend;
        gradient.addColorRGB(0, Color.WHITE);
        gradient.addColorRGB(1, Color.WHITE);
        gradient.addColorAlpha(0, 1);
        gradient.addColorAlpha(1, 1);
        this.colorGradient = gradient;
    }
    destroy() {
        this._trialGeometry.destroy();
        this._trialGeometry = null;
        this._widthCurve = null;
        this._colorGradient = null;
    }
    clear() {
        this._trialGeometry.clear();
        this._lastPosition.setValue(0, 0, 0);
        this._curtime = 0;
        this._totalLength = 0;
    }
}

//# sourceMappingURL=TrailFilter.js.map
