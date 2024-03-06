import { PhysicsTriggerComponent } from "./PhysicsTriggerComponent";
export declare class PhysicsCollider extends PhysicsTriggerComponent {
    constructor(collisionGroup?: number, canCollideWith?: number);
    protected _onAdded(): void;
}
