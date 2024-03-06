import { ColliderShape } from "./ColliderShape";
import { ILaya3D } from "../../../../ILaya3D";
import { LayaEnv } from "../../../../LayaEnv";
export class CylinderColliderShape extends ColliderShape {
    constructor(radius = 0.5, height = 1.0, orientation = ColliderShape.SHAPEORIENTATION_UPY) {
        super();
        this._radius = 1;
        this._height = 0.5;
        this._radius = radius;
        this._height = height;
        this._orientation = orientation;
        this._type = ColliderShape.SHAPETYPES_CYLINDER;
        var bt = ILaya3D.Physics3D._bullet;
        switch (orientation) {
            case ColliderShape.SHAPEORIENTATION_UPX:
                bt.btVector3_setValue(CylinderColliderShape._btSize, height / 2, radius, radius);
                this._btShape = bt.btCylinderShapeX_create(CylinderColliderShape._btSize);
                break;
            case ColliderShape.SHAPEORIENTATION_UPY:
                bt.btVector3_setValue(CylinderColliderShape._btSize, radius, height / 2, radius);
                this._btShape = bt.btCylinderShape_create(CylinderColliderShape._btSize);
                break;
            case ColliderShape.SHAPEORIENTATION_UPZ:
                bt.btVector3_setValue(CylinderColliderShape._btSize, radius, radius, height / 2);
                this._btShape = bt.btCylinderShapeZ_create(CylinderColliderShape._btSize);
                break;
            default:
                throw "CapsuleColliderShape:unknown orientation.";
        }
    }
    static __init__() {
        CylinderColliderShape._btSize = ILaya3D.Physics3D._bullet.btVector3_create(0, 0, 0);
    }
    get radius() {
        return this._radius;
    }
    set radius(value) {
        this._radius = value;
        if (LayaEnv.isPlaying)
            this.changeCylinder();
    }
    get height() {
        return this._height;
    }
    set height(value) {
        this._height = value;
        if (LayaEnv.isPlaying)
            this.changeCylinder();
    }
    get orientation() {
        return this._orientation;
    }
    set orientation(value) {
        this._orientation = value;
        if (LayaEnv.isPlaying)
            this.changeCylinder();
    }
    changeCylinder() {
        var bt = ILaya3D.Physics3D._bullet;
        if (this._btShape) {
            bt.btCollisionShape_destroy(this._btShape);
        }
        switch (this._orientation) {
            case ColliderShape.SHAPEORIENTATION_UPX:
                bt.btVector3_setValue(CylinderColliderShape._btSize, this._height / 2, this._radius, this._radius);
                this._btShape = bt.btCylinderShapeX_create(CylinderColliderShape._btSize);
                break;
            case ColliderShape.SHAPEORIENTATION_UPY:
                bt.btVector3_setValue(CylinderColliderShape._btSize, this._radius, this._height / 2, this._radius);
                this._btShape = bt.btCylinderShape_create(CylinderColliderShape._btSize);
                break;
            case ColliderShape.SHAPEORIENTATION_UPZ:
                bt.btVector3_setValue(CylinderColliderShape._btSize, this._radius, this._radius, this._height / 2);
                this._btShape = bt.btCylinderShapeZ_create(CylinderColliderShape._btSize);
                break;
            default:
                throw "CapsuleColliderShape:unknown orientation.";
        }
    }
    clone() {
        var dest = new CylinderColliderShape(this._radius, this._height, this._orientation);
        this.cloneTo(dest);
        return dest;
    }
}

//# sourceMappingURL=CylinderColliderShape.js.map
