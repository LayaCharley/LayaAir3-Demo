import { NativeMemory } from "../../../RenderEngine/RenderEngine/NativeGLEngine/CommonMemory/NativeMemory";
export class NativeCameraCullInfo {
    constructor() {
        this.nativeMemory = new NativeMemory(NativeCameraCullInfo.MemoryBlock_size, true);
        this.float64Array = this.nativeMemory.float64Array;
        this._nativeObj = new window.conchCameraCullInfo(this.nativeMemory._buffer);
    }
    set position(position) {
        this._position = position;
        this._nativeObj.setPosition(position.x, position.y, position.z);
    }
    get position() {
        return this._position;
    }
    set useOcclusionCulling(useOcclusionCulling) {
        this._useOcclusionCulling = useOcclusionCulling;
        this._nativeObj.useOcclusionCulling = useOcclusionCulling;
    }
    get useOcclusionCulling() {
        return this._useOcclusionCulling;
    }
    set cullingMask(cullingMask) {
        this._cullingMask = cullingMask;
        this._nativeObj.cullingMask = cullingMask;
    }
    get cullingMask() {
        return this._cullingMask;
    }
    set staticMask(value) {
        this._staticMask = value;
        this._nativeObj.staticMask = value;
    }
    get staticMask() {
        return this._staticMask;
    }
    serialize() {
        if (this.boundFrustum) {
            this.setPlane(0, this.boundFrustum.near);
            this.setPlane(4, this.boundFrustum.far);
            this.setPlane(8, this.boundFrustum.left);
            this.setPlane(12, this.boundFrustum.right);
            this.setPlane(16, this.boundFrustum.top);
            this.setPlane(20, this.boundFrustum.bottom);
            this._nativeObj.setBoundFrustum();
        }
    }
    setPlane(index, value) {
        this.float64Array[index] = value.normal.x;
        this.float64Array[index + 1] = value.normal.y;
        this.float64Array[index + 2] = value.normal.z;
        this.float64Array[index + 3] = value.distance;
    }
}
NativeCameraCullInfo.MemoryBlock_size = 192;

//# sourceMappingURL=NativeCameraCullInfo.js.map
