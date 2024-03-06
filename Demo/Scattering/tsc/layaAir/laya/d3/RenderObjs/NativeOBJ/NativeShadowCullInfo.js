import { NativeMemory } from "../../../RenderEngine/RenderEngine/NativeGLEngine/CommonMemory/NativeMemory";
export class NativeShadowCullInfo {
    constructor() {
        this.nativeMemory = new NativeMemory(NativeShadowCullInfo.MemoryBlock_size, true);
        this.float64Array = this.nativeMemory.float64Array;
        this._nativeObj = new window.conchShadowCullInfo(this.nativeMemory._buffer);
    }
    set cullPlanes(cullPlanes) {
        this._cullPlanes = cullPlanes;
        this._nativeObj.clearCullPlanes();
        cullPlanes.forEach((element) => {
            this.float64Array[0] = element.normal.x;
            this.float64Array[1] = element.normal.y;
            this.float64Array[2] = element.normal.z;
            this.float64Array[3] = element.distance;
            this._nativeObj.addCullPlane();
        });
    }
    get cullPlanes() {
        return this._cullPlanes;
    }
    set cullSphere(cullSphere) {
        this._cullSphere = cullSphere;
        this.float64Array[0] = cullSphere.center.x;
        this.float64Array[1] = cullSphere.center.y;
        this.float64Array[2] = cullSphere.center.z;
        this.float64Array[3] = cullSphere.radius;
        this._nativeObj.setCullSphere();
    }
    get cullSphere() {
        return this._cullSphere;
    }
    set position(position) {
        this._position = position;
        this.float64Array[0] = position.x;
        this.float64Array[1] = position.y;
        this.float64Array[2] = position.z;
        this._nativeObj.setPosition();
    }
    get position() {
        return this._position;
    }
    set direction(direction) {
        this._direction = direction;
        this.float64Array[0] = direction.x;
        this.float64Array[1] = direction.y;
        this.float64Array[2] = direction.z;
        this._nativeObj.setDirection();
    }
    get direction() {
        return this._direction;
    }
    set cullPlaneCount(cullPlaneCount) {
        this._cullPlaneCount = cullPlaneCount;
        this._nativeObj.cullPlaneCount = cullPlaneCount;
    }
    get cullPlaneCount() {
        return this._cullPlaneCount;
    }
}
NativeShadowCullInfo.MemoryBlock_size = 4 * 8;

//# sourceMappingURL=NativeShadowCullInfo.js.map
