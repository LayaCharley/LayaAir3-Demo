import { ILoadTask, IResourceLoader } from "../net/Loader";
export declare class NullLoader implements IResourceLoader {
    load(task: ILoadTask): Promise<any>;
}
