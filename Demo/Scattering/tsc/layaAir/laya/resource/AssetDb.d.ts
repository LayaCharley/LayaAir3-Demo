export declare class AssetDb {
    static inst: AssetDb;
    uuidMap: Record<string, string>;
    shaderNameMap: Record<string, string>;
    metaMap: Record<string, any>;
    UUID_to_URL(uuid: string): string;
    UUID_to_URL_async(uuid: string): Promise<string>;
    URL_to_UUID_async(url: string): Promise<string>;
    resolveURL(url: string, onResolve?: (url: string) => void): Promise<string>;
    shaderName_to_URL(shaderName: string): string;
    shaderName_to_URL_async(shaderName: string): Promise<string>;
    getMeta(url: string, uuid: string): Promise<any>;
    getSubAssetURL(url: string, uuid: string, subAssetName: string, subAssetExt: string): string;
}
