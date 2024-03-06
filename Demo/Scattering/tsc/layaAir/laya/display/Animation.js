import { AnimationBase } from "./AnimationBase";
import { Graphics } from "./Graphics";
import { Loader } from "../net/Loader";
import { GraphicAnimation } from "./GraphicAnimation";
import { Handler } from "../utils/Handler";
import { Utils } from "../utils/Utils";
import { ILaya } from "../../ILaya";
export class Animation extends AnimationBase {
    constructor() {
        super();
        this._autoPlay = false;
        this._setControlNode(this);
    }
    destroy(destroyChild = true) {
        this.stop();
        super.destroy(destroyChild);
        this._frames = null;
        this._labels = null;
    }
    play(start = 0, loop = true, name = "") {
        if (name)
            this._setFramesFromCache(name, true);
        super.play(start, loop, name);
    }
    _setFramesFromCache(name, showWarn = false) {
        if (this._url)
            name = this._url + "#" + name;
        if (name && Animation.framesMap[name]) {
            var tAniO = Animation.framesMap[name];
            if (tAniO instanceof Array) {
                this._frames = Animation.framesMap[name];
                this._count = this._frames.length;
            }
            else {
                if (tAniO.nodeRoot) {
                    Animation.framesMap[name] = GraphicAnimation.parseAnimationByData(tAniO);
                    tAniO = Animation.framesMap[name];
                }
                this._frames = tAniO.frames;
                this._count = this._frames.length;
                if (!this._frameRateChanged)
                    this._interval = tAniO.interval;
                this._labels = this._copyLabels(tAniO.labels);
            }
            return true;
        }
        else {
            if (showWarn)
                console.log("ani not found:", name);
        }
        return false;
    }
    _copyLabels(labels) {
        if (!labels)
            return null;
        var rst;
        rst = {};
        var key;
        for (key in labels) {
            rst[key] = Utils.copyArray([], labels[key]);
        }
        return rst;
    }
    _frameLoop() {
        if (this._visible && this._style.alpha > 0.01 && this._frames) {
            super._frameLoop();
        }
    }
    _displayToIndex(value) {
        if (this._frames)
            this.graphics = this._frames[value];
    }
    get frames() {
        return this._frames;
    }
    set frames(value) {
        this._frames = value;
        if (value) {
            this._count = value.length;
            if (this._actionName)
                this._setFramesFromCache(this._actionName, true);
            this.index = this._index;
        }
    }
    get source() {
        return this._source;
    }
    set source(value) {
        this._source = value;
        if (!value)
            this.clear();
        else if (value.indexOf(".ani") > -1)
            this.loadAnimation(value);
        else if (value.startsWith("res://") || value.indexOf(".json") > -1 || value.indexOf("als") > -1 || value.indexOf("atlas") > -1)
            this.loadAtlas(value);
        else
            this.loadImages(value.split(","));
    }
    set autoPlay(value) {
        this._autoPlay = value;
        if (value)
            this.play();
        else
            this.stop();
    }
    get autoPlay() {
        return this._autoPlay;
    }
    clear() {
        super.clear();
        this.stop();
        this.graphics = null;
        this._frames = null;
        this._labels = null;
        return this;
    }
    loadImages(urls, cacheName = "") {
        this._url = "";
        if (!this._setFramesFromCache(cacheName)) {
            this.frames = Animation.framesMap[cacheName] ? Animation.framesMap[cacheName] : Animation.createFrames(urls, cacheName);
        }
        if (!this._isPlaying && this._autoPlay)
            this.play();
        return this;
    }
    loadAtlas(url, loaded = null, cacheName = "") {
        this._url = "";
        if (!this._setFramesFromCache(cacheName)) {
            let onLoaded = (loadUrl) => {
                if (url === loadUrl) {
                    this.frames = Animation.framesMap[cacheName] ? Animation.framesMap[cacheName] : Animation.createFrames(url, cacheName);
                    if (!this._isPlaying && this._autoPlay)
                        this.play();
                    if (loaded)
                        loaded.run();
                }
            };
            if (Loader.getAtlas(url))
                onLoaded(url);
            else
                ILaya.loader.load(url, Handler.create(null, onLoaded, [url]), null, Loader.ATLAS);
        }
        return this;
    }
    loadAnimation(url, loaded = null, atlas = null) {
        this._url = url;
        var _this = this;
        if (!this._actionName)
            this._actionName = "";
        if (!_this._setFramesFromCache(this._actionName)) {
            if (!atlas || Loader.getAtlas(atlas)) {
                this._loadAnimationData(url, loaded, atlas);
            }
            else {
                ILaya.loader.load(atlas, Handler.create(this, this._loadAnimationData, [url, loaded, atlas]), null, Loader.ATLAS);
            }
        }
        else {
            _this._setFramesFromCache(this._actionName, true);
            this.index = 0;
            if (loaded)
                loaded.run();
        }
        return this;
    }
    _loadAnimationData(url, loaded = null, atlas = null) {
        if (atlas && !Loader.getAtlas(atlas)) {
            console.warn("atlas load fail:" + atlas);
            return;
        }
        ILaya.loader.fetch(url, "json").then(data => {
            if (this._url !== url)
                return;
            if (!data) {
                if (Animation.framesMap[url + "#"]) {
                    this._setFramesFromCache(this._actionName, true);
                    this.index = 0;
                    this._resumePlay();
                    if (loaded)
                        loaded.run();
                }
                return;
            }
            let tAniO;
            if (!Animation.framesMap[url + "#"]) {
                let aniData = GraphicAnimation.parseAnimationData(data);
                if (!aniData)
                    return;
                let aniList = aniData.animationList;
                let len = aniList.length;
                let defaultO;
                for (let i = 0; i < len; i++) {
                    tAniO = aniList[i];
                    Animation.framesMap[url + "#" + tAniO.name] = tAniO;
                    if (!defaultO)
                        defaultO = tAniO;
                }
                if (defaultO) {
                    Animation.framesMap[url + "#"] = defaultO;
                    this._setFramesFromCache(this._actionName, true);
                    this.index = 0;
                }
                this._resumePlay();
            }
            else {
                this._setFramesFromCache(this._actionName, true);
                this.index = 0;
                this._resumePlay();
            }
            if (loaded)
                loaded.run();
        });
    }
    static createFrames(url, name) {
        var arr;
        if (typeof (url) == 'string') {
            var atlas = Loader.getAtlas(url);
            if (atlas && atlas.frames.length) {
                let frames = atlas.frames;
                arr = [];
                for (var i = 0, n = frames.length; i < n; i++) {
                    var g = new Graphics();
                    g.drawImage(frames[i], 0, 0);
                    arr.push(g);
                }
            }
        }
        else if (url instanceof Array) {
            arr = [];
            for (i = 0, n = url.length; i < n; i++) {
                g = new Graphics();
                g.loadImage(url[i], 0, 0);
                arr.push(g);
            }
        }
        if (name)
            Animation.framesMap[name] = arr;
        return arr;
    }
    static clearCache(key) {
        var cache = Animation.framesMap;
        var val;
        var key2 = key + "#";
        for (val in cache) {
            if (val === key || val.indexOf(key2) === 0) {
                delete Animation.framesMap[val];
            }
        }
    }
    onAfterDeserialize() {
        super.onAfterDeserialize();
        if (this.images) {
            if (!this._source)
                this.loadImages(this.images);
            delete this.images;
        }
    }
}
Animation.framesMap = {};

//# sourceMappingURL=Animation.js.map
