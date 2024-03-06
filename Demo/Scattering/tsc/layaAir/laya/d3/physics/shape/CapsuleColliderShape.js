import { ColliderShape } from "./ColliderShape";
import { ILaya3D } from "../../../../ILaya3D";
import { LayaEnv } from "../../../../LayaEnv";
import { Vector3 } from "../../../maths/Vector3";
export class CapsuleColliderShape extends ColliderShape {
    constructor(radius = 0.5, length = 2, orientation = ColliderShape.SHAPEORIENTATION_UPY) {
        super();
        this._radius = radius;
        this._length = length;
        this._orientation = orientation;
        this._type = ColliderShape.SHAPETYPES_CAPSULE;
        var bt = ILaya3D.Physics3D._bullet;
        switch (orientation) {
            case ColliderShape.SHAPEORIENTATION_UPX:
                this._btShape = bt.btCapsuleShapeX_create(radius, length - radius * 2);
                break;
            case ColliderShape.SHAPEORIENTATION_UPY:
                this._btShape = bt.btCapsuleShape_create(radius, length - radius * 2);
                break;
            case ColliderShape.SHAPEORIENTATION_UPZ:
                this._btShape = bt.btCapsuleShapeZ_create(radius, length - radius * 2);
                break;
            default:
                throw "CapsuleColliderShape:unknown orientation.";
        }
    }
    get radius() {
        return this._radius;
    }
    set radius(value) {
        this._radius = value;
        if (LayaEnv.isPlaying) {
            this.changeCapsuleShape();
        }
    }
    get length() {
        return this._length;
    }
    set length(value) {
        this._length = value;
        if (LayaEnv.isPlaying) {
            this.changeCapsuleShape();
        }
    }
    get orientation() {
        return this._orientation;
    }
    set orientation(value) {
        this._orientation = value;
        if (LayaEnv.isPlaying) {
            this.changeCapsuleShape();
        }
    }
    changeCapsuleShape() {
        var bt = ILaya3D.Physics3D._bullet;
        if (this._btShape) {
            bt.btCollisionShape_destroy(this._btShape);
        }
        switch (this._orientation) {
            case ColliderShape.SHAPEORIENTATION_UPX:
                this._btShape = bt.btCapsuleShapeX_create(this._radius, this._length - this._radius * 2);
                break;
            case ColliderShape.SHAPEORIENTATION_UPY:
                this._btShape = bt.btCapsuleShape_create(this._radius, this._length - this._radius * 2);
                break;
            case ColliderShape.SHAPEORIENTATION_UPZ:
                this._btShape = bt.btCapsuleShapeZ_create(this._radius, this._length - this._radius * 2);
                break;
            default:
                throw "CapsuleColliderShape:unknown orientation.";
        }
    }
    _setScale(value) {
        var fixScale = CapsuleColliderShape._tempVector30;
        switch (this.orientation) {
            case ColliderShape.SHAPEORIENTATION_UPX:
                fixScale.x = value.x;
                fixScale.y = fixScale.z = Math.max(value.y, value.z);
                break;
            case ColliderShape.SHAPEORIENTATION_UPY:
                fixScale.y = value.y;
                fixScale.x = fixScale.z = Math.max(value.x, value.z);
                break;
            case ColliderShape.SHAPEORIENTATION_UPZ:
                fixScale.z = value.z;
                fixScale.x = fixScale.y = Math.max(value.x, value.y);
                break;
            default:
                throw "CapsuleColliderShape:unknown orientation.";
        }
        super._setScale(fixScale);
    }
    clone() {
        var dest = new CapsuleColliderShape(this._radius, this._length, this._orientation);
        this.cloneTo(dest);
        return dest;
    }
}
CapsuleColliderShape._tempVector30 = new Vector3();

//# sourceMappingURL=CapsuleColliderShape.js.map
