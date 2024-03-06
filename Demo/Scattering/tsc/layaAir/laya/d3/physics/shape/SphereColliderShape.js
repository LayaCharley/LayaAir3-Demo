import { ColliderShape } from "./ColliderShape";
import { ILaya3D } from "../../../../ILaya3D";
import { LayaEnv } from "../../../../LayaEnv";
export class SphereColliderShape extends ColliderShape {
    constructor(radius = 0.5) {
        super();
        this._radius = radius;
        this._type = ColliderShape.SHAPETYPES_SPHERE;
        this._btShape = ILaya3D.Physics3D._bullet.btSphereShape_create(radius);
    }
    get radius() {
        return this._radius;
    }
    set radius(value) {
        this._radius = value;
        if (LayaEnv.isPlaying)
            this.changeSphere();
    }
    changeSphere() {
        var bt = ILaya3D.Physics3D._bullet;
        if (this._btShape) {
            bt.btCollisionShape_destroy(this._btShape);
        }
        this._btShape = ILaya3D.Physics3D._bullet.btSphereShape_create(this._radius);
    }
    clone() {
        var dest = new SphereColliderShape(this._radius);
        this.cloneTo(dest);
        return dest;
    }
}

//# sourceMappingURL=SphereColliderShape.js.map
