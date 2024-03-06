import { PhysicsComponent } from "./PhysicsComponent";
export declare class PhysicsTriggerComponent extends PhysicsComponent {
    get isTrigger(): boolean;
    set isTrigger(value: boolean);
    constructor(collisionGroup: number, canCollideWith: number);
    protected _onAdded(): void;
}
