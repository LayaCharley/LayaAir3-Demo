import { ColliderShape } from "./ColliderShape";
import { ILaya3D } from "../../../../ILaya3D";
export class MeshColliderShape extends ColliderShape {
    constructor() {
        super();
        this._mesh = null;
        this._convex = false;
    }
    get mesh() {
        return this._mesh;
    }
    set mesh(value) {
        if (!value)
            return;
        if (this._mesh !== value) {
            var bt = ILaya3D.Physics3D._bullet;
            this._physicMesh = value._getPhysicMesh();
            if (this._mesh) {
                bt.btCollisionShape_destroy(this._btShape);
            }
            this._setPhysicsMesh();
            this._mesh = value;
        }
    }
    get convex() {
        return this._convex;
    }
    set convex(value) {
        this._convex = value;
    }
    _setPhysicsMesh() {
        if (false) {
            this._createDynamicMeshCollider();
        }
        else {
            this._createBvhTriangleCollider();
        }
    }
    _createDynamicMeshCollider() {
        var bt = ILaya3D.Physics3D._bullet;
        if (this._physicMesh) {
            this._btShape = bt.btGImpactMeshShape_create(this._physicMesh);
            bt.btGImpactShapeInterface_updateBound(this._btShape);
        }
    }
    _createBvhTriangleCollider() {
        var bt = ILaya3D.Physics3D._bullet;
        if (this._physicMesh)
            this._btShape = bt.btBvhTriangleMeshShape_create(this._physicMesh);
    }
    _setScale(value) {
        if (this._compoundParent) {
            this.updateLocalTransformations();
        }
        else {
            var bt = ILaya3D.Physics3D._bullet;
            bt.btVector3_setValue(ColliderShape._btScale, value.x, value.y, value.z);
            bt.btCollisionShape_setLocalScaling(this._btShape, ColliderShape._btScale);
            if (this._attatchedCollisionObject && this._attatchedCollisionObject._enableProcessCollisions) {
                bt.btGImpactShapeInterface_updateBound(this._btShape);
            }
        }
    }
    cloneTo(destObject) {
        var destMeshCollider = destObject;
        destMeshCollider.convex = this._convex;
        destMeshCollider.mesh = this._mesh;
        super.cloneTo(destObject);
    }
    clone() {
        var dest = new MeshColliderShape();
        this.cloneTo(dest);
        return dest;
    }
    destroy() {
        if (this._btShape) {
            ILaya3D.Physics3D._bullet.btCollisionShape_destroy(this._btShape);
            this._btShape = null;
        }
    }
}

//# sourceMappingURL=MeshColliderShape.js.map
