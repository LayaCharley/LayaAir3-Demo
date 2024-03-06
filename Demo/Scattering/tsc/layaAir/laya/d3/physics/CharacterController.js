import { Physics3DUtils } from "../utils/Physics3DUtils";
import { Utils3D } from "../utils/Utils3D";
import { PhysicsComponent } from "./PhysicsComponent";
import { ILaya3D } from "../../../ILaya3D";
import { MeshColliderShape } from "./shape/MeshColliderShape";
import { Quaternion } from "../../maths/Quaternion";
import { Vector3 } from "../../maths/Vector3";
export class CharacterController extends PhysicsComponent {
    constructor(stepheight = 0.1, upAxis = null, collisionGroup = Physics3DUtils.COLLISIONFILTERGROUP_DEFAULTFILTER, canCollideWith = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER) {
        super(collisionGroup, canCollideWith);
        this._upAxis = new Vector3(0, 1, 0);
        this._maxSlope = 90.0;
        this._jumpSpeed = 10.0;
        this._fallSpeed = 55.0;
        this._gravity = new Vector3(0, -9.8 * 3, 0);
        this._btKinematicCharacter = null;
        this._pushForce = 1;
        this._stepHeight = stepheight;
        (upAxis) && (this._upAxis = upAxis);
        this._controlBySimulation = true;
    }
    static __init__() {
        CharacterController._btTempVector30 = ILaya3D.Physics3D._bullet.btVector3_create(0, 0, 0);
    }
    set colliderShape(value) {
        if (value instanceof MeshColliderShape) {
            value = null;
            console.error("CharacterController is not support MeshColliderShape");
        }
        super.colliderShape = value;
    }
    get colliderShape() {
        return this._colliderShape;
    }
    get fallSpeed() {
        return this._fallSpeed;
    }
    set fallSpeed(value) {
        this._fallSpeed = value;
        ILaya3D.Physics3D._bullet.btKinematicCharacterController_setFallSpeed(this._btKinematicCharacter, value);
    }
    set pushForce(v) {
        this._pushForce = v;
        if (this._btKinematicCharacter) {
            var bt = ILaya3D.Physics3D._bullet;
            bt.btKinematicCharacterController_setPushForce(this._btKinematicCharacter, v);
        }
    }
    get pushForce() {
        return this._pushForce;
    }
    get jumpSpeed() {
        return this._jumpSpeed;
    }
    set jumpSpeed(value) {
        this._jumpSpeed = value;
        ILaya3D.Physics3D._bullet.btKinematicCharacterController_setJumpSpeed(this._btKinematicCharacter, value);
    }
    get gravity() {
        return this._gravity;
    }
    set gravity(value) {
        this._gravity = value;
        var bt = ILaya3D.Physics3D._bullet;
        var btGravity = CharacterController._btTempVector30;
        bt.btVector3_setValue(btGravity, value.x, value.y, value.z);
        bt.btKinematicCharacterController_setGravity(this._btKinematicCharacter, btGravity);
    }
    get maxSlope() {
        return this._maxSlope;
    }
    set maxSlope(value) {
        this._maxSlope = value;
        ILaya3D.Physics3D._bullet.btKinematicCharacterController_setMaxSlope(this._btKinematicCharacter, (value / 180) * Math.PI);
    }
    get isGrounded() {
        return ILaya3D.Physics3D._bullet.btKinematicCharacterController_onGround(this._btKinematicCharacter);
    }
    get stepHeight() {
        return this._stepHeight;
    }
    set stepHeight(value) {
        this._stepHeight = value;
        ILaya3D.Physics3D._bullet.btKinematicCharacterController_setStepHeight(this._btKinematicCharacter, value);
    }
    get upAxis() {
        return this._upAxis;
    }
    set upAxis(value) {
        this._upAxis = value;
        var btUpAxis = CharacterController._btTempVector30;
        Utils3D._convertToBulletVec3(value, btUpAxis);
        ILaya3D.Physics3D._bullet.btKinematicCharacterController_setUp(this._btKinematicCharacter, btUpAxis);
    }
    get position() {
        let bt = ILaya3D.Physics3D._bullet;
        let pPos = bt.btKinematicCharacterController_getCurrentPosition(this._btKinematicCharacter);
        CharacterController.tmpPosition.setValue(bt.btVector3_x(pPos), bt.btVector3_y(pPos), bt.btVector3_z(pPos));
        return CharacterController.tmpPosition;
    }
    set position(v) {
        var bt = ILaya3D.Physics3D._bullet;
        bt.btKinematicCharacterController_setCurrentPosition(this._btKinematicCharacter, v.x, v.y, v.z);
    }
    get orientation() {
        let bt = ILaya3D.Physics3D._bullet;
        let pQuat = bt.btKinematicCharacterController_getCurrentOrientation(this._btKinematicCharacter);
        CharacterController.tmpOrientation.setValue(bt.btQuaternion_x(pQuat), bt.btQuaternion_y(pQuat), bt.btQuaternion_z(pQuat), bt.btQuaternion_w(pQuat));
        return CharacterController.tmpOrientation;
    }
    set orientation(v) {
        var bt = ILaya3D.Physics3D._bullet;
        var btColliderObject = this._btColliderObject;
    }
    setJumpAxis(x, y, z) {
        ILaya3D.Physics3D._bullet.btKinematicCharacterController_setJumpAxis(this._btKinematicCharacter, x, y, z);
    }
    _onAdded() {
        var bt = ILaya3D.Physics3D._bullet;
        var ghostObject = bt.btPairCachingGhostObject_create();
        bt.btCollisionObject_setUserIndex(ghostObject, this.id);
        bt.btCollisionObject_setCollisionFlags(ghostObject, PhysicsComponent.COLLISIONFLAGS_CHARACTER_OBJECT);
        this._btColliderObject = ghostObject;
        (this._colliderShape) && (this._constructCharacter());
        super._onAdded();
    }
    _onDestroy() {
        ILaya3D.Physics3D._bullet.btKinematicCharacterController_destroy(this._btKinematicCharacter);
        super._onDestroy();
        this._btKinematicCharacter = null;
    }
    _constructCharacter() {
        var bt = ILaya3D.Physics3D._bullet;
        if (this._btKinematicCharacter)
            bt.btKinematicCharacterController_destroy(this._btKinematicCharacter);
        var btUpAxis = CharacterController._btTempVector30;
        bt.btVector3_setValue(btUpAxis, this._upAxis.x, this._upAxis.y, this._upAxis.z);
        this._btKinematicCharacter = bt.btKinematicCharacterController_create(this._btColliderObject, this._colliderShape._btShape, this._stepHeight, btUpAxis);
        this.fallSpeed = this._fallSpeed;
        this.maxSlope = this._maxSlope;
        this.jumpSpeed = this._jumpSpeed;
        this.gravity = this._gravity;
        this.setJumpAxis(0, 1, 0);
        this.pushForce = this._pushForce;
    }
    _onShapeChange(colShape) {
        super._onShapeChange(colShape);
        this._constructCharacter();
    }
    _addToSimulation() {
        this._simulation._characters.push(this);
        this._simulation._addCharacter(this, this._collisionGroup, this._canCollideWith);
    }
    _removeFromSimulation() {
        this._simulation._removeCharacter(this);
        var characters = this._simulation._characters;
        characters.splice(characters.indexOf(this), 1);
    }
    getHitFlag() {
        return ILaya3D.Physics3D._bullet.btKinematicCharacterController_getHitFlag(this._btKinematicCharacter);
    }
    getVerticalVel() {
        return ILaya3D.Physics3D._bullet.btKinematicCharacterController_getVerticalVelocity(this._btKinematicCharacter);
    }
    getOverlappingObj(cb) {
        var bt = ILaya3D.Physics3D._bullet;
        let ghost = this._btColliderObject;
        let num = bt.btCollisionObject_getNumOverlappingObjects(ghost);
        for (let i = 0; i < num; i++) {
            let obj = bt.btCollisionObject_getOverlappingObject(ghost, i);
            let comp = PhysicsComponent._physicObjectsMap[bt.btCollisionObject_getUserIndex(obj)];
            if (comp) {
                cb(comp);
            }
        }
    }
    move(movement) {
        var btMovement = CharacterController._btVector30;
        var bt = ILaya3D.Physics3D._bullet;
        bt.btVector3_setValue(btMovement, movement.x, movement.y, movement.z);
        bt.btKinematicCharacterController_setWalkDirection(this._btKinematicCharacter, btMovement);
    }
    jump(velocity = null) {
        var bt = ILaya3D.Physics3D._bullet;
        var btVelocity = CharacterController._btVector30;
        if (velocity) {
            Utils3D._convertToBulletVec3(velocity, btVelocity);
            bt.btKinematicCharacterController_jump(this._btKinematicCharacter, btVelocity);
        }
        else {
            bt.btVector3_setValue(btVelocity, 0, this._jumpSpeed, 0);
            bt.btKinematicCharacterController_jump(this._btKinematicCharacter, btVelocity);
        }
    }
    get btColliderObject() {
        return this._btColliderObject;
    }
    _cloneTo(dest) {
        super._cloneTo(dest);
        var destCharacterController = dest;
        destCharacterController.stepHeight = this._stepHeight;
        destCharacterController.upAxis = this._upAxis;
        destCharacterController.maxSlope = this._maxSlope;
        destCharacterController.jumpSpeed = this._jumpSpeed;
        destCharacterController.fallSpeed = this._fallSpeed;
        destCharacterController.gravity = this._gravity;
    }
}
CharacterController.tmpPosition = new Vector3();
CharacterController.tmpOrientation = new Quaternion();
CharacterController.UPAXIS_X = 0;
CharacterController.UPAXIS_Y = 1;
CharacterController.UPAXIS_Z = 2;

//# sourceMappingURL=CharacterController.js.map
