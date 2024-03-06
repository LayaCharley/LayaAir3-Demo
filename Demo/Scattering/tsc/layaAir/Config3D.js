import { Config } from "./Config";
import { Vector3 } from "./laya/maths/Vector3";
export class Config3D {
    static setResolution(width, height) {
        Config3D.customResolution = true;
        Config3D._resoluWidth = width;
        Config3D._resoluHeight = height;
    }
}
Config3D.enableDynamicBatch = true;
Config3D.enableStaticBatch = true;
Config3D.enableUniformBufferObject = true;
Config3D.pixelRatio = 1;
Config3D.customResolution = false;
Config3D.defaultCacheRTMemory = 256;
Config3D.defaultPhysicsMemory = 16;
Config3D.enableMultiLight = true;
Config3D.maxLightCount = 32;
Config3D.lightClusterCount = new Vector3(12, 12, 12);
Config3D.maxMorphTargetCount = 32;
Config3D.useBVHCull = false;
Config3D.BVH_max_SpatialCount = 7;
Config3D.BVH_limit_size = 32;
Config3D.BVH_Min_Build_nums = 10;
Config3D._resoluWidth = -1;
Config3D._resoluHeight = -1;
Config3D.debugFrustumCulling = false;
Config.isStencil = true;

//# sourceMappingURL=Config3D.js.map
