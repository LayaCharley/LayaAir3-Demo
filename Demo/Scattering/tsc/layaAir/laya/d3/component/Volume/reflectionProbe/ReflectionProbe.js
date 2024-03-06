import { TextureDecodeFormat } from "../../../../RenderEngine/RenderEnum/TextureDecodeFormat";
import { TextureCube } from "../../../../resource/TextureCube";
import { Volume } from "../Volume";
import { VolumeManager } from "../VolumeManager";
import { SphericalHarmonicsL2, SphericalHarmonicsL2Generater } from "../../../graphics/SphericalHarmonicsL2";
import { ShaderDataType } from "../../../../RenderEngine/RenderShader/ShaderData";
import { RenderableSprite3D } from "../../../core/RenderableSprite3D";
import { Sprite3DRenderDeclaration } from "../../../core/render/Sprite3DRenderDeclaration";
import { ILaya3D } from "../../../../../ILaya3D";
import { AmbientMode } from "../../../core/scene/AmbientMode";
import { Color } from "../../../../maths/Color";
import { Vector3 } from "../../../../maths/Vector3";
import { Vector4 } from "../../../../maths/Vector4";
export var ReflectionProbeMode;
(function (ReflectionProbeMode) {
    ReflectionProbeMode[ReflectionProbeMode["off"] = 0] = "off";
    ReflectionProbeMode[ReflectionProbeMode["simple"] = 1] = "simple";
})(ReflectionProbeMode || (ReflectionProbeMode = {}));
export class ReflectionProbe extends Volume {
    constructor() {
        super();
        this._boxProjection = false;
        this._ambientColor = new Color();
        this._ambientMode = AmbientMode.SolidColor;
        this._isScene = false;
        this._reflectionHDRParams = new Vector4();
        this._reflectionDecodeFormat = TextureDecodeFormat.Normal;
        this._ambientSkyColor = new Vector3();
        this._ambientEquatorColor = new Vector3();
        this._ambientGroundColor = new Vector3();
        this._importance = 0;
        this._type = VolumeManager.ReflectionProbeVolumeType;
        this._ambientIntensity = 1.0;
        this._reflectionIntensity = 1.0;
        this.boundsMax = new Vector3(5, 5, 5);
        this.boundsMin = new Vector3(-5, -5, -5);
    }
    get boxProjection() {
        return this._boxProjection;
    }
    set boxProjection(value) {
        if (value != this._boxProjection) {
            this._updateMark = ILaya3D.Scene3D._updateMark;
        }
        this._boxProjection = value;
    }
    get importance() {
        return this._importance;
    }
    set importance(value) {
        this._importance = value;
    }
    get ambientIntensity() {
        return this._ambientIntensity;
    }
    set ambientIntensity(value) {
        if (value == this._ambientIntensity)
            return;
        this._ambientIntensity = value;
        this._updateMark = ILaya3D.Scene3D._updateMark;
    }
    get reflectionIntensity() {
        return this._reflectionIntensity;
    }
    set reflectionIntensity(value) {
        if (value == this._reflectionIntensity)
            return;
        value = Math.max(value, 0.0);
        this._reflectionIntensity = value;
        this._updateMark = ILaya3D.Scene3D._updateMark;
    }
    get bounds() {
        return this._bounds;
    }
    set boundsMax(value) {
        super.boundsMax = value;
        if (this.boxProjection)
            this._updateMark = ILaya3D.Scene3D._updateMark;
    }
    get boundsMax() {
        return this._primitiveBounds.getMax();
    }
    set boundsMin(value) {
        super.boundsMin = value;
        if (this.boxProjection)
            this._updateMark = ILaya3D.Scene3D._updateMark;
    }
    get boundsMin() {
        return this._primitiveBounds.getMin();
    }
    get probePosition() {
        return this.owner.transform.position;
    }
    get ambientColor() {
        return this._ambientColor;
    }
    set ambientColor(value) {
        value && value.cloneTo(this._ambientColor);
        if (this.ambientMode == AmbientMode.SolidColor)
            this._updateMark = ILaya3D.Scene3D._updateMark;
    }
    get ambientSH() {
        return this._ambientSH;
    }
    set ambientSH(value) {
        if (this.ambientMode == AmbientMode.SphericalHarmonics)
            this._updateMark = ILaya3D.Scene3D._updateMark;
        this._ambientSH = value;
    }
    get ambientMode() {
        return this._ambientMode;
    }
    set ambientMode(value) {
        if (value == this.ambientMode)
            return;
        this._ambientMode = value;
        if (!this.ambientSH) {
            if (value == AmbientMode.SphericalHarmonics) {
                this._ambientSphericalHarmonics && this._applySHCoefficients(this._ambientSphericalHarmonics, Math.pow(this._ambientIntensity, 2.2));
            }
            else if (value == AmbientMode.TripleColor) {
                this._ambientTripleColorSphericalHarmonics && this._applySHCoefficients(this._ambientTripleColorSphericalHarmonics, 1.0);
            }
        }
        this._updateMark = ILaya3D.Scene3D._updateMark;
    }
    get iblTex() {
        return this._iblTex;
    }
    set iblTex(value) {
        if (this.iblTex == value)
            return;
        if (this.iblTex)
            this.iblTex._removeReference();
        this._iblTex = value;
        if (value)
            value._addReference();
        this._updateMark = ILaya3D.Scene3D._updateMark;
    }
    get iblTexRGBD() {
        return this._iblTexRGBD;
    }
    set iblTexRGBD(value) {
        if (value == this._iblTexRGBD)
            return;
        this._iblTexRGBD = value;
        this._updateMark = ILaya3D.Scene3D._updateMark;
    }
    applyReflectionShaderData(shaderData) {
        if (!this.boxProjection) {
            shaderData.removeDefine(Sprite3DRenderDeclaration.SHADERDEFINE_SPECCUBE_BOX_PROJECTION);
        }
        else {
            shaderData.addDefine(Sprite3DRenderDeclaration.SHADERDEFINE_SPECCUBE_BOX_PROJECTION);
            shaderData.setShaderData(RenderableSprite3D.REFLECTIONCUBE_PROBEPOSITION, ShaderDataType.Vector3, this.probePosition);
            shaderData.setShaderData(RenderableSprite3D.REFLECTIONCUBE_PROBEBOXMAX, ShaderDataType.Vector3, this._bounds.getMax());
            shaderData.setShaderData(RenderableSprite3D.REFLECTIONCUBE_PROBEBOXMIN, ShaderDataType.Vector3, this._bounds.getMin());
        }
        if (this.ambientMode == AmbientMode.SolidColor) {
            shaderData.removeDefine(Sprite3DRenderDeclaration.SHADERDEFINE_GI_LEGACYIBL);
            shaderData.removeDefine(Sprite3DRenderDeclaration.SHADERDEFINE_GI_IBL);
            shaderData.setColor(RenderableSprite3D.AMBIENTCOLOR, this.ambientColor);
        }
        else if (this.iblTex && this.ambientSH) {
            shaderData.addDefine(Sprite3DRenderDeclaration.SHADERDEFINE_GI_IBL);
            shaderData.removeDefine(Sprite3DRenderDeclaration.SHADERDEFINE_GI_LEGACYIBL);
            if (this.iblTex) {
                shaderData.setTexture(RenderableSprite3D.IBLTEX, this.iblTex);
                shaderData.setNumber(RenderableSprite3D.IBLROUGHNESSLEVEL, this.iblTex.maxMipmapLevel);
            }
            ;
            this.iblTexRGBD ? shaderData.addDefine(Sprite3DRenderDeclaration.SHADERDEFINE_IBL_RGBD) : shaderData.removeDefine(Sprite3DRenderDeclaration.SHADERDEFINE_IBL_RGBD);
            this.ambientSH && shaderData.setBuffer(RenderableSprite3D.AMBIENTSH, this.ambientSH);
        }
        else {
            shaderData.removeDefine(Sprite3DRenderDeclaration.SHADERDEFINE_GI_IBL);
            shaderData.addDefine(Sprite3DRenderDeclaration.SHADERDEFINE_GI_LEGACYIBL);
            if (this._reflectionTexture) {
                shaderData.setShaderData(RenderableSprite3D.REFLECTIONTEXTURE, ShaderDataType.TextureCube, this.reflectionTexture ? this.reflectionTexture : TextureCube.blackTexture);
                shaderData.setShaderData(RenderableSprite3D.REFLECTIONCUBE_HDR_PARAMS, ShaderDataType.Vector4, this.reflectionHDRParams);
            }
            if (this._shCoefficients) {
                shaderData.setVector(RenderableSprite3D.AMBIENTSHAR, this._shCoefficients[0]);
                shaderData.setVector(RenderableSprite3D.AMBIENTSHAG, this._shCoefficients[1]);
                shaderData.setVector(RenderableSprite3D.AMBIENTSHAB, this._shCoefficients[2]);
                shaderData.setVector(RenderableSprite3D.AMBIENTSHBR, this._shCoefficients[3]);
                shaderData.setVector(RenderableSprite3D.AMBIENTSHBG, this._shCoefficients[4]);
                shaderData.setVector(RenderableSprite3D.AMBIENTSHBB, this._shCoefficients[5]);
                shaderData.setVector(RenderableSprite3D.AMBIENTSHC, this._shCoefficients[6]);
            }
        }
        shaderData.setNumber(RenderableSprite3D.AMBIENTINTENSITY, this.ambientIntensity);
        shaderData.setNumber(RenderableSprite3D.REFLECTIONINTENSITY, this.reflectionIntensity);
    }
    _onEnable() {
        super._onEnable();
        this._updateMark = ILaya3D.Scene3D._updateMark;
    }
    _onDisable() {
        super._onDisable();
    }
    _onDestroy() {
    }
    _cloneTo(dest) {
    }
    get reflectionTexture() {
        return this._reflectionTexture;
    }
    set reflectionTexture(value) {
        if (this._reflectionTexture == value)
            return;
        if (this._reflectionTexture)
            this.iblTex._removeReference();
        this._reflectionTexture = value;
        if (value) {
            this._reflectionTexture._addReference();
            this._updateMark = ILaya3D.Scene3D._updateMark;
        }
    }
    get customReflection() {
        return this.reflectionTexture;
    }
    set customReflection(value) {
        this.reflectionTexture = value;
    }
    get reflectionHDRParams() {
        return this._reflectionHDRParams;
    }
    set reflectionHDRParams(value) {
        this._reflectionHDRParams = value;
        this._updateMark = ILaya3D.Scene3D._updateMark;
    }
    get reflectionDecodingFormat() {
        return this._reflectionDecodeFormat;
    }
    set reflectionDecodingFormat(value) {
        if (this._reflectionDecodeFormat != value) {
            this._reflectionDecodeFormat = value;
            if (this._reflectionDecodeFormat == TextureDecodeFormat.RGBM)
                this._reflectionHDRParams.x = 5.0;
            this._updateMark = ILaya3D.Scene3D._updateMark;
        }
    }
    get ambientSphericalHarmonics() {
        return this._ambientSphericalHarmonics;
    }
    set ambientSphericalHarmonics(value) {
        var originalSH = value || SphericalHarmonicsL2._default;
        if (!this._ambientSphericalHarmonics) {
            this._ambientSphericalHarmonics = new SphericalHarmonicsL2();
        }
        if (this._ambientSphericalHarmonics != value) {
            value.cloneTo(this._ambientSphericalHarmonics);
            this._applySHCoefficients(this._ambientSphericalHarmonics, Math.pow(this.ambientIntensity, 2.2));
        }
        if (this.ambientMode == AmbientMode.TripleColor)
            this._applySHCoefficients(originalSH, Math.pow(this.ambientIntensity, 2.2));
        this._updateMark = ILaya3D.Scene3D._updateMark;
    }
    _applySHCoefficients(originalSH, intensity) {
        if (!this._shCoefficients) {
            this._shCoefficients = new Array(7);
            for (var i = 0; i < 7; i++)
                this._shCoefficients[i] = new Vector4();
        }
        var optSH = this._shCoefficients;
        for (var i = 0; i < 3; i++) {
            var shaderSHA = optSH[i];
            var shaderSHB = optSH[i + 3];
            shaderSHA.setValue(originalSH.getCoefficient(i, 3) * intensity, originalSH.getCoefficient(i, 1) * intensity, originalSH.getCoefficient(i, 2) * intensity, (originalSH.getCoefficient(i, 0) - originalSH.getCoefficient(i, 6)) * intensity);
            shaderSHB.setValue(originalSH.getCoefficient(i, 4) * intensity, originalSH.getCoefficient(i, 5) * intensity, originalSH.getCoefficient(i, 6) * 3 * intensity, originalSH.getCoefficient(i, 7) * intensity);
        }
        optSH[6].setValue(originalSH.getCoefficient(0, 8) * intensity, originalSH.getCoefficient(1, 8) * intensity, originalSH.getCoefficient(2, 8) * intensity, 1);
    }
    setGradientAmbient(skyColor, equatorColor, groundColor) {
        this._ambientSkyColor = skyColor;
        this._ambientEquatorColor = equatorColor;
        this._ambientGroundColor = groundColor;
        let gradientSH = SphericalHarmonicsL2Generater.CalGradientSH(this._ambientSkyColor, this._ambientEquatorColor, this._ambientGroundColor, true);
        this._ambientTripleColorSphericalHarmonics = gradientSH;
        if (this.ambientMode == AmbientMode.TripleColor) {
            this._applySHCoefficients(gradientSH, 2.2);
        }
        this._updateMark = ILaya3D.Scene3D._updateMark;
    }
}
ReflectionProbe.TEMPVECTOR3 = new Vector3();
ReflectionProbe.defaultTextureHDRDecodeValues = new Vector4(1.0, 1.0, 0.0, 0.0);

//# sourceMappingURL=ReflectionProbe.js.map
