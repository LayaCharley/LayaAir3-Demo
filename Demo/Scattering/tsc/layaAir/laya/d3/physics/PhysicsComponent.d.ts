import { Component } from "../../components/Component";
import { PhysicsSimulation } from "./PhysicsSimulation";
import { ColliderShape } from "./shape/ColliderShape";
import { Quaternion } from "../../maths/Quaternion";
import { Vector3 } from "../../maths/Vector3";
export declare class PhysicsComponent extends Component {
    canScaleShape: boolean;
    get restitution(): number;
    set restitution(value: number);
    get friction(): number;
    set friction(value: number);
    get rollingFriction(): number;
    set rollingFriction(value: number);
    get ccdMotionThreshold(): number;
    set ccdMotionThreshold(value: number);
    get ccdSweptSphereRadius(): number;
    set ccdSweptSphereRadius(value: number);
    get isActive(): boolean;
    get colliderShape(): ColliderShape;
    set colliderShape(value: ColliderShape);
    get simulation(): PhysicsSimulation;
    get collisionGroup(): number;
    set collisionGroup(value: number);
    get canCollideWith(): number;
    set canCollideWith(value: number);
    constructor(collisionGroup: number, canCollideWith: number);
    protected _onAdded(): void;
    protected _onEnable(): void;
    protected _onDisable(): void;
    protected _onDestroy(): void;
    getPhysicsPosition(): Vector3;
    getPhysicsOrientation(): Quaternion;
}