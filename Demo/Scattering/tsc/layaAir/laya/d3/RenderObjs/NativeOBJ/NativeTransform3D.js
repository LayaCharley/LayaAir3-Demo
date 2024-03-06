import { EventDispatcher } from "../../../events/EventDispatcher";
import { NativeMemory } from "../../../RenderEngine/RenderEngine/NativeGLEngine/CommonMemory/NativeMemory";
import { Transform3D } from "../../core/Transform3D";
export class NativeTransform3D extends Transform3D {
    constructor(owner) {
        super(owner);
        this.nativeMemory = new NativeMemory(NativeTransform3D.MemoryBlock_size, true);
        this.float32Array = this.nativeMemory.float32Array;
        this.float64Array = this.nativeMemory.float64Array;
        this.int32Array = this.nativeMemory.int32Array;
        this.eventDispatcher = new EventDispatcher();
        this._nativeObj = new window.conchTransform(this.nativeMemory._buffer, this.eventDispatcher.event.bind(this.eventDispatcher));
    }
    get _isFrontFaceInvert() {
        return this._nativeObj._isFrontFaceInvert;
    }
    get owner() {
        return this._owner;
    }
    get localPositionX() {
        return this.localPosition.x;
    }
    set localPositionX(x) {
        this._localPosition.x = x;
        this.localPosition = this._localPosition;
    }
    get localPositionY() {
        return this.localPosition.y;
    }
    set localPositionY(y) {
        this._localPosition.y = y;
        this.localPosition = this._localPosition;
    }
    get localPositionZ() {
        return this.localPosition.z;
    }
    set localPositionZ(z) {
        this._localPosition.z = z;
        this.localPosition = this._localPosition;
    }
    get localPosition() {
        if (this._nativeObj.getLocalPosition()) {
            this._localPosition.x = this.float64Array[0];
            this._localPosition.y = this.float64Array[1];
            this._localPosition.z = this.float64Array[2];
        }
        return this._localPosition;
    }
    set localPosition(value) {
        this._localPosition.x = this.float64Array[0] = value.x;
        this._localPosition.y = this.float64Array[1] = value.y;
        this._localPosition.z = this.float64Array[2] = value.z;
        this._nativeObj.setLocalPosition();
    }
    get localRotationX() {
        return this.localRotation.x;
    }
    set localRotationX(x) {
        let rot = this.localRotation;
        rot.x = x;
        this.localRotation = rot;
    }
    get localRotationY() {
        return this.localRotation.y;
    }
    set localRotationY(y) {
        let rot = this.localRotation;
        rot.y = y;
        this.localRotation = rot;
    }
    get localRotationZ() {
        return this.localRotation.z;
    }
    set localRotationZ(z) {
        let rot = this.localRotation;
        rot.z = z;
        this.localRotation = rot;
    }
    get localRotationW() {
        return this.localRotation.w;
    }
    set localRotationW(w) {
        let rot = this.localRotation;
        rot.w = w;
        this.localRotation = rot;
    }
    get localRotation() {
        if (this._nativeObj.getLocalRotation()) {
            this._localRotation.x = this.float64Array[0];
            this._localRotation.y = this.float64Array[1];
            this._localRotation.z = this.float64Array[2];
            this._localRotation.w = this.float64Array[3];
        }
        return this._localRotation;
    }
    set localRotation(value) {
        this._localRotation.x = this.float64Array[0] = value.x;
        this._localRotation.y = this.float64Array[1] = value.y;
        this._localRotation.z = this.float64Array[2] = value.z;
        this._localRotation.w = this.float64Array[3] = value.w;
        this._nativeObj.setLocalRotation();
    }
    get localScaleX() {
        return this.localScale.x;
    }
    set localScaleX(value) {
        this._localScale.x = value;
        this.localScale = this._localScale;
    }
    get localScaleY() {
        return this.localScale.y;
    }
    set localScaleY(value) {
        this._localScale.y = value;
        this.localScale = this._localScale;
    }
    get localScaleZ() {
        return this.localScale.z;
    }
    set localScaleZ(value) {
        this._localScale.z = value;
        this.localScale = this._localScale;
    }
    get localScale() {
        if (this._nativeObj.getLocalScale()) {
            this._localScale.x = this.float64Array[0];
            this._localScale.y = this.float64Array[1];
            this._localScale.z = this.float64Array[2];
        }
        return this._localScale;
    }
    set localScale(value) {
        this._localScale.x = this.float64Array[0] = value.x;
        this._localScale.y = this.float64Array[1] = value.y;
        this._localScale.z = this.float64Array[2] = value.z;
        this._nativeObj.setLocalScale();
    }
    get localRotationEulerX() {
        return this.localRotationEuler.x;
    }
    set localRotationEulerX(value) {
        let rot = this.localRotationEuler;
        rot.x = value;
        this.localRotationEuler = rot;
    }
    get localRotationEulerY() {
        return this.localRotationEuler.y;
    }
    set localRotationEulerY(value) {
        let rot = this.localRotationEuler;
        rot.y = value;
        this.localRotationEuler = rot;
    }
    get localRotationEulerZ() {
        return this.localRotationEuler.z;
    }
    set localRotationEulerZ(value) {
        let rot = this.localRotationEuler;
        rot.z = value;
        this.localRotationEuler = rot;
    }
    get localRotationEuler() {
        if (this._nativeObj.getLocalRotationEuler()) {
            this._localRotationEuler.x = this.float64Array[0];
            this._localRotationEuler.y = this.float64Array[1];
            this._localRotationEuler.z = this.float64Array[2];
        }
        return this._localRotationEuler;
    }
    set localRotationEuler(value) {
        this._localRotationEuler.x = this.float64Array[0] = value.x;
        this._localRotationEuler.y = this.float64Array[1] = value.y;
        this._localRotationEuler.z = this.float64Array[2] = value.z;
        this._nativeObj.setLocalRotationEuler();
    }
    get localMatrix() {
        if (this._nativeObj.getLocalMatrix()) {
            for (var i = 0; i < 16; ++i) {
                this._localMatrix.elements[i] = this.float32Array[i];
            }
        }
        return this._localMatrix;
    }
    set localMatrix(value) {
        if (this._localMatrix !== value)
            value.cloneTo(this._localMatrix);
        this.float32Array.set(value.elements);
        this._nativeObj.setLocalMatrix();
    }
    get position() {
        if (this._nativeObj.getPosition()) {
            this._position.x = this.float64Array[0];
            this._position.y = this.float64Array[1];
            this._position.z = this.float64Array[2];
        }
        return this._position;
    }
    set position(value) {
        this._position.x = this.float64Array[0] = value.x;
        this._position.y = this.float64Array[1] = value.y;
        this._position.z = this.float64Array[2] = value.z;
        this._nativeObj.setPosition();
    }
    get rotation() {
        if (this._nativeObj.getRotation()) {
            this._rotation.x = this.float64Array[0];
            this._rotation.y = this.float64Array[1];
            this._rotation.z = this.float64Array[2];
            this._rotation.w = this.float64Array[3];
        }
        return this._rotation;
    }
    set rotation(value) {
        this._rotation.x = this.float64Array[0] = value.x;
        this._rotation.y = this.float64Array[1] = value.y;
        this._rotation.z = this.float64Array[2] = value.z;
        this._rotation.w = this.float64Array[3] = value.w;
        this._nativeObj.setRotation();
    }
    get rotationEuler() {
        if (this._nativeObj.getRotationEuler()) {
            this._rotationEuler.x = this.float64Array[0];
            this._rotationEuler.y = this.float64Array[1];
            this._rotationEuler.z = this.float64Array[2];
        }
        return this._rotationEuler;
    }
    set rotationEuler(value) {
        this._rotationEuler.x = this.float64Array[0] = value.x;
        this._rotationEuler.y = this.float64Array[1] = value.y;
        this._rotationEuler.z = this.float64Array[2] = value.z;
        this._nativeObj.setRotationEuler();
    }
    get worldMatrix() {
        if (this._nativeObj.getWorldMatrix()) {
            for (var i = 0; i < 16; i++) {
                this._worldMatrix.elements[i] = this.float32Array[i];
            }
        }
        return this._worldMatrix;
    }
    set worldMatrix(value) {
        if (this._worldMatrix !== value)
            value.cloneTo(this._worldMatrix);
        this.float32Array.set(value.elements);
        this._nativeObj.setWorldMatrix();
    }
    _setTransformFlag(type, value) {
        this._nativeObj && this._nativeObj._setTransformFlag(type, value);
    }
    _getTransformFlag(type) {
        return this._nativeObj._getTransformFlag(type);
    }
    _setParent(value) {
        super._setParent(value);
        this._nativeObj.setParent(value ? value._nativeObj : null);
    }
    translate(translation, isLocal = true) {
        this.float64Array[0] = translation.x;
        this.float64Array[1] = translation.y;
        this.float64Array[2] = translation.z;
        this.int32Array[6] = isLocal ? 1 : 0;
        this._nativeObj.translate();
    }
    rotate(rotation, isLocal = true, isRadian = true) {
        this.float64Array[0] = rotation.x;
        this.float64Array[1] = rotation.y;
        this.float64Array[2] = rotation.z;
        this.int32Array[6] = isLocal ? 1 : 0;
        this.int32Array[7] = isRadian ? 1 : 0;
        this._nativeObj.rotate();
    }
    getForward(forward) {
        var worldMatElem = this.worldMatrix.elements;
        forward.x = -worldMatElem[8];
        forward.y = -worldMatElem[9];
        forward.z = -worldMatElem[10];
    }
    getUp(up) {
        var worldMatElem = this.worldMatrix.elements;
        up.x = worldMatElem[4];
        up.y = worldMatElem[5];
        up.z = worldMatElem[6];
    }
    getRight(right) {
        var worldMatElem = this.worldMatrix.elements;
        right.x = worldMatElem[0];
        right.y = worldMatElem[1];
        right.z = worldMatElem[2];
    }
    lookAt(target, up, isLocal = false, isCamera = true) {
        this.float64Array[0] = target.x;
        this.float64Array[1] = target.y;
        this.float64Array[2] = target.z;
        this.float64Array[3] = up.x;
        this.float64Array[4] = up.y;
        this.float64Array[5] = up.z;
        this.int32Array[12] = isLocal ? 1 : 0;
        this.int32Array[13] = isCamera ? 1 : 0;
        this._nativeObj.lookAt();
    }
    objLookat(target, up, isLocal = false) {
    }
    getWorldLossyScale() {
        if (this._nativeObj.getWorldLossyScale()) {
            this._scale.x = this.float64Array[0];
            this._scale.y = this.float64Array[1];
            this._scale.z = this.float64Array[2];
        }
        return this._scale;
    }
    setWorldLossyScale(value) {
        this._scale.x = this.float64Array[0] = value.x;
        this._scale.y = this.float64Array[1] = value.y;
        this._scale.z = this.float64Array[2] = value.z;
        this._nativeObj.setWorldLossyScale();
    }
    hasListener(type) {
        return this.eventDispatcher.hasListener(type);
    }
    event(type, data) {
        return this.eventDispatcher.event(type, data);
    }
    on(type, caller, listener, args) {
        if (arguments.length == 2) {
            listener = caller;
            caller = null;
        }
        return this.eventDispatcher.on(type, caller, listener, args);
    }
    once(type, caller, listener, args) {
        if (arguments.length == 2) {
            listener = caller;
            caller = null;
        }
        return this.eventDispatcher.once(type, caller, listener, args);
    }
    off(type, caller, listener) {
        if (arguments.length == 2) {
            listener = caller;
            caller = null;
        }
        return this.eventDispatcher.off(type, caller, listener);
    }
    offAll(type) {
        return this.eventDispatcher.offAll(type);
    }
    offAllCaller(caller) {
        return this.eventDispatcher.offAllCaller(caller);
    }
}
NativeTransform3D.MemoryBlock_size = 16 * 4;

//# sourceMappingURL=NativeTransform3D.js.map
