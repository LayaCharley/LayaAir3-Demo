import { EventDispatcher } from "../../events/EventDispatcher";
export declare class Gyroscope extends EventDispatcher {
    private static info;
    private static _instance;
    static get instance(): Gyroscope;
    constructor(singleton: number);
    protected onStartListeningToType(type: string): this;
    private onDeviceOrientationChange;
}
