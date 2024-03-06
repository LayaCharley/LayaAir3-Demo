import { Component } from "../../../components/Component";
import { Vector3 } from "../../../maths/Vector3";
import { Camera } from "../../core/Camera";
import { HLODRender } from "./HLODRender";
const tempVec = new Vector3();
export class HLOD extends Component {
    constructor() {
        super();
        this._singleton = true;
    }
    get bounds() {
        return this._bounds;
    }
    set bounds(value) {
        this._bounds = value;
        this.recalculateBounds();
    }
    get lodResource() {
        return this._resourceList;
    }
    set lodResource(value) {
        this._resourceList = value;
    }
    set lodCullRateArray(value) {
        value.sort((a, b) => b - a);
        this._lodRateArray = value;
    }
    get lodCullRateArray() {
        return this._lodRateArray;
    }
    _applyLODResource(resource) {
        this._curLODSource = resource;
        let element = resource.resources;
        for (let i = 0, n = element.length; i < n; i++) {
            let hlodRender = this.owner.addComponent(HLODRender);
            this._curRender.push(hlodRender);
            hlodRender.curHLODRS = element[i];
        }
    }
    _releaseGroupRender() {
        this._curRender.forEach(element => {
            element.destroy();
        });
        this._curRender = [];
    }
    recalculateBounds() {
        let extend = this._bounds.getExtent();
        this._size = 2 * Math.max(extend.x, extend.y, extend.z);
    }
    onPreRender() {
        let checkCamera = this.owner.scene.cullInfoCamera;
        let maxYDistance = checkCamera.maxlocalYDistance;
        let cameraFrustum = checkCamera.boundFrustum;
        Vector3.subtract(this.owner.transform.position, checkCamera.transform.position, tempVec);
        let length = tempVec.length();
        if (length > checkCamera.farPlane || cameraFrustum.containsPoint(this.owner.transform.position) == 0) {
            return;
        }
        let rateYDistance = length / checkCamera.farPlane * maxYDistance;
        let rate = (this._size / rateYDistance);
        for (let i = 0; i < this._lodRateArray.length; i++) {
            if (rate < this._lodRateArray[i])
                continue;
            this.applyResource(this._resourceList[i]);
            break;
        }
    }
    onUpdate() {
        this._curLODSource.updateMark = Camera._updateMark;
    }
    applyResource(resource) {
        if (resource == this._curLODSource)
            return;
        if (resource.loaded) {
            if (this._curLODSource) {
                this._releaseGroupRender();
                this._applyLODResource(resource);
            }
        }
        else {
            resource.load(this.applyResource, this);
        }
    }
    onEnable() {
        super.onEnable();
    }
    onDisable() {
        super.onDisable();
    }
    onDestroy() {
        super.onDestroy();
    }
    _cloneTo(dest) {
        throw "cant clone HLOD";
    }
}

//# sourceMappingURL=HLOD.js.map
