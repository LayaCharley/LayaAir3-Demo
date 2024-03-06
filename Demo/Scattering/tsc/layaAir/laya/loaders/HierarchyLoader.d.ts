import { IResourceLoader, ILoadTask } from "../net/Loader";
import { Prefab } from "../resource/HierarchyResource";
import { IHierarchyParserAPI } from "../resource/PrefabImpl";
export declare class HierarchyLoader implements IResourceLoader {
    static v3: IHierarchyParserAPI;
    static v2: IHierarchyParserAPI;
    static legacySceneOrPrefab: IHierarchyParserAPI;
    load(task: ILoadTask): Promise<Prefab>;
}
