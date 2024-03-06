import { SingletonList } from "../../../../utils/SingletonList";
import { Sprite3DRenderDeclaration } from "../../../core/render/Sprite3DRenderDeclaration";
export class VolumetricGIManager {
    constructor() {
        this._GIVolumes = new SingletonList();
        this._needUpdateAllRender = true;
    }
    removeVolumetricGI(renderer) {
        let shaderData = renderer._shaderValues;
        shaderData.removeDefine(Sprite3DRenderDeclaration.SHADERDEFINE_VOLUMETRICGI);
    }
    add(volume) {
        this._GIVolumes.add(volume);
        this._needUpdateAllRender = true;
    }
    remove(volume) {
        this._GIVolumes.remove(volume);
        this._needUpdateAllRender = true;
    }
    _updateRenderObject(renderer) {
        if (this._GIVolumes.length == 0) {
            this.removeVolumetricGI(renderer);
            return;
        }
        let renderBounds = renderer.bounds;
        let maxOverlap = 0, overlap = 0;
        let currentVolume;
        let volumes = this._GIVolumes.elements;
        for (let index = 0; index < this._GIVolumes.length; index++) {
            let volume = volumes[index];
            if (!currentVolume) {
                overlap = renderBounds.calculateBoundsintersection(volume.bounds);
                if (overlap < maxOverlap)
                    continue;
            }
            else {
                if (currentVolume.importance > volume.importance)
                    continue;
                overlap = renderBounds.calculateBoundsintersection(volume.bounds);
                if (overlap < maxOverlap && currentVolume.importance == volume.importance)
                    continue;
            }
            currentVolume = volume;
            maxOverlap = overlap;
        }
        if (currentVolume) {
            currentVolume.applyVolumetricGI(renderer._shaderValues);
        }
        else {
            this.removeVolumetricGI(renderer);
        }
    }
    handleMotionlist(motionObjects) {
        for (let index = 0; index < motionObjects.length; index++) {
            let render = motionObjects.elements[index];
            if (true) {
                this._updateRenderObject(render);
            }
        }
        this._needUpdateAllRender = false;
    }
    reCaculateAllRenderObjects(renders) {
        for (let index = 0; index < renders.length; index++) {
            let render = renders.elements[index];
            if (true) {
                this._updateRenderObject(render);
            }
        }
        this._needUpdateAllRender = false;
    }
    destroy() {
    }
}

//# sourceMappingURL=VolumetricGIManager.js.map
