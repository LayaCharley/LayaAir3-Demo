import { Vector3 } from "./laya/maths/Vector3";
export declare class Config3D {
    static enableDynamicBatch: boolean;
    static enableStaticBatch: boolean;
    static enableUniformBufferObject: boolean;
    static pixelRatio: number;
    static customResolution: boolean;
    static defaultCacheRTMemory: number;
    static defaultPhysicsMemory: number;
    static enableMultiLight: boolean;
    static maxLightCount: number;
    static lightClusterCount: Vector3;
    static maxMorphTargetCount: number;
    static setResolution(width: number, height: number): void;
    static useBVHCull: boolean;
    static BVH_max_SpatialCount: number;
    static BVH_limit_size: number;
    static BVH_Min_Build_nums: number;
}
