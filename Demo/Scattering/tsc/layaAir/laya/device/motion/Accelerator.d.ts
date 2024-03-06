import { AccelerationInfo } from "./AccelerationInfo";
import { EventDispatcher } from "../../events/EventDispatcher";
export declare class Accelerator extends EventDispatcher {
    private static _instance;
    static get instance(): Accelerator;
    private static acceleration;
    private static accelerationIncludingGravity;
    private static rotationRate;
    constructor();
    protected onStartListeningToType(type: string): this;
    private onDeviceOrientationChange;
    private static transformedAcceleration;
    static getTransformedAcceleration(acceleration: AccelerationInfo): AccelerationInfo;
}
