import { Resource } from "../resource/Resource";
import { SpineTexture } from "./SpineTexture";
import { IBatchProgress } from "../net/BatchProgress";
export declare class SpineTemplet extends Resource {
    static RuntimeVersion: string;
    skeletonData: spine.SkeletonData;
    private _textures;
    private _basePath;
    private _ns;
    constructor();
    get ns(): typeof spine;
    get basePath(): string;
    getTexture(name: string): SpineTexture;
    _parse(desc: string | ArrayBuffer, atlasText: string, createURL: string, progress?: IBatchProgress): Promise<void>;
    private getRuntimeVersion;
    private parseAtlas3;
    private parseAtlas4;
    getAniNameByIndex(index: number): string;
    getSkinIndexByName(skinName: string): number;
    protected _disposeResource(): void;
}
