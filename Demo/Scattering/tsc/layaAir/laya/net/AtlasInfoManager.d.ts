import { Handler } from "../utils/Handler";
export declare class AtlasInfoManager {
    static _fileLoadDic: Record<string, {
        url: string;
        baseUrl?: string;
    }>;
    static enable(infoFile: string, callback?: Handler | null): void;
    static addAtlases(data: Record<string, [string, string[]]>): void;
    static addAtlas(atlasUrl: string, prefix: string, frames: Array<string>): void;
    static getFileLoadPath(file: string): {
        url: string;
        baseUrl?: string;
    };
}
