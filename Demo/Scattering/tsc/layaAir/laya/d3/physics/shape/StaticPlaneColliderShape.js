import { ColliderShape } from "./ColliderShape";
import { ILaya3D } from "../../../../ILaya3D";
export class StaticPlaneColliderShape extends ColliderShape {
    constructor(normal, offset) {
        super();
        this._normal = normal;
        this._offset = offset;
        this._type = ColliderShape.SHAPETYPES_STATICPLANE;
        var bt = ILaya3D.Physics3D._bullet;
        bt.btVector3_setValue(StaticPlaneColliderShape._btNormal, -normal.x, normal.y, normal.z);
        this._btShape = bt.btStaticPlaneShape_create(StaticPlaneColliderShape._btNormal, offset);
    }
    static __init__() {
        StaticPlaneColliderShape._btNormal = ILaya3D.Physics3D._bullet.btVector3_create(0, 0, 0);
    }
    clone() {
        var dest = new StaticPlaneColliderShape(this._normal, this._offset);
        this.cloneTo(dest);
        return dest;
    }
}

//# sourceMappingURL=StaticPlaneColliderShape.js.map
