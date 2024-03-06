import { PhysicsTriggerComponent } from "./PhysicsTriggerComponent";
import { ColliderShape } from "./shape/ColliderShape";
import { Quaternion } from "../../maths/Quaternion";
import { Vector3 } from "../../maths/Vector3";
export declare class Rigidbody3D extends PhysicsTriggerComponent {
    static TYPE_STATIC: number;
    static TYPE_DYNAMIC: number;
    static TYPE_KINEMATIC: number;
    userData: any;
    get mass(): number;
    set mass(value: number);
    getCollisionFlags(): any;
    get isKinematic(): boolean;
    set isKinematic(value: boolean);
    get linearDamping(): number;
    set linearDamping(value: number);
    get angularDamping(): number;
    set angularDamping(value: number);
    get overrideGravity(): boolean;
    set overrideGravity(value: boolean);
    get gravity(): Vector3;
    set gravity(value: Vector3);
    get totalForce(): Vector3;
    get linearFactor(): Vector3;
    set linearFactor(value: Vector3);
    get linearVelocity(): Vector3;
    set linearVelocity(value: Vector3);
    get angularFactor(): Vector3;
    set angularFactor(value: Vector3);
    get angularVelocity(): Vector3;
    set angularVelocity(value: Vector3);
    get totalTorque(): Vector3;
    get detectCollisions(): boolean;
    set detectCollisions(value: boolean);
    get isSleeping(): boolean;
    get sleepLinearVelocity(): number;
    set sleepLinearVelocity(value: number);
    get sleepAngularVelocity(): number;
    set sleepAngularVelocity(value: number);
    get btColliderObject(): number;
    set position(pos: Vector3);
    get position(): Vector3;
    set orientation(q: Quaternion);
    get orientation(): Quaternion;
    constructor(collisionGroup?: number, canCollideWith?: number);
    protected _onAdded(): void;
    protected _onDestroy(): void;
    set colliderShape(value: ColliderShape);
    get colliderShape(): ColliderShape;
    applyForce(force: Vector3, localOffset?: Vector3): void;
    applyForceXYZ(fx: number, fy: number, fz: number, localOffset?: Vector3): void;
    setCollisionFlags(flags: number): void;
    applyTorque(torque: Vector3): void;
    applyImpulse(impulse: Vector3, localOffset?: Vector3): void;
    applyTorqueImpulse(torqueImpulse: Vector3): void;
    wakeUp(): void;
    clearForces(): void;
}
