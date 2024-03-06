import { Utils } from "../utils/Utils";
export class AssetDb {
    constructor() {
        this.uuidMap = {};
        this.shaderNameMap = {};
        this.metaMap = {};
    }
    UUID_to_URL(uuid) {
        return this.uuidMap[uuid];
    }
    UUID_to_URL_async(uuid) {
        return Promise.resolve(null);
    }
    URL_to_UUID_async(url) {
        return Promise.resolve(null);
    }
    resolveURL(url, onResolve) {
        if (url.startsWith("res://")) {
            let uuid = url.substring(6);
            return AssetDb.inst.UUID_to_URL_async(uuid).then(url => {
                if (onResolve)
                    onResolve(url);
                return url;
            });
        }
        else {
            if (onResolve)
                onResolve(url);
            return Promise.resolve(url);
        }
    }
    shaderName_to_URL(shaderName) {
        return this.shaderNameMap[shaderName];
    }
    shaderName_to_URL_async(shaderName) {
        return Promise.resolve(null);
    }
    getMeta(url, uuid) {
        return Promise.resolve(null);
    }
    getSubAssetURL(url, uuid, subAssetName, subAssetExt) {
        if (subAssetName)
            return `${Utils.replaceFileExtension(url, "")}@${subAssetName}.${subAssetExt}`;
        else
            return url;
    }
}
AssetDb.inst = new AssetDb();

//# sourceMappingURL=AssetDb.js.map
