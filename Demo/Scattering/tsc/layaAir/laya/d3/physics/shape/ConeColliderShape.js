import { ColliderShape } from "./ColliderShape";
import { ILaya3D } from "../../../../ILaya3D";
import { LayaEnv } from "../../../../LayaEnv";
export class ConeColliderShape extends ColliderShape {
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
                this._btShape = bt.btConeShapeX_create(radius, height);
                break;
            case ColliderShape.SHAPEORIENTATION_UPY:
                this._btShape = bt.btConeShape_create(radius, height);
                break;
            case ColliderShape.SHAPEORIENTATION_UPZ:
                this._btShape = bt.btConeShapeZ_create(radius, height);
                break;
            default:
                throw "ConeColliderShape:unknown orientation.";
        }
    }
    get radius() {
        return this._radius;
    }
    set radius(value) {
        this._radius = value;
        if (LayaEnv.isPlaying)
            this.changeConeShape();
    }
    get height() {
        return this._height;
    }
    set height(value) {
        this._height = value;
        if (LayaEnv.isPlaying)
            this.changeConeShape();
    }
    get orientation() {
        return this._orientation;
    }
    set orientation(value) {
        this._orientation = value;
        if (LayaEnv.isPlaying)
            this.changeConeShape();
    }
    changeConeShape() {
        var bt = ILaya3D.Physics3D._bullet;
        if (this._btShape) {
            bt.btCollisionShape_destroy(this._btShape);
        }
        switch (this._orientation) {
            case ColliderShape.SHAPEORIENTATION_UPX:
                this._btShape = bt.btConeShapeX_create(this._radius, this._height);
                break;
            case ColliderShape.SHAPEORIENTATION_UPY:
                this._btShape = bt.btConeShape_create(this._radius, this._height);
                break;
            case ColliderShape.SHAPEORIENTATION_UPZ:
                this._btShape = bt.btConeShapeZ_create(this._radius, this._height);
                break;
            default:
                throw "ConeColliderShape:unknown orientation.";
        }
    }
    clone() {
        var dest = new ConeColliderShape(this._radius, this._height, this._orientation);
        this.cloneTo(dest);
        return dest;
    }
}

//# sourceMappingURL=ConeColliderShape.js.map
