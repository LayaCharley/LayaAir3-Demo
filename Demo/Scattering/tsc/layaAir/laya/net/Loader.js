import { ILaya } from "../../ILaya";
import { Event } from "../events/Event";
import { URL } from "../net/URL";
import { Texture } from "../resource/Texture";
import { Delegate } from "../utils/Delegate";
import { AtlasInfoManager } from "./AtlasInfoManager";
import { WorkerLoader } from "./WorkerLoader";
import { Utils } from "../utils/Utils";
import { AtlasResource } from "../resource/AtlasResource";
import { BatchProgress } from "./BatchProgress";
import { Handler } from "../utils/Handler";
import { EventDispatcher } from "../events/EventDispatcher";
import { Resource } from "../resource/Resource";
import { Downloader } from "./Downloader";
import { AssetDb } from "../resource/AssetDb";
import { LayaEnv } from "../../LayaEnv";
var typeIdCounter = 0;
const NullURLInfo = { ext: null, typeId: null, main: false, loaderType: null };
export class Loader extends EventDispatcher {
    constructor() {
        super();
        this.retryNum = 1;
        this.retryDelay = 0;
        this.maxLoader = 5;
        this._loadings = new Map();
        this._queue = [];
        this._downloadings = new Set();
    }
    static registerLoader(exts, cls, type) {
        let typeEntry;
        if (type) {
            typeEntry = Loader.typeMap[type];
            if (!typeEntry)
                Loader.typeMap[type] = typeEntry = { typeId: typeIdCounter++, loaderType: cls };
            else if (typeEntry.loaderType != cls)
                typeEntry = { typeId: typeEntry.typeId, loaderType: cls };
        }
        else
            typeEntry = { typeId: typeIdCounter++, loaderType: cls };
        for (let ext of exts) {
            let entry = Loader.extMap[ext];
            if (entry && type) {
                let i = entry.findIndex(e => e.typeId == typeEntry.typeId);
                if (i == -1)
                    entry.push(typeEntry);
                else
                    entry[i].loaderType = cls;
            }
            else {
                Loader.extMap[ext] = [typeEntry];
            }
        }
    }
    get loading() {
        return this._loadings.size > 0;
    }
    load(url, arg1, arg2, arg3, priority, cache, group, ignoreCache, useWorkerLoader) {
        let complete;
        let type;
        let options = dummyOptions;
        if (arg1 instanceof Handler) {
            complete = arg1;
            type = arg3;
        }
        else if (typeof (arg1) === "string")
            type = arg1;
        else if (arg1 != null) {
            type = arg1.type;
            options = arg1;
        }
        if (priority != null || cache != null || group != null || useWorkerLoader != null) {
            if (options === dummyOptions)
                options = { priority, cache, group, useWorkerLoader };
            else
                options = Object.assign(options, { priority, cache, group, useWorkerLoader });
        }
        let onProgress;
        if (arg2 instanceof Handler)
            onProgress = (value) => arg2.runWith(value);
        else
            onProgress = arg2;
        let promise;
        if (Array.isArray(url)) {
            let pd;
            if (onProgress)
                pd = new BatchProgress(onProgress);
            let promises = [];
            for (let i = 0; i < url.length; i++) {
                let url2 = url[i];
                if (!url2)
                    continue;
                if (typeof (url2) === "string") {
                    promises.push(this._load1(url2, type, options, pd === null || pd === void 0 ? void 0 : pd.createCallback()));
                }
                else {
                    promises.push(this._load1(url2.url, url2.type || type, options !== dummyOptions ? Object.assign({}, options, url2) : url2, pd === null || pd === void 0 ? void 0 : pd.createCallback()));
                }
            }
            promise = Promise.all(promises);
        }
        else if (typeof (url) === "string")
            promise = this._load1(url, type, options, onProgress);
        else
            promise = this._load1(url.url, url.type || type, options !== dummyOptions ? Object.assign({}, options, url) : url, onProgress);
        if (complete)
            return promise.then(result => {
                complete.runWith(result);
                return result;
            });
        else
            return promise;
    }
    _load1(url, type, options, onProgress) {
        if (LayaEnv.isPreview) {
            if (url.startsWith("res://")) {
                let uuid = url.substring(6);
                return AssetDb.inst.UUID_to_URL_async(uuid).then(url2 => {
                    if (url2)
                        return this._load2(url2, uuid, type, options, onProgress);
                    else {
                        !options.silent && Loader.warnFailed(url);
                        return Promise.resolve(null);
                    }
                });
            }
            else {
                return AssetDb.inst.URL_to_UUID_async(url).then(uuid => {
                    return this._load2(url, uuid, type, options, onProgress);
                });
            }
        }
        else
            return this._load2(url, null, type, options, onProgress);
    }
    _load2(url, uuid, type, options, onProgress) {
        let { ext, typeId, main, loaderType } = Loader.getURLInfo(url, type);
        if (!loaderType) {
            !options.silent && Loader.warnFailed(url);
            return Promise.resolve(null);
        }
        let formattedUrl = URL.formatURL(url);
        if (options.group) {
            let set = Loader.groupMap[options.group];
            if (!set)
                set = Loader.groupMap[options.group] = new Set();
            set.add(formattedUrl);
        }
        let obsoluteRes;
        if (options.cache == null || options.cache) {
            let cacheRes = Loader._getRes(formattedUrl, type);
            if (cacheRes !== undefined) {
                if (cacheRes == null)
                    return Promise.resolve(null);
                else {
                    if (!(cacheRes instanceof Resource))
                        return Promise.resolve(cacheRes);
                    if (cacheRes.obsolute)
                        obsoluteRes = cacheRes;
                    if (!obsoluteRes && (!cacheRes.uuid || !uuid || uuid == cacheRes.uuid))
                        return Promise.resolve(cacheRes);
                }
            }
        }
        let loadingKey = formattedUrl;
        if (!main)
            loadingKey += "@" + typeId;
        let task = this._loadings.get(loadingKey);
        if (task) {
            if (onProgress)
                task.onProgress.add(onProgress);
            return new Promise((resolve) => task.onComplete.add(resolve));
        }
        let atlasInfo = AtlasInfoManager.getFileLoadPath(formattedUrl);
        if (atlasInfo) {
            return this.load(atlasInfo.url, { type: Loader.ATLAS, baseUrl: atlasInfo.baseUrl }).then(() => {
                return Loader.getRes(url, type);
            });
        }
        if (loadTaskPool.length > 0)
            task = loadTaskPool.pop();
        else
            task = new LoadTask();
        task.type = type;
        task.url = url;
        task.uuid = uuid;
        task.ext = ext;
        options = Object.assign(task.options, options);
        delete options.type;
        if (options.priority == null)
            options.priority = 0;
        if (options.useWorkerLoader == null)
            options.useWorkerLoader = WorkerLoader.enable;
        if (onProgress)
            task.onProgress.add(onProgress);
        task.loader = this;
        task.obsoluteInst = obsoluteRes;
        let assetLoader = new loaderType();
        this._loadings.set(loadingKey, task);
        let promise;
        try {
            promise = assetLoader.load(task);
        }
        catch (err) {
            !options.silent && Loader.warnFailed(url, err);
            promise = Promise.resolve(null);
        }
        return promise.then(content => {
            if (content instanceof Resource) {
                content._setCreateURL(url, uuid);
            }
            if (task.options.cache == null || task.options.cache)
                Loader._cacheRes(formattedUrl, content, typeId, main);
            task.progress.update(-1, 1);
            task.onComplete.invoke(content);
            return content;
        }).catch(error => {
            !options.silent && Loader.warnFailed(url, error);
            if (task.options.cache == null || task.options.cache)
                Loader._cacheRes(formattedUrl, null, typeId, main);
            task.onComplete.invoke(null);
            return null;
        }).then((result) => {
            this._loadings.delete(loadingKey);
            task.reset();
            loadTaskPool.push(task);
            if (this._loadings.size == 0)
                this.event(Event.COMPLETE);
            return result;
        });
    }
    fetch(url, contentType, onProgress, options) {
        var _a;
        options = options || dummyOptions;
        let task = {
            originalUrl: url,
            url: url,
            contentType: contentType,
            priority: (_a = options.priority) !== null && _a !== void 0 ? _a : 1,
            retryCnt: 0,
            onProgress: onProgress,
            onComplete: null,
        };
        if (options.useWorkerLoader) {
            task.useWorkerLoader = true;
            task.workerLoaderOptions = options.workerLoaderOptions;
        }
        if (options.blob)
            task.blob = options.blob;
        if (options.noRetry)
            task.retryCnt = -1;
        if (options.silent)
            task.silent = true;
        return AssetDb.inst.resolveURL(url).then(url => {
            return new Promise((resolve) => {
                task.url = URL.formatURL(url);
                task.onComplete = resolve;
                this.queueToDownload(task);
            });
        });
    }
    queueToDownload(item) {
        if (this._downloadings.size < this.maxLoader) {
            this.download(item);
            return;
        }
        let priority = item.priority;
        if (priority == 0)
            this._queue.push(item);
        else {
            let i = this._queue.findIndex(e => e.priority < priority);
            if (i != -1)
                this._queue.splice(i, 0, item);
            else
                this._queue.push(item);
        }
    }
    download(item) {
        this._downloadings.add(item);
        let url = URL.postFormatURL(item.url);
        if (item.contentType == "image") {
            let preloadedContent = Loader.preLoadedMap[item.url];
            if (preloadedContent) {
                if (!(preloadedContent instanceof ArrayBuffer)) {
                    this.completeItem(item, preloadedContent);
                    return;
                }
                item.blob = preloadedContent;
            }
            if (item.blob) {
                Loader.downloader.imageWithBlob(item, item.blob, item.originalUrl, item.onProgress, (data, error) => {
                    if (!data)
                        item.retryCnt = -1;
                    this.completeItem(item, data, error);
                });
            }
            else if (item.useWorkerLoader) {
                Loader.downloader.imageWithWorker(item, url, item.originalUrl, item.onProgress, (data, error) => {
                    if (!data)
                        item.useWorkerLoader = false;
                    this.completeItem(item, data, error);
                });
            }
            else {
                Loader.downloader.image(item, url, item.originalUrl, item.onProgress, (data, error) => this.completeItem(item, data, error));
            }
        }
        else if (item.contentType == "sound") {
            Loader.downloader.audio(item, url, item.originalUrl, item.onProgress, (data, error) => this.completeItem(item, data, error));
        }
        else {
            let preloadedContent = Loader.preLoadedMap[item.url];
            if (preloadedContent) {
                this.completeItem(item, preloadedContent);
                return;
            }
            Loader.downloader.common(item, url, item.originalUrl, item.contentType, item.onProgress, (data, error) => this.completeItem(item, data, error));
        }
    }
    completeItem(item, content, error) {
        this._downloadings.delete(item);
        if (content) {
            if (this._downloadings.size < this.maxLoader && this._queue.length > 0)
                this.download(this._queue.shift());
            if (item.onProgress)
                item.onProgress(1);
            item.onComplete(content);
        }
        else if (item.retryCnt != -1 && item.retryCnt < this.retryNum) {
            item.retryCnt++;
            if (!item.silent)
                console.debug(`Retry to load ${item.url} (${item.retryCnt})`);
            ILaya.systemTimer.once(this.retryDelay, this, this.queueToDownload, [item], false);
        }
        else {
            !item.silent && Loader.warnFailed(item.url);
            if (item.onProgress)
                item.onProgress(1);
            if (this._downloadings.size < this.maxLoader && this._queue.length > 0)
                this.download(this._queue.shift());
            item.onComplete(null);
        }
    }
    static getURLInfo(url, type) {
        let ext = url.startsWith("data:") ? "png" : Utils.getFileExtension(url);
        let extEntry;
        if (ext.length > 0)
            extEntry = Loader.extMap[ext];
        let typeId;
        let main;
        let loaderType;
        if (type) {
            let typeEntry = Loader.typeMap[type];
            if (!typeEntry) {
                Loader.warn(`not recognize type: '${type}'`);
                return NullURLInfo;
            }
            typeId = typeEntry.typeId;
            let i = 0;
            if (extEntry) {
                if (extEntry[0].typeId === typeId
                    || (i = extEntry.findIndex(e => e.typeId === typeId)) != -1) {
                    main = i == 0;
                    loaderType = extEntry[i].loaderType;
                }
                else {
                    main = false;
                    loaderType = typeEntry.loaderType;
                }
            }
            else {
                main = type != Loader.TEXTURE2D;
                loaderType = typeEntry.loaderType;
            }
        }
        else {
            if (!extEntry) {
                Loader.warn(`not recognize the resource suffix: '${url}'`);
                return NullURLInfo;
            }
            main = true;
            typeId = extEntry[0].typeId;
            loaderType = extEntry[0].loaderType;
        }
        return { ext, main, typeId, loaderType };
    }
    static warnFailed(url, err) {
        this.warn(`Failed to load ${url}`, err);
    }
    static warn(msg, err) {
        let errMsg = err ? (err.stack ? err.stack : err) : "";
        if (errMsg)
            errMsg = ": " + errMsg;
        console.warn(msg + errMsg);
    }
    static getRes(url, type) {
        url = URL.formatURL(url);
        let ret = Loader._getRes(url, type);
        return ret || null;
    }
    static _getRes(url, type) {
        let resArr = Loader.loadedMap[url];
        if (!resArr)
            return undefined;
        let ret;
        if (type) {
            let typeEntry = Loader.typeMap[type];
            if (!typeEntry)
                return undefined;
            if (resArr.length == 2) {
                if (resArr[0] == typeEntry.typeId)
                    ret = resArr[1];
            }
            else {
                let i = resArr.indexOf(typeEntry.typeId);
                if (i != -1)
                    ret = resArr[i + 1];
            }
        }
        else
            ret = resArr[1];
        if ((ret instanceof Resource) && ret.destroyed)
            return undefined;
        else
            return ret;
    }
    static getTexture2D(url) {
        return Loader.getRes(url, Loader.TEXTURE2D);
    }
    static getBaseTexture(url) {
        return Loader.getRes(url, Loader.TEXTURE2D);
    }
    static getAtlas(url) {
        return Loader.getRes(url, Loader.ATLAS);
    }
    getRes(url, type) {
        return Loader.getRes(url, type);
    }
    static createNodes(url) {
        var _a;
        return (_a = Loader.getRes(url)) === null || _a === void 0 ? void 0 : _a.create();
    }
    static cacheRes(url, data, type) {
        url = URL.formatURL(url);
        let urlInfo = Loader.getURLInfo(url, type);
        if (urlInfo.typeId != null)
            Loader._cacheRes(url, data, urlInfo.typeId, urlInfo.main);
    }
    static _cacheRes(url, data, typeId, main) {
        let entry = Loader.loadedMap[url];
        if (main) {
            if (entry) {
                entry[0] = typeId;
                entry[1] = data;
            }
            else
                entry = Loader.loadedMap[url] = [typeId, data];
        }
        else {
            if (entry) {
                let i = entry.findIndex(e => e === typeId);
                if (i != -1)
                    entry[i + 1] = data;
                else
                    entry.push(typeId, data);
            }
            else
                entry = Loader.loadedMap[url] = [null, undefined, typeId, data];
        }
    }
    cacheRes(url, data, type) {
        Loader.cacheRes(url, data, type);
    }
    static clearRes(url, checkObj) {
        url = URL.formatURL(url);
        Loader._clearRes(url, checkObj);
    }
    clearRes(url, checkObj) {
        url = URL.formatURL(url);
        Loader._clearRes(url, checkObj);
    }
    static _clearRes(url, checkObj) {
        let entry = Loader.loadedMap[url];
        if (!entry)
            return;
        if (checkObj) {
            if (entry[1] == checkObj) {
                if (entry.length == 2)
                    delete Loader.loadedMap[url];
                else
                    entry[1] = undefined;
            }
            else {
                let i = entry.indexOf(checkObj);
                if (i == -1)
                    return;
                if (entry.length == 4 && entry[0] == null)
                    delete Loader.loadedMap[url];
                else
                    entry.splice(i - 1, 2);
            }
            if ((checkObj instanceof Resource) && !checkObj.destroyed) {
                checkObj.destroy();
            }
        }
        else {
            delete Loader.loadedMap[url];
            if (entry.length > 2) {
                for (let i = 1; i < entry.length; i += 2) {
                    let obj = entry[i];
                    if ((obj instanceof Resource) && !obj.destroyed) {
                        obj.destroy();
                    }
                }
            }
            else {
                let obj = entry[1];
                if ((obj instanceof Resource) && !obj.destroyed) {
                    obj.destroy();
                }
            }
        }
    }
    clearTextureRes(url) {
        url = URL.formatURL(url);
        let entry = Loader.loadedMap[url];
        if (!entry)
            return;
        let res = entry[1];
        if (res instanceof Texture) {
            res.disposeBitmap();
        }
        else if (res instanceof AtlasResource) {
            for (let tex of res.textures)
                tex.disposeBitmap();
        }
    }
    static setGroup(url, group) {
        url = URL.formatURL(url);
        let set = Loader.groupMap[group];
        if (!set)
            set = Loader.groupMap[group] = new Set();
        set.add(url);
    }
    static clearResByGroup(group) {
        let set = Loader.groupMap[group];
        if (set) {
            for (let k of set)
                Loader._clearRes(k);
        }
    }
    clearUnLoaded() {
        if (this._queue.length == 0)
            return;
        let arr = this._queue.concat();
        this._queue.length = 0;
        for (let item of arr)
            item.onComplete(null);
    }
    cancelLoadByUrls(urls) {
        if (!urls)
            return;
        for (var i = 0, n = urls.length; i < n; i++) {
            this.cancelLoadByUrl(urls[i]);
        }
    }
    cancelLoadByUrl(url) {
        url = URL.formatURL(url);
        let i = this._queue.findIndex(item => item.url == url);
        if (i != -1) {
            let item = this._queue[i];
            this._queue.splice(i, 1);
            item.onComplete(null);
        }
    }
    loadPackage(path, arg2, arg3) {
        let progress;
        let remoteUrl;
        if (typeof (arg2) === "string") {
            remoteUrl = arg2;
            progress = arg3;
        }
        else {
            progress = arg2;
        }
        if (remoteUrl) {
            if (!remoteUrl.endsWith("/"))
                remoteUrl += "/";
            let tmpPath = path + "/";
            URL.basePaths[tmpPath] = remoteUrl;
            return this._loadSubFileConfig(path, progress);
        }
        else {
            if (LayaEnv.isPreview)
                return Promise.resolve();
            let plat = null;
            if (ILaya.Browser.onMiniGame) {
                plat = ILaya.Browser.window.wx;
            }
            else if (ILaya.Browser.onTTMiniGame) {
                plat = ILaya.Browser.window.tt;
            }
            else if (ILaya.Browser.onKGMiniGame || ILaya.Browser.onVVMiniGame || ILaya.Browser.onQGMiniGame) {
                plat = ILaya.Browser.window.qg;
            }
            else if (ILaya.Browser.onAlipayMiniGame) {
                plat = ILaya.Browser.window.my;
            }
            else {
                return this._loadSubFileConfig(path, progress);
            }
            return this._loadMiniPackage(plat, path, progress).then(() => this._loadSubFileConfig(path, progress));
        }
    }
    _loadMiniPackage(mini, packName, progress) {
        if (!(packName.length > 0))
            return Promise.resolve();
        return new Promise((resolve, reject) => {
            let loadTask = mini.loadSubpackage({
                name: packName,
                success: (res) => {
                    resolve(res);
                },
                fail: (res) => {
                    resolve(res);
                }
            });
            loadTask.onProgressUpdate((res) => {
                progress && progress(res);
            });
        });
    }
    _loadSubFileConfig(path, onProgress) {
        if (path.length > 0)
            path += "/";
        return this.fetch(path + "fileconfig.json", "json", onProgress).then(fileConfig => {
            let files = [];
            let col = fileConfig.files;
            for (let k in col) {
                if (k.length > 0) {
                    for (let file of col[k])
                        files.push(k + "/" + file);
                }
                else {
                    for (let file of col[k])
                        files.push(file);
                }
            }
            if (fileConfig.hash) {
                let i = 0;
                for (let k of fileConfig.hash) {
                    if (k != null)
                        URL.version[files[i]] = k;
                    i++;
                }
            }
            for (let c of fileConfig.config) {
                let file = files[c.i];
                switch (c.t) {
                    case 0:
                        AssetDb.inst.metaMap[file] = c;
                        break;
                    case 1:
                        AtlasInfoManager.addAtlas(file, c.prefix, c.frames);
                        break;
                    case 2:
                        AssetDb.inst.shaderNameMap[c.shaderName] = file;
                        break;
                    case 3:
                        Loader.preLoadedMap[URL.formatURL(file)] = c;
                        break;
                }
            }
        });
    }
}
Loader.TEXT = "text";
Loader.JSON = "json";
Loader.XML = "xml";
Loader.BUFFER = "arraybuffer";
Loader.IMAGE = "image";
Loader.SOUND = "sound";
Loader.VIDEO = "video";
Loader.ATLAS = "atlas";
Loader.FONT = "font";
Loader.TTF = "ttf";
Loader.HIERARCHY = "HIERARCHY";
Loader.MESH = "MESH";
Loader.MATERIAL = "MATERIAL";
Loader.TEXTURE2D = "TEXTURE2D";
Loader.TEXTURECUBE = "TEXTURE2D";
Loader.ANIMATIONCLIP = "ANIMATIONCLIP";
Loader.TERRAINHEIGHTDATA = "TERRAINHEIGHTDATA";
Loader.TERRAINRES = "TERRAIN";
Loader.SPINE = "SPINE";
Loader.extMap = {};
Loader.typeMap = {};
Loader.downloader = new Downloader();
Loader.groupMap = {};
Loader.loadedMap = {};
Loader.preLoadedMap = {};
class LoadTask {
    constructor() {
        this.options = {};
        this.onProgress = new Delegate();
        this.onComplete = new Delegate();
        this.progress = new BatchProgress((progress) => this.onProgress.invoke(progress));
    }
    reset() {
        for (let k in this.options)
            delete this.options[k];
        this.onProgress.clear();
        this.onComplete.clear();
        this.progress.reset();
        this.obsoluteInst = null;
    }
}
const loadTaskPool = [];
const dummyOptions = {};

//# sourceMappingURL=Loader.js.map
