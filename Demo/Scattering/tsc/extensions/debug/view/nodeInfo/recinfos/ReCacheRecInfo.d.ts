import { NodeRecInfo } from "./NodeRecInfo";
export declare class ReCacheRecInfo extends NodeRecInfo {
    constructor();
    addCount(time?: number): void;
    isWorking: boolean;
    count: number;
    mTime: number;
    static showTime: number;
    updates(): void;
    private removeSelfLater;
    set working(v: boolean);
}
