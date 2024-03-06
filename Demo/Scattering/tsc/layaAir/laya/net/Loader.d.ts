import { AtlasResource } from "../resource/AtlasResource";
import { Texture2D, TextureConstructParams, TexturePropertyParams } from "../resource/Texture2D";
import { IBatchProgress, ProgressCallback } from "./BatchProgress";
import { Handler } from "../utils/Handler";
import { EventDispatcher } from "../events/EventDispatcher";
import { Node } from "../display/Node";
import { Resource } from "../resource/Resource";
import { Downloader } from "./Downloader";
import { BaseTexture } from "../resource/BaseTexture";
import { XML } from "../html/XML";
export interface ILoadTask {
    readonly type: string;
    readonly url: string;
    readonly uuid: string;
    readonly ext: string;
    readonly loader: Loader;
    readonly obsoluteInst: Resource;
    readonly options: Readonly<ILoadOptions>;
    readonly progress: IBatchProgress;
}
export interface IResourceLoader {
    load(task: ILoadTask): Promise<any>;
}
export interface ILoadOptions {
    type?: string;
    priority?: number;
    group?: string;
    cache?: boolean;
    noRetry?: boolean;
    silent?: boolean;
    useWorkerLoader?: boolean;
    constructParams?: TextureConstructParams;
    propertyParams?: TexturePropertyParams;
    blob?: ArrayBuffer;
    [key: string]: any;
}
export interface ILoadURL extends ILoadOptions {
    url: string;
}
interface ContentTypeMap {
    "text": string;
    "json": any;
    "xml": XML;
    "arraybuffer": ArrayBuffer;
    "image": HTMLImageElement | ImageBitmap;
    "sound": HTMLAudioElement;
}
declare type TypeMapEntry = {
    typeId: number;
    loaderType: new () => IResourceLoader;
};
export declare class Loader extends EventDispatcher {
    static TEXT: string;
    static JSON: string;
    static XML: string;
    static BUFFER: string;
    static IMAGE: string;
    static SOUND: string;
    static VIDEO: string;
    static ATLAS: string;
    static FONT: string;
    static TTF: string;
    static HIERARCHY: string;
    static MESH: string;
    static MATERIAL: string;
    static TEXTURE2D: string;
    static TEXTURECUBE: string;
    static ANIMATIONCLIP: string;
    static TERRAINHEIGHTDATA: string;
    static TERRAINRES: string;
    static SPINE: string;
    retryNum: number;
    retryDelay: number;
    maxLoader: number;
    static readonly extMap: {
        [ext: string]: Array<TypeMapEntry>;
    };
    static readonly typeMap: {
        [type: string]: TypeMapEntry;
    };
    static downloader: Downloader;
    static registerLoader(exts: string[], cls: new () => IResourceLoader, type?: string): void;
    static groupMap: {
        [name: string]: Set<string>;
    };
    static loadedMap: {
        [url: string]: Array<any>;
    };
    static preLoadedMap: {
        [url: string]: any;
    };
    private _loadings;
    private _queue;
    private _downloadings;
    constructor();
    get loading(): boolean;
    load(url: string | ILoadURL | (string | Readonly<ILoadURL>)[], type?: string, onProgress?: ProgressCallback): Promise<any>;
    load(url: string | ILoadURL | (string | Readonly<ILoadURL>)[], options?: Readonly<ILoadOptions>, onProgress?: ProgressCallback): Promise<any>;
    load(url: string | ILoadURL | (string | Readonly<ILoadURL>)[], complete?: Handler, progress?: Handler, type?: string, priority?: number, cache?: boolean, group?: string, ignoreCache?: boolean, useWorkerLoader?: boolean): Promise<any>;
    private _load1;
    private _load2;
    fetch<K extends keyof ContentTypeMap>(url: string, contentType: K, onProgress?: ProgressCallback, options?: Readonly<ILoadOptions>): Promise<ContentTypeMap[K]>;
    private queueToDownload;
    private download;
    private completeItem;
    private static getURLInfo;
    private static warnFailed;
    static warn(msg: string, err?: any): void;
    static getRes(url: string, type?: string): any;
    private static _getRes;
    static getTexture2D(url: string): Texture2D;
    static getBaseTexture<T extends BaseTexture>(url: string): T;
    static getAtlas(url: string): AtlasResource;
    getRes(url: string, type?: string): any;
    static createNodes<T extends Node>(url: string): T;
    static cacheRes(url: string, data: any, type?: string): void;
    private static _cacheRes;
    cacheRes(url: string, data: any, type?: string): void;
    static clearRes(url: string, checkObj?: any): void;
    clearRes(url: string, checkObj?: any): void;
    private static _clearRes;
    clearTextureRes(url: string): void;
    static setGroup(url: string, group: string): void;
    static clearResByGroup(group: string): void;
    clearUnLoaded(): void;
    cancelLoadByUrls(urls: any[]): void;
    cancelLoadByUrl(url: string): void;
    loadPackage(path: string, onProgress?: ProgressCallback): Promise<void>;
    loadPackage(path: string, remoteUrl?: string, onProgress?: ProgressCallback): Promise<void>;
    private _loadMiniPackage;
    private _loadSubFileConfig;
}
export {};
