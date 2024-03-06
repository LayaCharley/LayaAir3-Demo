import { Loader } from "../net/Loader";
import { URL } from "../net/URL";
import { AssetDb } from "../resource/AssetDb";
import { PrefabImpl } from "../resource/PrefabImpl";
import { HierarchyParser } from "./HierarchyParser";
import { LegacyUIParser } from "./LegacyUIParser";
export class HierarchyLoader {
    load(task) {
        let url = task.url;
        let isModel = task.ext == "gltf" || task.ext == "fbx" || task.ext == "glb";
        if (isModel)
            url = AssetDb.inst.getSubAssetURL(url, task.uuid, "0", "lh");
        return task.loader.fetch(url, "json", task.progress.createCallback(0.2), task.options).then(data => {
            if (!data)
                return null;
            if (data._$ver != null)
                return this._load(HierarchyLoader.v3, task, data, 3);
            else if (task.ext == "ls" || task.ext == "lh")
                return this._load(HierarchyLoader.v2, task, data, 2);
            else if (task.ext == "scene" || task.ext == "prefab")
                return this._load(HierarchyLoader.legacySceneOrPrefab, task, data, 2);
            else
                return null;
        });
    }
    _load(api, task, data, version) {
        let basePath = URL.getPath(task.url);
        let links = api.collectResourceLinks(data, basePath);
        return task.loader.load(links, null, task.progress.createCallback()).then((resArray) => {
            let res = new PrefabImpl(api, data, version);
            res.addDeps(resArray);
            return res;
        });
    }
}
HierarchyLoader.v3 = HierarchyParser;
HierarchyLoader.v2 = null;
HierarchyLoader.legacySceneOrPrefab = LegacyUIParser;
Loader.registerLoader(["lh", "ls", "scene", "prefab"], HierarchyLoader, Loader.HIERARCHY);

//# sourceMappingURL=HierarchyLoader.js.map
