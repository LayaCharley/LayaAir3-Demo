import { Ray } from "../math/Ray";
import { HitResult } from "./HitResult";
import { PhysicsComponent } from "./PhysicsComponent";
import { Rigidbody3D } from "./Rigidbody3D";
import { ColliderShape } from "./shape/ColliderShape";
import { ConstraintComponent } from "./constraints/ConstraintComponent";
import { RaycastVehicle } from "./RaycastVehicle";
import { Quaternion } from "../../maths/Quaternion";
import { Vector3 } from "../../maths/Vector3";
export declare class PhysicsSimulation {
    static disableSimulation: boolean;
    protected _updateCount: number;
    static createConstraint(): void;
    maxSubSteps: number;
    fixedTimeStep: number;
    dt: number;
    get continuousCollisionDetection(): boolean;
    set continuousCollisionDetection(value: boolean);
    get gravity(): Vector3;
    set gravity(value: Vector3);
    enableDebugDrawer(b: boolean): void;
    raycastFromTo(from: Vector3, to: Vector3, out?: HitResult, collisonGroup?: number, collisionMask?: number): boolean;
    raycastAllFromTo(from: Vector3, to: Vector3, out: HitResult[], collisonGroup?: number, collisionMask?: number): boolean;
    rayCast(ray: Ray, outHitResult?: HitResult, distance?: number, collisonGroup?: number, collisionMask?: number): boolean;
    rayCastAll(ray: Ray, out: HitResult[], distance?: number, collisonGroup?: number, collisionMask?: number): boolean;
    shapeCast(shape: ColliderShape, fromPosition: Vector3, toPosition: Vector3, out?: HitResult, fromRotation?: Quaternion, toRotation?: Quaternion, collisonGroup?: number, collisionMask?: number, allowedCcdPenetration?: number): boolean;
    shapeCastAll(shape: ColliderShape, fromPosition: Vector3, toPosition: Vector3, out: HitResult[], fromRotation?: Quaternion, toRotation?: Quaternion, collisonGroup?: number, collisionMask?: number, allowedCcdPenetration?: number): boolean;
    addConstraint(constraint: ConstraintComponent, disableCollisionsBetweenLinkedBodies?: boolean): void;
    removeConstraint(constraint: ConstraintComponent): void;
    setHitsRayResultCallbackFlag(flag?: number): void;
    dispatchCollideEvent(): void;
    clearForces(): void;
    createRaycastVehicle(body: Rigidbody3D): RaycastVehicle;
    addVehicle(v: RaycastVehicle): void;
    removeVehicle(v: RaycastVehicle): void;
    private _btPairCachingGhost;
    private _btSphereShape;
    private _btTransform;
    private _btVec;
    sphereQuery(pos: Vector3, radius: number, result: PhysicsComponent[], collisionmask?: number): void;
}
