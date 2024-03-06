import { Physics3DUtils } from "../utils/Physics3DUtils";
import { CharacterController } from "./CharacterController";
import { PhysicsUpdateList } from "./PhysicsUpdateList";
import { CollisionTool } from "./CollisionTool";
import { PhysicsComponent } from "./PhysicsComponent";
import { ILaya3D } from "../../../ILaya3D";
import { RaycastVehicle } from "./RaycastVehicle";
import { NodeFlags } from "../../Const";
import { Event } from "../../events/Event";
import { Vector3 } from "../../maths/Vector3";
export class PhysicsSimulation {
    constructor(configuration) {
        this._updateCount = 0;
        this._gravity = new Vector3(0, -10, 0);
        this._btVector3Zero = ILaya3D.Physics3D._bullet.btVector3_create(0, 0, 0);
        this._btDefaultQuaternion = ILaya3D.Physics3D._bullet.btQuaternion_create(0, 0, 0, -1);
        this._collisionsUtils = new CollisionTool();
        this._previousFrameCollisions = [];
        this._currentFrameCollisions = [];
        this._currentConstraint = {};
        this._physicsUpdateList = new PhysicsUpdateList();
        this._characters = [];
        this._updatedRigidbodies = 0;
        this.maxSubSteps = 1;
        this.fixedTimeStep = 1.0 / 60.0;
        this.dt = 1 / 60;
        this.maxSubSteps = configuration.maxSubSteps;
        this.fixedTimeStep = configuration.fixedTimeStep;
        var bt = ILaya3D.Physics3D._bullet;
        this._btCollisionConfiguration = bt.btDefaultCollisionConfiguration_create();
        this._btDispatcher = bt.btCollisionDispatcher_create(this._btCollisionConfiguration);
        this._btBroadphase = bt.btDbvtBroadphase_create();
        bt.btOverlappingPairCache_setInternalGhostPairCallback(bt.btDbvtBroadphase_getOverlappingPairCache(this._btBroadphase), bt.btGhostPairCallback_create());
        var conFlags = configuration.flags;
        if (conFlags & PhysicsSimulation.PHYSICSENGINEFLAGS_COLLISIONSONLY) {
            this._btCollisionWorld = new bt.btCollisionWorld(this._btDispatcher, this._btBroadphase, this._btCollisionConfiguration);
        }
        else if (conFlags & PhysicsSimulation.PHYSICSENGINEFLAGS_SOFTBODYSUPPORT) {
            throw "PhysicsSimulation:SoftBody processing is not yet available";
        }
        else {
            var solver = bt.btSequentialImpulseConstraintSolver_create();
            this._btDiscreteDynamicsWorld = bt.btDiscreteDynamicsWorld_create(this._btDispatcher, this._btBroadphase, solver, this._btCollisionConfiguration);
            this._btCollisionWorld = this._btDiscreteDynamicsWorld;
        }
        if (this._btDiscreteDynamicsWorld) {
            this._btSolverInfo = bt.btDynamicsWorld_getSolverInfo(this._btDiscreteDynamicsWorld);
            this._btDispatchInfo = bt.btCollisionWorld_getDispatchInfo(this._btDiscreteDynamicsWorld);
        }
        this._btClosestRayResultCallback = bt.ClosestRayResultCallback_create(this._btVector3Zero, this._btVector3Zero);
        this._btAllHitsRayResultCallback = bt.AllHitsRayResultCallback_create(this._btVector3Zero, this._btVector3Zero);
        this._btClosestConvexResultCallback = bt.ClosestConvexResultCallback_create(this._btVector3Zero, this._btVector3Zero);
        this._btAllConvexResultCallback = bt.AllConvexResultCallback_create(this._btVector3Zero, this._btVector3Zero);
        bt.btGImpactCollisionAlgorithm_RegisterAlgorithm(this._btDispatcher);
    }
    static __init__() {
        var bt = ILaya3D.Physics3D._bullet;
        PhysicsSimulation._btTempVector30 = bt.btVector3_create(0, 0, 0);
        PhysicsSimulation._btTempVector31 = bt.btVector3_create(0, 0, 0);
        PhysicsSimulation._btTempQuaternion0 = bt.btQuaternion_create(0, 0, 0, 1);
        PhysicsSimulation._btTempQuaternion1 = bt.btQuaternion_create(0, 0, 0, 1);
        PhysicsSimulation._btTempTransform0 = bt.btTransform_create();
        PhysicsSimulation._btTempTransform1 = bt.btTransform_create();
    }
    static createConstraint() {
    }
    get continuousCollisionDetection() {
        return ILaya3D.Physics3D._bullet.btCollisionWorld_get_m_useContinuous(this._btDispatchInfo);
    }
    set continuousCollisionDetection(value) {
        ILaya3D.Physics3D._bullet.btCollisionWorld_set_m_useContinuous(this._btDispatchInfo, value);
    }
    get gravity() {
        if (!this._btDiscreteDynamicsWorld)
            throw "Simulation:Cannot perform this action when the physics engine is set to CollisionsOnly";
        return this._gravity;
    }
    set gravity(value) {
        if (!this._btDiscreteDynamicsWorld)
            throw "Simulation:Cannot perform this action when the physics engine is set to CollisionsOnly";
        this._gravity = value;
        var bt = ILaya3D.Physics3D._bullet;
        var btGravity = PhysicsSimulation._btTempVector30;
        bt.btVector3_setValue(btGravity, value.x, value.y, value.z);
        bt.btDiscreteDynamicsWorld_setGravity(this._btDiscreteDynamicsWorld, btGravity);
    }
    get speculativeContactRestitution() {
        if (!this._btDiscreteDynamicsWorld)
            throw "Simulation:Cannot Cannot perform this action when the physics engine is set to CollisionsOnly";
        return ILaya3D.Physics3D._bullet.btDiscreteDynamicsWorld_getApplySpeculativeContactRestitution(this._btDiscreteDynamicsWorld);
    }
    set speculativeContactRestitution(value) {
        if (!this._btDiscreteDynamicsWorld)
            throw "Simulation:Cannot Cannot perform this action when the physics engine is set to CollisionsOnly";
        ILaya3D.Physics3D._bullet.btDiscreteDynamicsWorld_setApplySpeculativeContactRestitution(this._btDiscreteDynamicsWorld, value);
    }
    enableDebugDrawer(b) {
        var bt = ILaya3D.Physics3D._bullet;
        bt.btDynamicsWorld_enableDebugDrawer(this._btDiscreteDynamicsWorld, b);
    }
    _simulate(deltaTime) {
        this._updatedRigidbodies = 0;
        this.dt = deltaTime;
        var bt = ILaya3D.Physics3D._bullet;
        if (this._btDiscreteDynamicsWorld)
            bt.btDiscreteDynamicsWorld_stepSimulation(this._btDiscreteDynamicsWorld, deltaTime, this.maxSubSteps, this.fixedTimeStep);
        else
            bt.PerformDiscreteCollisionDetection(this._btCollisionWorld);
        this._updateCount++;
    }
    _destroy() {
        var bt = ILaya3D.Physics3D._bullet;
        if (this._btDiscreteDynamicsWorld) {
            bt.btCollisionWorld_destroy(this._btDiscreteDynamicsWorld);
            this._btDiscreteDynamicsWorld = null;
        }
        else {
            bt.btCollisionWorld_destroy(this._btCollisionWorld);
            this._btCollisionWorld = null;
        }
        bt.btDbvtBroadphase_destroy(this._btBroadphase);
        this._btBroadphase = null;
        bt.btCollisionDispatcher_destroy(this._btDispatcher);
        this._btDispatcher = null;
        bt.btDefaultCollisionConfiguration_destroy(this._btCollisionConfiguration);
        this._btCollisionConfiguration = null;
    }
    _addPhysicsCollider(component, group, mask) {
        ILaya3D.Physics3D._bullet.btCollisionWorld_addCollisionObject(this._btCollisionWorld, component._btColliderObject, group, mask);
    }
    _removePhysicsCollider(component) {
        ILaya3D.Physics3D._bullet.btCollisionWorld_removeCollisionObject(this._btCollisionWorld, component._btColliderObject);
    }
    _addRigidBody(rigidBody, group, mask) {
        if (!this._btDiscreteDynamicsWorld)
            throw "Simulation:Cannot perform this action when the physics engine is set to CollisionsOnly";
        ILaya3D.Physics3D._bullet.btDiscreteDynamicsWorld_addRigidBody(this._btCollisionWorld, rigidBody._btColliderObject, group, mask);
    }
    _removeRigidBody(rigidBody) {
        if (!this._btDiscreteDynamicsWorld)
            throw "Simulation:Cannot perform this action when the physics engine is set to CollisionsOnly";
        ILaya3D.Physics3D._bullet.btDiscreteDynamicsWorld_removeRigidBody(this._btCollisionWorld, rigidBody._btColliderObject);
    }
    _addCharacter(character, group, mask) {
        if (!this._btDiscreteDynamicsWorld)
            throw "Simulation:Cannot perform this action when the physics engine is set to CollisionsOnly";
        var bt = ILaya3D.Physics3D._bullet;
        bt.btCollisionWorld_addCollisionObject(this._btCollisionWorld, character._btColliderObject, group, mask);
        bt.btDynamicsWorld_addAction(this._btCollisionWorld, character._btKinematicCharacter);
    }
    _removeCharacter(character) {
        if (!this._btDiscreteDynamicsWorld)
            throw "Simulation:Cannot perform this action when the physics engine is set to CollisionsOnly";
        var bt = ILaya3D.Physics3D._bullet;
        bt.btCollisionWorld_removeCollisionObject(this._btCollisionWorld, character._btColliderObject);
        bt.btDynamicsWorld_removeAction(this._btCollisionWorld, character._btKinematicCharacter);
    }
    raycastFromTo(from, to, out = null, collisonGroup = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, collisionMask = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER) {
        var bt = ILaya3D.Physics3D._bullet;
        var rayResultCall = this._btClosestRayResultCallback;
        var rayFrom = PhysicsSimulation._btTempVector30;
        var rayTo = PhysicsSimulation._btTempVector31;
        bt.btVector3_setValue(rayFrom, from.x, from.y, from.z);
        bt.btVector3_setValue(rayTo, to.x, to.y, to.z);
        bt.ClosestRayResultCallback_set_m_rayFromWorld(rayResultCall, rayFrom);
        bt.ClosestRayResultCallback_set_m_rayToWorld(rayResultCall, rayTo);
        bt.RayResultCallback_set_m_collisionFilterGroup(rayResultCall, collisonGroup);
        bt.RayResultCallback_set_m_collisionFilterMask(rayResultCall, collisionMask);
        bt.RayResultCallback_set_m_collisionObject(rayResultCall, null);
        bt.RayResultCallback_set_m_closestHitFraction(rayResultCall, 1);
        bt.btCollisionWorld_rayTest(this._btCollisionWorld, rayFrom, rayTo, rayResultCall);
        if (bt.RayResultCallback_hasHit(rayResultCall)) {
            if (out) {
                out.succeeded = true;
                out.collider = PhysicsComponent._physicObjectsMap[bt.btCollisionObject_getUserIndex(bt.RayResultCallback_get_m_collisionObject(rayResultCall))];
                out.hitFraction = bt.RayResultCallback_get_m_closestHitFraction(rayResultCall);
                var btPoint = bt.ClosestRayResultCallback_get_m_hitPointWorld(rayResultCall);
                var point = out.point;
                point.x = bt.btVector3_x(btPoint);
                point.y = bt.btVector3_y(btPoint);
                point.z = bt.btVector3_z(btPoint);
                var btNormal = bt.ClosestRayResultCallback_get_m_hitNormalWorld(rayResultCall);
                var normal = out.normal;
                normal.x = bt.btVector3_x(btNormal);
                normal.y = bt.btVector3_y(btNormal);
                normal.z = bt.btVector3_z(btNormal);
            }
            return true;
        }
        else {
            if (out)
                out.succeeded = false;
            return false;
        }
    }
    raycastAllFromTo(from, to, out, collisonGroup = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, collisionMask = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER) {
        var bt = ILaya3D.Physics3D._bullet;
        var rayResultCall = this._btAllHitsRayResultCallback;
        var rayFrom = PhysicsSimulation._btTempVector30;
        var rayTo = PhysicsSimulation._btTempVector31;
        out.length = 0;
        bt.btVector3_setValue(rayFrom, from.x, from.y, from.z);
        bt.btVector3_setValue(rayTo, to.x, to.y, to.z);
        bt.AllHitsRayResultCallback_set_m_rayFromWorld(rayResultCall, rayFrom);
        bt.AllHitsRayResultCallback_set_m_rayToWorld(rayResultCall, rayTo);
        bt.RayResultCallback_set_m_collisionFilterGroup(rayResultCall, collisonGroup);
        bt.RayResultCallback_set_m_collisionFilterMask(rayResultCall, collisionMask);
        var collisionObjects = bt.AllHitsRayResultCallback_get_m_collisionObjects(rayResultCall);
        var btPoints = bt.AllHitsRayResultCallback_get_m_hitPointWorld(rayResultCall);
        var btNormals = bt.AllHitsRayResultCallback_get_m_hitNormalWorld(rayResultCall);
        var btFractions = bt.AllHitsRayResultCallback_get_m_hitFractions(rayResultCall);
        bt.tBtCollisionObjectArray_clear(collisionObjects);
        bt.tVector3Array_clear(btPoints);
        bt.tVector3Array_clear(btNormals);
        bt.tScalarArray_clear(btFractions);
        bt.btCollisionWorld_rayTest(this._btCollisionWorld, rayFrom, rayTo, rayResultCall);
        var count = bt.tBtCollisionObjectArray_size(collisionObjects);
        if (count > 0) {
            this._collisionsUtils.recoverAllHitResultsPool();
            for (var i = 0; i < count; i++) {
                var hitResult = this._collisionsUtils.getHitResult();
                out.push(hitResult);
                hitResult.succeeded = true;
                hitResult.collider = PhysicsComponent._physicObjectsMap[bt.btCollisionObject_getUserIndex(bt.tBtCollisionObjectArray_at(collisionObjects, i))];
                hitResult.hitFraction = bt.tScalarArray_at(btFractions, i);
                var btPoint = bt.tVector3Array_at(btPoints, i);
                var pointE = hitResult.point;
                pointE.x = bt.btVector3_x(btPoint);
                pointE.y = bt.btVector3_y(btPoint);
                pointE.z = bt.btVector3_z(btPoint);
                var btNormal = bt.tVector3Array_at(btNormals, i);
                var normal = hitResult.normal;
                normal.x = bt.btVector3_x(btNormal);
                normal.y = bt.btVector3_y(btNormal);
                normal.z = bt.btVector3_z(btNormal);
            }
            return true;
        }
        else {
            return false;
        }
    }
    rayCast(ray, outHitResult = null, distance = 2147483647, collisonGroup = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, collisionMask = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER) {
        var from = ray.origin;
        var to = PhysicsSimulation._tempVector30;
        Vector3.normalize(ray.direction, to);
        Vector3.scale(to, distance, to);
        Vector3.add(from, to, to);
        return this.raycastFromTo(from, to, outHitResult, collisonGroup, collisionMask);
    }
    rayCastAll(ray, out, distance = 2147483647, collisonGroup = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, collisionMask = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER) {
        var from = ray.origin;
        var to = PhysicsSimulation._tempVector30;
        Vector3.normalize(ray.direction, to);
        Vector3.scale(to, distance, to);
        Vector3.add(from, to, to);
        return this.raycastAllFromTo(from, to, out, collisonGroup, collisionMask);
    }
    shapeCast(shape, fromPosition, toPosition, out = null, fromRotation = null, toRotation = null, collisonGroup = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, collisionMask = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, allowedCcdPenetration = 0.0) {
        var bt = ILaya3D.Physics3D._bullet;
        var convexResultCall = this._btClosestConvexResultCallback;
        var convexPosFrom = PhysicsSimulation._btTempVector30;
        var convexPosTo = PhysicsSimulation._btTempVector31;
        var convexRotFrom = PhysicsSimulation._btTempQuaternion0;
        var convexRotTo = PhysicsSimulation._btTempQuaternion1;
        var convexTransform = PhysicsSimulation._btTempTransform0;
        var convexTransTo = PhysicsSimulation._btTempTransform1;
        var sweepShape = shape._btShape;
        bt.btVector3_setValue(convexPosFrom, fromPosition.x, fromPosition.y, fromPosition.z);
        bt.btVector3_setValue(convexPosTo, toPosition.x, toPosition.y, toPosition.z);
        bt.ConvexResultCallback_set_m_collisionFilterGroup(convexResultCall, collisonGroup);
        bt.ConvexResultCallback_set_m_collisionFilterMask(convexResultCall, collisionMask);
        bt.btTransform_setOrigin(convexTransform, convexPosFrom);
        bt.btTransform_setOrigin(convexTransTo, convexPosTo);
        if (fromRotation) {
            bt.btQuaternion_setValue(convexRotFrom, fromRotation.x, fromRotation.y, fromRotation.z, fromRotation.w);
            bt.btTransform_setRotation(convexTransform, convexRotFrom);
        }
        else {
            bt.btTransform_setRotation(convexTransform, this._btDefaultQuaternion);
        }
        if (toRotation) {
            bt.btQuaternion_setValue(convexRotTo, toRotation.x, toRotation.y, toRotation.z, toRotation.w);
            bt.btTransform_setRotation(convexTransTo, convexRotTo);
        }
        else {
            bt.btTransform_setRotation(convexTransTo, this._btDefaultQuaternion);
        }
        bt.ClosestConvexResultCallback_set_m_hitCollisionObject(convexResultCall, null);
        bt.ConvexResultCallback_set_m_closestHitFraction(convexResultCall, 1);
        bt.btCollisionWorld_convexSweepTest(this._btCollisionWorld, sweepShape, convexTransform, convexTransTo, convexResultCall, allowedCcdPenetration);
        if (bt.ConvexResultCallback_hasHit(convexResultCall)) {
            if (out) {
                out.succeeded = true;
                out.collider = PhysicsComponent._physicObjectsMap[bt.btCollisionObject_getUserIndex(bt.ClosestConvexResultCallback_get_m_hitCollisionObject(convexResultCall))];
                out.hitFraction = bt.ConvexResultCallback_get_m_closestHitFraction(convexResultCall);
                var btPoint = bt.ClosestConvexResultCallback_get_m_hitPointWorld(convexResultCall);
                var btNormal = bt.ClosestConvexResultCallback_get_m_hitNormalWorld(convexResultCall);
                var point = out.point;
                var normal = out.normal;
                point.x = bt.btVector3_x(btPoint);
                point.y = bt.btVector3_y(btPoint);
                point.z = bt.btVector3_z(btPoint);
                normal.x = bt.btVector3_x(btNormal);
                normal.y = bt.btVector3_y(btNormal);
                normal.z = bt.btVector3_z(btNormal);
            }
            return true;
        }
        else {
            if (out)
                out.succeeded = false;
            return false;
        }
    }
    shapeCastAll(shape, fromPosition, toPosition, out, fromRotation = null, toRotation = null, collisonGroup = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, collisionMask = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, allowedCcdPenetration = 0.0) {
        var bt = ILaya3D.Physics3D._bullet;
        var convexResultCall = this._btAllConvexResultCallback;
        var convexPosFrom = PhysicsSimulation._btTempVector30;
        var convexPosTo = PhysicsSimulation._btTempVector31;
        var convexRotFrom = PhysicsSimulation._btTempQuaternion0;
        var convexRotTo = PhysicsSimulation._btTempQuaternion1;
        var convexTransform = PhysicsSimulation._btTempTransform0;
        var convexTransTo = PhysicsSimulation._btTempTransform1;
        var sweepShape = shape._btShape;
        out.length = 0;
        bt.btVector3_setValue(convexPosFrom, fromPosition.x, fromPosition.y, fromPosition.z);
        bt.btVector3_setValue(convexPosTo, toPosition.x, toPosition.y, toPosition.z);
        bt.ConvexResultCallback_set_m_collisionFilterGroup(convexResultCall, collisonGroup);
        bt.ConvexResultCallback_set_m_collisionFilterMask(convexResultCall, collisionMask);
        bt.btTransform_setOrigin(convexTransform, convexPosFrom);
        bt.btTransform_setOrigin(convexTransTo, convexPosTo);
        if (fromRotation) {
            bt.btQuaternion_setValue(convexRotFrom, fromRotation.x, fromRotation.y, fromRotation.z, fromRotation.w);
            bt.btTransform_setRotation(convexTransform, convexRotFrom);
        }
        else {
            bt.btTransform_setRotation(convexTransform, this._btDefaultQuaternion);
        }
        if (toRotation) {
            bt.btQuaternion_setValue(convexRotTo, toRotation.x, toRotation.y, toRotation.z, toRotation.w);
            bt.btTransform_setRotation(convexTransTo, convexRotTo);
        }
        else {
            bt.btTransform_setRotation(convexTransTo, this._btDefaultQuaternion);
        }
        var collisionObjects = bt.AllConvexResultCallback_get_m_collisionObjects(convexResultCall);
        var btPoints = bt.AllConvexResultCallback_get_m_hitPointWorld(convexResultCall);
        var btNormals = bt.AllConvexResultCallback_get_m_hitNormalWorld(convexResultCall);
        var btFractions = bt.AllConvexResultCallback_get_m_hitFractions(convexResultCall);
        bt.tVector3Array_clear(btPoints);
        bt.tVector3Array_clear(btNormals);
        bt.tScalarArray_clear(btFractions);
        bt.tBtCollisionObjectArray_clear(collisionObjects);
        bt.btCollisionWorld_convexSweepTest(this._btCollisionWorld, sweepShape, convexTransform, convexTransTo, convexResultCall, allowedCcdPenetration);
        var count = bt.tBtCollisionObjectArray_size(collisionObjects);
        if (count > 0) {
            this._collisionsUtils.recoverAllHitResultsPool();
            for (var i = 0; i < count; i++) {
                var hitResult = this._collisionsUtils.getHitResult();
                out.push(hitResult);
                hitResult.succeeded = true;
                hitResult.collider = PhysicsComponent._physicObjectsMap[bt.btCollisionObject_getUserIndex(bt.tBtCollisionObjectArray_at(collisionObjects, i))];
                hitResult.hitFraction = bt.tScalarArray_at(btFractions, i);
                var btPoint = bt.tVector3Array_at(btPoints, i);
                var point = hitResult.point;
                point.x = bt.btVector3_x(btPoint);
                point.y = bt.btVector3_y(btPoint);
                point.z = bt.btVector3_z(btPoint);
                var btNormal = bt.tVector3Array_at(btNormals, i);
                var normal = hitResult.normal;
                normal.x = bt.btVector3_x(btNormal);
                normal.y = bt.btVector3_y(btNormal);
                normal.z = bt.btVector3_z(btNormal);
            }
            return true;
        }
        else {
            return false;
        }
    }
    addConstraint(constraint, disableCollisionsBetweenLinkedBodies = false) {
        if (!this._btDiscreteDynamicsWorld)
            throw "Cannot perform this action when the physics engine is set to CollisionsOnly";
        ILaya3D.Physics3D._bullet.btCollisionWorld_addConstraint(this._btDiscreteDynamicsWorld, constraint._btConstraint, disableCollisionsBetweenLinkedBodies);
        this._currentConstraint[constraint.id] = constraint;
    }
    removeConstraint(constraint) {
        if (!this._btDiscreteDynamicsWorld)
            throw "Cannot perform this action when the physics engine is set to CollisionsOnly";
        ILaya3D.Physics3D._bullet.btCollisionWorld_removeConstraint(this._btDiscreteDynamicsWorld, constraint._btConstraint);
        delete this._currentConstraint[constraint.id];
    }
    setHitsRayResultCallbackFlag(flag = 1) {
        var bt = ILaya3D.Physics3D._bullet;
        bt.RayResultCallback_set_m_flags(this._btAllHitsRayResultCallback, flag);
        bt.RayResultCallback_set_m_flags(this._btClosestRayResultCallback, flag);
    }
    _updatePhysicsTransformFromRender() {
        var elements = this._physicsUpdateList.elements;
        for (var i = 0, n = this._physicsUpdateList.length; i < n; i++) {
            var physicCollider = elements[i];
            physicCollider._derivePhysicsTransformation(false);
            physicCollider._inPhysicUpdateListIndex = -1;
        }
        this._physicsUpdateList.length = 0;
    }
    _updateCharacters() {
        let bt = ILaya3D.Physics3D._bullet;
        for (var i = 0, n = this._characters.length; i < n; i++) {
            var character = this._characters[i];
            character._updateTransformComponent(bt.btCollisionObject_getWorldTransform(character._btColliderObject), false, 0.04);
        }
    }
    _updateCollisions() {
        this._collisionsUtils.recoverAllContactPointsPool();
        var previous = this._currentFrameCollisions;
        this._currentFrameCollisions = this._previousFrameCollisions;
        this._currentFrameCollisions.length = 0;
        this._previousFrameCollisions = previous;
        var loopCount = this._updateCount;
        var bt = ILaya3D.Physics3D._bullet;
        var numManifolds = bt.btDispatcher_getNumManifolds(this._btDispatcher);
        for (let i = 0; i < numManifolds; i++) {
            var contactManifold = bt.btDispatcher_getManifoldByIndexInternal(this._btDispatcher, i);
            var componentA = PhysicsComponent._physicObjectsMap[bt.btCollisionObject_getUserIndex(bt.btPersistentManifold_getBody0(contactManifold))];
            var componentB = PhysicsComponent._physicObjectsMap[bt.btCollisionObject_getUserIndex(bt.btPersistentManifold_getBody1(contactManifold))];
            if (componentA.id > componentB.id) {
                let tt = componentA;
                componentA = componentB;
                componentB = tt;
            }
            var collision = null;
            var isFirstCollision;
            var contacts = null;
            var isTrigger = componentA.isTrigger || componentB.isTrigger;
            if (isTrigger) {
                if (componentA.owner._getBit(NodeFlags.PROCESS_TRIGGERS) || componentB.owner._getBit(NodeFlags.PROCESS_TRIGGERS)) {
                    var numContacts = bt.btPersistentManifold_getNumContacts(contactManifold);
                    for (let j = 0; j < numContacts; j++) {
                        var pt = bt.btPersistentManifold_getContactPoint(contactManifold, j);
                        var distance = bt.btManifoldPoint_getDistance(pt);
                        if (distance <= 0) {
                            collision = this._collisionsUtils.getCollision(componentA, componentB);
                            contacts = collision.contacts;
                            isFirstCollision = collision._updateFrame !== loopCount;
                            if (isFirstCollision) {
                                collision._isTrigger = true;
                                contacts.length = 0;
                            }
                            break;
                        }
                    }
                }
            }
            else if (componentA.owner._getBit(NodeFlags.PROCESS_COLLISIONS) || componentB.owner._getBit(NodeFlags.PROCESS_COLLISIONS)) {
                if (componentA._enableProcessCollisions || componentB._enableProcessCollisions) {
                    numContacts = bt.btPersistentManifold_getNumContacts(contactManifold);
                    for (let j = 0; j < numContacts; j++) {
                        pt = bt.btPersistentManifold_getContactPoint(contactManifold, j);
                        distance = bt.btManifoldPoint_getDistance(pt);
                        if (distance <= 0) {
                            var contactPoint = this._collisionsUtils.getContactPoints();
                            contactPoint.colliderA = componentA;
                            contactPoint.colliderB = componentB;
                            contactPoint.distance = distance;
                            var btNormal = bt.btManifoldPoint_get_m_normalWorldOnB(pt);
                            var normal = contactPoint.normal;
                            normal.x = bt.btVector3_x(btNormal);
                            normal.y = bt.btVector3_y(btNormal);
                            normal.z = bt.btVector3_z(btNormal);
                            var btPostionA = bt.btManifoldPoint_get_m_positionWorldOnA(pt);
                            var positionOnA = contactPoint.positionOnA;
                            positionOnA.x = bt.btVector3_x(btPostionA);
                            positionOnA.y = bt.btVector3_y(btPostionA);
                            positionOnA.z = bt.btVector3_z(btPostionA);
                            var btPostionB = bt.btManifoldPoint_get_m_positionWorldOnB(pt);
                            var positionOnB = contactPoint.positionOnB;
                            positionOnB.x = bt.btVector3_x(btPostionB);
                            positionOnB.y = bt.btVector3_y(btPostionB);
                            positionOnB.z = bt.btVector3_z(btPostionB);
                            if (!collision) {
                                collision = this._collisionsUtils.getCollision(componentA, componentB);
                                contacts = collision.contacts;
                                isFirstCollision = collision._updateFrame !== loopCount;
                                if (isFirstCollision) {
                                    collision._isTrigger = false;
                                    contacts.length = 0;
                                }
                            }
                            contacts.push(contactPoint);
                        }
                    }
                }
            }
            if (collision && isFirstCollision) {
                this._currentFrameCollisions.push(collision);
                collision._setUpdateFrame(loopCount);
            }
        }
        for (var i = 0, n = this._characters.length; i < n; i++) {
            var character = this._characters[i];
            character.getOverlappingObj(body => {
                if (body instanceof CharacterController)
                    return;
                let compa = character;
                let compb = body;
                if (character.id > body.id) {
                    compa = body;
                    compb = character;
                }
                let collision = this._collisionsUtils.getCollision(compa, compb);
                if (collision._updateFrame === loopCount)
                    return;
                let contacts = collision.contacts;
                contacts.length = 1;
                collision._setUpdateFrame(loopCount);
                var contactPoint = this._collisionsUtils.getContactPoints();
                contactPoint.colliderA = compa;
                contactPoint.colliderB = compb;
                contactPoint.distance = 0;
                contacts[0] = contactPoint;
                this._currentFrameCollisions.push(collision);
            });
        }
    }
    dispatchCollideEvent() {
        let loopCount = this._updateCount;
        for (let i = 0, n = this._currentFrameCollisions.length; i < n; i++) {
            let curFrameCol = this._currentFrameCollisions[i];
            let colliderA = curFrameCol._colliderA;
            let colliderB = curFrameCol._colliderB;
            if (colliderA.destroyed || colliderB.destroyed)
                continue;
            let ownerA = colliderA.owner;
            let ownerB = colliderB.owner;
            if (loopCount - curFrameCol._lastUpdateFrame === 1) {
                if (curFrameCol._isTrigger) {
                    ownerA.event(Event.TRIGGER_STAY, colliderB);
                    ownerB.event(Event.TRIGGER_STAY, colliderA);
                }
                else {
                    curFrameCol.other = colliderB;
                    ownerA.event(Event.COLLISION_STAY, curFrameCol);
                    curFrameCol.other = colliderA;
                    ownerB.event(Event.COLLISION_STAY, curFrameCol);
                }
            }
            else {
                if (curFrameCol._isTrigger) {
                    ownerA.event(Event.TRIGGER_ENTER, colliderB);
                    ownerB.event(Event.TRIGGER_ENTER, colliderA);
                }
                else {
                    curFrameCol.other = colliderB;
                    ownerA.event(Event.COLLISION_ENTER, curFrameCol);
                    curFrameCol.other = colliderA;
                    ownerB.event(Event.COLLISION_ENTER, curFrameCol);
                }
            }
        }
        for (let i = 0, n = this._previousFrameCollisions.length; i < n; i++) {
            let preFrameCol = this._previousFrameCollisions[i];
            let preColliderA = preFrameCol._colliderA;
            let preColliderB = preFrameCol._colliderB;
            if (preColliderA.destroyed || preColliderB.destroyed)
                continue;
            let ownerA = preColliderA.owner;
            let ownerB = preColliderB.owner;
            if (loopCount - preFrameCol._updateFrame === 1) {
                this._collisionsUtils.recoverCollision(preFrameCol);
                if (preFrameCol._isTrigger) {
                    ownerA.event(Event.TRIGGER_EXIT, preColliderB);
                    ownerB.event(Event.TRIGGER_EXIT, preColliderA);
                }
                else {
                    preFrameCol.other = preColliderB;
                    ownerA.event(Event.COLLISION_EXIT, preFrameCol);
                    preFrameCol.other = preColliderA;
                    ownerB.event(Event.COLLISION_EXIT, preFrameCol);
                }
            }
        }
        for (let id in this._currentConstraint) {
            let constraintObj = this._currentConstraint[id];
            if (constraintObj.enabled && constraintObj._isBreakConstrained()) {
                let bodya = constraintObj.ownBody.owner;
                let bodyb = constraintObj.connectedBody.owner;
                bodya.event(Event.JOINT_BREAK);
                bodyb.event(Event.JOINT_BREAK);
            }
        }
    }
    clearForces() {
        if (!this._btDiscreteDynamicsWorld)
            throw "Cannot perform this action when the physics engine is set to CollisionsOnly";
        ILaya3D.Physics3D._bullet.btDiscreteDynamicsWorld_clearForces(this._btDiscreteDynamicsWorld);
    }
    createRaycastVehicle(body) {
        let bt = ILaya3D.Physics3D._bullet;
        let btVehiclePtr = bt.btRaycastVehicle_create(this._btDiscreteDynamicsWorld, body._btColliderObject);
        bt.btCollisionObject_forceActivationState(body._btColliderObject, PhysicsComponent.ACTIVATIONSTATE_DISABLE_DEACTIVATION);
        let ret = new RaycastVehicle(btVehiclePtr);
        return ret;
    }
    addVehicle(v) {
        let bt = ILaya3D.Physics3D._bullet;
        bt.btDynamicsWorld_addAction(this._btDiscreteDynamicsWorld, v.btVehiclePtr);
    }
    removeVehicle(v) {
        let bt = ILaya3D.Physics3D._bullet;
        bt.btDynamicsWorld_removeAction(v.btVehiclePtr);
    }
    sphereQuery(pos, radius, result, collisionmask = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER) {
        let bt = ILaya3D.Physics3D._bullet;
        if (!this._btPairCachingGhost) {
            this._btPairCachingGhost = bt.btPairCachingGhostObject_create();
            this._btTransform = bt.btTransform_create();
            this._btVec = bt.btVector3_create(0, 0, 0);
            this._btSphereShape = bt.btSphereShape_create(1);
        }
        result.length = 0;
        let sphere = this._btSphereShape;
        bt.btSphereShpae_setUnscaledRadius(sphere, radius);
        let ghost = this._btPairCachingGhost;
        let xform = this._btTransform;
        let vpos = this._btVec;
        bt.btVector3_setValue(vpos, pos.x, pos.y, pos.z);
        bt.btTransform_setIdentity(xform);
        bt.btTransform_setOrigin(xform, vpos);
        bt.btCollisionObject_setCollisionShape(ghost, sphere);
        bt.btCollisionObject_setWorldTransform(ghost, xform);
        bt.btCollisionWorld_addCollisionObject(this._btDiscreteDynamicsWorld, ghost, -1, -1);
        let num = bt.btCollisionObject_getNumOverlappingObjects(ghost);
        for (let i = 0; i < num; i++) {
            let obj = bt.btCollisionObject_getOverlappingObject(ghost, i);
            let comp = PhysicsComponent._physicObjectsMap[bt.btCollisionObject_getUserIndex(obj)];
            if (comp.collisionGroup & collisionmask)
                result.push(comp);
        }
        bt.btCollisionWorld_removeCollisionObject(this._btDiscreteDynamicsWorld, ghost);
    }
}
PhysicsSimulation.PHYSICSENGINEFLAGS_NONE = 0x0;
PhysicsSimulation.PHYSICSENGINEFLAGS_COLLISIONSONLY = 0x1;
PhysicsSimulation.PHYSICSENGINEFLAGS_SOFTBODYSUPPORT = 0x2;
PhysicsSimulation.PHYSICSENGINEFLAGS_MULTITHREADED = 0x4;
PhysicsSimulation.PHYSICSENGINEFLAGS_USEHARDWAREWHENPOSSIBLE = 0x8;
PhysicsSimulation.SOLVERMODE_RANDMIZE_ORDER = 1;
PhysicsSimulation.SOLVERMODE_FRICTION_SEPARATE = 2;
PhysicsSimulation.SOLVERMODE_USE_WARMSTARTING = 4;
PhysicsSimulation.SOLVERMODE_USE_2_FRICTION_DIRECTIONS = 16;
PhysicsSimulation.SOLVERMODE_ENABLE_FRICTION_DIRECTION_CACHING = 32;
PhysicsSimulation.SOLVERMODE_DISABLE_VELOCITY_DEPENDENT_FRICTION_DIRECTION = 64;
PhysicsSimulation.SOLVERMODE_CACHE_FRIENDLY = 128;
PhysicsSimulation.SOLVERMODE_SIMD = 256;
PhysicsSimulation.SOLVERMODE_INTERLEAVE_CONTACT_AND_FRICTION_CONSTRAINTS = 512;
PhysicsSimulation.SOLVERMODE_ALLOW_ZERO_LENGTH_FRICTION_DIRECTIONS = 1024;
PhysicsSimulation.HITSRAYRESULTCALLBACK_FLAG_NONE = 0;
PhysicsSimulation.HITSRAYRESULTCALLBACK_FLAG_FILTERBACKFACESS = 1;
PhysicsSimulation.HITSRAYRESULTCALLBACK_FLAG_KEEPUNFILIPPEDNORMAL = 2;
PhysicsSimulation.HITSRAYRESULTCALLBACK_FLAG_USESUBSIMPLEXCONVEXCASTRAYTEST = 4;
PhysicsSimulation.HITSRAYRESULTCALLBACK_FLAG_USEGJKCONVEXCASTRAYTEST = 8;
PhysicsSimulation.HITSRAYRESULTCALLBACK_FLAG_TERMINATOR = 0xffffffff;
PhysicsSimulation._tempVector30 = new Vector3();
PhysicsSimulation.disableSimulation = false;

//# sourceMappingURL=PhysicsSimulation.js.map
