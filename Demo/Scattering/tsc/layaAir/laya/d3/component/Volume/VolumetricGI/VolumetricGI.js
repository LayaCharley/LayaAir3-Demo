import { Vector3 } from "../../../../maths/Vector3";
import { Vector4 } from "../../../../maths/Vector4";
import { Sprite3DRenderDeclaration } from "../../../core/render/Sprite3DRenderDeclaration";
import { RenderableSprite3D } from "../../../core/RenderableSprite3D";
import { Volume } from "../Volume";
import { VolumeManager } from "../VolumeManager";
export class VolumetricGI extends Volume {
    constructor() {
        super();
        this._type = VolumeManager.VolumetricGIType;
        this.probeCounts = new Vector3();
        this.probeStep = new Vector3();
        this._params = new Vector4(8, 16, 0, 0);
    }
    get irradiance() {
        return this._irradiance;
    }
    set irradiance(value) {
        if (this._irradiance == value)
            return;
        this._irradiance && (this.irradiance._removeReference());
        value && (value._addReference());
        this._irradiance = value;
    }
    get distance() {
        return this._distance;
    }
    set distance(value) {
        if (this._distance == value)
            return;
        this._distance && (this._distance._removeReference());
        value && (value._addReference());
        this._distance = value;
    }
    get normalBias() {
        return this._params.z;
    }
    set normalBias(value) {
        this._params.z = value;
    }
    get viewBias() {
        return this._params.w;
    }
    set viewBias(value) {
        this._params.w = value;
    }
    get irradianceTexel() {
        return this._params.x;
    }
    get distanceTexel() {
        return this._params.y;
    }
    applyVolumetricGI(shaderData) {
        shaderData.addDefine(Sprite3DRenderDeclaration.SHADERDEFINE_VOLUMETRICGI);
        shaderData.setVector3(RenderableSprite3D.VOLUMETRICGI_PROBECOUNTS, this.probeCounts);
        shaderData.setVector3(RenderableSprite3D.VOLUMETRICGI_PROBESTEPS, this.probeStep);
        shaderData.setVector3(RenderableSprite3D.VOLUMETRICGI_PROBESTARTPOS, this.bounds.getMin());
        shaderData.setVector(RenderableSprite3D.VOLUMETRICGI_PROBEPARAMS, this._params);
        shaderData.setTexture(RenderableSprite3D.VOLUMETRICGI_IRRADIANCE, this.irradiance);
        shaderData.setTexture(RenderableSprite3D.VOLUMETRICGI_DISTANCE, this.distance);
    }
    _onDestroy() {
        this.irradiance = null;
        this.distance = null;
    }
    _cloneTo(dest) {
        dest.irradiance = this.irradiance;
        dest.distance = this.distance;
        this.probeCounts.cloneTo(dest.probeCounts);
        this.probeStep.cloneTo(dest.probeStep);
        dest.normalBias = this.normalBias;
        dest.viewBias = this.viewBias;
    }
}

//# sourceMappingURL=VolumetricGI.js.map
