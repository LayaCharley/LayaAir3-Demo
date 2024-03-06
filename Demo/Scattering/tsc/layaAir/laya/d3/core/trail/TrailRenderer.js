import { BaseRender } from "../render/BaseRender";
import { RenderContext3D } from "../render/RenderContext3D";
import { TrailFilter } from "./TrailFilter";
import { Matrix4x4 } from "../../../maths/Matrix4x4";
export class TrailRenderer extends BaseRender {
    constructor() {
        super();
        this._projectionViewWorldMatrix = new Matrix4x4();
        this._supportOctree = false;
    }
    _getcommonUniformMap() {
        return ["Sprite3D", "TrailRender"];
    }
    _onAdded() {
        this._trailFilter = new TrailFilter(this);
    }
    get time() {
        return this._trailFilter.time;
    }
    set time(value) {
        this._trailFilter.time = value;
    }
    get minVertexDistance() {
        return this._trailFilter.minVertexDistance;
    }
    set minVertexDistance(value) {
        this._trailFilter.minVertexDistance = value;
    }
    get widthMultiplier() {
        return this._trailFilter.widthMultiplier;
    }
    set widthMultiplier(value) {
        this._trailFilter.widthMultiplier = value;
    }
    get widthCurve() {
        return this._trailFilter.widthCurve;
    }
    set widthCurve(value) {
        this._trailFilter.widthCurve = value;
    }
    get colorGradient() {
        return this._trailFilter.colorGradient;
    }
    set colorGradient(value) {
        this._trailFilter.colorGradient = value;
    }
    get textureMode() {
        return this._trailFilter.textureMode;
    }
    set textureMode(value) {
        this._trailFilter.textureMode = value;
    }
    get alignment() {
        return this._trailFilter.alignment;
    }
    set alignment(value) {
        this._trailFilter.alignment = value;
    }
    _onEnable() {
        super._onEnable();
        this.owner._transform.position.cloneTo(this._trailFilter._lastPosition);
    }
    onUpdate() {
        this._calculateBoundingBox();
    }
    get bounds() {
        return this._bounds;
    }
    _calculateBoundingBox() {
        let context = RenderContext3D._instance;
        this.boundsChange = false;
        this._trailFilter._update(context);
    }
    _renderUpdate(state, transform) {
        super._renderUpdate(state, transform);
    }
    clear() {
        this._trailFilter.clear();
    }
    _onDestroy() {
        this._trailFilter.destroy();
        super._onDestroy();
    }
    _cloneTo(dest) {
        super._cloneTo(dest);
        let render = dest;
        render.time = this.time;
        render.minVertexDistance = this.minVertexDistance;
        var widthCurve = [];
        var widthCurveData = this.widthCurve;
        for (let i = 0, n = this.widthCurve.length; i < n; i++) {
            widthCurve.push(widthCurveData[i].clone());
        }
        render.widthCurve = widthCurve;
        render.colorGradient = this.colorGradient.clone();
        render.textureMode = this.textureMode;
        render.alignment = this.alignment;
    }
}

//# sourceMappingURL=TrailRenderer.js.map
