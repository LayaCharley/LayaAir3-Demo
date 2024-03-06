import { SingletonList } from "../../../../utils/SingletonList";
import { ReflectionProbe } from "./ReflectionProbe";
export class ReflectionProbeManager {
    constructor() {
        this._reflectionProbes = new SingletonList();
        this._needUpdateAllRender = false;
        this._sceneReflectionProbe = new ReflectionProbe();
        this._sceneReflectionProbe.boxProjection = false;
        this._sceneReflectionProbe._isScene = true;
    }
    set sceneReflectionProbe(value) {
        this._sceneReflectionProbe = value;
        this._needUpdateAllRender = true;
    }
    get sceneReflectionProbe() {
        return this._sceneReflectionProbe;
    }
    _updateRenderObject(baseRender) {
        if (this._reflectionProbes.length == 0) {
            baseRender.probReflection = this._sceneReflectionProbe;
            return;
        }
        var elements = this._reflectionProbes.elements;
        var maxOverlap = 0;
        var mainProbe;
        var renderBounds = baseRender.bounds;
        var overlop;
        for (var i = 0, n = this._reflectionProbes.length; i < n; i++) {
            var renflectProbe = elements[i];
            if (!mainProbe) {
                overlop = renderBounds.calculateBoundsintersection(renflectProbe.bounds);
                if (overlop < maxOverlap)
                    continue;
            }
            else {
                if (mainProbe.importance > renflectProbe.importance)
                    continue;
                overlop = renderBounds.calculateBoundsintersection(renflectProbe.bounds);
                if (overlop < maxOverlap && mainProbe.importance == renflectProbe.importance)
                    continue;
            }
            mainProbe = renflectProbe;
            maxOverlap = overlop;
        }
        if (!mainProbe && this._sceneReflectionProbe)
            mainProbe = this._sceneReflectionProbe;
        baseRender.probReflection = mainProbe;
    }
    add(volume) {
        this._reflectionProbes.add(volume);
        this._needUpdateAllRender = true;
    }
    remove(volume) {
        this._reflectionProbes.remove(volume);
        this._needUpdateAllRender = true;
    }
    handleMotionlist(motionObjects) {
        var elements = motionObjects.elements;
        let render;
        for (var i = 0, n = motionObjects.length; i < n; i++) {
            render = elements[i];
            if (render._surportReflectionProbe && render._reflectionMode == 1) {
                this._updateRenderObject(elements[i]);
            }
        }
    }
    reCaculateAllRenderObjects(baseRenders) {
        var elements = baseRenders.elements;
        let render;
        for (var i = 0, n = baseRenders.length; i < n; i++) {
            render = elements[i];
            if (render._surportReflectionProbe && render._reflectionMode == 1) {
                this._updateRenderObject(render);
            }
            this._needUpdateAllRender = false;
        }
    }
    destroy() {
        for (let index = 0; index < this._reflectionProbes.length; index++) {
            let probe = this._reflectionProbes.elements[index];
            probe.destroy();
        }
        this._reflectionProbes.length = 0;
        this._sceneReflectionProbe.destroy();
        this._sceneReflectionProbe = null;
    }
}

//# sourceMappingURL=ReflectionProbeManager.js.map
