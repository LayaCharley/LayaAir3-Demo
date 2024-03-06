import { PostProcessEffect } from "laya/d3/core/render/PostProcessEffect";
import { Color } from "laya/maths/Color";
import { Vector2 } from "laya/maths/Vector2";
import { Vector3 } from "laya/maths/Vector3";
import { LightType } from "laya/d3/core/light/Light";
import { Texture2D } from "laya/resource/Texture2D";
import { Vector4 } from "laya/maths/Vector4";
import { LensFlareElementGeomtry } from "./LensFlareGeometry";
import { LensFlareShaderInit } from "./LensFlareShaderInit";
import { LensFlareCMD } from "./LensFlareCMD";
export class LensFlareElement {
    constructor() {
        this._type = "Image";
        this.texture = Texture2D.whiteTexture;
        this._aspectRatio = false;
        this.tint = Color.WHITE;
        this._modulateByLightColor = false;
        this._intensity = 1;
        this.startPosition = 1;
        this._translationScale = new Vector2(1, 1);
    }
}
export class lensFlareData {
    constructor() {
        this.elements = [];
    }
}
export class LensFlareEffect extends PostProcessEffect {
    constructor() {
        super();
        this._flareCMDS = [];
        this._flareCMDS.push(new LensFlareCMD());
        this._center = new Vector2();
        this._tempV3 = new Vector3();
        this._tempV4 = new Vector4();
    }
    static init() {
        LensFlareElementGeomtry.init();
        LensFlareShaderInit.init();
    }
    set LensFlareData(value) {
        this._flareCMDS.length = 0;
        for (let i = 0; i < value.elements.length; i++) {
            var cmd = new LensFlareCMD();
            cmd.lensFlareElement = value.elements[i];
            this._flareCMDS.push(cmd);
        }
    }
    set bindLight(light) {
        this._light = light;
    }
    caculateDirCenter(camera) {
        this._light._direction.cloneTo(this._tempV3);
        Vector3.scale(this._tempV3, -10, this._tempV3);
        Vector3.add(camera.transform.position, this._tempV3, this._tempV3);
        Vector3.transformV3ToV4(this._tempV3, camera.projectionViewMatrix, this._tempV4);
        this._center.setValue(this._tempV4.x / this._tempV4.w, this._tempV4.y / this._tempV4.w);
        var angle = Math.atan2(this._center.x, this._center.y) * 180 / Math.PI;
        angle = (angle < 0) ? angle + 360 : angle;
        angle = Math.round(angle);
        this._rotate = Math.PI * 2.0 - Math.PI / 180 * angle;
    }
    caculatePointCenter(camera) {
    }
    caculateSpotCenter(value) {
    }
    render(context) {
        var cmd = context.command;
        let source = context.indirectTarget;
        cmd.setRenderTarget(source);
        switch (this._light.lightType) {
            case LightType.Directional:
                this.caculateDirCenter(context.camera);
                break;
            case LightType.Point:
                break;
            case LightType.Spot:
                break;
        }
        for (let i = 0; i < this._flareCMDS.length; i++) {
            this._flareCMDS[i].center = this._center;
            this._flareCMDS[i].rotate = this._rotate;
            cmd.addCustomCMD(this._flareCMDS[i]);
        }
        cmd.blitScreenQuad(source, context.destination);
    }
    release(postprocess) {
    }
}

//# sourceMappingURL=LensFlareEffect.js.map
