import { CacheManger } from "./CacheManger";
import { Pool } from "./Pool";
export class PoolCache {
    constructor() {
        this.maxCount = 1000;
    }
    getCacheList() {
        return Pool.getPoolBySign(this.sign);
    }
    tryDispose(force) {
        var list;
        list = Pool.getPoolBySign(this.sign);
        if (list.length > this.maxCount) {
            list.splice(this.maxCount, list.length - this.maxCount);
        }
    }
    static addPoolCacheManager(sign, maxCount = 100) {
        var cache;
        cache = new PoolCache();
        cache.sign = sign;
        cache.maxCount = maxCount;
        CacheManger.regCacheByFunction(cache.tryDispose.bind(cache), cache.getCacheList.bind(cache));
    }
}

//# sourceMappingURL=PoolCache.js.map
