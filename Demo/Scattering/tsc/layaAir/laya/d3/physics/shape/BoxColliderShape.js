import { ColliderShape } from "./ColliderShape";
import { ILaya3D } from "../../../../ILaya3D";
import { LayaEnv } from "../../../../LayaEnv";
export class BoxColliderShape extends ColliderShape {
    constructor(sizeX = 1.0, sizeY = 1.0, sizeZ = 1.0) {
        super();
        this._sizeX = sizeX;
        this._sizeY = sizeY;
        this._sizeZ = sizeZ;
        this._type = ColliderShape.SHAPETYPES_BOX;
        var bt = ILaya3D.Physics3D._bullet;
        bt.btVector3_setValue(BoxColliderShape._btSize, sizeX / 2, sizeY / 2, sizeZ / 2);
        this._btShape = bt.btBoxShape_create(BoxColliderShape._btSize);
    }
    static __init__() {
        BoxColliderShape._btSize = ILaya3D.Physics3D._bullet.btVector3_create(0, 0, 0);
    }
    get sizeX() {
        return this._sizeX;
    }
    set sizeX(value) {
        this._sizeX = value;
        if (LayaEnv.isPlaying) {
            this.changeBoxShape();
        }
    }
    get sizeY() {
        return this._sizeY;
    }
    set sizeY(value) {
        this._sizeY = value;
        if (LayaEnv.isPlaying) {
            this.changeBoxShape();
        }
    }
    get sizeZ() {
        return this._sizeZ;
    }
    set sizeZ(value) {
        this._sizeZ = value;
        if (LayaEnv.isPlaying) {
            this.changeBoxShape();
        }
    }
    changeBoxShape() {
        var bt = ILaya3D.Physics3D._bullet;
        if (this._btShape) {
            bt.btCollisionShape_destroy(this._btShape);
        }
        bt.btVector3_setValue(BoxColliderShape._btSize, this._sizeX / 2, this._sizeY / 2, this._sizeZ / 2);
        this._btShape = bt.btBoxShape_create(BoxColliderShape._btSize);
    }
    clone() {
        var dest = new BoxColliderShape(this._sizeX, this._sizeY, this._sizeZ);
        this.cloneTo(dest);
        return dest;
    }
}

//# sourceMappingURL=BoxColliderShape.js.map
