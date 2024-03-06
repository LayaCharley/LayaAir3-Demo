import { PhysicsComponent } from "./PhysicsComponent";
import { ILaya3D } from "../../../ILaya3D";
export class PhysicsTriggerComponent extends PhysicsComponent {
    constructor(collisionGroup, canCollideWith) {
        super(collisionGroup, canCollideWith);
        this._isTrigger = false;
    }
    get isTrigger() {
        return this._isTrigger;
    }
    set isTrigger(value) {
        this._isTrigger = value;
        var bt = ILaya3D.Physics3D._bullet;
        if (this._btColliderObject) {
            var flags = bt.btCollisionObject_getCollisionFlags(this._btColliderObject);
            if (value) {
                if ((flags & PhysicsComponent.COLLISIONFLAGS_NO_CONTACT_RESPONSE) === 0)
                    bt.btCollisionObject_setCollisionFlags(this._btColliderObject, flags | PhysicsComponent.COLLISIONFLAGS_NO_CONTACT_RESPONSE);
            }
            else {
                if ((flags & PhysicsComponent.COLLISIONFLAGS_NO_CONTACT_RESPONSE) !== 0)
                    bt.btCollisionObject_setCollisionFlags(this._btColliderObject, flags ^ PhysicsComponent.COLLISIONFLAGS_NO_CONTACT_RESPONSE);
            }
        }
    }
    _onAdded() {
        super._onAdded();
        this.isTrigger = this._isTrigger;
    }
    _cloneTo(dest) {
        super._cloneTo(dest);
        dest.isTrigger = this._isTrigger;
    }
}

//# sourceMappingURL=PhysicsTriggerComponent.js.map
