import { ColliderShape } from "./ColliderShape";
import { ILaya3D } from "../../../../ILaya3D";
export class CompoundColliderShape extends ColliderShape {
    constructor() {
        super();
        this._childColliderShapes = [];
        this._type = ColliderShape.SHAPETYPES_COMPOUND;
        this._btShape = ILaya3D.Physics3D._bullet.btCompoundShape_create();
    }
    static __init__() {
        var bt = ILaya3D.Physics3D._bullet;
        CompoundColliderShape._btVector3One = bt.btVector3_create(1, 1, 1);
        CompoundColliderShape._btTransform = bt.btTransform_create();
        CompoundColliderShape._btOffset = bt.btVector3_create(0, 0, 0);
        CompoundColliderShape._btRotation = bt.btQuaternion_create(0, 0, 0, 1);
    }
    _clearChildShape(shape) {
        shape._attatched = false;
        shape._compoundParent = null;
        shape._indexInCompound = -1;
    }
    _updateChildTransform(shape) {
        var bt = ILaya3D.Physics3D._bullet;
        var offset = shape.localOffset;
        var rotation = shape.localRotation;
        var btOffset = ColliderShape._btVector30;
        var btQuaternion = ColliderShape._btQuaternion0;
        var btTransform = ColliderShape._btTransform0;
        bt.btVector3_setValue(btOffset, offset.x, offset.y, offset.z);
        bt.btQuaternion_setValue(btQuaternion, rotation.x, rotation.y, rotation.z, rotation.w);
        bt.btTransform_setOrigin(btTransform, btOffset);
        bt.btTransform_setRotation(btTransform, btQuaternion);
        bt.btCompoundShape_updateChildTransform(this._btShape, shape._indexInCompound, btTransform, true);
    }
    set shapes(value) {
        for (var i = this._childColliderShapes.length - 1; i >= 0; i--) {
            this.removeChildShape(this._childColliderShapes[i]);
        }
        for (var i = 0; i < value.length; i++) {
            this.addChildShape(value[i]);
        }
    }
    get shapes() {
        return this._childColliderShapes;
    }
    addChildShape(shape) {
        if (shape._attatched)
            throw "CompoundColliderShape: this shape has attatched to other entity.";
        shape._attatched = true;
        shape._compoundParent = this;
        shape._indexInCompound = this._childColliderShapes.length;
        this._childColliderShapes.push(shape);
        var offset = shape.localOffset;
        var rotation = shape.localRotation;
        var bt = ILaya3D.Physics3D._bullet;
        bt.btVector3_setValue(CompoundColliderShape._btOffset, offset.x, offset.y, offset.z);
        bt.btQuaternion_setValue(CompoundColliderShape._btRotation, rotation.x, rotation.y, rotation.z, rotation.w);
        bt.btTransform_setOrigin(CompoundColliderShape._btTransform, CompoundColliderShape._btOffset);
        bt.btTransform_setRotation(CompoundColliderShape._btTransform, CompoundColliderShape._btRotation);
        var btScale = bt.btCollisionShape_getLocalScaling(this._btShape);
        bt.btCollisionShape_setLocalScaling(this._btShape, CompoundColliderShape._btVector3One);
        bt.btCompoundShape_addChildShape(this._btShape, CompoundColliderShape._btTransform, shape._btShape);
        bt.btCollisionShape_setLocalScaling(this._btShape, btScale);
        (this._attatchedCollisionObject) && (this._attatchedCollisionObject.colliderShape = this);
    }
    removeChildShape(shape) {
        if (shape._compoundParent === this) {
            var index = shape._indexInCompound;
            this._clearChildShape(shape);
            var endShape = this._childColliderShapes[this._childColliderShapes.length - 1];
            endShape._indexInCompound = index;
            this._childColliderShapes[index] = endShape;
            this._childColliderShapes.pop();
            ILaya3D.Physics3D._bullet.btCompoundShape_removeChildShapeByIndex(this._btShape, index);
        }
    }
    clearChildShape() {
        for (var i = 0, n = this._childColliderShapes.length; i < n; i++) {
            this._clearChildShape(this._childColliderShapes[i]);
            ILaya3D.Physics3D._bullet.btCompoundShape_removeChildShapeByIndex(this._btShape, 0);
        }
        this._childColliderShapes.length = 0;
    }
    getChildShapeCount() {
        return this._childColliderShapes.length;
    }
    cloneTo(destObject) {
        var destCompoundColliderShape = destObject;
        destCompoundColliderShape.clearChildShape();
        for (var i = 0, n = this._childColliderShapes.length; i < n; i++)
            destCompoundColliderShape.addChildShape(this._childColliderShapes[i].clone());
    }
    clone() {
        var dest = new CompoundColliderShape();
        this.cloneTo(dest);
        return dest;
    }
    destroy() {
        super.destroy();
        for (var i = 0, n = this._childColliderShapes.length; i < n; i++) {
            var childShape = this._childColliderShapes[i];
            if (childShape._referenceCount === 0)
                childShape.destroy();
        }
    }
}

//# sourceMappingURL=CompoundColliderShape.js.map
