import { ILaya } from "./../../ILaya";
import { URL } from "./URL";
export class AtlasInfoManager {
    static enable(infoFile, callback = null) {
        ILaya.loader.fetch(infoFile, "json").then(data => {
            if (!data)
                return;
            AtlasInfoManager.addAtlases(data);
            callback && callback.run();
        });
    }
    static addAtlases(data) {
        let dic = AtlasInfoManager._fileLoadDic;
        for (let key in data) {
            let arr = data[key];
            let prefix = URL.formatURL(arr[0]);
            let frames = arr[1];
            let len = frames.length;
            let entry = { url: key };
            for (let i = 0; i < len; i++) {
                dic[prefix + frames[i]] = entry;
            }
        }
    }
    static addAtlas(atlasUrl, prefix, frames) {
        prefix = URL.formatURL(prefix);
        let dic = AtlasInfoManager._fileLoadDic;
        let entry = { url: atlasUrl };
        for (let i of frames) {
            dic[prefix + i] = entry;
        }
    }
    static getFileLoadPath(file) {
        return AtlasInfoManager._fileLoadDic[file];
    }
}
AtlasInfoManager._fileLoadDic = {};

//# sourceMappingURL=AtlasInfoManager.js.map
