import { Physics3DUtils } from "../utils/Physics3DUtils";
import { Utils3D } from "../utils/Utils3D";
import { PhysicsComponent } from "./PhysicsComponent";
import { PhysicsTriggerComponent } from "./PhysicsTriggerComponent";
import { ILaya3D } from "../../../ILaya3D";
import { MeshColliderShape } from "./shape/MeshColliderShape";
import { Vector3 } from "../../maths/Vector3";
export class Rigidbody3D extends PhysicsTriggerComponent {
    constructor(collisionGroup = Physics3DUtils.COLLISIONFILTERGROUP_DEFAULTFILTER, canCollideWith = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER) {
        super(collisionGroup, canCollideWith);
        this._isKinematic = false;
        this._mass = 1.0;
        this._gravity = new Vector3(0, -10, 0);
        this._angularDamping = 0.0;
        this._linearDamping = 0.0;
        this._overrideGravity = false;
        this._totalTorque = new Vector3(0, 0, 0);
        this._totalForce = new Vector3(0, 0, 0);
        this._linearVelocity = new Vector3();
        this._angularVelocity = new Vector3();
        this._linearFactor = new Vector3(1, 1, 1);
        this._angularFactor = new Vector3(1, 1, 1);
        this._detectCollisions = true;
        this._controlBySimulation = true;
    }
    static __init__() {
        var bt = ILaya3D.Physics3D._bullet;
        Rigidbody3D._btTempVector30 = bt.btVector3_create(0, 0, 0);
        Rigidbody3D._btTempVector31 = bt.btVector3_create(0, 0, 0);
        Rigidbody3D._btVector3Zero = bt.btVector3_create(0, 0, 0);
        Rigidbody3D._btInertia = bt.btVector3_create(0, 0, 0);
        Rigidbody3D._btImpulse = bt.btVector3_create(0, 0, 0);
        Rigidbody3D._btImpulseOffset = bt.btVector3_create(0, 0, 0);
        Rigidbody3D._btGravity = bt.btVector3_create(0, 0, 0);
        Rigidbody3D._btTransform0 = bt.btTransform_create();
    }
    get mass() {
        return this._mass;
    }
    set mass(value) {
        value = Math.max(value, 1e-07);
        this._mass = value;
        (this._isKinematic) || (this._updateMass(value));
    }
    getCollisionFlags() {
        var bt = ILaya3D.Physics3D._bullet;
        if (!this._btColliderObject)
            return 0;
        return bt.btCollisionObject_getCollisionFlags(this._btColliderObject);
    }
    get isKinematic() {
        return this._isKinematic;
    }
    set isKinematic(value) {
        this._isKinematic = value;
        this._controlBySimulation = !value;
        var bt = ILaya3D.Physics3D._bullet;
        var canInSimulation = !!(this._simulation && this._enabled && this._colliderShape);
        canInSimulation && this._removeFromSimulation();
        var natColObj = this._btColliderObject;
        var flags = bt.btCollisionObject_getCollisionFlags(natColObj);
        if (value) {
            flags = flags | PhysicsComponent.COLLISIONFLAGS_KINEMATIC_OBJECT;
            bt.btCollisionObject_setCollisionFlags(natColObj, flags);
            bt.btCollisionObject_forceActivationState(this._btColliderObject, PhysicsComponent.ACTIVATIONSTATE_DISABLE_DEACTIVATION);
            this._enableProcessCollisions = false;
            this._updateMass(0);
        }
        else {
            if ((flags & PhysicsComponent.COLLISIONFLAGS_KINEMATIC_OBJECT) > 0)
                flags = flags ^ PhysicsComponent.COLLISIONFLAGS_KINEMATIC_OBJECT;
            bt.btCollisionObject_setCollisionFlags(natColObj, flags);
            bt.btCollisionObject_setActivationState(this._btColliderObject, PhysicsComponent.ACTIVATIONSTATE_ACTIVE_TAG);
            this._enableProcessCollisions = true;
            this._updateMass(this._mass);
        }
        var btZero = Rigidbody3D._btVector3Zero;
        bt.btCollisionObject_setInterpolationLinearVelocity(natColObj, btZero);
        bt.btRigidBody_setLinearVelocity(natColObj, btZero);
        bt.btCollisionObject_setInterpolationAngularVelocity(natColObj, btZero);
        bt.btRigidBody_setAngularVelocity(natColObj, btZero);
        canInSimulation && this._addToSimulation();
    }
    get linearDamping() {
        return this._linearDamping;
    }
    set linearDamping(value) {
        this._linearDamping = value;
        if (this._btColliderObject)
            ILaya3D.Physics3D._bullet.btRigidBody_setDamping(this._btColliderObject, value, this._angularDamping);
    }
    get angularDamping() {
        return this._angularDamping;
    }
    set angularDamping(value) {
        this._angularDamping = value;
        if (this._btColliderObject)
            ILaya3D.Physics3D._bullet.btRigidBody_setDamping(this._btColliderObject, this._linearDamping, value);
    }
    get overrideGravity() {
        return this._overrideGravity;
    }
    set overrideGravity(value) {
        this._overrideGravity = value;
        var bt = ILaya3D.Physics3D._bullet;
        if (this._btColliderObject) {
            var flag = bt.btRigidBody_getFlags(this._btColliderObject);
            if (value) {
                if ((flag & Rigidbody3D._BT_DISABLE_WORLD_GRAVITY) === 0)
                    bt.btRigidBody_setFlags(this._btColliderObject, flag | Rigidbody3D._BT_DISABLE_WORLD_GRAVITY);
            }
            else {
                if ((flag & Rigidbody3D._BT_DISABLE_WORLD_GRAVITY) > 0)
                    bt.btRigidBody_setFlags(this._btColliderObject, flag ^ Rigidbody3D._BT_DISABLE_WORLD_GRAVITY);
            }
        }
    }
    get gravity() {
        var bt = ILaya3D.Physics3D._bullet;
        Rigidbody3D._btGravity = bt.btRigidBody_getGravity(this._btColliderObject);
        Utils3D._convertToLayaVec3(Rigidbody3D._btGravity, this._gravity);
        return this._gravity;
    }
    set gravity(value) {
        this._gravity = value;
        var bt = ILaya3D.Physics3D._bullet;
        bt.btVector3_setValue(Rigidbody3D._btGravity, value.x, value.y, value.z);
        bt.btRigidBody_setGravity(this._btColliderObject, Rigidbody3D._btGravity);
    }
    get totalForce() {
        if (this._btColliderObject) {
            var btTotalForce = ILaya3D.Physics3D._bullet.btRigidBody_getTotalForce(this._btColliderObject);
            Utils3D._convertToLayaVec3(btTotalForce, this._totalForce);
            return this._totalForce;
        }
        return null;
    }
    get linearFactor() {
        return this._linearFactor;
    }
    set linearFactor(value) {
        this._linearFactor = value;
        var btValue = Rigidbody3D._btTempVector30;
        Utils3D._convertToBulletVec3(value, btValue);
        ILaya3D.Physics3D._bullet.btRigidBody_setLinearFactor(this._btColliderObject, btValue);
    }
    get linearVelocity() {
        if (this._btColliderObject)
            Utils3D._convertToLayaVec3(ILaya3D.Physics3D._bullet.btRigidBody_getLinearVelocity(this._btColliderObject), this._linearVelocity);
        return this._linearVelocity;
    }
    set linearVelocity(value) {
        this._linearVelocity = value;
        if (this._btColliderObject) {
            var btValue = Rigidbody3D._btTempVector30;
            Utils3D._convertToBulletVec3(value, btValue);
            (this.isSleeping) && (this.wakeUp());
            ILaya3D.Physics3D._bullet.btRigidBody_setLinearVelocity(this._btColliderObject, btValue);
        }
    }
    get angularFactor() {
        return this._angularFactor;
    }
    set angularFactor(value) {
        this._angularFactor = value;
        var btValue = Rigidbody3D._btTempVector30;
        Utils3D._convertToBulletVec3(value, btValue);
        ILaya3D.Physics3D._bullet.btRigidBody_setAngularFactor(this._btColliderObject, btValue);
    }
    get angularVelocity() {
        if (this._btColliderObject)
            Utils3D._convertToLayaVec3(ILaya3D.Physics3D._bullet.btRigidBody_getAngularVelocity(this._btColliderObject), this._angularVelocity);
        return this._angularVelocity;
    }
    set angularVelocity(value) {
        this._angularVelocity = value;
        if (this._btColliderObject) {
            var btValue = Rigidbody3D._btTempVector30;
            Utils3D._convertToBulletVec3(value, btValue);
            (this.isSleeping) && (this.wakeUp());
            ILaya3D.Physics3D._bullet.btRigidBody_setAngularVelocity(this._btColliderObject, btValue);
        }
    }
    get totalTorque() {
        if (this._btColliderObject) {
            var btTotalTorque = ILaya3D.Physics3D._bullet.btRigidBody_getTotalTorque(this._btColliderObject);
            Utils3D._convertToLayaVec3(btTotalTorque, this._totalTorque);
            return this._totalTorque;
        }
        return null;
    }
    get detectCollisions() {
        return this._detectCollisions;
    }
    set detectCollisions(value) {
        if (this._detectCollisions !== value) {
            this._detectCollisions = value;
            if (this._colliderShape && this._enabled && this._simulation) {
                this._simulation._removeRigidBody(this);
                this._simulation._addRigidBody(this, this._collisionGroup, value ? this._canCollideWith : 0);
            }
        }
    }
    get isSleeping() {
        if (this._btColliderObject)
            return ILaya3D.Physics3D._bullet.btCollisionObject_getActivationState(this._btColliderObject) === PhysicsComponent.ACTIVATIONSTATE_ISLAND_SLEEPING;
        return false;
    }
    get sleepLinearVelocity() {
        return ILaya3D.Physics3D._bullet.btRigidBody_getLinearSleepingThreshold(this._btColliderObject);
    }
    set sleepLinearVelocity(value) {
        var bt = ILaya3D.Physics3D._bullet;
        bt.btRigidBody_setSleepingThresholds(this._btColliderObject, value, bt.btRigidBody_getAngularSleepingThreshold(this._btColliderObject));
    }
    get sleepAngularVelocity() {
        return ILaya3D.Physics3D._bullet.btRigidBody_getAngularSleepingThreshold(this._btColliderObject);
    }
    set sleepAngularVelocity(value) {
        var bt = ILaya3D.Physics3D._bullet;
        bt.btRigidBody_setSleepingThresholds(this._btColliderObject, bt.btRigidBody_getLinearSleepingThreshold(this._btColliderObject), value);
    }
    get btColliderObject() {
        return this._btColliderObject;
    }
    set position(pos) {
        var bt = ILaya3D.Physics3D._bullet;
        var btColliderObject = this._btColliderObject;
        bt.btRigidBody_setCenterOfMassPos(btColliderObject, pos.x, pos.y, pos.z);
    }
    get position() {
        return this.getPhysicsPosition();
    }
    set orientation(q) {
        var bt = ILaya3D.Physics3D._bullet;
        var btColliderObject = this._btColliderObject;
        bt.btRigidBody_setCenterOfMassOrientation(btColliderObject, q.x, q.y, q.z, q.w);
    }
    get orientation() {
        return this.getPhysicsOrientation();
    }
    _updateMass(mass) {
        if (this._btColliderObject && this._colliderShape && this._colliderShape._btShape) {
            var bt = ILaya3D.Physics3D._bullet;
            bt.btCollisionShape_calculateLocalInertia(this._colliderShape._btShape, mass, Rigidbody3D._btInertia);
            bt.btRigidBody_setMassProps(this._btColliderObject, mass, Rigidbody3D._btInertia);
            bt.btRigidBody_updateInertiaTensor(this._btColliderObject);
        }
    }
    _onScaleChange(scale) {
        super._onScaleChange(scale);
        this._updateMass(this._isKinematic ? 0 : this._mass);
    }
    _derivePhysicsTransformation(force) {
        var bt = ILaya3D.Physics3D._bullet;
        var btColliderObject = this._btColliderObject;
        var oriTransform = bt.btCollisionObject_getWorldTransform(btColliderObject);
        var transform = Rigidbody3D._btTransform0;
        bt.btTransform_equal(transform, oriTransform);
        this._innerDerivePhysicsTransformation(transform, force);
        bt.btRigidBody_setCenterOfMassTransform(btColliderObject, transform);
    }
    _initRigidbody(motionid) {
        var bt = ILaya3D.Physics3D._bullet;
        var motionState = bt.layaMotionState_create();
        bt.layaMotionState_set_rigidBodyID(motionState, motionid);
        this._btLayaMotionState = motionState;
        var constructInfo = bt.btRigidBodyConstructionInfo_create(0.0, motionState, null, Rigidbody3D._btVector3Zero);
        var btRigid = bt.btRigidBody_create(constructInfo);
        bt.btCollisionObject_setUserIndex(btRigid, this.id);
        this._btColliderObject = btRigid;
        bt.btRigidBodyConstructionInfo_destroy(constructInfo);
    }
    _onAdded() {
        this._initRigidbody(this.id);
        super._onAdded();
        this.mass = this._mass;
        this.linearFactor = this._linearFactor;
        this.angularFactor = this._angularFactor;
        this.linearDamping = this._linearDamping;
        this.angularDamping = this._angularDamping;
        this.overrideGravity = this._overrideGravity;
        this.gravity = this._gravity;
        this.isKinematic = this._isKinematic;
    }
    _onDestroy() {
        ILaya3D.Physics3D._bullet.btMotionState_destroy(this._btLayaMotionState);
        super._onDestroy();
        this._btLayaMotionState = null;
        this._gravity = null;
        this._totalTorque = null;
        this._linearVelocity = null;
        this._angularVelocity = null;
        this._linearFactor = null;
        this._angularFactor = null;
    }
    set colliderShape(value) {
        if (value instanceof MeshColliderShape) {
            value = null;
            console.error("RigidBody3D is not support MeshColliderShape");
        }
        super.colliderShape = value;
    }
    get colliderShape() {
        return this._colliderShape;
    }
    _onShapeChange(colShape) {
        super._onShapeChange(colShape);
        if (this.mass <= 0)
            return;
        if (this._isKinematic) {
            this._updateMass(0);
        }
        else {
            var bt = ILaya3D.Physics3D._bullet;
            bt.btRigidBody_setCenterOfMassTransform(this._btColliderObject, bt.btCollisionObject_getWorldTransform(this._btColliderObject));
            this._updateMass(this._mass);
        }
    }
    _parse(data) {
        (data.friction != null) && (this.friction = data.friction);
        (data.rollingFriction != null) && (this.rollingFriction = data.rollingFriction);
        (data.restitution != null) && (this.restitution = data.restitution);
        (data.isTrigger != null) && (this.isTrigger = data.isTrigger);
        (data.mass != null) && (this.mass = data.mass);
        (data.linearDamping != null) && (this.linearDamping = data.linearDamping);
        (data.angularDamping != null) && (this.angularDamping = data.angularDamping);
        (data.overrideGravity != null) && (this.overrideGravity = data.overrideGravity);
        if (data.linearFactor != null) {
            var linFac = this.linearFactor;
            linFac.fromArray(data.linearFactor);
            this.linearFactor = linFac;
        }
        if (data.angularFactor != null) {
            var angFac = this.angularFactor;
            angFac.fromArray(data.angularFactor);
            this.angularFactor = angFac;
        }
        if (data.gravity) {
            this.gravity.fromArray(data.gravity);
            this.gravity = this.gravity;
        }
        super._parse(data);
        this._parseShape(data.shapes);
        (data.isKinematic != null) && (this.isKinematic = data.isKinematic);
    }
    _addToSimulation() {
        this._simulation._addRigidBody(this, this._collisionGroup, this._detectCollisions ? this._canCollideWith : 0);
    }
    _removeFromSimulation() {
        this._simulation._removeRigidBody(this);
    }
    _cloneTo(dest) {
        super._cloneTo(dest);
        var destRigidbody3D = dest;
        destRigidbody3D.isKinematic = this._isKinematic;
        destRigidbody3D.mass = this._mass;
        destRigidbody3D.gravity = this._gravity;
        destRigidbody3D.angularDamping = this._angularDamping;
        destRigidbody3D.linearDamping = this._linearDamping;
        destRigidbody3D.overrideGravity = this._overrideGravity;
        destRigidbody3D.linearVelocity = this._linearVelocity;
        destRigidbody3D.angularVelocity = this._angularVelocity;
        destRigidbody3D.linearFactor = this._linearFactor;
        destRigidbody3D.angularFactor = this._angularFactor;
        destRigidbody3D.detectCollisions = this._detectCollisions;
    }
    applyForce(force, localOffset = null) {
        this.applyForceXYZ(force.x, force.y, force.z, localOffset);
    }
    applyForceXYZ(fx, fy, fz, localOffset = null) {
        if (this._btColliderObject == null)
            throw "Attempted to call a Physics function that is avaliable only when the Entity has been already added to the Scene.";
        var bt = ILaya3D.Physics3D._bullet;
        var btForce = Rigidbody3D._btTempVector30;
        bt.btVector3_setValue(btForce, fx, fy, fz);
        this.wakeUp();
        if (localOffset) {
            var btOffset = Rigidbody3D._btTempVector31;
            bt.btVector3_setValue(btOffset, localOffset.x, localOffset.y, localOffset.z);
            bt.btRigidBody_applyForce(this._btColliderObject, btForce, btOffset);
        }
        else {
            bt.btRigidBody_applyCentralForce(this._btColliderObject, btForce);
        }
    }
    setCollisionFlags(flags) {
        var bt = ILaya3D.Physics3D._bullet;
        var canInSimulation = !!(this._simulation && this._enabled);
        canInSimulation && this._removeFromSimulation();
        if (flags & 3) {
            this._isKinematic = true;
            this._simulation && this._updateMass(0);
        }
        else {
            this._simulation && this._updateMass(this._mass);
        }
        bt.btCollisionObject_setCollisionFlags(this._btColliderObject, flags);
        canInSimulation && this._addToSimulation();
    }
    applyTorque(torque) {
        if (this._btColliderObject == null)
            throw "Attempted to call a Physics function that is avaliable only when the Entity has been already added to the Scene.";
        var bullet = ILaya3D.Physics3D._bullet;
        var btTorque = Rigidbody3D._btTempVector30;
        this.wakeUp();
        bullet.btVector3_setValue(btTorque, torque.x, torque.y, torque.z);
        bullet.btRigidBody_applyTorque(this._btColliderObject, btTorque);
    }
    applyImpulse(impulse, localOffset = null) {
        if (this._btColliderObject == null)
            throw "Attempted to call a Physics function that is avaliable only when the Entity has been already added to the Scene.";
        var bt = ILaya3D.Physics3D._bullet;
        bt.btVector3_setValue(Rigidbody3D._btImpulse, impulse.x, impulse.y, impulse.z);
        this.wakeUp();
        if (localOffset) {
            bt.btVector3_setValue(Rigidbody3D._btImpulseOffset, localOffset.x, localOffset.y, localOffset.z);
            bt.btRigidBody_applyImpulse(this._btColliderObject, Rigidbody3D._btImpulse, Rigidbody3D._btImpulseOffset);
        }
        else {
            bt.btRigidBody_applyCentralImpulse(this._btColliderObject, Rigidbody3D._btImpulse);
        }
    }
    applyTorqueImpulse(torqueImpulse) {
        if (this._btColliderObject == null)
            throw "Attempted to call a Physics function that is avaliable only when the Entity has been already added to the Scene.";
        var bt = ILaya3D.Physics3D._bullet;
        var btTorqueImpulse = Rigidbody3D._btTempVector30;
        this.wakeUp();
        bt.btVector3_setValue(btTorqueImpulse, torqueImpulse.x, torqueImpulse.y, torqueImpulse.z);
        bt.btRigidBody_applyTorqueImpulse(this._btColliderObject, btTorqueImpulse);
    }
    wakeUp() {
        this._btColliderObject && (ILaya3D.Physics3D._bullet.btCollisionObject_activate(this._btColliderObject, false));
    }
    clearForces() {
        var rigidBody = this._btColliderObject;
        if (rigidBody == null)
            throw "Attempted to call a Physics function that is avaliable only when the Entity has been already added to the Scene.";
        var bt = ILaya3D.Physics3D._bullet;
        bt.btRigidBody_clearForces(rigidBody);
        var btZero = Rigidbody3D._btVector3Zero;
        bt.btCollisionObject_setInterpolationLinearVelocity(rigidBody, btZero);
        bt.btRigidBody_setLinearVelocity(rigidBody, btZero);
        bt.btCollisionObject_setInterpolationAngularVelocity(rigidBody, btZero);
        bt.btRigidBody_setAngularVelocity(rigidBody, btZero);
    }
}
Rigidbody3D.TYPE_STATIC = 0;
Rigidbody3D.TYPE_DYNAMIC = 1;
Rigidbody3D.TYPE_KINEMATIC = 2;
Rigidbody3D._BT_DISABLE_WORLD_GRAVITY = 1;
Rigidbody3D._BT_ENABLE_GYROPSCOPIC_FORCE = 2;

//# sourceMappingURL=Rigidbody3D.js.map
