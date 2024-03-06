import { SingletonList } from "../../../utils/SingletonList";
import { Bounds } from "../../math/Bounds";
import { ReflectionProbeManager } from "./reflectionProbe/ReflectionProbeManager";
import { VolumetricGIManager } from "./VolumetricGI/VolumetricGIManager";
export class VolumeManager {
    constructor() {
        this._motionObjects = new SingletonList();
        this._volumeList = new SingletonList();
        this._needUpdateAllRender = false;
        this._regVolumeManager = {};
        this._reflectionProbeManager = new ReflectionProbeManager();
        this._regVolumeManager[VolumeManager.ReflectionProbeVolumeType] = this._reflectionProbeManager;
        this._volumetricGIManager = new VolumetricGIManager();
        this._regVolumeManager[VolumeManager.VolumetricGIType] = this._volumetricGIManager;
    }
    get reflectionProbeManager() {
        return this._reflectionProbeManager;
    }
    get volumetricGIManager() {
        return this._volumetricGIManager;
    }
    add(volume) {
        let reManager = this._regVolumeManager[volume.type];
        if (reManager) {
            reManager.add(volume);
        }
        else {
            this._volumeList.add(volume);
            this._needUpdateAllRender = true;
        }
    }
    remove(volume) {
        let reManager = this._regVolumeManager[volume.type];
        if (reManager) {
            reManager.remove(volume);
        }
        else {
            this._volumeList.remove(volume);
            this._needUpdateAllRender = true;
        }
    }
    addMotionObject(renderObj) {
        this._motionObjects.add(renderObj);
    }
    removeMotionObject(renderObj) {
        this._motionObjects.remove(renderObj);
    }
    _updateRenderObject(baseRender) {
        let elements = this._volumeList.elements;
        let renderBounds = baseRender.bounds;
        let center = renderBounds.getCenter();
        let mainVolume;
        for (var i = 0, n = this._volumeList.length; i < n; i++) {
            let volume = elements[i];
            let bounds = volume.bounds;
            if (Bounds.containPoint(bounds, center)) {
                mainVolume = volume;
                continue;
            }
        }
        baseRender.volume = mainVolume;
    }
    handleMotionlist() {
        var elements = this._motionObjects.elements;
        for (var i = 0, n = this._motionObjects.length; i < n; i++) {
            this._updateRenderObject(elements[i]);
        }
        this.reflectionProbeManager.handleMotionlist(this._motionObjects);
        this.volumetricGIManager.handleMotionlist(this._motionObjects);
        this.clearMotionObjects();
    }
    reCaculateAllRenderObjects(baseRenders) {
        if (this._needUpdateAllRender) {
            var elements = baseRenders.elements;
            for (var i = 0, n = baseRenders.length; i < n; i++) {
                this._updateRenderObject(elements[i]);
            }
            this._needUpdateAllRender = false;
        }
        else {
            this.handleMotionlist();
        }
        if (this.reflectionProbeManager._needUpdateAllRender) {
            this.reflectionProbeManager.reCaculateAllRenderObjects(baseRenders);
        }
        else {
            this.reflectionProbeManager.handleMotionlist(this._motionObjects);
        }
        if (this.volumetricGIManager._needUpdateAllRender) {
            this.volumetricGIManager.reCaculateAllRenderObjects(baseRenders);
        }
        else {
            this.volumetricGIManager.handleMotionlist(this._motionObjects);
        }
    }
    needreCaculateAllRenderObjects() {
        return this._needUpdateAllRender || this.reflectionProbeManager._needUpdateAllRender || this.volumetricGIManager._needUpdateAllRender;
    }
    clearMotionObjects() {
        this._motionObjects.length = 0;
    }
    destroy() {
    }
}
VolumeManager.ReflectionProbeVolumeType = 1;
VolumeManager.VolumetricGIType = 2;

//# sourceMappingURL=VolumeManager.js.map
