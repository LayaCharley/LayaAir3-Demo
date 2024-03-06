import { Physics3DUtils } from "../../utils/Physics3DUtils";
import { BaseRender } from "../render/BaseRender";
import { ShurikenParticleSystem } from "./ShurikenParticleSystem";
import { ShuriKenParticle3DShaderDeclaration } from "./ShuriKenParticle3DShaderDeclaration";
import { LayaGL } from "../../../layagl/LayaGL";
import { ShurikenParticleInstanceSystem } from "./ShurikenParticleInstanceSystem";
import { RenderElement } from "../render/RenderElement";
import { ShurikenParticleMaterial } from "./ShurikenParticleMaterial";
import { RenderCapable } from "../../../RenderEngine/RenderEnum/RenderCapable";
import { ShaderDataType } from "../../../RenderEngine/RenderShader/ShaderData";
import { Stat } from "../../../utils/Stat";
import { LayaEnv } from "../../../../LayaEnv";
import { Vector2 } from "../../../maths/Vector2";
import { Vector3 } from "../../../maths/Vector3";
export class ShurikenParticleRenderer extends BaseRender {
    constructor() {
        super();
        this._finalGravity = new Vector3();
        this._dragConstant = new Vector2();
        this._mesh = null;
        this.stretchedBillboardCameraSpeedScale = 0;
        this.stretchedBillboardSpeedScale = 0;
        this.stretchedBillboardLengthScale = 2;
        this.renderMode = 0;
        this._supportOctree = false;
    }
    get particleSystem() {
        return this._particleSystem;
    }
    get renderMode() {
        return this._renderMode;
    }
    set renderMode(value) {
        if (this._renderMode !== value) {
            var defineDatas = this._shaderValues;
            switch (this._renderMode) {
                case 0:
                    defineDatas.removeDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RENDERMODE_BILLBOARD);
                    break;
                case 1:
                    defineDatas.removeDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RENDERMODE_STRETCHEDBILLBOARD);
                    break;
                case 2:
                    defineDatas.removeDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RENDERMODE_HORIZONTALBILLBOARD);
                    break;
                case 3:
                    defineDatas.removeDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RENDERMODE_VERTICALBILLBOARD);
                    break;
                case 4:
                    defineDatas.removeDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RENDERMODE_MESH);
                    break;
            }
            this._renderMode = value;
            switch (value) {
                case 0:
                    defineDatas.addDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RENDERMODE_BILLBOARD);
                    break;
                case 1:
                    defineDatas.addDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RENDERMODE_STRETCHEDBILLBOARD);
                    break;
                case 2:
                    defineDatas.addDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RENDERMODE_HORIZONTALBILLBOARD);
                    break;
                case 3:
                    defineDatas.addDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RENDERMODE_VERTICALBILLBOARD);
                    break;
                case 4:
                    defineDatas.addDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RENDERMODE_MESH);
                    break;
                default:
                    throw new Error("ShurikenParticleRender: unknown renderMode Value.");
            }
            var parSys = this._particleSystem;
            (parSys) && (parSys._initBufferDatas());
        }
    }
    get mesh() {
        return this._mesh;
    }
    set mesh(value) {
        if (this._mesh !== value) {
            (this._mesh) && (this._mesh._removeReference());
            this._mesh = value;
            (value) && (value._addReference());
            this._particleSystem._initBufferDatas();
        }
    }
    _getcommonUniformMap() {
        return ["Sprite3D", "ShurikenSprite3D"];
    }
    _onAdded() {
        super._onAdded();
        if (!LayaGL.renderEngine.getCapable(RenderCapable.DrawElement_Instance)) {
            this._particleSystem = new ShurikenParticleSystem(this);
        }
        else
            this._particleSystem = new ShurikenParticleInstanceSystem(this);
        var elements = this._renderElements;
        var element = elements[0] = new RenderElement();
        element.setTransform(this.owner._transform);
        element.render = this;
        element.setGeometry(this._particleSystem);
        element.material = ShurikenParticleMaterial.defaultMaterial;
    }
    _onEnable() {
        super._onEnable();
        Stat.particleRenderNode++;
        (this._particleSystem.playOnAwake && LayaEnv.isPlaying) && (this._particleSystem.play());
    }
    _onDisable() {
        super._onDisable();
        Stat.particleRenderNode--;
        (this._particleSystem.isAlive) && (this._particleSystem.simulate(0, true));
    }
    _calculateBoundingBox() {
        var particleSystem = this._particleSystem;
        var bounds;
        if (particleSystem._useCustomBounds) {
            bounds = particleSystem.customBounds;
            bounds._tranform(this.owner.transform.worldMatrix, this._bounds);
        }
        else if (particleSystem._simulationSupported()) {
            particleSystem._generateBounds();
            bounds = particleSystem._bounds;
            bounds._tranform(this.owner.transform.worldMatrix, this._bounds);
            if (particleSystem.gravityModifier != 0) {
                var max = this._bounds.getMax();
                var min = this._bounds.getMin();
                var gravityOffset = particleSystem._gravityOffset;
                max.y -= gravityOffset.x;
                min.y -= gravityOffset.y;
                this._bounds.setMax(max);
                this._bounds.setMin(min);
            }
        }
        else {
            var min = this._bounds.getMin();
            min.setValue(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
            this._bounds.setMin(min);
            var max = this._bounds.getMax();
            max.setValue(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
            this._bounds.setMax(max);
        }
    }
    _needRender(boundFrustum, context) {
        if (!Stat.enableParticle)
            return false;
        if (boundFrustum) {
            if (boundFrustum.intersects(this.bounds)) {
                if (this._particleSystem.isAlive)
                    return true;
                else
                    return false;
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    }
    _renderUpdate(context, transfrom) {
        var particleSystem = this._particleSystem;
        var sv = this._shaderValues;
        var transform = this.owner.transform;
        switch (particleSystem.simulationSpace) {
            case 0:
                break;
            case 1:
                sv.setVector3(ShuriKenParticle3DShaderDeclaration.WORLDPOSITION, transform.position);
                sv.setShaderData(ShuriKenParticle3DShaderDeclaration.WORLDROTATION, ShaderDataType.Vector4, transform.rotation);
                break;
            default:
                throw new Error("ShurikenParticleMaterial: SimulationSpace value is invalid.");
        }
        switch (particleSystem.scaleMode) {
            case 0:
                var scale = transform.getWorldLossyScale();
                sv.setVector3(ShuriKenParticle3DShaderDeclaration.POSITIONSCALE, scale);
                sv.setVector3(ShuriKenParticle3DShaderDeclaration.SIZESCALE, scale);
                break;
            case 1:
                var localScale = transform.localScale;
                sv.setVector3(ShuriKenParticle3DShaderDeclaration.POSITIONSCALE, localScale);
                sv.setVector3(ShuriKenParticle3DShaderDeclaration.SIZESCALE, localScale);
                break;
            case 2:
                sv.setVector3(ShuriKenParticle3DShaderDeclaration.POSITIONSCALE, transform.getWorldLossyScale());
                sv.setVector3(ShuriKenParticle3DShaderDeclaration.SIZESCALE, Vector3.ONE);
                break;
        }
        switch (particleSystem.dragType) {
            case 0:
                this._dragConstant.setValue(particleSystem.dragSpeedConstantMin, particleSystem.dragSpeedConstantMin);
                sv.setVector2(ShuriKenParticle3DShaderDeclaration.DRAG, this._dragConstant);
                break;
            case 2:
                this._dragConstant.setValue(particleSystem.dragSpeedConstantMin, particleSystem.dragSpeedConstantMax);
                sv.setVector2(ShuriKenParticle3DShaderDeclaration.DRAG, this._dragConstant);
                break;
            default:
                this._dragConstant.setValue(0, 0);
                break;
        }
        Vector3.scale(Physics3DUtils.gravity, particleSystem.gravityModifier, this._finalGravity);
        sv.setVector3(ShuriKenParticle3DShaderDeclaration.GRAVITY, this._finalGravity);
        sv.setInt(ShuriKenParticle3DShaderDeclaration.SIMULATIONSPACE, particleSystem.simulationSpace);
        sv.setBool(ShuriKenParticle3DShaderDeclaration.THREEDSTARTROTATION, particleSystem.threeDStartRotation);
        sv.setInt(ShuriKenParticle3DShaderDeclaration.SCALINGMODE, particleSystem.scaleMode);
        sv.setNumber(ShuriKenParticle3DShaderDeclaration.STRETCHEDBILLBOARDLENGTHSCALE, this.stretchedBillboardLengthScale);
        sv.setNumber(ShuriKenParticle3DShaderDeclaration.STRETCHEDBILLBOARDSPEEDSCALE, this.stretchedBillboardSpeedScale);
        sv.setNumber(ShuriKenParticle3DShaderDeclaration.CURRENTTIME, particleSystem._currentTime);
    }
    get bounds() {
        if (this.boundsChange) {
            this._calculateBoundingBox();
            this.boundsChange = false;
        }
        return this._bounds;
    }
    _cloneTo(dest) {
        let parRender = dest;
        this._particleSystem.cloneTo(parRender._particleSystem);
        parRender.sharedMaterial = this.sharedMaterial;
        parRender.renderMode = this.renderMode;
        parRender.mesh = this.mesh;
        parRender.stretchedBillboardCameraSpeedScale = this.stretchedBillboardCameraSpeedScale;
        parRender.stretchedBillboardSpeedScale = this.stretchedBillboardSpeedScale;
        parRender.stretchedBillboardLengthScale = this.stretchedBillboardLengthScale;
        parRender.sortingFudge = this.sortingFudge;
    }
    _onDestroy() {
        (this._mesh) && (this._mesh._removeReference(), this._mesh = null);
        this._particleSystem.destroy();
        this._particleSystem = null;
        super._onDestroy();
    }
}

//# sourceMappingURL=ShurikenParticleRenderer.js.map
