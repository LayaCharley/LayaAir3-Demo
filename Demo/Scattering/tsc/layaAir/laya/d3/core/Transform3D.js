import { Event } from "../../events/Event";
import { EventDispatcher } from "../../events/EventDispatcher";
import { MathUtils3D } from "../../maths/MathUtils3D";
import { Matrix3x3 } from "../../maths/Matrix3x3";
import { Matrix4x4 } from "../../maths/Matrix4x4";
import { Quaternion } from "../../maths/Quaternion";
import { Vector3 } from "../../maths/Vector3";
export class Transform3D extends EventDispatcher {
    constructor(owner) {
        super();
        this._localPosition = new Vector3(0, 0, 0);
        this._localRotation = new Quaternion(0, 0, 0, 1);
        this._localScale = new Vector3(1, 1, 1);
        this._localRotationEuler = new Vector3(0, 0, 0);
        this._localMatrix = new Matrix4x4();
        this._position = new Vector3(0, 0, 0);
        this._rotation = new Quaternion(0, 0, 0, 1);
        this._scale = new Vector3(1, 1, 1);
        this._rotationEuler = new Vector3(0, 0, 0);
        this._worldMatrix = new Matrix4x4();
        this._children = null;
        this._isDefaultMatrix = false;
        this._faceInvert = false;
        this._frontFaceValue = 1;
        this._parent = null;
        this._transformFlag = 0;
        this._owner = owner;
        this._children = [];
        this._setTransformFlag(Transform3D.TRANSFORM_LOCALQUATERNION | Transform3D.TRANSFORM_LOCALEULER | Transform3D.TRANSFORM_LOCALMATRIX, false);
        this._setTransformFlag(Transform3D.TRANSFORM_WORLDPOSITION | Transform3D.TRANSFORM_WORLDQUATERNION | Transform3D.TRANSFORM_WORLDEULER | Transform3D.TRANSFORM_WORLDSCALE | Transform3D.TRANSFORM_WORLDMATRIX, true);
    }
    get isDefaultMatrix() {
        if (this._getTransformFlag(Transform3D.TRANSFORM_LOCALMATRIX)) {
            let localMat = this.localMatrix;
        }
        return this._isDefaultMatrix;
    }
    get _isFrontFaceInvert() {
        if (this._getTransformFlag(Transform3D.TRANSFORM_WORLDSCALE)) {
            var scale = this.getWorldLossyScale();
            var isInvert = scale.x < 0;
            (scale.y < 0) && (isInvert = !isInvert);
            (scale.z < 0) && (isInvert = !isInvert);
            this._faceInvert = isInvert;
            this._frontFaceValue = this._faceInvert ? -1 : 1;
        }
        return this._faceInvert;
    }
    getFrontFaceValue() {
        if (this._getTransformFlag(Transform3D.TRANSFORM_WORLDSCALE)) {
            let value = this._isFrontFaceInvert;
        }
        return this._frontFaceValue;
    }
    get owner() {
        return this._owner;
    }
    get worldNeedUpdate() {
        return this._getTransformFlag(Transform3D.TRANSFORM_WORLDMATRIX);
    }
    get localPositionX() {
        return this._localPosition.x;
    }
    set localPositionX(x) {
        this._localPosition.x = x;
        this.localPosition = this._localPosition;
    }
    get localPositionY() {
        return this._localPosition.y;
    }
    set localPositionY(y) {
        this._localPosition.y = y;
        this.localPosition = this._localPosition;
    }
    get localPositionZ() {
        return this._localPosition.z;
    }
    set localPositionZ(z) {
        this._localPosition.z = z;
        this.localPosition = this._localPosition;
    }
    get localPosition() {
        return this._localPosition;
    }
    set localPosition(value) {
        if (this._localPosition !== value)
            value.cloneTo(this._localPosition);
        this._setTransformFlag(Transform3D.TRANSFORM_LOCALMATRIX, true);
        this._onWorldPositionTransform();
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
        if (this._getTransformFlag(Transform3D.TRANSFORM_LOCALQUATERNION)) {
            var eulerE = this._localRotationEuler;
            Quaternion.createFromYawPitchRoll(eulerE.y / Transform3D._angleToRandin, eulerE.x / Transform3D._angleToRandin, eulerE.z / Transform3D._angleToRandin, this._localRotation);
            this._setTransformFlag(Transform3D.TRANSFORM_LOCALQUATERNION, false);
        }
        return this._localRotation;
    }
    set localRotation(value) {
        if (this._localRotation !== value)
            value.cloneTo(this._localRotation);
        this._localRotation.normalize(this._localRotation);
        this._setTransformFlag(Transform3D.TRANSFORM_LOCALEULER | Transform3D.TRANSFORM_LOCALMATRIX, true);
        this._setTransformFlag(Transform3D.TRANSFORM_LOCALQUATERNION, false);
        this._onWorldRotationTransform();
    }
    get localScaleX() {
        return this._localScale.x;
    }
    set localScaleX(value) {
        this._localScale.x = value;
        this.localScale = this._localScale;
    }
    get localScaleY() {
        return this._localScale.y;
    }
    set localScaleY(value) {
        this._localScale.y = value;
        this.localScale = this._localScale;
    }
    get localScaleZ() {
        return this._localScale.z;
    }
    set localScaleZ(value) {
        this._localScale.z = value;
        this.localScale = this._localScale;
    }
    get localScale() {
        return this._localScale;
    }
    set localScale(value) {
        if (this._localScale !== value)
            value.cloneTo(this._localScale);
        this._setTransformFlag(Transform3D.TRANSFORM_LOCALMATRIX, true);
        this._onWorldScaleTransform();
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
        if (this._getTransformFlag(Transform3D.TRANSFORM_LOCALEULER)) {
            this._localRotation.getYawPitchRoll(Transform3D._tempVector30);
            var euler = Transform3D._tempVector30;
            var localRotationEuler = this._localRotationEuler;
            localRotationEuler.x = euler.y * Transform3D._angleToRandin;
            localRotationEuler.y = euler.x * Transform3D._angleToRandin;
            localRotationEuler.z = euler.z * Transform3D._angleToRandin;
            this._setTransformFlag(Transform3D.TRANSFORM_LOCALEULER, false);
        }
        return this._localRotationEuler;
    }
    set localRotationEuler(value) {
        if (this._localRotationEuler !== value)
            value.cloneTo(this._localRotationEuler);
        this._setTransformFlag(Transform3D.TRANSFORM_LOCALEULER, false);
        this._setTransformFlag(Transform3D.TRANSFORM_LOCALQUATERNION | Transform3D.TRANSFORM_LOCALMATRIX, true);
        this._onWorldRotationTransform();
    }
    get localMatrix() {
        if (this._getTransformFlag(Transform3D.TRANSFORM_LOCALMATRIX)) {
            Matrix4x4.createAffineTransformation(this._localPosition, this.localRotation, this._localScale, this._localMatrix);
            this._isDefaultMatrix = this._localMatrix.isIdentity();
            this._setTransformFlag(Transform3D.TRANSFORM_LOCALMATRIX, false);
        }
        return this._localMatrix;
    }
    set localMatrix(value) {
        if (this._localMatrix !== value)
            value.cloneTo(this._localMatrix);
        this._isDefaultMatrix = this._localMatrix.isIdentity();
        this._localMatrix.decomposeTransRotScale(this._localPosition, this._localRotation, this._localScale);
        this._setTransformFlag(Transform3D.TRANSFORM_LOCALEULER, true);
        this._setTransformFlag(Transform3D.TRANSFORM_LOCALMATRIX, false);
        this._onWorldTransform();
    }
    get position() {
        if (this._getTransformFlag(Transform3D.TRANSFORM_WORLDPOSITION)) {
            if (this._parent != null) {
                var worldMatE = this.worldMatrix.elements;
                this._position.x = worldMatE[12];
                this._position.y = worldMatE[13];
                this._position.z = worldMatE[14];
            }
            else {
                this._localPosition.cloneTo(this._position);
            }
            this._setTransformFlag(Transform3D.TRANSFORM_WORLDPOSITION, false);
        }
        return this._position;
    }
    set position(value) {
        if (this._parent != null) {
            var parentInvMat = Transform3D._tempMatrix0;
            this._parent.worldMatrix.invert(parentInvMat);
            Vector3.transformCoordinate(value, parentInvMat, this._localPosition);
        }
        else {
            value.cloneTo(this._localPosition);
        }
        this.localPosition = this._localPosition;
        if (this._position !== value)
            value.cloneTo(this._position);
        this._setTransformFlag(Transform3D.TRANSFORM_WORLDPOSITION, false);
    }
    get rotation() {
        if (this._getTransformFlag(Transform3D.TRANSFORM_WORLDQUATERNION)) {
            if (this._parent != null)
                Quaternion.multiply(this._parent.rotation, this.localRotation, this._rotation);
            else
                this.localRotation.cloneTo(this._rotation);
            this._setTransformFlag(Transform3D.TRANSFORM_WORLDQUATERNION, false);
        }
        return this._rotation;
    }
    set rotation(value) {
        if (this._parent != null) {
            this._parent.rotation.invert(Transform3D._tempQuaternion0);
            Quaternion.multiply(Transform3D._tempQuaternion0, value, this._localRotation);
        }
        else {
            value.cloneTo(this._localRotation);
        }
        this.localRotation = this._localRotation;
        if (value !== this._rotation)
            value.cloneTo(this._rotation);
        this._setTransformFlag(Transform3D.TRANSFORM_WORLDQUATERNION, false);
    }
    get rotationEuler() {
        if (this._getTransformFlag(Transform3D.TRANSFORM_WORLDEULER)) {
            this.rotation.getYawPitchRoll(Transform3D._tempVector30);
            var eulerE = Transform3D._tempVector30;
            var rotationEulerE = this._rotationEuler;
            rotationEulerE.x = eulerE.y * Transform3D._angleToRandin;
            rotationEulerE.y = eulerE.x * Transform3D._angleToRandin;
            rotationEulerE.z = eulerE.z * Transform3D._angleToRandin;
            this._setTransformFlag(Transform3D.TRANSFORM_WORLDEULER, false);
        }
        return this._rotationEuler;
    }
    set rotationEuler(value) {
        Quaternion.createFromYawPitchRoll(value.y / Transform3D._angleToRandin, value.x / Transform3D._angleToRandin, value.z / Transform3D._angleToRandin, this._rotation);
        this.rotation = this._rotation;
        if (this._rotationEuler !== value)
            value.cloneTo(this._rotationEuler);
        this._setTransformFlag(Transform3D.TRANSFORM_WORLDEULER, false);
    }
    get worldMatrix() {
        if (this._getTransformFlag(Transform3D.TRANSFORM_WORLDMATRIX)) {
            if (this._parent != null) {
                let effectiveTrans = this._parent;
                while (effectiveTrans._parent && effectiveTrans.isDefaultMatrix) {
                    effectiveTrans = effectiveTrans._parent;
                }
                Matrix4x4.multiply(effectiveTrans.worldMatrix, this.localMatrix, this._worldMatrix);
            }
            else
                this.localMatrix.cloneTo(this._worldMatrix);
            this._setTransformFlag(Transform3D.TRANSFORM_WORLDMATRIX, false);
        }
        return this._worldMatrix;
    }
    set worldMatrix(value) {
        if (this._parent === null) {
            value.cloneTo(this._localMatrix);
        }
        else {
            this._parent.worldMatrix.invert(this._localMatrix);
            Matrix4x4.multiply(this._localMatrix, value, this._localMatrix);
        }
        this.localMatrix = this._localMatrix;
        if (this._worldMatrix !== value)
            value.cloneTo(this._worldMatrix);
        this._setTransformFlag(Transform3D.TRANSFORM_WORLDMATRIX, false);
    }
    _getScaleMatrix() {
        var invRotation = Transform3D._tempQuaternion0;
        var invRotationMat = Transform3D._tempMatrix3x30;
        var worldRotScaMat = Transform3D._tempMatrix3x31;
        var scaMat = Transform3D._tempMatrix3x32;
        Matrix3x3.createFromMatrix4x4(this.worldMatrix, worldRotScaMat);
        this.rotation.invert(invRotation);
        Matrix3x3.createRotationQuaternion(invRotation, invRotationMat);
        Matrix3x3.multiply(invRotationMat, worldRotScaMat, scaMat);
        return scaMat;
    }
    _setTransformFlag(type, value) {
        if (value)
            this._transformFlag |= type;
        else
            this._transformFlag &= ~type;
    }
    _getTransformFlag(type) {
        return (this._transformFlag & type) != 0;
    }
    _setParent(value) {
        if (this._parent !== value) {
            if (this._parent) {
                var parentChilds = this._parent._children;
                var index = parentChilds.indexOf(this);
                parentChilds.splice(index, 1);
            }
            if (value) {
                value._children.push(this);
                (value) && (this._onWorldTransform());
            }
            this._parent = value;
        }
    }
    _onWorldPositionRotationTransform() {
        if (!this._getTransformFlag(Transform3D.TRANSFORM_WORLDMATRIX) || !this._getTransformFlag(Transform3D.TRANSFORM_WORLDPOSITION) || !this._getTransformFlag(Transform3D.TRANSFORM_WORLDQUATERNION) || !this._getTransformFlag(Transform3D.TRANSFORM_WORLDEULER)) {
            this._setTransformFlag(Transform3D.TRANSFORM_WORLDMATRIX | Transform3D.TRANSFORM_WORLDPOSITION | Transform3D.TRANSFORM_WORLDQUATERNION | Transform3D.TRANSFORM_WORLDEULER, true);
            this.event(Event.TRANSFORM_CHANGED, this._transformFlag);
        }
        for (var i = 0, n = this._children.length; i < n; i++)
            this._children[i]._onWorldPositionRotationTransform();
    }
    _onWorldPositionScaleTransform() {
        if (!this._getTransformFlag(Transform3D.TRANSFORM_WORLDMATRIX) || !this._getTransformFlag(Transform3D.TRANSFORM_WORLDPOSITION) || !this._getTransformFlag(Transform3D.TRANSFORM_WORLDSCALE)) {
            this._setTransformFlag(Transform3D.TRANSFORM_WORLDMATRIX | Transform3D.TRANSFORM_WORLDPOSITION | Transform3D.TRANSFORM_WORLDSCALE, true);
            this.event(Event.TRANSFORM_CHANGED, this._transformFlag);
        }
        for (var i = 0, n = this._children.length; i < n; i++)
            this._children[i]._onWorldPositionScaleTransform();
    }
    _onWorldPositionTransform() {
        if (!this._getTransformFlag(Transform3D.TRANSFORM_WORLDMATRIX) || !this._getTransformFlag(Transform3D.TRANSFORM_WORLDPOSITION)) {
            this._setTransformFlag(Transform3D.TRANSFORM_WORLDMATRIX | Transform3D.TRANSFORM_WORLDPOSITION, true);
            this.event(Event.TRANSFORM_CHANGED, this._transformFlag);
        }
        for (var i = 0, n = this._children.length; i < n; i++)
            this._children[i]._onWorldPositionTransform();
    }
    _onWorldRotationTransform() {
        if (!this._getTransformFlag(Transform3D.TRANSFORM_WORLDMATRIX) || !this._getTransformFlag(Transform3D.TRANSFORM_WORLDQUATERNION) || !this._getTransformFlag(Transform3D.TRANSFORM_WORLDEULER)) {
            this._setTransformFlag(Transform3D.TRANSFORM_WORLDMATRIX | Transform3D.TRANSFORM_WORLDQUATERNION | Transform3D.TRANSFORM_WORLDEULER, true);
            this.event(Event.TRANSFORM_CHANGED, this._transformFlag);
        }
        for (var i = 0, n = this._children.length; i < n; i++)
            this._children[i]._onWorldPositionRotationTransform();
    }
    _onWorldScaleTransform() {
        if (!this._getTransformFlag(Transform3D.TRANSFORM_WORLDMATRIX) || !this._getTransformFlag(Transform3D.TRANSFORM_WORLDSCALE)) {
            this._setTransformFlag(Transform3D.TRANSFORM_WORLDMATRIX | Transform3D.TRANSFORM_WORLDSCALE, true);
            this.event(Event.TRANSFORM_CHANGED, this._transformFlag);
        }
        for (var i = 0, n = this._children.length; i < n; i++)
            this._children[i]._onWorldPositionScaleTransform();
    }
    _onWorldTransform() {
        if (!this._getTransformFlag(Transform3D.TRANSFORM_WORLDMATRIX) || !this._getTransformFlag(Transform3D.TRANSFORM_WORLDPOSITION) || !this._getTransformFlag(Transform3D.TRANSFORM_WORLDQUATERNION) || !this._getTransformFlag(Transform3D.TRANSFORM_WORLDEULER) || !this._getTransformFlag(Transform3D.TRANSFORM_WORLDSCALE)) {
            this._setTransformFlag(Transform3D.TRANSFORM_WORLDMATRIX | Transform3D.TRANSFORM_WORLDPOSITION | Transform3D.TRANSFORM_WORLDQUATERNION | Transform3D.TRANSFORM_WORLDEULER | Transform3D.TRANSFORM_WORLDSCALE, true);
            this.event(Event.TRANSFORM_CHANGED, this._transformFlag);
        }
        for (var i = 0, n = this._children.length; i < n; i++)
            this._children[i]._onWorldTransform();
    }
    translate(translation, isLocal = true) {
        if (isLocal) {
            Matrix4x4.createFromQuaternion(this.localRotation, Transform3D._tempMatrix0);
            Vector3.transformCoordinate(translation, Transform3D._tempMatrix0, Transform3D._tempVector30);
            Vector3.add(this.localPosition, Transform3D._tempVector30, this._localPosition);
            this.localPosition = this._localPosition;
        }
        else {
            Vector3.add(this.position, translation, this._position);
            this.position = this._position;
        }
    }
    rotate(rotation, isLocal = true, isRadian = true) {
        var rot;
        if (isRadian) {
            rot = rotation;
        }
        else {
            Vector3.scale(rotation, Math.PI / 180.0, Transform3D._tempVector30);
            rot = Transform3D._tempVector30;
        }
        Quaternion.createFromYawPitchRoll(rot.y, rot.x, rot.z, Transform3D._tempQuaternion0);
        if (isLocal) {
            Quaternion.multiply(this._localRotation, Transform3D._tempQuaternion0, this._localRotation);
            this.localRotation = this._localRotation;
        }
        else {
            Quaternion.multiply(Transform3D._tempQuaternion0, this.rotation, this._rotation);
            this.rotation = this._rotation;
        }
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
        var eye;
        if (isLocal) {
            eye = this._localPosition;
            if (Math.abs(eye.x - target.x) < MathUtils3D.zeroTolerance && Math.abs(eye.y - target.y) < MathUtils3D.zeroTolerance && Math.abs(eye.z - target.z) < MathUtils3D.zeroTolerance)
                return;
            if (isCamera) {
                Quaternion.lookAt(this._localPosition, target, up, this._localRotation);
                this._localRotation.invert(this._localRotation);
            }
            else {
                Vector3.subtract(this.localPosition, target, Transform3D._tempVector30);
                Quaternion.rotationLookAt(Transform3D._tempVector30, up, this.localRotation);
                this._localRotation.invert(this._localRotation);
            }
            this.localRotation = this._localRotation;
        }
        else {
            var worldPosition = this.position;
            eye = worldPosition;
            if (Math.abs(eye.x - target.x) < MathUtils3D.zeroTolerance && Math.abs(eye.y - target.y) < MathUtils3D.zeroTolerance && Math.abs(eye.z - target.z) < MathUtils3D.zeroTolerance)
                return;
            if (isCamera) {
                Quaternion.lookAt(worldPosition, target, up, this._rotation);
                this._rotation.invert(this._rotation);
            }
            else {
                Vector3.subtract(this.position, target, Transform3D._tempVector30);
                Quaternion.rotationLookAt(Transform3D._tempVector30, up, this._rotation);
                this._rotation.invert(this._rotation);
            }
            this.rotation = this._rotation;
        }
    }
    objLookat(target, up, isLocal = false) {
    }
    getWorldLossyScale() {
        if (this._getTransformFlag(Transform3D.TRANSFORM_WORLDSCALE)) {
            if (this._parent !== null) {
                var scaMatE = this._getScaleMatrix().elements;
                this._scale.x = scaMatE[0];
                this._scale.y = scaMatE[4];
                this._scale.z = scaMatE[8];
            }
            else {
                this._localScale.cloneTo(this._scale);
            }
            this._setTransformFlag(Transform3D.TRANSFORM_WORLDSCALE, false);
        }
        return this._scale;
    }
    setWorldLossyScale(value) {
        if (this._parent !== null) {
            var scaleMat = Transform3D._tempMatrix3x33;
            var localScaleMat = Transform3D._tempMatrix3x33;
            var localScaleMatE = localScaleMat.elements;
            var parInvScaleMat = this._parent._getScaleMatrix();
            parInvScaleMat.invert(parInvScaleMat);
            Matrix3x3.createFromScaling(value, scaleMat);
            Matrix3x3.multiply(parInvScaleMat, scaleMat, localScaleMat);
            this._localScale.x = localScaleMatE[0];
            this._localScale.y = localScaleMatE[4];
            this._localScale.z = localScaleMatE[8];
        }
        else {
            value.cloneTo(this._localScale);
        }
        this.localScale = this._localScale;
        if (this._scale !== value)
            value.cloneTo(this._scale);
        this._setTransformFlag(Transform3D.TRANSFORM_WORLDSCALE, false);
    }
    get scale() {
        console.warn("Transfrm3D: discard function,please use getWorldLossyScale instead.");
        return this.getWorldLossyScale();
    }
    set scale(value) {
        console.warn("Transfrm3D: discard function,please use setWorldLossyScale instead.");
        this.setWorldLossyScale(value);
    }
    localToGlobal(value, out) {
        Vector3.transformV3ToV3(value, this.worldMatrix, out);
    }
    globalToLocal(pos, out) {
        this.worldMatrix.invert(Transform3D._tempMatrix0);
        Vector3.transformV3ToV3(pos, Transform3D._tempMatrix0, out);
    }
    toLocalNormal(pos, out) {
        this.worldMatrix.invert(Transform3D._tempMatrix0);
        Vector3.TransformNormal(pos, Transform3D._tempMatrix0, out);
    }
    toDir(forward, dir) {
        var wmat = this.worldMatrix;
        this.rotationTo(this.rotation, forward, dir);
        this.rotation = this.rotation;
    }
    rotationTo(out, a, b) {
        var dot = Vector3.dot(a, b);
        Vector3.Up;
        if (dot < -0.999999) {
            Vector3.cross(Vector3.UnitX, a, Transform3D.tmpVec3);
            if (Vector3.scalarLength(Transform3D.tmpVec3) < 0.000001)
                Vector3.cross(Vector3.UnitY, a, Transform3D.tmpVec3);
            Vector3.normalize(Transform3D.tmpVec3, Transform3D.tmpVec3);
            Quaternion.createFromAxisAngle(Transform3D.tmpVec3, Math.PI, out);
            return true;
        }
        else if (dot > 0.999999) {
            out.x = 0;
            out.y = 0;
            out.z = 0;
            out.w = 1;
            return false;
        }
        else {
            Vector3.cross(a, b, Transform3D.tmpVec3);
            out.x = Transform3D.tmpVec3.x;
            out.y = Transform3D.tmpVec3.y;
            out.z = Transform3D.tmpVec3.z;
            out.w = 1 + dot;
            out.normalize(out);
            return true;
        }
        return false;
    }
}
Transform3D._tempVector30 = new Vector3();
Transform3D._tempQuaternion0 = new Quaternion();
Transform3D._tempMatrix0 = new Matrix4x4();
Transform3D._tempMatrix3x30 = new Matrix3x3();
Transform3D._tempMatrix3x31 = new Matrix3x3();
Transform3D._tempMatrix3x32 = new Matrix3x3();
Transform3D._tempMatrix3x33 = new Matrix3x3();
Transform3D.TRANSFORM_LOCALQUATERNION = 0x01;
Transform3D.TRANSFORM_LOCALEULER = 0x02;
Transform3D.TRANSFORM_LOCALMATRIX = 0x04;
Transform3D.TRANSFORM_WORLDPOSITION = 0x08;
Transform3D.TRANSFORM_WORLDQUATERNION = 0x10;
Transform3D.TRANSFORM_WORLDSCALE = 0x20;
Transform3D.TRANSFORM_WORLDMATRIX = 0x40;
Transform3D.TRANSFORM_WORLDEULER = 0x80;
Transform3D._angleToRandin = 180 / Math.PI;
Transform3D.tmpVec3 = new Vector3();

//# sourceMappingURL=Transform3D.js.map
