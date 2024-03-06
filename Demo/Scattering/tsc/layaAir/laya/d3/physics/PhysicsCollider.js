import { Physics3D } from "../Physics3D";
import { Physics3DUtils } from "../utils/Physics3DUtils";
import { PhysicsComponent } from "./PhysicsComponent";
import { PhysicsTriggerComponent } from "./PhysicsTriggerComponent";
export class PhysicsCollider extends PhysicsTriggerComponent {
    constructor(collisionGroup = Physics3DUtils.COLLISIONFILTERGROUP_DEFAULTFILTER, canCollideWith = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER) {
        super(collisionGroup, canCollideWith);
        this._enableProcessCollisions = false;
    }
    _addToSimulation() {
        this._simulation._addPhysicsCollider(this, this._collisionGroup, this._canCollideWith);
    }
    _removeFromSimulation() {
        this._simulation._removePhysicsCollider(this);
    }
    _parse(data) {
        (data.friction != null) && (this.friction = data.friction);
        (data.rollingFriction != null) && (this.rollingFriction = data.rollingFriction);
        (data.restitution != null) && (this.restitution = data.restitution);
        (data.isTrigger != null) && (this.isTrigger = data.isTrigger);
        super._parse(data);
        this._parseShape(data.shapes);
    }
    _onAdded() {
        var bt = Physics3D._bullet;
        var btColObj = bt.btCollisionObject_create();
        bt.btCollisionObject_setUserIndex(btColObj, this.id);
        bt.btCollisionObject_forceActivationState(btColObj, PhysicsComponent.ACTIVATIONSTATE_DISABLE_SIMULATION);
        var flags = bt.btCollisionObject_getCollisionFlags(btColObj);
        if (this.owner.isStatic) {
            if ((flags & PhysicsComponent.COLLISIONFLAGS_KINEMATIC_OBJECT) > 0)
                flags = flags ^ PhysicsComponent.COLLISIONFLAGS_KINEMATIC_OBJECT;
            flags = flags | PhysicsComponent.COLLISIONFLAGS_STATIC_OBJECT;
        }
        else {
            if ((flags & PhysicsComponent.COLLISIONFLAGS_STATIC_OBJECT) > 0)
                flags = flags ^ PhysicsComponent.COLLISIONFLAGS_STATIC_OBJECT;
            flags = flags | PhysicsComponent.COLLISIONFLAGS_KINEMATIC_OBJECT;
        }
        bt.btCollisionObject_setCollisionFlags(btColObj, flags);
        this._btColliderObject = btColObj;
        super._onAdded();
    }
}

//# sourceMappingURL=PhysicsCollider.js.map
